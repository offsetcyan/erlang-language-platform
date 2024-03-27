"use strict";(self.webpackChunkstaticdocs_starter=self.webpackChunkstaticdocs_starter||[]).push([[4146],{15680:(e,r,n)=>{n.r(r),n.d(r,{MDXContext:()=>s,MDXProvider:()=>f,mdx:()=>y,useMDXComponents:()=>u,withMDXComponents:()=>p});var t=n(96540);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(){return a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},a.apply(this,arguments)}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function l(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=t.createContext({}),p=function(e){return function(r){var n=u(r.components);return t.createElement(e,a({},r,{components:n}))}},u=function(e){var r=t.useContext(s),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},f=function(e){var r=u(e.components);return t.createElement(s.Provider,{value:r},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},g=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),f=o,d=p["".concat(i,".").concat(f)]||p[f]||m[f]||a;return n?t.createElement(d,c(c({ref:r},s),{},{components:n})):t.createElement(d,c({ref:r},s))}));function y(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=g;var c={};for(var l in r)hasOwnProperty.call(r,l)&&(c[l]=r[l]);c.originalType=e,c[d]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}g.displayName="MDXCreateElement"},47522:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var t=n(58168),o=(n(96540),n(15680));const a={sidebar_position:39},i="L1309 - Missing function specification",c={unversionedId:"erlang-error-index/l/L1309",id:"erlang-error-index/l/L1309",title:"L1309 - Missing function specification",description:"Error",source:"@site/docs/erlang-error-index/l/L1309.md",sourceDirName:"erlang-error-index/l",slug:"/erlang-error-index/l/L1309",permalink:"/erlang-language-platform/docs/erlang-error-index/l/L1309",draft:!1,tags:[],version:"current",sidebarPosition:39,frontMatter:{sidebar_position:39},sidebar:"tutorialSidebar",previous:{title:"L1227 - Undefined Function",permalink:"/erlang-language-platform/docs/erlang-error-index/l/L1227"},next:{title:"O0000 - Generic EDoc Error",permalink:"/erlang-language-platform/docs/erlang-error-index/o/O0000"}},l={},s=[{value:"Error",id:"error",level:2},{value:"Explanation",id:"explanation",level:2}],p={toc:s},u="wrapper";function f(e){let{components:r,...n}=e;return(0,o.mdx)(u,(0,t.A)({},p,n,{components:r,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"l1309---missing-function-specification"},"L1309 - Missing function specification"),(0,o.mdx)("h2",{id:"error"},"Error"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-erlang"},"    foo() -> ok.\n%%  ^^^ \ud83d\udca1 warning: missing specification for function foo/0.\n")),(0,o.mdx)("h2",{id:"explanation"},"Explanation"),(0,o.mdx)("p",null,"The warning message indicates that a specification for the specified function could not be found."),(0,o.mdx)("p",null,"To fix it, add a ",(0,o.mdx)("inlineCode",{parentName:"p"},"-spec")," annotation to the function, such as:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-erlang"},"-spec foo() -> atom().\nfoo() -> ok.\n")))}f.isMDXComponent=!0}}]);