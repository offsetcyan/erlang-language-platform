-module(erlang_service_edoc).

-export([ run/1 ]).

-define(DICT_KEY, edoc_diagnostics).

-type docs() ::
    #{
        module_doc := binary(),
        function_docs := [{{FunName :: atom(), FunArity :: arity()}, FunDoc :: binary()}],
        diagnostics := [diagnostic()]
    }.
-type diagnostic() ::
    {Line :: pos_integer(), Message :: binary(), Severity :: severity()}.
-type severity() :: warning | error.

run([FileName, DocOrigin]) ->
    serialize_docs(get_docs_for_src_file(FileName, DocOrigin)).

    -spec serialize_docs(docs()) -> [{string(), binary()}].
serialize_docs(#{
    module_doc := ModuleDoc,
    function_docs := FunctionDocs,
    diagnostics := Diagnostics
}) when
    is_binary(ModuleDoc), is_list(FunctionDocs)
->
    lists:append([
        [{"MODULE_DOC", ModuleDoc}],
        [serialize_function_doc(F) || F = {{_N, _A}, _D} <- FunctionDocs],
        [{"EDOC_DIAGNOSTIC", serialize_edoc_diagnostic(D)} || D <- lists:keysort(1, Diagnostics)]
    ]).

serialize_function_doc({{Name, Arity}, Doc}) when
    is_atom(Name), is_integer(Arity), is_binary(Doc)
->
    {"FUNCTION_DOC",
        unicode:characters_to_binary(
            io_lib:format("~ts ~B ~ts", [Name, Arity, Doc])
        )}.

-spec serialize_edoc_diagnostic({Line :: pos_integer(), Message :: binary(), Severity :: severity()}) ->
    binary().
serialize_edoc_diagnostic({Line, Code, Message, Severity}) ->
    unicode:characters_to_binary(
        io_lib:format("~ts ~ts ~tp ~ts", [Code, Severity, Line, Message])
    ).

    -spec get_docs_for_src_file(_FileName, edoc | eep48) -> docs().
get_docs_for_src_file(FileName, Origin) ->
    put(?DICT_KEY, []),
    case filename:extension(FileName) of
        ".erl" ->
            ModuleName = list_to_atom(filename:basename(FileName, ".erl")),
            try
                Docs =
                    case Origin of
                        eep48 ->
                            case code:get_doc(ModuleName) of
                                {ok, DocV1} ->
                                    DocV1;
                                {error, Reason} ->
                                    throw(
                                        lists:flatten(
                                            io_lib:format(
                                                "Failed to load docs via compiled beam for source file ~ts: "
                                                "~ts",
                                                [FileName, Reason]
                                            )
                                        )
                                    )
                            end;
                        edoc ->
                            {_, EDoc} = edoc:get_doc(FileName, [
                                {private, true}, {preprocess, false}
                            ]),
                            % docsh_edoc_xmerl is sub-optimal because it doesn't generate metadata, etc. - just the core textual documentation -
                            % but it's all we have in terms of something that can turn edoc xml into plain text or markdown
                            Internal = xmerl:export_simple([EDoc], docsh_edoc_xmerl),
                            docsh_docs_v1:from_internal(Internal)
                    end,
                render_docs_v1(ModuleName, Docs, fetch_diagnostics_from_dict())
            catch
                _:_E:_Trace ->
                    #{
                        module_doc => <<>>,
                        function_docs => [],
                        diagnostics => fetch_diagnostics_from_dict()
                    }
            end;
        _ ->
            #{
                module_doc => <<>>,
                function_docs => [],
                diagnostics => []
            }
    end.

fetch_diagnostics_from_dict() ->
    [
        {Line, erlang_service_error_codes:make_code(edoc, Format),
            unicode:characters_to_binary(
                io_lib:format(Format, Args)
            ),
            Severity}
     || {Line, _Where, Format, Args, Severity} <- get(?DICT_KEY)
    ].

