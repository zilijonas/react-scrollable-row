/*! For license information please see 3.981a46fd.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-slideable-example"]=this["webpackJsonpreact-slideable-example"]||[]).push([[3],[,,,,,,,,,,function(e,t,n){"use strict";function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=new Array(t);n<t;n++)l[n]=e[n];return l}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],l=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(l=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);l=!0);}catch(s){r=!0,o=s}finally{try{l||null==c.return||c.return()}finally{if(r)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.r(t),n.d(t,"App",(function(){return I}));var o=n(0),i=n.n(o),c=n(11),s=n.n(c),a=n(12),u="_styles-module__container__1Lxpd",f="_styles-module__buttonContainer__tWHtY",d="_styles-module__button__2hTXI",m="_styles-module__scrollableContent__3pFBI",p="_styles-module__list__uhdz0",v="_styles-module__listItem__24rTd",h=function(e,t){return null==e?void 0:e.scrollTo({left:t,behavior:"smooth"})},b=function(e){return e?Array.from(e.getElementsByTagName("li")):[]},y=function(e,t,n,l){var r,o=(null!=(r=null==t?void 0:t.clientWidth)?r:0)/n-l+l/n;b(e).forEach((function(e){var t;e.style="".concat(null!=(t=e.style.cssText)?t:"","; width: ").concat(o,"px; min-width: ").concat(o,"px;")}))},E=function(e){var t=e.itemsPerResolutionConfig,n=e.looped,l=e.pixelsBetweenItems,i=r(Object(o.useState)(null),2),c=i[0],s=i[1],a=r(Object(o.useState)(null),2),u=a[0],f=a[1],d=Object(o.useRef)(0),m=Object(o.useRef)(0),p=Object(o.useCallback)((function(){var e;return null!=(e=null==u?void 0:u.scrollWidth)?e:0}),[u]),v=Object(o.useCallback)((function(){return m.current}),[]),E=Object(o.useCallback)((function(){return d.current}),[]),j=Object(o.useCallback)((function(e){return m.current=e}),[]),g=Object(o.useCallback)((function(e){return d.current=e}),[]),O=function(e){var t=e.containerEl,n=e.itemsPerResolutionConfig,l=Object(o.useMemo)((function(){return Object.keys(n).filter(Number).map(Number).sort((function(e,t){return e-t}))}),[n]),i=Object(o.useCallback)((function(){var e;return null!=t&&t.clientWidth?n[null!=(e=l.find((function(e){return t.clientWidth<=e})))?e:"max"]:0}),[n,l,t]),c=r(Object(o.useState)(i()),2),s=c[0],a=c[1];return Object(o.useLayoutEffect)((function(){var e=function(){a(i())};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[i]),{fittedItemsCount:s}}({containerEl:c,itemsPerResolutionConfig:t}),w=O.fittedItemsCount;!function(e){var t=e.containerEl,n=e.listEl,l=e.pixelsBetweenItems,r=e.fittedItemsCount;Object(o.useLayoutEffect)((function(){var e=function(){return y(n,t,r,l)};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[t,r,n,l])}({containerEl:c,listEl:u,pixelsBetweenItems:l,fittedItemsCount:w}),function(e){var t=e.listEl,n=e.containerEl,l=e.getScrollPosition,r=e.getStepSize,i=e.fittedItemsCount;Object(o.useLayoutEffect)((function(){if(n&&t){var e=function(){var e=Array.from(n.getElementsByTagName("button"));e.forEach((function(n,o){var c=o+1===e.length,s=b(t).length<=i,a=l()<=0,u=l()>=t.scrollWidth-r(),f=s||c?u:a;n.style.display=f?"none":"block"}))};return e(),window.addEventListener("resize",e),null==t||t.addEventListener("scroll",e),function(){window.removeEventListener("resize",e),null==t||t.removeEventListener("scroll",e)}}}),[n,i,t,l,r])}({containerEl:c,listEl:u,fittedItemsCount:w,getStepSize:v,getScrollPosition:E}),function(e){var t=e.listEl,n=e.looped,l=e.getStepSize;Object(o.useLayoutEffect)((function(){if(t)return n&&(null==t||t.addEventListener("scroll",e)),function(){n&&(null==t||t.removeEventListener("scroll",e))};function e(){var e=this.scrollWidth-this.clientWidth;if(this.scrollLeft+l()>=e&&t){var n=t.getElementsByTagName("ul")[0],r=parseInt(n.dataset.current,10),o=t.getElementsByTagName("li")[r].cloneNode(!0);n.appendChild(o),n.dataset.current=(r+1).toString()}}}),[t,n,l])}({listEl:u,looped:n,getStepSize:v}),function(e){var t=e.listEl,n=e.containerEl,l=e.updateStepSize,r=e.updateScrollPosition;Object(o.useLayoutEffect)((function(){var e;if(t&&n){l(null!=(e=n.clientWidth)?e:0);var o=function(){var e;r(0),l(null!=(e=n.clientWidth)?e:0),h(t,0)};return window.addEventListener("resize",o),function(){window.removeEventListener("resize",o)}}}),[n,t,r,l])}({containerEl:c,listEl:u,updateStepSize:j,updateScrollPosition:g});var x=Object(o.useCallback)((function(){if(!(d.current<0)){var e=(d.current+m.current>=p()?p()-2*m.current:d.current-m.current)-l;d.current=e>0?e:0,h(u,d.current)}}),[l,u,p]),_=Object(o.useCallback)((function(){if(!(d.current>p())){var e=d.current+m.current>=p();d.current=(d.current>0?d.current+m.current:m.current)+l-(e?l/w:0),h(u,d.current)}}),[l,w,u,p]);return Object(o.useMemo)((function(){return{listRef:f,containerRef:s,scrollForward:_,scrollBack:x,fittedItemsCount:w}}),[f,s,_,x,w])},j=function(){return Object(a.jsx)("svg",Object.assign({x:"0px",y:"0px",viewBox:"0 0 34.075 34.075",xmlSpace:"preserve"},{children:Object(a.jsx)("g",{children:Object(a.jsx)("g",{children:Object(a.jsx)("path",{style:{fill:"#010002"},d:"M24.57,34.075c-0.505,0-1.011-0.191-1.396-0.577L8.11,18.432c-0.771-0.771-0.771-2.019,0-2.79\n      L23.174,0.578c0.771-0.771,2.02-0.771,2.791,0s0.771,2.02,0,2.79l-13.67,13.669l13.67,13.669c0.771,\n      0.771,0.771,2.021,0,2.792 C25.58,33.883,25.075,34.075,24.57,34.075z"},void 0)},void 0)},void 0)}),void 0)},g={480:2,768:3,1200:4,max:5},O=function(e){var t=e.items,n=e.looped,l=void 0!==n&&n,r=e.buttonsStyle,o=e.placeholderElement,i=e.pixelsBetweenItems,c=void 0===i?0:i,s=e.itemsPerResolutionConfig,h=E({itemsPerResolutionConfig:void 0===s?g:s,pixelsBetweenItems:c,looped:l}),b=h.listRef,y=h.containerRef,O=h.scrollBack,w=h.scrollForward,x=h.fittedItemsCount,_=o?x-t.length:0,S=c+"px";return Object(a.jsxs)("div",Object.assign({ref:y,className:u},{children:[Object(a.jsx)("div",Object.assign({className:f},{children:Object(a.jsx)("button",Object.assign({onClick:O,className:d,style:r},{children:Object(a.jsx)(j,{},void 0)}),void 0)}),void 0),Object(a.jsx)("div",Object.assign({ref:b,className:m},{children:Object(a.jsxs)("ul",Object.assign({"data-current":"0",className:p},{children:[t.map((function(e,t){return Object(a.jsx)("li",Object.assign({className:v,style:{marginRight:S}},{children:e}),t)})),_>0&&Array.from(Array(_).keys()).map((function(e){return Object(a.jsx)("li",Object.assign({className:v,style:{marginRight:S}},{children:o}),e)}))]}),void 0)}),void 0),Object(a.jsx)("div",Object.assign({className:f},{children:Object(a.jsx)("button",Object.assign({onClick:w,className:d,style:r},{children:Object(a.jsx)(j,{},void 0)}),void 0)}),void 0)]}),void 0)},w=i.a.memo(O);s.a.polyfill();n(14);var x=function(e){var t=e.children;return i.a.createElement("div",{className:"listItem"},i.a.createElement("span",null,t))},_=function(){return i.a.createElement("div",{className:"placeholderItem"},i.a.createElement("span",null,"?"))},S=[300,600,1200,1500],C=function(e){var t=e.width,n=e.onWidthChanged;return i.a.createElement("div",{className:"widthControl"},i.a.createElement("label",null,"List's width in pixels"),i.a.createElement("input",{type:"number",value:t,onChange:function(e){var t=e.target.value;n(+t)}}),i.a.createElement("div",{className:"widthControlButtons"},S.map((function(e){return i.a.createElement("button",{key:e,onClick:(t=e,function(){return n(t)})},e,"px");var t}))))},L=[1,2,3,4,5,6,7,8],I=function(){var e=r(Object(o.useState)(500),2),t=e[0],n=e[1];return i.a.createElement("div",{className:"pageContainer"},i.a.createElement("h1",null,"React Slideable"),i.a.createElement("label",null,"List of 8 elements"),i.a.createElement("div",{className:"listContainer",style:{width:t}},i.a.createElement(w,{key:t,pixelsBetweenItems:8,items:L.map((function(e){return i.a.createElement(x,{key:e},e)}))})),i.a.createElement("label",null,"Looped list of 8 elements"),i.a.createElement("div",{className:"listContainer",style:{width:t}},i.a.createElement(w,{key:t,looped:!0,pixelsBetweenItems:8,items:L.map((function(e){return i.a.createElement(x,{key:e},e)}))})),i.a.createElement("label",null,"Finite list of 1 elements with a placeholder"),i.a.createElement("div",{className:"listContainer",style:{width:t}},i.a.createElement(w,{key:t,placeholderElement:i.a.createElement(_,null),pixelsBetweenItems:8,items:L.slice(0,1).map((function(e){return i.a.createElement(x,{key:e},e)}))})),i.a.createElement(C,{width:t,onWidthChanged:n}))}},function(e,t,n){!function(){"use strict";e.exports={polyfill:function(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style)||!0===e.__forceSmoothScrollPolyfill__){var n,l=e.HTMLElement||e.Element,r={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:l.prototype.scroll||c,scrollIntoView:l.prototype.scrollIntoView},o=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,i=(n=e.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(n)?1:0);e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==s(arguments[0])?p.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):r.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!==typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(s(arguments[0])?r.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!==typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},l.prototype.scroll=l.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==s(arguments[0])){var e=arguments[0].left,t=arguments[0].top;p.call(this,this,"undefined"===typeof e?this.scrollLeft:~~e,"undefined"===typeof t?this.scrollTop:~~t)}else{if("number"===typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");r.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!==typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},l.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==s(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):r.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},l.prototype.scrollIntoView=function(){if(!0!==s(arguments[0])){var n=d(this),l=n.getBoundingClientRect(),o=this.getBoundingClientRect();n!==t.body?(p.call(this,n,n.scrollLeft+o.left-l.left,n.scrollTop+o.top-l.top),"fixed"!==e.getComputedStyle(n).position&&e.scrollBy({left:l.left,top:l.top,behavior:"smooth"})):e.scrollBy({left:o.left,top:o.top,behavior:"smooth"})}else r.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function c(e,t){this.scrollLeft=e,this.scrollTop=t}function s(e){if(null===e||"object"!==typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"===typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function a(e,t){return"Y"===t?e.clientHeight+i<e.scrollHeight:"X"===t?e.clientWidth+i<e.scrollWidth:void 0}function u(t,n){var l=e.getComputedStyle(t,null)["overflow"+n];return"auto"===l||"scroll"===l}function f(e){var t=a(e,"Y")&&u(e,"Y"),n=a(e,"X")&&u(e,"X");return t||n}function d(e){for(;e!==t.body&&!1===f(e);)e=e.parentNode||e.host;return e}function m(t){var n,l,r,i,c=(o()-t.startTime)/468;i=c=c>1?1:c,n=.5*(1-Math.cos(Math.PI*i)),l=t.startX+(t.x-t.startX)*n,r=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,l,r),l===t.x&&r===t.y||e.requestAnimationFrame(m.bind(e,t))}function p(n,l,i){var s,a,u,f,d=o();n===t.body?(s=e,a=e.scrollX||e.pageXOffset,u=e.scrollY||e.pageYOffset,f=r.scroll):(s=n,a=n.scrollLeft,u=n.scrollTop,f=c),m({scrollable:s,method:f,startTime:d,startX:a,startY:u,x:l,y:i})}}}}()},function(e,t,n){"use strict";e.exports=n(13)},function(e,t,n){"use strict";n(2);var l=n(0),r=60103;if(t.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var o=Symbol.for;r=o("react.element"),t.Fragment=o("react.fragment")}var i=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,n){var l,o={},a=null,u=null;for(l in void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(u=t.ref),t)c.call(t,l)&&!s.hasOwnProperty(l)&&(o[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===o[l]&&(o[l]=t[l]);return{$$typeof:r,type:e,key:a,ref:u,props:o,_owner:i.current}}t.jsx=a,t.jsxs=a},function(e,t,n){}]]);
//# sourceMappingURL=3.981a46fd.chunk.js.map