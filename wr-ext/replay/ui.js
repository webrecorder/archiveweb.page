/*! ui.js is part of the Webrecorder Extension (https://replayweb.page) Copyright (C) 2020-2021, Webrecorder Software. Licensed under the Affero General Public License v3. */
!function(e,t){for(var i in t)e[i]=t[i]}(self,function(e){var t={};function i(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=459)}({0:function(e,t,i){"use strict";i.d(t,"b",(function(){return l})),i.d(t,"d",(function(){return s})),i.d(t,"c",(function(){return w.a})),i.d(t,"a",(function(){return x}));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new Map;class n{constructor(e,t){if(this._$cssResult$=!0,t!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=o.get(this.cssText);return a&&void 0===e&&(o.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const s=e=>new n("string"==typeof e?e:e+"",r),l=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new n(i,r)},c=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return s(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var d,u;const h={toAttribute(e,t){switch(t){case Boolean:e=e?"":null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:f};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Eh(i,t);void 0!==a&&(this._$Eu.set(a,i),e.push(a))}),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const r=this[e];this[t]=a,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ev=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$Em)&&void 0!==t?t:this._$Em=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Em)||void 0===t||t.splice(this._$Em.indexOf(e)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{a?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const i=document.createElement("style");i.textContent=t.cssText,e.appendChild(i)})})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Em)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Em)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$Eg(e,t,i=b){var a,r;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const n=(null!==(r=null===(a=i.converter)||void 0===a?void 0:a.toAttribute)&&void 0!==r?r:h.toAttribute)(t,i.type);this._$Ei=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(e,t){var i,a,r;const o=this.constructor,n=o._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=o.getPropertyOptions(n),s=e.converter,l=null!==(r=null!==(a=null===(i=s)||void 0===i?void 0:i.fromAttribute)&&void 0!==a?a:"function"==typeof s?s:null)&&void 0!==r?r:h.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||f)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((e,t)=>this[t]=e),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Em)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Em)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(e){return!0}update(e){void 0!==this._$ES&&(this._$ES.forEach((e,t)=>this._$Eg(t,this[t],e)),this._$ES=void 0),this._$ET()}updated(e){}firstUpdated(e){}}p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null===(d=globalThis.reactiveElementPlatformSupport)||void 0===d||d.call(globalThis,{ReactiveElement:p}),(null!==(u=globalThis.reactiveElementVersions)&&void 0!==u?u:globalThis.reactiveElementVersions=[]).push("1.0.0-rc.4");var m,g,v,w=i(7);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class x extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Object(w.d)(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return w.b}}x.finalized=!0,x._$litElement$=!0,null===(m=globalThis.litElementHydrateSupport)||void 0===m||m.call(globalThis,{LitElement:x}),null===(g=globalThis.litElementPlatformSupport)||void 0===g||g.call(globalThis,{LitElement:x});(null!==(v=globalThis.litElementVersions)&&void 0!==v?v:globalThis.litElementVersions=[]).push("3.0.0-rc.4")},104:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>'},105:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>'},108:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>'},109:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>'},115:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>'},116:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>'},117:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path></svg>'},15:function(e,t,i){"use strict";const a=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],r=["B","kiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],o=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],n=["b","kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],s=(e,t,i)=>{let a=e;return"string"==typeof t||Array.isArray(t)?a=e.toLocaleString(t,i):!0!==t&&void 0===i||(a=e.toLocaleString(void 0,i)),a};e.exports=(e,t)=>{if(!Number.isFinite(e))throw new TypeError(`Expected a finite number, got ${typeof e}: ${e}`);const i=(t=Object.assign({bits:!1,binary:!1},t)).bits?t.binary?n:o:t.binary?r:a;if(t.signed&&0===e)return" 0 "+i[0];const l=e<0,c=l?"-":t.signed?"+":"";let d;if(l&&(e=-e),void 0!==t.minimumFractionDigits&&(d={minimumFractionDigits:t.minimumFractionDigits}),void 0!==t.maximumFractionDigits&&(d=Object.assign({maximumFractionDigits:t.maximumFractionDigits},d)),e<1){return c+s(e,t.locale,d)+" "+i[0]}const u=Math.min(Math.floor(t.binary?Math.log(e)/Math.log(1024):Math.log10(e)/3),i.length-1);e/=Math.pow(t.binary?1024:1e3,u),d||(e=e.toPrecision(3));return c+s(Number(e),t.locale,d)+" "+i[u]}},16:function(e,t,i){"use strict";i.d(t,"a",(function(){return o})),i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r}));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},r=e=>(...t)=>({_$litDirective$:e,values:t});class o{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}},183:function(e,t,i){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i=function(e,t){var i=e[1]||"",a=e[3];if(!a)return i;if(t&&"function"==typeof btoa){var r=(n=a,s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),o=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[i].concat(o).concat([r]).join("\n")}var n,s,l;return[i].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(i,"}"):i})).join("")},t.i=function(e,i,a){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(a)for(var o=0;o<this.length;o++){var n=this[o][0];null!=n&&(r[n]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);a&&r[l[0]]||(i&&(l[2]?l[2]="".concat(i," and ").concat(l[2]):l[2]=i),t.push(l))}},t}},184:function(e,t){e.exports='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 66.712418 66.712418" version="1.1" id="wrlogo"><defs id="defs1341"><linearGradient y2="48.223869" x2="97.913383" y1="48.223869" x1="2.9740067" gradientTransform="matrix(0.70268446,0,0,0.70268446,72.622704,112.65806)" gradientUnits="userSpaceOnUse" id="linearGradient6615" xlink:href="#linearGradient5691"></linearGradient><linearGradient id="linearGradient5691"><stop style="stop-color:#4876ff;stop-opacity:1" offset="0" id="stop5687"></stop><stop style="stop-color:#04cdff;stop-opacity:1" offset="1" id="stop5689"></stop></linearGradient></defs><metadata id="metadata1344"><rdf:RDF><cc:Work rdf:about><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc><dc:title></dc:title></cc:Work></rdf:RDF></metadata><g id="layer1" transform="translate(-72.477124,-114.81046)"><circle transform="rotate(0.86915873)" r="33.356209" cy="146.54422" cx="108.06871" id="path6016-0-7-6-9-11-2-8-67-6-50-4-33" style="fill:url(#linearGradient6615);fill-opacity:1;stroke:none;stroke-width:23.3824;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></circle><path style="fill:#d2f9d6;fill-opacity:1;stroke-width:0.702683" d="m 119.62552,156.54036 h 5.46953 c 3.81136,0 6.91161,-3.10024 6.91161,-6.9116 0,-3.81136 -3.10025,-6.9116 -6.91161,-6.9116 h -15.59889 c -3.81136,0 -6.9116,3.10024 -6.9116,6.9116 0,1.96682 0.82917,3.73828 2.15161,4.9982 -0.83057,0.55722 -1.82557,0.88678 -2.89857,0.88678 h -2.082056 c -1.042775,-1.72016 -1.654819,-3.73054 -1.654819,-5.88498 0,-6.2834 5.112035,-11.39543 11.395435,-11.39543 h 15.59889 c 6.28341,0 11.39474,5.11132 11.39474,11.39543 0,6.28411 -5.11222,11.50105 -11.39474,11.39543 l -5.45665,0.14787 v -2.17722 z" id="path114-4-0-85-6-0-5-3-6-1-6"></path><path style="fill:#64e986;fill-opacity:1;stroke-width:0.702683" d="m 91.878825,142.66568 -4.893158,0.0515 c -3.811155,0.0401 -6.911605,3.10024 -6.911605,6.91231 0,3.81065 3.100238,6.91089 6.911605,6.91089 h 15.598893 c 3.81136,0 6.9116,-3.10024 6.9116,-6.91089 0,-1.96682 -0.82917,-3.73899 -2.15162,-4.9989 0.83057,-0.55723 1.82557,-0.88609 2.89857,-0.88609 h 2.08066 c 1.04348,1.71947 1.65552,3.72985 1.65552,5.88499 0,6.28269 -5.11132,11.39472 -11.39473,11.39472 H 86.985667 c -6.282704,0 -11.39544,-5.11132 -11.39544,-11.39472 0,-6.28411 5.112828,-11.49617 11.39544,-11.39614 l 4.893158,0.0779 v 2.17722 z" id="path116-9-4-7-0-8-3-2-08-9-1"></path><path style="fill:#64e986;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path3919-5-9-8-6-6-56-0-37-5-8" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" transform="matrix(-0.38260367,0,0,0.3986412,118.95441,127.09397)"></path><path style="fill:#d2f9d6;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path3919-3-3-7-5-9-7-2-6-8-7-7" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" transform="matrix(0.4122212,0,0,-0.40812,91.057524,172.76152)"></path></g></svg>'},185:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36z"></path></svg>'},186:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>'},187:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"></path></svg>'},188:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z"></path></svg>'},189:function(e,t){e.exports='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="wrlogo" version="1.1" viewBox="0 0 66.712425 66.712425"><defs id="defs1391"><linearGradient xlink:href="#linearGradient5691" id="linearGradient6615" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.2909748,0,0,1.2909748,126.71149,146.96477)" x1="2.9740067" y1="48.223869" x2="97.913383" y2="48.223869"></linearGradient><linearGradient id="linearGradient5691"><stop id="stop5687" offset="0" style="stop-color:#4876ff;stop-opacity:1"></stop><stop id="stop5689" offset="1" style="stop-color:#04cdff;stop-opacity:1"></stop></linearGradient></defs><metadata id="metadata1394"><rdf:RDF><cc:Work rdf:about><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc><dc:title></dc:title></cc:Work></rdf:RDF></metadata><g transform="translate(-72.47712,-114.81045)" id="layer1"><g id="g6505-0" transform="matrix(0.54430533,0,0,0.54430533,3.1570572,32.715999)"><g id="g6654"><circle style="fill:url(#linearGradient6615);fill-opacity:1;stroke:none;stroke-width:42.9582;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path6016-0-7-6-9-11-2-8-67-6-50-4-33" cx="191.83304" cy="209.22058" r="61.282173" transform="rotate(0.86915877)"></circle><path id="path114-4-0-85-6-0-5-3-6-1-6" d="m 213.97635,227.49063 h 10.04864 c 7.00225,0 12.69803,-5.69578 12.69803,-12.69802 0,-7.00225 -5.69578,-12.69803 -12.69803,-12.69803 h -28.65835 c -7.00224,0 -12.69802,5.69578 -12.69802,12.69803 0,3.61344 1.52335,6.86798 3.95295,9.1827 -1.52592,1.02374 -3.35394,1.62921 -5.32526,1.62921 h -3.82517 c -1.91579,-3.1603 -3.04024,-6.85378 -3.04024,-10.81191 0,-11.5439 9.39185,-20.93574 20.93574,-20.93574 h 28.65835 c 11.5439,0 20.93445,9.39054 20.93445,20.93574 0,11.54519 -9.39218,21.12976 -20.93445,20.93573 L 214,236 v -4 z" style="fill:#eeadff;fill-opacity:1;stroke-width:1.29097"></path><path id="path116-9-4-7-0-8-3-2-08-9-1" d="m 163,202 -8.98973,0.0946 c -7.00187,0.0737 -12.69803,5.69578 -12.69803,12.69932 0,7.00095 5.69577,12.69673 12.69803,12.69673 h 28.65835 c 7.00224,0 12.69802,-5.69578 12.69802,-12.69673 0,-3.61344 -1.52335,-6.86928 -3.95296,-9.18399 1.52593,-1.02375 3.35394,-1.62793 5.32527,-1.62793 h 3.82258 c 1.91709,3.15902 3.04153,6.85249 3.04153,10.81192 0,11.5426 -9.39054,20.93444 -20.93444,20.93444 h -28.65835 c -11.54261,0 -20.93575,-9.39054 -20.93575,-20.93444 0,-11.54519 9.39331,-21.1208 20.93575,-20.93703 L 163,194 v 4 z" style="fill:#64e986;fill-opacity:1;stroke-width:1.29097"></path><path transform="matrix(-0.70292103,0,0,0.73238527,212.74337,173.39159)" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" id="path3919-5-9-8-6-6-56-0-37-5-8" style="fill:#64e986;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></path><path transform="matrix(0.75733451,0,0,-0.74979977,161.4911,257.29221)" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" id="path3919-3-3-7-5-9-7-2-6-8-7-7" style="fill:#eeadff;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></path></g></g></g></svg>'},228:function(e,t,i){var a=i(456);e.exports="string"==typeof a?a:a.toString()},229:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path></svg>'},230:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z"></path></svg>'},231:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>'},232:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path></svg>'},233:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg>'},234:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>'},235:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>'},236:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>'},237:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>'},238:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>'},239:function(e,t,i){e.exports=function(){"use strict";function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=e[i];return a}function i(e,i){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(a)return(a=a.call(e)).next.bind(a);if(Array.isArray(e)||(a=function(e,i){if(e){if("string"==typeof e)return t(e,i);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?t(e,i):void 0}}(e))||i&&e&&"number"==typeof e.length){a&&(e=a);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a={exports:{}};function r(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}a.exports={defaults:{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1},getDefaults:r,changeDefaults:function(e){a.exports.defaults=e}};var o=/[&<>"']/,n=/[&<>"']/g,s=/[<>"']|&(?!#?\w+;)/,l=/[<>"']|&(?!#?\w+;)/g,c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},d=function(e){return c[e]},u=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e){return e.replace(u,(function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""}))}var f=/(^|[^\[])\^/g,b=/[^\w:]/g,p=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i,m={},g=/^[^:]+:\/*[^/]*$/,v=/^([^:]+:)[\s\S]*$/,w=/^([^:]+:\/*[^/]*)[\s\S]*$/;function x(e,t){m[" "+e]||(g.test(e)?m[" "+e]=e+"/":m[" "+e]=k(e,"/",!0));var i=-1===(e=m[" "+e]).indexOf(":");return"//"===t.substring(0,2)?i?t:e.replace(v,"$1")+t:"/"===t.charAt(0)?i?t:e.replace(w,"$1")+t:e+t}function k(e,t,i){var a=e.length;if(0===a)return"";for(var r=0;r<a;){var o=e.charAt(a-r-1);if(o!==t||i){if(o===t||!i)break;r++}else r++}return e.substr(0,a-r)}var y=function(e,t){if(t){if(o.test(e))return e.replace(n,d)}else if(s.test(e))return e.replace(l,d);return e},D=h,$=function(e,t){e=e.source||e,t=t||"";var i={replace:function(t,a){return a=(a=a.source||a).replace(f,"$1"),e=e.replace(t,a),i},getRegex:function(){return new RegExp(e,t)}};return i},S=function(e,t,i){if(e){var a;try{a=decodeURIComponent(h(i)).replace(b,"").toLowerCase()}catch(e){return null}if(0===a.indexOf("javascript:")||0===a.indexOf("vbscript:")||0===a.indexOf("data:"))return null}t&&!p.test(i)&&(i=x(t,i));try{i=encodeURI(i).replace(/%25/g,"%")}catch(e){return null}return i},C={exec:function(){}},A=function(e){for(var t,i,a=1;a<arguments.length;a++)for(i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},z=function(e,t){var i=e.replace(/\|/g,(function(e,t,i){for(var a=!1,r=t;--r>=0&&"\\"===i[r];)a=!a;return a?"|":" |"})).split(/ \|/),a=0;if(i[0].trim()||i.shift(),i[i.length-1].trim()||i.pop(),i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;a<i.length;a++)i[a]=i[a].trim().replace(/\\\|/g,"|");return i},E=k,F=function(e,t){if(-1===e.indexOf(t[1]))return-1;for(var i=e.length,a=0,r=0;r<i;r++)if("\\"===e[r])r++;else if(e[r]===t[0])a++;else if(e[r]===t[1]&&--a<0)return r;return-1},_=function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")},B=function(e,t){if(t<1)return"";for(var i="";t>1;)1&t&&(i+=e),t>>=1,e+=e;return i+e},I=a.exports.defaults,L=E,T=z,P=y,R=F;function U(e,t,i,a){var r=t.href,o=t.title?P(t.title):null,n=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){a.state.inLink=!0;var s={type:"link",raw:i,href:r,title:o,text:n,tokens:a.inlineTokens(n,[])};return a.state.inLink=!1,s}return{type:"image",raw:i,href:r,title:o,text:P(n)}}var M=function(){function e(e){this.options=e||I}var t=e.prototype;return t.space=function(e){var t=this.rules.block.newline.exec(e);if(t)return t[0].length>1?{type:"space",raw:t[0]}:{raw:"\n"}},t.code=function(e){var t=this.rules.block.code.exec(e);if(t){var i=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?i:L(i,"\n")}}},t.fences=function(e){var t=this.rules.block.fences.exec(e);if(t){var i=t[0],a=function(e,t){var i=e.match(/^(\s+)(?:```)/);if(null===i)return t;var a=i[1];return t.split("\n").map((function(e){var t=e.match(/^\s+/);return null===t?e:t[0].length>=a.length?e.slice(a.length):e})).join("\n")}(i,t[3]||"");return{type:"code",raw:i,lang:t[2]?t[2].trim():t[2],text:a}}},t.heading=function(e){var t=this.rules.block.heading.exec(e);if(t){var i=t[2].trim();if(/#$/.test(i)){var a=L(i,"#");this.options.pedantic?i=a.trim():a&&!/ $/.test(a)||(i=a.trim())}var r={type:"heading",raw:t[0],depth:t[1].length,text:i,tokens:[]};return this.lexer.inline(r.text,r.tokens),r}},t.hr=function(e){var t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}},t.blockquote=function(e){var t=this.rules.block.blockquote.exec(e);if(t){var i=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(i,[]),text:i}}},t.list=function(e){var t=this.rules.block.list.exec(e);if(t){var i,a,r,o,n,s,l,c,d,u,h=t[1].trim(),f=h.length>1,b={type:"list",raw:"",ordered:f,start:f?+h.slice(0,-1):"",loose:!1,items:[]};h=f?"\\d{1,9}\\"+h.slice(-1):"\\"+h,this.options.pedantic&&(h=f?h:"[*+-]");for(var p=new RegExp("^( {0,3}"+h+")((?: [^\\n]*| *)(?:\\n[^\\n]*)*(?:\\n|$))");e&&!this.rules.block.hr.test(e)&&(t=p.exec(e));){d=t[2].split("\n"),this.options.pedantic?(o=2,u=d[0].trimLeft()):(o=t[2].search(/[^ ]/),o=t[1].length+(o>4?1:o),u=d[0].slice(o-t[1].length)),s=!1,i=t[0],!d[0]&&/^ *$/.test(d[1])&&(i=t[1]+d.slice(0,2).join("\n")+"\n",b.loose=!0,d=[]);var m=new RegExp("^ {0,"+Math.min(3,o-1)+"}(?:[*+-]|\\d{1,9}[.)])");for(n=1;n<d.length;n++){if(c=d[n],this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),m.test(c)){i=t[1]+d.slice(0,n).join("\n")+"\n";break}if(s){if(!(c.search(/[^ ]/)>=o)&&c.trim()){i=t[1]+d.slice(0,n).join("\n")+"\n";break}u+="\n"+c.slice(o)}else c.trim()||(s=!0),c.search(/[^ ]/)>=o?u+="\n"+c.slice(o):u+="\n"+c}b.loose||(l?b.loose=!0:/\n *\n *$/.test(i)&&(l=!0)),this.options.gfm&&(a=/^\[[ xX]\] /.exec(u))&&(r="[ ] "!==a[0],u=u.replace(/^\[[ xX]\] +/,"")),b.items.push({type:"list_item",raw:i,task:!!a,checked:r,loose:!1,text:u}),b.raw+=i,e=e.slice(i.length)}b.items[b.items.length-1].raw=i.trimRight(),b.items[b.items.length-1].text=u.trimRight(),b.raw=b.raw.trimRight();var g=b.items.length;for(n=0;n<g;n++)this.lexer.state.top=!1,b.items[n].tokens=this.lexer.blockTokens(b.items[n].text,[]),b.items[n].tokens.some((function(e){return"space"===e.type}))&&(b.loose=!0,b.items[n].loose=!0);return b}},t.html=function(e){var t=this.rules.block.html.exec(e);if(t){var i={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};return this.options.sanitize&&(i.type="paragraph",i.text=this.options.sanitizer?this.options.sanitizer(t[0]):P(t[0]),i.tokens=[],this.lexer.inline(i.text,i.tokens)),i}},t.def=function(e){var t=this.rules.block.def.exec(e);if(t)return t[3]&&(t[3]=t[3].substring(1,t[3].length-1)),{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}},t.table=function(e){var t=this.rules.block.table.exec(e);if(t){var i={type:"table",header:T(t[1]).map((function(e){return{text:e}})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]?t[3].replace(/\n$/,"").split("\n"):[]};if(i.header.length===i.align.length){i.raw=t[0];var a,r,o,n,s=i.align.length;for(a=0;a<s;a++)/^ *-+: *$/.test(i.align[a])?i.align[a]="right":/^ *:-+: *$/.test(i.align[a])?i.align[a]="center":/^ *:-+ *$/.test(i.align[a])?i.align[a]="left":i.align[a]=null;for(s=i.rows.length,a=0;a<s;a++)i.rows[a]=T(i.rows[a],i.header.length).map((function(e){return{text:e}}));for(s=i.header.length,r=0;r<s;r++)i.header[r].tokens=[],this.lexer.inlineTokens(i.header[r].text,i.header[r].tokens);for(s=i.rows.length,r=0;r<s;r++)for(n=i.rows[r],o=0;o<n.length;o++)n[o].tokens=[],this.lexer.inlineTokens(n[o].text,n[o].tokens);return i}}},t.lheading=function(e){var t=this.rules.block.lheading.exec(e);if(t){var i={type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:[]};return this.lexer.inline(i.text,i.tokens),i}},t.paragraph=function(e){var t=this.rules.block.paragraph.exec(e);if(t){var i={type:"paragraph",raw:t[0],text:"\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1],tokens:[]};return this.lexer.inline(i.text,i.tokens),i}},t.text=function(e){var t=this.rules.block.text.exec(e);if(t){var i={type:"text",raw:t[0],text:t[0],tokens:[]};return this.lexer.inline(i.text,i.tokens),i}},t.escape=function(e){var t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:P(t[1])}},t.tag=function(e){var t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):P(t[0]):t[0]}},t.link=function(e){var t=this.rules.inline.link.exec(e);if(t){var i=t[2].trim();if(!this.options.pedantic&&/^</.test(i)){if(!/>$/.test(i))return;var a=L(i.slice(0,-1),"\\");if((i.length-a.length)%2==0)return}else{var r=R(t[2],"()");if(r>-1){var o=(0===t[0].indexOf("!")?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,o).trim(),t[3]=""}}var n=t[2],s="";if(this.options.pedantic){var l=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);l&&(n=l[1],s=l[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(n=this.options.pedantic&&!/>$/.test(i)?n.slice(1):n.slice(1,-1)),U(t,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:s?s.replace(this.rules.inline._escapes,"$1"):s},t[0],this.lexer)}},t.reflink=function(e,t){var i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){var a=(i[2]||i[1]).replace(/\s+/g," ");if(!(a=t[a.toLowerCase()])||!a.href){var r=i[0].charAt(0);return{type:"text",raw:r,text:r}}return U(i,a,i[0],this.lexer)}},t.emStrong=function(e,t,i){void 0===i&&(i="");var a=this.rules.inline.emStrong.lDelim.exec(e);if(a&&(!a[3]||!i.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))){var r=a[1]||a[2]||"";if(!r||r&&(""===i||this.rules.inline.punctuation.exec(i))){var o,n,s=a[0].length-1,l=s,c=0,d="*"===a[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);null!=(a=d.exec(t));)if(o=a[1]||a[2]||a[3]||a[4]||a[5]||a[6])if(n=o.length,a[3]||a[4])l+=n;else if(!((a[5]||a[6])&&s%3)||(s+n)%3){if(!((l-=n)>0)){if(n=Math.min(n,n+l+c),Math.min(s,n)%2){var u=e.slice(1,s+a.index+n);return{type:"em",raw:e.slice(0,s+a.index+n+1),text:u,tokens:this.lexer.inlineTokens(u,[])}}var h=e.slice(2,s+a.index+n-1);return{type:"strong",raw:e.slice(0,s+a.index+n+1),text:h,tokens:this.lexer.inlineTokens(h,[])}}}else c+=n}}},t.codespan=function(e){var t=this.rules.inline.code.exec(e);if(t){var i=t[2].replace(/\n/g," "),a=/[^ ]/.test(i),r=/^ /.test(i)&&/ $/.test(i);return a&&r&&(i=i.substring(1,i.length-1)),i=P(i,!0),{type:"codespan",raw:t[0],text:i}}},t.br=function(e){var t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}},t.del=function(e){var t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2],[])}},t.autolink=function(e,t){var i,a,r=this.rules.inline.autolink.exec(e);if(r)return a="@"===r[2]?"mailto:"+(i=P(this.options.mangle?t(r[1]):r[1])):i=P(r[1]),{type:"link",raw:r[0],text:i,href:a,tokens:[{type:"text",raw:i,text:i}]}},t.url=function(e,t){var i;if(i=this.rules.inline.url.exec(e)){var a,r;if("@"===i[2])r="mailto:"+(a=P(this.options.mangle?t(i[0]):i[0]));else{var o;do{o=i[0],i[0]=this.rules.inline._backpedal.exec(i[0])[0]}while(o!==i[0]);a=P(i[0]),r="www."===i[1]?"http://"+a:a}return{type:"link",raw:i[0],text:a,href:r,tokens:[{type:"text",raw:a,text:a}]}}},t.inlineText=function(e,t){var i,a=this.rules.inline.text.exec(e);if(a)return i=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(a[0]):P(a[0]):a[0]:P(this.options.smartypants?t(a[0]):a[0]),{type:"text",raw:a[0],text:i}},e}(),j=C,N=$,O=A,H={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:j,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};H.def=N(H.def).replace("label",H._label).replace("title",H._title).getRegex(),H.bullet=/(?:[*+-]|\d{1,9}[.)])/,H.listItemStart=N(/^( *)(bull) */).replace("bull",H.bullet).getRegex(),H.list=N(H.list).replace(/bull/g,H.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+H.def.source+")").getRegex(),H._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",H._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,H.html=N(H.html,"i").replace("comment",H._comment).replace("tag",H._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),H.paragraph=N(H._paragraph).replace("hr",H.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",H._tag).getRegex(),H.blockquote=N(H.blockquote).replace("paragraph",H.paragraph).getRegex(),H.normal=O({},H),H.gfm=O({},H.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),H.gfm.table=N(H.gfm.table).replace("hr",H.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",H._tag).getRegex(),H.pedantic=O({},H.normal,{html:N("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",H._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:j,paragraph:N(H.normal._paragraph).replace("hr",H.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",H.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var q={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:j,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:j,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/,_punctuation:"!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"};q.punctuation=N(q.punctuation).replace(/punctuation/g,q._punctuation).getRegex(),q.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,q.escapedEmSt=/\\\*|\\_/g,q._comment=N(H._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),q.emStrong.lDelim=N(q.emStrong.lDelim).replace(/punct/g,q._punctuation).getRegex(),q.emStrong.rDelimAst=N(q.emStrong.rDelimAst,"g").replace(/punct/g,q._punctuation).getRegex(),q.emStrong.rDelimUnd=N(q.emStrong.rDelimUnd,"g").replace(/punct/g,q._punctuation).getRegex(),q._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,q._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,q._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,q.autolink=N(q.autolink).replace("scheme",q._scheme).replace("email",q._email).getRegex(),q._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,q.tag=N(q.tag).replace("comment",q._comment).replace("attribute",q._attribute).getRegex(),q._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,q._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,q._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,q.link=N(q.link).replace("label",q._label).replace("href",q._href).replace("title",q._title).getRegex(),q.reflink=N(q.reflink).replace("label",q._label).getRegex(),q.reflinkSearch=N(q.reflinkSearch,"g").replace("reflink",q.reflink).replace("nolink",q.nolink).getRegex(),q.normal=O({},q),q.pedantic=O({},q.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:N(/^!?\[(label)\]\((.*?)\)/).replace("label",q._label).getRegex(),reflink:N(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",q._label).getRegex()}),q.gfm=O({},q.normal,{escape:N(q.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),q.gfm.url=N(q.gfm.url,"i").replace("email",q.gfm._extended_email).getRegex(),q.breaks=O({},q.gfm,{br:N(q.br).replace("{2,}","*").getRegex(),text:N(q.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var G={block:H,inline:q},W=M,K=a.exports.defaults,V=G.block,Z=G.inline,Y=B;function Q(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function J(e){var t,i,a="",r=e.length;for(t=0;t<r;t++)i=e.charCodeAt(t),Math.random()>.5&&(i="x"+i.toString(16)),a+="&#"+i+";";return a}var X=function(){function t(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||K,this.options.tokenizer=this.options.tokenizer||new W,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};var t={block:V.normal,inline:Z.normal};this.options.pedantic?(t.block=V.pedantic,t.inline=Z.pedantic):this.options.gfm&&(t.block=V.gfm,this.options.breaks?t.inline=Z.breaks:t.inline=Z.gfm),this.tokenizer.rules=t}t.lex=function(e,i){return new t(i).lex(e)},t.lexInline=function(e,i){return new t(i).inlineTokens(e)};var i,a,r,o=t.prototype;return o.lex=function(e){var t;for(e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens},o.blockTokens=function(e,t){var i,a,r,o,n=this;for(void 0===t&&(t=[]),this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((function(a){return!!(i=a.call({lexer:n},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)}))))if(i=this.tokenizer.space(e))e=e.substring(i.raw.length),i.type&&t.push(i);else if(i=this.tokenizer.code(e))e=e.substring(i.raw.length),!(a=t[t.length-1])||"paragraph"!==a.type&&"text"!==a.type?t.push(i):(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue[this.inlineQueue.length-1].src=a.text);else if(i=this.tokenizer.fences(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.heading(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.hr(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.blockquote(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.list(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.html(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.def(e))e=e.substring(i.raw.length),!(a=t[t.length-1])||"paragraph"!==a.type&&"text"!==a.type?this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title}):(a.raw+="\n"+i.raw,a.text+="\n"+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=a.text);else if(i=this.tokenizer.table(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.lheading(e))e=e.substring(i.raw.length),t.push(i);else if(r=e,this.options.extensions&&this.options.extensions.startBlock&&function(){var t=1/0,i=e.slice(1),a=void 0;n.options.extensions.startBlock.forEach((function(e){"number"==typeof(a=e.call({lexer:this},i))&&a>=0&&(t=Math.min(t,a))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}(),this.state.top&&(i=this.tokenizer.paragraph(r)))a=t[t.length-1],o&&"paragraph"===a.type?(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):t.push(i),o=r.length!==e.length,e=e.substring(i.raw.length);else if(i=this.tokenizer.text(e))e=e.substring(i.raw.length),(a=t[t.length-1])&&"text"===a.type?(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):t.push(i);else if(e){var s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}throw new Error(s)}return this.state.top=!0,t},o.inline=function(e,t){this.inlineQueue.push({src:e,tokens:t})},o.inlineTokens=function(e,t){var i,a,r,o=this;void 0===t&&(t=[]);var n,s,l,c=e;if(this.tokens.links){var d=Object.keys(this.tokens.links);if(d.length>0)for(;null!=(n=this.tokenizer.rules.inline.reflinkSearch.exec(c));)d.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(c=c.slice(0,n.index)+"["+Y("a",n[0].length-2)+"]"+c.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(n=this.tokenizer.rules.inline.blockSkip.exec(c));)c=c.slice(0,n.index)+"["+Y("a",n[0].length-2)+"]"+c.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(n=this.tokenizer.rules.inline.escapedEmSt.exec(c));)c=c.slice(0,n.index)+"++"+c.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(s||(l=""),s=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((function(a){return!!(i=a.call({lexer:o},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)}))))if(i=this.tokenizer.escape(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.tag(e))e=e.substring(i.raw.length),(a=t[t.length-1])&&"text"===i.type&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(i=this.tokenizer.link(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(i.raw.length),(a=t[t.length-1])&&"text"===i.type&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(i=this.tokenizer.emStrong(e,c,l))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.codespan(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.br(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.del(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.autolink(e,J))e=e.substring(i.raw.length),t.push(i);else if(this.state.inLink||!(i=this.tokenizer.url(e,J))){if(r=e,this.options.extensions&&this.options.extensions.startInline&&function(){var t=1/0,i=e.slice(1),a=void 0;o.options.extensions.startInline.forEach((function(e){"number"==typeof(a=e.call({lexer:this},i))&&a>=0&&(t=Math.min(t,a))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}(),i=this.tokenizer.inlineText(r,Q))e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(l=i.raw.slice(-1)),s=!0,(a=t[t.length-1])&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(e){var u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}throw new Error(u)}}else e=e.substring(i.raw.length),t.push(i);return t},i=t,r=[{key:"rules",get:function(){return{block:V,inline:Z}}}],(a=null)&&e(i.prototype,a),r&&e(i,r),t}(),ee=a.exports.defaults,te=S,ie=y,ae=function(){function e(e){this.options=e||ee}var t=e.prototype;return t.code=function(e,t,i){var a=(t||"").match(/\S*/)[0];if(this.options.highlight){var r=this.options.highlight(e,a);null!=r&&r!==e&&(i=!0,e=r)}return e=e.replace(/\n$/,"")+"\n",a?'<pre><code class="'+this.options.langPrefix+ie(a,!0)+'">'+(i?e:ie(e,!0))+"</code></pre>\n":"<pre><code>"+(i?e:ie(e,!0))+"</code></pre>\n"},t.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},t.html=function(e){return e},t.heading=function(e,t,i,a){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+a.slug(i)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},t.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},t.list=function(e,t,i){var a=t?"ol":"ul";return"<"+a+(t&&1!==i?' start="'+i+'"':"")+">\n"+e+"</"+a+">\n"},t.listitem=function(e){return"<li>"+e+"</li>\n"},t.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},t.paragraph=function(e){return"<p>"+e+"</p>\n"},t.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},t.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},t.tablecell=function(e,t){var i=t.header?"th":"td";return(t.align?"<"+i+' align="'+t.align+'">':"<"+i+">")+e+"</"+i+">\n"},t.strong=function(e){return"<strong>"+e+"</strong>"},t.em=function(e){return"<em>"+e+"</em>"},t.codespan=function(e){return"<code>"+e+"</code>"},t.br=function(){return this.options.xhtml?"<br/>":"<br>"},t.del=function(e){return"<del>"+e+"</del>"},t.link=function(e,t,i){if(null===(e=te(this.options.sanitize,this.options.baseUrl,e)))return i;var a='<a href="'+ie(e)+'"';return t&&(a+=' title="'+t+'"'),a+=">"+i+"</a>"},t.image=function(e,t,i){if(null===(e=te(this.options.sanitize,this.options.baseUrl,e)))return i;var a='<img src="'+e+'" alt="'+i+'"';return t&&(a+=' title="'+t+'"'),a+=this.options.xhtml?"/>":">"},t.text=function(e){return e},e}(),re=function(){function e(){}var t=e.prototype;return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,i){return""+i},t.image=function(e,t,i){return""+i},t.br=function(){return""},e}(),oe=function(){function e(){this.seen={}}var t=e.prototype;return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var i=e,a=0;if(this.seen.hasOwnProperty(i)){a=this.seen[e];do{i=e+"-"+ ++a}while(this.seen.hasOwnProperty(i))}return t||(this.seen[e]=a,this.seen[i]=0),i},t.slug=function(e,t){void 0===t&&(t={});var i=this.serialize(e);return this.getNextSafeSlug(i,t.dryrun)},e}(),ne=ae,se=re,le=oe,ce=a.exports.defaults,de=D,ue=X,he=function(){function e(e){this.options=e||ce,this.options.renderer=this.options.renderer||new ne,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new se,this.slugger=new le}e.parse=function(t,i){return new e(i).parse(t)},e.parseInline=function(t,i){return new e(i).parseInline(t)};var t=e.prototype;return t.parse=function(e,t){void 0===t&&(t=!0);var i,a,r,o,n,s,l,c,d,u,h,f,b,p,m,g,v,w,x,k="",y=e.length;for(i=0;i<y;i++)if(u=e[i],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type])||!1===(x=this.options.extensions.renderers[u.type].call({parser:this},u))&&["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type))switch(u.type){case"space":continue;case"hr":k+=this.renderer.hr();continue;case"heading":k+=this.renderer.heading(this.parseInline(u.tokens),u.depth,de(this.parseInline(u.tokens,this.textRenderer)),this.slugger);continue;case"code":k+=this.renderer.code(u.text,u.lang,u.escaped);continue;case"table":for(c="",l="",o=u.header.length,a=0;a<o;a++)l+=this.renderer.tablecell(this.parseInline(u.header[a].tokens),{header:!0,align:u.align[a]});for(c+=this.renderer.tablerow(l),d="",o=u.rows.length,a=0;a<o;a++){for(l="",n=(s=u.rows[a]).length,r=0;r<n;r++)l+=this.renderer.tablecell(this.parseInline(s[r].tokens),{header:!1,align:u.align[r]});d+=this.renderer.tablerow(l)}k+=this.renderer.table(c,d);continue;case"blockquote":d=this.parse(u.tokens),k+=this.renderer.blockquote(d);continue;case"list":for(h=u.ordered,f=u.start,b=u.loose,o=u.items.length,d="",a=0;a<o;a++)g=(m=u.items[a]).checked,v=m.task,p="",m.task&&(w=this.renderer.checkbox(g),b?m.tokens.length>0&&"paragraph"===m.tokens[0].type?(m.tokens[0].text=w+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&"text"===m.tokens[0].tokens[0].type&&(m.tokens[0].tokens[0].text=w+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:w}):p+=w),p+=this.parse(m.tokens,b),d+=this.renderer.listitem(p,v,g);k+=this.renderer.list(d,h,f);continue;case"html":k+=this.renderer.html(u.text);continue;case"paragraph":k+=this.renderer.paragraph(this.parseInline(u.tokens));continue;case"text":for(d=u.tokens?this.parseInline(u.tokens):u.text;i+1<y&&"text"===e[i+1].type;)d+="\n"+((u=e[++i]).tokens?this.parseInline(u.tokens):u.text);k+=t?this.renderer.paragraph(d):d;continue;default:var D='Token with "'+u.type+'" type was not found.';if(this.options.silent)return void console.error(D);throw new Error(D)}else k+=x||"";return k},t.parseInline=function(e,t){t=t||this.renderer;var i,a,r,o="",n=e.length;for(i=0;i<n;i++)if(a=e[i],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type])||!1===(r=this.options.extensions.renderers[a.type].call({parser:this},a))&&["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type))switch(a.type){case"escape":o+=t.text(a.text);break;case"html":o+=t.html(a.text);break;case"link":o+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break;case"image":o+=t.image(a.href,a.title,a.text);break;case"strong":o+=t.strong(this.parseInline(a.tokens,t));break;case"em":o+=t.em(this.parseInline(a.tokens,t));break;case"codespan":o+=t.codespan(a.text);break;case"br":o+=t.br();break;case"del":o+=t.del(this.parseInline(a.tokens,t));break;case"text":o+=t.text(a.text);break;default:var s='Token with "'+a.type+'" type was not found.';if(this.options.silent)return void console.error(s);throw new Error(s)}else o+=r||"";return o},e}(),fe=M,be=ae,pe=re,me=oe,ge=A,ve=_,we=y,xe=a.exports.getDefaults,ke=a.exports.changeDefaults,ye=a.exports.defaults;function De(e,t,i){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof t&&(i=t,t=null),t=ge({},De.defaults,t||{}),ve(t),i){var a,r=t.highlight;try{a=ue.lex(e,t)}catch(e){return i(e)}var o=function(e){var o;if(!e)try{t.walkTokens&&De.walkTokens(a,t.walkTokens),o=he.parse(a,t)}catch(t){e=t}return t.highlight=r,e?i(e):i(null,o)};if(!r||r.length<3)return o();if(delete t.highlight,!a.length)return o();var n=0;return De.walkTokens(a,(function(e){"code"===e.type&&(n++,setTimeout((function(){r(e.text,e.lang,(function(t,i){if(t)return o(t);null!=i&&i!==e.text&&(e.text=i,e.escaped=!0),0==--n&&o()}))}),0))})),void(0===n&&o())}try{var s=ue.lex(e,t);return t.walkTokens&&De.walkTokens(s,t.walkTokens),he.parse(s,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+we(e.message+"",!0)+"</pre>";throw e}}return De.options=De.setOptions=function(e){return ge(De.defaults,e),ke(De.defaults),De},De.getDefaults=xe,De.defaults=ye,De.use=function(){for(var e=this,t=arguments.length,i=new Array(t),a=0;a<t;a++)i[a]=arguments[a];var r,o=ge.apply(void 0,[{}].concat(i)),n=De.defaults.extensions||{renderers:{},childTokens:{}};i.forEach((function(t){if(t.extensions&&(r=!0,t.extensions.forEach((function(e){if(!e.name)throw new Error("extension name required");if(e.renderer){var t=n.renderers?n.renderers[e.name]:null;n.renderers[e.name]=t?function(){for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];var o=e.renderer.apply(this,a);return!1===o&&(o=t.apply(this,a)),o}:e.renderer}if(e.tokenizer){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");n[e.level]?n[e.level].unshift(e.tokenizer):n[e.level]=[e.tokenizer],e.start&&("block"===e.level?n.startBlock?n.startBlock.push(e.start):n.startBlock=[e.start]:"inline"===e.level&&(n.startInline?n.startInline.push(e.start):n.startInline=[e.start]))}e.childTokens&&(n.childTokens[e.name]=e.childTokens)}))),t.renderer&&function(){var e=De.defaults.renderer||new be,i=function(i){var a=e[i];e[i]=function(){for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];var s=t.renderer[i].apply(e,o);return!1===s&&(s=a.apply(e,o)),s}};for(var a in t.renderer)i(a);o.renderer=e}(),t.tokenizer&&function(){var e=De.defaults.tokenizer||new fe,i=function(i){var a=e[i];e[i]=function(){for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];var s=t.tokenizer[i].apply(e,o);return!1===s&&(s=a.apply(e,o)),s}};for(var a in t.tokenizer)i(a);o.tokenizer=e}(),t.walkTokens){var i=De.defaults.walkTokens;o.walkTokens=function(a){t.walkTokens.call(e,a),i&&i(a)}}r&&(o.extensions=n),De.setOptions(o)}))},De.walkTokens=function(e,t){for(var a,r=function(){var e=a.value;switch(t(e),e.type){case"table":for(var r,o=i(e.header);!(r=o()).done;){var n=r.value;De.walkTokens(n.tokens,t)}for(var s,l=i(e.rows);!(s=l()).done;)for(var c,d=i(s.value);!(c=d()).done;){var u=c.value;De.walkTokens(u.tokens,t)}break;case"list":De.walkTokens(e.items,t);break;default:De.defaults.extensions&&De.defaults.extensions.childTokens&&De.defaults.extensions.childTokens[e.type]?De.defaults.extensions.childTokens[e.type].forEach((function(i){De.walkTokens(e[i],t)})):e.tokens&&De.walkTokens(e.tokens,t)}},o=i(e);!(a=o()).done;)r()},De.parseInline=function(e,t){if(null==e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");t=ge({},De.defaults,t||{}),ve(t);try{var i=ue.lexInline(e,t);return t.walkTokens&&De.walkTokens(i,t.walkTokens),he.parseInline(i,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+we(e.message+"",!0)+"</pre>";throw e}},De.Parser=he,De.parser=he.parse,De.Renderer=be,De.TextRenderer=pe,De.Lexer=ue,De.lexer=ue.lex,De.Tokenizer=fe,De.Slugger=me,De.parse=De,De}()},240:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"></path></svg>'},241:function(e,t,i){"use strict";var a=this&&this.__await||function(e){return this instanceof a?(this.v=e,this):new a(e)},r=this&&this.__asyncGenerator||function(e,t,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=i.apply(e,t||[]),n=[];return r={},s("next"),s("throw"),s("return"),r[Symbol.asyncIterator]=function(){return this},r;function s(e){o[e]&&(r[e]=function(t){return new Promise((function(i,a){n.push([e,t,i,a])>1||l(e,t)}))})}function l(e,t){try{(i=o[e](t)).value instanceof a?Promise.resolve(i.value.v).then(c,d):u(n[0][2],i)}catch(e){u(n[0][3],e)}var i}function c(e){l("next",e)}function d(e){l("throw",e)}function u(e,t){e(t),n.shift(),n.length&&l(n[0][0],n[0][1])}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return r(this,arguments,(function*(){const t=/\r?\n/,i=new TextDecoder;let r="",o=e.read();for(;;){const{done:n,value:s}=yield a(o);if(n)return r.length>0&&(yield yield a(JSON.parse(r))),yield a(void 0);r+=i.decode(s,{stream:!0});const l=r.split(t);r=l.pop();for(const e of l)yield yield a(JSON.parse(e));o=e.read()}}))}},242:function(module,exports,__webpack_require__){(function(module){
/**!
 * FlexSearch.js v0.7.21 (Bundle)
 * Copyright 2018-2021 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
!function _f(self){"use strict";try{module&&(self=module)}catch(e){}var t;function u(e){return void 0===e||e}function aa(e){const t=Array(e);for(let i=0;i<e;i++)t[i]=v();return t}function v(){return Object.create(null)}function ba(e,t){return t.length-e.length}function x(e){return"string"==typeof e}function C(e){return"object"==typeof e}function D(e){return"function"==typeof e}function ca(e,t){var i=da;if(e&&(t&&(e=E(e,t)),this.H&&(e=E(e,this.H)),this.J&&1<e.length&&(e=E(e,this.J)),i||""===i)){if(e=e.split(i),this.filter){t=this.filter,i=e.length;const a=[];for(let r=0,o=0;r<i;r++){const i=e[r];i&&!t[i]&&(a[o++]=i)}e=a}return e}return e}self._factory=_f;const da=/[\p{Z}\p{S}\p{P}\p{C}]+/u,ea=/[\u0300-\u036f]/g;function fa(e,t){const i=Object.keys(e),a=i.length,r=[];let o="",n=0;for(let s,l,c=0;c<a;c++)s=i[c],(l=e[s])?(r[n++]=F(t?"(?!\\b)"+s+"(\\b|_)":s),r[n++]=l):o+=(o?"|":"")+s;return o&&(r[n++]=F(t?"(?!\\b)("+o+")(\\b|_)":"("+o+")"),r[n]=""),r}function E(e,t){for(let i=0,a=t.length;i<a&&(e=e.replace(t[i],t[i+1]));i+=2);return e}function F(e){return new RegExp(e,"g")}function ha(e){let t="",i="";for(let a,r=0,o=e.length;r<o;r++)(a=e[r])!==i&&(t+=i=a);return t}var ja={encode:ia,F:!1,G:""};function ia(e){return ca.call(this,(""+e).toLowerCase(),!1)}const ka={},G={};function la(e){I(e,"add"),I(e,"append"),I(e,"search"),I(e,"update"),I(e,"remove")}function I(e,t){e[t+"Async"]=function(){const e=this,i=arguments;var a=i[i.length-1];let r;return D(a)&&(r=a,delete i[i.length-1]),a=new Promise((function(a){setTimeout((function(){e.async=!0;const r=e[t].apply(e,i);e.async=!1,a(r)}))})),r?(a.then(r),this):a}}function ma(e,t,i,a){const r=e.length;let o,n,s=[],l=0;a&&(a=[]);for(let c=r-1;0<=c;c--){const d=e[c],u=d.length,h=v();let f=!o;for(let e=0;e<u;e++){const u=d[e],b=u.length;if(b)for(let e,d,p=0;p<b;p++)if(d=u[p],o){if(o[d]){if(!c)if(i)i--;else if(s[l++]=d,l===t)return s;(c||a)&&(h[d]=1),f=!0}if(a&&(n[d]=(e=n[d])?++e:e=1,e<r)){const t=a[e-2]||(a[e-2]=[]);t[t.length]=d}}else h[d]=1}if(a)o||(n=h);else if(!f)return[];o=h}if(a)for(let e,r,n=a.length-1;0<=n;n--){e=a[n],r=e.length;for(let a,n=0;n<r;n++)if(a=e[n],!o[a]){if(i)i--;else if(s[l++]=a,l===t)return s;o[a]=1}}return s}function na(e,t){const i=v(),a=v(),r=[];for(let t=0;t<e.length;t++)i[e[t]]=1;for(let e,o=0;o<t.length;o++){e=t[o];for(let t,o=0;o<e.length;o++)t=e[o],i[t]&&!a[t]&&(a[t]=1,r[r.length]=t)}return r}function J(e){this.l=!0!==e&&e,this.cache=v(),this.h=[]}function oa(e,t,i){C(e)&&(e=e.query);let a=this.cache.get(e);return a||(a=this.search(e,t,i),this.cache.set(e,a)),a}J.prototype.set=function(e,t){if(!this.cache[e]){var i=this.h.length;for(i===this.l?delete this.cache[this.h[i-1]]:i++,--i;0<i;i--)this.h[i]=this.h[i-1];this.h[0]=e}this.cache[e]=t},J.prototype.get=function(e){const t=this.cache[e];if(this.l&&t&&(e=this.h.indexOf(e))){const t=this.h[e-1];this.h[e-1]=this.h[e],this.h[e]=t}return t};const qa={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},default:{}};function ra(e,t,i,a,r,o){setTimeout((function(){const n=e(i,JSON.stringify(o));n&&n.then?n.then((function(){t.export(e,t,i,a,r+1)})):t.export(e,t,i,a,r+1)}))}function K(e,t){if(!(this instanceof K))return new K(e);var i;if(e){x(e)?e=qa[e]:(i=e.preset)&&(e=Object.assign({},i[i],e)),i=e.charset;var a=e.lang;x(i)&&(-1===i.indexOf(":")&&(i+=":default"),i=G[i]),x(a)&&(a=ka[a])}else e={};let r,o,n=e.context||{};if(this.encode=e.encode||i&&i.encode||ia,this.register=t||v(),this.D=r=e.resolution||9,this.G=t=i&&i.G||e.tokenize||"strict",this.depth="strict"===t&&n.depth,this.l=u(n.bidirectional),this.s=o=u(e.optimize),this.m=u(e.fastupdate),this.B=e.minlength||1,this.C=e.boost,this.map=o?aa(r):v(),this.A=r=n.resolution||1,this.h=o?aa(r):v(),this.F=i&&i.F||e.rtl,this.H=(t=e.matcher||a&&a.H)&&fa(t,!1),this.J=(t=e.stemmer||a&&a.J)&&fa(t,!0),i=t=e.filter||a&&a.filter){i=t,a=v();for(let e=0,t=i.length;e<t;e++)a[i[e]]=1;i=a}this.filter=i,this.cache=(t=e.cache)&&new J(t)}function L(e,t,i,a,r){return i&&1<e?t+(a||0)<=e?i+(r||0):(e-1)/(t+(a||0))*(i+(r||0))+1|0:0}function M(e,t,i,a,r,o,n){let s=n?e.h:e.map;(!t[i]||n&&!t[i][n])&&(e.s&&(s=s[a]),n?((t=t[i]||(t[i]=v()))[n]=1,s=s[n]||(s[n]=v())):t[i]=1,s=s[i]||(s[i]=[]),e.s||(s=s[a]||(s[a]=[])),o&&-1!==s.indexOf(r)||(s[s.length]=r,e.m&&((e=e.register[r]||(e.register[r]=[]))[e.length]=s)))}function sa(e,t,i,a,r,o,n,s){let l=[],c=s?e.h:e.map;if(e.s||(c=ua(c,n,s,e.l)),c){let i=0;const d=Math.min(c.length,s?e.A:e.D);for(let t,u,h=0,f=0;h<d&&!((t=c[h])&&(e.s&&(t=ua(t,n,s,e.l)),r&&t&&o&&(u=t.length,u<=r?(r-=u,t=null):(t=t.slice(r),r=0)),t&&(l[i++]=t,o&&(f+=t.length,f>=a))));h++);if(i)return o?ta(l,a,0):void(t[t.length]=l)}return!i&&l}function ta(e,t,i){return e=1===e.length?e[0]:[].concat.apply([],e),i||e.length>t?e.slice(i,i+t):e}function ua(e,t,i,a){return i?e=(e=e[(a=a&&t>i)?t:i])&&e[a?i:t]:e=e[t],e}function N(e,t,i,a,r){let o=0;if(e.constructor===Array)if(r)-1!==(t=e.indexOf(t))?1<e.length&&(e.splice(t,1),o++):o++;else{r=Math.min(e.length,i);for(let n,s=0;s<r;s++)(n=e[s])&&(o=N(n,t,i,a,r),a||o||delete e[s])}else for(let n in e)(o=N(e[n],t,i,a,r))||delete e[n];return o}function va(e){e=e.data;var t=self._index;const i=e.args;var a=e.task;switch(a){case"init":a=e.options||{},e=e.factory,t=a.encode,a.cache=!1,t&&0===t.indexOf("function")&&(a.encode=Function("return "+t)()),e?(Function("return "+e)()(self),self._index=new self.FlexSearch.Index(a),delete self.FlexSearch):self._index=new K(a);break;default:e=e.id,t=t[a].apply(t,i),postMessage("search"===a?{id:e,msg:t}:{id:e})}}t=K.prototype,t.append=function(e,t){return this.add(e,t,!0)},t.add=function(e,t,i,a){if(t&&(e||0===e)){if(!a&&!i&&this.register[e])return this.update(e,t);if(a=(t=this.encode(t)).length){const c=v(),d=v(),u=this.depth,h=this.D;for(let f=0;f<a;f++){let b=t[this.F?a-1-f:f];var r=b.length;if(b&&r>=this.B&&(u||!d[b])){var o=L(h,a,f),n="";switch(this.G){case"full":if(3<r){for(o=0;o<r;o++)for(var s=r;s>o;s--)if(s-o>=this.B){var l=L(h,a,f,r,o);M(this,d,n=b.substring(o,s),l,e,i)}break}case"reverse":if(2<r){for(s=r-1;0<s;s--)(n=b[s]+n).length>=this.B&&M(this,d,n,L(h,a,f,r,s),e,i);n=""}case"forward":if(1<r){for(s=0;s<r;s++)(n+=b[s]).length>=this.B&&M(this,d,n,o,e,i);break}default:if(this.C&&(o=Math.min(o/this.C(t,b,f)|0,h-1)),M(this,d,b,o,e,i),u&&1<a&&f<a-1)for(r=v(),n=this.A,o=b,s=Math.min(u+1,a-f),r[o]=1,l=1;l<s;l++)if((b=t[this.F?a-1-f-l:f+l])&&b.length>=this.B&&!r[b]){r[b]=1;const t=this.l&&b>o;M(this,c,t?o:b,L(n+(a/2>n?0:1),a,f,s-1,l-1),e,i,t?b:o)}}}}this.m||(this.register[e]=1)}}return this},t.search=function(e,t,i){i||(!t&&C(e)?e=(i=e).query:C(t)&&(i=t));let a,r,o,n,s,l=[],c=0;if(i){t=i.limit,c=i.offset||0;var d=i.context;r=i.suggest}if(e&&(a=(e=this.encode(e)).length,1<a)){i=v();var u=[];for(let t,o=0,n=0;o<a;o++)if((t=e[o])&&t.length>=this.B&&!i[t]){if(!(this.s||r||this.map[t]))return l;u[n++]=t,i[t]=1}a=(e=u).length}if(!a)return l;for(t||(t=100),i=0,(d=this.depth&&1<a&&!1!==d)?(o=e[0],i=1):1<a&&e.sort(ba);i<a;i++){if(s=e[i],d?(n=sa(this,l,r,t,c,2===a,s,o),r&&!1===n&&l.length||(o=s)):n=sa(this,l,r,t,c,1===a,s),n)return n;if(r&&i===a-1){if(!(u=l.length)){if(d){d=0,i=-1;continue}return l}if(1===u)return ta(l[0],t,c)}}return ma(l,t,c,r)},t.contain=function(e){return!!this.register[e]},t.update=function(e,t){return this.remove(e).add(e,t)},t.remove=function(e,t){const i=this.register[e];if(i){if(this.m)for(let t,a=0;a<i.length;a++)t=i[a],t.splice(t.indexOf(e),1);else N(this.map,e,this.D,this.s),this.depth&&N(this.h,e,this.A,this.s);if(t||delete this.register[e],this.cache){t=this.cache;for(let i,a,r=0;r<t.h.length;r++)a=t.h[r],i=t.cache[a],-1!==i.indexOf(e)&&(t.h.splice(r--,1),delete t.cache[a])}}return this},t.searchCache=oa,t.export=function(e,t,i,a,r){let o,n;switch(r||(r=0)){case 0:if(o="reg",this.m){n=v();for(let e in this.register)n[e]=1}else n=this.register;break;case 1:o="cfg",n={doc:0,opt:this.s?1:0};break;case 2:o="map",n=this.map;break;case 3:o="ctx",n=this.h;break;default:return}return ra(e,t||this,i?i+"."+o:o,a,r,n),!0},t.import=function(e,t){if(t)switch(x(t)&&(t=JSON.parse(t)),e){case"cfg":this.s=!!t.opt;break;case"reg":this.m=!1,this.register=t;break;case"map":this.map=t;break;case"ctx":this.h=t}},la(K.prototype);let wa=0;function O(e){if(!(this instanceof O))return new O(e);var t;e?D(t=e.encode)&&(e.encode=t.toString()):e={},(t=(self||window)._factory)&&(t=t.toString());const i=self.exports,a=this;this.o=xa(t,i,e.worker),this.h=v(),this.o&&(i?this.o.on("message",(function(e){a.h[e.id](e.msg),delete a.h[e.id]})):this.o.onmessage=function(e){e=e.data,a.h[e.id](e.msg),delete a.h[e.id]},this.o.postMessage({task:"init",factory:t,options:e}))}function P(e){O.prototype[e]=O.prototype[e+"Async"]=function(){const t=this,i=[].slice.call(arguments);var a=i[i.length-1];let r;return D(a)&&(r=a,i.splice(i.length-1,1)),a=new Promise((function(a){setTimeout((function(){t.h[++wa]=a,t.o.postMessage({task:e,id:wa,args:i})}))})),r?(a.then(r),this):a}}function xa(a,b,c){let d;try{d=b?eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")'):a?new Worker(URL.createObjectURL(new Blob(["onmessage="+va.toString()],{type:"text/javascript"}))):new Worker(x(c)?c:"worker/worker.js",{type:"module"})}catch(e){}return d}function Q(e){if(!(this instanceof Q))return new Q(e);var t,i=e.document||e.doc||e;this.K=[],this.h=[],this.A=[],this.register=v(),this.key=(t=i.key||i.id)&&S(t,this.A)||"id",this.m=u(e.fastupdate),this.C=(t=i.store)&&!0!==t&&[],this.store=t&&v(),this.I=(t=i.tag)&&S(t,this.A),this.l=t&&v(),this.cache=(t=e.cache)&&new J(t),e.cache=!1,this.o=e.worker,this.async=!1,t=v();let a=i.index||i.field||i;x(a)&&(a=[a]);for(let i,r,o=0;o<a.length;o++)i=a[o],x(i)||(r=i,i=i.field),r=C(r)?Object.assign({},e,r):e,this.o&&(t[i]=new O(r),t[i].o||(this.o=!1)),this.o||(t[i]=new K(r,this.register)),this.K[o]=S(i,this.A),this.h[o]=i;if(this.C)for(x(e=i.store)&&(e=[e]),i=0;i<e.length;i++)this.C[i]=S(e[i],this.A);this.index=t}function S(e,t){const i=e.split(":");let a=0;for(let r=0;r<i.length;r++)0<=(e=i[r]).indexOf("[]")&&(e=e.substring(0,e.length-2))&&(t[a]=!0),e&&(i[a++]=e);return a<i.length&&(i.length=a),1<a?i:i[0]}function T(e,t){if(x(t))e=e[t];else for(let i=0;e&&i<t.length;i++)e=e[t[i]];return e}function U(e,t,i,a,r){if(e=e[r],a===i.length-1)t[r]=e;else if(e)if(e.constructor===Array)for(t=t[r]=Array(e.length),r=0;r<e.length;r++)U(e,t,i,a,r);else t=t[r]||(t[r]=v()),r=i[++a],U(e,t,i,a,r)}function V(e,t,i,a,r,o,n,s){if(e=e[n])if(a===t.length-1){if(e.constructor===Array){if(i[a]){for(t=0;t<e.length;t++)r.add(o,e[t],!0,!0);return}e=e.join(" ")}r.add(o,e,s,!0)}else if(e.constructor===Array)for(n=0;n<e.length;n++)V(e,t,i,a,r,o,n,s);else n=t[++a],V(e,t,i,a,r,o,n,s)}function ya(e,t,i,a){let r=this.l[e],o=r&&r.length-i;if(o&&0<o)return(o>t||i)&&(r=r.slice(i,i+t)),a&&(r=za.call(this,r)),{tag:e,result:r}}function za(e){const t=Array(e.length);for(let i,a=0;a<e.length;a++)i=e[a],t[a]={id:i,doc:this.store[i]};return t}P("add"),P("append"),P("search"),P("update"),P("remove"),t=Q.prototype,t.add=function(e,t,i){if(C(e)&&(e=T(t=e,this.key)),t&&(e||0===e)){if(!i&&this.register[e])return this.update(e,t);for(let a,r,o=0;o<this.h.length;o++)r=this.h[o],a=this.K[o],x(a)&&(a=[a]),V(t,a,this.A,0,this.index[r],e,a[0],i);if(this.I){let a=T(t,this.I),r=v();x(a)&&(a=[a]);for(let t,o,n=0;n<a.length;n++)if(t=a[n],!r[t]&&(r[t]=1,o=this.l[t]||(this.l[t]=[]),!i||-1===o.indexOf(e))&&(o[o.length]=e,this.m)){const t=this.register[e]||(this.register[e]=[]);t[t.length]=o}}if(this.store&&(!i||!this.store[e])){let i;if(this.C){i=v();for(let e,a=0;a<this.C.length;a++)e=this.C[a],x(e)?i[e]=t[e]:U(t,i,e,0,e[0])}this.store[e]=i||t}}return this},t.append=function(e,t){return this.add(e,t,!0)},t.update=function(e,t){return this.remove(e).add(e,t)},t.remove=function(e){if(C(e)&&(e=T(e,this.key)),this.register[e]){for(var t=0;t<this.h.length&&(this.index[this.h[t]].remove(e,!this.o),!this.m);t++);if(this.I&&!this.m)for(let i in this.l){const a=(t=this.l[i]).indexOf(e);-1!==a&&(1<t.length?t.splice(a,1):delete this.l[i])}this.store&&delete this.store[e],delete this.register[e]}return this},t.search=function(e,t,i,a){i||(!t&&C(e)?e=(i=e).query:C(t)&&(i=t,t=0));let r,o,n,s,l,c,d=[],u=[],h=0;if(i)if(i.constructor===Array)n=i,i=null;else{if(n=(r=i.pluck)||i.index||i.field,s=i.tag,o=this.store&&i.enrich,l="and"===i.bool,t=i.limit||100,c=i.offset||0,s&&(x(s)&&(s=[s]),!e)){for(let e,i=0;i<s.length;i++)(e=ya.call(this,s[i],t,c,o))&&(d[d.length]=e,h++);return h?d:[]}x(n)&&(n=[n])}n||(n=this.h),l=l&&(1<n.length||s&&1<s.length);const f=!a&&(this.o||this.async)&&[];for(let r,o,b,p=0;p<n.length;p++){let m;if(o=n[p],x(o)||(m=o,o=o.field),f)f[p]=this.index[o].searchAsync(e,t,m||i);else{if(r=a?a[p]:this.index[o].search(e,t,m||i),b=r&&r.length,s&&b){const e=[];let i=0;l&&(e[0]=[r]);for(let t,a,r=0;r<s.length;r++)t=s[r],(b=(a=this.l[t])&&a.length)&&(i++,e[e.length]=l?[a]:a);i&&(r=l?ma(e,t||100,c||0):na(r,e),b=r.length)}if(b)u[h]=o,d[h++]=r;else if(l)return[]}}if(f){const a=this;return new Promise((function(r){Promise.all(f).then((function(o){r(a.search(e,t,i,o))}))}))}if(!h)return[];if(r&&(!o||!this.store))return d[0];for(let e,t=0;t<u.length;t++){if(e=d[t],e.length&&o&&(e=za.call(this,e)),r)return e;d[t]={field:u[t],result:e}}return d},t.contain=function(e){return!!this.register[e]},t.get=function(e){return this.store[e]},t.set=function(e,t){return this.store[e]=t,this},t.searchCache=oa,t.export=function(e,t,i,a,r){if(r||(r=0),a||(a=0),a<this.h.length){const i=this.h[a],o=this.index[i];t=this,setTimeout((function(){o.export(e,t,r?i.replace(":","-"):"",a,r++)||(a++,r=1,t.export(e,t,i,a,r))}))}else{let t;switch(r){case 1:i="tag",t=this.l;break;case 2:i="store",t=this.store;break;default:return}ra(e,this,i,a,r,t)}},t.import=function(e,t){if(t)switch(x(t)&&(t=JSON.parse(t)),e){case"tag":this.l=t;break;case"reg":this.m=!1,this.register=t;for(let e,i=0;i<this.h.length;i++)e=this.index[this.h[i]],e.register=t,e.m=!1;break;case"store":this.store=t;break;default:const i=(e=e.split("."))[0];e=e[1],i&&e&&this.index[i].import(e,t)}},la(Q.prototype);var Ba={encode:Aa,F:!1,G:""};const Ca=[F("[àáâãäå]"),"a",F("[èéêë]"),"e",F("[ìíîï]"),"i",F("[òóôõöő]"),"o",F("[ùúûüű]"),"u",F("[ýŷÿ]"),"y",F("ñ"),"n",F("[çc]"),"k",F("ß"),"s",F(" & ")," and "];function Aa(e){var t=e;return t.normalize&&(t=t.normalize("NFD").replace(ea,"")),ca.call(this,t.toLowerCase(),!e.normalize&&Ca)}var Ea={encode:Da,F:!1,G:"strict"};const Fa=/[^a-z0-9]+/,Ga={b:"p",v:"f",w:"f",z:"s",x:"s","ß":"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Da(e){const t=[];if(e=Aa.call(this,e).join(" ")){const i=e.split(Fa),a=i.length;for(let r,o=0,n=0;o<a;o++)if((e=i[o])&&(!this.filter||!this.filter[e])){r=e[0];let i=Ga[r]||r,a=i;for(let t=1;t<e.length;t++){r=e[t];const o=Ga[r]||r;o&&o!==a&&(i+=o,a=o)}t[n++]=i}}return t}var Ia={encode:Ha,F:!1,G:""};const Ja=[F("ae"),"a",F("oe"),"o",F("sh"),"s",F("th"),"t",F("ph"),"f",F("pf"),"f",F("(?![aeo])h(?![aeo])"),"",F("(?!^[aeo])h(?!^[aeo])"),""];function Ha(e,t){return e&&(2<(e=Da.call(this,e).join(" ")).length&&(e=E(e,Ja)),t||(1<e.length&&(e=ha(e)),e&&(e=e.split(" ")))),e}var La={encode:Ka,F:!1,G:""};const Ma=F("(?!\\b)[aeo]");function Ka(e){return e&&(1<(e=Ha.call(this,e,!0)).length&&(e=e.replace(Ma,"")),1<e.length&&(e=ha(e)),e&&(e=e.split(" "))),e}G["latin:default"]=ja,G["latin:simple"]=Ba,G["latin:balance"]=Ea,G["latin:advanced"]=Ia,G["latin:extra"]=La;const W=self;let Y;const Z={Index:K,Document:Q,Worker:O,registerCharset:function(e,t){G[e]=t},registerLanguage:function(e,t){ka[e]=t}};(Y=W.define)&&Y.amd?Y([],(function(){return Z})):W.exports?W.exports=Z:W.FlexSearch=Z}(this)}).call(this,__webpack_require__(70)(module))},243:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>'},244:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>'},245:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>'},246:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>'},247:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>'},248:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>'},249:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"></path></svg>'},28:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient spreadMethod="pad" y2="0" x2="1" y1="0" x1="0" id="svg_6"><stop offset="0" stop-opacity="1.0" stop-color="#4876ff"></stop><stop offset="1" stop-opacity="1.0" stop-color="#04cdff"></stop></linearGradient><linearGradient y2="0" x2="1" y1="0" x1="0" id="svg_7"><stop offset="0" stop-opacity="1.0" stop-color="#4876ff"></stop><stop offset="1" stop-opacity="1.0" stop-color="#04cdff"></stop></linearGradient></defs><g><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"></rect></g></g><g><ellipse stroke="url(#svg_7)" ry="24.37472" rx="24.37472" id="svg_3" cy="32" cx="32" stroke-width="1.5" fill="url(#svg_6)"></ellipse></g></svg>'},456:function(e,t,i){(t=i(183)(!1)).push([e.i,'.input::placeholder,.textarea::placeholder,.select select::placeholder{opacity:1}a:focus{color:#363636}.file-label:focus-within .file-cta{background-color:#e8e8e8;color:#363636}.button.is-primary:focus,.button.is-primary:hover,.button.is-primary:active{background-color:#459558 !important;color:white !important}.replay-bar .button{margin:0 1px}.replay-bar .button:focus{box-shadow:none !important;outline:1px dotted #4876ff;outline:-webkit-focus-ring-color auto 1px}.skip-link{border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute !important;width:1px;word-wrap:normal !important}.skip-link:focus{background-color:black;border-radius:3px;box-shadow:0 0 2px 2px rgba(0,0,0,0.6);clip:auto !important;clip-path:none;color:white;display:block;font-family:inherit;font-size:1.3em;font-weight:bold;height:auto;left:5px;line-height:normal;padding:15px 23px 14px;text-decoration:none;top:5px;width:auto;z-index:100000}.main-scroll{flex:1;scroll-behavior:smooth;overflow-y:auto;max-height:100vh;height:100%;display:flex;flex-direction:column;overflow-x:hidden}/*! bulma.io v0.9.3 | MIT License | github.com/jgthms/bulma */.button,.input,.textarea,.select select,.file-cta,.file-name,.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.5em;justify-content:flex-start;line-height:1.5;padding-bottom:calc(0.5em - 1px);padding-left:calc(0.75em - 1px);padding-right:calc(0.75em - 1px);padding-top:calc(0.5em - 1px);position:relative;vertical-align:top}.button:focus,.input:focus,.textarea:focus,.select select:focus,.file-cta:focus,.file-name:focus,.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus,.pagination-ellipsis:focus,.is-focused.button,.is-focused.input,.is-focused.textarea,.select select.is-focused,.is-focused.file-cta,.is-focused.file-name,.is-focused.pagination-previous,.is-focused.pagination-next,.is-focused.pagination-link,.is-focused.pagination-ellipsis,.button:active,.input:active,.textarea:active,.select select:active,.file-cta:active,.file-name:active,.pagination-previous:active,.pagination-next:active,.pagination-link:active,.pagination-ellipsis:active,.is-active.button,.is-active.input,.is-active.textarea,.select select.is-active,.is-active.file-cta,.is-active.file-name,.is-active.pagination-previous,.is-active.pagination-next,.is-active.pagination-link,.is-active.pagination-ellipsis{outline:none}.button[disabled],.input[disabled],.textarea[disabled],.select select[disabled],.file-cta[disabled],.file-name[disabled],.pagination-previous[disabled],.pagination-next[disabled],.pagination-link[disabled],.pagination-ellipsis[disabled],fieldset[disabled] .button,fieldset[disabled] .input,fieldset[disabled] .textarea,fieldset[disabled] .select select,.select fieldset[disabled] select,fieldset[disabled] .file-cta,fieldset[disabled] .file-name,fieldset[disabled] .pagination-previous,fieldset[disabled] .pagination-next,fieldset[disabled] .pagination-link,fieldset[disabled] .pagination-ellipsis{cursor:not-allowed}.button,.file,.breadcrumb,.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis,.tabs,.is-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select:not(.is-multiple):not(.is-loading)::after,.navbar-link:not(.is-arrowless)::after{border:3px solid rgba(0,0,0,0);border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:0.625em}.box:not(:last-child),.content:not(:last-child),.notification:not(:last-child),.progress:not(:last-child),.table:not(:last-child),.table-container:not(:last-child),.title:not(:last-child),.subtitle:not(:last-child),.block:not(:last-child),.breadcrumb:not(:last-child),.level:not(:last-child),.message:not(:last-child),.pagination:not(:last-child),.tabs:not(:last-child){margin-bottom:1.5rem}.delete,.modal-close{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;background-color:rgba(10,10,10,0.2);border:none;border-radius:9999px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete::before,.modal-close::before,.delete::after,.modal-close::after{background-color:#fff;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.delete::before,.modal-close::before{height:2px;width:50%}.delete::after,.modal-close::after{height:50%;width:2px}.delete:hover,.modal-close:hover,.delete:focus,.modal-close:focus{background-color:rgba(10,10,10,0.3)}.delete:active,.modal-close:active{background-color:rgba(10,10,10,0.4)}.is-small.delete,.is-small.modal-close{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete,.is-medium.modal-close{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete,.is-large.modal-close{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading::after,.loader,.select.is-loading::after,.control.is-loading::after{animation:spinAround 500ms infinite linear;border:2px solid #dbdbdb;border-radius:9999px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.image.is-square img,.image.is-square .has-ratio,.image.is-1by1 img,.image.is-1by1 .has-ratio,.image.is-5by4 img,.image.is-5by4 .has-ratio,.image.is-4by3 img,.image.is-4by3 .has-ratio,.image.is-3by2 img,.image.is-3by2 .has-ratio,.image.is-5by3 img,.image.is-5by3 .has-ratio,.image.is-16by9 img,.image.is-16by9 .has-ratio,.image.is-2by1 img,.image.is-2by1 .has-ratio,.image.is-3by1 img,.image.is-3by1 .has-ratio,.image.is-4by5 img,.image.is-4by5 .has-ratio,.image.is-3by4 img,.image.is-3by4 .has-ratio,.image.is-2by3 img,.image.is-2by3 .has-ratio,.image.is-3by5 img,.image.is-3by5 .has-ratio,.image.is-9by16 img,.image.is-9by16 .has-ratio,.image.is-1by2 img,.image.is-1by2 .has-ratio,.image.is-1by3 img,.image.is-1by3 .has-ratio,.modal,.modal-background,.is-overlay,.hero-video{bottom:0;left:0;position:absolute;right:0;top:0}.navbar-burger{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0}/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:inherit}html{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,optgroup,select,textarea{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a{color:#4876ff;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{background-color:#f5f5f5;color:#da1039;font-size:.875em;font-weight:normal;padding:0.25em 0.5em 0.25em}hr{background-color:#f5f5f5;border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type="checkbox"],input[type="radio"]{vertical-align:baseline}small{font-size:.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}fieldset{border:none}pre{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{vertical-align:top}table td:not([align]),table th:not([align]){text-align:inherit}table th{color:#363636}@keyframes spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.box{background-color:#fff;border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);color:#4a4a4a;display:block;padding:1.25rem}a.box:hover,a.box:focus{box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0 0 1px #4876ff}a.box:active{box-shadow:inset 0 1px 2px rgba(10,10,10,0.2),0 0 0 1px #4876ff}.button{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding-bottom:calc(0.5em - 1px);padding-left:1em;padding-right:1em;padding-top:calc(0.5em - 1px);text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-small,.button .icon.is-medium,.button .icon.is-large{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-0.5em - 1px);margin-right:.25em}.button .icon:last-child:not(:first-child){margin-left:.25em;margin-right:calc(-0.5em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-0.5em - 1px);margin-right:calc(-0.5em - 1px)}.button:hover,.button.is-hovered{border-color:#b5b5b5;color:#363636}.button:focus,.button.is-focused{border-color:#485fc7;color:#363636}.button:focus:not(:active),.button.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.button:active,.button.is-active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text:hover,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text.is-focused{background-color:#f5f5f5;color:#363636}.button.is-text:active,.button.is-text.is-active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled],fieldset[disabled] .button.is-text{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-ghost{background:none;border-color:rgba(0,0,0,0);color:#4876ff;text-decoration:none}.button.is-ghost:hover,.button.is-ghost.is-hovered{color:#4876ff;text-decoration:underline}.button.is-white{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white:hover,.button.is-white.is-hovered{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white:focus,.button.is-white.is-focused{border-color:transparent;color:#0a0a0a}.button.is-white:focus:not(:active),.button.is-white.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.button.is-white:active,.button.is-white.is-active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled],fieldset[disabled] .button.is-white{background-color:#fff;border-color:transparent;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted:hover,.button.is-white.is-inverted.is-hovered{background-color:#000}.button.is-white.is-inverted[disabled],fieldset[disabled] .button.is-white.is-inverted{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined:hover,.button.is-white.is-outlined.is-hovered,.button.is-white.is-outlined:focus,.button.is-white.is-outlined.is-focused{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-white.is-outlined.is-loading:hover::after,.button.is-white.is-outlined.is-loading.is-hovered::after,.button.is-white.is-outlined.is-loading:focus::after,.button.is-white.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined[disabled],fieldset[disabled] .button.is-white.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined:hover,.button.is-white.is-inverted.is-outlined.is-hovered,.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined.is-focused{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined.is-loading:hover::after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-white.is-inverted.is-outlined.is-loading:focus::after,.button.is-white.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-white.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black:hover,.button.is-black.is-hovered{background-color:#040404;border-color:transparent;color:#fff}.button.is-black:focus,.button.is-black.is-focused{border-color:transparent;color:#fff}.button.is-black:focus:not(:active),.button.is-black.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.button.is-black:active,.button.is-black.is-active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled],fieldset[disabled] .button.is-black{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted:hover,.button.is-black.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-black.is-inverted[disabled],fieldset[disabled] .button.is-black.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined:hover,.button.is-black.is-outlined.is-hovered,.button.is-black.is-outlined:focus,.button.is-black.is-outlined.is-focused{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-outlined.is-loading:hover::after,.button.is-black.is-outlined.is-loading.is-hovered::after,.button.is-black.is-outlined.is-loading:focus::after,.button.is-black.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-black.is-outlined[disabled],fieldset[disabled] .button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined:hover,.button.is-black.is-inverted.is-outlined.is-hovered,.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined.is-focused{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading:hover::after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-black.is-inverted.is-outlined.is-loading:focus::after,.button.is-black.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light{background-color:#d2f9d6;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:hover,.button.is-light.is-hovered{background-color:#c7f8cc;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:focus,.button.is-light.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:focus:not(:active),.button.is-light.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.button.is-light:active,.button.is-light.is-active{background-color:#bcf6c2;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light[disabled],fieldset[disabled] .button.is-light{background-color:#d2f9d6;border-color:transparent;box-shadow:none}.button.is-light.is-inverted{background-color:rgba(0,0,0,0.7);color:#d2f9d6}.button.is-light.is-inverted:hover,.button.is-light.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-light.is-inverted[disabled],fieldset[disabled] .button.is-light.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#d2f9d6}.button.is-light.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-light.is-outlined{background-color:transparent;border-color:#d2f9d6;color:#d2f9d6}.button.is-light.is-outlined:hover,.button.is-light.is-outlined.is-hovered,.button.is-light.is-outlined:focus,.button.is-light.is-outlined.is-focused{background-color:#d2f9d6;border-color:#d2f9d6;color:rgba(0,0,0,0.7)}.button.is-light.is-outlined.is-loading::after{border-color:transparent transparent #d2f9d6 #d2f9d6 !important}.button.is-light.is-outlined.is-loading:hover::after,.button.is-light.is-outlined.is-loading.is-hovered::after,.button.is-light.is-outlined.is-loading:focus::after,.button.is-light.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-light.is-outlined[disabled],fieldset[disabled] .button.is-light.is-outlined{background-color:transparent;border-color:#d2f9d6;box-shadow:none;color:#d2f9d6}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-light.is-inverted.is-outlined:hover,.button.is-light.is-inverted.is-outlined.is-hovered,.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#d2f9d6}.button.is-light.is-inverted.is-outlined.is-loading:hover::after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-light.is-inverted.is-outlined.is-loading:focus::after,.button.is-light.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #d2f9d6 #d2f9d6 !important}.button.is-light.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-dark{background-color:#459558;border-color:transparent;color:#fff}.button.is-dark:hover,.button.is-dark.is-hovered{background-color:#418c53;border-color:transparent;color:#fff}.button.is-dark:focus,.button.is-dark.is-focused{border-color:transparent;color:#fff}.button.is-dark:focus:not(:active),.button.is-dark.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.button.is-dark:active,.button.is-dark.is-active{background-color:#3d844e;border-color:transparent;color:#fff}.button.is-dark[disabled],fieldset[disabled] .button.is-dark{background-color:#459558;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted{background-color:#fff;color:#459558}.button.is-dark.is-inverted:hover,.button.is-dark.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-dark.is-inverted[disabled],fieldset[disabled] .button.is-dark.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#459558}.button.is-dark.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined{background-color:transparent;border-color:#459558;color:#459558}.button.is-dark.is-outlined:hover,.button.is-dark.is-outlined.is-hovered,.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined.is-focused{background-color:#459558;border-color:#459558;color:#fff}.button.is-dark.is-outlined.is-loading::after{border-color:transparent transparent #459558 #459558 !important}.button.is-dark.is-outlined.is-loading:hover::after,.button.is-dark.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-outlined.is-loading:focus::after,.button.is-dark.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-outlined{background-color:transparent;border-color:#459558;box-shadow:none;color:#459558}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-dark.is-inverted.is-outlined:hover,.button.is-dark.is-inverted.is-outlined.is-hovered,.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined.is-focused{background-color:#fff;color:#459558}.button.is-dark.is-inverted.is-outlined.is-loading:hover::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-inverted.is-outlined.is-loading:focus::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #459558 #459558 !important}.button.is-dark.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary{background-color:#55be6f;border-color:transparent;color:#fff}.button.is-primary:hover,.button.is-primary.is-hovered{background-color:#4cba67;border-color:transparent;color:#fff}.button.is-primary:focus,.button.is-primary.is-focused{border-color:transparent;color:#fff}.button.is-primary:focus:not(:active),.button.is-primary.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.button.is-primary:active,.button.is-primary.is-active{background-color:#45b461;border-color:transparent;color:#fff}.button.is-primary[disabled],fieldset[disabled] .button.is-primary{background-color:#55be6f;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#55be6f}.button.is-primary.is-inverted:hover,.button.is-primary.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled],fieldset[disabled] .button.is-primary.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#55be6f}.button.is-primary.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined{background-color:transparent;border-color:#55be6f;color:#55be6f}.button.is-primary.is-outlined:hover,.button.is-primary.is-outlined.is-hovered,.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined.is-focused{background-color:#55be6f;border-color:#55be6f;color:#fff}.button.is-primary.is-outlined.is-loading::after{border-color:transparent transparent #55be6f #55be6f !important}.button.is-primary.is-outlined.is-loading:hover::after,.button.is-primary.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-outlined.is-loading:focus::after,.button.is-primary.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-outlined{background-color:transparent;border-color:#55be6f;box-shadow:none;color:#55be6f}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined:hover,.button.is-primary.is-inverted.is-outlined.is-hovered,.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined.is-focused{background-color:#fff;color:#55be6f}.button.is-primary.is-inverted.is-outlined.is-loading:hover::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-inverted.is-outlined.is-loading:focus::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #55be6f #55be6f !important}.button.is-primary.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.button.is-primary.is-light:hover,.button.is-primary.is-light.is-hovered{background-color:#e7f6eb;border-color:transparent;color:#2f7a41}.button.is-primary.is-light:active,.button.is-primary.is-light.is-active{background-color:#def2e3;border-color:transparent;color:#2f7a41}.button.is-link{background-color:#4876ff;border-color:transparent;color:#fff}.button.is-link:hover,.button.is-link.is-hovered{background-color:#3b6cff;border-color:transparent;color:#fff}.button.is-link:focus,.button.is-link.is-focused{border-color:transparent;color:#fff}.button.is-link:focus:not(:active),.button.is-link.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.button.is-link:active,.button.is-link.is-active{background-color:#2f63ff;border-color:transparent;color:#fff}.button.is-link[disabled],fieldset[disabled] .button.is-link{background-color:#4876ff;border-color:transparent;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#4876ff}.button.is-link.is-inverted:hover,.button.is-link.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-link.is-inverted[disabled],fieldset[disabled] .button.is-link.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#4876ff}.button.is-link.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined{background-color:transparent;border-color:#4876ff;color:#4876ff}.button.is-link.is-outlined:hover,.button.is-link.is-outlined.is-hovered,.button.is-link.is-outlined:focus,.button.is-link.is-outlined.is-focused{background-color:#4876ff;border-color:#4876ff;color:#fff}.button.is-link.is-outlined.is-loading::after{border-color:transparent transparent #4876ff #4876ff !important}.button.is-link.is-outlined.is-loading:hover::after,.button.is-link.is-outlined.is-loading.is-hovered::after,.button.is-link.is-outlined.is-loading:focus::after,.button.is-link.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined[disabled],fieldset[disabled] .button.is-link.is-outlined{background-color:transparent;border-color:#4876ff;box-shadow:none;color:#4876ff}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined:hover,.button.is-link.is-inverted.is-outlined.is-hovered,.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined.is-focused{background-color:#fff;color:#4876ff}.button.is-link.is-inverted.is-outlined.is-loading:hover::after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-link.is-inverted.is-outlined.is-loading:focus::after,.button.is-link.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #4876ff #4876ff !important}.button.is-link.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link.is-light{background-color:#ebf0ff;color:#0037db}.button.is-link.is-light:hover,.button.is-link.is-light.is-hovered{background-color:#dee6ff;border-color:transparent;color:#0037db}.button.is-link.is-light:active,.button.is-link.is-light.is-active{background-color:#d1ddff;border-color:transparent;color:#0037db}.button.is-info{background-color:#f0f8ff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:hover,.button.is-info.is-hovered{background-color:#e3f2ff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:focus,.button.is-info.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:focus:not(:active),.button.is-info.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.button.is-info:active,.button.is-info.is-active{background-color:#d7ecff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info[disabled],fieldset[disabled] .button.is-info{background-color:#f0f8ff;border-color:transparent;box-shadow:none}.button.is-info.is-inverted{background-color:rgba(0,0,0,0.7);color:#f0f8ff}.button.is-info.is-inverted:hover,.button.is-info.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-info.is-inverted[disabled],fieldset[disabled] .button.is-info.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#f0f8ff}.button.is-info.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-info.is-outlined{background-color:transparent;border-color:#f0f8ff;color:#f0f8ff}.button.is-info.is-outlined:hover,.button.is-info.is-outlined.is-hovered,.button.is-info.is-outlined:focus,.button.is-info.is-outlined.is-focused{background-color:#f0f8ff;border-color:#f0f8ff;color:rgba(0,0,0,0.7)}.button.is-info.is-outlined.is-loading::after{border-color:transparent transparent #f0f8ff #f0f8ff !important}.button.is-info.is-outlined.is-loading:hover::after,.button.is-info.is-outlined.is-loading.is-hovered::after,.button.is-info.is-outlined.is-loading:focus::after,.button.is-info.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-info.is-outlined[disabled],fieldset[disabled] .button.is-info.is-outlined{background-color:transparent;border-color:#f0f8ff;box-shadow:none;color:#f0f8ff}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-info.is-inverted.is-outlined:hover,.button.is-info.is-inverted.is-outlined.is-hovered,.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#f0f8ff}.button.is-info.is-inverted.is-outlined.is-loading:hover::after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-info.is-inverted.is-outlined.is-loading:focus::after,.button.is-info.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #f0f8ff #f0f8ff !important}.button.is-info.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-info.is-light{background-color:#f0f8ff;color:#004f94}.button.is-info.is-light:hover,.button.is-info.is-light.is-hovered{background-color:#e3f2ff;border-color:transparent;color:#004f94}.button.is-info.is-light:active,.button.is-info.is-light.is-active{background-color:#d7ecff;border-color:transparent;color:#004f94}.button.is-success{background-color:#48c78e;border-color:transparent;color:#fff}.button.is-success:hover,.button.is-success.is-hovered{background-color:#3ec487;border-color:transparent;color:#fff}.button.is-success:focus,.button.is-success.is-focused{border-color:transparent;color:#fff}.button.is-success:focus:not(:active),.button.is-success.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.button.is-success:active,.button.is-success.is-active{background-color:#3abb81;border-color:transparent;color:#fff}.button.is-success[disabled],fieldset[disabled] .button.is-success{background-color:#48c78e;border-color:transparent;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#48c78e}.button.is-success.is-inverted:hover,.button.is-success.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-success.is-inverted[disabled],fieldset[disabled] .button.is-success.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#48c78e}.button.is-success.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;color:#48c78e}.button.is-success.is-outlined:hover,.button.is-success.is-outlined.is-hovered,.button.is-success.is-outlined:focus,.button.is-success.is-outlined.is-focused{background-color:#48c78e;border-color:#48c78e;color:#fff}.button.is-success.is-outlined.is-loading::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-outlined.is-loading:hover::after,.button.is-success.is-outlined.is-loading.is-hovered::after,.button.is-success.is-outlined.is-loading:focus::after,.button.is-success.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined[disabled],fieldset[disabled] .button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;box-shadow:none;color:#48c78e}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined:hover,.button.is-success.is-inverted.is-outlined.is-hovered,.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined.is-focused{background-color:#fff;color:#48c78e}.button.is-success.is-inverted.is-outlined.is-loading:hover::after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-success.is-inverted.is-outlined.is-loading:focus::after,.button.is-success.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success.is-light{background-color:#effaf5;color:#257953}.button.is-success.is-light:hover,.button.is-success.is-light.is-hovered{background-color:#e6f7ef;border-color:transparent;color:#257953}.button.is-success.is-light:active,.button.is-success.is-light.is-active{background-color:#dcf4e9;border-color:transparent;color:#257953}.button.is-warning{background-color:#ffd975;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:hover,.button.is-warning.is-hovered{background-color:#ffd568;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:focus,.button.is-warning.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:focus:not(:active),.button.is-warning.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.button.is-warning:active,.button.is-warning.is-active{background-color:#ffd25c;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning[disabled],fieldset[disabled] .button.is-warning{background-color:#ffd975;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted{background-color:rgba(0,0,0,0.7);color:#ffd975}.button.is-warning.is-inverted:hover,.button.is-warning.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-warning.is-inverted[disabled],fieldset[disabled] .button.is-warning.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#ffd975}.button.is-warning.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffd975;color:#ffd975}.button.is-warning.is-outlined:hover,.button.is-warning.is-outlined.is-hovered,.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined.is-focused{background-color:#ffd975;border-color:#ffd975;color:rgba(0,0,0,0.7)}.button.is-warning.is-outlined.is-loading::after{border-color:transparent transparent #ffd975 #ffd975 !important}.button.is-warning.is-outlined.is-loading:hover::after,.button.is-warning.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-outlined.is-loading:focus::after,.button.is-warning.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-warning.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-outlined{background-color:transparent;border-color:#ffd975;box-shadow:none;color:#ffd975}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-warning.is-inverted.is-outlined:hover,.button.is-warning.is-inverted.is-outlined.is-hovered,.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#ffd975}.button.is-warning.is-inverted.is-outlined.is-loading:hover::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-inverted.is-outlined.is-loading:focus::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #ffd975 #ffd975 !important}.button.is-warning.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-warning.is-light{background-color:#fff9eb;color:#946b00}.button.is-warning.is-light:hover,.button.is-warning.is-light.is-hovered{background-color:#fff6de;border-color:transparent;color:#946b00}.button.is-warning.is-light:active,.button.is-warning.is-light.is-active{background-color:#fff2d1;border-color:transparent;color:#946b00}.button.is-danger{background-color:#f14668;border-color:transparent;color:#fff}.button.is-danger:hover,.button.is-danger.is-hovered{background-color:#f03a5f;border-color:transparent;color:#fff}.button.is-danger:focus,.button.is-danger.is-focused{border-color:transparent;color:#fff}.button.is-danger:focus:not(:active),.button.is-danger.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.button.is-danger:active,.button.is-danger.is-active{background-color:#ef2e55;border-color:transparent;color:#fff}.button.is-danger[disabled],fieldset[disabled] .button.is-danger{background-color:#f14668;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#f14668}.button.is-danger.is-inverted:hover,.button.is-danger.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled],fieldset[disabled] .button.is-danger.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#f14668}.button.is-danger.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;color:#f14668}.button.is-danger.is-outlined:hover,.button.is-danger.is-outlined.is-hovered,.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined.is-focused{background-color:#f14668;border-color:#f14668;color:#fff}.button.is-danger.is-outlined.is-loading::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-outlined.is-loading:hover::after,.button.is-danger.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-outlined.is-loading:focus::after,.button.is-danger.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;box-shadow:none;color:#f14668}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined:hover,.button.is-danger.is-inverted.is-outlined.is-hovered,.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined.is-focused{background-color:#fff;color:#f14668}.button.is-danger.is-inverted.is-outlined.is-loading:hover::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-inverted.is-outlined.is-loading:focus::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.button.is-danger.is-light:hover,.button.is-danger.is-light.is-hovered{background-color:#fde0e6;border-color:transparent;color:#cc0f35}.button.is-danger.is-light:active,.button.is-danger.is-light.is-active{background-color:#fcd4dc;border-color:transparent;color:#cc0f35}.button.is-small{font-size:.75rem}.button.is-small:not(.is-rounded){border-radius:2px}.button.is-normal{font-size:1rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled],fieldset[disabled] .button{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth{display:flex;width:100%}.button.is-loading{color:transparent !important;pointer-events:none}.button.is-loading::after{position:absolute;left:calc(50% - (1em * 0.5));top:calc(50% - (1em * 0.5));position:absolute !important}.button.is-static{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:9999px;padding-left:calc(1em + 0.25em);padding-right:calc(1em + 0.25em)}.buttons{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button{margin-bottom:0.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons:last-child{margin-bottom:-0.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large){font-size:.75rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded){border-radius:2px}.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button:hover,.buttons.has-addons .button.is-hovered{z-index:2}.buttons.has-addons .button:focus,.buttons.has-addons .button.is-focused,.buttons.has-addons .button:active,.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-selected{z-index:3}.buttons.has-addons .button:focus:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-selected:hover{z-index:4}.buttons.has-addons .button.is-expanded{flex-grow:1;flex-shrink:1}.buttons.is-centered{justify-content:center}.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.buttons.is-right{justify-content:flex-end}.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.container{flex-grow:1;margin:0 auto;position:relative;width:auto}.container.is-fluid{max-width:none !important;padding-left:32px;padding-right:32px;width:100%}@media screen and (min-width: 1024px){.container{max-width:960px}}@media screen and (max-width: 1215px){.container.is-widescreen:not(.is-max-desktop){max-width:1152px}}@media screen and (max-width: 1407px){.container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}@media screen and (min-width: 1216px){.container:not(.is-max-desktop){max-width:1152px}}@media screen and (min-width: 1408px){.container:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}.content li+li{margin-top:0.25em}.content p:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content ul:not(:last-child),.content blockquote:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:0.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:0.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:0.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:0.8em}.content h5{font-size:1.125em;margin-bottom:0.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:0.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sup,.content sub{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.content table th{color:#363636}.content table th:not([align]){text-align:inherit}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content .tabs li+li{margin-top:0}.content.is-small{font-size:.75rem}.content.is-normal{font-size:1rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.icon{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.icon-text{align-items:flex-start;color:inherit;display:inline-flex;flex-wrap:wrap;line-height:1.5rem;vertical-align:top}.icon-text .icon{flex-grow:0;flex-shrink:0}.icon-text .icon:not(:last-child){margin-right:.25em}.icon-text .icon:not(:first-child){margin-left:.25em}div.icon-text{display:flex}.image{display:block;position:relative}.image img{display:block;height:auto;width:100%}.image img.is-rounded{border-radius:9999px}.image.is-fullwidth{width:100%}.image.is-square img,.image.is-square .has-ratio,.image.is-1by1 img,.image.is-1by1 .has-ratio,.image.is-5by4 img,.image.is-5by4 .has-ratio,.image.is-4by3 img,.image.is-4by3 .has-ratio,.image.is-3by2 img,.image.is-3by2 .has-ratio,.image.is-5by3 img,.image.is-5by3 .has-ratio,.image.is-16by9 img,.image.is-16by9 .has-ratio,.image.is-2by1 img,.image.is-2by1 .has-ratio,.image.is-3by1 img,.image.is-3by1 .has-ratio,.image.is-4by5 img,.image.is-4by5 .has-ratio,.image.is-3by4 img,.image.is-3by4 .has-ratio,.image.is-2by3 img,.image.is-2by3 .has-ratio,.image.is-3by5 img,.image.is-3by5 .has-ratio,.image.is-9by16 img,.image.is-9by16 .has-ratio,.image.is-1by2 img,.image.is-1by2 .has-ratio,.image.is-1by3 img,.image.is-1by3 .has-ratio{height:100%;width:100%}.image.is-square,.image.is-1by1{padding-top:100%}.image.is-5by4{padding-top:80%}.image.is-4by3{padding-top:75%}.image.is-3by2{padding-top:66.6666%}.image.is-5by3{padding-top:60%}.image.is-16by9{padding-top:56.25%}.image.is-2by1{padding-top:50%}.image.is-3by1{padding-top:33.3333%}.image.is-4by5{padding-top:125%}.image.is-3by4{padding-top:133.3333%}.image.is-2by3{padding-top:150%}.image.is-3by5{padding-top:166.6666%}.image.is-9by16{padding-top:177.7777%}.image.is-1by2{padding-top:200%}.image.is-1by3{padding-top:300%}.image.is-16x16{height:16px;width:16px}.image.is-24x24{height:24px;width:24px}.image.is-32x32{height:32px;width:32px}.image.is-48x48{height:48px;width:48px}.image.is-64x64{height:64px;width:64px}.image.is-96x96{height:96px;width:96px}.image.is-128x128{height:128px;width:128px}.notification{background-color:#f5f5f5;border-radius:4px;position:relative;padding:1.25rem 2.5rem 1.25rem 1.5rem}.notification a:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:#fff}.notification pre code{background:transparent}.notification>.delete{right:.5rem;position:absolute;top:0.5rem}.notification .title,.notification .subtitle,.notification .content{color:currentColor}.notification.is-white{background-color:#fff;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:#fff}.notification.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.notification.is-dark{background-color:#459558;color:#fff}.notification.is-primary{background-color:#55be6f;color:#fff}.notification.is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.notification.is-link{background-color:#4876ff;color:#fff}.notification.is-link.is-light{background-color:#ebf0ff;color:#0037db}.notification.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.notification.is-info.is-light{background-color:#f0f8ff;color:#004f94}.notification.is-success{background-color:#48c78e;color:#fff}.notification.is-success.is-light{background-color:#effaf5;color:#257953}.notification.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.notification.is-warning.is-light{background-color:#fff9eb;color:#946b00}.notification.is-danger{background-color:#f14668;color:#fff}.notification.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:9999px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#ededed}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:#fff}.progress.is-white::-moz-progress-bar{background-color:#fff}.progress.is-white::-ms-fill{background-color:#fff}.progress.is-white:indeterminate{background-image:linear-gradient(to right, #fff 30%, #ededed 30%)}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-black:indeterminate{background-image:linear-gradient(to right, #0a0a0a 30%, #ededed 30%)}.progress.is-light::-webkit-progress-value{background-color:#d2f9d6}.progress.is-light::-moz-progress-bar{background-color:#d2f9d6}.progress.is-light::-ms-fill{background-color:#d2f9d6}.progress.is-light:indeterminate{background-image:linear-gradient(to right, #d2f9d6 30%, #ededed 30%)}.progress.is-dark::-webkit-progress-value{background-color:#459558}.progress.is-dark::-moz-progress-bar{background-color:#459558}.progress.is-dark::-ms-fill{background-color:#459558}.progress.is-dark:indeterminate{background-image:linear-gradient(to right, #459558 30%, #ededed 30%)}.progress.is-primary::-webkit-progress-value{background-color:#55be6f}.progress.is-primary::-moz-progress-bar{background-color:#55be6f}.progress.is-primary::-ms-fill{background-color:#55be6f}.progress.is-primary:indeterminate{background-image:linear-gradient(to right, #55be6f 30%, #ededed 30%)}.progress.is-link::-webkit-progress-value{background-color:#4876ff}.progress.is-link::-moz-progress-bar{background-color:#4876ff}.progress.is-link::-ms-fill{background-color:#4876ff}.progress.is-link:indeterminate{background-image:linear-gradient(to right, #4876ff 30%, #ededed 30%)}.progress.is-info::-webkit-progress-value{background-color:#f0f8ff}.progress.is-info::-moz-progress-bar{background-color:#f0f8ff}.progress.is-info::-ms-fill{background-color:#f0f8ff}.progress.is-info:indeterminate{background-image:linear-gradient(to right, #f0f8ff 30%, #ededed 30%)}.progress.is-success::-webkit-progress-value{background-color:#48c78e}.progress.is-success::-moz-progress-bar{background-color:#48c78e}.progress.is-success::-ms-fill{background-color:#48c78e}.progress.is-success:indeterminate{background-image:linear-gradient(to right, #48c78e 30%, #ededed 30%)}.progress.is-warning::-webkit-progress-value{background-color:#ffd975}.progress.is-warning::-moz-progress-bar{background-color:#ffd975}.progress.is-warning::-ms-fill{background-color:#ffd975}.progress.is-warning:indeterminate{background-image:linear-gradient(to right, #ffd975 30%, #ededed 30%)}.progress.is-danger::-webkit-progress-value{background-color:#f14668}.progress.is-danger::-moz-progress-bar{background-color:#f14668}.progress.is-danger::-ms-fill{background-color:#f14668}.progress.is-danger:indeterminate{background-image:linear-gradient(to right, #f14668 30%, #ededed 30%)}.progress:indeterminate{animation-duration:1.5s;animation-iteration-count:infinite;animation-name:moveIndeterminate;animation-timing-function:linear;background-color:#ededed;background-image:linear-gradient(to right, #4a4a4a 30%, #ededed 30%);background-position:top left;background-repeat:no-repeat;background-size:150% 150%}.progress:indeterminate::-webkit-progress-bar{background-color:transparent}.progress:indeterminate::-moz-progress-bar{background-color:transparent}.progress:indeterminate::-ms-fill{animation-name:none}.progress.is-small{height:.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}@keyframes moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}.table{background-color:#fff;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light,.table th.is-light{background-color:#d2f9d6;border-color:#d2f9d6;color:rgba(0,0,0,0.7)}.table td.is-dark,.table th.is-dark{background-color:#459558;border-color:#459558;color:#fff}.table td.is-primary,.table th.is-primary{background-color:#55be6f;border-color:#55be6f;color:#fff}.table td.is-link,.table th.is-link{background-color:#4876ff;border-color:#4876ff;color:#fff}.table td.is-info,.table th.is-info{background-color:#f0f8ff;border-color:#f0f8ff;color:rgba(0,0,0,0.7)}.table td.is-success,.table th.is-success{background-color:#48c78e;border-color:#48c78e;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffd975;border-color:#ffd975;color:rgba(0,0,0,0.7)}.table td.is-danger,.table th.is-danger{background-color:#f14668;border-color:#f14668;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#55be6f;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table td.is-vcentered,.table th.is-vcentered{vertical-align:middle}.table th{color:#363636}.table th:not([align]){text-align:inherit}.table tr.is-selected{background-color:#55be6f;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead{background-color:rgba(0,0,0,0)}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot{background-color:rgba(0,0,0,0)}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody{background-color:rgba(0,0,0,0)}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even){background-color:#f5f5f5}.table.is-narrow td,.table.is-narrow th{padding:0.25em 0.5em}.table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag{margin-bottom:0.5rem}.tags .tag:not(:last-child){margin-right:.5rem}.tags:last-child{margin-bottom:-0.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered{justify-content:center}.tags.is-centered .tag{margin-right:0.25rem;margin-left:0.25rem}.tags.is-right{justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:0.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){margin-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.tags.has-addons .tag:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tag:not(body){align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:0.75em;padding-right:0.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.tag:not(body).is-dark{background-color:#459558;color:#fff}.tag:not(body).is-primary{background-color:#55be6f;color:#fff}.tag:not(body).is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.tag:not(body).is-link{background-color:#4876ff;color:#fff}.tag:not(body).is-link.is-light{background-color:#ebf0ff;color:#0037db}.tag:not(body).is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.tag:not(body).is-info.is-light{background-color:#f0f8ff;color:#004f94}.tag:not(body).is-success{background-color:#48c78e;color:#fff}.tag:not(body).is-success.is-light{background-color:#effaf5;color:#257953}.tag:not(body).is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.tag:not(body).is-warning.is-light{background-color:#fff9eb;color:#946b00}.tag:not(body).is-danger{background-color:#f14668;color:#fff}.tag:not(body).is-danger.is-light{background-color:#feecf0;color:#cc0f35}.tag:not(body).is-normal{font-size:.75rem}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete::before,.tag:not(body).is-delete::after{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete::before{height:1px;width:50%}.tag:not(body).is-delete::after{height:50%;width:1px}.tag:not(body).is-delete:hover,.tag:not(body).is-delete:focus{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:9999px}a.tag:hover{text-decoration:underline}.title,.subtitle{word-break:break-word}.title em,.title span,.subtitle em,.subtitle span{font-weight:inherit}.title sub,.subtitle sub{font-size:.75em}.title sup,.subtitle sup{font-size:.75em}.title .tag,.subtitle .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:.75rem}.heading{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.number{align-items:center;background-color:#f5f5f5;border-radius:9999px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:0.25rem 0.5rem;text-align:center;vertical-align:top}.input,.textarea,.select select{background-color:#fff;border-color:#dbdbdb;border-radius:4px;color:#363636}.input::-moz-placeholder,.textarea::-moz-placeholder,.select select::-moz-placeholder{color:#757575}.input::-webkit-input-placeholder,.textarea::-webkit-input-placeholder,.select select::-webkit-input-placeholder{color:#757575}.input:-moz-placeholder,.textarea:-moz-placeholder,.select select:-moz-placeholder{color:#757575}.input:-ms-input-placeholder,.textarea:-ms-input-placeholder,.select select:-ms-input-placeholder{color:#757575}.input:hover,.textarea:hover,.select select:hover,.is-hovered.input,.is-hovered.textarea,.select select.is-hovered{border-color:#b5b5b5}.input:focus,.textarea:focus,.select select:focus,.is-focused.input,.is-focused.textarea,.select select.is-focused,.input:active,.textarea:active,.select select:active,.is-active.input,.is-active.textarea,.select select.is-active{border-color:#4876ff;box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.input[disabled],.textarea[disabled],.select select[disabled],fieldset[disabled] .input,fieldset[disabled] .textarea,fieldset[disabled] .select select,.select fieldset[disabled] select{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled]::-moz-placeholder,.textarea[disabled]::-moz-placeholder,.select select[disabled]::-moz-placeholder,fieldset[disabled] .input::-moz-placeholder,fieldset[disabled] .textarea::-moz-placeholder,fieldset[disabled] .select select::-moz-placeholder,.select fieldset[disabled] select::-moz-placeholder{color:#707070}.input[disabled]::-webkit-input-placeholder,.textarea[disabled]::-webkit-input-placeholder,.select select[disabled]::-webkit-input-placeholder,fieldset[disabled] .input::-webkit-input-placeholder,fieldset[disabled] .textarea::-webkit-input-placeholder,fieldset[disabled] .select select::-webkit-input-placeholder,.select fieldset[disabled] select::-webkit-input-placeholder{color:#707070}.input[disabled]:-moz-placeholder,.textarea[disabled]:-moz-placeholder,.select select[disabled]:-moz-placeholder,fieldset[disabled] .input:-moz-placeholder,fieldset[disabled] .textarea:-moz-placeholder,fieldset[disabled] .select select:-moz-placeholder,.select fieldset[disabled] select:-moz-placeholder{color:#707070}.input[disabled]:-ms-input-placeholder,.textarea[disabled]:-ms-input-placeholder,.select select[disabled]:-ms-input-placeholder,fieldset[disabled] .input:-ms-input-placeholder,fieldset[disabled] .textarea:-ms-input-placeholder,fieldset[disabled] .select select:-ms-input-placeholder,.select fieldset[disabled] select:-ms-input-placeholder{color:#707070}.input,.textarea{box-shadow:inset 0 0.0625em 0.125em rgba(10,10,10,0.05);max-width:100%;width:100%}.input[readonly],.textarea[readonly]{box-shadow:none}.is-white.input,.is-white.textarea{border-color:#fff}.is-white.input:focus,.is-white.textarea:focus,.is-white.is-focused.input,.is-white.is-focused.textarea,.is-white.input:active,.is-white.textarea:active,.is-white.is-active.input,.is-white.is-active.textarea{box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.is-black.input,.is-black.textarea{border-color:#0a0a0a}.is-black.input:focus,.is-black.textarea:focus,.is-black.is-focused.input,.is-black.is-focused.textarea,.is-black.input:active,.is-black.textarea:active,.is-black.is-active.input,.is-black.is-active.textarea{box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.is-light.input,.is-light.textarea{border-color:#d2f9d6}.is-light.input:focus,.is-light.textarea:focus,.is-light.is-focused.input,.is-light.is-focused.textarea,.is-light.input:active,.is-light.textarea:active,.is-light.is-active.input,.is-light.is-active.textarea{box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.is-dark.input,.is-dark.textarea{border-color:#459558}.is-dark.input:focus,.is-dark.textarea:focus,.is-dark.is-focused.input,.is-dark.is-focused.textarea,.is-dark.input:active,.is-dark.textarea:active,.is-dark.is-active.input,.is-dark.is-active.textarea{box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.is-primary.input,.is-primary.textarea{border-color:#55be6f}.is-primary.input:focus,.is-primary.textarea:focus,.is-primary.is-focused.input,.is-primary.is-focused.textarea,.is-primary.input:active,.is-primary.textarea:active,.is-primary.is-active.input,.is-primary.is-active.textarea{box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.is-link.input,.is-link.textarea{border-color:#4876ff}.is-link.input:focus,.is-link.textarea:focus,.is-link.is-focused.input,.is-link.is-focused.textarea,.is-link.input:active,.is-link.textarea:active,.is-link.is-active.input,.is-link.is-active.textarea{box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.is-info.input,.is-info.textarea{border-color:#f0f8ff}.is-info.input:focus,.is-info.textarea:focus,.is-info.is-focused.input,.is-info.is-focused.textarea,.is-info.input:active,.is-info.textarea:active,.is-info.is-active.input,.is-info.is-active.textarea{box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.is-success.input,.is-success.textarea{border-color:#48c78e}.is-success.input:focus,.is-success.textarea:focus,.is-success.is-focused.input,.is-success.is-focused.textarea,.is-success.input:active,.is-success.textarea:active,.is-success.is-active.input,.is-success.is-active.textarea{box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.is-warning.input,.is-warning.textarea{border-color:#ffd975}.is-warning.input:focus,.is-warning.textarea:focus,.is-warning.is-focused.input,.is-warning.is-focused.textarea,.is-warning.input:active,.is-warning.textarea:active,.is-warning.is-active.input,.is-warning.is-active.textarea{box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.is-danger.input,.is-danger.textarea{border-color:#f14668}.is-danger.input:focus,.is-danger.textarea:focus,.is-danger.is-focused.input,.is-danger.is-focused.textarea,.is-danger.input:active,.is-danger.textarea:active,.is-danger.is-active.input,.is-danger.is-active.textarea{box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.is-small.input,.is-small.textarea{border-radius:2px;font-size:.75rem}.is-medium.input,.is-medium.textarea{font-size:1.25rem}.is-large.input,.is-large.textarea{font-size:1.5rem}.is-fullwidth.input,.is-fullwidth.textarea{display:block;width:100%}.is-inline.input,.is-inline.textarea{display:inline;width:auto}.input.is-rounded{border-radius:9999px;padding-left:calc(calc(0.75em - 1px) + 0.375em);padding-right:calc(calc(0.75em - 1px) + 0.375em)}.input.is-static{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:calc(0.75em - 1px);resize:vertical}.textarea:not([rows]){max-height:40em;min-height:8em}.textarea[rows]{height:initial}.textarea.has-fixed-size{resize:none}.checkbox,.radio{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input,.radio input{cursor:pointer}.checkbox:hover,.radio:hover{color:#363636}.checkbox[disabled],.radio[disabled],fieldset[disabled] .checkbox,fieldset[disabled] .radio,.checkbox input[disabled],.radio input[disabled]{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.5em}.select:not(.is-multiple):not(.is-loading)::after{border-color:#4876ff;right:1.125em;z-index:4}.select.is-rounded select{border-radius:9999px;padding-left:1em}.select select{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select::-ms-expand{display:none}.select select[disabled]:hover,fieldset[disabled] .select select:hover{border-color:#f5f5f5}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:0.5em 1em}.select:not(.is-multiple):not(.is-loading):hover::after{border-color:#363636}.select.is-white:not(:hover)::after{border-color:#fff}.select.is-white select{border-color:#fff}.select.is-white select:hover,.select.is-white select.is-hovered{border-color:#f2f2f2}.select.is-white select:focus,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select.is-active{box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.select.is-black:not(:hover)::after{border-color:#0a0a0a}.select.is-black select{border-color:#0a0a0a}.select.is-black select:hover,.select.is-black select.is-hovered{border-color:#000}.select.is-black select:focus,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select.is-active{box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.select.is-light:not(:hover)::after{border-color:#d2f9d6}.select.is-light select{border-color:#d2f9d6}.select.is-light select:hover,.select.is-light select.is-hovered{border-color:#bcf6c2}.select.is-light select:focus,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select.is-active{box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.select.is-dark:not(:hover)::after{border-color:#459558}.select.is-dark select{border-color:#459558}.select.is-dark select:hover,.select.is-dark select.is-hovered{border-color:#3d844e}.select.is-dark select:focus,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select.is-active{box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.select.is-primary:not(:hover)::after{border-color:#55be6f}.select.is-primary select{border-color:#55be6f}.select.is-primary select:hover,.select.is-primary select.is-hovered{border-color:#45b461}.select.is-primary select:focus,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select.is-active{box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.select.is-link:not(:hover)::after{border-color:#4876ff}.select.is-link select{border-color:#4876ff}.select.is-link select:hover,.select.is-link select.is-hovered{border-color:#2f63ff}.select.is-link select:focus,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select.is-active{box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.select.is-info:not(:hover)::after{border-color:#f0f8ff}.select.is-info select{border-color:#f0f8ff}.select.is-info select:hover,.select.is-info select.is-hovered{border-color:#d7ecff}.select.is-info select:focus,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select.is-active{box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.select.is-success:not(:hover)::after{border-color:#48c78e}.select.is-success select{border-color:#48c78e}.select.is-success select:hover,.select.is-success select.is-hovered{border-color:#3abb81}.select.is-success select:focus,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select.is-active{box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.select.is-warning:not(:hover)::after{border-color:#ffd975}.select.is-warning select{border-color:#ffd975}.select.is-warning select:hover,.select.is-warning select.is-hovered{border-color:#ffd25c}.select.is-warning select:focus,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select.is-active{box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.select.is-danger:not(:hover)::after{border-color:#f14668}.select.is-danger select{border-color:#f14668}.select.is-danger select:hover,.select.is-danger select.is-hovered{border-color:#ef2e55}.select.is-danger select:focus,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select.is-active{box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.select.is-small{border-radius:2px;font-size:.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled::after{border-color:#7a7a7a}.select.is-fullwidth{width:100%}.select.is-fullwidth select{width:100%}.select.is-loading::after{margin-top:0;position:absolute;right:.625em;top:0.625em;transform:none}.select.is-loading.is-small:after{font-size:.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white:hover .file-cta,.file.is-white.is-hovered .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white:focus .file-cta,.file.is-white.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255,255,255,0.25);color:#0a0a0a}.file.is-white:active .file-cta,.file.is-white.is-active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black:hover .file-cta,.file.is-black.is-hovered .file-cta{background-color:#040404;border-color:transparent;color:#fff}.file.is-black:focus .file-cta,.file.is-black.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(10,10,10,0.25);color:#fff}.file.is-black:active .file-cta,.file.is-black.is-active .file-cta{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta{background-color:#d2f9d6;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-light:hover .file-cta,.file.is-light.is-hovered .file-cta{background-color:#c7f8cc;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-light:focus .file-cta,.file.is-light.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(210,249,214,0.25);color:rgba(0,0,0,0.7)}.file.is-light:active .file-cta,.file.is-light.is-active .file-cta{background-color:#bcf6c2;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-dark .file-cta{background-color:#459558;border-color:transparent;color:#fff}.file.is-dark:hover .file-cta,.file.is-dark.is-hovered .file-cta{background-color:#418c53;border-color:transparent;color:#fff}.file.is-dark:focus .file-cta,.file.is-dark.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(69,149,88,0.25);color:#fff}.file.is-dark:active .file-cta,.file.is-dark.is-active .file-cta{background-color:#3d844e;border-color:transparent;color:#fff}.file.is-primary .file-cta{background-color:#55be6f;border-color:transparent;color:#fff}.file.is-primary:hover .file-cta,.file.is-primary.is-hovered .file-cta{background-color:#4cba67;border-color:transparent;color:#fff}.file.is-primary:focus .file-cta,.file.is-primary.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(85,190,111,0.25);color:#fff}.file.is-primary:active .file-cta,.file.is-primary.is-active .file-cta{background-color:#45b461;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#4876ff;border-color:transparent;color:#fff}.file.is-link:hover .file-cta,.file.is-link.is-hovered .file-cta{background-color:#3b6cff;border-color:transparent;color:#fff}.file.is-link:focus .file-cta,.file.is-link.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72,118,255,0.25);color:#fff}.file.is-link:active .file-cta,.file.is-link.is-active .file-cta{background-color:#2f63ff;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#f0f8ff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-info:hover .file-cta,.file.is-info.is-hovered .file-cta{background-color:#e3f2ff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-info:focus .file-cta,.file.is-info.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(240,248,255,0.25);color:rgba(0,0,0,0.7)}.file.is-info:active .file-cta,.file.is-info.is-active .file-cta{background-color:#d7ecff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-success .file-cta{background-color:#48c78e;border-color:transparent;color:#fff}.file.is-success:hover .file-cta,.file.is-success.is-hovered .file-cta{background-color:#3ec487;border-color:transparent;color:#fff}.file.is-success:focus .file-cta,.file.is-success.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72,199,142,0.25);color:#fff}.file.is-success:active .file-cta,.file.is-success.is-active .file-cta{background-color:#3abb81;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffd975;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-warning:hover .file-cta,.file.is-warning.is-hovered .file-cta{background-color:#ffd568;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-warning:focus .file-cta,.file.is-warning.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255,217,117,0.25);color:rgba(0,0,0,0.7)}.file.is-warning:active .file-cta,.file.is-warning.is-active .file-cta{background-color:#ffd25c;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-danger .file-cta{background-color:#f14668;border-color:transparent;color:#fff}.file.is-danger:hover .file-cta,.file.is-danger.is-hovered .file-cta{background-color:#f03a5f;border-color:transparent;color:#fff}.file.is-danger:focus .file-cta,.file.is-danger.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(241,70,104,0.25);color:#fff}.file.is-danger:active .file-cta,.file.is-danger.is-active .file-cta{background-color:#ef2e55;border-color:transparent;color:#fff}.file.is-small{font-size:.75rem}.file.is-normal{font-size:1rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-label{flex-direction:column}.file.is-boxed .file-cta{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px}.file.is-boxed.is-small .file-icon .fa{font-size:14px}.file.is-boxed.is-medium .file-icon .fa{font-size:28px}.file.is-boxed.is-large .file-icon .fa{font-size:35px}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{flex-grow:1;max-width:none}.file.is-right{justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:#f5f5f5;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:inherit;text-overflow:ellipsis}.file-icon{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa{font-size:14px}.label{color:#363636;display:block;font-size:1rem;font-weight:700}.label:not(:last-child){margin-bottom:0.5em}.label.is-small{font-size:.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:.75rem;margin-top:0.25rem}.help.is-white{color:#fff}.help.is-black{color:#0a0a0a}.help.is-light{color:#d2f9d6}.help.is-dark{color:#459558}.help.is-primary{color:#55be6f}.help.is-link{color:#4876ff}.help.is-info{color:#f0f8ff}.help.is-success{color:#48c78e}.help.is-warning{color:#ffd975}.help.is-danger{color:#f14668}.field:not(:last-child){margin-bottom:0.75rem}.field.has-addons{display:flex;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button,.field.has-addons .control:first-child:not(:only-child) .input,.field.has-addons .control:first-child:not(:only-child) .select select{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button,.field.has-addons .control:last-child:not(:only-child) .input,.field.has-addons .control:last-child:not(:only-child) .select select{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered{z-index:2}.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]).is-active{z-index:3}.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover{z-index:4}.field.has-addons .control.is-expanded{flex-grow:1;flex-shrink:1}.field.has-addons.has-addons-centered{justify-content:center}.field.has-addons.has-addons-right{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{flex-grow:1;flex-shrink:0}.field.is-grouped{display:flex;justify-content:flex-start}.field.is-grouped>.control{flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{justify-content:center}.field.is-grouped.is-grouped-right{justify-content:flex-end}.field.is-grouped.is-grouped-multiline{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:0.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-0.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}@media screen and (min-width: 769px), print{.field.is-horizontal{display:flex}}.field-label .label{font-size:inherit}@media screen and (max-width: 768px){.field-label{margin-bottom:0.5rem}}@media screen and (min-width: 769px), print{.field-label{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:.75rem;padding-top:0.375em}.field-label.is-normal{padding-top:0.375em}.field-label.is-medium{font-size:1.25rem;padding-top:0.375em}.field-label.is-large{font-size:1.5rem;padding-top:0.375em}}.field-body .field .field{margin-bottom:0}@media screen and (min-width: 769px), print{.field-body{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{flex-shrink:1}.field-body>.field:not(.is-narrow){flex-grow:1}.field-body>.field:not(:last-child){margin-right:.75rem}}.control{box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:inherit}.control.has-icons-left .input:focus ~ .icon,.control.has-icons-left .select:focus ~ .icon,.control.has-icons-right .input:focus ~ .icon,.control.has-icons-right .select:focus ~ .icon{color:#4a4a4a}.control.has-icons-left .input.is-small ~ .icon,.control.has-icons-left .select.is-small ~ .icon,.control.has-icons-right .input.is-small ~ .icon,.control.has-icons-right .select.is-small ~ .icon{font-size:.75rem}.control.has-icons-left .input.is-medium ~ .icon,.control.has-icons-left .select.is-medium ~ .icon,.control.has-icons-right .input.is-medium ~ .icon,.control.has-icons-right .select.is-medium ~ .icon{font-size:1.25rem}.control.has-icons-left .input.is-large ~ .icon,.control.has-icons-left .select.is-large ~ .icon,.control.has-icons-right .input.is-large ~ .icon,.control.has-icons-right .select.is-large ~ .icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.5em;pointer-events:none;position:absolute;top:0;width:2.5em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select{padding-left:2.5em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select{padding-right:2.5em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading::after{position:absolute !important;right:.625em;top:0.625em;z-index:4}.control.is-loading.is-small:after{font-size:.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{align-items:center;color:#4876ff;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{align-items:center;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li::before{color:#b5b5b5;content:"\\0002f"}.breadcrumb ul,.breadcrumb ol{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:.5em}.breadcrumb .icon:last-child{margin-left:.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{justify-content:flex-end}.breadcrumb.is-small{font-size:.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li::before{content:"\\02192"}.breadcrumb.has-bullet-separator li+li::before{content:"\\02022"}.breadcrumb.has-dot-separator li+li::before{content:"\\000b7"}.breadcrumb.has-succeeds-separator li+li::before{content:"\\0227B"}.card{background-color:#fff;border-radius:.25rem;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);color:#4a4a4a;max-width:100%;position:relative}.card-header:first-child,.card-content:first-child,.card-footer:first-child{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-header:last-child,.card-content:last-child,.card-footer:last-child{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-header{background-color:rgba(0,0,0,0);align-items:stretch;box-shadow:0 0.125em 0.25em rgba(10,10,10,0.1);display:flex}.card-header-title{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:0.75rem 1rem}.card-header-title.is-centered{justify-content:center}.card-header-icon{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0;align-items:center;cursor:pointer;display:flex;justify-content:center;padding:0.75rem 1rem}.card-image{display:block;position:relative}.card-image:first-child img{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-image:last-child img{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-content{background-color:rgba(0,0,0,0);padding:1.5rem}.card-footer{background-color:rgba(0,0,0,0);border-top:1px solid #ededed;align-items:stretch;display:flex}.card-footer-item{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item:not(:last-child){border-right:1px solid #ededed}.card .media:not(:last-child){margin-bottom:1.5rem}.dropdown{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:initial;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:#fff;border-radius:4px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item{color:#4a4a4a;display:block;font-size:0.875rem;line-height:1.5;padding:0.375rem 1rem;position:relative}a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:inherit;white-space:nowrap;width:100%}a.dropdown-item:hover,button.dropdown-item:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#4876ff;color:#fff}.dropdown-divider{background-color:#ededed;border:none;display:block;height:1px;margin:0.5rem 0}.level{align-items:center;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile{display:flex}.level.is-mobile .level-left,.level.is-mobile .level-right{display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item:not(.is-narrow){flex-grow:1}@media screen and (min-width: 769px), print{.level{display:flex}.level>.level-item:not(.is-narrow){flex-grow:1}}.level-item{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .title,.level-item .subtitle{margin-bottom:0}@media screen and (max-width: 768px){.level-item:not(:last-child){margin-bottom:.75rem}}.level-left,.level-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{flex-grow:1}@media screen and (min-width: 769px), print{.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:.75rem}}.level-left{align-items:center;justify-content:flex-start}@media screen and (max-width: 768px){.level-left+.level-right{margin-top:1.5rem}}@media screen and (min-width: 769px), print{.level-left{display:flex}}.level-right{align-items:center;justify-content:flex-end}@media screen and (min-width: 769px), print{.level-right{display:flex}}.media{align-items:flex-start;display:flex;text-align:inherit}.media .content:not(:last-child){margin-bottom:.75rem}.media .media{border-top:1px solid rgba(219,219,219,0.5);display:flex;padding-top:.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:.5rem}.media .media .media{padding-top:.5rem}.media .media .media+.media{margin-top:.5rem}.media+.media{border-top:1px solid rgba(219,219,219,0.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:inherit}@media screen and (max-width: 768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:0.5em 0.75em}.menu-list a:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active{background-color:#4876ff;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small{font-size:.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:#fff}.message.is-white .message-header{background-color:#fff;color:#0a0a0a}.message.is-white .message-body{border-color:#fff}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:#fff}.message.is-black .message-body{border-color:#0a0a0a}.message.is-light{background-color:#f6fef7}.message.is-light .message-header{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.message.is-light .message-body{border-color:#d2f9d6}.message.is-dark{background-color:#f8fcf9}.message.is-dark .message-header{background-color:#459558;color:#fff}.message.is-dark .message-body{border-color:#459558}.message.is-primary{background-color:#f0f9f2}.message.is-primary .message-header{background-color:#55be6f;color:#fff}.message.is-primary .message-body{border-color:#55be6f;color:#2f7a41}.message.is-link{background-color:#ebf0ff}.message.is-link .message-header{background-color:#4876ff;color:#fff}.message.is-link .message-body{border-color:#4876ff;color:#0037db}.message.is-info{background-color:#f0f8ff}.message.is-info .message-header{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.message.is-info .message-body{border-color:#f0f8ff;color:#004f94}.message.is-success{background-color:#effaf5}.message.is-success .message-header{background-color:#48c78e;color:#fff}.message.is-success .message-body{border-color:#48c78e;color:#257953}.message.is-warning{background-color:#fff9eb}.message.is-warning .message-header{background-color:#ffd975;color:rgba(0,0,0,0.7)}.message.is-warning .message-body{border-color:#ffd975;color:#946b00}.message.is-danger{background-color:#feecf0}.message.is-danger .message-header{background-color:#f14668;color:#fff}.message.is-danger .message-body{border-color:#f14668;color:#cc0f35}.message-header{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:0.75em 1em;position:relative}.message-header .delete{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:#fff}.message-body pre code{background-color:rgba(0,0,0,0)}.modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:flex}.modal-background{background-color:rgba(10,10,10,0.86)}.modal-content,.modal-card{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media screen and (min-width: 769px){.modal-content,.modal-card{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-head,.modal-card-foot{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.2rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:.5em}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:#fff;min-height:2rem;position:relative;z-index:30}.navbar.is-white{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand>.navbar-item,.navbar.is-white .navbar-brand .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-brand>a.navbar-item:focus,.navbar.is-white .navbar-brand>a.navbar-item:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand .navbar-link:focus,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}@media screen and (min-width: 840px){.navbar.is-white .navbar-start>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-end .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-start>a.navbar-item:focus,.navbar.is-white .navbar-start>a.navbar-item:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start .navbar-link:focus,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-end>a.navbar-item:focus,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end .navbar-link:focus,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-start .navbar-link::after,.navbar.is-white .navbar-end .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:#fff;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand>.navbar-item,.navbar.is-black .navbar-brand .navbar-link{color:#fff}.navbar.is-black .navbar-brand>a.navbar-item:focus,.navbar.is-black .navbar-brand>a.navbar-item:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand .navbar-link:focus,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand .navbar-link.is-active{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-black .navbar-start>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-end .navbar-link{color:#fff}.navbar.is-black .navbar-start>a.navbar-item:focus,.navbar.is-black .navbar-start>a.navbar-item:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start .navbar-link:focus,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-end>a.navbar-item:focus,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end .navbar-link:focus,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end .navbar-link.is-active{background-color:#000;color:#fff}.navbar.is-black .navbar-start .navbar-link::after,.navbar.is-black .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:#fff}}.navbar.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand>.navbar-item,.navbar.is-light .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand>a.navbar-item:focus,.navbar.is-light .navbar-brand>a.navbar-item:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand .navbar-link:focus,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-light .navbar-start>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-start>a.navbar-item:focus,.navbar.is-light .navbar-start>a.navbar-item:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start .navbar-link:focus,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-end>a.navbar-item:focus,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end .navbar-link:focus,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-start .navbar-link::after,.navbar.is-light .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}}.navbar.is-dark{background-color:#459558;color:#fff}.navbar.is-dark .navbar-brand>.navbar-item,.navbar.is-dark .navbar-brand .navbar-link{color:#fff}.navbar.is-dark .navbar-brand>a.navbar-item:focus,.navbar.is-dark .navbar-brand>a.navbar-item:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand .navbar-link:focus,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand .navbar-link.is-active{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-dark .navbar-start>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-end .navbar-link{color:#fff}.navbar.is-dark .navbar-start>a.navbar-item:focus,.navbar.is-dark .navbar-start>a.navbar-item:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start .navbar-link:focus,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-end>a.navbar-item:focus,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end .navbar-link:focus,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end .navbar-link.is-active{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-start .navbar-link::after,.navbar.is-dark .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#459558;color:#fff}}.navbar.is-primary{background-color:#55be6f;color:#fff}.navbar.is-primary .navbar-brand>.navbar-item,.navbar.is-primary .navbar-brand .navbar-link{color:#fff}.navbar.is-primary .navbar-brand>a.navbar-item:focus,.navbar.is-primary .navbar-brand>a.navbar-item:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand .navbar-link:focus,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand .navbar-link.is-active{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-primary .navbar-start>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-end .navbar-link{color:#fff}.navbar.is-primary .navbar-start>a.navbar-item:focus,.navbar.is-primary .navbar-start>a.navbar-item:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start .navbar-link:focus,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-end>a.navbar-item:focus,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end .navbar-link:focus,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end .navbar-link.is-active{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-start .navbar-link::after,.navbar.is-primary .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#55be6f;color:#fff}}.navbar.is-link{background-color:#4876ff;color:#fff}.navbar.is-link .navbar-brand>.navbar-item,.navbar.is-link .navbar-brand .navbar-link{color:#fff}.navbar.is-link .navbar-brand>a.navbar-item:focus,.navbar.is-link .navbar-brand>a.navbar-item:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand .navbar-link:focus,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand .navbar-link.is-active{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-link .navbar-start>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-end .navbar-link{color:#fff}.navbar.is-link .navbar-start>a.navbar-item:focus,.navbar.is-link .navbar-start>a.navbar-item:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start .navbar-link:focus,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-end>a.navbar-item:focus,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end .navbar-link:focus,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end .navbar-link.is-active{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-start .navbar-link::after,.navbar.is-link .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#4876ff;color:#fff}}.navbar.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand>.navbar-item,.navbar.is-info .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand>a.navbar-item:focus,.navbar.is-info .navbar-brand>a.navbar-item:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand .navbar-link:focus,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-info .navbar-start>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-start>a.navbar-item:focus,.navbar.is-info .navbar-start>a.navbar-item:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start .navbar-link:focus,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-end>a.navbar-item:focus,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end .navbar-link:focus,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-start .navbar-link::after,.navbar.is-info .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}}.navbar.is-success{background-color:#48c78e;color:#fff}.navbar.is-success .navbar-brand>.navbar-item,.navbar.is-success .navbar-brand .navbar-link{color:#fff}.navbar.is-success .navbar-brand>a.navbar-item:focus,.navbar.is-success .navbar-brand>a.navbar-item:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand .navbar-link:focus,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-success .navbar-start>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-end .navbar-link{color:#fff}.navbar.is-success .navbar-start>a.navbar-item:focus,.navbar.is-success .navbar-start>a.navbar-item:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start .navbar-link:focus,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-end>a.navbar-item:focus,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end .navbar-link:focus,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-start .navbar-link::after,.navbar.is-success .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#48c78e;color:#fff}}.navbar.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand>.navbar-item,.navbar.is-warning .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand>a.navbar-item:focus,.navbar.is-warning .navbar-brand>a.navbar-item:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand .navbar-link:focus,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-warning .navbar-start>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-start>a.navbar-item:focus,.navbar.is-warning .navbar-start>a.navbar-item:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start .navbar-link:focus,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-end>a.navbar-item:focus,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end .navbar-link:focus,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-start .navbar-link::after,.navbar.is-warning .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffd975;color:rgba(0,0,0,0.7)}}.navbar.is-danger{background-color:#f14668;color:#fff}.navbar.is-danger .navbar-brand>.navbar-item,.navbar.is-danger .navbar-brand .navbar-link{color:#fff}.navbar.is-danger .navbar-brand>a.navbar-item:focus,.navbar.is-danger .navbar-brand>a.navbar-item:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand .navbar-link:focus,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-danger .navbar-start>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-end .navbar-link{color:#fff}.navbar.is-danger .navbar-start>a.navbar-item:focus,.navbar.is-danger .navbar-start>a.navbar-item:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start .navbar-link:focus,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-end>a.navbar-item:focus,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end .navbar-link:focus,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-start .navbar-link::after,.navbar.is-danger .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#f14668;color:#fff}}.navbar>.container{align-items:stretch;display:flex;min-height:2rem;width:100%}.navbar.has-shadow{box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top{top:0}html.has-navbar-fixed-top,body.has-navbar-fixed-top{padding-top:2rem}html.has-navbar-fixed-bottom,body.has-navbar-fixed-bottom{padding-bottom:2rem}.navbar-brand,.navbar-tabs{align-items:stretch;display:flex;flex-shrink:0;min-height:2rem}.navbar-brand a.navbar-item:focus,.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:2rem;position:relative;width:2rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color, opacity, transform;transition-timing-function:ease-out;width:16px}.navbar-burger span:nth-child(1){top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0,0,0,0.05)}.navbar-burger.is-active span:nth-child(1){transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:0.5rem 0.75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-0.25rem;margin-right:-0.25rem}a.navbar-item,.navbar-link{cursor:pointer}a.navbar-item:focus,a.navbar-item:focus-within,a.navbar-item:hover,a.navbar-item.is-active,.navbar-link:focus,.navbar-link:focus-within,.navbar-link:hover,.navbar-link.is-active{background-color:#fafafa;color:#4876ff}.navbar-item{flex-grow:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{flex-grow:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:2rem;padding-bottom:calc(0.5rem - 1px)}.navbar-item.is-tab:focus,.navbar-item.is-tab:hover{background-color:rgba(0,0,0,0);border-bottom-color:#4876ff}.navbar-item.is-tab.is-active{background-color:rgba(0,0,0,0);border-bottom-color:#4876ff;border-bottom-style:solid;border-bottom-width:3px;color:#4876ff;padding-bottom:calc(0.5rem - 3px)}.navbar-content{flex-grow:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless)::after{border-color:#4876ff;margin-top:-0.375em;right:1.125em}.navbar-dropdown{font-size:0.875rem;padding-bottom:0.5rem;padding-top:0.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:#f5f5f5;border:none;display:none;height:2px;margin:0.5rem 0}@media screen and (max-width: 839px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{align-items:center;display:flex}.navbar-link::after{display:none}.navbar-menu{background-color:#fff;box-shadow:0 8px 16px rgba(10,10,10,0.1);padding:0.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,0.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top .navbar-menu,.navbar.is-fixed-top-touch .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 2rem);overflow:auto}html.has-navbar-fixed-top-touch,body.has-navbar-fixed-top-touch{padding-top:2rem}html.has-navbar-fixed-bottom-touch,body.has-navbar-fixed-bottom-touch{padding-bottom:2rem}}@media screen and (min-width: 840px){.navbar,.navbar-menu,.navbar-start,.navbar-end{align-items:stretch;display:flex}.navbar{min-height:2rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-start,.navbar.is-spaced .navbar-end{align-items:center}.navbar.is-spaced a.navbar-item,.navbar.is-spaced .navbar-link{border-radius:4px}.navbar.is-transparent a.navbar-item:focus,.navbar.is-transparent a.navbar-item:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent .navbar-link:focus,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent .navbar-link.is-active{background-color:transparent !important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{background-color:transparent !important}.navbar.is-transparent .navbar-dropdown a.navbar-item:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#4876ff}.navbar-burger{display:none}.navbar-item,.navbar-link{align-items:center;display:flex}.navbar-item.has-dropdown{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link::after{transform:rotate(135deg) translate(0.25em, -0.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px rgba(10,10,10,0.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu{flex-grow:1;flex-shrink:0}.navbar-start{justify-content:flex-start;margin-right:auto}.navbar-end{justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px rgba(10,10,10,0.1);display:none;font-size:0.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:0.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:focus,.navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#4876ff}.navbar.is-spaced .navbar-dropdown,.navbar-dropdown.is-boxed{border-radius:6px;border-top:none;box-shadow:0 8px 8px rgba(10,10,10,0.1),0 0 0 1px rgba(10,10,10,0.1);display:block;opacity:0;pointer-events:none;top:calc(100% + (-4px));transform:translateY(-5px);transition-duration:86ms;transition-property:opacity, transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.navbar>.container .navbar-brand,.container>.navbar .navbar-brand{margin-left:-.75rem}.navbar>.container .navbar-menu,.container>.navbar .navbar-menu{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,0.1)}.navbar.is-fixed-top-desktop{top:0}html.has-navbar-fixed-top-desktop,body.has-navbar-fixed-top-desktop{padding-top:2rem}html.has-navbar-fixed-bottom-desktop,body.has-navbar-fixed-bottom-desktop{padding-bottom:2rem}html.has-spaced-navbar-fixed-top,body.has-spaced-navbar-fixed-top{padding-top:4rem}html.has-spaced-navbar-fixed-bottom,body.has-spaced-navbar-fixed-bottom{padding-bottom:4rem}a.navbar-item.is-active,.navbar-link.is-active{color:#0a0a0a}a.navbar-item.is-active:not(:focus):not(:hover),.navbar-link.is-active:not(:focus):not(:hover){background-color:rgba(0,0,0,0)}.navbar-item.has-dropdown:focus .navbar-link,.navbar-item.has-dropdown:hover .navbar-link,.navbar-item.has-dropdown.is-active .navbar-link{background-color:#fafafa}}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 2rem)}.pagination{font-size:1rem;margin:-.25rem}.pagination.is-small{font-size:.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-previous,.pagination.is-rounded .pagination-next{padding-left:1em;padding-right:1em;border-radius:9999px}.pagination.is-rounded .pagination-link{border-radius:9999px}.pagination,.pagination-list{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{font-size:1em;justify-content:center;margin:.25rem;padding-left:.5em;padding-right:.5em;text-align:center}.pagination-previous,.pagination-next,.pagination-link{border-color:#dbdbdb;color:#363636;min-width:2.5em}.pagination-previous:hover,.pagination-next:hover,.pagination-link:hover{border-color:#b5b5b5;color:#363636}.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus{border-color:#485fc7}.pagination-previous:active,.pagination-next:active,.pagination-link:active{box-shadow:inset 0 1px 2px rgba(10,10,10,0.2)}.pagination-previous[disabled],.pagination-next[disabled],.pagination-link[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:0.5}.pagination-previous,.pagination-next{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current{background-color:#4876ff;border-color:#4876ff;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{flex-wrap:wrap}.pagination-list li{list-style:none}@media screen and (max-width: 768px){.pagination{flex-wrap:wrap}.pagination-previous,.pagination-next{flex-grow:1;flex-shrink:1}.pagination-list li{flex-grow:1;flex-shrink:1}}@media screen and (min-width: 769px), print{.pagination-list{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{margin-bottom:0;margin-top:0}.pagination-previous{order:2}.pagination-next{order:3}.pagination{justify-content:space-between;margin-bottom:0;margin-top:0}.pagination.is-centered .pagination-previous{order:1}.pagination.is-centered .pagination-list{justify-content:center;order:2}.pagination.is-centered .pagination-next{order:3}.pagination.is-right .pagination-previous{order:1}.pagination.is-right .pagination-next{order:2}.pagination.is-right .pagination-list{justify-content:flex-end;order:3}}.panel{border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel.is-white .panel-heading{background-color:#fff;color:#0a0a0a}.panel.is-white .panel-tabs a.is-active{border-bottom-color:#fff}.panel.is-white .panel-block.is-active .panel-icon{color:#fff}.panel.is-black .panel-heading{background-color:#0a0a0a;color:#fff}.panel.is-black .panel-tabs a.is-active{border-bottom-color:#0a0a0a}.panel.is-black .panel-block.is-active .panel-icon{color:#0a0a0a}.panel.is-light .panel-heading{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.panel.is-light .panel-tabs a.is-active{border-bottom-color:#d2f9d6}.panel.is-light .panel-block.is-active .panel-icon{color:#d2f9d6}.panel.is-dark .panel-heading{background-color:#459558;color:#fff}.panel.is-dark .panel-tabs a.is-active{border-bottom-color:#459558}.panel.is-dark .panel-block.is-active .panel-icon{color:#459558}.panel.is-primary .panel-heading{background-color:#55be6f;color:#fff}.panel.is-primary .panel-tabs a.is-active{border-bottom-color:#55be6f}.panel.is-primary .panel-block.is-active .panel-icon{color:#55be6f}.panel.is-link .panel-heading{background-color:#4876ff;color:#fff}.panel.is-link .panel-tabs a.is-active{border-bottom-color:#4876ff}.panel.is-link .panel-block.is-active .panel-icon{color:#4876ff}.panel.is-info .panel-heading{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.panel.is-info .panel-tabs a.is-active{border-bottom-color:#f0f8ff}.panel.is-info .panel-block.is-active .panel-icon{color:#f0f8ff}.panel.is-success .panel-heading{background-color:#48c78e;color:#fff}.panel.is-success .panel-tabs a.is-active{border-bottom-color:#48c78e}.panel.is-success .panel-block.is-active .panel-icon{color:#48c78e}.panel.is-warning .panel-heading{background-color:#ffd975;color:rgba(0,0,0,0.7)}.panel.is-warning .panel-tabs a.is-active{border-bottom-color:#ffd975}.panel.is-warning .panel-block.is-active .panel-icon{color:#ffd975}.panel.is-danger .panel-heading{background-color:#f14668;color:#fff}.panel.is-danger .panel-tabs a.is-active{border-bottom-color:#f14668}.panel.is-danger .panel-block.is-active .panel-icon{color:#f14668}.panel-tabs:not(:last-child),.panel-block:not(:last-child){border-bottom:1px solid #ededed}.panel-heading{background-color:#ededed;border-radius:6px 6px 0 0;color:#363636;font-size:1.25em;font-weight:700;line-height:1.25;padding:0.75em 1em}.panel-tabs{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:0.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#4876ff}.panel-block{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:0.5em 0.75em}.panel-block input[type="checkbox"]{margin-right:.75em}.panel-block>.control{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{flex-wrap:wrap}.panel-block.is-active{border-left-color:#4876ff;color:#363636}.panel-block.is-active .panel-icon{color:#4876ff}.panel-block:last-child{border-bottom-left-radius:6px;border-bottom-right-radius:6px}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:#f5f5f5}.panel-icon{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:0.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#4876ff;color:#4876ff}.tabs ul{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left{padding-right:0.75em}.tabs ul.is-center{flex:none;justify-content:center;padding-left:0.75em;padding-right:0.75em}.tabs ul.is-right{justify-content:flex-end;padding-left:0.75em}.tabs .icon:first-child{margin-right:.5em}.tabs .icon:last-child{margin-left:.5em}.tabs.is-centered ul{justify-content:center}.tabs.is-right ul{justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:#fff;border-color:#dbdbdb;border-bottom-color:rgba(0,0,0,0) !important}.tabs.is-fullwidth li{flex-grow:1;flex-shrink:0}.tabs.is-toggle a{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-top-left-radius:4px;border-bottom-left-radius:4px}.tabs.is-toggle li:last-child a{border-top-right-radius:4px;border-bottom-right-radius:4px}.tabs.is-toggle li.is-active a{background-color:#4876ff;border-color:#4876ff;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:9999px;border-top-left-radius:9999px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:9999px;border-top-right-radius:9999px;padding-right:1.25em}.tabs.is-small{font-size:.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow{flex:none;width:unset}.columns.is-mobile>.column.is-full{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{flex:none;width:50%}.columns.is-mobile>.column.is-one-third{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-0{flex:none;width:0%}.columns.is-mobile>.column.is-offset-0{margin-left:0%}.columns.is-mobile>.column.is-1{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1{margin-left:8.33333%}.columns.is-mobile>.column.is-2{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2{margin-left:16.66667%}.columns.is-mobile>.column.is-3{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4{margin-left:33.33333%}.columns.is-mobile>.column.is-5{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5{margin-left:41.66667%}.columns.is-mobile>.column.is-6{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7{margin-left:58.33333%}.columns.is-mobile>.column.is-8{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8{margin-left:66.66667%}.columns.is-mobile>.column.is-9{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10{margin-left:83.33333%}.columns.is-mobile>.column.is-11{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11{margin-left:91.66667%}.columns.is-mobile>.column.is-12{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}@media screen and (max-width: 768px){.column.is-narrow-mobile{flex:none;width:unset}.column.is-full-mobile{flex:none;width:100%}.column.is-three-quarters-mobile{flex:none;width:75%}.column.is-two-thirds-mobile{flex:none;width:66.6666%}.column.is-half-mobile{flex:none;width:50%}.column.is-one-third-mobile{flex:none;width:33.3333%}.column.is-one-quarter-mobile{flex:none;width:25%}.column.is-one-fifth-mobile{flex:none;width:20%}.column.is-two-fifths-mobile{flex:none;width:40%}.column.is-three-fifths-mobile{flex:none;width:60%}.column.is-four-fifths-mobile{flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-0-mobile{flex:none;width:0%}.column.is-offset-0-mobile{margin-left:0%}.column.is-1-mobile{flex:none;width:8.33333%}.column.is-offset-1-mobile{margin-left:8.33333%}.column.is-2-mobile{flex:none;width:16.66667%}.column.is-offset-2-mobile{margin-left:16.66667%}.column.is-3-mobile{flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{flex:none;width:33.33333%}.column.is-offset-4-mobile{margin-left:33.33333%}.column.is-5-mobile{flex:none;width:41.66667%}.column.is-offset-5-mobile{margin-left:41.66667%}.column.is-6-mobile{flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{flex:none;width:58.33333%}.column.is-offset-7-mobile{margin-left:58.33333%}.column.is-8-mobile{flex:none;width:66.66667%}.column.is-offset-8-mobile{margin-left:66.66667%}.column.is-9-mobile{flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{flex:none;width:83.33333%}.column.is-offset-10-mobile{margin-left:83.33333%}.column.is-11-mobile{flex:none;width:91.66667%}.column.is-offset-11-mobile{margin-left:91.66667%}.column.is-12-mobile{flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}@media screen and (min-width: 769px), print{.column.is-narrow,.column.is-narrow-tablet{flex:none;width:unset}.column.is-full,.column.is-full-tablet{flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-0,.column.is-0-tablet{flex:none;width:0%}.column.is-offset-0,.column.is-offset-0-tablet{margin-left:0%}.column.is-1,.column.is-1-tablet{flex:none;width:8.33333%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.33333%}.column.is-2,.column.is-2-tablet{flex:none;width:16.66667%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.66667%}.column.is-3,.column.is-3-tablet{flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{flex:none;width:33.33333%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.33333%}.column.is-5,.column.is-5-tablet{flex:none;width:41.66667%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.66667%}.column.is-6,.column.is-6-tablet{flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{flex:none;width:58.33333%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.33333%}.column.is-8,.column.is-8-tablet{flex:none;width:66.66667%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.66667%}.column.is-9,.column.is-9-tablet{flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{flex:none;width:83.33333%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.33333%}.column.is-11,.column.is-11-tablet{flex:none;width:91.66667%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.66667%}.column.is-12,.column.is-12-tablet{flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}@media screen and (max-width: 1023px){.column.is-narrow-touch{flex:none;width:unset}.column.is-full-touch{flex:none;width:100%}.column.is-three-quarters-touch{flex:none;width:75%}.column.is-two-thirds-touch{flex:none;width:66.6666%}.column.is-half-touch{flex:none;width:50%}.column.is-one-third-touch{flex:none;width:33.3333%}.column.is-one-quarter-touch{flex:none;width:25%}.column.is-one-fifth-touch{flex:none;width:20%}.column.is-two-fifths-touch{flex:none;width:40%}.column.is-three-fifths-touch{flex:none;width:60%}.column.is-four-fifths-touch{flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-0-touch{flex:none;width:0%}.column.is-offset-0-touch{margin-left:0%}.column.is-1-touch{flex:none;width:8.33333%}.column.is-offset-1-touch{margin-left:8.33333%}.column.is-2-touch{flex:none;width:16.66667%}.column.is-offset-2-touch{margin-left:16.66667%}.column.is-3-touch{flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{flex:none;width:33.33333%}.column.is-offset-4-touch{margin-left:33.33333%}.column.is-5-touch{flex:none;width:41.66667%}.column.is-offset-5-touch{margin-left:41.66667%}.column.is-6-touch{flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{flex:none;width:58.33333%}.column.is-offset-7-touch{margin-left:58.33333%}.column.is-8-touch{flex:none;width:66.66667%}.column.is-offset-8-touch{margin-left:66.66667%}.column.is-9-touch{flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{flex:none;width:83.33333%}.column.is-offset-10-touch{margin-left:83.33333%}.column.is-11-touch{flex:none;width:91.66667%}.column.is-offset-11-touch{margin-left:91.66667%}.column.is-12-touch{flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}@media screen and (min-width: 1024px){.column.is-narrow-desktop{flex:none;width:unset}.column.is-full-desktop{flex:none;width:100%}.column.is-three-quarters-desktop{flex:none;width:75%}.column.is-two-thirds-desktop{flex:none;width:66.6666%}.column.is-half-desktop{flex:none;width:50%}.column.is-one-third-desktop{flex:none;width:33.3333%}.column.is-one-quarter-desktop{flex:none;width:25%}.column.is-one-fifth-desktop{flex:none;width:20%}.column.is-two-fifths-desktop{flex:none;width:40%}.column.is-three-fifths-desktop{flex:none;width:60%}.column.is-four-fifths-desktop{flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-0-desktop{flex:none;width:0%}.column.is-offset-0-desktop{margin-left:0%}.column.is-1-desktop{flex:none;width:8.33333%}.column.is-offset-1-desktop{margin-left:8.33333%}.column.is-2-desktop{flex:none;width:16.66667%}.column.is-offset-2-desktop{margin-left:16.66667%}.column.is-3-desktop{flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{flex:none;width:33.33333%}.column.is-offset-4-desktop{margin-left:33.33333%}.column.is-5-desktop{flex:none;width:41.66667%}.column.is-offset-5-desktop{margin-left:41.66667%}.column.is-6-desktop{flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{flex:none;width:58.33333%}.column.is-offset-7-desktop{margin-left:58.33333%}.column.is-8-desktop{flex:none;width:66.66667%}.column.is-offset-8-desktop{margin-left:66.66667%}.column.is-9-desktop{flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{flex:none;width:83.33333%}.column.is-offset-10-desktop{margin-left:83.33333%}.column.is-11-desktop{flex:none;width:91.66667%}.column.is-offset-11-desktop{margin-left:91.66667%}.column.is-12-desktop{flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}@media screen and (min-width: 1216px){.column.is-narrow-widescreen{flex:none;width:unset}.column.is-full-widescreen{flex:none;width:100%}.column.is-three-quarters-widescreen{flex:none;width:75%}.column.is-two-thirds-widescreen{flex:none;width:66.6666%}.column.is-half-widescreen{flex:none;width:50%}.column.is-one-third-widescreen{flex:none;width:33.3333%}.column.is-one-quarter-widescreen{flex:none;width:25%}.column.is-one-fifth-widescreen{flex:none;width:20%}.column.is-two-fifths-widescreen{flex:none;width:40%}.column.is-three-fifths-widescreen{flex:none;width:60%}.column.is-four-fifths-widescreen{flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-0-widescreen{flex:none;width:0%}.column.is-offset-0-widescreen{margin-left:0%}.column.is-1-widescreen{flex:none;width:8.33333%}.column.is-offset-1-widescreen{margin-left:8.33333%}.column.is-2-widescreen{flex:none;width:16.66667%}.column.is-offset-2-widescreen{margin-left:16.66667%}.column.is-3-widescreen{flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{flex:none;width:33.33333%}.column.is-offset-4-widescreen{margin-left:33.33333%}.column.is-5-widescreen{flex:none;width:41.66667%}.column.is-offset-5-widescreen{margin-left:41.66667%}.column.is-6-widescreen{flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{flex:none;width:58.33333%}.column.is-offset-7-widescreen{margin-left:58.33333%}.column.is-8-widescreen{flex:none;width:66.66667%}.column.is-offset-8-widescreen{margin-left:66.66667%}.column.is-9-widescreen{flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{flex:none;width:83.33333%}.column.is-offset-10-widescreen{margin-left:83.33333%}.column.is-11-widescreen{flex:none;width:91.66667%}.column.is-offset-11-widescreen{margin-left:91.66667%}.column.is-12-widescreen{flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}@media screen and (min-width: 1408px){.column.is-narrow-fullhd{flex:none;width:unset}.column.is-full-fullhd{flex:none;width:100%}.column.is-three-quarters-fullhd{flex:none;width:75%}.column.is-two-thirds-fullhd{flex:none;width:66.6666%}.column.is-half-fullhd{flex:none;width:50%}.column.is-one-third-fullhd{flex:none;width:33.3333%}.column.is-one-quarter-fullhd{flex:none;width:25%}.column.is-one-fifth-fullhd{flex:none;width:20%}.column.is-two-fifths-fullhd{flex:none;width:40%}.column.is-three-fifths-fullhd{flex:none;width:60%}.column.is-four-fifths-fullhd{flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-0-fullhd{flex:none;width:0%}.column.is-offset-0-fullhd{margin-left:0%}.column.is-1-fullhd{flex:none;width:8.33333%}.column.is-offset-1-fullhd{margin-left:8.33333%}.column.is-2-fullhd{flex:none;width:16.66667%}.column.is-offset-2-fullhd{margin-left:16.66667%}.column.is-3-fullhd{flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{flex:none;width:33.33333%}.column.is-offset-4-fullhd{margin-left:33.33333%}.column.is-5-fullhd{flex:none;width:41.66667%}.column.is-offset-5-fullhd{margin-left:41.66667%}.column.is-6-fullhd{flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{flex:none;width:58.33333%}.column.is-offset-7-fullhd{margin-left:58.33333%}.column.is-8-fullhd{flex:none;width:66.66667%}.column.is-offset-8-fullhd{margin-left:66.66667%}.column.is-9-fullhd{flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{flex:none;width:83.33333%}.column.is-offset-10-fullhd{margin-left:83.33333%}.column.is-11-fullhd{flex:none;width:91.66667%}.column.is-offset-11-fullhd{margin-left:91.66667%}.column.is-12-fullhd{flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns:last-child{margin-bottom:-.75rem}.columns:not(:last-child){margin-bottom:calc(1.5rem - .75rem)}.columns.is-centered{justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0 !important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:flex}.columns.is-multiline{flex-wrap:wrap}.columns.is-vcentered{align-items:center}@media screen and (min-width: 769px), print{.columns:not(.is-desktop){display:flex}}@media screen and (min-width: 1024px){.columns.is-desktop{display:flex}}.columns.is-variable{--columnGap: 0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable>.column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap: 0rem}@media screen and (max-width: 768px){.columns.is-variable.is-0-mobile{--columnGap: 0rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-0-tablet{--columnGap: 0rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-0-tablet-only{--columnGap: 0rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-0-touch{--columnGap: 0rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-0-desktop{--columnGap: 0rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-0-desktop-only{--columnGap: 0rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-0-widescreen{--columnGap: 0rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-0-widescreen-only{--columnGap: 0rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-0-fullhd{--columnGap: 0rem}}.columns.is-variable.is-1{--columnGap: .25rem}@media screen and (max-width: 768px){.columns.is-variable.is-1-mobile{--columnGap: .25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-1-tablet{--columnGap: .25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-1-tablet-only{--columnGap: .25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-1-touch{--columnGap: .25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-1-desktop{--columnGap: .25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-1-desktop-only{--columnGap: .25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-1-widescreen{--columnGap: .25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-1-widescreen-only{--columnGap: .25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-1-fullhd{--columnGap: .25rem}}.columns.is-variable.is-2{--columnGap: .5rem}@media screen and (max-width: 768px){.columns.is-variable.is-2-mobile{--columnGap: .5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-2-tablet{--columnGap: .5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-2-tablet-only{--columnGap: .5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-2-touch{--columnGap: .5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-2-desktop{--columnGap: .5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-2-desktop-only{--columnGap: .5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-2-widescreen{--columnGap: .5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-2-widescreen-only{--columnGap: .5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-2-fullhd{--columnGap: .5rem}}.columns.is-variable.is-3{--columnGap: .75rem}@media screen and (max-width: 768px){.columns.is-variable.is-3-mobile{--columnGap: .75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-3-tablet{--columnGap: .75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-3-tablet-only{--columnGap: .75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-3-touch{--columnGap: .75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-3-desktop{--columnGap: .75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-3-desktop-only{--columnGap: .75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-3-widescreen{--columnGap: .75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-3-widescreen-only{--columnGap: .75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-3-fullhd{--columnGap: .75rem}}.columns.is-variable.is-4{--columnGap: 1rem}@media screen and (max-width: 768px){.columns.is-variable.is-4-mobile{--columnGap: 1rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-4-tablet{--columnGap: 1rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-4-tablet-only{--columnGap: 1rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-4-touch{--columnGap: 1rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-4-desktop{--columnGap: 1rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-4-desktop-only{--columnGap: 1rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-4-widescreen{--columnGap: 1rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-4-widescreen-only{--columnGap: 1rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-4-fullhd{--columnGap: 1rem}}.columns.is-variable.is-5{--columnGap: 1.25rem}@media screen and (max-width: 768px){.columns.is-variable.is-5-mobile{--columnGap: 1.25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-5-tablet{--columnGap: 1.25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-5-tablet-only{--columnGap: 1.25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-5-touch{--columnGap: 1.25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-5-desktop{--columnGap: 1.25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-5-desktop-only{--columnGap: 1.25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-5-widescreen{--columnGap: 1.25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-5-widescreen-only{--columnGap: 1.25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-5-fullhd{--columnGap: 1.25rem}}.columns.is-variable.is-6{--columnGap: 1.5rem}@media screen and (max-width: 768px){.columns.is-variable.is-6-mobile{--columnGap: 1.5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-6-tablet{--columnGap: 1.5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-6-tablet-only{--columnGap: 1.5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-6-touch{--columnGap: 1.5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-6-desktop{--columnGap: 1.5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-6-desktop-only{--columnGap: 1.5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-6-widescreen{--columnGap: 1.5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-6-widescreen-only{--columnGap: 1.5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-6-fullhd{--columnGap: 1.5rem}}.columns.is-variable.is-7{--columnGap: 1.75rem}@media screen and (max-width: 768px){.columns.is-variable.is-7-mobile{--columnGap: 1.75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-7-tablet{--columnGap: 1.75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-7-tablet-only{--columnGap: 1.75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-7-touch{--columnGap: 1.75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-7-desktop{--columnGap: 1.75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-7-desktop-only{--columnGap: 1.75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-7-widescreen{--columnGap: 1.75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-7-widescreen-only{--columnGap: 1.75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-7-fullhd{--columnGap: 1.75rem}}.columns.is-variable.is-8{--columnGap: 2rem}@media screen and (max-width: 768px){.columns.is-variable.is-8-mobile{--columnGap: 2rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-8-tablet{--columnGap: 2rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-8-tablet-only{--columnGap: 2rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-8-touch{--columnGap: 2rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-8-desktop{--columnGap: 2rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-8-desktop-only{--columnGap: 2rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-8-widescreen{--columnGap: 2rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-8-widescreen-only{--columnGap: 2rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-8-fullhd{--columnGap: 2rem}}.tile{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:min-content}.tile.is-ancestor{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor:last-child{margin-bottom:-.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:.75rem}.tile.is-child{margin:0 !important}.tile.is-parent{padding:.75rem}.tile.is-vertical{flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem !important}@media screen and (min-width: 769px), print{.tile:not(.is-child){display:flex}.tile.is-1{flex:none;width:8.33333%}.tile.is-2{flex:none;width:16.66667%}.tile.is-3{flex:none;width:25%}.tile.is-4{flex:none;width:33.33333%}.tile.is-5{flex:none;width:41.66667%}.tile.is-6{flex:none;width:50%}.tile.is-7{flex:none;width:58.33333%}.tile.is-8{flex:none;width:66.66667%}.tile.is-9{flex:none;width:75%}.tile.is-10{flex:none;width:83.33333%}.tile.is-11{flex:none;width:91.66667%}.tile.is-12{flex:none;width:100%}}.has-text-white{color:#fff !important}a.has-text-white:hover,a.has-text-white:focus{color:#e6e6e6 !important}.has-background-white{background-color:#fff !important}.has-text-black{color:#0a0a0a !important}a.has-text-black:hover,a.has-text-black:focus{color:#000 !important}.has-background-black{background-color:#0a0a0a !important}.has-text-light{color:#d2f9d6 !important}a.has-text-light:hover,a.has-text-light:focus{color:#a5f3ad !important}.has-background-light{background-color:#d2f9d6 !important}.has-text-dark{color:#459558 !important}a.has-text-dark:hover,a.has-text-dark:focus{color:#357243 !important}.has-background-dark{background-color:#459558 !important}.has-text-primary{color:#55be6f !important}a.has-text-primary:hover,a.has-text-primary:focus{color:#3ea257 !important}.has-background-primary{background-color:#55be6f !important}.has-text-primary-light{color:#f0f9f2 !important}a.has-text-primary-light:hover,a.has-text-primary-light:focus{color:#cbebd3 !important}.has-background-primary-light{background-color:#f0f9f2 !important}.has-text-primary-dark{color:#2f7a41 !important}a.has-text-primary-dark:hover,a.has-text-primary-dark:focus{color:#3d9f55 !important}.has-background-primary-dark{background-color:#2f7a41 !important}.has-text-link{color:#4876ff !important}a.has-text-link:hover,a.has-text-link:focus{color:#1550ff !important}.has-background-link{background-color:#4876ff !important}.has-text-link-light{color:#ebf0ff !important}a.has-text-link-light:hover,a.has-text-link-light:focus{color:#b8caff !important}.has-background-link-light{background-color:#ebf0ff !important}.has-text-link-dark{color:#0037db !important}a.has-text-link-dark:hover,a.has-text-link-dark:focus{color:#0f4cff !important}.has-background-link-dark{background-color:#0037db !important}.has-text-info{color:#f0f8ff !important}a.has-text-info:hover,a.has-text-info:focus{color:#bde0ff !important}.has-background-info{background-color:#f0f8ff !important}.has-text-info-light{color:#f0f8ff !important}a.has-text-info-light:hover,a.has-text-info-light:focus{color:#bde0ff !important}.has-background-info-light{background-color:#f0f8ff !important}.has-text-info-dark{color:#004f94 !important}a.has-text-info-dark:hover,a.has-text-info-dark:focus{color:#006ac7 !important}.has-background-info-dark{background-color:#004f94 !important}.has-text-success{color:#48c78e !important}a.has-text-success:hover,a.has-text-success:focus{color:#34a873 !important}.has-background-success{background-color:#48c78e !important}.has-text-success-light{color:#effaf5 !important}a.has-text-success-light:hover,a.has-text-success-light:focus{color:#c8eedd !important}.has-background-success-light{background-color:#effaf5 !important}.has-text-success-dark{color:#257953 !important}a.has-text-success-dark:hover,a.has-text-success-dark:focus{color:#31a06e !important}.has-background-success-dark{background-color:#257953 !important}.has-text-warning{color:#ffd975 !important}a.has-text-warning:hover,a.has-text-warning:focus{color:#ffcb42 !important}.has-background-warning{background-color:#ffd975 !important}.has-text-warning-light{color:#fff9eb !important}a.has-text-warning-light:hover,a.has-text-warning-light:focus{color:#ffebb8 !important}.has-background-warning-light{background-color:#fff9eb !important}.has-text-warning-dark{color:#946b00 !important}a.has-text-warning-dark:hover,a.has-text-warning-dark:focus{color:#c79000 !important}.has-background-warning-dark{background-color:#946b00 !important}.has-text-danger{color:#f14668 !important}a.has-text-danger:hover,a.has-text-danger:focus{color:#ee1742 !important}.has-background-danger{background-color:#f14668 !important}.has-text-danger-light{color:#feecf0 !important}a.has-text-danger-light:hover,a.has-text-danger-light:focus{color:#fabdc9 !important}.has-background-danger-light{background-color:#feecf0 !important}.has-text-danger-dark{color:#cc0f35 !important}a.has-text-danger-dark:hover,a.has-text-danger-dark:focus{color:#ee2049 !important}.has-background-danger-dark{background-color:#cc0f35 !important}.has-text-black-bis{color:#121212 !important}.has-background-black-bis{background-color:#121212 !important}.has-text-black-ter{color:#242424 !important}.has-background-black-ter{background-color:#242424 !important}.has-text-grey-darker{color:#363636 !important}.has-background-grey-darker{background-color:#363636 !important}.has-text-grey-dark{color:#4a4a4a !important}.has-background-grey-dark{background-color:#4a4a4a !important}.has-text-grey{color:#7a7a7a !important}.has-background-grey{background-color:#7a7a7a !important}.has-text-grey-light{color:#b5b5b5 !important}.has-background-grey-light{background-color:#b5b5b5 !important}.has-text-grey-lighter{color:#dbdbdb !important}.has-background-grey-lighter{background-color:#dbdbdb !important}.has-text-white-ter{color:#f5f5f5 !important}.has-background-white-ter{background-color:#f5f5f5 !important}.has-text-white-bis{color:#fafafa !important}.has-background-white-bis{background-color:#fafafa !important}.is-flex-direction-row{flex-direction:row !important}.is-flex-direction-row-reverse{flex-direction:row-reverse !important}.is-flex-direction-column{flex-direction:column !important}.is-flex-direction-column-reverse{flex-direction:column-reverse !important}.is-flex-wrap-nowrap{flex-wrap:nowrap !important}.is-flex-wrap-wrap{flex-wrap:wrap !important}.is-flex-wrap-wrap-reverse{flex-wrap:wrap-reverse !important}.is-justify-content-flex-start{justify-content:flex-start !important}.is-justify-content-flex-end{justify-content:flex-end !important}.is-justify-content-center{justify-content:center !important}.is-justify-content-space-between{justify-content:space-between !important}.is-justify-content-space-around{justify-content:space-around !important}.is-justify-content-space-evenly{justify-content:space-evenly !important}.is-justify-content-start{justify-content:start !important}.is-justify-content-end{justify-content:end !important}.is-justify-content-left{justify-content:left !important}.is-justify-content-right{justify-content:right !important}.is-align-content-flex-start{align-content:flex-start !important}.is-align-content-flex-end{align-content:flex-end !important}.is-align-content-center{align-content:center !important}.is-align-content-space-between{align-content:space-between !important}.is-align-content-space-around{align-content:space-around !important}.is-align-content-space-evenly{align-content:space-evenly !important}.is-align-content-stretch{align-content:stretch !important}.is-align-content-start{align-content:start !important}.is-align-content-end{align-content:end !important}.is-align-content-baseline{align-content:baseline !important}.is-align-items-stretch{align-items:stretch !important}.is-align-items-flex-start{align-items:flex-start !important}.is-align-items-flex-end{align-items:flex-end !important}.is-align-items-center{align-items:center !important}.is-align-items-baseline{align-items:baseline !important}.is-align-items-start{align-items:start !important}.is-align-items-end{align-items:end !important}.is-align-items-self-start{align-items:self-start !important}.is-align-items-self-end{align-items:self-end !important}.is-align-self-auto{align-self:auto !important}.is-align-self-flex-start{align-self:flex-start !important}.is-align-self-flex-end{align-self:flex-end !important}.is-align-self-center{align-self:center !important}.is-align-self-baseline{align-self:baseline !important}.is-align-self-stretch{align-self:stretch !important}.is-flex-grow-0{flex-grow:0 !important}.is-flex-grow-1{flex-grow:1 !important}.is-flex-grow-2{flex-grow:2 !important}.is-flex-grow-3{flex-grow:3 !important}.is-flex-grow-4{flex-grow:4 !important}.is-flex-grow-5{flex-grow:5 !important}.is-flex-shrink-0{flex-shrink:0 !important}.is-flex-shrink-1{flex-shrink:1 !important}.is-flex-shrink-2{flex-shrink:2 !important}.is-flex-shrink-3{flex-shrink:3 !important}.is-flex-shrink-4{flex-shrink:4 !important}.is-flex-shrink-5{flex-shrink:5 !important}.is-clearfix::after{clear:both;content:" ";display:table}.is-pulled-left{float:left !important}.is-pulled-right{float:right !important}.is-radiusless{border-radius:0 !important}.is-shadowless{box-shadow:none !important}.is-clickable{cursor:pointer !important;pointer-events:all !important}.is-clipped{overflow:hidden !important}.is-relative{position:relative !important}.is-marginless{margin:0 !important}.is-paddingless{padding:0 !important}.m-0{margin:0 !important}.mt-0{margin-top:0 !important}.mr-0{margin-right:0 !important}.mb-0{margin-bottom:0 !important}.ml-0{margin-left:0 !important}.mx-0{margin-left:0 !important;margin-right:0 !important}.my-0{margin-top:0 !important;margin-bottom:0 !important}.m-1{margin:.25rem !important}.mt-1{margin-top:.25rem !important}.mr-1{margin-right:.25rem !important}.mb-1{margin-bottom:.25rem !important}.ml-1{margin-left:.25rem !important}.mx-1{margin-left:.25rem !important;margin-right:.25rem !important}.my-1{margin-top:.25rem !important;margin-bottom:.25rem !important}.m-2{margin:.5rem !important}.mt-2{margin-top:.5rem !important}.mr-2{margin-right:.5rem !important}.mb-2{margin-bottom:.5rem !important}.ml-2{margin-left:.5rem !important}.mx-2{margin-left:.5rem !important;margin-right:.5rem !important}.my-2{margin-top:.5rem !important;margin-bottom:.5rem !important}.m-3{margin:.75rem !important}.mt-3{margin-top:.75rem !important}.mr-3{margin-right:.75rem !important}.mb-3{margin-bottom:.75rem !important}.ml-3{margin-left:.75rem !important}.mx-3{margin-left:.75rem !important;margin-right:.75rem !important}.my-3{margin-top:.75rem !important;margin-bottom:.75rem !important}.m-4{margin:1rem !important}.mt-4{margin-top:1rem !important}.mr-4{margin-right:1rem !important}.mb-4{margin-bottom:1rem !important}.ml-4{margin-left:1rem !important}.mx-4{margin-left:1rem !important;margin-right:1rem !important}.my-4{margin-top:1rem !important;margin-bottom:1rem !important}.m-5{margin:1.5rem !important}.mt-5{margin-top:1.5rem !important}.mr-5{margin-right:1.5rem !important}.mb-5{margin-bottom:1.5rem !important}.ml-5{margin-left:1.5rem !important}.mx-5{margin-left:1.5rem !important;margin-right:1.5rem !important}.my-5{margin-top:1.5rem !important;margin-bottom:1.5rem !important}.m-6{margin:3rem !important}.mt-6{margin-top:3rem !important}.mr-6{margin-right:3rem !important}.mb-6{margin-bottom:3rem !important}.ml-6{margin-left:3rem !important}.mx-6{margin-left:3rem !important;margin-right:3rem !important}.my-6{margin-top:3rem !important;margin-bottom:3rem !important}.m-auto{margin:auto !important}.mt-auto{margin-top:auto !important}.mr-auto{margin-right:auto !important}.mb-auto{margin-bottom:auto !important}.ml-auto{margin-left:auto !important}.mx-auto{margin-left:auto !important;margin-right:auto !important}.my-auto{margin-top:auto !important;margin-bottom:auto !important}.p-0{padding:0 !important}.pt-0{padding-top:0 !important}.pr-0{padding-right:0 !important}.pb-0{padding-bottom:0 !important}.pl-0{padding-left:0 !important}.px-0{padding-left:0 !important;padding-right:0 !important}.py-0{padding-top:0 !important;padding-bottom:0 !important}.p-1{padding:.25rem !important}.pt-1{padding-top:.25rem !important}.pr-1{padding-right:.25rem !important}.pb-1{padding-bottom:.25rem !important}.pl-1{padding-left:.25rem !important}.px-1{padding-left:.25rem !important;padding-right:.25rem !important}.py-1{padding-top:.25rem !important;padding-bottom:.25rem !important}.p-2{padding:.5rem !important}.pt-2{padding-top:.5rem !important}.pr-2{padding-right:.5rem !important}.pb-2{padding-bottom:.5rem !important}.pl-2{padding-left:.5rem !important}.px-2{padding-left:.5rem !important;padding-right:.5rem !important}.py-2{padding-top:.5rem !important;padding-bottom:.5rem !important}.p-3{padding:.75rem !important}.pt-3{padding-top:.75rem !important}.pr-3{padding-right:.75rem !important}.pb-3{padding-bottom:.75rem !important}.pl-3{padding-left:.75rem !important}.px-3{padding-left:.75rem !important;padding-right:.75rem !important}.py-3{padding-top:.75rem !important;padding-bottom:.75rem !important}.p-4{padding:1rem !important}.pt-4{padding-top:1rem !important}.pr-4{padding-right:1rem !important}.pb-4{padding-bottom:1rem !important}.pl-4{padding-left:1rem !important}.px-4{padding-left:1rem !important;padding-right:1rem !important}.py-4{padding-top:1rem !important;padding-bottom:1rem !important}.p-5{padding:1.5rem !important}.pt-5{padding-top:1.5rem !important}.pr-5{padding-right:1.5rem !important}.pb-5{padding-bottom:1.5rem !important}.pl-5{padding-left:1.5rem !important}.px-5{padding-left:1.5rem !important;padding-right:1.5rem !important}.py-5{padding-top:1.5rem !important;padding-bottom:1.5rem !important}.p-6{padding:3rem !important}.pt-6{padding-top:3rem !important}.pr-6{padding-right:3rem !important}.pb-6{padding-bottom:3rem !important}.pl-6{padding-left:3rem !important}.px-6{padding-left:3rem !important;padding-right:3rem !important}.py-6{padding-top:3rem !important;padding-bottom:3rem !important}.p-auto{padding:auto !important}.pt-auto{padding-top:auto !important}.pr-auto{padding-right:auto !important}.pb-auto{padding-bottom:auto !important}.pl-auto{padding-left:auto !important}.px-auto{padding-left:auto !important;padding-right:auto !important}.py-auto{padding-top:auto !important;padding-bottom:auto !important}.is-size-1{font-size:3rem !important}.is-size-2{font-size:2.5rem !important}.is-size-3{font-size:2rem !important}.is-size-4{font-size:1.5rem !important}.is-size-5{font-size:1.25rem !important}.is-size-6{font-size:1rem !important}.is-size-7{font-size:.75rem !important}@media screen and (max-width: 768px){.is-size-1-mobile{font-size:3rem !important}.is-size-2-mobile{font-size:2.5rem !important}.is-size-3-mobile{font-size:2rem !important}.is-size-4-mobile{font-size:1.5rem !important}.is-size-5-mobile{font-size:1.25rem !important}.is-size-6-mobile{font-size:1rem !important}.is-size-7-mobile{font-size:.75rem !important}}@media screen and (min-width: 769px), print{.is-size-1-tablet{font-size:3rem !important}.is-size-2-tablet{font-size:2.5rem !important}.is-size-3-tablet{font-size:2rem !important}.is-size-4-tablet{font-size:1.5rem !important}.is-size-5-tablet{font-size:1.25rem !important}.is-size-6-tablet{font-size:1rem !important}.is-size-7-tablet{font-size:.75rem !important}}@media screen and (max-width: 1023px){.is-size-1-touch{font-size:3rem !important}.is-size-2-touch{font-size:2.5rem !important}.is-size-3-touch{font-size:2rem !important}.is-size-4-touch{font-size:1.5rem !important}.is-size-5-touch{font-size:1.25rem !important}.is-size-6-touch{font-size:1rem !important}.is-size-7-touch{font-size:.75rem !important}}@media screen and (min-width: 1024px){.is-size-1-desktop{font-size:3rem !important}.is-size-2-desktop{font-size:2.5rem !important}.is-size-3-desktop{font-size:2rem !important}.is-size-4-desktop{font-size:1.5rem !important}.is-size-5-desktop{font-size:1.25rem !important}.is-size-6-desktop{font-size:1rem !important}.is-size-7-desktop{font-size:.75rem !important}}@media screen and (min-width: 1216px){.is-size-1-widescreen{font-size:3rem !important}.is-size-2-widescreen{font-size:2.5rem !important}.is-size-3-widescreen{font-size:2rem !important}.is-size-4-widescreen{font-size:1.5rem !important}.is-size-5-widescreen{font-size:1.25rem !important}.is-size-6-widescreen{font-size:1rem !important}.is-size-7-widescreen{font-size:.75rem !important}}@media screen and (min-width: 1408px){.is-size-1-fullhd{font-size:3rem !important}.is-size-2-fullhd{font-size:2.5rem !important}.is-size-3-fullhd{font-size:2rem !important}.is-size-4-fullhd{font-size:1.5rem !important}.is-size-5-fullhd{font-size:1.25rem !important}.is-size-6-fullhd{font-size:1rem !important}.is-size-7-fullhd{font-size:.75rem !important}}.has-text-centered{text-align:center !important}.has-text-justified{text-align:justify !important}.has-text-left{text-align:left !important}.has-text-right{text-align:right !important}@media screen and (max-width: 768px){.has-text-centered-mobile{text-align:center !important}}@media screen and (min-width: 769px), print{.has-text-centered-tablet{text-align:center !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-centered-tablet-only{text-align:center !important}}@media screen and (max-width: 1023px){.has-text-centered-touch{text-align:center !important}}@media screen and (min-width: 1024px){.has-text-centered-desktop{text-align:center !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-centered-desktop-only{text-align:center !important}}@media screen and (min-width: 1216px){.has-text-centered-widescreen{text-align:center !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-centered-widescreen-only{text-align:center !important}}@media screen and (min-width: 1408px){.has-text-centered-fullhd{text-align:center !important}}@media screen and (max-width: 768px){.has-text-justified-mobile{text-align:justify !important}}@media screen and (min-width: 769px), print{.has-text-justified-tablet{text-align:justify !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-justified-tablet-only{text-align:justify !important}}@media screen and (max-width: 1023px){.has-text-justified-touch{text-align:justify !important}}@media screen and (min-width: 1024px){.has-text-justified-desktop{text-align:justify !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-justified-desktop-only{text-align:justify !important}}@media screen and (min-width: 1216px){.has-text-justified-widescreen{text-align:justify !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-justified-widescreen-only{text-align:justify !important}}@media screen and (min-width: 1408px){.has-text-justified-fullhd{text-align:justify !important}}@media screen and (max-width: 768px){.has-text-left-mobile{text-align:left !important}}@media screen and (min-width: 769px), print{.has-text-left-tablet{text-align:left !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-left-tablet-only{text-align:left !important}}@media screen and (max-width: 1023px){.has-text-left-touch{text-align:left !important}}@media screen and (min-width: 1024px){.has-text-left-desktop{text-align:left !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-left-desktop-only{text-align:left !important}}@media screen and (min-width: 1216px){.has-text-left-widescreen{text-align:left !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-left-widescreen-only{text-align:left !important}}@media screen and (min-width: 1408px){.has-text-left-fullhd{text-align:left !important}}@media screen and (max-width: 768px){.has-text-right-mobile{text-align:right !important}}@media screen and (min-width: 769px), print{.has-text-right-tablet{text-align:right !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-right-tablet-only{text-align:right !important}}@media screen and (max-width: 1023px){.has-text-right-touch{text-align:right !important}}@media screen and (min-width: 1024px){.has-text-right-desktop{text-align:right !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-right-desktop-only{text-align:right !important}}@media screen and (min-width: 1216px){.has-text-right-widescreen{text-align:right !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-right-widescreen-only{text-align:right !important}}@media screen and (min-width: 1408px){.has-text-right-fullhd{text-align:right !important}}.is-capitalized{text-transform:capitalize !important}.is-lowercase{text-transform:lowercase !important}.is-uppercase{text-transform:uppercase !important}.is-italic{font-style:italic !important}.is-underlined{text-decoration:underline !important}.has-text-weight-light{font-weight:300 !important}.has-text-weight-normal{font-weight:400 !important}.has-text-weight-medium{font-weight:500 !important}.has-text-weight-semibold{font-weight:600 !important}.has-text-weight-bold{font-weight:700 !important}.is-family-primary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-secondary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-sans-serif{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-monospace{font-family:monospace !important}.is-family-code{font-family:monospace !important}.is-block{display:block !important}@media screen and (max-width: 768px){.is-block-mobile{display:block !important}}@media screen and (min-width: 769px), print{.is-block-tablet{display:block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-block-tablet-only{display:block !important}}@media screen and (max-width: 1023px){.is-block-touch{display:block !important}}@media screen and (min-width: 1024px){.is-block-desktop{display:block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-block-desktop-only{display:block !important}}@media screen and (min-width: 1216px){.is-block-widescreen{display:block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-block-widescreen-only{display:block !important}}@media screen and (min-width: 1408px){.is-block-fullhd{display:block !important}}.is-flex{display:flex !important}@media screen and (max-width: 768px){.is-flex-mobile{display:flex !important}}@media screen and (min-width: 769px), print{.is-flex-tablet{display:flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-flex-tablet-only{display:flex !important}}@media screen and (max-width: 1023px){.is-flex-touch{display:flex !important}}@media screen and (min-width: 1024px){.is-flex-desktop{display:flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-flex-desktop-only{display:flex !important}}@media screen and (min-width: 1216px){.is-flex-widescreen{display:flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-flex-widescreen-only{display:flex !important}}@media screen and (min-width: 1408px){.is-flex-fullhd{display:flex !important}}.is-inline{display:inline !important}@media screen and (max-width: 768px){.is-inline-mobile{display:inline !important}}@media screen and (min-width: 769px), print{.is-inline-tablet{display:inline !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-tablet-only{display:inline !important}}@media screen and (max-width: 1023px){.is-inline-touch{display:inline !important}}@media screen and (min-width: 1024px){.is-inline-desktop{display:inline !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-desktop-only{display:inline !important}}@media screen and (min-width: 1216px){.is-inline-widescreen{display:inline !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-widescreen-only{display:inline !important}}@media screen and (min-width: 1408px){.is-inline-fullhd{display:inline !important}}.is-inline-block{display:inline-block !important}@media screen and (max-width: 768px){.is-inline-block-mobile{display:inline-block !important}}@media screen and (min-width: 769px), print{.is-inline-block-tablet{display:inline-block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-block-tablet-only{display:inline-block !important}}@media screen and (max-width: 1023px){.is-inline-block-touch{display:inline-block !important}}@media screen and (min-width: 1024px){.is-inline-block-desktop{display:inline-block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-block-desktop-only{display:inline-block !important}}@media screen and (min-width: 1216px){.is-inline-block-widescreen{display:inline-block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-block-widescreen-only{display:inline-block !important}}@media screen and (min-width: 1408px){.is-inline-block-fullhd{display:inline-block !important}}.is-inline-flex{display:inline-flex !important}@media screen and (max-width: 768px){.is-inline-flex-mobile{display:inline-flex !important}}@media screen and (min-width: 769px), print{.is-inline-flex-tablet{display:inline-flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-flex-tablet-only{display:inline-flex !important}}@media screen and (max-width: 1023px){.is-inline-flex-touch{display:inline-flex !important}}@media screen and (min-width: 1024px){.is-inline-flex-desktop{display:inline-flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-flex-desktop-only{display:inline-flex !important}}@media screen and (min-width: 1216px){.is-inline-flex-widescreen{display:inline-flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-flex-widescreen-only{display:inline-flex !important}}@media screen and (min-width: 1408px){.is-inline-flex-fullhd{display:inline-flex !important}}.is-hidden{display:none !important}.is-sr-only{border:none !important;clip:rect(0, 0, 0, 0) !important;height:0.01em !important;overflow:hidden !important;padding:0 !important;position:absolute !important;white-space:nowrap !important;width:0.01em !important}@media screen and (max-width: 768px){.is-hidden-mobile{display:none !important}}@media screen and (min-width: 769px), print{.is-hidden-tablet{display:none !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-hidden-tablet-only{display:none !important}}@media screen and (max-width: 1023px){.is-hidden-touch{display:none !important}}@media screen and (min-width: 1024px){.is-hidden-desktop{display:none !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-hidden-desktop-only{display:none !important}}@media screen and (min-width: 1216px){.is-hidden-widescreen{display:none !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-hidden-widescreen-only{display:none !important}}@media screen and (min-width: 1408px){.is-hidden-fullhd{display:none !important}}.is-invisible{visibility:hidden !important}@media screen and (max-width: 768px){.is-invisible-mobile{visibility:hidden !important}}@media screen and (min-width: 769px), print{.is-invisible-tablet{visibility:hidden !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-invisible-tablet-only{visibility:hidden !important}}@media screen and (max-width: 1023px){.is-invisible-touch{visibility:hidden !important}}@media screen and (min-width: 1024px){.is-invisible-desktop{visibility:hidden !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-invisible-desktop-only{visibility:hidden !important}}@media screen and (min-width: 1216px){.is-invisible-widescreen{visibility:hidden !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-invisible-widescreen-only{visibility:hidden !important}}@media screen and (min-width: 1408px){.is-invisible-fullhd{visibility:hidden !important}}.hero{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar{background:none}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:#fff;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:rgba(10,10,10,0.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}@media screen and (max-width: 1023px){.hero.is-white .navbar-menu{background-color:#fff}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:rgba(10,10,10,0.7)}.hero.is-white a.navbar-item:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white .navbar-link:hover,.hero.is-white .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:0.9}.hero.is-white .tabs a:hover{opacity:1}.hero.is-white .tabs li.is-active a{color:#fff !important;opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold{background-image:linear-gradient(141deg, #e6e6e6 0%, #fff 71%, #fff 100%)}@media screen and (max-width: 768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg, #e6e6e6 0%, #fff 71%, #fff 100%)}}.hero.is-black{background-color:#0a0a0a;color:#fff}.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong{color:inherit}.hero.is-black .title{color:#fff}.hero.is-black .subtitle{color:rgba(255,255,255,0.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-black a.navbar-item:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black .navbar-link:hover,.hero.is-black .navbar-link.is-active{background-color:#000;color:#fff}.hero.is-black .tabs a{color:#fff;opacity:0.9}.hero.is-black .tabs a:hover{opacity:1}.hero.is-black .tabs li.is-active a{color:#0a0a0a !important;opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:#fff}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg, #000 0%, #0a0a0a 71%, #181616 100%)}@media screen and (max-width: 768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg, #000 0%, #0a0a0a 71%, #181616 100%)}}.hero.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong{color:inherit}.hero.is-light .title{color:rgba(0,0,0,0.7)}.hero.is-light .subtitle{color:rgba(0,0,0,0.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-light .navbar-menu{background-color:#d2f9d6}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-light a.navbar-item:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light .navbar-link:hover,.hero.is-light .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.hero.is-light .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-light .tabs a:hover{opacity:1}.hero.is-light .tabs li.is-active a{color:#d2f9d6 !important;opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#d2f9d6}.hero.is-light.is-bold{background-image:linear-gradient(141deg, #a6f8a0 0%, #d2f9d6 71%, #e8fded 100%)}@media screen and (max-width: 768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg, #a6f8a0 0%, #d2f9d6 71%, #e8fded 100%)}}.hero.is-dark{background-color:#459558;color:#fff}.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#fff}.hero.is-dark .subtitle{color:rgba(255,255,255,0.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-dark .navbar-menu{background-color:#459558}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-dark a.navbar-item:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark .navbar-link.is-active{background-color:#3d844e;color:#fff}.hero.is-dark .tabs a{color:#fff;opacity:0.9}.hero.is-dark .tabs a:hover{opacity:1}.hero.is-dark .tabs li.is-active a{color:#459558 !important;opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#fff}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#459558}.hero.is-dark.is-bold{background-image:linear-gradient(141deg, #2d7a32 0%, #459558 71%, #47ad70 100%)}@media screen and (max-width: 768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg, #2d7a32 0%, #459558 71%, #47ad70 100%)}}.hero.is-primary{background-color:#55be6f;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:rgba(255,255,255,0.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-primary .navbar-menu{background-color:#55be6f}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-primary a.navbar-item:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary .navbar-link.is-active{background-color:#45b461;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:0.9}.hero.is-primary .tabs a:hover{opacity:1}.hero.is-primary .tabs li.is-active a{color:#55be6f !important;opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#55be6f}.hero.is-primary.is-bold{background-image:linear-gradient(141deg, #33ad3d 0%, #55be6f 71%, #62ca8d 100%)}@media screen and (max-width: 768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg, #33ad3d 0%, #55be6f 71%, #62ca8d 100%)}}.hero.is-link{background-color:#4876ff;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:rgba(255,255,255,0.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-link .navbar-menu{background-color:#4876ff}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-link a.navbar-item:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link .navbar-link:hover,.hero.is-link .navbar-link.is-active{background-color:#2f63ff;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:0.9}.hero.is-link .tabs a:hover{opacity:1}.hero.is-link .tabs li.is-active a{color:#4876ff !important;opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#4876ff}.hero.is-link.is-bold{background-image:linear-gradient(141deg, #1577ff 0%, #4876ff 71%, #626fff 100%)}@media screen and (max-width: 768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg, #1577ff 0%, #4876ff 71%, #626fff 100%)}}.hero.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong{color:inherit}.hero.is-info .title{color:rgba(0,0,0,0.7)}.hero.is-info .subtitle{color:rgba(0,0,0,0.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-info .navbar-menu{background-color:#f0f8ff}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-info a.navbar-item:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info .navbar-link:hover,.hero.is-info .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.hero.is-info .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-info .tabs a:hover{opacity:1}.hero.is-info .tabs li.is-active a{color:#f0f8ff !important;opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#f0f8ff}.hero.is-info.is-bold{background-image:linear-gradient(141deg, #bdebff 0%, #f0f8ff 71%, #fff 100%)}@media screen and (max-width: 768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg, #bdebff 0%, #f0f8ff 71%, #fff 100%)}}.hero.is-success{background-color:#48c78e;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:rgba(255,255,255,0.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-success .navbar-menu{background-color:#48c78e}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-success a.navbar-item:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success .navbar-link:hover,.hero.is-success .navbar-link.is-active{background-color:#3abb81;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:0.9}.hero.is-success .tabs a:hover{opacity:1}.hero.is-success .tabs li.is-active a{color:#48c78e !important;opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#48c78e}.hero.is-success.is-bold{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}@media screen and (max-width: 768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}}.hero.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0,0,0,0.7)}.hero.is-warning .subtitle{color:rgba(0,0,0,0.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-warning .navbar-menu{background-color:#ffd975}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-warning a.navbar-item:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.hero.is-warning .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-warning .tabs a:hover{opacity:1}.hero.is-warning .tabs li.is-active a{color:#ffd975 !important;opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#ffd975}.hero.is-warning.is-bold{background-image:linear-gradient(141deg, #ffab42 0%, #ffd975 71%, #fff38f 100%)}@media screen and (max-width: 768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg, #ffab42 0%, #ffd975 71%, #fff38f 100%)}}.hero.is-danger{background-color:#f14668;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:rgba(255,255,255,0.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-danger .navbar-menu{background-color:#f14668}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-danger a.navbar-item:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger .navbar-link.is-active{background-color:#ef2e55;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:0.9}.hero.is-danger .tabs a:hover{opacity:1}.hero.is-danger .tabs li.is-active a{color:#f14668 !important;opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#f14668}.hero.is-danger.is-bold{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}@media screen and (max-width: 768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}}.hero.is-small .hero-body{padding:1.5rem}@media screen and (min-width: 769px), print{.hero.is-medium .hero-body{padding:9rem 4.5rem}}@media screen and (min-width: 769px), print{.hero.is-large .hero-body{padding:18rem 6rem}}.hero.is-halfheight .hero-body,.hero.is-fullheight .hero-body,.hero.is-fullheight-with-navbar .hero-body{align-items:center;display:flex}.hero.is-halfheight .hero-body>.container,.hero.is-fullheight .hero-body>.container,.hero.is-fullheight-with-navbar .hero-body>.container{flex-grow:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%, -50%, 0)}.hero-video.is-transparent{opacity:0.3}@media screen and (max-width: 768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}@media screen and (max-width: 768px){.hero-buttons .button{display:flex}.hero-buttons .button:not(:last-child){margin-bottom:0.75rem}}@media screen and (min-width: 769px), print{.hero-buttons{display:flex;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-head,.hero-foot{flex-grow:0;flex-shrink:0}.hero-body{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}@media screen and (min-width: 769px), print{.hero-body{padding:3rem 3rem}}.section{padding:3rem 1.5rem}@media screen and (min-width: 1024px){.section{padding:3rem 3rem}.section.is-medium{padding:9rem 4.5rem}.section.is-large{padding:18rem 6rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}:host{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif;color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5;box-sizing:border-box;overflow:hidden}\n',""]),e.exports=t},459:function(e,t,i){"use strict";i.r(t),i.d(t,"ArchiveWebApp",(function(){return Ct})),i.d(t,"Loader",(function(){return Ne})),i.d(t,"Embed",(function(){return lt}));var a=i(0),r=i(58),o=i(7),n=i(16);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s=Object(n.c)(class extends n.a{constructor(e){var t;if(super(e),e.type!==n.b.ATTRIBUTE||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const a=e[i];return null==a?t:t+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ut){this.ut=new Set;for(const e in t)this.ut.add(e);return this.render(t)}this.ut.forEach(e=>{null==t[e]&&(this.ut.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const a=t[e];null!=a&&(this.ut.add(e),e.includes("-")?i.setProperty(e,a):i[e]=a)}return o.b}});var l=i(228),c=i.n(l),d=i(184),u=i.n(d);const h=Object(a.d)(c.a);function f(e){return[h,e]}const b=window.IS_APP||window.electron&&window.electron.IS_APP||window.matchMedia("(display-mode: standalone)").matches;function p(e){" "==e.key&&(e.preventDefault(),e.target.click())}class m extends a.a{constructor(){super(),this.size="1.1em",this.width=null,this.height=null}static get properties(){return{svg:{type:String},size:{type:String},width:{type:String},height:{type:String}}}static get styles(){return a.b`
    :host {
      display: inline-block;
      padding: 0;
      margin: 0;
      line-height: 1.0em;
    }
    :host svg {
      fill: var(--fa-icon-fill-color, currentcolor);
      width: var(--fa-icon-width, 19px);
      height: var(--fa-icon-height, 19px);
    }
    `}render(){if(!this.svg)return a.c``;const e={};return this.size?(e.width=this.size,e.height=this.size):(this.width&&(e.width=this.width),this.height&&(e.height=this.height)),a.c`<svg style="${s(e)}"><g>${Object(r.a)(this.svg)}</g></svg>`}}class g extends a.a{constructor(){super(),this.title="",this.bgClass=""}static get properties(){return{title:{type:String},bgClass:{type:String}}}static get styles(){return f(a.b`
    .modal-background {
      background-color: rgba(10, 10, 10, 0.50);
    }

    .modal-card-head {
      background-color: var(--background, #97a1ff);
    }

    .modal-card {
      width: 100%;
      max-width: var(--modal-width, 640px)
    }
    `)}render(){return a.c`
    <div class="modal is-active">
      <div class="modal-background" @click="${this.onClose}"></div>
      <div class="modal-card">
        <header class="modal-card-head ${this.bgClass}">
          <p class="modal-card-title is-3">${this.title}</p>
          <button class="delete" aria-label="close" @click="${this.onClose}"></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
      </div>
    </div>`}onClose(){this.dispatchEvent(new CustomEvent("modal-closed"))}}customElements.define("fa-icon",m),customElements.define("wr-anim-logo",class extends m{constructor(){super(),this.svg=u.a}static get styles(){return a.b`
    #wrlogo #stop5687 {
      animation: animLeft 7s linear infinite;
    }

    #wrlogo #stop5689 {
      animation: animRight 7s linear infinite;
    }

    @keyframes animLeft {
      0% {stop-color: #4876ff}
      25% {stop-color: #1b0921}
      50% {stop-color: #4876ff}
      75% {stop-color: #04cdff}
      100% {stop-color: #4876ff}
    }

    @keyframes animRight {
      0% {stop-color: #04cdff}
      25% {stop-color: #4876ff}
      50% {stop-color: #1b0921}
      75% {stop-color: #4876ff}
      100% {stop-color: #04cdff}
    }
    `}}),customElements.define("wr-modal",g);var v;function w(e,t){void 0===t&&(t={});var i=t.registrationOptions;void 0===i&&(i={}),delete t.registrationOptions;var a=function(e){for(var i=[],a=arguments.length-1;a-- >0;)i[a]=arguments[a+1];t&&t[e]&&t[e].apply(t,i)};"serviceWorker"in navigator&&v.then((function(){Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))?(!function(e,t,i){fetch(e).then((function(a){404===a.status?(t("error",new Error("Service worker not found at "+e)),y()):-1===a.headers.get("content-type").indexOf("javascript")?(t("error",new Error("Expected "+e+" to have javascript content-type, but received "+a.headers.get("content-type"))),y()):k(e,t,i)})).catch((function(e){return x(t,e)}))}(e,a,i),navigator.serviceWorker.ready.then((function(e){a("ready",e)})).catch((function(e){return x(a,e)}))):(k(e,a,i),navigator.serviceWorker.ready.then((function(e){a("ready",e)})).catch((function(e){return x(a,e)})))}))}function x(e,t){navigator.onLine||e("offline"),e("error",t)}function k(e,t,i){navigator.serviceWorker.register(e,i).then((function(e){t("registered",e),e.waiting?t("updated",e):e.onupdatefound=function(){t("updatefound",e);var i=e.installing;i.onstatechange=function(){"installed"===i.state&&(navigator.serviceWorker.controller?t("updated",e):t("cached",e))}}})).catch((function(e){return x(t,e)}))}function y(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){return x(emit,e)}))}function D(e="sw.js",t="./"){let i,a;const r=new Promise((e,t)=>{i=e,a=t});if(!navigator.serviceWorker){const e="Sorry, ReplayWeb.page won't work in this browser as Service Workers are not supported.\nPlease try a different browser.\n(Service Workers are disabled in Firefox in Private Mode. If Using Private Mode in Firefox, try regular mode)";console.error(e),a(e)}return w(t+e,{registrationOptions:{scope:t},registered(){console.log("Service worker is registered"),i()},error(e){console.error("Error during service worker registration:",e),a("ReplayWeb.page could not be loaded due to the following error:\n"+e.toString())}}),r}"undefined"!=typeof window&&(v="undefined"!=typeof Promise?new Promise((function(e){return window.addEventListener("load",e)})):{then:function(e){return window.addEventListener("load",e)}});function $(e){let t=null;try{t=new Date(e.ts||e.date)}catch(e){}const i=t&&!isNaN(t)?S(t.toISOString()):"";return{date:t,timestamp:i}}function S(e){return e.replace(/[-:T]/g,"").slice(0,14)}function C(e,t,i){const a=new URLSearchParams;return a.set("view",e),a.set("url",t),a.set("ts",i),"#"+a.toString()}async function A(e){return{url:e,coll:"id-"+(await async function(e,t){const i=(new TextEncoder).encode(e),a=await crypto.subtle.digest(t,i);return Array.from(new Uint8Array(a)).map(e=>e.toString(16).padStart(2,"0")).join("")}(e,"SHA-256")).slice(0,12)}}var z=i(115),E=i.n(z),F=i(108),_=i.n(F),B=i(109),I=i.n(B);class L extends a.a{constructor(e="sw.js"){super(),this.sourceUrl=null,this.collTitle=null,this.showAbout=!1,this.pageParams=new URLSearchParams,this.inited=!1,this.navMenuShown=!1,this.collPageUrl="",this.pageTitle="",this.pageReplay=!1,this.loadInfo=null,e&&D(e),this.safariKeyframes()}get appName(){return"ReplayWeb.page"}get homeUrl(){return window.location.pathname}static get properties(){return{inited:{type:Boolean},pageParams:{type:Object},sourceUrl:{type:String},navMenuShown:{type:Boolean},showAbout:{type:Boolean},collTitle:{type:String},loadInfo:{type:Object},embed:{type:String},collPageUrl:{type:String},pageTitle:{type:String},pageReplay:{type:Boolean},source:{type:String}}}static get styles(){return f(L.appStyles)}static get appStyles(){return a.b`
    #wrlogo {
      max-height: 1.0rem;
    }
    .navbar {
      height: 1.5rem;
    }
    .navbar-brand {
      height: 1.5rem;
      display: flex;
      align-items: center;
    }
    .wr-logo-item {
      padding: 0 8px 0 0;
    }
    .no-wrap {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    .has-allcaps {
      font-variant-caps: small-caps;
    }
    :host {
      position: fixed;
      left: 0px;
      top: 0px;
      bottom: 0px;
      right: 0px;
      display: flex;
      min-width: 0px;
      flex-direction: column;
    }
    wr-coll {
      height: 100%;
    }
    .navbar {
      padding: 0 0.5em;
    }

    div.navbar-menu fa-icon {
      vertical-align: sub;
    }
    .tagline {
      margin-top: 1.0rem;
    }

    @media screen and (min-width: 840px) {
      .menu-only {
        display: none;
      }

      a.arrow-button {
        padding-left: 4px;
        padding-right: 4px;
      }

      .info-menu {
        padding: 0 1.0em;
      }

      .logo-text {
        padding-left: 0px;
        margin-left: 6px;
      }

      a.navbar-item.logo-text:hover {
        background-color: initial;
      }
    }

    @media screen and (max-width: 840px) {
      .wide-only {
        display: none !important;
      }
    }

    `}get mainLogo(){return u.a}renderNavBrand(){return a.c`
      <span id="home" class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only">
      <span class="has-text-primary">replay</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`}renderNavBar(){return a.c`
    <a href="#skip-main-target" @click=${this.skipMenu} class="skip-link">Skip main navigation</a>
    <nav class="navbar has-background-info" aria-label="main">
      <div class="navbar-brand">
        ${this.embed?a.c`
          <span class="navbar-item wr-logo-item">
            <fa-icon id="wrlogo" size="1.0rem" .svg=${this.mainLogo} aria-hidden="true"></fa-icon>
          </span>
        `:a.c`
          <a href="${this.homeUrl}" class="navbar-item wr-logo-item" aria-labelledby="home">
            <fa-icon id="wrlogo" size="1.0rem" .svg=${this.mainLogo} aria-hidden="true"></fa-icon>
            ${this.renderNavBrand()}
          </a>
          ${this.collTitle?a.c`
          <a href="${this.collPageUrl}" class="no-wrap is-size-6 has-text-black">/&nbsp;&nbsp;<i>${this.collTitle}</i></a>
          <span class="no-wrap is-size-6">&nbsp;&nbsp;/&nbsp;
          ${this.pageReplay?a.c`<i>${this.pageTitle}</i>`:this.pageTitle}
          </span>
          `:""}
          `}
        <a href="#" role="button" id="menu-button" @click="${this.onNavMenu}" @keyup="${p}"
          class="navbar-burger burger ${this.navMenuShown?"is-active":""}" aria-label="main menu" aria-haspopup="true" aria-expanded="${this.navMenuShown}">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      ${this.sourceUrl?a.c``:a.c`
      <div class="navbar-menu ${this.navMenuShown?"is-active":""}">
        <div class="navbar-start">
          ${b?a.c`
            <a role="button" href="#" class="navbar-item arrow-button" title="Go Back" @click="${()=>window.history.back()}" @keyup="${p}">
              <fa-icon size="1.0rem" .svg="${_.a}" aria-hidden="true"></fa-icon><span class="menu-only is-size-7">&nbsp;Go Back</span>
            </a>
            <a role="button" href="#" class="navbar-item arrow-button" title="Go Forward" @click="${()=>window.history.forward()}" @keyup="${p}">
              <fa-icon size="1.0rem" .svg="${I.a}" aria-hidden="true"></fa-icon><span class="menu-only is-size-7">&nbsp;Go Forward</span>
            </a>
          `:""}
        </div>
        ${this.embed?a.c``:a.c`
        <div class="navbar-end">
          ${this.renderNavEnd()}
        </div>`}
      </div>`}
    </nav>
    <p id="skip-main-target" tabindex="-1" class="is-sr-only">Skipped</p>`}renderNavEnd(){return a.c`
      <a href="/docs" target="_blank" class="navbar-item is-size-6">
      <fa-icon .svg="${E.a}" aria-hidden="true"></fa-icon><span>&nbsp;User Docs</span>
    </a>
    <!--
    -- NB: the About modal is currently inaccessible to people using keyboards or screen readers.
    --  Should all the JS and infrastructure for accessible modals be added, or should About be a normal page?
    -->
    <a href="?terms" @click="${e=>{e.preventDefault(),this.showAbout=!0}}"class="navbar-item is-size-6">About
    </a>`}renderColl(){return a.c`
    <wr-coll .loadInfo="${this.loadInfo}"
    sourceUrl="${this.sourceUrl}"
    embed="${this.embed}"
    appName="${this.appName}"
    .appLogo="${this.mainLogo}"
    @replay-favicons=${this.onFavIcons}
    @update-title=${this.onTitle}
    @coll-loaded=${this.onCollLoaded}
    @about-show=${()=>this.showAbout=!0}></wr-coll>`}renderHomeIndex(){return a.c`
      <wr-coll-index>
      ${b?"":a.c`
      <p slot="header" class="tagline is-size-5 has-text-centered">Explore and Replay Interactive Archived Webpages Directly in your Browser. <i><a target="_blank" href="./docs/examples">(See Examples)</a></i></p>
      `}
      <wr-chooser slot="header" @load-start=${this.onStartLoad}></wr-chooser>
    </wr-coll-index>`}render(){return this.inited?a.c`
      ${this.embed&&"full"!==this.embed?"":this.renderNavBar()}

      ${this.sourceUrl?this.renderColl():this.renderHomeIndex()}

      ${this.showAbout?this.renderAbout():""}
    `:a.c``}firstUpdated(){this.initRoute(),window.addEventListener("popstate",()=>{this.initRoute()})}updated(e){e.has("sourceUrl")&&(this.collTitle=null)}onFavIcons(e){const t=document.querySelector("head"),i=document.querySelectorAll("link[rel*='icon']");for(const e of i)t.removeChild(e);for(const i of e.detail.icons){const e=document.createElement("link");e.rel=i.rel,e.href=i.href,t.appendChild(e)}}skipMenu(e){e.preventDefault(),this.renderRoot.querySelector("#skip-main-target").focus()}onNavMenu(e){e.preventDefault(),e.stopPropagation(),this.navMenuShown=!this.navMenuShown,this.navMenuShown&&(document.addEventListener("click",e=>{e.preventDefault(),this.navMenuShown=!1,this.renderRoot.querySelector("#menu-button").focus()},{once:!0}),document.addEventListener("keypress",e=>{"Escape"==e.key&&(e.preventDefault(),this.navMenuShown=!1,this.renderRoot.querySelector("#menu-button").focus())},{once:!0}))}initRoute(){this.inited=!0,this.pageParams=new URLSearchParams(window.location.search);let e=this.pageParams.get("state");if(e)try{if(e=JSON.parse(e),e.ids instanceof Array&&e.userId&&"open"===e.action)return this.pageParams.set("source","googledrive://"+e.ids[0]),this.pageParams.delete("state"),void(window.location.search=this.pageParams.toString())}catch(e){console.log(e)}if(this.source){this.pageParams.set("source",this.source);const e=new URL(window.location.href);e.search=this.pageParams.toString(),window.history.replaceState({},document.title,e.href)}if(this.sourceUrl=this.pageParams.get("source")||"",this.embed=this.pageParams.get("embed")||"",this.pageParams.has("terms")&&(this.showAbout=!0),this.pageParams.get("config")){this.loadInfo||(this.loadInfo={});try{this.loadInfo.extraConfig=JSON.parse(this.pageParams.get("config"))}catch(e){console.log("invalid config: "+e)}}if(this.pageParams.get("basePageUrl")&&(this.loadInfo||(this.loadInfo={extraConfig:{}}),this.loadInfo.extraConfig||(this.loadInfo.extraConfig={}),this.loadInfo.extraConfig.baseUrl=this.pageParams.get("basePageUrl")),this.pageParams.get("customColl")&&(this.loadInfo||(this.loadInfo={}),this.loadInfo.customColl=this.pageParams.get("customColl")),b&&this.sourceUrl.startsWith("file://")){const e=new URL("http://files.archiveweb.page/");e.searchParams.set("filename",this.sourceUrl.slice("file://".length)),this.loadInfo={sourceUrl:this.sourceUrl,loadUrl:e.href}}}onStartLoad(e){this.pageParams.set("source",e.detail.sourceUrl);const t=new URL(window.location.href);t.search=this.pageParams.toString(),this.collPageUrl=t.toString(),e.detail.isFile?(window.history.pushState({},"",this.collPageUrl),this.sourceUrl=e.detail.sourceUrl,this.loadInfo=e.detail):window.location.search=this.pageParams.toString()}onCollLoaded(e){this.loadInfo=null,e.detail.collInfo&&(this.collTitle=e.detail.collInfo.title),e.detail.alreadyLoaded||e.detail.sourceUrl!==this.sourceUrl&&(this.pageParams.set("source",e.detail.sourceUrl),window.location.search=this.pageParams.toString())}onTitle(e){e.detail.title&&(this.pageTitle=e.detail.title,this.pageReplay=e.detail.replayTitle,document.title=(e.detail.replayTitle?"Archive of ":"")+this.pageTitle+" | "+this.appName)}safariKeyframes(){const e=document.createElement("style");document.head.appendChild(e),e.appendChild(document.createTextNode("\n    @keyframes spinAround {\n      from {\n        transform: rotate(0deg);\n      }\n      to {\n        transform: rotate(359deg);\n      }\n    }\n    "))}renderAbout(){return a.c`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ReplayWeb.page ${b?"App":""}</p>
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div style="display: flex">
                    <div class="has-text-centered" style="width: 220px">
                      <wr-anim-logo class="logo" size="48px"></wr-anim-logo>
                      <div style="font-size: smaller; margin-bottom: 1em">${b?"App":""} v${"0.7.3"}</div>
                    </div>

                    ${b?a.c`
                    <p>ReplayWeb.page App is a standalone app for Mac, Windows and Linux that loads web archive files provided by the user
                    and renders them for replay.</p>

                    `:a.c`
                    <p><a href="https://replayweb.page" target="_blank">ReplayWeb.page</a> is a browser-based viewer that loads web archive files provided by the user
                    and renders them for replay in the browser.</p>`}
                  </div>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/replayweb.page" target="_blank">https://github.com/webrecorder/replayweb.page</a>
                  </p>

                  <p>See the <a target="_blank" href="./docs">User Docs</a> or the GitHub README for more info on how it works.</p>

                  <p>ReplayWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>

                  <h3>Privacy</h3>
                  <p><b>No data is uploaded anywhere and no information is collected.</b></p>
                  <p>All content rendered stays directly in your browser.<br/>When loading an archive from Google Drive,
                  the site may ask for account authorization to download the specified file only.</p>

                  <h4>Disclaimer of Warranties</h4>
                  <p>The application is provided "as is" without any guarantees.</p>
                  <details>
                    <summary>Legalese:</summary>
                    <p style="font-size: 0.8rem">DISCLAIMER OF SOFTWARE WARRANTY. WEBRECORDER SOFTWARE PROVIDES THIS SOFTWARE TO YOU "AS AVAILABLE"
                    AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR OTHERWISE,
                    INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                  </details>
                  <div class="has-text-centered">
                    <a class="button is-warning" href="#" @click="${this.onAboutClose}">Close</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>`}onAboutClose(){this.showAbout=!1}}customElements.define("replay-app-main",L);var T=i(59),P=i.n(T);class R extends a.a{constructor(){super(),this.fileDisplayName="",this.file=null,this.hasNativeFS=!!window.showOpenFilePicker&&!b,this.newFullImport=!1,this.noHead=!1}static get properties(){return{fileDisplayName:{type:String},newFullImport:{type:Boolean},noHead:{type:Boolean}}}onChooseFile(e){0!==e.currentTarget.files.length&&(this.file=e.currentTarget.files[0],this.fileDisplayName="file://"+(this.file.path||this.file.name))}async onChooseNativeFile(){if(!this.hasNativeFS)return;const[e]=await window.showOpenFilePicker({types:[{description:"WARC, WACZ, HAR and WBN Files",accept:{"application/warc":[".warc",".gz"],"application/har":[".har"],"application/wacz":[".wacz"],"application/wbn":[".wbn"],"application/json":[".json"]}}]});this.fileHandle=e,this.file=await e.getFile(),this.fileDisplayName="file://"+e.name}randomId(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}onStartLoad(e){e.preventDefault();const t={sourceUrl:this.fileDisplayName};if(this.file){if(t.isFile=!0,this.file.path){const e=new URL("http://files.archiveweb.page/");e.searchParams.set("filename",this.file.path),t.loadUrl=e.href,t.noCache=!0}else this.fileHandle?(t.loadUrl=this.fileDisplayName,t.extra={fileHandle:this.fileHandle},t.noCache=!1):(t.loadUrl=URL.createObjectURL(this.file),t.blob=this.file,t.noCache=!1);t.size=this.file.size,t.name=this.fileDisplayName}return t.newFullImport=this.newFullImport,this.dispatchEvent(new CustomEvent("load-start",{bubbles:!0,composed:!0,detail:t})),!1}onInput(e){this.fileDisplayName=e.currentTarget.value,this.file&&this.fileDisplayName&&this.fileDisplayName.startsWith("file://")&&(this.file=null,this.fileDisplayName="")}static get styles(){return f(a.b`
    :host {
      min-width: 0;
    }
    .extra-padding {
      padding: 1.5em;
    }
    .less-padding {
      padding-top: 1.0em;
      padding-bottom: 1.0em;
    }
    div.field.has-addons {
      flex: auto;
    }
    .panel-heading {
      background-color: #cff3ff;
    }
    .message-header {
      background-color: #cff3ff;
      color: black;
    }
    .heading-size {
      font-size: 0.85rem;
    }
    form {
      flex-grow: 1;
      flex-shrink: 0;
      margin-bottom: 0;
    }
    p.control.is-expanded {
      width: min-content;
    }
    input.input.file-name:invalid {
      border: 1px dashed red;
    }
    input.input.file-name {
      border-width: 1px;
      margin-left: -1px;
      max-width: 100%;
    }
    @media screen and (max-width: 1023px) {
      .file-icon {
        margin-right: 0px;
      }
    }

    @media screen and (max-width: 768px) {
      #filename {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
  `)}render(){return a.c`
    <section class="section ${this.noHead?"is-paddingless":"less-padding"}">
      <div class="${this.noHead?"":"panel"}">
        <div class="${this.noHead?"is-hidden":"panel-heading"} heading-size">${this.newFullImport?"Import Existing":"Load"} Web Archive</div>
        <div class="${this.noHead?"":"panel-body extra-padding"} file has-name">
          <form class="is-flex" @submit="${this.onStartLoad}">
            <label class="file-label">
              ${this.hasNativeFS?"":a.c`
              <input class="file-input"
                @click="${e=>e.currentTarget.value=null}"
                @change=${this.onChooseFile} type="file" id="fileupload" name="fileupload">`}
              <span class="file-cta" @click="${this.onChooseNativeFile}">
                <span class="file-icon">
                  <fa-icon size="0.9em" .svg=${P.a} aria-hidden="true"></fa-icon>
                </span>
                <span class="file-label is-hidden-touch">
                  Choose File...
                </span>
              </span>
            </label>

            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="file-name input" type="text"
                name="filename" id="filename"
                pattern="((file|http|https|ipfs|s3):\/\/.*\.(warc|warc.gz|zip|wacz|har|wbn|json))|(googledrive:\/\/.+)"
                .value="${this.fileDisplayName}"
                @input="${this.onInput}"
                autocomplete="off"
                placeholder="${this.newFullImport?"Click 'Choose File' to select a local archive to import":"Enter a URL or click 'Choose File' to select a WARC, WACZ, HAR or WBN archive source"}">
              </p>
              <div class="control">
                <button type="submit" class="button is-hidden-mobile is-primary">${this.newFullImport?"Import":"Load"}</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>`}}customElements.define("wr-chooser",R);var U=i(15),M=i.n(U),j=i(116),N=i.n(j),O=i(229),H=i.n(O),q=i(230),G=i.n(q),W=i(60),K=i.n(W);class V extends a.a{constructor(){super(),this.colls=[],this.filteredColls=[],this.sortedColls=null,this.query="",this.hideHeader="1"===localStorage.getItem("index:hideHeader"),this._deleting={},this.dateName="Date Loaded",this.headerName="Loaded Archives",this.typeFilter="",this.indexParams=""}get sortKeys(){return[{key:"title",name:"Title"},{key:"sourceUrl",name:"Source"},{key:"ctime",name:this.dateName},{key:"size",name:"Total Size"}]}static get properties(){return{colls:{type:Array},query:{type:String},filteredColls:{type:Array},sortedColls:{type:Array},hideHeader:{type:Boolean},_deleting:{type:Object},dateName:{type:String},headerName:{type:String}}}firstUpdated(){this.loadColls()}updated(e){e.has("hideHeader")&&localStorage.setItem("index:hideHeader",this.hideHeader?"1":"0"),(e.has("colls")||e.has("query"))&&this.filter()}filter(){if(this.query){this.filteredColls=[];for(const e of this.colls)(e.sourceUrl.indexOf(this.query)>=0||e.filename.indexOf(this.query)>=0||e.loadUrl&&e.loadUrl.indexOf(this.query)>=0||e.title&&e.title.indexOf(this.query)>=0)&&this.filteredColls.push(e)}else this.filteredColls=this.colls}async loadColls(){const e=await fetch("./w/api/coll-index?"+this.indexParams);try{if(200!==e.status)throw new Error("Invalid API Response, Retry");const t=await e.json();this.colls=t.colls.map(e=>(e.title=e.title||e.filename,e)),this._deleting={},this.sortedColls=[]}catch(e){setTimeout(()=>this.loadColls(),500)}}async onDeleteColl(e){if(e.preventDefault(),e.stopPropagation(),!this.sortedColls)return;const t=Number(e.currentTarget.getAttribute("data-coll-index")),i=this.sortedColls[t];if(!i||this._deleting[i.sourceUrl])return;this._deleting[i.sourceUrl]=!0,this.requestUpdate();const a=await fetch("./w/api/c/"+i.id,{method:"DELETE"});if(200===a.status){const e=await a.json();this.colls=e.colls}return!1}static get styles(){return f(V.compStyles)}static get compStyles(){return a.b`
    :host {
      overflow-y: auto;
      min-width: 0;
    }
    .size {
      margin-right: 20px;
    }
    .extra-padding {
      padding: 2em;
    }
    .no-top-padding {
      padding-top: 1.0em;
    }
    .panel-heading {
      font-size: 0.85rem;
    }
    .is-loading {
      line-height: 1.5em;
      height: 1.5em;
      border: 0px;
      background-color: transparent !important;
      width: auto;
    }
    div.panel.is-light {
      margin-bottom: 2em;
    }

    fa-icon {
      vertical-align: middle;
    }

    .panel-color {
      background-color: rgb(210, 249, 214);
    }

    .copy {
      color: black;
      margin: 0px;
      margin: 0;
      line-height: 0.4em;
      padding: 6px;
      border-radius: 10px;
      display: none;
      position: absolute;
    }
    .copy:active {
      background-color: lightgray;
    }
    .sort-header {
      padding: 0.3rem 0.3rem 0.3rem 0;
      display: flex;
      flex-direction: row;
      flex-flow: row wrap;
    }
    .sort-header .control {
      flex: auto;

      padding-left: 0.3rem;
      width: initial;
    }
    wr-sorter {
      padding: 0.3rem;
    }
    a.button.is-small.collapse {
      border-radius: 6px;
    }
    .icon.is-left {
      margin-left: 0.5rem;
    }
    .coll-block {
      position: relative;
    }
    .delete-button {
      width: 32px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    #sort-select::after {
      display: none;
    }
    header {
      transform: translate(0px, 0px);
      transition: all 0.5s ease 0s;
      visibility: visible;
      display: flex;
      flex-direction: column;
    }
    header.closed {
      transform: translate(0, -100%);
      transition: all 0.5s ease 0s;
      visibility: visible;
      height: 269px;
      margin-top: -269px;
    }
    `}renderHeader(){return a.c`<h2 class="panel-heading panel-color"><span>${this.headerName}</span></h2>`}renderSearchHeader(){return""}render(){const e=this.childElementCount>0;return a.c`
    <header class="${this.hideHeader?"closed":""}">
      <slot name="header"></slot>
    </header>
    <section class="section no-top-padding">
      <div class="sort-header is-small">
        ${e?a.c`
        <button @click=${()=>this.hideHeader=!this.hideHeader} class="collapse button is-small">
          <span class="icon"><fa-icon .svg=${this.hideHeader?G.a:H.a}></span>
          <span>${this.hideHeader?"Show ":"Hide"} <span class="is-sr-only">Header</span></span>
        </button>`:""}
      </div>
      <div class="panel">
        ${this.renderHeader()}
        ${this.colls.length?a.c`
        <div class="panel-block sort-header is-small">
        ${this.renderSearchHeader()}
          <div class="control has-icons-left has-addons">
            <input type="text" class="input is-small" @input="${e=>this.query=e.currentTarget.value}" .value="${this.query}" type="text"
            placeholder="Search by Archive Title or Source">
            <span class="icon is-left is-small"><fa-icon .svg="${K.a}"/></span>
          </div>
          <wr-sorter id="index"
          sortKey="ctime"
          ?sortDesc="${!0}"
          .sortKeys="${this.sortKeys}"
          .data="${this.filteredColls}"
          @sort-changed="${e=>this.sortedColls=e.detail.sortedData}">
          </wr-sorter>
        </div>

        <div class="coll-list">
          ${this.sortedColls&&this.sortedColls.map((e,t)=>a.c`
            <div class="coll-block panel-block">
              ${this.renderCollInfo(e)}
              ${this._deleting[e.sourceUrl]?a.c`
              <span class="button delete-button is-loading is-static">Deleting</span`:a.c`
              <button class="delete delete-button" aria-label="Unload Collection" title="Unload Collection" data-coll-index="${t}" @click="${this.onDeleteColl}"></button>
              `}
            </div>
          `)}
        </div>

        `:a.c`

        <div class="panel-block extra-padding">
        ${null===this.sortedColls?a.c`<i>Loading Archives...</i>`:this.renderEmpty()}
        </div>
        `}
      </div>
    </section>
    `}renderCollInfo(e){return a.c`<wr-coll-info .coll=${e}></wr-coll-info>`}renderEmpty(){return a.c`<i>No Archives so far! Archives loaded in the section above will appear here.</i>`}}class Z extends a.a{constructor(){super(),this.detailed=!1,this.canDelete=!1}static get properties(){return{coll:{type:Object},detailed:{type:Boolean},canDelete:{type:Boolean}}}static get styles(){return f(Z.compStyles)}static get compStyles(){return a.b`
    .columns {
      width: 100%;
    }
    .column {
      word-break: break-word;
      position: relative;
    }

    :host {
      width: 100%;
      height: 100%;
      min-width: 0px;
    }

    :host(.is-list) .columns {
      display: flex !important;
      flex-direction: column;
    }

    :host(.is-list) .column {
      width: 100% !important;
    }

    .col-title:hover {

    }
    .col-title a {
      display: block;
      height: 100%;
    }
    .column:hover > .copy, .source-text:hover + .copy, .copy:hover {
      display: inline;
    }
    .copy {
      color: black;
      margin: 0px;
      margin: 0;
      line-height: 0.4em;
      padding: 6px;
      border-radius: 10px;
      display: none;
      position: absolute;
    }
    .copy:active {
      background-color: lightgray;
    }
    .minihead {
      font-size: 10px;
      font-weight: bold;
    }
    `}render(){const e=this.coll,t=this.detailed;return a.c`
      <div class="columns">
        <div class="column col-title is-4">
          <span class="subtitle has-text-weight-bold">
            ${t?a.c`
            ${e.title||e.filename}
            `:a.c`
            <a href="?source=${encodeURIComponent(e.sourceUrl)}">${e.title||e.filename}</a>`}
          </span>
        </div>
        ${t&&e.desc?a.c`
          <div class="column">
            <p class="minihead">Description</p>
            ${e.desc}
          </div>`:a.c`
        `}
        <div class="column is-4">
          <span class="source-text"><p class="minihead">Source</p>${e.sourceUrl}&nbsp;</span>
          <a @click="${t=>this.onCopy(t,e.sourceUrl)}" class="copy"><fa-icon .svg="${N.a}"/></a>
          ${e.sourceUrl&&e.sourceUrl.startsWith("googledrive://")?a.c`
            <p><i>(${e.filename})</i></p>`:""}
        </div>
        ${t?a.c`
        <div class="column"><p class="minihead">Filename</p>${e.filename}</div>`:a.c``}

        <div class="column is-2"><p class="minihead">Date Loaded</p>${e.ctime?new Date(e.ctime).toLocaleString():""}</div>
        <div class="column is-2"><p class="minihead">Total Size</p>${M()(Number(e.size||0))}</div>

        ${t?a.c`
        <div class="column">
          <p class="minihead">Loading Mode</p>
          ${e.onDemand?"Download On-Demand":"Fully Local"}
        </div>
        <div class="column">
          <p class="minihead">Collection id</p>
          ${e.coll}
        </div>
        `:a.c``}

      </div>`}onCopy(e,t){return e.preventDefault(),e.stopPropagation(),navigator.clipboard.writeText(t),!1}onPurge(e){const t={reload:e};this.dispatchEvent(new CustomEvent("coll-purge",{detail:t}))}}customElements.define("wr-coll-info",Z),customElements.define("wr-coll-index",V);var Y=i(231),Q=i.n(Y),J=i(185),X=i.n(J),ee=i(232),te=i.n(ee),ie=i(233),ae=i.n(ie),re=i(234),oe=i.n(re),ne=i(235),se=i.n(ne),le=i(186),ce=i.n(le),de=i(187),ue=i.n(de),he=i(188),fe=i.n(he),be=i(236),pe=i.n(be),me=i(237),ge=i.n(me),ve=i(238),we=i.n(ve),xe="undefined"!=typeof window?window:null,ke=null===xe,ye=ke?void 0:xe.document,De=function(){return!1},$e=ke?"calc":["","-webkit-","-moz-","-o-"].filter((function(e){var t=ye.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length})).shift()+"calc",Se=function(e){return"string"==typeof e||e instanceof String},Ce=function(e){if(Se(e)){var t=ye.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},Ae=function(e,t,i){var a=e[t];return void 0!==a?a:i},ze=function(e,t,i,a){if(t){if("end"===a)return 0;if("center"===a)return e/2}else if(i){if("start"===a)return 0;if("center"===a)return e/2}return e},Ee=function(e,t){var i=ye.createElement("div");return i.className="gutter gutter-"+t,i},Fe=function(e,t,i){var a={};return Se(t)?a[e]=t:a[e]=$e+"("+t+"% - "+i+"px)",a},_e=function(e,t){var i;return(i={})[e]=t+"px",i},Be=function(e,t){if(void 0===t&&(t={}),ke)return{};var i,a,r,o,n,s,l=e;Array.from&&(l=Array.from(l));var c=Ce(l[0]).parentNode,d=getComputedStyle?getComputedStyle(c):null,u=d?d.flexDirection:null,h=Ae(t,"sizes")||l.map((function(){return 100/l.length})),f=Ae(t,"minSize",100),b=Array.isArray(f)?f:l.map((function(){return f})),p=Ae(t,"maxSize",1/0),m=Array.isArray(p)?p:l.map((function(){return p})),g=Ae(t,"expandToMin",!1),v=Ae(t,"gutterSize",10),w=Ae(t,"gutterAlign","center"),x=Ae(t,"snapOffset",30),k=Ae(t,"dragInterval",1),y=Ae(t,"direction","horizontal"),D=Ae(t,"cursor","horizontal"===y?"col-resize":"row-resize"),$=Ae(t,"gutter",Ee),S=Ae(t,"elementStyle",Fe),C=Ae(t,"gutterStyle",_e);function A(e,t,a,r){var o=S(i,t,a,r);Object.keys(o).forEach((function(t){e.style[t]=o[t]}))}function z(){return s.map((function(e){return e.size}))}function E(e){return"touches"in e?e.touches[0][a]:e[a]}function F(e){var t=s[this.a],i=s[this.b],a=t.size+i.size;t.size=e/this.size*a,i.size=a-e/this.size*a,A(t.element,t.size,this._b,t.i),A(i.element,i.size,this._c,i.i)}function _(e){var i,a=s[this.a],r=s[this.b];this.dragging&&(i=E(e)-this.start+(this._b-this.dragOffset),k>1&&(i=Math.round(i/k)*k),i<=a.minSize+x+this._b?i=a.minSize+this._b:i>=this.size-(r.minSize+x+this._c)&&(i=this.size-(r.minSize+this._c)),i>=a.maxSize-x+this._b?i=a.maxSize+this._b:i<=this.size-(r.maxSize-x+this._c)&&(i=this.size-(r.maxSize+this._c)),F.call(this,i),Ae(t,"onDrag",De)(z()))}function B(){var e=s[this.a].element,t=s[this.b].element,a=e.getBoundingClientRect(),n=t.getBoundingClientRect();this.size=a[i]+n[i]+this._b+this._c,this.start=a[r],this.end=a[o]}function I(e){var t=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;var i=e[n];return 0===i?null:i-="horizontal"===y?parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)}(c);if(null===t)return e;if(b.reduce((function(e,t){return e+t}),0)>t)return e;var i=0,a=[],r=e.map((function(r,o){var n=t*r/100,s=ze(v,0===o,o===e.length-1,w),l=b[o]+s;return n<l?(i+=l-n,a.push(0),l):(a.push(n-l),n)}));return 0===i?e:r.map((function(e,r){var o=e;if(i>0&&a[r]-i>0){var n=Math.min(i,a[r]-i);i-=n,o=e-n}return o/t*100}))}function L(){var e=s[this.a].element,i=s[this.b].element;this.dragging&&Ae(t,"onDragEnd",De)(z()),this.dragging=!1,xe.removeEventListener("mouseup",this.stop),xe.removeEventListener("touchend",this.stop),xe.removeEventListener("touchcancel",this.stop),xe.removeEventListener("mousemove",this.move),xe.removeEventListener("touchmove",this.move),this.stop=null,this.move=null,e.removeEventListener("selectstart",De),e.removeEventListener("dragstart",De),i.removeEventListener("selectstart",De),i.removeEventListener("dragstart",De),e.style.userSelect="",e.style.webkitUserSelect="",e.style.MozUserSelect="",e.style.pointerEvents="",i.style.userSelect="",i.style.webkitUserSelect="",i.style.MozUserSelect="",i.style.pointerEvents="",this.gutter.style.cursor="",this.parent.style.cursor="",ye.body.style.cursor=""}function T(e){if(!("button"in e)||0===e.button){var i=s[this.a].element,a=s[this.b].element;this.dragging||Ae(t,"onDragStart",De)(z()),e.preventDefault(),this.dragging=!0,this.move=_.bind(this),this.stop=L.bind(this),xe.addEventListener("mouseup",this.stop),xe.addEventListener("touchend",this.stop),xe.addEventListener("touchcancel",this.stop),xe.addEventListener("mousemove",this.move),xe.addEventListener("touchmove",this.move),i.addEventListener("selectstart",De),i.addEventListener("dragstart",De),a.addEventListener("selectstart",De),a.addEventListener("dragstart",De),i.style.userSelect="none",i.style.webkitUserSelect="none",i.style.MozUserSelect="none",i.style.pointerEvents="none",a.style.userSelect="none",a.style.webkitUserSelect="none",a.style.MozUserSelect="none",a.style.pointerEvents="none",this.gutter.style.cursor=D,this.parent.style.cursor=D,ye.body.style.cursor=D,B.call(this),this.dragOffset=E(e)-this.end}}"horizontal"===y?(i="width",a="clientX",r="left",o="right",n="clientWidth"):"vertical"===y&&(i="height",a="clientY",r="top",o="bottom",n="clientHeight"),h=I(h);var P=[];function R(e){var t=e.i===P.length,i=t?P[e.i-1]:P[e.i];B.call(i);var a=t?i.size-e.minSize-i._c:e.minSize+i._b;F.call(i,a)}return(s=l.map((function(e,t){var a,r={element:Ce(e),size:h[t],minSize:b[t],maxSize:m[t],i:t};if(t>0&&((a={a:t-1,b:t,dragging:!1,direction:y,parent:c})._b=ze(v,t-1==0,!1,w),a._c=ze(v,!1,t===l.length-1,w),"row-reverse"===u||"column-reverse"===u)){var o=a.a;a.a=a.b,a.b=o}if(t>0){var n=$(t,y,r.element);!function(e,t,a){var r=C(i,t,a);Object.keys(r).forEach((function(t){e.style[t]=r[t]}))}(n,v,t),a._a=T.bind(a),n.addEventListener("mousedown",a._a),n.addEventListener("touchstart",a._a),c.insertBefore(n,r.element),a.gutter=n}return A(r.element,r.size,ze(v,0===t,t===l.length-1,w),t),t>0&&P.push(a),r}))).forEach((function(e){var t=e.element.getBoundingClientRect()[i];t<e.minSize&&(g?R(e):e.minSize=t)})),{setSizes:function(e){var t=I(e);t.forEach((function(e,i){if(i>0){var a=P[i-1],r=s[a.a],o=s[a.b];r.size=t[i-1],o.size=e,A(r.element,r.size,a._b,r.i),A(o.element,o.size,a._c,o.i)}}))},getSizes:z,collapse:function(e){R(s[e])},destroy:function(e,t){P.forEach((function(a){if(!0!==t?a.parent.removeChild(a.gutter):(a.gutter.removeEventListener("mousedown",a._a),a.gutter.removeEventListener("touchstart",a._a)),!0!==e){var r=S(i,a.a.size,a._b);Object.keys(r).forEach((function(e){s[a.a].element.style[e]="",s[a.b].element.style[e]=""}))}}))},parent:c,pairs:P}};class Ie extends a.a{constructor(){super(),this.sourceUrl=null,this.inited=!1,this.isLoading=!1,this.coll="",this.collInfo=null,this._replaceLoc=!1,this._locUpdateNeeded=!1,this._locationHash="",this.tabData={},this.url="",this.ts="",this.tabNames=["pages","story","resources","info"],this.tabLabels={pages:"Pages",story:"Story",resources:"URLs",info:"Archive Info"},this.menuActive=!1,this.hasStory=!1,this.editable=!1,this.showSidebar="1"===localStorage.getItem("pages:showSidebar"),this.splitter=null,this.isVisible=!0,this.favIconUrl="",this.appName="ReplayWeb.page",this.appLogo=u.a}static get properties(){return{inited:{type:Boolean},sourceUrl:{type:String},loadInfo:{type:Object,attribute:!1},showSidebar:{type:Boolean},collInfo:{type:Object,attribute:!1},coll:{type:String},hasStory:{type:Boolean},isLoading:{type:Boolean},tabData:{type:Object,attribute:!1},url:{type:String},ts:{type:String},isFullscreen:{type:Boolean},menuActive:{type:Boolean},embed:{type:String},editable:{type:Boolean},isVisible:{type:Boolean},favIconUrl:{type:String},appName:{type:String},appLogo:{type:String}}}firstUpdated(){this.inited=!0,window.addEventListener("hashchange",e=>this.onHashChange(e)),this.addEventListener("fullscreenchange",()=>{this.isFullscreen=!!document.fullscreenElement}),this.embed&&(this.observer=new IntersectionObserver(e=>{this.isVisible=e[0].isIntersecting}),this.observer.observe(this))}updated(e){if(e.has("sourceUrl")&&this.doUpdateInfo(),e.has("editable")&&(this.editable?this._pollColl=setInterval(()=>this.doUpdateInfo(!0),1e4):this._pollColl&&clearInterval(this._pollColl)),e.has("tabData")){if(!this.collInfo||!this.collInfo.coll)return;Object.keys(this.tabData).forEach(e=>!this.tabData[e]&&delete this.tabData[e]);const t="#"+new URLSearchParams(this.tabData).toString();if(this.tabData.url||(this.url="search://"+decodeURIComponent(this._paramsToString(this.tabData))),t!==this._locationHash){if(this._locationHash=t,this._replaceLoc||0===Object.keys(e.get("tabData")).length){const e=new URL(window.location.href);e.hash=this._locationHash,window.history.replaceState({},"",e.href),this._replaceLoc=!1}else if(window.location.hash=this._locationHash,!this.showSidebar){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.focus()}this.embed&&window.parent!==window&&window.parent.postMessage(this.tabData,"*")}this._locUpdateNeeded=!1}e.has("showSidebar")&&(this.embed||localStorage.setItem("pages:showSidebar",this.showSidebar?"1":"0")),(e.has("tabData")||e.has("showSidebar"))&&this.configureSplitter()}configureSplitter(){if(this.tabData.url&&this.showSidebar){const e=this.renderRoot.querySelector("#contents"),t=this.renderRoot.querySelector("wr-coll-replay");if(e&&t&&!this.splitter){const i={sizes:[30,70],minSize:[300,300],gutterSize:4,onDragStart(){t.setDisablePointer(!0)},onDragEnd(){t.setDisablePointer(!1)}};this.splitter=Be([e,t],i)}}else if(this.splitter){try{this.splitter.destroy()}catch(e){}this.splitter=null}}async doUpdateInfo(e=!1){if(e&&this.tabData.url&&!this.showSidebar)return;let t=this.loadInfo&&this.loadInfo.customColl;if(!t){t=(await A(this.sourceUrl)).coll}this.coll=t;const i="./w/api/c/"+t,a="./w/"+t,r=await fetch(i+"?all=1");if(200!=r.status)return void(this.collInfo={});const o=await r.json();this.collInfo={apiPrefix:i,replayPrefix:a,coll:t,...o},this.collInfo.title||(this.collInfo.title=this.collInfo.filename),"replayonly"===this.embed&&(this.showSidebar=!1),this.hasStory=this.collInfo.desc||this.collInfo.lists.length,this.dispatchEvent(new CustomEvent("coll-loaded",{detail:{collInfo:this.collInfo,alreadyLoaded:!0}})),this.onHashChange()}onCollLoaded(e){this.doUpdateInfo(),this.loadInfo=null,e.detail.sourceUrl&&(this.sourceUrl=e.detail.sourceUrl),this.dispatchEvent(new CustomEvent("coll-loaded",{detail:{sourceUrl:this.sourceUrl,collInfo:this.collInfo}}))}onCollUpdate(e){this.editable&&(this.collInfo={...this.collInfo,...e.detail})}onHashChange(){const e=window.location.hash;if(e&&e!==this._locationHash&&(this.tabData=Object.fromEntries(new URLSearchParams(e.slice(1)).entries()),this._locationHash=e),this.collInfo.coll&&!this.tabNames.includes(this.tabData.view)){const e=this.hasStory?"story":this.editable||this.collInfo.pages.length?"pages":"resources";this.tabData={...this.tabData,view:e}}if(this.tabData.url&&this.tabData.url.startsWith("page:")){const e=Number(this.tabData.url.slice("page:".length));if(!isNaN(e)&&e<this.collInfo.pages.length){const t=this.collInfo.pages[e];this.tabData.url=t.url,this.tabData.ts=$(t).timestamp}}this.hasStory||"story"!==this.tabData.view||(this.tabData.view="pages"),this.tabData.url&&this.tabData.query&&(this.showSidebar=!0)}onTabClick(e){e.preventDefault();const t=e.currentTarget.getAttribute("href");return this.tabData={...this.tabData,view:t.slice(1)},!1}onCollTabNav(e){e.detail.reload?this.onRefresh(null,!0):e.target.id===this.tabData.view||"replay"===e.target.id&&this.tabData.url?this.updateTabData(e.detail.data,e.detail.replaceLoc,!1):this.showSidebar&&this.tabData.url&&this.updateTabData(e.detail.data,e.detail.replaceLoc,!0)}updateTabData(e,t=!1){this.tabData={...this.tabData,...e},this.tabData.url&&(this.url=this.tabData.url||""),this.tabData.ts&&(this.ts=this.tabData.ts||""),this._replaceLoc=!this._locUpdateNeeded&&t,this._locUpdateNeeded=!0}static get styles(){return f(a.b`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 0px;
    }

    .icon {
      vertical-align: text-top;
    }

    .back fa-icon {
      width: 1.5em;
      vertical-align: bottom;
      line-height: 0.5em;
    }

    li.is-active {
      font-weight: bold;
    }

    .tab-label {
      display: inline;
    }

    @media screen and (max-width: ${b?a.b`1163px`:a.b`1053px`}) {
      .tab-label {
        display: none;
      }

      .main.tabs span.icon {
        margin: 0px;
      }
    }

    .main.tabs {
      display: flex;
      flex-direction: row;
      margin-bottom: 0px;
    }

    .main.tabs ul {
      position: relative;
    }

    .main.tabs li {
      line-height: 1.5;
      padding: 8px 0 6px 0;
    }

    @media screen and (max-width: 319px) {
      .main.tabs li a {
        padding-right: 4px;
        padding-left: 4px;
      }
    }

    .sidebar.main.tabs li a {
      padding-right: 6px;
      padding-left: 6px;
    }

    #contents {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      min-height: 0px;
      flex: auto;
    }

    #tabContents {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      min-height: 0px;
      flex: auto;
    }

    ${Ie.replayBarStyles}
    `)}static get replayBarStyles(){return a.b`
    .breadbar {
      display: flex;
      align-items: center;
      height: 35px;
      width: 100%;
      background-color: aliceblue;
      padding: 0.5em;
    }

    .replay-bar {
      padding: 0.5em 0em 0.5em 0.5em;
      max-width: none;
      border-bottom: solid .1rem #97989A;
      width: 100%;
      background-color: white;
    }

    input#url {
      border-radius: 4px;
    }

    .favicon img {
      width: 20px;
      height: 20px;
      margin: 8px;
      /*filter: drop-shadow(1px 1px 2px grey);*/
    }

    #datetime {
      position: absolute;
      right: 1em;
      z-index: 10;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0), #FFF 15%, #FFF);
      margin: -35px 0 0 0px;
      padding-left: 3em;
      line-height: 2;
    }

    .menu-head {
      font-size: 10px;
      font-weight: bold;
      display: block;
    }
    .menu-logo {
      vertical-align: middle;
    }
    .menu-version {
      font-size: 10px;
    }
    .dropdown-item.info {
      font-style: italic;
    }

    input:focus + #datetime {
      display: none;
    }

    .grey-disabled {
      --fa-icon-fill-color: lightgrey;
      color: lightgrey;
    }

    .replay-bar .button:focus {
      box-shadow: none;
    }

    .is-borderless {
      border: 0px;
    }

    .narrow {
      padding: calc(0.5em - 1px) 0.8em;
    }

    form {
      width: 100%;
      margin: 0 0 0 0.5em;
    }

    .gutter.gutter-horizontal {
      cursor: col-resize;
      float: left;
      background-color: rgb(151, 152, 154);
    }

    .gutter.gutter-horizontal:hover {
      cursor: col-resize;
    }

    main, wr-coll-replay {
      width: 100%;
    }

    .info-bg {
      background-color: whitesmoke;
      width: 100%;
      height: 100%;
      display: flex;
    }

    .is-list {
      margin: 1.0em;
      background-color: whitesmoke;
    }

    #contents.full-pages {
      width: 100% !important;
    }

    .sidebar-nav {
      position: absolute;
      vertical-align: middle;
    }

    .sidebar-nav a {
      display: inline-block;
      border-bottom: 0px;
    }

    .sidebar-nav span.nav-hover {
      font-size: smaller;
      display: none;
    }

    .sidebar-nav:hover span.nav-hover,
    .sidebar-nav:focus-within span.nav-hover {
      display: initial;
      color: rgb(72, 118, 255);
    }

    .sidebar-nav fa-icon {
      vertical-align: bottom;
    }

    .sidebar-nav:hover fa-icon {
      color: rgb(72, 118, 255);
    }

    .sidebar-nav.left {
      left: 8px;
    }

    .sidebar-nav.right {
      right: 8px;
    }

    /* Since the replay sometimes programmatically receives keyboard focus,
       and that is visually unexpected for mouse-users, and since this won't
       particularly trip up keyboard users, just remove the focus style. */
    wr-coll-replay:focus {
      outline: none;
    }
    /* Some keyboard-users may see this replacement style */
    wr-coll-replay:focus-visible {
      outline: 1px solid rgb(72, 118, 255);
    }
    `}render(){if(!this.inited)return a.c``;const e=!!this.tabData.url,t=e&&this.showSidebar;if(!e&&this.tabData&&this.tabData.view){const e={title:this.tabLabels[this.tabData.view],replayTitle:!1};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}return this.collInfo&&!this.collInfo.coll?a.c`
      <wr-loader .loadInfo="${this.loadInfo}" embed="${this.embed}"
      .coll="${this.coll}" .sourceUrl="${this.sourceUrl}" @coll-loaded=${this.onCollLoaded}></wr-loader>`:this.collInfo?a.c`
      ${this.renderLocationBar()}
      <div id="tabContents">
        <div id="contents" class="is-light ${t?"sidebar":e?"is-hidden":"full-pages"}"
             role="${t?"complementary":""}" aria-label="${t?"Browse Contents":""}">
          ${this.renderTabHeader(t)}
          ${t||!e?this.renderCollTabs(t):a.c``}
        </div>

        ${e&&this.isVisible?a.c`
          <wr-coll-replay
          role="main"
          tabindex="-1"
          .collInfo="${this.collInfo}"
          sourceUrl="${this.sourceUrl}"
          url="${this.tabData.url||""}"
          ts="${this.tabData.ts||""}"
          @coll-tab-nav="${this.onCollTabNav}" id="replay"
          @replay-loading="${e=>this.isLoading=e.detail.loading}"
          @replay-favicons="${this.onFavIcons}"
          >
          </wr-coll-replay>
        `:""}
      </div>
      `:a.c``}renderTabHeader(e){return a.c`
      <nav class="main tabs is-centered ${e?"sidebar":""}" aria-label="tabs">
        <ul>
          ${e?a.c`
          <li class="sidebar-nav left">
            <a role="button" href="#" @click="${this.onHideSidebar}" @keyup="${p}" class="is-marginless is-size-6 is-paddingless">
              <fa-icon title="Hide" .svg="${ge.a}" aria-hidden="true"></fa-icon>
              <span class="nav-hover" aria-hidden="true">Hide</span>
              <span class="is-sr-only">Hide Sidebar</span>
            </a>
          </li>`:""}

          ${this.hasStory?a.c`
          <li class="${"story"===this.tabData.view?"is-active":""}">
            <a @click="${this.onTabClick}" href="#story" class="is-size-6" aria-label="Story" aria-current="${"story"===this.tabData.view?"location":""}">
              <span class="icon"><fa-icon .svg="${Q.a}" aria-hidden="true" title="Story"></fa-icon></span>
              <span class="tab-label ${e?"is-hidden":""}" title="Story">Story</span>
            </a>
          </li>`:""}

          <li class="${"pages"===this.tabData.view?"is-active":""}">
            <a @click="${this.onTabClick}" href="#pages" class="is-size-6" aria-label="Pages" aria-current="${"pages"===this.tabData.view?"location":""}">
              <span class="icon"><fa-icon .svg="${ae.a}" aria-hidden="true" title="Pages"></fa-icon></span>
              <span class="tab-label ${e?"is-hidden":""}" title="Pages">Pages</span>
            </a>
          </li>

          <li class="${"resources"===this.tabData.view?"is-active":""}">
            <a @click="${this.onTabClick}" href="#resources" class="is-size-6" aria-label="URLs" aria-current="${"resources"===this.tabData.view?"location":""}">
              <span class="icon"><fa-icon .svg="${te.a}" aria-hidden="true" title="URLs"></fa-icon></span>
              <span class="tab-label ${e?"is-hidden":""}" title="URLs">URLs</span>
            </a>
          </li>

          <li class="${"info"===this.tabData.view?"is-active":""}">
            <a @click="${this.onTabClick}" href="#info" class="is-size-6" aria-label="Archive Info" aria-current="${"info"===this.tabData.view?"location":""}">
              <span class="icon"><fa-icon .svg="${oe.a}" aria-hidden="true" title="Archive Info"></fa-icon></span>
              <span class="tab-label ${e?"is-hidden":""}" title="Archive Info">Info</span>
            </a>
          </li>

          ${e?a.c`
          <li class="sidebar-nav right">
            <a role="button" href="#" @click="${this.onFullPageView}" @keyup="${p}" class="is-marginless is-size-6 is-paddingless">
              <span class="nav-hover" aria-hidden="true">Expand</span>
              <span class="is-sr-only">Expand Sidebar to Full View</span>
              <fa-icon title="Expand" .svg="${we.a}" aria-hidden="true"></fa-icon>
            </a>
          </li>`:""}
        </ul>
      </nav>`}renderLocationBar(){if("replayonly"===this.embed)return"";const e=function(e){if(!e)return"";e.length<14&&(e+="00000000000000".substr(e.length));const t=e.substring(0,4)+"-"+e.substring(4,6)+"-"+e.substring(6,8)+"T"+e.substring(8,10)+":"+e.substring(10,12)+":"+e.substring(12,14)+"-00:00";return new Date(t)}(this.ts).toLocaleString(),t=!!this.tabData.url,i=t&&this.favIconUrl;return a.c`
    <a class="skip-link" href="#skip-replay-target" @click="${this.skipMenu}">Skip replay navigation</a>
    <nav class="replay-bar" aria-label="replay">
      <div class="field has-addons">
        <a href="#" role="button" class="button narrow is-borderless is-hidden-touch" id="fullscreen" @click="${this.onFullscreenToggle}" @keyup="${p}"
                title="${this.isFullscreen?"Exit Full Screen":"Full Screen"}" aria-label="${this.isFullscreen?"Exit Fullscreen":"Fullscreen"}">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${this.isFullscreen?fe.a:ue.a}"></fa-icon>
          </span>
        </a>
        <a href="#" role="button" class="button narrow is-borderless is-hidden-mobile" @click="${this.onGoBack}" @keyup="${p}"
                title="Back" aria-label="Back">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${_.a}"></fa-icon>
          </span>
        </a>
        <a href="#" role="button" class="button narrow is-borderless is-hidden-mobile" @click="${this.onGoForward}" @keyup="${p}"
                title="Forward" aria-label="Forward">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${I.a}"></fa-icon>
          </span>
        </a>
        <a href="#" role="button" class="button narrow is-borderless ${this.isLoading?"is-loading":"is-hidden-mobile"}" id="refresh" @click="${this.onRefresh}" @keyup="${p}"
                title="Reload" aria-label="Reload">
          <span class="icon is-small">
            ${this.isLoading?"":a.c`
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${ce.a}"></fa-icon>
            `}
          </span>
        </a>
        <a href="#" role="button" class="button narrow is-borderless is-hidden-mobile ${t?"":"grey-disabled"}" @click="${this.onShowPages}" @keyup="${p}"
                ?disabled="${!t}" title="Browse Contents" aria-label="Browse Contents" aria-controls="contents">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${X.a}"></fa-icon>
          </span>
        </a>
        ${this.renderExtraToolbar(!1)}
        <form @submit="${this.onSubmit}">
          <div class="control is-expanded ${i?"has-icons-left":""}">
            <input id="url" class="input" type="text" @keydown="${this.onKeyDown}" @blur="${this.onLostFocus}" .value="${this.url}" placeholder="Enter text to search or a URL to replay"/>
            ${t?a.c`<p id="datetime" class="control is-hidden-mobile">${e}</p>`:a.c``}
            ${i?a.c`
            <span class="favicon icon is-small is-left">
              <img src="${this.favIconUrl}"/>
            </span>`:a.c``}
          </div>
        </form>

        <div class="dropdown is-right ${this.menuActive?"is-active":""}" @click="${()=>this.menuActive=!1}">
          <div class="dropdown-trigger">
            <button class="button is-borderless" aria-haspopup="true" aria-controls="menu-dropdown" aria-expanded="${this.menuActive}" @click="${this.onMenu}"
                    aria-label="more replay controls">
              <span class="icon is-small">
                <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${pe.a}"></fa-icon>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="menu-dropdown">
            <div class="dropdown-content">
              <a href="#" role="button" class="dropdown-item is-hidden-desktop" @click="${this.onFullscreenToggle}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${this.isFullscreen?fe.a:ue.a}"></fa-icon>
                </span>
                <span>Full Screen</span>
              </a>
              <a href="#" role="button" class="dropdown-item is-hidden-tablet" @click="${this.onGoBack}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${_.a}"></fa-icon>
                </span>
                <span>Back</span>
              </a>
              <a href="#" role="button" class="dropdown-item is-hidden-tablet" @click="${this.onGoForward}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${I.a}"></fa-icon>
                </span>
                <span>Forward</span>
              </a>
              <a href="#" role="button" class="dropdown-item is-hidden-tablet" @click="${this.onRefresh}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${ce.a}"></fa-icon>
                </span>
                <span>Reload</span>
              </a>
              <a href="#" role="button" class="dropdown-item is-hidden-tablet ${t?"":"grey-disabled"}" @click="${this.onShowPages}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${X.a}"></fa-icon>
                </span>
                <span>Browse Contents</span>
              </a>
              ${this.renderExtraToolbar(!0)}
              ${this.editable?a.c``:a.c`
              <hr class="dropdown-divider is-hidden-desktop">
              <a href="#" role="button" class="dropdown-item" @click="${this.onPurgeCache}" @keyup="${p}">
                <span class="icon is-small">
                  <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${se.a}"></fa-icon>
                </span>
                <span>Purge Cache + Full Reload</span>
              </a>`}
              ${e?a.c`
              <hr class="dropdown-divider is-hidden-desktop">
              <div class="dropdown-item info is-hidden-desktop">
                <span class="menu-head">Capture Date</span>${e}
              </div>`:""}
              <hr class="dropdown-divider">
              <a href="#" role="button" class="dropdown-item" @click="${this.onAbout}">
                <fa-icon class="menu-logo" size="1.0rem" aria-hidden="true" .svg=${this.appLogo}></fa-icon>
                <span>&nbsp;About ${this.appName}</span>
                <span class="menu-version">(${"0.7.3"})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav><p id="skip-replay-target" tabindex="-1" class="is-sr-only">Skipped</p>`}dragStart(){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.setDisablePointer(!0)}dragEnd(){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.setDisablePointer(!1)}renderCollInfo(){return a.c`
    <div class="info-bg">
      <wr-coll-info
      class="is-list"
      .coll="${this.collInfo}"
      ?detailed="${!0}"
      ?canDelete="${!this.embed}"
      @coll-purge="${this.onPurgeCache}"
      ></wr-coll-info>
    </div>`}renderExtraToolbar(){return""}renderCollTabs(e){const t=this.hasStory&&"story"===this.tabData.view,i="pages"===this.tabData.view,r="resources"===this.tabData.view,o="info"===this.tabData.view;return a.c`

    ${o?this.renderCollInfo():a.c``}

    ${t?a.c`
    <wr-coll-story .collInfo="${this.collInfo}"
    .active="${t}"
    currList="${this.tabData.currList||0}"
    @coll-tab-nav="${this.onCollTabNav}" id="story"
    .isSidebar="${e}"
    class="${t?"":"is-hidden"} ${e?"sidebar":""}"
    role="${e?"":"main"}"
    >
    </wr-coll-story>`:""}

    ${r?a.c`
    <wr-coll-resources .collInfo="${this.collInfo}"
    .active="${r}"
    query="${this.tabData.query||""}"
    urlSearchType="${this.tabData.urlSearchType||""}"
    .currMime="${this.tabData.currMime||""}"
    @coll-tab-nav="${this.onCollTabNav}" id="resources"
    .isSidebar="${e}"
    class="is-paddingless ${r?"":"is-hidden"} ${e?"sidebar":""}"
    role="${e?"":"main"}"
    >
    </wr-coll-resources>`:""}

    ${i?a.c`
    <wr-page-view
    .collInfo="${this.collInfo}"
    .active="${i}"
    .editable="${this.editable}"
    .isSidebar="${e}"
    currList="${this.tabData.currList||0}"
    query="${this.tabData.query||""}"
    .url="${this.tabData.url||""}"
    .ts="${this.tabData.ts||""}"
    @coll-tab-nav="${this.onCollTabNav}" id="pages"
    @coll-update="${this.onCollUpdate}"
    class="${i?"":"is-hidden"} ${e?"sidebar":""}"
    role="${e?"":"main"}"
    >
    </wr-page-view>`:""}
    `}skipMenu(e){e.preventDefault(),this.renderRoot.querySelector("#skip-replay-target").focus()}onKeyDown(e){"Esc"!==e.key&&"Escape"!==e.key||(e.preventDefault(),e.currentTarget.value=this.url)}onMenu(e){e.stopPropagation(),this.menuActive=!this.menuActive,this.menuActive&&document.addEventListener("click",()=>{this.menuActive=!1},{once:!0})}onFullscreenToggle(e){e.preventDefault(),this.menuActive=!1,this.isFullscreen?document.exitFullscreen():this.requestFullscreen()}onGoBack(e){e.preventDefault(),this.menuActive=!1,window.history.back()}onGoForward(e){e.preventDefault(),this.menuActive=!1,window.history.forward()}onShowPages(e){e.preventDefault(),this.showSidebar||document.documentElement.clientWidth>=769?this.showSidebar=!this.showSidebar:(this.showSidebar=!1,this.updateTabData({url:"",ts:""}))}onFullPageView(e){e.preventDefault(),this.updateTabData({url:"",ts:""})}onHideSidebar(e){e.preventDefault(),this.showSidebar=!1}async onFavIcons(e){for(const t of e.detail.icons){const e=await fetch(t.href);if(200===e.status){const i=e.headers.get("Content-Type");if(i&&!i.startsWith("text/"))return void(this.favIconUrl=t.href)}}this.favIconUrl=""}onPurgeCache(e){e.preventDefault();const t=!e.detail||void 0===e.detail.reload||e.detail.reload;this.deleteFully(t)}async deleteFully(e=!1){const t=this.collInfo.apiPrefix+(e?"?reload=1":""),i=await fetch(t,{method:"DELETE"});200!==i.status&&console.warn("purge failed: "+i.status),e||this.embed?window.location.reload():window.location.search=""}onSubmit(e){e.preventDefault();const t=this.renderRoot.querySelector("input");return t.value?this.navigateTo(t.value):t.value=this.url,!1}onLostFocus(e){e.currentTarget.value||(e.currentTarget.value=this.url)}navigateTo(e){let t;if(e.startsWith("http://")||e.startsWith("https://")){if(t={url:e},e===this.tabData.url){const e=this.renderRoot.querySelector("wr-coll-replay");return void(e&&e.refresh())}}else t=e.startsWith("search://")?this._stringToParams(e):{query:e,view:"pages"};this.updateTabData(t)}_stringToParams(e){const t=new URLSearchParams(e.slice("search://".length)),i={url:"",ts:""};for(const e of["query","view","currList","currMime","urlSearchType"])t.has(e)&&(i[e]=t.get(e));return i}_paramsToString(e){const t=new URLSearchParams;for(const i of["query","view","currList","currMime","urlSearchType"])i in e&&t.set(i,e[i]);return t.toString()}onRefresh(e,t=!1){if(e&&e.preventDefault(),this.menuActive=!1,this.tabData.url){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.refresh()}else t||window.location.reload()}onAbout(){this.dispatchEvent(new CustomEvent("about-show"))}}customElements.define("wr-coll",Ie);var Le=i(55),Te=i(239),Pe=i.n(Te);class Re extends a.a{constructor(){super(),this.collInfo=null,this.curatedPageMap={},this.currList=0,this.active=!1,this.lastST=0,this.clickTime=0,this.isSidebar=!1,this.splitDirection=!1}static get properties(){return{collInfo:{type:Object},active:{type:Boolean},curatedPageMap:{type:Object},currList:{type:Number},isSidebar:{type:Boolean},splitDirection:{type:Boolean}}}recalcSplitter(e){this.splitDirection=this.isSidebar||e<769?"vertical":"horizontal"}firstUpdated(){this.recalcSplitter(document.documentElement.clientWidth),this.obs=new ResizeObserver(e=>{this.recalcSplitter(e[0].contentRect.width)}),this.obs.observe(this)}updated(e){e.has("collInfo")&&this.doLoadCurated(),(e.has("collInfo")||e.has("isSidebar"))&&this.recalcSplitter(document.documentElement.clientWidth),e.has("splitDirection")&&this.configureSplitter(),e.has("currList")&&this.active&&this.sendChangeEvent({currList:this.currList})}configureSplitter(){const e=this.renderRoot.querySelector(".sidebar"),t=this.renderRoot.querySelector(".main-content");if(this.splitter){try{this.splitter.destroy()}catch(e){}this.splitter=null}if(e&&t&&!this.splitter){const i={sizes:[20,80],gutterSize:4,direction:this.splitDirection};this.splitter=Be([e,t],i)}}async doLoadCurated(){this.curatedPageMap={};const e={};for(const t of this.collInfo.pages)e[t.id]=t;for(const e of this.collInfo.curatedPages){this.curatedPageMap[e.list]||(this.curatedPageMap[e.list]=[]);const t=e,i=t.url,a=t.ts,r=t.title||t.url,o=e.desc;this.curatedPageMap[e.list].push({url:i,ts:a,title:r,desc:o})}this.scrollToList()}static get styles(){return f(a.b`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      min-width: 0px;

      justify-content: flex-start;
      align-items: center;
    }

    :host(.sidebar) .columns {
      display: flex !important;
      flex-direction: column;
    }

    :host(.sidebar) .column.sidebar.is-one-fifth {
      width: 100% !important;
    }

    ${Re.sidebarStyles(Object(a.d)(":host(.sidebar)"))}

    .desc p {
      margin-bottom: 1.0em;
    }

    .columns {
      width: 100%;
      height: 100%;
      justify-self: stretch;
      margin: 1.0em 0 0 0 !important;
      min-height: 0;
    }

    .column.main-content {
      min-height: 0;
      display: flex;
      flex-direction: column;
      padding: 0px;
      margin-left: 0.75em;
    }

    .column.main-content.main-scroll {
      padding-right: 0.75em;
      word-break: break-all;
    }

    ul.menu-list a.is-active {
      background-color: #55be6f;
    }
    ol {
      margin-left: 30px;
    }

    @media screen and (min-width: 769px) {
      .columns {
        margin-top: 0.75em;
      }

      .column.sidebar {
        max-height: 100%;
        overflow-y: auto;
      }
    }

    @media screen and (max-width: 768px) {
      ${Re.sidebarStyles()}
    }

    .gutter.gutter-vertical:hover {
      cursor: row-resize;
    }

    .gutter.gutter-horizontal:hover {
      cursor: col-resize;
    }

    `)}static sidebarStyles(e=a.b``){return a.b`
    ${e} .columns {
      position: relative;
    }

    ${e} .column.sidebar {
      overflow-y: auto;
      margin-top: 0.75em;
    }

    ${e} .column.main-content {
      position: relative;
      overflow-y: auto;

      border-top: 1px solid black;

      height: 100%;
    }

    ${e} .menu {
      font-size: 0.80rem;
    }`}render(){const e=this.currList;return a.c`
    <div class="is-sr-only" role="heading" aria-level="${this.isSidebar?"2":"1"}">
      Story for ${this.collInfo.title}
    </div>
    <div class="columns">
      <div class="column sidebar is-one-fifth">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <a href="#list-0" data-list="0" class="${0===e?"is-active":""} menu-label is-size-4"
                @click=${this.onClickScroll}>${this.collInfo.title}</a>
              <ul class="menu-list">${this.collInfo.lists.map(t=>a.c`
                <li>
                  <a @click=${this.onClickScroll} href="#list-${t.id}"
                  data-list="${t.id}" 
                  class="${e===t.id?"is-active":""}">${t.title}</a>
                </li>`)}
              </ul>
            </li>
          </ul>
        </aside>
      </div>
      <div @scroll=${this.onScroll} class="column main-content main-scroll">
        <section id="list-0" class="desc">
          <h2 class="has-text-centered title is-3">${this.collInfo.title}</h2>
          ${this.collInfo.desc?Object(Le.b)(Pe()(this.collInfo.desc)):""}
        </section>
        ${this.renderLists()}
      </div>
    </div>
  `}renderLists(){return a.c`
    ${this.collInfo.lists.map(e=>a.c`
    <article id="list-${e.id}">
      <div class="content">
        <hr/>
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <ol>
          ${this.curatedPageMap[e.id]?this.curatedPageMap[e.id].map(e=>this.renderCPage(e)):a.c``}
        </ol>
      </div>
    </article>
    `)}`}renderCPage(e){const t=new Date(e.ts),i=S(t.toISOString());return a.c`
    <li>
      <div class="content">
        <a @click="${this.onReplay}" data-url="${e.url}" data-ts="${i}"
          href="${C("story",e.url,i)}">
          <p class="is-size-6 has-text-weight-bold has-text-link">${e.title}</p>
          <p class="has-text-dark">${e.url}</p>
        </a>
        <p>${t.toLocaleString()}</p>
        <p>${e.desc}</p>
      </div>
      <hr/>
    </li>`}onReplay(e){e.preventDefault();const t={url:e.currentTarget.getAttribute("data-url"),ts:e.currentTarget.getAttribute("data-ts")};return this.sendChangeEvent(t),!1}sendChangeEvent(e){this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:e}}))}onClickScroll(e){return e.preventDefault(),this.currList=Number(e.currentTarget.getAttribute("data-list")),this.scrollToList(),!1}scrollToList(){this.currList>this.collInfo.lists.length&&(this.currList=0);const e={behavior:"smooth",block:"nearest",inline:"nearest"};this.clickTime=(new Date).getTime();const t=this.renderRoot.getElementById("list-"+this.currList);t&&t.scrollIntoView(e)}onScroll(e){const t=e.currentTarget,i=this.renderRoot.getElementById("list-"+this.currList);if(!i)return;let a=i;const r=t.offsetTop,o=t.scrollTop;if(o>this.lastST)for(;a.nextElementSibling&&a.nextElementSibling.getBoundingClientRect().top<r;)a=a.nextElementSibling;else for(;a.previousElementSibling&&a.previousElementSibling.getBoundingClientRect().bottom>=r;)a=a.previousElementSibling;if(this.lastST=o,a&&a!=i&&a.id.startsWith("list-")&&(this.currList=Number(a.id.slice(5))),(new Date).getTime()-this.clickTime<1e3)return;const n=this.renderRoot.querySelector(`a[data-list="${this.currList}"]`);if(n){const e={behavior:"smooth",block:"nearest",inline:"nearest"};n.scrollIntoView(e)}}}customElements.define("wr-coll-story",Re);var Ue=i(240),Me=i.n(Ue);class je extends a.a{constructor(){super(),this.state="trypublic",this.sourceUrl="",this.scriptLoaded=!1,this.error=!1}static get properties(){return{state:{type:String},sourceUrl:{type:String},error:{type:Boolean},reauth:{type:Boolean}}}updated(e){e.has("sourceUrl")&&(this.error=!1,this.state="trypublic",this.tryPublicAccess().then(e=>{e||(this.state="tryauto",this.requestUpdate())}))}async tryPublicAccess(){try{const e=this.sourceUrl,t=e.slice("googledrive://".length),i=`${__HELPER_PROXY__}/g/${t}`;let a=null;try{a=await fetch(i)}catch(e){return!1}const r=await a.json();if(!r.url||!r.name||!r.size)return!1;if(r.size>15e6)return!1;const o=r.url;try{const e=new AbortController,t=e.signal;if(a=await fetch(o,{signal:t}),e.abort(),200!=a.status)return!1}catch(e){return!1}const n=r.name,s={publicUrl:o},l=Number(r.size);return this.dispatchEvent(new CustomEvent("load-ready",{detail:{name:n,extra:s,size:l,sourceUrl:e}})),!0}catch(e){return!1}}onLoad(){this.scriptLoaded=!0,this.gauth("none",e=>{e.error?"implicitonly"!==this.state&&(this.state="trymanual"):this.authed(e)})}onClickAuth(){this.gauth("select_account",e=>{e.error||this.authed(e)})}async authed(e){const t=this.sourceUrl,i="https://www.googleapis.com/drive/v3/files/"+t.slice("googledrive://".length),a={Authorization:"Bearer "+e.access_token},r=await fetch(i+"?fields=name,size&supportsAllDrives=true",{headers:a});if(404===r.status||403==r.status)return"implicitonly"!==this.state&&(this.state="trymanual"),void(this.error=!0);this.error=!1;const o=await r.json(),n=o.name,s=Number(o.size);this.dispatchEvent(new CustomEvent("load-ready",{detail:{sourceUrl:t,headers:a,size:s,name:n}}))}static get styles(){return f(a.b``)}render(){return a.c`
    ${this.script()}
    ${"trymanual"!==this.state?a.c`
    <p>Connecting to Google Drive...</p>
    `:a.c`
    ${this.error?a.c`
    <div class="error has-text-danger">
      <p>${this.reauth?"Some resources are loaded on demand from Google Drive, which requires reauthorization.":"Could not access this file with the current Google Drive account."}</p>
      <p>If you have multiple Google Drive accounts, be sure to select the correct one.</p>
    </div>
    <br/>
    `:""}
    <button class="button is-warning is-rounded" @click="${this.onClickAuth}">
    <span class="icon"><fa-icon .svg="${Me.a}"></fa-icon></span>
    <span>Authorize Google Drive</span>
    </button>
    `}`}script(){if("trypublic"===this.state||this.scriptLoaded)return a.c``;const e=document.createElement("script");return e.onload=()=>this.onLoad(),e.src="https://apis.google.com/js/platform.js",e}gauth(e,t){self.gapi.load("auth2",()=>{self.gapi.auth2.authorize({client_id:__GDRIVE_CLIENT_ID__,scope:"https://www.googleapis.com/auth/drive.file",response_type:"token",prompt:e},t)})}}customElements.define("wr-gdrive",je);class Ne extends a.a{constructor(){super(),this.progress=0,this.total=0,this.percent=0,this.coll="",this.state="waiting",this.loadInfo=null,this.currentSize=0,this.totalSize=0,this.tryFileHandle=!!window.showOpenFilePicker,this.fileHandle=null,this.errorAllowRetry=!1,this.pingInterval=""}static get properties(){return{sourceUrl:{type:String},loadInfo:{type:Object},state:{type:String},progress:{type:Number},percent:{type:Number},currentSize:{type:Number},totalSize:{type:Number},error:{type:String},total:{type:Number},status:{type:String},coll:{type:String},embed:{type:String},tryFileHandle:{type:Boolean},errorAllowRetry:{type:Boolean}}}firstUpdated(){this.initMessages()}initMessages(){navigator.serviceWorker&&navigator.serviceWorker.addEventListener("message",e=>{switch(e.data.msg_type){case"collProgress":if(e.data.name===this.coll){if(this.percent=e.data.percent,e.data.error)if(this.error=e.data.error,this.state="errored",this.errorAllowRetry=!0,this.fileHandle=e.data.fileHandle,"missing_local_file"===this.error)this.tryFileHandle=!1;else if("permission_needed"===this.error&&e.data.fileHandle){this.state="permission_needed";break}e.data.currentSize&&e.data.totalSize&&(this.currentSize=e.data.currentSize,this.totalSize=e.data.totalSize)}break;case"collAdded":e.data.name===this.coll&&(this.total||(this.total=100),this.progress=this.total,this.percent=100,this.pingInterval&&clearInterval(this.pingInterval),this.dispatchEvent(new CustomEvent("coll-loaded",{detail:e.data})))}})}async doLoad(){let e=this.sourceUrl,t=null;if(this.percent=this.currentSize=this.totalSize=0,!navigator.serviceWorker)return this.state="errored","http:"===window.location.protocol?this.error=`Sorry, the ReplayWeb.page system must be loaded from an HTTPS URL, but was loaded from: ${window.location.host}.\nPlease try loading this page from an HTTPS URL`:this.error="Sorry, this browser is not supported. Please try a different browser\n(If you're using Firefox, try without Private Mode)",void(this.errorAllowRetry=!1);try{const{scheme:i,host:a,path:r}=function(e){let t=e.indexOf("://"),i=0,a="",r="",o="";return t>=0?(a=e.slice(0,t),t+=3):(t++,e.startsWith("//")&&(t+=2)),i=e.indexOf("/",t),i>0?(r=e.slice(t,i),o=e.slice(i)):(r=e.slice(t),o=""),{scheme:a,host:r,path:o}}(e);switch(i){case"googledrive":this.state="googledrive",t=await this.googledriveInit();break;case"s3":t={sourceUrl:e,loadUrl:`https://${a}.s3.amazonaws.com${r}`,name:this.sourceUrl};break;case"file":if(!this.loadInfo&&!this.tryFileHandle)return this.state="errored",this.error="File URLs can not be entered directly or shared.\nYou can select a file to upload from the main page by clicking the 'Choose File...' button.",void(this.errorAllowRetry=!1);t=this.loadInfo;break;case"ipfs":if(b){const i=new URL("http://files.archiveweb.page/"),a=e.split("#",1)[0];i.searchParams.set("ipfs",a.slice("ipfs://".length)),t={sourceUrl:e,loadUrl:i.href}}}}catch(e){console.log(e)}t||(t={sourceUrl:e}),t.newFullImport=this.loadInfo&&this.loadInfo.newFullImport,this.state="started";const i={msg_type:"addColl",name:this.coll,skipExisting:!0,file:t};this.loadInfo&&this.loadInfo.extraConfig&&(i.extraConfig=this.loadInfo.extraConfig),navigator.serviceWorker.controller||await new Promise(e=>{navigator.serviceWorker.addEventListener("controllerchange",()=>e())}),navigator.serviceWorker.controller.postMessage(i),this.pingInterval=setInterval(()=>{navigator.serviceWorker.controller.postMessage({msg_type:"ping"})},15e3)}googledriveInit(){return this._gdWait=new Promise(e=>this._gdResolve=e),this._gdWait}async onLoadReady(e){this._gdResolve&&this._gdResolve(e.detail)}onCancel(){navigator.serviceWorker&&navigator.serviceWorker.controller&&(navigator.serviceWorker.controller.postMessage({msg_type:"cancelLoad",name:this.coll}),this.pingInterval&&clearInterval(this.pingInterval))}updated(e){(this.sourceUrl&&e.has("sourceUrl")||e.has("tryFileHandle"))&&this.doLoad()}static get styles(){return f(a.b`
      :host {
        height: 100%;
        display: flex;
      }

      .logo {
        width: 96px;
        height: 96px;
        margin: 1em;
        flex-grow: 1;
      }

      .progress-div {
        position: relative;
        width: 400px !important;
      }

      .progress-label {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: calc(1.5rem / 1.5);
        line-height: 1.5rem;
      }

      .loaded-prog {
        margin-bottom: 1em;
      }

      .error {
        white-space: pre-wrap;
        margin-bottom: 2em;
      }

      section.container {
        margin: auto;
      }
    `)}render(){return a.c`
    <section class="container">
      <div class="has-text-centered is-flex">
        <wr-anim-logo class="logo" size="96px"/>
      </div>
      ${this.embed?"":a.c`
      <div class="level">
        <p class="level-item">Loading&nbsp;<b>${this.sourceUrl}</b>...</p>
      </div>`}
      <div class="level">
        <div class="level-item has-text-centered">
        ${this.renderContent()}
        </div>
      </div>
    </section>
    `}renderContent(){switch(this.state){case"googledrive":return a.c`<wr-gdrive .sourceUrl=${this.sourceUrl} @load-ready=${this.onLoadReady}/>`;case"started":return a.c`
          <div class="progress-div">
            <progress id="progress" class="progress is-primary is-large" 
            value="${this.percent}" max="100"></progress>
            <label class="progress-label" for="progress">${this.percent}%</label>
            ${this.currentSize&&this.totalSize?a.c`
              <p class="loaded-prog">Loaded <b>${M()(this.currentSize)}</b> of <b>${M()(this.totalSize)}</b></p>`:a.c``}

            ${this.embed?"":a.c`
            <button @click="${this.onCancel}" class="button is-danger">Cancel</button>`}
          </div>`;case"errored":return a.c`
          <div class="has-text-left">
          <div class="error has-text-danger">${this.error}</div>
          <div>
          ${this.errorAllowRetry?a.c`
          <a class="button is-warning" @click=${()=>window.parent.location.reload()}>Try Again</a>`:""}
          ${this.embed?a.c``:a.c`
          <a href="/" class="button is-warning">Back</a>`}
          </div>`;case"permission_needed":return a.c`
        <div class="has-text-left">
          <div class="">Permission is needed to reload the archive file. (Click <i>Cancel</i> to cancel loading this archive.)</div>
          <button @click="${this.onAskPermission}" class="button is-primary">Show Permission</button>
          <a href="/" class="button is-danger">Cancel</a>
        </div>`;case"waiting":default:return a.c`<progress class="progress is-primary is-large" style="max-width: 400px"/>`}}async onAskPermission(){"granted"===await this.fileHandle.requestPermission({mode:"read"})&&this.doLoad()}}customElements.define("wr-loader",Ne);var Oe=i(241),He=i.n(Oe),qe=i(242),Ge=i(243),We=i.n(Ge),Ke=i(244),Ve=i.n(Ke);class Ze extends a.a{constructor(){super(),this.filteredPages=[],this.sortedPages=[],this.query="",this.flex=null,this.textPages=null,this.newQuery=null,this.loading=!1,this.updatingSearch=!1,this.currList=0,this.active=!1,this.editable=!1,this.changeNeeded=!1,this.selectedPages=new Set,this.menuActive=!1,this.sortKey="date",this.sortDesc=!0,this.isSidebar=!1,this.url="",this.ts="",this.editing=!1,this.toDeletePages=null,this.toDeletePage=null}static get sortKeys(){return[{key:"",name:"Best Match"},{key:"title",name:"Title"},{key:"date",name:"Date"}]}static get properties(){return{active:{type:Boolean},collInfo:{type:Object},currList:{type:Number},filteredPages:{type:Array},sortedPages:{type:Array},query:{type:String},defaultKey:{type:String},loading:{type:Boolean},updatingSearch:{type:Boolean},editable:{type:Boolean},selectedPages:{type:Set},allSelected:{type:Boolean},menuActive:{type:Boolean},sortKey:{type:String},sortDesc:{type:Boolean},isSidebar:{type:Boolean},url:{type:String},ts:{type:String},editing:{type:Boolean},toDeletePages:{type:Object},toDeletePage:{type:Object}}}_timedUpdate(){null!==this.newQuery&&(this.query=this.newQuery,this.newQuery=null,this.filter())}async updated(e){if(e.has("collInfo")?this.updateTextSearch():(e.has("query")||e.has("currList"))&&this.filter(),e.has("active")&&this.active&&this.changeNeeded&&this.filter(),e.has("query")){this.query?(this.sortKey="",this.sortDesc=!1):(this.sortKey="date",this.sortDesc=!0);const e=this.renderRoot.querySelector("wr-sorter");e&&(e.sortKey=this.sortKey,e.sortDesc=this.sortDesc)}if(e.has("sortedPages")&&this.isSidebar){const e=this.renderRoot.querySelector(".current");if(e){const t={behavior:"smooth",block:"nearest",inline:"nearest"};setTimeout(()=>e.scrollIntoView(t),100)}}}onChangeQuery(e){this.newQuery=e.currentTarget.value,this._ival&&window.clearTimeout(this._ival),this._ival=window.setTimeout(()=>this._timedUpdate(),250)}async filter(){if(this.loading)return;if(this.active||(this.changeNeeded=!0),this.loading=!0,this.flex&&this.query&&this.textPages){const e=await this.flex.searchAsync(this.query,25);this.filteredPages=e.map(e=>this.textPages[e])}else this.filteredPages=[...this.collInfo.pages];0!==this.currList&&await this.filterCurated();for(const e of this.filteredPages){const{timestamp:t,date:i}=$(e);e.timestamp=t,e.date=i}this.loading=!1,this.changeNeeded=!1;const e={query:this.query,currList:this.currList};this.sendChangeEvent(e)}async filterCurated(){const e=await fetch(`${this.collInfo.apiPrefix}/curated/${this.currList}`),t=(await e.json()).curated;this.filteredPages=t}sendChangeEvent(e){this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:e}}))}addPages(e){const t=new qe.Index;return this.flex=t,this.textPages=e,Promise.all(e.map((e,i)=>{let a=e.url;return e.title&&(a+=" "+e.title),e.text&&(a+=" "+e.text),t.addAsync(i,a)}))}async updateTextSearch(){if(this.updatingSearch)return;this.updatingSearch=!0;let e=0;try{const t=await caches.open("cache:"+this.collInfo.coll),i=this.collInfo.apiPrefix+"/textIndex";let a=await t.match(i);a&&Number(a.headers.get("Content-Length"))||(a=await fetch(this.collInfo.apiPrefix+"/textIndex"),200===a.status&&Number(a.headers.get("Content-Length"))&&t.put(i,a.clone()));const r=[];for await(const t of He()(a.body.getReader()))t.text&&(t.id=++e,r.push(t));await this.addPages(r)}catch(e){console.warn(e)}finally{0===e&&await this.addPages(this.collInfo.pages),this.updatingSearch=!1}await this.filter()}static get styles(){return f(a.b`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        min-width: 0px;
        flex-direction: column;
        box-sizing: border-box !important;
      }

      div[role="main"], #contents div[role="complementary"] {
        height: 100%;
      }

      .main.columns {
        width: 100%;
        justify-self: stretch;
        min-height: 0px;
        margin: 0px;
      }

      .header.columns {
        width: 100%;
        margin-bottom: 0px;
      }
      .header a {
        color: black;
      }

      .header .column.pagetitle {
        margin-left: 2.5em;
      }

      .column.main-content {
        min-height: 0px;
        display: flex;
        flex-direction: column;
        padding: 0px;
        margin-top: 0.5em;
        margin-left: 0.75em;
      }

      .index-bar {
        display: flex;
        flex-direction: column;
        border-right: 3px solid rgb(237, 237, 237);
        background-color: whitesmoke;
        padding-right: 0px;
        position: relative;
      }

      .index-bar-title {
        font-size: 1.25rem;
        text-transform: uppercase;
        margin-bottom: 1.0rem;
        word-break: break-word;
      }

      .index-bar-title:hover + .editIcon {
        display: block;
      }

      .editIcon {
        display: none;
        position: absolute;
        right: 8px;
        top: 8px;
      }

      .index-bar-status {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.5rem;
        padding-right: 0.75em;
      }

      .index-bar-menu {
        margin-top: 1.0rem;
      }

      #filter-label {
        margin-bottom: 0px;
      }

      .num-results {
        font-style: italic;
        font-weight: normal;
        line-height: 2.5;
      }

      .asc:after {
        content: "▼";
        font-size: 0.75em;
      }
      .desc:after {
        content: "▲";
        font-size: 0.75em;
      }

      @media screen and (min-width: 769px) {
        .main.columns {
          max-height: 100%;
          height: 100%;
        }
        .index-bar-menu {
          max-height: 100%;
          overflow-y: auto;
        }
      }

      @media screen and (max-width: 768px) {
        ${Ze.sidebarStyles()}
      }

      ${Ze.sidebarStyles(a.d`:host(.sidebar)`)}

      .mobile-lists {
        display: block !important;
      }

      :host(.sidebar) .columns.is-hidden-mobile, :host(.sidebar) .is-hidden-mobile {
        display: none !important;
      }

      :host(.sidebar) .mobile-header {
        display: flex !important;
      }

      :host(.sidebar) .columns {
        display: flex !important;
      }

      .scroller {
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        flex: auto;

        padding-bottom: 1.0em;
        min-height: 0px;
      }

      .page-entry {
        padding-bottom: 1.5rem;
      }

      .selected {
        background-color: rgb(207, 243, 255);
      }

      .is-disabled {
        pointer-events: none;
        opacity: .65;
      }

      .page-header {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        width: 100%;
        min-height: fit-content;

        margin-bottom: 1.0em;
        border-bottom: 3px solid rgb(237, 237, 237);
      }

      .check-select {
        padding: 0 1.0em 0 0.5em;
      }

      .search-bar {
        width: auto;
        display: flex;
        flex-direction: column;
      }
      .flex-auto {
        flex: auto;
      }
    `)}static sidebarStyles(e=a.b``){return a.b`
    ${e} .main.columns {
      position: relative;
      max-height: 100%;
      height: 100%;
    }

    ${e} .index-bar-menu {
      max-height: 75px;
      overflow-y: auto;
      margin-top: 0.75em;
    }

    ${e} .column.main-content {
      position: relative;
      overflow-y: auto;

      width: 100%;
      min-height: 0px;
      height: 100%;
      padding: 0px;
      margin: 0px;
    }

    ${e} .mobile-header {
      margin: 0.5rem;
      margin-left: 1.0rem;
      align-items: center;
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      min-height: 24px;
      width: 100%;
    }

    ${e} .menu {
      font-size: 0.80rem;
    }`}onSelectList(e){e.preventDefault(),this.currList=Number(e.currentTarget.getAttribute("data-list"))}onSelectListDrop(e){e.preventDefault(),this.currList=Number(e.currentTarget.value)}render(){const e=this.currList;return a.c`
    <div class="is-sr-only" role="heading" aria-level="${this.isSidebar?"2":"1"}">
      Pages in ${this.collInfo.title}
    </div>
    <div class="search-bar notification is-marginless">
      ${this.isSidebar?a.c`<h3 class="is-sr-only">Search and Filter Pages</h3>`:""}
      <div class="field flex-auto">
        <div class="control has-icons-left ${this.loading?"is-loading":""}">
          <input type="search" class="input" @input="${this.onChangeQuery}" .value="${this.query}" type="text"
          placeholder="Search by Page URL, Title or Text">
          <span class="icon is-left"><fa-icon .svg="${K.a}" aria-hidden="true"></fa-icon></span>
        </div>
      </div>
    </div>
    <div class="main columns">
      <div class="column index-bar is-one-fifth is-hidden-mobile">

        ${this.editable&&this.editing?a.c`
        <form @submit="${this.onUpdateTitle}"><input id="titleEdit" class="input" value="${this.collInfo.title}" @blur="${this.onUpdateTitle}"></form>
        `:a.c`
        <div class="index-bar-title" @dblclick="${()=>this.editing=!0}">${this.collInfo.title}</div>`}

        ${this.editable?a.c`<fa-icon class="editIcon" .svg="${Ve.a}"></fa-icon>`:a.c``}

        <span class="num-results" aria-live="polite" aria-atomic="true">${this.formatResults()}</span>

        ${this.editable?a.c`
        <div class="index-bar-actions">
          ${this.renderDownloadMenu()}
        </div>`:""}

        ${this.collInfo.lists.length?a.c`
        <p id="filter-label" class="menu-label">Filter By List:</p>
        <div class="index-bar-menu menu">
          <ul class="menu-list">
            <li>
              <a href="#list-0" data-list="0" class="${0===e?"is-active":""}"
                @click=${this.onSelectList}><i>All Pages</i></a>
            </li>
            ${this.collInfo.lists.map(t=>a.c`
              <li>
                <a @click=${this.onSelectList} href="#list-${t.id}"
                data-list="${t.id}"
                class="${e===t.id?"is-active":""}">${t.title}</a>
              </li>`)}
          </ul>
        </div>
        `:""}
      </div>
      <div class="column main-content">
        <div class="is-sr-only" role="heading" aria-level="${this.isSidebar?"3":"2"}">Page List</div>
        ${this.renderPages()}
      </div>
    </div>
    ${this.renderDeleteModal()}
    `}renderDownloadMenu(){return a.c`
      <div class="dropdown ${this.menuActive?"is-active":""}">
        <div class="dropdown-trigger">
          <button @click="${this.onMenu}" class="button is-small" aria-haspopup="true" aria-expanded="${this.menuActive}" aria-controls="dropdown-menu">
            <span>Download</span>
            <span class="icon is-small">
              <fa-icon .svg="${We.a} aria-hidden="true"></fa-icon>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu">
          <div class="dropdown-content">
            <a role="button" href="#"
             @click="${e=>this.onDownload(e,"wacz")}"
             @keyup="${p}"
             class="dropdown-item">
              Download ${0===this.selectedPages.size?"All":"Selected"} as WACZ (Web Archive Collection Zip)
            </a>
            <a role="button" href="#"
             @click="${e=>this.onDownload(e,"warc")}"
             @keyup="${p}"
             class="dropdown-item">
              Download ${0===this.selectedPages.size?"All":"Selected"} as WARC 1.1 Only
            </a>
            <a role="button" href="#"
              @click="${e=>this.onDownload(e,"warc1.0")}"
              @keyup="${p}"
              class="dropdown-item">
              Download ${0===this.selectedPages.size?"All":"Selected"} as WARC 1.0 Only
            </a>
          </div>
        </div>
      </div>`}renderPageHeader(){return a.c`
    ${!this.isSidebar&&this.editable&&this.filteredPages.length?a.c`
    <div class="check-select">
      <label class="checkbox">
      <input @change=${this.onSelectAll} type="checkbox" .checked="${this.allSelected}">
      </label>
    </div>`:a.c``}

    <div class="header columns is-hidden-mobile">
      ${this.query?a.c`
      <a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="" class="column is-1 ${""===this.sortKey?this.sortDesc?"desc":"asc":""}">Match</a>`:""}

      <a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="date" class="column is-2 ${"date"===this.sortKey?this.sortDesc?"desc":"asc":""}">Date</a>
      <a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="title" class="column is-6 pagetitle ${"title"===this.sortKey?this.sortDesc?"desc":"asc":""}">Page Title</a>
    </div>

    <div class="is-hidden-tablet mobile-header">
      <div class="num-results" aria-live="polite" aria-atomic="true">${this.formatResults()}</div>
      <wr-sorter id="pages"
      .sortKey="${this.sortKey}"
      .sortDesc="${this.sortDesc}"
      .sortKeys="${Ze.sortKeys}"
      .data="${this.filteredPages}"
      pageResults="100"
      @sort-changed="${this.onSortChanged}"
      class="${this.filteredPages.length?"":"is-hidden"}">
      </wr-sorter>
    </div>
    `}renderDeleteModal(){return this.toDeletePages?a.c`
    <wr-modal bgClass="has-background-grey-lighter" @modal-closed="${()=>this.toDeletePages=this.toDeletePage=null}" title="Confirm Delete">
      ${this.toDeletePage?a.c`
      <p>Are you sure you want to delete the page <b>${this.toDeletePage.title}</b>?
      (Size: <b>${M()(this.toDeletePage.size)}</b>)</p>`:a.c`
      <p>Are you sure you want to delete the <b>${this.toDeletePages.size}</b> selected pages?
      `}
      <p>This operation can not be undone.</p>

      <button @click="${this.onDeletePages}"class="button is-danger">Delete</button>
      <button @click="${()=>this.toDeletePages=this.toDeletePage=null}" class="button">Cancel</button>
    </wr-modal>`:a.c``}isCurrPage(e){if(this.isSidebar&&e.url===this.url){let t=e.timestamp;return!t&&e.date?t=S(e.date):"string"==typeof e.ts&&(t=S(e.ts)),t===this.ts}return!1}renderPages(){return a.c`
      <div class="page-header has-text-weight-bold">
      ${this.renderPageHeader()}
      </div>
      <ul class="scroller" @scroll="${this.onScroll}">
        ${this.sortedPages.length?a.c`
          ${this.sortedPages.map((e,t)=>{const i=this.selectedPages.has(e.id);return a.c`
          <li class="page-entry ${i?"selected":""}">
            <wr-page-entry
            .index="${this.query||this.isSidebar?t+1:0}"
            .editable="${this.editable}"
            .selected="${i}"
            .isCurrent="${this.isCurrPage(e)}"
            .isSidebar="${this.isSidebar}"
            .page="${e}"
            pid="${e.id}"
            @sel-page="${this.onSelectToggle}"
            @delete-page="${this.onDeleteConfirm}"
            replayPrefix="${this.collInfo.replayPrefix}"
            query="${this.query}"
            class="${this.isSidebar?"sidebar":""}"
            >
            </wr-page-entry>
          </li>`})}`:a.c`<p class="mobile-header">${this.getNoResultsMessage()}</p>`}
      </ul>
    `}onUpdateTitle(e){if(e.preventDefault(),this.editing=!1,!this.editable)return;const t=this.renderRoot.querySelector("#titleEdit");if(!t||!t.value.trim())return;const i=t.value,a=JSON.stringify({title:i});fetch(this.collInfo.apiPrefix+"/metadata",{method:"POST",body:a}).then(e=>{200===e.status&&this.dispatchEvent(new CustomEvent("coll-update",{detail:{title:i}}))})}onMenu(e){e.stopPropagation(),this.menuActive=!this.menuActive,this.menuActive&&document.addEventListener("click",()=>{this.menuActive=!1},{once:!0})}onSort(e){e.preventDefault();const t=e.currentTarget.getAttribute("data-key")||"";t===this.sortKey?this.sortDesc=!this.sortDesc:(this.sortDesc=!1,this.sortKey=t)}onSortChanged(e){this.sortedPages=e.detail.sortedData,this.sortKey=e.detail.sortKey,this.sortDesc=e.detail.sortDesc}onSelectToggle(e){const{page:t,selected:i}=e.detail;i?this.selectedPages.add(t):this.selectedPages.delete(t),this.allSelected=this.selectedPages.size===this.sortedPages.length,this.requestUpdate()}onSelectAll(e){this.allSelected=e.currentTarget.checked,this.allSelected?this.sortedPages.forEach(e=>{this.selectedPages.add(e.id)}):this.selectedPages.clear(),this.requestUpdate()}async onDownload(e,t){e.preventDefault();const i=this.selectedPages.size>0,a=new URLSearchParams;a.set("pages",i?Array.from(this.selectedPages.keys()).join(","):"all"),a.set("format",t),this.collInfo.filename&&a.set("filename",this.collInfo.filename),window.location.href=this.collInfo.apiPrefix+"/dl?"+a.toString()}onDeleteConfirm(e){const t=e.currentTarget.page;this.selectedPages.has(t.id)?(this.toDeletePages=this.selectedPages,this.toDeletePage=null):(this.toDeletePages=[t.id],this.toDeletePage=t)}async onDeletePages(){const e={};for(const t of this.toDeletePages){const i=this.renderRoot.querySelector(`wr-page-entry[pid="${t}"]`);i&&(i.deleting=!0,e[t]=i)}for(const t of this.toDeletePages){const i=await fetch(`${this.collInfo.apiPrefix}/page/${t}`,{method:"DELETE"}),a=await i.json();if(a.error){console.warn(a.error);continue}const r=e[t];if(!r)continue;const o=this.collInfo.pages.indexOf(r);o<0||this.collInfo.pages.splice(o,1)}this.toDeletePages=null,this.toDeletePage=null,this.updateTextSearch(),this.requestUpdate()}formatResults(){return 1===this.sortedPages.length?"1 Page Found":this.sortedPages.length+" Pages Found"}getNoResultsMessage(){return this.collInfo&&this.collInfo.pages.length?this.updatingSearch?"Initializing Search...":this.loading?"Searching...":this.query?a.c`<span class="fix-text-wrapping">No matching pages found. Try changing the search query, or <a href="#view=resources">browse by URL</a>.</span>`:"No Pages Found":a.c`<span class="fix-text-wrapping">No Pages are defined in this archive. The archive may be empty. <a href="#view=resources">Try browsing by URL</a>.</span>`}onScroll(e){const t=e.currentTarget;if(t.scrollHeight-t.scrollTop-t.clientHeight<40){const e=this.renderRoot.querySelector("wr-sorter");e&&e.getMore()}}}customElements.define("wr-page-view",Ze);const Ye=new RegExp(`[${["-","[","]","/","{","}","(",")","*","+","?",".","\\","^","$","|"].join("\\")}]`,"g"),Qe=e=>e.replace(Ye,"\\$&");class Je extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["keywords","delimiter"]}get keywords(){var e;return null!==(e=this.getAttribute("keywords"))&&void 0!==e?e:""}set keywords(e){this.setAttribute("keywords",e)}get delimiter(){var e;return null!==(e=this.getAttribute("delimiter"))&&void 0!==e?e:""}set delimiter(e){this.setAttribute("delimiter",e)}attributeChangedCallback(e,t,i){"keywords"!==e&&"delimiter"!==e||i!==t&&this._render()}connectedCallback(){this._render(),this.__observer=new MutationObserver(()=>{this._render()}),this.__observer.observe(this,{childList:!0,characterData:!0,subtree:!0})}disconnectedCallback(){this.__observer&&(this.__observer.disconnect(),this.__observer=void 0)}_render(){if(!this.shadowRoot)return;const e=this.textContent||"",t=this.getAttribute("keywords"),i=this.getAttribute("delimiter")||/\s+/;if(!t)return void(this.shadowRoot.textContent=e);const a=e.toLowerCase(),r=t.toLowerCase().split(i).sort((e,t)=>t.length-e.length),o=new RegExp(""+r.map(Qe).join("|"),"gi"),n=e.split(o),s=document.createElement("div");let l=0;for(const t of n)if(s.appendChild(document.createTextNode(t)),l+=t.length,l<a.length){const t=a.substring(l),i=r.find(e=>t.startsWith(e));if(i){const t=document.createElement("mark");t.textContent=e.substr(l,i.length),s.appendChild(t),l+=i.length}}this.shadowRoot.innerHTML=`\n      <style>\n        mark {\n          color: var(--keyword-mark-color);\n          background: var(--keyword-mark-background, yellow);\n        }\n      </style>\n      ${s.innerHTML}\n    `}}customElements.define("keyword-mark",Je);class Xe extends a.a{constructor(){super(),this.query="",this.textSnippet="",this.page=null,this.replayPrefix="",this.deleting=!1,this.editable=!1,this.iconValid=!1,this.index=0,this.isCurrent=!1,this.isSidebar=!1}static get properties(){return{query:{type:String},textSnippet:{type:String},page:{type:Object},replayPrefix:{type:String},deleting:{type:Boolean},selected:{type:Boolean},editable:{type:Boolean},iconValid:{type:Boolean},index:{type:Number},isCurrent:{type:Boolean},isSidebar:{type:Boolean}}}static get styles(){return f(a.b`
      :host {
        min-height: min-content;
        width: 100%;
        word-break: break-all;
        position: relative;
        display: flex;
        flex-direction: row;
        background: transparent;
      }

      :host(.sidebar) .column {
        width: unset !important;
      }

      :host(.sidebar) {
        width: 100%;
      }

      .check-select {
        padding: 0 1.0em 0 0.5em;
        height: 100%;
        margin: auto 0 auto 0;
      }

      .columns {
        width: 100%;
      }

      /* Overrde Bulma to add the tiniest margin, so the focus indicator isn't obscured */
      .columns {
        margin-top: calc(-0.75rem + 2px);
      }
      .columns:last-child {
        margin-bottom: calc(-0.75rem + 2px);
      }


      .favicon {
        width: 24px !important;
        height: 24px !important;
        display: inline-block;
        vertical-align: text-bottom;
      }
      img.favicon {
        filter: drop-shadow(1px 1px 2px grey);
      }

      .media-left {
        align-self: center;
      }

      .delete-button {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .delete:hover {
        background-color: rgb(241, 70, 104);
      }

      .is-loading {
        line-height: 1.5em;
        height: 1.5em;
        border: 0px;
        background-color: transparent !important;
        width: auto;
      }

      @media screen and (max-width: 768px) {
        ${Xe.sidebarStyles()}
      }

      ${Xe.sidebarStyles(a.d`:host(.sidebar)`)}

      .current a {
        background-color: rgb(207, 243, 255);
        font-style: italic;
        display: block;
      }

      .current .curr-page {
        font-style: italic;
        font-size: 9px;
        color: black;
      }

      .is-inline-date {
        display: none;
      }

      .media-content a {
        display: block;
      }
    `)}static sidebarStyles(e=a.b``){return a.b`
    ${e} .col-date {
      margin-left: calc(24px + 1rem);
      display: none;
    }
    ${e} .col-date div {
      display: inline;
    }
    ${e} .col-index {
      position: absolute;
      top: 0px;
      left: 0px;
      margin-top: -0.75em;
    }
    ${e} .columns {
      display: flex;
      flex-direction: column-reverse;
    }
    ${e} .is-inline-date {
      display: initial !important;
      font-style: italic;
    }
    `}updated(e){(e.has("page")||e.has("query"))&&(this.updateSnippet(),this.iconValid=!!this.page.favIconUrl,this.deleting=!1)}render(){const e=this.page,t=this.page.date,i="number"==typeof e.size,r=this.editable&&!this.isSidebar;return a.c`
    ${r?a.c`
    <div class="check-select">
      <label class="checkbox">
      <input @change=${this.onSendSelToggle} type="checkbox" .checked="${this.selected}">
      </label>
    </div>`:""}

    <div class="columns">
      ${this.index?a.c`
      <div class="column col-index is-1 is-size-7">${this.index}.</div>
      `:""}
      <div class="column col-date is-2">
        <div>${t?t.toLocaleDateString():""}</div>
        <div>${t?t.toLocaleTimeString():""}</div>
      </div>
      <div class="column">
        <div class="media">
          <figure class="media-left">
            <p class="">
            ${this.iconValid?a.c`
              <img class="favicon" @error="${()=>this.iconValid=!1}" src="${this.replayPrefix}/${this.page.timestamp}id_/${e.favIconUrl}"/>`:a.c`
              <span class="favicon"></span>`}
            </p>
          </figure>
          <div class="media-content ${this.isCurrent?"current":""}">
            <div role="heading" aria-level="${this.isSidebar?"4":"3"}">
              <a @dblclick="${this.onReload}" @click="${this.onReplay}" href="${C("pages",this.page.url,this.page.timestamp)}">
              <p class="is-size-6 has-text-weight-bold has-text-link text">
              <keyword-mark keywords="${this.query}">${e.title||e.url}</keyword-mark>
              </p>
              <p class="has-text-dark text"><keyword-mark keywords="${this.query}">${e.url}</keyword-mark></p>
              <p class="has-text-grey-dark text is-inline-date">
                ${t?t.toLocaleString():""}
              </p>
            </a>
            ${this.textSnippet?a.c`
              <div class="text"><keyword-mark keywords="${this.query}">${this.textSnippet}</keyword-mark></div>`:a.c``}
          </div>
          ${i?a.c`
          <div class="media-right" style="margin-right: 2em">
            ${M()(e.size)}
          </div>`:""}
        </div>
      </div>
    </div>

    ${r?a.c`
      ${this.deleting?a.c`
      <button class="button is-loading delete-button is-static"></button>
      `:a.c`
      <button @click="${this.onSendDeletePage}" class="delete delete-button"></button>`}`:""}
    `}async updateFavIcon(){if(!this.page.favIconUrl)return void(this.favIconData=null);const e=await fetch(`${this.replayPrefix}/${this.page.timestamp}id_/${this.page.favIconUrl}`);if(200!=e.status)return void(this.favIconData=null);const t=await e.arrayBuffer(),i=e.headers.get("content-type");try{this.favIconData=`data:${i};base64,${btoa(String.fromCharCode.apply(null,t))}`}catch(e){console.log(e),this.favIconData=null}}updateSnippet(){const e=this.textSnippet;if(!this.query||!this.page.text)return this.textSnippet=null,void this.requestUpdate("textSnippet",e);let t=this.page.text,i=this.query,a=t.indexOf(this.query);if(a<0){let r=t.toLowerCase(),o=i.toLowerCase();if(a=r.indexOf(o),a<0)return this.textSnippet=null,void this.requestUpdate("textSnippet",e);t=r,i=o}let r=a;a=Math.max(a-100,0),r=Math.min(r+200,t.length),0===a&&r===t.length?this.textSnippet=t:this.textSnippet="..."+t.slice(a,r)+"...",this.requestUpdate("textSnippet",e)}onReplay(e,t=!1){e.preventDefault();const i={url:this.page.url,ts:this.page.timestamp};return this.sendChangeEvent(i,t),!1}onReload(e){return this.onReplay(e,!0)}sendChangeEvent(e,t){this.dispatchEvent(new CustomEvent("coll-tab-nav",{bubbles:!0,composed:!0,detail:{data:e,reload:t}}))}onSendDeletePage(){const e=this.page;this.dispatchEvent(new CustomEvent("delete-page",{detail:{page:e}}))}onSendSelToggle(e){const t=this.page.id,i=e.currentTarget.checked;this.dispatchEvent(new CustomEvent("sel-page",{detail:{page:t,selected:i}}))}}customElements.define("wr-page-entry",Xe);class et extends a.a{constructor(){super(),this.replayUrl="",this.replayTS="",this.url="",this.ts="",this.title="",this.collInfo=null,this.showAuth=!1,this.reauthWait=null,this.authFileHandle=null}static get properties(){return{collInfo:{type:Object},sourceUrl:{type:String},url:{type:String},ts:{type:String},replayUrl:{type:String},replayTS:{type:String},title:{type:String},iframeUrl:{type:String},showAuth:{type:Boolean},authFileHandle:{type:Object}}}firstUpdated(){window.addEventListener("message",e=>this.onReplayMessage(e)),navigator.serviceWorker.addEventListener("message",e=>this.handleAuthMessage(e))}async handleAuthMessage(e){if("authneeded"===e.data.type&&this.collInfo&&e.data.coll===this.collInfo.coll){if(e.data.fileHandle){this.authFileHandle=e.data.fileHandle;try{if("granted"===await this.authFileHandle.requestPermission({mode:"read"}))return this.showAuth=!1,this.reauthWait=null,void this.refresh()}catch(e){console.warn(e)}}else this.authFileHandle=null;this.reauthWait?await this.reauthWait:this.showAuth=!0}}doSetIframeUrl(){this.iframeUrl=this.url?`${this.collInfo.replayPrefix}/${this.ts||""}mp_/${this.url}`:""}updated(e){if((e.has("sourceUrl")||e.has("collInfo"))&&(this.reauthWait=null),!this.url||this.replayUrl==this.url&&this.replayTS==this.ts||!e.has("url")&&!e.has("ts")||(this.replayUrl=this.url,this.replayTS=this.ts,this.showAuth=!1,this.reauthWait=null,this.doSetIframeUrl()),this.iframeUrl&&e.has("iframeUrl")){this.waitForLoad();const e={title:"Archived Page",replayTitle:!1};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}if(this.replayUrl&&e.has("replayUrl")){const e={url:this.replayUrl,ts:this.replayTS};this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{replaceLoc:!0,data:e}}))}}setDisablePointer(e){const t=this.renderRoot.querySelector("iframe");t&&(t.style.pointerEvents=e?"none":"all")}onReplayMessage(e){const t=this.renderRoot.querySelector("iframe");if(t&&e.source===t.contentWindow)if("load"===e.data.wb_type||"replace-url"===e.data.wb_type){if(this.replayTS=e.data.ts,this.replayUrl=e.data.url,this.title=e.data.title||this.title,this.clearLoading(t.contentWindow),e.data.icons){const t=e.data.icons;this.dispatchEvent(new CustomEvent("replay-favicons",{bubbles:!0,composed:!0,detail:{icons:t}}))}}else"title"===e.data.wb_type&&(this.title=e.data.title);if(this.title){const e={title:this.title,replayTitle:!0};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}}onReAuthed(e){this.reauthWait=(async()=>{if(this.authFileHandle){if("granted"!==await this.authFileHandle.requestPermission({mode:"read"}))return void(this.reauthWait=null);this.authFileHandle=null}else{const t=e.detail.headers;await fetch(this.collInfo.apiPrefix+"/updateAuth",{method:"POST",body:JSON.stringify({headers:t})})}this.showAuth&&(this.showAuth=!1,this.reauthWait=null),this.refresh()})()}waitForLoad(){this.setLoading(),this._loadPoll=window.setInterval(()=>{const e=this.renderRoot.querySelector("iframe");e&&e.contentDocument&&e.contentWindow&&("complete"!==e.contentDocument.readyState||e.contentWindow._WBWombat)||this.clearLoading(e&&e.contentWindow)},5e3)}clearLoading(e){this.dispatchEvent(new CustomEvent("replay-loading",{detail:{loading:!1}})),this._loadPoll&&(window.clearInterval(this._loadPoll),this._loadPoll=null),e&&e.addEventListener("beforeunload",()=>{this.setLoading()})}setLoading(){this.dispatchEvent(new CustomEvent("replay-loading",{detail:{loading:!0}}))}refresh(){const e=this.renderRoot.querySelector("iframe");if(!e)return;const t=this.iframeUrl;this.doSetIframeUrl(),t!==this.iframeUrl&&this.url!==this.replayUrl||(this.waitForLoad(),e.contentWindow.location.reload())}static get styles(){return f(a.b`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .iframe-container {
        position: relative;
        width: 100%;
        height: 100%;
        border: 0px;
      }

      .iframe-main {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
      }

      .intro-panel .panel-heading {
        font-size: 1.0em;
        display: inline-block;
      }

      .iframe-main.modal-bg {
        z-index: 200;
        background-color: rgba(10, 10, 10, 0.70)
      }

      #wrlogo {
        vertical-align: middle;
      }

      .intro-panel .panel-block {
        padding: 1.0em;
        flex-direction: column;
        line-height: 2.5em;
      }

      div.intro-panel.panel {
        min-width: 40%;
        display: flex;
        flex-direction: column;
        margin: 3em;
        background-color: white;
      }
    `)}render(){const e=`Replay of ${this.title?this.title+":":""} ${this.url}`;return a.c`

    <h1 id="replay-heading" class="is-sr-only">${e}</h1>

    ${this.iframeUrl?a.c`

      <div class="iframe-container">
        <iframe class="iframe-main" @message="${this.onReplayMessage}" allow="autoplay 'self'; fullscreen" allowfullscreen
        src="${this.iframeUrl}" title="${e}"></iframe>

        ${this.showAuth?a.c`
        <div class="iframe-main modal-bg">
          <div class="panel intro-panel">
            <p class="panel-heading">
              <fa-icon id="wrlogo" size="1.5rem" .svg=${u.a} aria-hidden="true"></fa-icon>
              Authorization Needed
            </p>
            <div class="panel-block">
              ${this.authFileHandle?a.c`
              <p>This archive is loaded from a local file: <b>${this.authFileHandle.name}</b></p>
              <p>The browser needs to confirm your permission to continue loading from this file.</p>
              <button class="button is-warning is-rounded" @click="${this.onReAuthed}">Show Confirmation</button>
              `:a.c`
              <wr-gdrive
                .sourceUrl="${this.sourceUrl}"
                .state="trymanual"
                .reauth="${!0}"
                @load-ready="${this.onReAuthed}"/>`}
            </div>
          </div>
        </div>
        `:""}
      </div>
    `:a.c`
      <div class="panel intro-panel">
        <p class="panel-heading">Replay Web Page</p>
        <div class="panel-block">
          <p>Enter a URL above to replay it from the web archive!</p>
          <p>(Or, check out <a href="#view=pages">Pages</a> or <a href="#view=resources">URLs</a> to explore the contents of this archive.)</p>
        </div>
      </div>`}`}}customElements.define("wr-coll-replay",et);var tt=i(245),it=i.n(tt),at=i(246),rt=i.n(at);class ot extends a.a{constructor(){super(),this.sortedData=[],this.data=[],this.pageResults=0,this.numResults=0,this.sortKey=null,this.sortDesc=null}static get properties(){return{id:{type:String},pageResults:{type:Number},data:{type:Array},sortedData:{type:Array},sortKey:{type:String},sortDesc:{type:Boolean}}}firstUpdated(){if(this.id){const e=localStorage.getItem(this.id+":sortKey");null!==e&&(this.sortKey=e);const t=localStorage.getItem(this.id+":sortDesc");null!==t&&(this.sortDesc="1"===t)}}updated(e){const t=e.has("sortKey"),i=e.has("sortDesc"),a=e.has("data");t&&null!==this.sortKey&&localStorage.setItem(this.id+":sortKey",this.sortKey),i&&null!==this.sortDesc&&localStorage.setItem(this.id+":sortDesc",this.sortDesc?"1":"0"),(t||i||a)&&this.sortData()}sortData(){this.sortedData=[...this.data],this.numResults=this.pageResults,""===this.sortKey?this.sortDesc&&this.sortedData.reverse():this.sortedData.sort((e,t)=>e[this.sortKey]===t[this.sortKey]?0:this.sortDesc==e[this.sortKey]<t[this.sortKey]?1:-1),this.sendSortChanged()}sendSortChanged(){const e={sortKey:this.sortKey,sortDesc:this.sortDesc,sortedData:this.numResults?this.sortedData.slice(0,this.numResults):this.sortedData};this.dispatchEvent(new CustomEvent("sort-changed",{detail:e}))}getMore(e=100){this.pageResults&&this.numResults>=this.sortedData.length||(this.numResults+=e,this.sendSortChanged())}static get styles(){return f(a.b`
      :host {
        min-width: 100px;
        box-sizing: border-box !important;
      }
      button.button.is-small {
        border-radius: 4px;
      }
    `)}render(){return a.c`
    <div class="select is-small">
      <select id="sort-select" @change=${e=>this.sortKey=e.currentTarget.value}>
      ${this.sortKeys.map(e=>a.c`
        <option value="${e.key}" ?selected="${e.key===this.sortKey}">Sort By: ${e.name}
        </option>
      `)}
      </select>
    </div>
    <button @click=${()=>this.sortDesc=!this.sortDesc} class="button is-small">
      <span>Order:</span>
      <span class="is-sr-only">${this.sortDesc?"Ascending":"Descending"}</span>
      <span class="icon"><fa-icon aria-hidden="true" .svg=${this.sortDesc?rt.a:it.a}></span>
    </button>`}}customElements.define("wr-sorter",ot);class nt extends a.a{static get filters(){return[{name:"HTML",filter:"text/html,text/xhtml"},{name:"Images",filter:"image/"},{name:"Audio/Video",filter:"audio/,video/"},{name:"PDF",filter:"application/pdf"},{name:"Javascript",filter:"application/javascript,application/x-javascript"},{name:"CSS",filter:"text/css"},{name:"Fonts",filter:"font/,application/font-woff"},{name:"Plain Text",filter:"text/plain"},{name:"JSON",filter:"application/json"},{name:"DASH/HLS",filter:"application/dash+xml,application/x-mpegURL,application/vnd.apple.mpegurl"},{name:"All URLs",filter:""}]}static get sortKeys(){return[{key:"url",name:"URL"},{key:"ts",name:"Date"},{key:"mime",name:"Mime Type"},{key:"status",name:"Status"}]}constructor(){super(),this.collInfo=null,this.isSidebar=!1,this.currMime="",this.query="",this.urlSearchType="",this.filteredResults=[],this.sortedResults=[],this.results=[],this.newQuery=null,this.tryMore=!1,this.loading=!1,this.sortKey="url",this.sortDesc=!1}static get properties(){return{collInfo:{type:Object},isSidebar:{type:Boolean},currMime:{type:String},query:{type:String},urlSearchType:{type:String},filteredResults:{type:Array},sortedResults:{type:Array},loading:{type:Boolean},sortKey:{type:String},sortDesc:{type:Boolean}}}firstUpdated(){""===this.urlSearchType&&(this.urlSearchType="prefix")}_timedUpdate(){null!==this.newQuery&&(this.query=this.newQuery,this.newQuery=null)}updated(e){if(e.has("query")||e.has("urlSearchType")||e.has("currMime")){this.doLoadResources();const t={query:this.query,urlSearchType:this.urlSearchType,currMime:this.currMime},i=!e.has("currMime")&&!e.has("urlSearchType");this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{replaceLoc:i,data:t}}))}(e.has("sortKey")||e.has("sortDesc"))&&this.filter()}async doLoadResources(e=!1){if(e&&(!this.tryMore||!this.results.length))return;if(this.loading)return;this.loading=!0;let t="contains"!==this.urlSearchType?this.query:"";const i=t&&"prefix"===this.urlSearchType?1:0;t&&!t.startsWith("http")&&(t="https://"+t);const a=this.currMime,r=new URLSearchParams({mime:a,url:t,prefix:i,count:100});if(e){const e=this.results[this.results.length-1];r.set("fromMime",e.mime),r.set("fromUrl",e.url),r.set("fromStatus",e.status),r.set("fromTs",new Date(e.date).getTime())}let o=await fetch(`${this.collInfo.apiPrefix}/urls?${r.toString()}`);o=await o.json(),this.results=e?this.results.concat(o.urls):o.urls,this.tryMore=o.urls.length>=100,this.filter(),this.loading=!1}onChangeTypeSearch(e){this.currMime=e.currentTarget.value}onChangeQuery(e){this.newQuery=e.currentTarget.value,this._ival&&window.clearTimeout(this._ival),this._ival=window.setTimeout(()=>this._timedUpdate(),250)}onClickUrlType(e){this.urlSearchType=e.currentTarget.value}filter(){const e=[],t="contains"===this.urlSearchType?this.query:"";for(const i of this.results)(!t||i.url.indexOf(t)>=0)&&e.push(i);this.filteredResults=e}onScroll(e){const t=e.currentTarget,i=t.scrollHeight-t.scrollTop-t.clientHeight;this.tryMore&&i<40&&this.doLoadResources(!0)}static get styles(){return f(a.b`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      min-width: 0px;
      flex-direction: column;
    }
    :host(.sidebar) .is-hidden-tablet {
      display: flex !important;
    }

    :host(.sidebar) .is-hidden-mobile {
      display: none !important;
    }

    :host(.sidebar) .level, :host(.sidebar) .level-left, :host(.sidebar) .level-right {
      display: block !important;
    }

    :host(.sidebar) .columns {
      display: flex !important;
      flex-direction: column;
    }

    :host(.sidebar) .column {
      width: 100% !important;
    }

    .notification {
      width: 100%;
    }
    .all-results {
      margin: 0 0 0 0.5em;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .main-scroll {
      flex-grow: 1;
    }
    .minihead {
      font-size: 10px;
      font-weight: bold;
    }
    .columns {
      margin: 0px;
    }
    thead {
      margin-bottom: 24px;
    }
    table th:not([align]) {
      text-align: left;
    }
    .result {
      border-bottom: 1px #dbdbdb solid;
      min-height: fit-content;
    }
    .results-head {
      border-bottom: 2px #dbdbdb solid;
      margin-right: 16px;
      min-height: fit-content;
      display: block;
      width: 100%;
    }
    .results-head a {
      color: black;
    }
    .all-results .column {
      word-break: break-word;
    }
    div.sort-header {
      padding: 10px;
      margin-bottom: 0px !important;
      min-height: fit-content;
    }
    .flex-auto {
      flex: auto;
    }
    .asc:after {
      content: "▼";
      font-size: 0.75em;
    }
    .desc:after {
      content: "▲";
      font-size: 0.75em;
    }
    .num-results {
      margin-left: 1em;
      font-style: italic;
    }
    `)}render(){return a.c`
    <div role="heading" aria-level="${this.isSidebar?"2":"1"}" class="is-sr-only">URLs in ${this.collInfo.title}</div>

    <div role="heading" aria-level="${this.isSidebar?"3":"2"}" class="is-sr-only">Search and Filter</div>
    <div class="notification level is-marginless">
      <div class="level-left flex-auto">
        <div class="level-item flex-auto">
          <span class="is-hidden-mobile">Search:&nbsp;&nbsp;</span>
          <div class="select">
            <select @change="${this.onChangeTypeSearch}">
            ${nt.filters.map(e=>a.c`
            <option value="${e.filter}"
            ?selected="${e.filter===this.currMime}">
            ${e.name}
            </option>
            `)}
            </select>
          </div>
          <div class="field flex-auto">
            <div class="control has-icons-left ${this.loading?"is-loading":""}">
              <input type="text" class="input" @input="${this.onChangeQuery}" .value="${this.query}" type="text" placeholder="Enter URL to Search">
              <span class="icon is-left"><fa-icon .svg="${K.a}"/></span>
            </div>
          </div>
        </div>
      </div>
      <div class="control level-right">
        <div style="margin-left: 1em" class="control">
          <label class="radio has-text-left"><input type="radio" name="urltype" value="contains" ?checked="${"contains"===this.urlSearchType}" @click="${this.onClickUrlType}">&nbsp;Contains</label>
          <label class="radio has-text-left"><input type="radio" name="urltype" value="prefix" ?checked="${"prefix"===this.urlSearchType}" @click="${this.onClickUrlType}">&nbsp;Prefix</label>
          <label class="radio has-text-left"><input type="radio" name="urltype" value="exact" ?checked="${"exact"===this.urlSearchType}" @click="${this.onClickUrlType}">&nbsp;Exact</label>
          <span id="num-results" class="num-results" is-pulled-right" aria-live="polite" aria-atomic="true">${this.filteredResults.length} Result(s)</span>
        </div>
      </div>
    </div>

    <div class="sort-header is-hidden-tablet">
      <wr-sorter id="urls"
        .sortKey="${this.sortKey}"
        .sortDesc="${this.sortDesc}"
        .sortKeys="${nt.sortKeys}"
        .data="${this.filteredResults}"
        @sort-changed="${this.onSortChanged}">
      </wr-sorter>
    </div>

    <div role="heading" aria-level="${this.isSidebar?"3":"2"}" id="results-heading" class="is-sr-only">Results</div>

    <table class="all-results" aria-labelledby="results-heading num-results">
      <thead>
        <tr class="columns results-head has-text-weight-bold">
          <th scope="col" class="column col-url is-6 is-hidden-mobile"><a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="url" class="${"url"===this.sortKey?this.sortDesc?"desc":"asc":""}">URL</a></th>
          <th scope="col" class="column col-ts is-2 is-hidden-mobile"><a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="ts" class="${"ts"===this.sortKey?this.sortDesc?"desc":"asc":""}">Date</a></th>
          <th scope="col" class="column col-mime is-3 is-hidden-mobile"><a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="mime" class="${"mime"===this.sortKey?this.sortDesc?"desc":"asc":""}">Mime Type</a></th>
          <th scope="col" class="column col-status is-1 is-hidden-mobile"><a role="button" href="#" @click="${this.onSort}" @keyup="${p}" data-key="status" class="${"status"===this.sortKey?this.sortDesc?"desc":"asc":""}">Status</a></th>
        </tr>
      </thead>

      <tbody class="main-scroll" @scroll="${this.onScroll}">
      ${this.sortedResults.length?this.sortedResults.map(e=>a.c`
          <tr class="columns result">
            <td class="column col-url is-6"><p class="minihead is-hidden-tablet">URL</p><a @click="${this.onReplay}" data-url="${e.url}" data-ts="${e.ts}" href="${C("resources",e.url,e.ts)}">
            <keyword-mark keywords="${this.query}">${e.url}</keyword-mark>
            </a></td>
            <td class="column col-ts is-2"><p class="minihead is-hidden-tablet">Date</p>${new Date(e.date).toLocaleString()}</td>
            <td class="column col-mime is-3"><p class="minihead is-hidden-tablet">Mime Type</p>${e.mime}</td>
            <td class="column col-status is-1"><p class="minihead is-hidden-tablet">Status</p>${e.status}</td>
          </tr>
        `):a.c`<tr class="section"><td colspan="4"><i>No Results Found.</i></td></tr>`}
      </tbody>
    </table>
      `}onSort(e){e.preventDefault();const t=e.currentTarget.getAttribute("data-key");t===this.sortKey?this.sortDesc=!this.sortDesc:(this.sortDesc=!1,this.sortKey=t)}onSortChanged(e){this.sortedResults=e.detail.sortedData,this.sortKey=e.detail.sortKey,this.sortDesc=e.detail.sortDesc}onReplay(e){e.preventDefault();const t={url:e.currentTarget.getAttribute("data-url"),ts:e.currentTarget.getAttribute("data-ts")};return this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:t}})),!1}}customElements.define("wr-coll-resources",nt);var st=document.currentScript&&document.currentScript.src;class lt extends a.a{constructor(){super(),this.replaybase="./replay/",this.swName="sw.js",this.view="replay",this.ts="",this.url="",this.query="",this.config="",this.coll="",this.paramString=null,this.deepLink=!1,this.swInited=!1,this.embed=null,this.reloadCount=0,this.noSandbox=!1}static get properties(){return{url:{type:String},ts:{type:String},query:{type:String},source:{type:String},view:{type:String},embed:{type:String},replaybase:{type:String},swName:{type:String},title:{type:String},coll:{type:String},config:{type:String},swInited:{type:Boolean},paramString:{type:String},hashString:{type:String},deepLink:{type:Boolean},noSandbox:{type:Boolean},errorMessage:{type:String}}}async doRegister(){try{await D(this.swName,this.replaybase),this.swInited=!0}catch(e){this.errorMessage=e}}firstUpdated(){this.doRegister(),window.addEventListener("message",e=>{const t=this.renderRoot.querySelector("iframe");if(t&&e.source===t.contentWindow){if(e.data.title&&(this.title=e.data.title),!this.deepLink)return;const t=new URLSearchParams(e.data),i=new URL(window.location.href);i.hash="#"+t.toString(),window.history.replaceState({},"",i)}}),this.deepLink&&(this.updateFromHash(),window.addEventListener("hashchange",()=>this.updateFromHash()))}updateFromHash(){const e=new URLSearchParams(window.location.hash.slice(1));e.has("url")&&(this.url=e.get("url")),e.has("ts")&&(this.ts=e.get("ts")),e.has("query")&&(this.query=e.get("query")),e.has("view")&&(this.view=e.get("view"))}updated(e){if(e.has("url")||e.has("ts")||e.has("query")||e.has("view")||e.has("source")){this.embed=this.embed||"default";const e=new URL(this.source,document.baseURI);this.paramString=new URLSearchParams({source:e,customColl:this.coll,config:this.config,basePageUrl:window.location.href.split("#")[0],embed:this.embed}).toString(),this.hashString=new URLSearchParams({url:this.url,ts:this.ts,query:this.query,view:this.view}).toString()}}static get styles(){return f(a.b`
      .logo {
        margin: 1em;
        flex-grow: 1;
      }
      .error {
        white-space: pre-wrap;
        text-align: center;
      }
      .full-width {
        width: 100%;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: 0px;
        padding: 0px;
        margin: 0px;
      }
      :host {
        width: 100%;
        height: 100%;
      }
    `)}render(){return a.c`
    ${this.paramString&&this.hashString&&this.swInited?a.c`
      <iframe sandbox="${e=this.noSandbox?void 0:"allow-downloads allow-modals allow-orientation-lock allow-pointer-lock         allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts         allow-same-origin allow-forms",null!=e?e:o.c}"

      @load="${this.onLoad}" src="${this.replaybase}?${this.paramString}#${this.hashString}" allow="autoplay *; fullscreen"
      title="Replay of ${this.title?this.title+":":""} ${this.url}"></iframe>

      `:a.c``}

    ${this.errorMessage?a.c`
      <section class="full-width">
        <div class="has-text-centered">
          <fa-icon class="logo" id="wrlogo" size="2.5rem" .svg=${u.a} aria-hidden="true"></fa-icon>
        </div>
        <div class="error">${this.errorMessage}</div>
      </section>
    `:""}`;var e}onLoad(e){const t=e.target.contentWindow,i=e.target.contentDocument;if(t.navigator.serviceWorker&&!t.navigator.serviceWorker.controller&&this.reloadCount<=2)return this.reloadCount++,void setTimeout(()=>t.location.reload(),100);if(this.reloadCount=0,t.customElements.get("replay-app-main"))return;const a=i.createElement("script");a.src=st,i.head.appendChild(a)}}!async function(){customElements.define("replay-web-page",lt)}();var ct=i(104),dt=i.n(ct),ut=i(247),ht=i.n(ut),ft=i(248),bt=i.n(ft),pt=i(117),mt=i.n(pt),gt=i(249),vt=i.n(gt),wt=i(105),xt=i.n(wt),kt=i(28),yt=i.n(kt);class Dt extends Z{constructor(){super(),this.detailed=!1,this.ipfsURL=null,this.shareWait=!1,this.showShareMenu=!1,this.shareWarn=!1,this.shareProgress=0}static get properties(){return{coll:{type:Object},detailed:{type:Boolean},ipfsURL:{type:String},shareWait:{type:Boolean},showShareMenu:{type:Boolean},shareWarn:{type:Boolean},shareProgress:{type:Number}}}static get styles(){return f(Dt.compStyles)}static get compStyles(){return a.b`
    :host {
      overflow: visible;
    }

    .columns {
      width: 100%;
    }
    .column {
      word-break: break-word;
      position: relative;
    }

    :host {
      width: 100%;
      height: 100%;
      min-width: 0px;
    }

    :host(.is-list) .columns {
      display: flex !important;
      flex-direction: column;
    }

    :host(.is-list) .column {
      width: 100% !important;
    }

    .minihead {
      font-size: 10px;
      font-weight: bold;
    }

    .button-row {
      align-items: center;
      flex-wrap: wrap;
    }

    .button-row *:not(:last-child) {
      margin-right: 0.5em;
    }

    .progress.is-small.mini {
      height: 2px;
      margin-top: 2px;
      width: calc(100% - 0.5em);
    }

    ${Z.compStyles}
    `}firstUpdated(){this.renderRoot.addEventListener("click",()=>this.showShareMenu=!1)}updated(e){e.has("coll")&&this.coll&&("main.archive"===this.coll.id&&"local://main.archive"!==this.coll.sourceUrl&&(this.coll={...this.coll,sourceUrl:"local://main.archive"}),this.coll.ipfsPins&&this.coll.ipfsPins.length&&(this.ipfsURL=this.coll.ipfsPins[this.coll.ipfsPins.length-1].url))}render(){const e=this.coll,t=this.detailed,i=localStorage.getItem("ipfsLocalURL");return a.c`
      <div class="columns">
        <div class="column is-2">
          <p class="minihead">Title</p>
          <span class="subtitle has-text-weight-bold">
            ${t?a.c`
            ${e.title}
            `:a.c`
            <a href="?source=${encodeURIComponent(e.sourceUrl)}">${e.title}</a>`}
          </span>
        </div>

        <div class="column is-2"><p class="minihead">Date Created</p>${e.ctime?new Date(e.ctime).toLocaleString():""}</div>
        <div class="column is-1"><p class="minihead">Total Size</p>
        ${M()(Number(e.size||0))}
        </div>

        <div class="column is-2">
          <p class="minihead">Actions</p>
          <div class="button-row is-flex">
            <button @click="${this.onDownload}" class="button is-small" title="Download">
              <span class="icon is-small">
                <fa-icon aria-hidden="true" .svg="${ht.a}"></fa-icon>
              </span>
            </button>
            <button @click="${this.onShowImport}" class="button is-small" title="Import Archive...">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${P.a}"></fa-icon>
              </span>
            </button>
            <button @click="${this.onShowStart}" class="button is-small" title="Start Recording...">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${yt.a}"></fa-icon>
              </span>
            </button>
          </div>
        </div>
        
        <div class="column">
          <p class="minihead">Sharing (via IPFS)</p>
          <div class="button-row is-flex">
            ${this.ipfsURL?a.c`

              <div class="is-flex is-flex-direction-column">
                <div class="dropdown is-up ${this.showShareMenu?"is-active":""}">
                  <div class="dropdown-trigger">
                    <button @click="${this.onShowShareMenu}" class="button is-link is-light is-small ${this.shareWait?"is-loading":""}"" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>Sharing!</span>
                      <span class="icon">
                        <fa-icon .svg=${bt.a}></fa-icon>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu" style="z-index: 100">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <i class="is-size-7">${i?"Sharing via local IPFS on "+i:"Sharing via in-browser IPFS"}</i>
                      </div>
                      <hr class="dropdown-divider"/>
                      <a @click="${this.onPin}" class="dropdown-item">
                        <span class="icon is-small">
                          <fa-icon .svg="${vt.a}"></fa-icon>
                        </span>
                        Reshare Latest
                      </a>
                      <hr class="dropdown-divider"/>
                      <a @click="${this.onCopyIPFSLink}" class="dropdown-item">
                        <span class="icon is-small">
                          <fa-icon size="0.8em" .svg="${mt.a}"></fa-icon>
                        </span>
                        Copy IPFS URL
                      </a>
                      <a @click="${this.onCopyRWPLink}" class="has-text-weight-bold dropdown-item">
                        <span class="icon is-small">
                          <fa-icon size="0.8em" .svg="${mt.a}"></fa-icon>
                        </span>
                        Copy Shareable ReplayWeb.page Link
                      </a>
                    </div>
                  </div>
                </div>
                <progress value="${this.shareProgress}" max="${e.size}" class="progress is-small ${this.shareProgress?"mini":"is-hidden"}"></progress>
              </div>

              <button class="button is-small" @click="${this.onUnpin}">
                <span class="icon is-small">
                  <fa-icon .svg="${xt.a}"></fa-icon>
                </span>
                <span>Stop Sharing</span>
              </button>

              `:a.c`
            
              <div class="is-flex is-flex-direction-column">
                <button class="button is-small ${this.shareWait?"is-loading":""}" @click="${this.onPinOrWarn}">
                  <span class="icon is-small">
                    <fa-icon .svg="${mt.a}"></fa-icon>
                  </span>
                  <span>Start Sharing</span>
                </button>
                <progress value="${this.shareProgress}" max="${e.size}" class="progress is-small ${this.shareProgress?"mini":"is-hidden"}"></progress>
              </div>
            `}
          </div>
        </div>
        ${e.loadUrl?a.c`
        <div class="column is-3">
        <p class="minihead">Imported From</p>
        ${e.loadUrl}
        <a @click="${t=>this.onCopy(t,e.loadUrl)}" class="copy"><fa-icon .svg="${N.a}"/></a>
        </div>`:""}
      </div>
      ${this.shareWarn?this.renderShareWarn():""}
      `}renderShareWarn(){return a.c`
    <wr-modal bgClass="has-background-warning" @modal-closed="${()=>this.shareWarn=!1}" title="Start Sharing?">
      <div class="content is-size-7">
        <p>
          Do you want to share the all the pages in the archive "<i>${this.coll.title}</i>" via IPFS, a peer-to-peer
          distributed storage network?
        </p>
        <p>Your archive will have a unique link which can be shared with others to load your archive
        via ReplayWeb.page. All archived data is loaded on-demand when replayed. This feature is experimental and likely works best with smaller archives.</p>
        <p>You can cancel sharing at anytime. 
        </p>
        <p><b>Once shared, this data leaves your computer and could be read by others.</b></p>
        <p>If you do not wish to share this data, click Cancel.</p>
      </div>
      <div class="content">
        <label class="checkbox" for="sharewarn">
          <input @change="${this.toggleShareWarn}" type="checkbox">
          Don't show this message again
        </label>
      </div>
      <button @click="${this.onPin}"class="button is-primary">Share</button>
      <button @click="${()=>this.shareWarn=!1}" class="button">Cancel</button>
    </wr-modal>`}onDownload(){const e=new URLSearchParams;e.set("format","wacz"),e.set("pages","all"),window.location.href=`/replay/./w/api/c/${this.coll.id}/dl?`+e.toString()}onShowImport(){const e=this.coll.id,t=this.coll.title;this.dispatchEvent(new CustomEvent("show-import",{bubbles:!0,composed:!0,detail:{coll:e,title:t}}))}onShowShareMenu(e){e.preventDefault(),e.stopPropagation(),this.showShareMenu=!this.showShareMenu}onShowStart(){const e=this.coll.id,t=this.coll.title;this.dispatchEvent(new CustomEvent("show-start",{bubbles:!0,composed:!0,detail:{coll:e,title:t}}))}toggleShareWarn(e){localStorage.setItem("nosharewarn",e.currentTarget.checked?"1":"0")}onPinOrWarn(){"1"===localStorage.getItem("nosharewarn")?this.onPin():this.shareWarn=!0}async onPin(){this.shareWarn=!1,this.shareWait=!0;const e=await this.ipfsApi(this.coll.id,!0);e.ipfsURL&&(this.ipfsURL=e.ipfsURL),this.onCopyGatewayLink(),this.shareWait=!1}async onUnpin(){this.shareWait=!0;(await this.ipfsApi(this.coll.id,!1)).removed&&(this.ipfsURL=null),this.shareWait=!1}ipfsApi(e,t){if(this.dispatchEvent(new CustomEvent("ipfs-share",{detail:{pending:!0}})),window.archivewebpage){const e=e=>{e.size?this.shareProgress=e.size:(this.shareProgress=0,this.dispatchEvent(new CustomEvent("ipfs-share",{detail:{pending:!1}})))};return t?window.archivewebpage.ipfsPin(this.coll.id,e):window.archivewebpage.ipfsUnpin(this.coll.id)}return new Promise(i=>{const a=chrome.runtime.connect({name:"share-port"});a.onMessage.addListener(e=>{e.progress?this.shareProgress=e.size:(this.shareProgress=0,this.dispatchEvent(new CustomEvent("ipfs-share",{detail:{pending:!1}})),i(e))}),a.onDisconnect.addListener(()=>{console.log("port disconnected")}),a.postMessage({collId:e,pin:t})})}onCopyRWPLink(){const e=new URLSearchParams;e.set("source",this.ipfsURL);const t="https://replayweb.page/?"+e.toString();this.showShareMenu=!1,navigator.clipboard.writeText(t)}onCopyGatewayLink(){const e=`https://dweb.link/ipfs/${this.ipfsURL.split("/")[2]}/`;this.showShareMenu=!1,navigator.clipboard.writeText(e)}onCopyIPFSLink(){const e=this.ipfsURL.slice(0,this.ipfsURL.lastIndexOf("/")+1);this.showShareMenu=!1,navigator.clipboard.writeText(e)}async doDelete(){this.coll.ipfsPins&&this.coll.ipfsPins.length&&await this.ipfsApi(this.coll.id,!1);const e=await fetch("./w/api/c/"+this.coll.id,{method:"DELETE"});if(200===e.status){const t=await e.json();this.colls=t.colls}}}customElements.define("wr-rec-coll",class extends Ie{renderExtraToolbar(e=!1){return e?"":a.c`
    <a href="#" role="button"
    class="${e?"dropdown-item is-hidden-tablet":"button narrow is-borderless"}"
      title="Start Recording" aria-label="Start Recording" aria-controls="record"
      @click="${this.onShowStart}" @keyup="${p}">
      <span class="icon is-small">
        <fa-icon size="1.2em" aria-hidden="true" .svg="${yt.a}"></fa-icon>
      </span>
    </a>`}renderCollInfo(){return a.c`
    <div class="info-bg">
      <wr-rec-coll-info
      class="is-list"
      .coll="${this.collInfo}"
      ?detailed="${!0}"
      ></wr-rec-coll-info>
    </div>`}onShowStart(){const e=this.coll,t=this.collInfo.title,i=this.tabData.url;this.dispatchEvent(new CustomEvent("show-start",{detail:{coll:e,title:t,url:i}}))}}),customElements.define("wr-rec-coll-info",Dt);customElements.define("wr-rec-coll-index",class extends V{constructor(){super(),this.deleteConfirm=null,this.ipfsSharePending=0}get sortKeys(){return[{key:"title",name:"Title"},{key:"ctime",name:this.dateName},{key:"mtime",name:"Date Modified"},{key:"size",name:"Total Size"},{key:"loadUrl",name:"Source"}]}firstUpdated(){this.loadColls(),this._poll=setInterval(()=>{this.ipfsSharePending||this.loadColls()},1e4)}updated(e){super.updated(e),e.has("sortedColls")&&this.dispatchEvent(new CustomEvent("colls-updated",{detail:{colls:this.sortedColls}}))}static get properties(){return{...V.properties,deleteConfirm:{type:Object}}}renderCollInfo(e){return a.c`
    <wr-rec-coll-info
      style="overflow: visible" data-coll="${e.id}" .coll=${e} @ipfs-share="${this.onIpfsShare}">
    </wr-rec-coll-info>`}render(){return a.c`
    ${super.render()}
    ${this.renderDeleteConfirm()}
    `}renderDeleteConfirm(){return this.deleteConfirm?a.c`
    <wr-modal bgClass="has-background-grey-lighter" @modal-closed="${()=>this.deleteConfirm=null}" title="Confirm Delete">
      <p>Are you sure you want to permanentely delete the archive <b>${this.deleteConfirm.title}</b>
      (Size: <b>${M()(this.deleteConfirm.size)}</b>)</p>
      <button @click="${this.doDelete}"class="button is-danger">Delete</button>
      <button @click="${()=>this.deleteConfirm=null}" class="button">Cancel</button>
    </wr-modal>`:null}onIpfsShare(e){e.detail.pending?this.ipfsSharePending++:this.ipfsSharePending--}onDeleteColl(e){if(e.preventDefault(),e.stopPropagation(),!this.sortedColls)return;const t=Number(e.currentTarget.getAttribute("data-coll-index"));this.deleteConfirm=this.sortedColls[t]}async doDelete(){if(!this.deleteConfirm)return;this._deleting[this.deleteConfirm.sourceUrl]=!0,this.requestUpdate();const e=this.renderRoot.querySelector(`wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`);e&&await e.doDelete(),this.deleteConfirm=null}renderEmpty(){return a.c`No Archives. Click "Create New" above to create a new archive and start recording!`}});var $t=i(189),St=i.n($t);class Ct extends L{constructor(){super(),this.navMenuShown=!1,this.showCollDrop=!1,this.colls=[],this.autorun="1"===localStorage.getItem("autorunBehaviors")}get appName(){return"ArchiveWeb.page"}static get properties(){return{...L.properties,showStartRecord:{type:Boolean},showCollDrop:{type:Boolean},colls:{type:Array},selCollId:{type:String},selCollTitle:{type:String},recordUrl:{type:String},autorun:{type:Boolean},showNew:{type:String},showImport:{type:Boolean},isImportExisting:{type:Boolean}}}initRoute(){this.inited=!0;const e=new URLSearchParams(window.location.search);this.sourceUrl=e.get("source")||""}onStartLoad(e){this.showImport=!1,this.sourceUrl=e.detail.sourceUrl,this.loadInfo=e.detail,this.isImportExisting&&this.selCollId&&(this.loadInfo.importCollId=this.selCollId)}onCollLoaded(e){super.onCollLoaded(e),!e.detail.alreadyLoaded&&e.detail.sourceUrl&&e.detail.sourceUrl!==this.sourceUrl&&(this.sourceUrl=e.detail.sourceUrl)}getLoadInfo(e){if(this.disableCSP(),this.loadInfo)return this.loadInfo;return{customColl:e.startsWith("local://")?e.slice("local://".length):e}}async disableCSP(){if(!self.chrome||!self.chrome.runtime)return;const e=navigator.userAgent.match(/Chrome\/([\d]+)/);if(!e||Number(e[1])<94)return;console.log("attempt to disable CSP to ensure replay works");let t=await new Promise(e=>{chrome.tabs.getCurrent(t=>e(t.id))});chrome.runtime.sendMessage({msg:"disableCSP",tabId:t})}static get styles(){return f(Ct.appStyles)}static get appStyles(){return f(a.b`
      :host {
        font-size: initial;
        overflow: auto;
      }

      wr-rec-coll {
        height: 100%;
        width: 100%;
      }

      .recorder .modal-background {
        background-color: rgba(10, 10, 10, 0.50);
      }

      .recorder .modal-card-head {
        background-color: #97a1ff;
      }

      .extra-padding {
        padding: 1.0em;
      }

      .less-padding {
        padding-top: 1.0em;
        padding-bottom: 1.0em;
      }

      div.field.has-addons {
        flex: auto;
      }

      form {
        flex-grow: 1;
        flex-shrink: 0;
        margin: 0px;
      }

      .dropdown-row {
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
      }

      .infomsg {
        margin-left: auto;
        max-width: 300px;
      }
  
      @media screen and (max-width: 768px) {
        #url {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }

        .no-pad-mobile {
          padding-right: 2px;
        }
      }

      ${L.appStyles}
    `)}get mainLogo(){return St.a}renderNavEnd(){return a.c`
    <a href="https://archiveweb.page/guide" target="_blank" class="navbar-item is-size-6">
    <fa-icon .svg="${E.a}" aria-hidden="true"></fa-icon><span>&nbsp;User Guide</span>

    <a href="?about" @click="${e=>{e.preventDefault(),this.showAbout=!0}}"class="navbar-item is-size-6">About
    </a>`}renderNavBrand(){return a.c`
      <span id="home" class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only">
      <span class="" style="color: #8878c3">archive</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`}renderHomeIndex(){return a.c`
      <section class="section less-padding">
        <div class="message is-small">
          <div class="message-body">
            <div class="buttons">
              <button class="button is-small no-pad-mobile" title="Create New..." @click="${()=>this.showNew="show"}">
                <span class="icon">
                  <fa-icon .svg=${dt.a}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Create New...</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Import Archive..." @click="${()=>this.showImport=!0}">
                <span class="icon">
                  <fa-icon .svg=${P.a}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Import Archive...</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Start Recording..." ?disabled="${!this.colls}" @click="${this.onShowStart}">
                <span class="icon">
                  <fa-icon size="1.0em" aria-hidden="true" .svg="${yt.a}"></fa-icon>
                </span>
                <span class="is-hidden-mobile">Start Recording...</span>
              </button>
              <div class="infomsg is-hidden-mobile">The ArchiveWeb.page ${b?"App":"Extension"} allows you to create web archives directly in your browser!</div>
            </div>
          </div>
        </div> 
      </section>

      <wr-rec-coll-index
       dateName="Date Created"
       headerName="Current Web Archives"
       @show-start=${this.onShowStart}
       @show-import=${this.onShowImport}
       @colls-updated=${this.onCollsLoaded}
       style="overflow: visible"
       >
      </wr-rec-coll-index>
     `}render(){return a.c`
    ${this.showStartRecord?this.renderStartModal():""}
    ${this.showNew?this.renderNewCollModal():""}
    ${this.showImport?this.renderImportModal():""}
    ${super.render()}`}renderColl(){return a.c`
    <wr-rec-coll 
    .editable="${!0}"
    .loadInfo="${this.getLoadInfo(this.sourceUrl)}"
    .appLogo="${this.mainLogo}"
    sourceUrl="${this.sourceUrl}"
    appName="${this.appName}"
    @replay-favicons=${this.onFavIcons}
    @update-title=${this.onTitle}
    @coll-loaded=${this.onCollLoaded}
    @show-start=${this.onShowStart}
    @show-import=${this.onShowImport}
    @about-show=${()=>this.showAbout=!0}></wr-rec-coll>`}renderCollList(e=""){return a.c`
    <div class="dropdown-row">
      <span>${e}&nbsp;</span>
      <div class="select is-small">
        <select @change="${this.onSelectColl}">
        ${this.colls&&this.colls.map(e=>a.c`
          <option value="${e.id}"
          ?selected="${this.selCollId===e.id}"
          >${e.title||e.loadUrl}</option>`)}
        </select>
      </div>
    </div>
    `}renderStartModal(){return a.c`
    <wr-modal @modal-closed="${()=>this.showStartRecord=!1}" title="Start Recording">
      ${this.renderCollList("Archive To:")}
      <div class="field">
        <label class="checkbox is-size-7">
        <input type="checkbox" ?checked="${this.autorun}" @change="${e=>this.autorun=e.currentTarget.checked}">
        Start With Autopilot
        </label>
      </div>

      <form class="is-flex is-flex-direction-column" @submit="${this.onStartRecord}">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="url" required
            name="url" id="url" value="${this.recordUrl}"
            placeholder="Enter a URL to Start Recording">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-outlined is-link">
              <span class="icon">
                <fa-icon size="1.0em" aria-hidden="true" .svg="${yt.a}"></fa-icon>
              </span>
              <span>Go!</span>
            </button>
          </div>
        </div>
        ${b?a.c`
        <label class="checkbox">
          <input id="preview" type="checkbox"><span>&nbsp;Start in Preview Mode (without recording.)</span>
        </label>`:""}
      </form>
    </wr-modal>`}renderNewCollModal(){return a.c`
    <wr-modal @modal-closed="${()=>this.showNew=null}" title="Create New Archive">
      <form @submit="${this.onNewColl}" class="create-new">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input type="text" id="new-title" name="new-title" class="input" required placeholder="Enter the title for the new archive">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-primary ${"loading"===this.showNew?"is-loading ":""}" ?disabled="${"loading"===this.showNew}">Create New</button>
          </div>
        </div>
      </form>
    </wr-modal`}renderImportModal(){return a.c`
    <wr-modal style="--modal-width: 740px" @modal-closed="${()=>this.showImport=!1}" title="Import an Existing Archive">
      <wr-chooser
        style="flex: auto"
        .newFullImport="${!0}"
        noHead="${!0}"
        @load-start=${this.onStartLoad}>
      </wr-chooser>
      <div class="is-flex is-flex-wrap-wrap is-align-items-baseline my-2">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" name="add-existing" .checked="${this.isImportExisting}" @change="${e=>this.isImportExisting=e.currentTarget.checked}">
            Add to an existing archive collection${this.isImportExisting?":":""}
          </label>
        </div>
        ${this.isImportExisting?this.renderCollList():""}
      </div>
    </wr-modal`}renderAbout(){return a.c`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ArchiveWeb.page ${b?"App":"Extension"}</p>
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${St.a}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${b?"App":"Extension"} v${"0.7.3"}</div>
                    </div>

                    ${b?a.c`
                    <p>ArchiveWeb.page App is a standalone app for Mac, Windows and Linux that allows users to create web archives as they browse</p>

                    `:a.c`
                    <p>ArchiveWeb.page allows users to create web archives directly in your browser!</p>`}
                  </div>

                  <p>See the <a href="https://archiveweb.page/guide" target="_blank">ArchiveWeb.page Guide</a> for more info on how to use this tool.</p>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/archiveweb.page" target="_blank">https://github.com/webrecorder/archiveweb.page</a>
                  </p>

                  <p>ArchiveWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>

                  <h3>Privacy Policy</h3>
                  <p class="is-size-7">ArchiveWeb.page allows users to archive what they browse, this archive data is stored directly in the browser.
                  Users can downloaded this data as files to their hardrive. Users can also delete any and all archived data at any time.
                  ArchiveWeb.page does not collect any usage or tracking data.</p>

                  <p class="is-size-7">ArchiveWeb.page includes an experimental sharing option for each. Users can choose to share select archives on a peer-to-peer network (IPFS) via a unique id.
                  Once shared, data may be accessible to others. (A seperate warning is displayed when sharing)
                  All Archives are private and not shared by default.</p>

                  <h4>Disclaimer of Warranties</h4>
                  <p class="is-size-7">The application is provided "as is" without any guarantees.</p>
                  <details class="is-size-7">
                    <summary>Legalese:</summary>
                    <p style="font-size: 0.8rem">DISCLAIMER OF SOFTWARE WARRANTY. WEBRECORDER SOFTWARE PROVIDES THIS SOFTWARE TO YOU "AS AVAILABLE"
                    AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR OTHERWISE,
                    INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                  </details>

                  <div class="has-text-centered">
                    <a class="button is-warning" href="#" @click="${this.onAboutClose}">Close</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>`}async onNewColl(e){this.showNew="loading",e.preventDefault();const t=this.renderRoot.querySelector("#new-title").value,i=JSON.stringify({metadata:{title:t}}),a=await fetch("./w/api/c/create",{method:"POST",body:i});await a.json();const r=this.renderRoot.querySelector("wr-rec-coll-index");r&&r.loadColls(),this.showNew=null}onSelectColl(e){this.selCollId=e.currentTarget.value}_setCurrColl(e){this.selCollId=e.coll,this.colls&&this.colls.length||(this.colls=[{id:e.coll,title:e.title}])}async onShowStart(e){this._setCurrColl(e.detail),this.recordUrl=e.detail.url||"https://example.com/",this.showStartRecord=!0}onShowImport(e){this._setCurrColl(e.detail),this.showImport=!0,this.isImportExisting=!0}onCollsLoaded(e){this.colls=e.detail.colls,this.selCollId=this.colls&&this.colls.length?this.colls[0].id:null}onStartRecord(e){e.preventDefault();const t=this.renderRoot.querySelector("#url").value;this.showStartRecord=!1;const i=this.autorun,a=this.selCollId;if(localStorage.setItem("autorunBehaviors",i?"1":"0"),self.chrome&&self.chrome.runtime)chrome.runtime.sendMessage({msg:"startNew",url:t,collId:a,autorun:i});else if(window.archivewebpage&&window.archivewebpage.record){const e=this.renderRoot.querySelector("#preview"),r=!(e&&e.checked);window.archivewebpage.record({url:t,collId:a,startRec:r,autorun:i})}return!1}}customElements.define("archive-web-page-app",Ct)},55:function(e,t,i){"use strict";i.d(t,"a",(function(){return o})),i.d(t,"b",(function(){return n}));var a=i(7),r=i(16);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class o extends r.a{constructor(e){if(super(e),this.it=a.c,e.type!==r.b.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===a.c||null==e)return this.ft=void 0,this.it=e;if(e===a.b)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}o.directiveName="unsafeHTML",o.resultType=1;const n=Object(r.c)(o)},58:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var a=i(16),r=i(55);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class o extends r.a{}o.directiveName="unsafeSVG",o.resultType=2;const n=Object(a.c)(o)},59:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>'},60:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>'},7:function(e,t,i){"use strict";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var a,r;i.d(t,"a",(function(){return D})),i.d(t,"b",(function(){return $})),i.d(t,"c",(function(){return S})),i.d(t,"d",(function(){return A}));const o=globalThis.trustedTypes,n=o?o.createPolicy("lit-html",{createHTML:e=>e}):void 0,s=`lit$${(Math.random()+"").slice(9)}$`,l="?"+s,c=`<${l}>`,d=document,u=(e="")=>d.createComment(e),h=e=>null===e||"object"!=typeof e&&"function"!=typeof e,f=Array.isArray,b=e=>{var t;return f(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},p=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,m=/-->/g,g=/>/g,v=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,w=/'/g,x=/"/g,k=/^(?:script|style|textarea)$/i,y=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),D=y(1),$=(y(2),Symbol.for("lit-noChange")),S=Symbol.for("lit-nothing"),C=new WeakMap,A=(e,t,i)=>{var a,r;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let n=o._$litPart$;if(void 0===n){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=n=new I(t.insertBefore(u(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n},z=d.createTreeWalker(d,129,null,!1),E=(e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":"",l=p;for(let t=0;t<i;t++){const i=e[t];let n,d,u=-1,h=0;for(;h<i.length&&(l.lastIndex=h,d=l.exec(i),null!==d);)h=l.lastIndex,l===p?"!--"===d[1]?l=m:void 0!==d[1]?l=g:void 0!==d[2]?(k.test(d[2])&&(r=RegExp("</"+d[2],"g")),l=v):void 0!==d[3]&&(l=v):l===v?">"===d[0]?(l=null!=r?r:p,u=-1):void 0===d[1]?u=-2:(u=l.lastIndex-d[2].length,n=d[1],l=void 0===d[3]?v:'"'===d[3]?x:w):l===x||l===w?l=v:l===m||l===g?l=p:(l=v,r=void 0);const f=l===v&&e[t+1].startsWith("/>")?" ":"";o+=l===p?i+c:u>=0?(a.push(n),i.slice(0,u)+"$lit$"+i.slice(u)+s+f):i+s+(-2===u?(a.push(void 0),t):f)}const d=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==n?n.createHTML(d):d,a]};class F{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,n=0;const c=e.length-1,d=this.parts,[h,f]=E(e,t);if(this.el=F.createElement(h,i),z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=z.nextNode())&&d.length<c;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(s)){const i=f[n++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split(s),t=/([.?@])?(.*)/.exec(i);d.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?T:"?"===t[1]?P:"@"===t[1]?R:L})}else d.push({type:6,index:r})}for(const t of e)a.removeAttribute(t)}if(k.test(a.tagName)){const e=a.textContent.split(s),t=e.length-1;if(t>0){a.textContent=o?o.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],u()),z.nextNode(),d.push({type:2,index:++r});a.append(e[t],u())}}}else if(8===a.nodeType)if(a.data===l)d.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(s,e+1));)d.push({type:7,index:r}),e+=s.length-1}r++}}static createElement(e,t){const i=d.createElement("template");return i.innerHTML=e,i}}function _(e,t,i=e,a){var r,o,n,s;if(t===$)return t;let l=void 0!==a?null===(r=i._$Cl)||void 0===r?void 0:r[a]:i._$Cu;const c=h(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,a)),void 0!==a?(null!==(n=(s=i)._$Cl)&&void 0!==n?n:s._$Cl=[])[a]=l:i._$Cu=l),void 0!==l&&(t=_(e,l._$AS(e,t.values),l,a)),t}class B{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:a}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:d).importNode(i,!0);z.currentNode=r;let o=z.nextNode(),n=0,s=0,l=a[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new I(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new U(o,this,e)),this.v.push(t),l=a[++s]}n!==(null==l?void 0:l.index)&&(o=z.nextNode(),n++)}return r}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class I{constructor(e,t,i,a){var r;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cg=null===(r=null==a?void 0:a.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=_(this,e,t),h(e)?e===S||null==e||""===e?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==$&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):b(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==S&&h(this._$AH)?this._$AA.nextSibling.data=e:this.S(d.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:a}=e,r="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=F.createElement(a.h,this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.m(i);else{const e=new B(r,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=C.get(e.strings);return void 0===t&&C.set(e.strings,t=new F(e)),t}M(e){f(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new I(this.A(u()),this.A(u()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class L{constructor(e,t,i,a,r){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=_(this,e,t,0),o=!h(e)||e!==this._$AH&&e!==$,o&&(this._$AH=e);else{const a=e;let n,s;for(e=r[0],n=0;n<r.length-1;n++)s=_(this,a[i+n],t,n),s===$&&(s=this._$AH[n]),o||(o=!h(s)||s!==this._$AH[n]),s===S?e=S:e!==S&&(e+=(null!=s?s:"")+r[n+1]),this._$AH[n]=s}o&&!a&&this.k(e)}k(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class T extends L{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===S?void 0:e}}class P extends L{constructor(){super(...arguments),this.type=4}k(e){e&&e!==S?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class R extends L{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=_(this,e,t,0))&&void 0!==i?i:S)===$)return;const a=this._$AH,r=e===S&&a!==S||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==S&&(a===S||r);r&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class U{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){_(this,e)}}null===(a=globalThis.litHtmlPlatformSupport)||void 0===a||a.call(globalThis,F,I),(null!==(r=globalThis.litHtmlVersions)&&void 0!==r?r:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5")},70:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}}}));