% Format used by OTP docs
render_docs_v1(
    ModuleName,
    {docs_v1, _Anno, _BeamLang, <<"application/erlang+html">> = _Format, _ModuleDoc, _Metadata,
        FunctionDocs} =
        DocsV1,
    Diagnostics = []
) ->
    % Render using a standard, simple format - same as `h(ModuleName)` in the `erl` shell
    % See https://www.erlang.org/doc/man/shell_docs.html#description
    #{
        module_doc =>
            unicode:characters_to_binary(
                render_eep48_docs:render(ModuleName, DocsV1)
            ),
        function_docs =>
            [
                begin
                    {FName, FArity} = NA = kna_to_name_arity(KNA),
                    FDoc =
                        case render_eep48_docs:render(ModuleName, FName, FArity, DocsV1) of
                            {error, function_missing} ->
                                <<>>;
                            Res ->
                                unicode:characters_to_binary(Res)
                        end,
                    {NA, FDoc}
                end
             || {KNA, _FAnno, _FSig, _FDoc, _FMetadata} <- FunctionDocs,
                none =/= kna_to_name_arity(KNA)
            ],
        diagnostics => Diagnostics
    };
% Format used by edoc
render_docs_v1(
    _ModuleName,
    {docs_v1, _Anno, _BeamLang, <<"text/erlang-edoc">> = _Format, ModuleDoc, _Metadata, ItemDocs},
    Diagnostics
) ->
    ModuleDocEn =
        case ModuleDoc of
            _ when is_map(ModuleDoc) ->
                render_as_markdown(maps:get(<<"en">>, ModuleDoc, <<>>));
            _ ->
                <<>>
        end,
    FunctionDocs = [item_doc(Item) || Item <- ItemDocs],
    #{
        module_doc => ModuleDocEn,
        function_docs => [{F, FDoc} || {{_FName, _FArity} = F, FDoc} <- FunctionDocs],
        diagnostics => Diagnostics
    }.

-spec kna_to_name_arity(docsh_format:kna() | none) -> {atom(), arity()} | none.
kna_to_name_arity(none) ->
    none;
kna_to_name_arity({Kind, Name, Arity}) ->
    case {Kind, Arity} of
        {function, A} when is_integer(A) ->
            % TODO Support type docs?
            {Name, Arity};
        _ ->
            none
    end.

render_as_markdown(none) ->
    none;
render_as_markdown(Doc) ->
    StructuredDoc = docsh_edoc_xmerl:format_edoc(Doc, #{}),
    doc_to_md(StructuredDoc).

doc_to_md(Components) ->
    FormattedEntries = [form_markdown(C) || C <- Components],
    unicode:characters_to_binary(
        string:join(FormattedEntries, "\n\n")
    ).

-spec form_markdown(tuple()) -> string().
form_markdown({h1, String}) ->
    "# " ++ String;
form_markdown({h2, String}) ->
    "## " ++ String;
form_markdown({h3, String}) ->
    "### " ++ String;
form_markdown({h4, String}) ->
    "#### " ++ String;
form_markdown({code_block_line, String}) ->
    "  " ++ String;
form_markdown({code_block_begin, Language}) ->
    "```" ++ Language;
form_markdown({code_block_end, _Language}) ->
    "```";
form_markdown({code_line, String}) ->
    "`" ++ String ++ "`";
form_markdown({_Form, String}) ->
    String;
form_markdown(Binary) when is_binary(Binary) ->
    Binary;
form_markdown(String) when is_list(String) ->
    String.

-spec item_doc(Item :: dochsh_docs_v1:item()) -> {{atom(), arity()}, binary()} | none.
item_doc({KNA, _Anno, _Sig, Doc, _Metadata}) ->
    case Doc of
        none ->
            none;
        hidden ->
            none;
        #{<<"en">> := ItemDoc} ->
            case kna_to_name_arity(KNA) of
                none ->
                    none;
                {_Name, _Arity} = NameArity ->
                    {NameArity, render_as_markdown(ItemDoc)}
            end;
        _ ->
            none
    end;
item_doc(_) ->
    none.
