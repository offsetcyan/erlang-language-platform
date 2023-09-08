"use strict";(self.webpackChunkstaticdocs_starter=self.webpackChunkstaticdocs_starter||[]).push([[445],{3905:(e,r,n)=>{n.r(r),n.d(r,{MDXContext:()=>p,MDXProvider:()=>u,mdx:()=>h,useMDXComponents:()=>d,withMDXComponents:()=>s});var t=n(67294);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(){return o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},o.apply(this,arguments)}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=t.createContext({}),s=function(e){return function(r){var n=d(r.components);return t.createElement(e,o({},r,{components:n}))}},d=function(e){var r=t.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},u=function(e){var r=d(e.components);return t.createElement(p.Provider,{value:r},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},g=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=d(n),u=a,m=s["".concat(i,".").concat(u)]||s[u]||f[u]||o;return n?t.createElement(m,l(l({ref:r},p),{},{components:n})):t.createElement(m,l({ref:r},p))}));function h(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var c in r)hasOwnProperty.call(r,c)&&(l[c]=r[c]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9926:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var t=n(87462),a=(n(67294),n(3905));const o={sidebar_position:7},i="W0007",l={unversionedId:"erlang-error-index/w/W0007",id:"erlang-error-index/w/W0007",title:"W0007",description:"Trivial Match",source:"@site/docs/erlang-error-index/w/W0007.md",sourceDirName:"erlang-error-index/w",slug:"/erlang-error-index/w/W0007",permalink:"/erlang-language-platform/docs/erlang-error-index/w/W0007",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"W0006",permalink:"/erlang-language-platform/docs/erlang-error-index/w/W0006"},next:{title:"W0008",permalink:"/erlang-language-platform/docs/erlang-error-index/w/W0008"}},c={},p=[{value:"Trivial Match",id:"trivial-match",level:2},{value:"Error",id:"error",level:3},{value:"Explanation",id:"explanation",level:3}],s={toc:p},d="wrapper";function u(e){let{components:r,...n}=e;return(0,a.mdx)(d,(0,t.Z)({},s,n,{components:r,mdxType:"MDXLayout"}),(0,a.mdx)("h1",{id:"w0007"},"W0007"),(0,a.mdx)("h2",{id:"trivial-match"},"Trivial Match"),(0,a.mdx)("h3",{id:"error"},"Error"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-erlang"},"-module(main).\n\ndo_foo() ->\n    X = 42,\n    Y = 42,\n    X = X,\n%%% ^^^^^ warning: match is redundant\n    X = Y.\n")),(0,a.mdx)("h3",{id:"explanation"},"Explanation"),(0,a.mdx)("p",null,"The error message is indicating that the statement ",(0,a.mdx)("inlineCode",{parentName:"p"},"X = X")," is redundant."),(0,a.mdx)("p",null,"Since the ",(0,a.mdx)("em",{parentName:"p"},"pattern")," (the part on the left of the ",(0,a.mdx)("inlineCode",{parentName:"p"},"=")," and the ",(0,a.mdx)("em",{parentName:"p"},"expression")," (the part on the right of the ",(0,a.mdx)("inlineCode",{parentName:"p"},"="),") are the same and given that in Erlang variables are immutable (once a value is assigned to a variable it cannot be changed), the operation will always succeed."),(0,a.mdx)("p",null,"To fix this warning, you should remove the redundant assignment."))}u.isMDXComponent=!0}}]);