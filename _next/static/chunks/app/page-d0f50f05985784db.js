(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1653:function(e,t,r){Promise.resolve().then(r.t.bind(r,8173,23)),Promise.resolve().then(r.t.bind(r,231,23)),Promise.resolve().then(r.bind(r,4660)),Promise.resolve().then(r.bind(r,5583)),Promise.resolve().then(r.bind(r,5298)),Promise.resolve().then(r.bind(r,2680))},4660:function(e,t,r){"use strict";var n=r(7437),a=r(9354),s=r(4446),i=r(633),l=r(2265);t.default=e=>{let{text:t,className:r,variant:o,characterDelay:d=.03,delay:c=0,yOffset:u=8,animateByCharacter:f=!1}=e,m=o||{hidden:{y:u,opacity:0,filter:"blur(8px)"},visible:{y:-u,opacity:1,filter:"blur(0px)"}},h=(0,l.useMemo)(()=>Array.from(t),[t]);return f?(0,n.jsx)("div",{className:"flex",children:(0,n.jsx)(s.M,{children:h.map((e,t)=>(0,n.jsx)(i.E.span,{initial:"hidden",animate:"visible",exit:"hidden",variants:m,transition:{yoyo:1/0,delay:c+t*d,ease:"easeOut"},className:(0,a.cn)("inline-block",r),style:{width:""===e.trim()?"0.2em":"auto"},children:e},t))})}):(0,n.jsx)("div",{className:"flex",children:(0,n.jsx)(s.M,{children:(0,n.jsx)(i.E.span,{initial:"hidden",animate:"visible",exit:"hidden",variants:m,transition:{yoyo:1/0,delay:c,ease:"easeOut"},className:(0,a.cn)("inline-block",r),children:t})})})}},5583:function(e,t,r){"use strict";r.d(t,{default:function(){return o}});var n=r(7437),a=r(2265);r(9047);let s={some:0,all:1};var i=r(4446),l=r(633),o=e=>{let{children:t,className:r,variant:o,duration:d=.4,delay:c=0,yOffset:u=6,inView:f=!1,inViewMargin:m="-50px",blur:h="6px"}=e,p=(0,a.useRef)(null),x=function(e,{root:t,margin:r,amount:n,once:i=!1}={}){let[l,o]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!e.current||i&&l)return;let a={root:t&&t.current||void 0,margin:r,amount:n};return function(e,t,{root:r,margin:n,amount:a="some"}={}){var i;let l=("string"==typeof(i=e)?i=document.querySelectorAll(i):i instanceof Element&&(i=[i]),Array.from(i||[])),o=new WeakMap,d=new IntersectionObserver(e=>{e.forEach(e=>{let r=o.get(e.target);if(!!r!==e.isIntersecting){if(e.isIntersecting){let r=t(e);"function"==typeof r?o.set(e.target,r):d.unobserve(e.target)}else r&&(r(e),o.delete(e.target))}})},{root:r,rootMargin:n,threshold:"number"==typeof a?a:s[a]});return l.forEach(e=>d.observe(e)),()=>d.disconnect()}(e.current,()=>(o(!0),i?void 0:()=>o(!1)),a)},[t,e,r,i,n]),l}(p,{once:!0,margin:m});return(0,n.jsx)(i.M,{children:(0,n.jsx)(l.E.div,{ref:p,initial:"hidden",animate:!f||x?"visible":"hidden",exit:"hidden",variants:o||{hidden:{y:u,opacity:0,filter:"blur(".concat(h,")")},visible:{y:-u,opacity:1,filter:"blur(0px)"}},transition:{delay:.04+c,duration:d,ease:"easeOut"},className:r,children:t})})}},5298:function(e,t,r){"use strict";r.d(t,{ResumeCard:function(){return b}});var n=r(7437),a=r(2680),s=r(2265),i=r(2218),l=r(9354);let o=(0,i.j)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function d(e){let{className:t,variant:r,...a}=e;return(0,n.jsx)("div",{className:(0,l.cn)(o({variant:r}),t),...a})}let c=s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,l.cn)("rounded-lg bg-card text-card-foreground",r),...a})});c.displayName="Card";let u=s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,l.cn)("flex flex-col",r),...a})});u.displayName="CardHeader",s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("h3",{ref:t,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",r),...a})}).displayName="CardTitle",s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("p",{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",r),...a})}).displayName="CardDescription",s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,l.cn)("text-pretty font-sans text-sm text-muted-foreground",r),...a})}).displayName="CardContent",s.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,l.cn)("flex items-center pt-2",r),...a})}).displayName="CardFooter";var f=r(633);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let m=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),h=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,s.forwardRef)((e,t)=>{let{color:r="currentColor",size:n=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:l="",children:o,iconNode:d,...c}=e;return(0,s.createElement)("svg",{ref:t,...p,width:n,height:n,stroke:r,strokeWidth:i?24*Number(a)/Number(n):a,className:h("lucide",l),...c},[...d.map(e=>{let[t,r]=e;return(0,s.createElement)(t,r)}),...Array.isArray(o)?o:[o]])}),v=((e,t)=>{let r=(0,s.forwardRef)((r,n)=>{let{className:a,...i}=r;return(0,s.createElement)(x,{ref:n,iconNode:t,className:h("lucide-".concat(m(e)),a),...i})});return r.displayName="".concat(e),r})("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);var g=r(231),y=r.n(g);let b=e=>{let{logoUrl:t,altText:r,title:i,subtitle:o,href:m,badges:h,period:p,description:x}=e,[g,b]=s.useState(!1);return(0,n.jsx)(y(),{href:m||"#",className:"block cursor-pointer",onClick:e=>{x&&(e.preventDefault(),b(!g))},children:(0,n.jsxs)(c,{className:"flex",children:[(0,n.jsx)("div",{className:"flex-none",children:(0,n.jsxs)(a.Avatar,{className:"border size-12 m-auto bg-muted-background dark:bg-foreground",children:[(0,n.jsx)(a.AvatarImage,{src:t,alt:r,className:"object-contain"}),(0,n.jsx)(a.AvatarFallback,{children:r[0]})]})}),(0,n.jsxs)("div",{className:"flex-grow ml-4 items-center flex-col group",children:[(0,n.jsxs)(u,{children:[(0,n.jsxs)("div",{className:"flex items-center justify-between gap-x-2 text-base",children:[(0,n.jsxs)("h3",{className:"inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm",children:[i,h&&(0,n.jsx)("span",{className:"inline-flex gap-x-1",children:h.map((e,t)=>(0,n.jsx)(d,{variant:"secondary",className:"align-middle text-xs",children:e},t))}),(0,n.jsx)(v,{className:(0,l.cn)("size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",g?"rotate-90":"rotate-0")})]}),(0,n.jsx)("div",{className:"text-xs sm:text-sm tabular-nums text-muted-foreground text-right",children:p})]}),o&&(0,n.jsx)("div",{className:"font-sans text-xs",children:o})]}),x&&(0,n.jsx)(f.E.div,{initial:{opacity:0,height:0},animate:{opacity:g?1:0,height:g?"auto":0},transition:{duration:.7,ease:[.16,1,.3,1]},className:"mt-2 text-xs sm:text-sm",children:x})]})]})})}},2680:function(e,t,r){"use strict";r.r(t),r.d(t,{Avatar:function(){return b},AvatarFallback:function(){return j},AvatarImage:function(){return N}});var n=r(7437),a=r(2265),s=r(8324),i=r(5137),l=r(1336),o=r(5171),d="Avatar",[c,u]=(0,s.b)(d),[f,m]=c(d),h=a.forwardRef((e,t)=>{let{__scopeAvatar:r,...s}=e,[i,l]=a.useState("idle");return(0,n.jsx)(f,{scope:r,imageLoadingStatus:i,onImageLoadingStatusChange:l,children:(0,n.jsx)(o.WV.span,{...s,ref:t})})});h.displayName=d;var p="AvatarImage",x=a.forwardRef((e,t)=>{let{__scopeAvatar:r,src:s,onLoadingStatusChange:d=()=>{},...c}=e,u=m(p,r),f=function(e){let[t,r]=a.useState("idle");return(0,l.b)(()=>{if(!e){r("error");return}let t=!0,n=new window.Image,a=e=>()=>{t&&r(e)};return r("loading"),n.onload=a("loaded"),n.onerror=a("error"),n.src=e,()=>{t=!1}},[e]),t}(s),h=(0,i.W)(e=>{d(e),u.onImageLoadingStatusChange(e)});return(0,l.b)(()=>{"idle"!==f&&h(f)},[f,h]),"loaded"===f?(0,n.jsx)(o.WV.img,{...c,ref:t,src:s}):null});x.displayName=p;var v="AvatarFallback",g=a.forwardRef((e,t)=>{let{__scopeAvatar:r,delayMs:s,...i}=e,l=m(v,r),[d,c]=a.useState(void 0===s);return a.useEffect(()=>{if(void 0!==s){let e=window.setTimeout(()=>c(!0),s);return()=>window.clearTimeout(e)}},[s]),d&&"loaded"!==l.imageLoadingStatus?(0,n.jsx)(o.WV.span,{...i,ref:t}):null});g.displayName=v;var y=r(9354);let b=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(h,{ref:t,className:(0,y.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",r),...a})});b.displayName=h.displayName;let N=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(x,{ref:t,className:(0,y.cn)("aspect-square h-full w-full",r),...a})});N.displayName=x.displayName;let j=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(g,{ref:t,className:(0,y.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",r),...a})});j.displayName=g.displayName},9354:function(e,t,r){"use strict";r.d(t,{cn:function(){return s}});var n=r(4839),a=r(6164);function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m6)((0,n.W)(t))}},4446:function(e,t,r){"use strict";r.d(t,{M:function(){return v}});var n=r(7437),a=r(2265),s=r(7797),i=r(458),l=r(9791);class o extends a.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function d(e){let{children:t,isPresent:r}=e,s=(0,a.useId)(),i=(0,a.useRef)(null),d=(0,a.useRef)({width:0,height:0,top:0,left:0}),{nonce:c}=(0,a.useContext)(l._);return(0,a.useInsertionEffect)(()=>{let{width:e,height:t,top:n,left:a}=d.current;if(r||!i.current||!e||!t)return;i.current.dataset.motionPopId=s;let l=document.createElement("style");return c&&(l.nonce=c),document.head.appendChild(l),l.sheet&&l.sheet.insertRule('\n          [data-motion-pop-id="'.concat(s,'"] {\n            position: absolute !important;\n            width: ').concat(e,"px !important;\n            height: ").concat(t,"px !important;\n            top: ").concat(n,"px !important;\n            left: ").concat(a,"px !important;\n          }\n        ")),()=>{document.head.removeChild(l)}},[r]),(0,n.jsx)(o,{isPresent:r,childRef:i,sizeRef:d,children:a.cloneElement(t,{ref:i})})}let c=e=>{let{children:t,initial:r,isPresent:l,onExitComplete:o,custom:c,presenceAffectsLayout:f,mode:m}=e,h=(0,i.h)(u),p=(0,a.useId)(),x=(0,a.useMemo)(()=>({id:p,initial:r,isPresent:l,custom:c,onExitComplete:e=>{for(let t of(h.set(e,!0),h.values()))if(!t)return;o&&o()},register:e=>(h.set(e,!1),()=>h.delete(e))}),f?[Math.random()]:[l]);return(0,a.useMemo)(()=>{h.forEach((e,t)=>h.set(t,!1))},[l]),a.useEffect(()=>{l||h.size||!o||o()},[l]),"popLayout"===m&&(t=(0,n.jsx)(d,{isPresent:l,children:t})),(0,n.jsx)(s.O.Provider,{value:x,children:t})};function u(){return new Map}var f=r(5050),m=r(9047);let h=e=>e.key||"";function p(e){let t=[];return a.Children.forEach(e,e=>{(0,a.isValidElement)(e)&&t.push(e)}),t}var x=r(9033);let v=e=>{let{children:t,exitBeforeEnter:r,custom:s,initial:l=!0,onExitComplete:o,presenceAffectsLayout:d=!0,mode:u="sync"}=e;(0,m.k)(!r,"Replace exitBeforeEnter with mode='wait'");let v=(0,a.useMemo)(()=>p(t),[t]),g=v.map(h),y=(0,a.useRef)(!0),b=(0,a.useRef)(v),N=(0,i.h)(()=>new Map),[j,w]=(0,a.useState)(v),[R,E]=(0,a.useState)(v);(0,x.L)(()=>{y.current=!1,b.current=v;for(let e=0;e<R.length;e++){let t=h(R[e]);g.includes(t)?N.delete(t):!0!==N.get(t)&&N.set(t,!1)}},[R,g.length,g.join("-")]);let k=[];if(v!==j){let e=[...v];for(let t=0;t<R.length;t++){let r=R[t],n=h(r);g.includes(n)||(e.splice(t,0,r),k.push(r))}"wait"===u&&k.length&&(e=k),E(p(e)),w(v);return}let{forceRender:C}=(0,a.useContext)(f.p);return(0,n.jsx)(n.Fragment,{children:R.map(e=>{let t=h(e),r=v===R||g.includes(t);return(0,n.jsx)(c,{isPresent:r,initial:(!y.current||!!l)&&void 0,custom:r?void 0:s,presenceAffectsLayout:d,mode:u,onExitComplete:r?void 0:()=>{if(!N.has(t))return;N.set(t,!0);let e=!0;N.forEach(t=>{t||(e=!1)}),e&&(null==C||C(),E(b.current),o&&o())},children:e},t)})})}}},function(e){e.O(0,[231,633,685,173,971,23,744],function(){return e(e.s=1653)}),_N_E=e.O()}]);