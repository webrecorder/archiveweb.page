/*! ui.js is part of the Webrecorder ArchiveWeb.page (https://archiveweb.page) Copyright (C) 2020-2024, Webrecorder Software. Licensed under the Affero General Public License v3. */(()=>{var e={4536:(e,t,i)=>{"use strict";i.d(t,{A:()=>n});var a=i(1601),r=i.n(a),o=i(6314),s=i.n(o)()(r());s.push([e.id,'.input::placeholder,.textarea::placeholder,.select select::placeholder{opacity:1}a:focus{color:#363636}.file-label:focus-within .file-cta{background-color:#e8e8e8;color:#363636}.button.is-primary:focus,.button.is-primary:hover,.button.is-primary:active{background-color:#459558 !important;color:white !important}.replay-bar .button{margin:0 1px}.replay-bar .button:focus{box-shadow:none !important;outline:1px dotted #4876ff;outline:-webkit-focus-ring-color auto 1px}.skip-link{border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute !important;width:1px;word-wrap:normal !important}.skip-link:focus{background-color:black;border-radius:3px;box-shadow:0 0 2px 2px rgba(0,0,0,0.6);clip:auto !important;clip-path:none;color:white;display:block;font-family:inherit;font-size:1.3em;font-weight:bold;height:auto;left:5px;line-height:normal;padding:15px 23px 14px;text-decoration:none;top:5px;width:auto;z-index:100000}.main-scroll{flex:1;scroll-behavior:smooth;overflow-y:auto;max-height:100vh;height:100%;display:flex;flex-direction:column;overflow-x:hidden}/*! bulma.io v0.9.3 | MIT License | github.com/jgthms/bulma */.button,.input,.textarea,.select select,.file-cta,.file-name,.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.5em;justify-content:flex-start;line-height:1.5;padding-bottom:calc(0.5em - 1px);padding-left:calc(0.75em - 1px);padding-right:calc(0.75em - 1px);padding-top:calc(0.5em - 1px);position:relative;vertical-align:top}.button:focus,.input:focus,.textarea:focus,.select select:focus,.file-cta:focus,.file-name:focus,.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus,.pagination-ellipsis:focus,.is-focused.button,.is-focused.input,.is-focused.textarea,.select select.is-focused,.is-focused.file-cta,.is-focused.file-name,.is-focused.pagination-previous,.is-focused.pagination-next,.is-focused.pagination-link,.is-focused.pagination-ellipsis,.button:active,.input:active,.textarea:active,.select select:active,.file-cta:active,.file-name:active,.pagination-previous:active,.pagination-next:active,.pagination-link:active,.pagination-ellipsis:active,.is-active.button,.is-active.input,.is-active.textarea,.select select.is-active,.is-active.file-cta,.is-active.file-name,.is-active.pagination-previous,.is-active.pagination-next,.is-active.pagination-link,.is-active.pagination-ellipsis{outline:none}.button[disabled],.input[disabled],.textarea[disabled],.select select[disabled],.file-cta[disabled],.file-name[disabled],.pagination-previous[disabled],.pagination-next[disabled],.pagination-link[disabled],.pagination-ellipsis[disabled],fieldset[disabled] .button,fieldset[disabled] .input,fieldset[disabled] .textarea,fieldset[disabled] .select select,.select fieldset[disabled] select,fieldset[disabled] .file-cta,fieldset[disabled] .file-name,fieldset[disabled] .pagination-previous,fieldset[disabled] .pagination-next,fieldset[disabled] .pagination-link,fieldset[disabled] .pagination-ellipsis{cursor:not-allowed}.button,.file,.breadcrumb,.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis,.tabs,.is-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select:not(.is-multiple):not(.is-loading)::after,.navbar-link:not(.is-arrowless)::after{border:3px solid rgba(0,0,0,0);border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:0.625em}.box:not(:last-child),.content:not(:last-child),.notification:not(:last-child),.progress:not(:last-child),.table:not(:last-child),.table-container:not(:last-child),.title:not(:last-child),.subtitle:not(:last-child),.block:not(:last-child),.breadcrumb:not(:last-child),.level:not(:last-child),.message:not(:last-child),.pagination:not(:last-child),.tabs:not(:last-child){margin-bottom:1.5rem}.delete,.modal-close{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;background-color:rgba(10,10,10,0.2);border:none;border-radius:9999px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete::before,.modal-close::before,.delete::after,.modal-close::after{background-color:#fff;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.delete::before,.modal-close::before{height:2px;width:50%}.delete::after,.modal-close::after{height:50%;width:2px}.delete:hover,.modal-close:hover,.delete:focus,.modal-close:focus{background-color:rgba(10,10,10,0.3)}.delete:active,.modal-close:active{background-color:rgba(10,10,10,0.4)}.is-small.delete,.is-small.modal-close{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete,.is-medium.modal-close{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete,.is-large.modal-close{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading::after,.loader,.select.is-loading::after,.control.is-loading::after{animation:spinAround 500ms infinite linear;border:2px solid #dbdbdb;border-radius:9999px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.image.is-square img,.image.is-square .has-ratio,.image.is-1by1 img,.image.is-1by1 .has-ratio,.image.is-5by4 img,.image.is-5by4 .has-ratio,.image.is-4by3 img,.image.is-4by3 .has-ratio,.image.is-3by2 img,.image.is-3by2 .has-ratio,.image.is-5by3 img,.image.is-5by3 .has-ratio,.image.is-16by9 img,.image.is-16by9 .has-ratio,.image.is-2by1 img,.image.is-2by1 .has-ratio,.image.is-3by1 img,.image.is-3by1 .has-ratio,.image.is-4by5 img,.image.is-4by5 .has-ratio,.image.is-3by4 img,.image.is-3by4 .has-ratio,.image.is-2by3 img,.image.is-2by3 .has-ratio,.image.is-3by5 img,.image.is-3by5 .has-ratio,.image.is-9by16 img,.image.is-9by16 .has-ratio,.image.is-1by2 img,.image.is-1by2 .has-ratio,.image.is-1by3 img,.image.is-1by3 .has-ratio,.modal,.modal-background,.is-overlay,.hero-video{bottom:0;left:0;position:absolute;right:0;top:0}.navbar-burger{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0}/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:inherit}html{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,optgroup,select,textarea{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a{color:#4876ff;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{background-color:#f5f5f5;color:#da1039;font-size:.875em;font-weight:normal;padding:0.25em 0.5em 0.25em}hr{background-color:#f5f5f5;border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type="checkbox"],input[type="radio"]{vertical-align:baseline}small{font-size:.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}fieldset{border:none}pre{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{vertical-align:top}table td:not([align]),table th:not([align]){text-align:inherit}table th{color:#363636}@keyframes spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.box{background-color:#fff;border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);color:#4a4a4a;display:block;padding:1.25rem}a.box:hover,a.box:focus{box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0 0 1px #4876ff}a.box:active{box-shadow:inset 0 1px 2px rgba(10,10,10,0.2),0 0 0 1px #4876ff}.button{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding-bottom:calc(0.5em - 1px);padding-left:1em;padding-right:1em;padding-top:calc(0.5em - 1px);text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-small,.button .icon.is-medium,.button .icon.is-large{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-0.5em - 1px);margin-right:.25em}.button .icon:last-child:not(:first-child){margin-left:.25em;margin-right:calc(-0.5em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-0.5em - 1px);margin-right:calc(-0.5em - 1px)}.button:hover,.button.is-hovered{border-color:#b5b5b5;color:#363636}.button:focus,.button.is-focused{border-color:#485fc7;color:#363636}.button:focus:not(:active),.button.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.button:active,.button.is-active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text:hover,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text.is-focused{background-color:#f5f5f5;color:#363636}.button.is-text:active,.button.is-text.is-active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled],fieldset[disabled] .button.is-text{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-ghost{background:none;border-color:rgba(0,0,0,0);color:#4876ff;text-decoration:none}.button.is-ghost:hover,.button.is-ghost.is-hovered{color:#4876ff;text-decoration:underline}.button.is-white{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white:hover,.button.is-white.is-hovered{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white:focus,.button.is-white.is-focused{border-color:transparent;color:#0a0a0a}.button.is-white:focus:not(:active),.button.is-white.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.button.is-white:active,.button.is-white.is-active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled],fieldset[disabled] .button.is-white{background-color:#fff;border-color:transparent;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted:hover,.button.is-white.is-inverted.is-hovered{background-color:#000}.button.is-white.is-inverted[disabled],fieldset[disabled] .button.is-white.is-inverted{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined:hover,.button.is-white.is-outlined.is-hovered,.button.is-white.is-outlined:focus,.button.is-white.is-outlined.is-focused{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-white.is-outlined.is-loading:hover::after,.button.is-white.is-outlined.is-loading.is-hovered::after,.button.is-white.is-outlined.is-loading:focus::after,.button.is-white.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined[disabled],fieldset[disabled] .button.is-white.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined:hover,.button.is-white.is-inverted.is-outlined.is-hovered,.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined.is-focused{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined.is-loading:hover::after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-white.is-inverted.is-outlined.is-loading:focus::after,.button.is-white.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-white.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black:hover,.button.is-black.is-hovered{background-color:#040404;border-color:transparent;color:#fff}.button.is-black:focus,.button.is-black.is-focused{border-color:transparent;color:#fff}.button.is-black:focus:not(:active),.button.is-black.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.button.is-black:active,.button.is-black.is-active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled],fieldset[disabled] .button.is-black{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted:hover,.button.is-black.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-black.is-inverted[disabled],fieldset[disabled] .button.is-black.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined:hover,.button.is-black.is-outlined.is-hovered,.button.is-black.is-outlined:focus,.button.is-black.is-outlined.is-focused{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-outlined.is-loading:hover::after,.button.is-black.is-outlined.is-loading.is-hovered::after,.button.is-black.is-outlined.is-loading:focus::after,.button.is-black.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-black.is-outlined[disabled],fieldset[disabled] .button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined:hover,.button.is-black.is-inverted.is-outlined.is-hovered,.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined.is-focused{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading:hover::after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-black.is-inverted.is-outlined.is-loading:focus::after,.button.is-black.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light{background-color:#d2f9d6;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:hover,.button.is-light.is-hovered{background-color:#c7f8cc;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:focus,.button.is-light.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light:focus:not(:active),.button.is-light.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.button.is-light:active,.button.is-light.is-active{background-color:#bcf6c2;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-light[disabled],fieldset[disabled] .button.is-light{background-color:#d2f9d6;border-color:transparent;box-shadow:none}.button.is-light.is-inverted{background-color:rgba(0,0,0,0.7);color:#d2f9d6}.button.is-light.is-inverted:hover,.button.is-light.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-light.is-inverted[disabled],fieldset[disabled] .button.is-light.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#d2f9d6}.button.is-light.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-light.is-outlined{background-color:transparent;border-color:#d2f9d6;color:#d2f9d6}.button.is-light.is-outlined:hover,.button.is-light.is-outlined.is-hovered,.button.is-light.is-outlined:focus,.button.is-light.is-outlined.is-focused{background-color:#d2f9d6;border-color:#d2f9d6;color:rgba(0,0,0,0.7)}.button.is-light.is-outlined.is-loading::after{border-color:transparent transparent #d2f9d6 #d2f9d6 !important}.button.is-light.is-outlined.is-loading:hover::after,.button.is-light.is-outlined.is-loading.is-hovered::after,.button.is-light.is-outlined.is-loading:focus::after,.button.is-light.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-light.is-outlined[disabled],fieldset[disabled] .button.is-light.is-outlined{background-color:transparent;border-color:#d2f9d6;box-shadow:none;color:#d2f9d6}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-light.is-inverted.is-outlined:hover,.button.is-light.is-inverted.is-outlined.is-hovered,.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#d2f9d6}.button.is-light.is-inverted.is-outlined.is-loading:hover::after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-light.is-inverted.is-outlined.is-loading:focus::after,.button.is-light.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #d2f9d6 #d2f9d6 !important}.button.is-light.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-dark{background-color:#459558;border-color:transparent;color:#fff}.button.is-dark:hover,.button.is-dark.is-hovered{background-color:#418c53;border-color:transparent;color:#fff}.button.is-dark:focus,.button.is-dark.is-focused{border-color:transparent;color:#fff}.button.is-dark:focus:not(:active),.button.is-dark.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.button.is-dark:active,.button.is-dark.is-active{background-color:#3d844e;border-color:transparent;color:#fff}.button.is-dark[disabled],fieldset[disabled] .button.is-dark{background-color:#459558;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted{background-color:#fff;color:#459558}.button.is-dark.is-inverted:hover,.button.is-dark.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-dark.is-inverted[disabled],fieldset[disabled] .button.is-dark.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#459558}.button.is-dark.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined{background-color:transparent;border-color:#459558;color:#459558}.button.is-dark.is-outlined:hover,.button.is-dark.is-outlined.is-hovered,.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined.is-focused{background-color:#459558;border-color:#459558;color:#fff}.button.is-dark.is-outlined.is-loading::after{border-color:transparent transparent #459558 #459558 !important}.button.is-dark.is-outlined.is-loading:hover::after,.button.is-dark.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-outlined.is-loading:focus::after,.button.is-dark.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-outlined{background-color:transparent;border-color:#459558;box-shadow:none;color:#459558}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-dark.is-inverted.is-outlined:hover,.button.is-dark.is-inverted.is-outlined.is-hovered,.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined.is-focused{background-color:#fff;color:#459558}.button.is-dark.is-inverted.is-outlined.is-loading:hover::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-inverted.is-outlined.is-loading:focus::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #459558 #459558 !important}.button.is-dark.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary{background-color:#55be6f;border-color:transparent;color:#fff}.button.is-primary:hover,.button.is-primary.is-hovered{background-color:#4cba67;border-color:transparent;color:#fff}.button.is-primary:focus,.button.is-primary.is-focused{border-color:transparent;color:#fff}.button.is-primary:focus:not(:active),.button.is-primary.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.button.is-primary:active,.button.is-primary.is-active{background-color:#45b461;border-color:transparent;color:#fff}.button.is-primary[disabled],fieldset[disabled] .button.is-primary{background-color:#55be6f;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#55be6f}.button.is-primary.is-inverted:hover,.button.is-primary.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled],fieldset[disabled] .button.is-primary.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#55be6f}.button.is-primary.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined{background-color:transparent;border-color:#55be6f;color:#55be6f}.button.is-primary.is-outlined:hover,.button.is-primary.is-outlined.is-hovered,.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined.is-focused{background-color:#55be6f;border-color:#55be6f;color:#fff}.button.is-primary.is-outlined.is-loading::after{border-color:transparent transparent #55be6f #55be6f !important}.button.is-primary.is-outlined.is-loading:hover::after,.button.is-primary.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-outlined.is-loading:focus::after,.button.is-primary.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-outlined{background-color:transparent;border-color:#55be6f;box-shadow:none;color:#55be6f}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined:hover,.button.is-primary.is-inverted.is-outlined.is-hovered,.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined.is-focused{background-color:#fff;color:#55be6f}.button.is-primary.is-inverted.is-outlined.is-loading:hover::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-inverted.is-outlined.is-loading:focus::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #55be6f #55be6f !important}.button.is-primary.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.button.is-primary.is-light:hover,.button.is-primary.is-light.is-hovered{background-color:#e7f6eb;border-color:transparent;color:#2f7a41}.button.is-primary.is-light:active,.button.is-primary.is-light.is-active{background-color:#def2e3;border-color:transparent;color:#2f7a41}.button.is-link{background-color:#4876ff;border-color:transparent;color:#fff}.button.is-link:hover,.button.is-link.is-hovered{background-color:#3b6cff;border-color:transparent;color:#fff}.button.is-link:focus,.button.is-link.is-focused{border-color:transparent;color:#fff}.button.is-link:focus:not(:active),.button.is-link.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.button.is-link:active,.button.is-link.is-active{background-color:#2f63ff;border-color:transparent;color:#fff}.button.is-link[disabled],fieldset[disabled] .button.is-link{background-color:#4876ff;border-color:transparent;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#4876ff}.button.is-link.is-inverted:hover,.button.is-link.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-link.is-inverted[disabled],fieldset[disabled] .button.is-link.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#4876ff}.button.is-link.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined{background-color:transparent;border-color:#4876ff;color:#4876ff}.button.is-link.is-outlined:hover,.button.is-link.is-outlined.is-hovered,.button.is-link.is-outlined:focus,.button.is-link.is-outlined.is-focused{background-color:#4876ff;border-color:#4876ff;color:#fff}.button.is-link.is-outlined.is-loading::after{border-color:transparent transparent #4876ff #4876ff !important}.button.is-link.is-outlined.is-loading:hover::after,.button.is-link.is-outlined.is-loading.is-hovered::after,.button.is-link.is-outlined.is-loading:focus::after,.button.is-link.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined[disabled],fieldset[disabled] .button.is-link.is-outlined{background-color:transparent;border-color:#4876ff;box-shadow:none;color:#4876ff}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined:hover,.button.is-link.is-inverted.is-outlined.is-hovered,.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined.is-focused{background-color:#fff;color:#4876ff}.button.is-link.is-inverted.is-outlined.is-loading:hover::after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-link.is-inverted.is-outlined.is-loading:focus::after,.button.is-link.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #4876ff #4876ff !important}.button.is-link.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link.is-light{background-color:#ebf0ff;color:#0037db}.button.is-link.is-light:hover,.button.is-link.is-light.is-hovered{background-color:#dee6ff;border-color:transparent;color:#0037db}.button.is-link.is-light:active,.button.is-link.is-light.is-active{background-color:#d1ddff;border-color:transparent;color:#0037db}.button.is-info{background-color:#f0f8ff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:hover,.button.is-info.is-hovered{background-color:#e3f2ff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:focus,.button.is-info.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info:focus:not(:active),.button.is-info.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.button.is-info:active,.button.is-info.is-active{background-color:#d7ecff;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-info[disabled],fieldset[disabled] .button.is-info{background-color:#f0f8ff;border-color:transparent;box-shadow:none}.button.is-info.is-inverted{background-color:rgba(0,0,0,0.7);color:#f0f8ff}.button.is-info.is-inverted:hover,.button.is-info.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-info.is-inverted[disabled],fieldset[disabled] .button.is-info.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#f0f8ff}.button.is-info.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-info.is-outlined{background-color:transparent;border-color:#f0f8ff;color:#f0f8ff}.button.is-info.is-outlined:hover,.button.is-info.is-outlined.is-hovered,.button.is-info.is-outlined:focus,.button.is-info.is-outlined.is-focused{background-color:#f0f8ff;border-color:#f0f8ff;color:rgba(0,0,0,0.7)}.button.is-info.is-outlined.is-loading::after{border-color:transparent transparent #f0f8ff #f0f8ff !important}.button.is-info.is-outlined.is-loading:hover::after,.button.is-info.is-outlined.is-loading.is-hovered::after,.button.is-info.is-outlined.is-loading:focus::after,.button.is-info.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-info.is-outlined[disabled],fieldset[disabled] .button.is-info.is-outlined{background-color:transparent;border-color:#f0f8ff;box-shadow:none;color:#f0f8ff}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-info.is-inverted.is-outlined:hover,.button.is-info.is-inverted.is-outlined.is-hovered,.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#f0f8ff}.button.is-info.is-inverted.is-outlined.is-loading:hover::after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-info.is-inverted.is-outlined.is-loading:focus::after,.button.is-info.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #f0f8ff #f0f8ff !important}.button.is-info.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-info.is-light{background-color:#f0f8ff;color:#004f94}.button.is-info.is-light:hover,.button.is-info.is-light.is-hovered{background-color:#e3f2ff;border-color:transparent;color:#004f94}.button.is-info.is-light:active,.button.is-info.is-light.is-active{background-color:#d7ecff;border-color:transparent;color:#004f94}.button.is-success{background-color:#48c78e;border-color:transparent;color:#fff}.button.is-success:hover,.button.is-success.is-hovered{background-color:#3ec487;border-color:transparent;color:#fff}.button.is-success:focus,.button.is-success.is-focused{border-color:transparent;color:#fff}.button.is-success:focus:not(:active),.button.is-success.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.button.is-success:active,.button.is-success.is-active{background-color:#3abb81;border-color:transparent;color:#fff}.button.is-success[disabled],fieldset[disabled] .button.is-success{background-color:#48c78e;border-color:transparent;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#48c78e}.button.is-success.is-inverted:hover,.button.is-success.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-success.is-inverted[disabled],fieldset[disabled] .button.is-success.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#48c78e}.button.is-success.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;color:#48c78e}.button.is-success.is-outlined:hover,.button.is-success.is-outlined.is-hovered,.button.is-success.is-outlined:focus,.button.is-success.is-outlined.is-focused{background-color:#48c78e;border-color:#48c78e;color:#fff}.button.is-success.is-outlined.is-loading::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-outlined.is-loading:hover::after,.button.is-success.is-outlined.is-loading.is-hovered::after,.button.is-success.is-outlined.is-loading:focus::after,.button.is-success.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined[disabled],fieldset[disabled] .button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;box-shadow:none;color:#48c78e}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined:hover,.button.is-success.is-inverted.is-outlined.is-hovered,.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined.is-focused{background-color:#fff;color:#48c78e}.button.is-success.is-inverted.is-outlined.is-loading:hover::after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-success.is-inverted.is-outlined.is-loading:focus::after,.button.is-success.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success.is-light{background-color:#effaf5;color:#257953}.button.is-success.is-light:hover,.button.is-success.is-light.is-hovered{background-color:#e6f7ef;border-color:transparent;color:#257953}.button.is-success.is-light:active,.button.is-success.is-light.is-active{background-color:#dcf4e9;border-color:transparent;color:#257953}.button.is-warning{background-color:#ffd975;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:hover,.button.is-warning.is-hovered{background-color:#ffd568;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:focus,.button.is-warning.is-focused{border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning:focus:not(:active),.button.is-warning.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.button.is-warning:active,.button.is-warning.is-active{background-color:#ffd25c;border-color:transparent;color:rgba(0,0,0,0.7)}.button.is-warning[disabled],fieldset[disabled] .button.is-warning{background-color:#ffd975;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted{background-color:rgba(0,0,0,0.7);color:#ffd975}.button.is-warning.is-inverted:hover,.button.is-warning.is-inverted.is-hovered{background-color:rgba(0,0,0,0.7)}.button.is-warning.is-inverted[disabled],fieldset[disabled] .button.is-warning.is-inverted{background-color:rgba(0,0,0,0.7);border-color:transparent;box-shadow:none;color:#ffd975}.button.is-warning.is-loading::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffd975;color:#ffd975}.button.is-warning.is-outlined:hover,.button.is-warning.is-outlined.is-hovered,.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined.is-focused{background-color:#ffd975;border-color:#ffd975;color:rgba(0,0,0,0.7)}.button.is-warning.is-outlined.is-loading::after{border-color:transparent transparent #ffd975 #ffd975 !important}.button.is-warning.is-outlined.is-loading:hover::after,.button.is-warning.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-outlined.is-loading:focus::after,.button.is-warning.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0,0,0,0.7) rgba(0,0,0,0.7) !important}.button.is-warning.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-outlined{background-color:transparent;border-color:#ffd975;box-shadow:none;color:#ffd975}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);color:rgba(0,0,0,0.7)}.button.is-warning.is-inverted.is-outlined:hover,.button.is-warning.is-inverted.is-outlined.is-hovered,.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined.is-focused{background-color:rgba(0,0,0,0.7);color:#ffd975}.button.is-warning.is-inverted.is-outlined.is-loading:hover::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-inverted.is-outlined.is-loading:focus::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #ffd975 #ffd975 !important}.button.is-warning.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,0.7);box-shadow:none;color:rgba(0,0,0,0.7)}.button.is-warning.is-light{background-color:#fff9eb;color:#946b00}.button.is-warning.is-light:hover,.button.is-warning.is-light.is-hovered{background-color:#fff6de;border-color:transparent;color:#946b00}.button.is-warning.is-light:active,.button.is-warning.is-light.is-active{background-color:#fff2d1;border-color:transparent;color:#946b00}.button.is-danger{background-color:#f14668;border-color:transparent;color:#fff}.button.is-danger:hover,.button.is-danger.is-hovered{background-color:#f03a5f;border-color:transparent;color:#fff}.button.is-danger:focus,.button.is-danger.is-focused{border-color:transparent;color:#fff}.button.is-danger:focus:not(:active),.button.is-danger.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.button.is-danger:active,.button.is-danger.is-active{background-color:#ef2e55;border-color:transparent;color:#fff}.button.is-danger[disabled],fieldset[disabled] .button.is-danger{background-color:#f14668;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#f14668}.button.is-danger.is-inverted:hover,.button.is-danger.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled],fieldset[disabled] .button.is-danger.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#f14668}.button.is-danger.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;color:#f14668}.button.is-danger.is-outlined:hover,.button.is-danger.is-outlined.is-hovered,.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined.is-focused{background-color:#f14668;border-color:#f14668;color:#fff}.button.is-danger.is-outlined.is-loading::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-outlined.is-loading:hover::after,.button.is-danger.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-outlined.is-loading:focus::after,.button.is-danger.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;box-shadow:none;color:#f14668}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined:hover,.button.is-danger.is-inverted.is-outlined.is-hovered,.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined.is-focused{background-color:#fff;color:#f14668}.button.is-danger.is-inverted.is-outlined.is-loading:hover::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-inverted.is-outlined.is-loading:focus::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.button.is-danger.is-light:hover,.button.is-danger.is-light.is-hovered{background-color:#fde0e6;border-color:transparent;color:#cc0f35}.button.is-danger.is-light:active,.button.is-danger.is-light.is-active{background-color:#fcd4dc;border-color:transparent;color:#cc0f35}.button.is-small{font-size:.75rem}.button.is-small:not(.is-rounded){border-radius:2px}.button.is-normal{font-size:1rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled],fieldset[disabled] .button{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth{display:flex;width:100%}.button.is-loading{color:transparent !important;pointer-events:none}.button.is-loading::after{position:absolute;left:calc(50% - (1em * 0.5));top:calc(50% - (1em * 0.5));position:absolute !important}.button.is-static{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:9999px;padding-left:calc(1em + 0.25em);padding-right:calc(1em + 0.25em)}.buttons{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button{margin-bottom:0.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons:last-child{margin-bottom:-0.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large){font-size:.75rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded){border-radius:2px}.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button:hover,.buttons.has-addons .button.is-hovered{z-index:2}.buttons.has-addons .button:focus,.buttons.has-addons .button.is-focused,.buttons.has-addons .button:active,.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-selected{z-index:3}.buttons.has-addons .button:focus:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-selected:hover{z-index:4}.buttons.has-addons .button.is-expanded{flex-grow:1;flex-shrink:1}.buttons.is-centered{justify-content:center}.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.buttons.is-right{justify-content:flex-end}.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.container{flex-grow:1;margin:0 auto;position:relative;width:auto}.container.is-fluid{max-width:none !important;padding-left:32px;padding-right:32px;width:100%}@media screen and (min-width: 1024px){.container{max-width:960px}}@media screen and (max-width: 1215px){.container.is-widescreen:not(.is-max-desktop){max-width:1152px}}@media screen and (max-width: 1407px){.container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}@media screen and (min-width: 1216px){.container:not(.is-max-desktop){max-width:1152px}}@media screen and (min-width: 1408px){.container:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}.content li+li{margin-top:0.25em}.content p:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content ul:not(:last-child),.content blockquote:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:0.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:0.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:0.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:0.8em}.content h5{font-size:1.125em;margin-bottom:0.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:0.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sup,.content sub{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.content table th{color:#363636}.content table th:not([align]){text-align:inherit}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content .tabs li+li{margin-top:0}.content.is-small{font-size:.75rem}.content.is-normal{font-size:1rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.icon{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.icon-text{align-items:flex-start;color:inherit;display:inline-flex;flex-wrap:wrap;line-height:1.5rem;vertical-align:top}.icon-text .icon{flex-grow:0;flex-shrink:0}.icon-text .icon:not(:last-child){margin-right:.25em}.icon-text .icon:not(:first-child){margin-left:.25em}div.icon-text{display:flex}.image{display:block;position:relative}.image img{display:block;height:auto;width:100%}.image img.is-rounded{border-radius:9999px}.image.is-fullwidth{width:100%}.image.is-square img,.image.is-square .has-ratio,.image.is-1by1 img,.image.is-1by1 .has-ratio,.image.is-5by4 img,.image.is-5by4 .has-ratio,.image.is-4by3 img,.image.is-4by3 .has-ratio,.image.is-3by2 img,.image.is-3by2 .has-ratio,.image.is-5by3 img,.image.is-5by3 .has-ratio,.image.is-16by9 img,.image.is-16by9 .has-ratio,.image.is-2by1 img,.image.is-2by1 .has-ratio,.image.is-3by1 img,.image.is-3by1 .has-ratio,.image.is-4by5 img,.image.is-4by5 .has-ratio,.image.is-3by4 img,.image.is-3by4 .has-ratio,.image.is-2by3 img,.image.is-2by3 .has-ratio,.image.is-3by5 img,.image.is-3by5 .has-ratio,.image.is-9by16 img,.image.is-9by16 .has-ratio,.image.is-1by2 img,.image.is-1by2 .has-ratio,.image.is-1by3 img,.image.is-1by3 .has-ratio{height:100%;width:100%}.image.is-square,.image.is-1by1{padding-top:100%}.image.is-5by4{padding-top:80%}.image.is-4by3{padding-top:75%}.image.is-3by2{padding-top:66.6666%}.image.is-5by3{padding-top:60%}.image.is-16by9{padding-top:56.25%}.image.is-2by1{padding-top:50%}.image.is-3by1{padding-top:33.3333%}.image.is-4by5{padding-top:125%}.image.is-3by4{padding-top:133.3333%}.image.is-2by3{padding-top:150%}.image.is-3by5{padding-top:166.6666%}.image.is-9by16{padding-top:177.7777%}.image.is-1by2{padding-top:200%}.image.is-1by3{padding-top:300%}.image.is-16x16{height:16px;width:16px}.image.is-24x24{height:24px;width:24px}.image.is-32x32{height:32px;width:32px}.image.is-48x48{height:48px;width:48px}.image.is-64x64{height:64px;width:64px}.image.is-96x96{height:96px;width:96px}.image.is-128x128{height:128px;width:128px}.notification{background-color:#f5f5f5;border-radius:4px;position:relative;padding:1.25rem 2.5rem 1.25rem 1.5rem}.notification a:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:#fff}.notification pre code{background:transparent}.notification>.delete{right:.5rem;position:absolute;top:0.5rem}.notification .title,.notification .subtitle,.notification .content{color:currentColor}.notification.is-white{background-color:#fff;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:#fff}.notification.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.notification.is-dark{background-color:#459558;color:#fff}.notification.is-primary{background-color:#55be6f;color:#fff}.notification.is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.notification.is-link{background-color:#4876ff;color:#fff}.notification.is-link.is-light{background-color:#ebf0ff;color:#0037db}.notification.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.notification.is-info.is-light{background-color:#f0f8ff;color:#004f94}.notification.is-success{background-color:#48c78e;color:#fff}.notification.is-success.is-light{background-color:#effaf5;color:#257953}.notification.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.notification.is-warning.is-light{background-color:#fff9eb;color:#946b00}.notification.is-danger{background-color:#f14668;color:#fff}.notification.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:9999px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#ededed}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:#fff}.progress.is-white::-moz-progress-bar{background-color:#fff}.progress.is-white::-ms-fill{background-color:#fff}.progress.is-white:indeterminate{background-image:linear-gradient(to right, #fff 30%, #ededed 30%)}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-black:indeterminate{background-image:linear-gradient(to right, #0a0a0a 30%, #ededed 30%)}.progress.is-light::-webkit-progress-value{background-color:#d2f9d6}.progress.is-light::-moz-progress-bar{background-color:#d2f9d6}.progress.is-light::-ms-fill{background-color:#d2f9d6}.progress.is-light:indeterminate{background-image:linear-gradient(to right, #d2f9d6 30%, #ededed 30%)}.progress.is-dark::-webkit-progress-value{background-color:#459558}.progress.is-dark::-moz-progress-bar{background-color:#459558}.progress.is-dark::-ms-fill{background-color:#459558}.progress.is-dark:indeterminate{background-image:linear-gradient(to right, #459558 30%, #ededed 30%)}.progress.is-primary::-webkit-progress-value{background-color:#55be6f}.progress.is-primary::-moz-progress-bar{background-color:#55be6f}.progress.is-primary::-ms-fill{background-color:#55be6f}.progress.is-primary:indeterminate{background-image:linear-gradient(to right, #55be6f 30%, #ededed 30%)}.progress.is-link::-webkit-progress-value{background-color:#4876ff}.progress.is-link::-moz-progress-bar{background-color:#4876ff}.progress.is-link::-ms-fill{background-color:#4876ff}.progress.is-link:indeterminate{background-image:linear-gradient(to right, #4876ff 30%, #ededed 30%)}.progress.is-info::-webkit-progress-value{background-color:#f0f8ff}.progress.is-info::-moz-progress-bar{background-color:#f0f8ff}.progress.is-info::-ms-fill{background-color:#f0f8ff}.progress.is-info:indeterminate{background-image:linear-gradient(to right, #f0f8ff 30%, #ededed 30%)}.progress.is-success::-webkit-progress-value{background-color:#48c78e}.progress.is-success::-moz-progress-bar{background-color:#48c78e}.progress.is-success::-ms-fill{background-color:#48c78e}.progress.is-success:indeterminate{background-image:linear-gradient(to right, #48c78e 30%, #ededed 30%)}.progress.is-warning::-webkit-progress-value{background-color:#ffd975}.progress.is-warning::-moz-progress-bar{background-color:#ffd975}.progress.is-warning::-ms-fill{background-color:#ffd975}.progress.is-warning:indeterminate{background-image:linear-gradient(to right, #ffd975 30%, #ededed 30%)}.progress.is-danger::-webkit-progress-value{background-color:#f14668}.progress.is-danger::-moz-progress-bar{background-color:#f14668}.progress.is-danger::-ms-fill{background-color:#f14668}.progress.is-danger:indeterminate{background-image:linear-gradient(to right, #f14668 30%, #ededed 30%)}.progress:indeterminate{animation-duration:1.5s;animation-iteration-count:infinite;animation-name:moveIndeterminate;animation-timing-function:linear;background-color:#ededed;background-image:linear-gradient(to right, #4a4a4a 30%, #ededed 30%);background-position:top left;background-repeat:no-repeat;background-size:150% 150%}.progress:indeterminate::-webkit-progress-bar{background-color:transparent}.progress:indeterminate::-moz-progress-bar{background-color:transparent}.progress:indeterminate::-ms-fill{animation-name:none}.progress.is-small{height:.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}@keyframes moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}.table{background-color:#fff;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light,.table th.is-light{background-color:#d2f9d6;border-color:#d2f9d6;color:rgba(0,0,0,0.7)}.table td.is-dark,.table th.is-dark{background-color:#459558;border-color:#459558;color:#fff}.table td.is-primary,.table th.is-primary{background-color:#55be6f;border-color:#55be6f;color:#fff}.table td.is-link,.table th.is-link{background-color:#4876ff;border-color:#4876ff;color:#fff}.table td.is-info,.table th.is-info{background-color:#f0f8ff;border-color:#f0f8ff;color:rgba(0,0,0,0.7)}.table td.is-success,.table th.is-success{background-color:#48c78e;border-color:#48c78e;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffd975;border-color:#ffd975;color:rgba(0,0,0,0.7)}.table td.is-danger,.table th.is-danger{background-color:#f14668;border-color:#f14668;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#55be6f;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table td.is-vcentered,.table th.is-vcentered{vertical-align:middle}.table th{color:#363636}.table th:not([align]){text-align:inherit}.table tr.is-selected{background-color:#55be6f;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead{background-color:rgba(0,0,0,0)}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot{background-color:rgba(0,0,0,0)}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody{background-color:rgba(0,0,0,0)}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even){background-color:#f5f5f5}.table.is-narrow td,.table.is-narrow th{padding:0.25em 0.5em}.table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag{margin-bottom:0.5rem}.tags .tag:not(:last-child){margin-right:.5rem}.tags:last-child{margin-bottom:-0.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered{justify-content:center}.tags.is-centered .tag{margin-right:0.25rem;margin-left:0.25rem}.tags.is-right{justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:0.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){margin-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.tags.has-addons .tag:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tag:not(body){align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:0.75em;padding-right:0.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.tag:not(body).is-dark{background-color:#459558;color:#fff}.tag:not(body).is-primary{background-color:#55be6f;color:#fff}.tag:not(body).is-primary.is-light{background-color:#f0f9f2;color:#2f7a41}.tag:not(body).is-link{background-color:#4876ff;color:#fff}.tag:not(body).is-link.is-light{background-color:#ebf0ff;color:#0037db}.tag:not(body).is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.tag:not(body).is-info.is-light{background-color:#f0f8ff;color:#004f94}.tag:not(body).is-success{background-color:#48c78e;color:#fff}.tag:not(body).is-success.is-light{background-color:#effaf5;color:#257953}.tag:not(body).is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.tag:not(body).is-warning.is-light{background-color:#fff9eb;color:#946b00}.tag:not(body).is-danger{background-color:#f14668;color:#fff}.tag:not(body).is-danger.is-light{background-color:#feecf0;color:#cc0f35}.tag:not(body).is-normal{font-size:.75rem}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete::before,.tag:not(body).is-delete::after{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete::before{height:1px;width:50%}.tag:not(body).is-delete::after{height:50%;width:1px}.tag:not(body).is-delete:hover,.tag:not(body).is-delete:focus{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:9999px}a.tag:hover{text-decoration:underline}.title,.subtitle{word-break:break-word}.title em,.title span,.subtitle em,.subtitle span{font-weight:inherit}.title sub,.subtitle sub{font-size:.75em}.title sup,.subtitle sup{font-size:.75em}.title .tag,.subtitle .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:.75rem}.heading{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.number{align-items:center;background-color:#f5f5f5;border-radius:9999px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:0.25rem 0.5rem;text-align:center;vertical-align:top}.input,.textarea,.select select{background-color:#fff;border-color:#dbdbdb;border-radius:4px;color:#363636}.input::-moz-placeholder,.textarea::-moz-placeholder,.select select::-moz-placeholder{color:#757575}.input::-webkit-input-placeholder,.textarea::-webkit-input-placeholder,.select select::-webkit-input-placeholder{color:#757575}.input:-moz-placeholder,.textarea:-moz-placeholder,.select select:-moz-placeholder{color:#757575}.input:-ms-input-placeholder,.textarea:-ms-input-placeholder,.select select:-ms-input-placeholder{color:#757575}.input:hover,.textarea:hover,.select select:hover,.is-hovered.input,.is-hovered.textarea,.select select.is-hovered{border-color:#b5b5b5}.input:focus,.textarea:focus,.select select:focus,.is-focused.input,.is-focused.textarea,.select select.is-focused,.input:active,.textarea:active,.select select:active,.is-active.input,.is-active.textarea,.select select.is-active{border-color:#4876ff;box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.input[disabled],.textarea[disabled],.select select[disabled],fieldset[disabled] .input,fieldset[disabled] .textarea,fieldset[disabled] .select select,.select fieldset[disabled] select{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled]::-moz-placeholder,.textarea[disabled]::-moz-placeholder,.select select[disabled]::-moz-placeholder,fieldset[disabled] .input::-moz-placeholder,fieldset[disabled] .textarea::-moz-placeholder,fieldset[disabled] .select select::-moz-placeholder,.select fieldset[disabled] select::-moz-placeholder{color:#707070}.input[disabled]::-webkit-input-placeholder,.textarea[disabled]::-webkit-input-placeholder,.select select[disabled]::-webkit-input-placeholder,fieldset[disabled] .input::-webkit-input-placeholder,fieldset[disabled] .textarea::-webkit-input-placeholder,fieldset[disabled] .select select::-webkit-input-placeholder,.select fieldset[disabled] select::-webkit-input-placeholder{color:#707070}.input[disabled]:-moz-placeholder,.textarea[disabled]:-moz-placeholder,.select select[disabled]:-moz-placeholder,fieldset[disabled] .input:-moz-placeholder,fieldset[disabled] .textarea:-moz-placeholder,fieldset[disabled] .select select:-moz-placeholder,.select fieldset[disabled] select:-moz-placeholder{color:#707070}.input[disabled]:-ms-input-placeholder,.textarea[disabled]:-ms-input-placeholder,.select select[disabled]:-ms-input-placeholder,fieldset[disabled] .input:-ms-input-placeholder,fieldset[disabled] .textarea:-ms-input-placeholder,fieldset[disabled] .select select:-ms-input-placeholder,.select fieldset[disabled] select:-ms-input-placeholder{color:#707070}.input,.textarea{box-shadow:inset 0 0.0625em 0.125em rgba(10,10,10,0.05);max-width:100%;width:100%}.input[readonly],.textarea[readonly]{box-shadow:none}.is-white.input,.is-white.textarea{border-color:#fff}.is-white.input:focus,.is-white.textarea:focus,.is-white.is-focused.input,.is-white.is-focused.textarea,.is-white.input:active,.is-white.textarea:active,.is-white.is-active.input,.is-white.is-active.textarea{box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.is-black.input,.is-black.textarea{border-color:#0a0a0a}.is-black.input:focus,.is-black.textarea:focus,.is-black.is-focused.input,.is-black.is-focused.textarea,.is-black.input:active,.is-black.textarea:active,.is-black.is-active.input,.is-black.is-active.textarea{box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.is-light.input,.is-light.textarea{border-color:#d2f9d6}.is-light.input:focus,.is-light.textarea:focus,.is-light.is-focused.input,.is-light.is-focused.textarea,.is-light.input:active,.is-light.textarea:active,.is-light.is-active.input,.is-light.is-active.textarea{box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.is-dark.input,.is-dark.textarea{border-color:#459558}.is-dark.input:focus,.is-dark.textarea:focus,.is-dark.is-focused.input,.is-dark.is-focused.textarea,.is-dark.input:active,.is-dark.textarea:active,.is-dark.is-active.input,.is-dark.is-active.textarea{box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.is-primary.input,.is-primary.textarea{border-color:#55be6f}.is-primary.input:focus,.is-primary.textarea:focus,.is-primary.is-focused.input,.is-primary.is-focused.textarea,.is-primary.input:active,.is-primary.textarea:active,.is-primary.is-active.input,.is-primary.is-active.textarea{box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.is-link.input,.is-link.textarea{border-color:#4876ff}.is-link.input:focus,.is-link.textarea:focus,.is-link.is-focused.input,.is-link.is-focused.textarea,.is-link.input:active,.is-link.textarea:active,.is-link.is-active.input,.is-link.is-active.textarea{box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.is-info.input,.is-info.textarea{border-color:#f0f8ff}.is-info.input:focus,.is-info.textarea:focus,.is-info.is-focused.input,.is-info.is-focused.textarea,.is-info.input:active,.is-info.textarea:active,.is-info.is-active.input,.is-info.is-active.textarea{box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.is-success.input,.is-success.textarea{border-color:#48c78e}.is-success.input:focus,.is-success.textarea:focus,.is-success.is-focused.input,.is-success.is-focused.textarea,.is-success.input:active,.is-success.textarea:active,.is-success.is-active.input,.is-success.is-active.textarea{box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.is-warning.input,.is-warning.textarea{border-color:#ffd975}.is-warning.input:focus,.is-warning.textarea:focus,.is-warning.is-focused.input,.is-warning.is-focused.textarea,.is-warning.input:active,.is-warning.textarea:active,.is-warning.is-active.input,.is-warning.is-active.textarea{box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.is-danger.input,.is-danger.textarea{border-color:#f14668}.is-danger.input:focus,.is-danger.textarea:focus,.is-danger.is-focused.input,.is-danger.is-focused.textarea,.is-danger.input:active,.is-danger.textarea:active,.is-danger.is-active.input,.is-danger.is-active.textarea{box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.is-small.input,.is-small.textarea{border-radius:2px;font-size:.75rem}.is-medium.input,.is-medium.textarea{font-size:1.25rem}.is-large.input,.is-large.textarea{font-size:1.5rem}.is-fullwidth.input,.is-fullwidth.textarea{display:block;width:100%}.is-inline.input,.is-inline.textarea{display:inline;width:auto}.input.is-rounded{border-radius:9999px;padding-left:calc(calc(0.75em - 1px) + 0.375em);padding-right:calc(calc(0.75em - 1px) + 0.375em)}.input.is-static{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:calc(0.75em - 1px);resize:vertical}.textarea:not([rows]){max-height:40em;min-height:8em}.textarea[rows]{height:initial}.textarea.has-fixed-size{resize:none}.checkbox,.radio{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input,.radio input{cursor:pointer}.checkbox:hover,.radio:hover{color:#363636}.checkbox[disabled],.radio[disabled],fieldset[disabled] .checkbox,fieldset[disabled] .radio,.checkbox input[disabled],.radio input[disabled]{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.5em}.select:not(.is-multiple):not(.is-loading)::after{border-color:#4876ff;right:1.125em;z-index:4}.select.is-rounded select{border-radius:9999px;padding-left:1em}.select select{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select::-ms-expand{display:none}.select select[disabled]:hover,fieldset[disabled] .select select:hover{border-color:#f5f5f5}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:0.5em 1em}.select:not(.is-multiple):not(.is-loading):hover::after{border-color:#363636}.select.is-white:not(:hover)::after{border-color:#fff}.select.is-white select{border-color:#fff}.select.is-white select:hover,.select.is-white select.is-hovered{border-color:#f2f2f2}.select.is-white select:focus,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select.is-active{box-shadow:0 0 0 0.125em rgba(255,255,255,0.25)}.select.is-black:not(:hover)::after{border-color:#0a0a0a}.select.is-black select{border-color:#0a0a0a}.select.is-black select:hover,.select.is-black select.is-hovered{border-color:#000}.select.is-black select:focus,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select.is-active{box-shadow:0 0 0 0.125em rgba(10,10,10,0.25)}.select.is-light:not(:hover)::after{border-color:#d2f9d6}.select.is-light select{border-color:#d2f9d6}.select.is-light select:hover,.select.is-light select.is-hovered{border-color:#bcf6c2}.select.is-light select:focus,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select.is-active{box-shadow:0 0 0 0.125em rgba(210,249,214,0.25)}.select.is-dark:not(:hover)::after{border-color:#459558}.select.is-dark select{border-color:#459558}.select.is-dark select:hover,.select.is-dark select.is-hovered{border-color:#3d844e}.select.is-dark select:focus,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select.is-active{box-shadow:0 0 0 0.125em rgba(69,149,88,0.25)}.select.is-primary:not(:hover)::after{border-color:#55be6f}.select.is-primary select{border-color:#55be6f}.select.is-primary select:hover,.select.is-primary select.is-hovered{border-color:#45b461}.select.is-primary select:focus,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select.is-active{box-shadow:0 0 0 0.125em rgba(85,190,111,0.25)}.select.is-link:not(:hover)::after{border-color:#4876ff}.select.is-link select{border-color:#4876ff}.select.is-link select:hover,.select.is-link select.is-hovered{border-color:#2f63ff}.select.is-link select:focus,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select.is-active{box-shadow:0 0 0 0.125em rgba(72,118,255,0.25)}.select.is-info:not(:hover)::after{border-color:#f0f8ff}.select.is-info select{border-color:#f0f8ff}.select.is-info select:hover,.select.is-info select.is-hovered{border-color:#d7ecff}.select.is-info select:focus,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select.is-active{box-shadow:0 0 0 0.125em rgba(240,248,255,0.25)}.select.is-success:not(:hover)::after{border-color:#48c78e}.select.is-success select{border-color:#48c78e}.select.is-success select:hover,.select.is-success select.is-hovered{border-color:#3abb81}.select.is-success select:focus,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select.is-active{box-shadow:0 0 0 0.125em rgba(72,199,142,0.25)}.select.is-warning:not(:hover)::after{border-color:#ffd975}.select.is-warning select{border-color:#ffd975}.select.is-warning select:hover,.select.is-warning select.is-hovered{border-color:#ffd25c}.select.is-warning select:focus,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select.is-active{box-shadow:0 0 0 0.125em rgba(255,217,117,0.25)}.select.is-danger:not(:hover)::after{border-color:#f14668}.select.is-danger select{border-color:#f14668}.select.is-danger select:hover,.select.is-danger select.is-hovered{border-color:#ef2e55}.select.is-danger select:focus,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select.is-active{box-shadow:0 0 0 0.125em rgba(241,70,104,0.25)}.select.is-small{border-radius:2px;font-size:.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled::after{border-color:#7a7a7a}.select.is-fullwidth{width:100%}.select.is-fullwidth select{width:100%}.select.is-loading::after{margin-top:0;position:absolute;right:.625em;top:0.625em;transform:none}.select.is-loading.is-small:after{font-size:.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white:hover .file-cta,.file.is-white.is-hovered .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white:focus .file-cta,.file.is-white.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255,255,255,0.25);color:#0a0a0a}.file.is-white:active .file-cta,.file.is-white.is-active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black:hover .file-cta,.file.is-black.is-hovered .file-cta{background-color:#040404;border-color:transparent;color:#fff}.file.is-black:focus .file-cta,.file.is-black.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(10,10,10,0.25);color:#fff}.file.is-black:active .file-cta,.file.is-black.is-active .file-cta{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta{background-color:#d2f9d6;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-light:hover .file-cta,.file.is-light.is-hovered .file-cta{background-color:#c7f8cc;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-light:focus .file-cta,.file.is-light.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(210,249,214,0.25);color:rgba(0,0,0,0.7)}.file.is-light:active .file-cta,.file.is-light.is-active .file-cta{background-color:#bcf6c2;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-dark .file-cta{background-color:#459558;border-color:transparent;color:#fff}.file.is-dark:hover .file-cta,.file.is-dark.is-hovered .file-cta{background-color:#418c53;border-color:transparent;color:#fff}.file.is-dark:focus .file-cta,.file.is-dark.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(69,149,88,0.25);color:#fff}.file.is-dark:active .file-cta,.file.is-dark.is-active .file-cta{background-color:#3d844e;border-color:transparent;color:#fff}.file.is-primary .file-cta{background-color:#55be6f;border-color:transparent;color:#fff}.file.is-primary:hover .file-cta,.file.is-primary.is-hovered .file-cta{background-color:#4cba67;border-color:transparent;color:#fff}.file.is-primary:focus .file-cta,.file.is-primary.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(85,190,111,0.25);color:#fff}.file.is-primary:active .file-cta,.file.is-primary.is-active .file-cta{background-color:#45b461;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#4876ff;border-color:transparent;color:#fff}.file.is-link:hover .file-cta,.file.is-link.is-hovered .file-cta{background-color:#3b6cff;border-color:transparent;color:#fff}.file.is-link:focus .file-cta,.file.is-link.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72,118,255,0.25);color:#fff}.file.is-link:active .file-cta,.file.is-link.is-active .file-cta{background-color:#2f63ff;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#f0f8ff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-info:hover .file-cta,.file.is-info.is-hovered .file-cta{background-color:#e3f2ff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-info:focus .file-cta,.file.is-info.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(240,248,255,0.25);color:rgba(0,0,0,0.7)}.file.is-info:active .file-cta,.file.is-info.is-active .file-cta{background-color:#d7ecff;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-success .file-cta{background-color:#48c78e;border-color:transparent;color:#fff}.file.is-success:hover .file-cta,.file.is-success.is-hovered .file-cta{background-color:#3ec487;border-color:transparent;color:#fff}.file.is-success:focus .file-cta,.file.is-success.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72,199,142,0.25);color:#fff}.file.is-success:active .file-cta,.file.is-success.is-active .file-cta{background-color:#3abb81;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffd975;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-warning:hover .file-cta,.file.is-warning.is-hovered .file-cta{background-color:#ffd568;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-warning:focus .file-cta,.file.is-warning.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255,217,117,0.25);color:rgba(0,0,0,0.7)}.file.is-warning:active .file-cta,.file.is-warning.is-active .file-cta{background-color:#ffd25c;border-color:transparent;color:rgba(0,0,0,0.7)}.file.is-danger .file-cta{background-color:#f14668;border-color:transparent;color:#fff}.file.is-danger:hover .file-cta,.file.is-danger.is-hovered .file-cta{background-color:#f03a5f;border-color:transparent;color:#fff}.file.is-danger:focus .file-cta,.file.is-danger.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(241,70,104,0.25);color:#fff}.file.is-danger:active .file-cta,.file.is-danger.is-active .file-cta{background-color:#ef2e55;border-color:transparent;color:#fff}.file.is-small{font-size:.75rem}.file.is-normal{font-size:1rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-label{flex-direction:column}.file.is-boxed .file-cta{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px}.file.is-boxed.is-small .file-icon .fa{font-size:14px}.file.is-boxed.is-medium .file-icon .fa{font-size:28px}.file.is-boxed.is-large .file-icon .fa{font-size:35px}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{flex-grow:1;max-width:none}.file.is-right{justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:#f5f5f5;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:inherit;text-overflow:ellipsis}.file-icon{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa{font-size:14px}.label{color:#363636;display:block;font-size:1rem;font-weight:700}.label:not(:last-child){margin-bottom:0.5em}.label.is-small{font-size:.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:.75rem;margin-top:0.25rem}.help.is-white{color:#fff}.help.is-black{color:#0a0a0a}.help.is-light{color:#d2f9d6}.help.is-dark{color:#459558}.help.is-primary{color:#55be6f}.help.is-link{color:#4876ff}.help.is-info{color:#f0f8ff}.help.is-success{color:#48c78e}.help.is-warning{color:#ffd975}.help.is-danger{color:#f14668}.field:not(:last-child){margin-bottom:0.75rem}.field.has-addons{display:flex;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button,.field.has-addons .control:first-child:not(:only-child) .input,.field.has-addons .control:first-child:not(:only-child) .select select{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button,.field.has-addons .control:last-child:not(:only-child) .input,.field.has-addons .control:last-child:not(:only-child) .select select{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered{z-index:2}.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]).is-active{z-index:3}.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover{z-index:4}.field.has-addons .control.is-expanded{flex-grow:1;flex-shrink:1}.field.has-addons.has-addons-centered{justify-content:center}.field.has-addons.has-addons-right{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{flex-grow:1;flex-shrink:0}.field.is-grouped{display:flex;justify-content:flex-start}.field.is-grouped>.control{flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{justify-content:center}.field.is-grouped.is-grouped-right{justify-content:flex-end}.field.is-grouped.is-grouped-multiline{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:0.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-0.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}@media screen and (min-width: 769px), print{.field.is-horizontal{display:flex}}.field-label .label{font-size:inherit}@media screen and (max-width: 768px){.field-label{margin-bottom:0.5rem}}@media screen and (min-width: 769px), print{.field-label{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:.75rem;padding-top:0.375em}.field-label.is-normal{padding-top:0.375em}.field-label.is-medium{font-size:1.25rem;padding-top:0.375em}.field-label.is-large{font-size:1.5rem;padding-top:0.375em}}.field-body .field .field{margin-bottom:0}@media screen and (min-width: 769px), print{.field-body{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{flex-shrink:1}.field-body>.field:not(.is-narrow){flex-grow:1}.field-body>.field:not(:last-child){margin-right:.75rem}}.control{box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:inherit}.control.has-icons-left .input:focus ~ .icon,.control.has-icons-left .select:focus ~ .icon,.control.has-icons-right .input:focus ~ .icon,.control.has-icons-right .select:focus ~ .icon{color:#4a4a4a}.control.has-icons-left .input.is-small ~ .icon,.control.has-icons-left .select.is-small ~ .icon,.control.has-icons-right .input.is-small ~ .icon,.control.has-icons-right .select.is-small ~ .icon{font-size:.75rem}.control.has-icons-left .input.is-medium ~ .icon,.control.has-icons-left .select.is-medium ~ .icon,.control.has-icons-right .input.is-medium ~ .icon,.control.has-icons-right .select.is-medium ~ .icon{font-size:1.25rem}.control.has-icons-left .input.is-large ~ .icon,.control.has-icons-left .select.is-large ~ .icon,.control.has-icons-right .input.is-large ~ .icon,.control.has-icons-right .select.is-large ~ .icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.5em;pointer-events:none;position:absolute;top:0;width:2.5em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select{padding-left:2.5em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select{padding-right:2.5em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading::after{position:absolute !important;right:.625em;top:0.625em;z-index:4}.control.is-loading.is-small:after{font-size:.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{align-items:center;color:#4876ff;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{align-items:center;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li::before{color:#b5b5b5;content:"\\0002f"}.breadcrumb ul,.breadcrumb ol{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:.5em}.breadcrumb .icon:last-child{margin-left:.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{justify-content:flex-end}.breadcrumb.is-small{font-size:.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li::before{content:"\\02192"}.breadcrumb.has-bullet-separator li+li::before{content:"\\02022"}.breadcrumb.has-dot-separator li+li::before{content:"\\000b7"}.breadcrumb.has-succeeds-separator li+li::before{content:"\\0227B"}.card{background-color:#fff;border-radius:.25rem;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);color:#4a4a4a;max-width:100%;position:relative}.card-header:first-child,.card-content:first-child,.card-footer:first-child{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-header:last-child,.card-content:last-child,.card-footer:last-child{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-header{background-color:rgba(0,0,0,0);align-items:stretch;box-shadow:0 0.125em 0.25em rgba(10,10,10,0.1);display:flex}.card-header-title{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:0.75rem 1rem}.card-header-title.is-centered{justify-content:center}.card-header-icon{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0;align-items:center;cursor:pointer;display:flex;justify-content:center;padding:0.75rem 1rem}.card-image{display:block;position:relative}.card-image:first-child img{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-image:last-child img{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-content{background-color:rgba(0,0,0,0);padding:1.5rem}.card-footer{background-color:rgba(0,0,0,0);border-top:1px solid #ededed;align-items:stretch;display:flex}.card-footer-item{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item:not(:last-child){border-right:1px solid #ededed}.card .media:not(:last-child){margin-bottom:1.5rem}.dropdown{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:initial;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:#fff;border-radius:4px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item{color:#4a4a4a;display:block;font-size:0.875rem;line-height:1.5;padding:0.375rem 1rem;position:relative}a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:inherit;white-space:nowrap;width:100%}a.dropdown-item:hover,button.dropdown-item:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#4876ff;color:#fff}.dropdown-divider{background-color:#ededed;border:none;display:block;height:1px;margin:0.5rem 0}.level{align-items:center;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile{display:flex}.level.is-mobile .level-left,.level.is-mobile .level-right{display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item:not(.is-narrow){flex-grow:1}@media screen and (min-width: 769px), print{.level{display:flex}.level>.level-item:not(.is-narrow){flex-grow:1}}.level-item{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .title,.level-item .subtitle{margin-bottom:0}@media screen and (max-width: 768px){.level-item:not(:last-child){margin-bottom:.75rem}}.level-left,.level-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{flex-grow:1}@media screen and (min-width: 769px), print{.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:.75rem}}.level-left{align-items:center;justify-content:flex-start}@media screen and (max-width: 768px){.level-left+.level-right{margin-top:1.5rem}}@media screen and (min-width: 769px), print{.level-left{display:flex}}.level-right{align-items:center;justify-content:flex-end}@media screen and (min-width: 769px), print{.level-right{display:flex}}.media{align-items:flex-start;display:flex;text-align:inherit}.media .content:not(:last-child){margin-bottom:.75rem}.media .media{border-top:1px solid rgba(219,219,219,0.5);display:flex;padding-top:.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:.5rem}.media .media .media{padding-top:.5rem}.media .media .media+.media{margin-top:.5rem}.media+.media{border-top:1px solid rgba(219,219,219,0.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:inherit}@media screen and (max-width: 768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:0.5em 0.75em}.menu-list a:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active{background-color:#4876ff;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small{font-size:.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:#fff}.message.is-white .message-header{background-color:#fff;color:#0a0a0a}.message.is-white .message-body{border-color:#fff}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:#fff}.message.is-black .message-body{border-color:#0a0a0a}.message.is-light{background-color:#f6fef7}.message.is-light .message-header{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.message.is-light .message-body{border-color:#d2f9d6}.message.is-dark{background-color:#f8fcf9}.message.is-dark .message-header{background-color:#459558;color:#fff}.message.is-dark .message-body{border-color:#459558}.message.is-primary{background-color:#f0f9f2}.message.is-primary .message-header{background-color:#55be6f;color:#fff}.message.is-primary .message-body{border-color:#55be6f;color:#2f7a41}.message.is-link{background-color:#ebf0ff}.message.is-link .message-header{background-color:#4876ff;color:#fff}.message.is-link .message-body{border-color:#4876ff;color:#0037db}.message.is-info{background-color:#f0f8ff}.message.is-info .message-header{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.message.is-info .message-body{border-color:#f0f8ff;color:#004f94}.message.is-success{background-color:#effaf5}.message.is-success .message-header{background-color:#48c78e;color:#fff}.message.is-success .message-body{border-color:#48c78e;color:#257953}.message.is-warning{background-color:#fff9eb}.message.is-warning .message-header{background-color:#ffd975;color:rgba(0,0,0,0.7)}.message.is-warning .message-body{border-color:#ffd975;color:#946b00}.message.is-danger{background-color:#feecf0}.message.is-danger .message-header{background-color:#f14668;color:#fff}.message.is-danger .message-body{border-color:#f14668;color:#cc0f35}.message-header{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:0.75em 1em;position:relative}.message-header .delete{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:#fff}.message-body pre code{background-color:rgba(0,0,0,0)}.modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:flex}.modal-background{background-color:rgba(10,10,10,0.86)}.modal-content,.modal-card{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media screen and (min-width: 769px){.modal-content,.modal-card{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-head,.modal-card-foot{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.2rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:.5em}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:#fff;min-height:2rem;position:relative;z-index:30}.navbar.is-white{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand>.navbar-item,.navbar.is-white .navbar-brand .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-brand>a.navbar-item:focus,.navbar.is-white .navbar-brand>a.navbar-item:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand .navbar-link:focus,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}@media screen and (min-width: 840px){.navbar.is-white .navbar-start>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-end .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-start>a.navbar-item:focus,.navbar.is-white .navbar-start>a.navbar-item:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start .navbar-link:focus,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-end>a.navbar-item:focus,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end .navbar-link:focus,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-start .navbar-link::after,.navbar.is-white .navbar-end .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:#fff;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand>.navbar-item,.navbar.is-black .navbar-brand .navbar-link{color:#fff}.navbar.is-black .navbar-brand>a.navbar-item:focus,.navbar.is-black .navbar-brand>a.navbar-item:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand .navbar-link:focus,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand .navbar-link.is-active{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-black .navbar-start>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-end .navbar-link{color:#fff}.navbar.is-black .navbar-start>a.navbar-item:focus,.navbar.is-black .navbar-start>a.navbar-item:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start .navbar-link:focus,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-end>a.navbar-item:focus,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end .navbar-link:focus,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end .navbar-link.is-active{background-color:#000;color:#fff}.navbar.is-black .navbar-start .navbar-link::after,.navbar.is-black .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:#fff}}.navbar.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand>.navbar-item,.navbar.is-light .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand>a.navbar-item:focus,.navbar.is-light .navbar-brand>a.navbar-item:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand .navbar-link:focus,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-light .navbar-start>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-start>a.navbar-item:focus,.navbar.is-light .navbar-start>a.navbar-item:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start .navbar-link:focus,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-end>a.navbar-item:focus,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end .navbar-link:focus,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-start .navbar-link::after,.navbar.is-light .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}}.navbar.is-dark{background-color:#459558;color:#fff}.navbar.is-dark .navbar-brand>.navbar-item,.navbar.is-dark .navbar-brand .navbar-link{color:#fff}.navbar.is-dark .navbar-brand>a.navbar-item:focus,.navbar.is-dark .navbar-brand>a.navbar-item:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand .navbar-link:focus,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand .navbar-link.is-active{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-dark .navbar-start>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-end .navbar-link{color:#fff}.navbar.is-dark .navbar-start>a.navbar-item:focus,.navbar.is-dark .navbar-start>a.navbar-item:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start .navbar-link:focus,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-end>a.navbar-item:focus,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end .navbar-link:focus,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end .navbar-link.is-active{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-start .navbar-link::after,.navbar.is-dark .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3d844e;color:#fff}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#459558;color:#fff}}.navbar.is-primary{background-color:#55be6f;color:#fff}.navbar.is-primary .navbar-brand>.navbar-item,.navbar.is-primary .navbar-brand .navbar-link{color:#fff}.navbar.is-primary .navbar-brand>a.navbar-item:focus,.navbar.is-primary .navbar-brand>a.navbar-item:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand .navbar-link:focus,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand .navbar-link.is-active{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-primary .navbar-start>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-end .navbar-link{color:#fff}.navbar.is-primary .navbar-start>a.navbar-item:focus,.navbar.is-primary .navbar-start>a.navbar-item:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start .navbar-link:focus,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-end>a.navbar-item:focus,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end .navbar-link:focus,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end .navbar-link.is-active{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-start .navbar-link::after,.navbar.is-primary .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link{background-color:#45b461;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#55be6f;color:#fff}}.navbar.is-link{background-color:#4876ff;color:#fff}.navbar.is-link .navbar-brand>.navbar-item,.navbar.is-link .navbar-brand .navbar-link{color:#fff}.navbar.is-link .navbar-brand>a.navbar-item:focus,.navbar.is-link .navbar-brand>a.navbar-item:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand .navbar-link:focus,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand .navbar-link.is-active{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-link .navbar-start>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-end .navbar-link{color:#fff}.navbar.is-link .navbar-start>a.navbar-item:focus,.navbar.is-link .navbar-start>a.navbar-item:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start .navbar-link:focus,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-end>a.navbar-item:focus,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end .navbar-link:focus,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end .navbar-link.is-active{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-start .navbar-link::after,.navbar.is-link .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link{background-color:#2f63ff;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#4876ff;color:#fff}}.navbar.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand>.navbar-item,.navbar.is-info .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand>a.navbar-item:focus,.navbar.is-info .navbar-brand>a.navbar-item:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand .navbar-link:focus,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-info .navbar-start>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-start>a.navbar-item:focus,.navbar.is-info .navbar-start>a.navbar-item:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start .navbar-link:focus,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-end>a.navbar-item:focus,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end .navbar-link:focus,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-start .navbar-link::after,.navbar.is-info .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}}.navbar.is-success{background-color:#48c78e;color:#fff}.navbar.is-success .navbar-brand>.navbar-item,.navbar.is-success .navbar-brand .navbar-link{color:#fff}.navbar.is-success .navbar-brand>a.navbar-item:focus,.navbar.is-success .navbar-brand>a.navbar-item:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand .navbar-link:focus,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-success .navbar-start>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-end .navbar-link{color:#fff}.navbar.is-success .navbar-start>a.navbar-item:focus,.navbar.is-success .navbar-start>a.navbar-item:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start .navbar-link:focus,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-end>a.navbar-item:focus,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end .navbar-link:focus,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-start .navbar-link::after,.navbar.is-success .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#48c78e;color:#fff}}.navbar.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand>.navbar-item,.navbar.is-warning .navbar-brand .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand>a.navbar-item:focus,.navbar.is-warning .navbar-brand>a.navbar-item:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand .navbar-link:focus,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-burger{color:rgba(0,0,0,0.7)}@media screen and (min-width: 840px){.navbar.is-warning .navbar-start>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-end .navbar-link{color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-start>a.navbar-item:focus,.navbar.is-warning .navbar-start>a.navbar-item:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start .navbar-link:focus,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-end>a.navbar-item:focus,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end .navbar-link:focus,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-start .navbar-link::after,.navbar.is-warning .navbar-end .navbar-link::after{border-color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffd975;color:rgba(0,0,0,0.7)}}.navbar.is-danger{background-color:#f14668;color:#fff}.navbar.is-danger .navbar-brand>.navbar-item,.navbar.is-danger .navbar-brand .navbar-link{color:#fff}.navbar.is-danger .navbar-brand>a.navbar-item:focus,.navbar.is-danger .navbar-brand>a.navbar-item:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand .navbar-link:focus,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}@media screen and (min-width: 840px){.navbar.is-danger .navbar-start>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-end .navbar-link{color:#fff}.navbar.is-danger .navbar-start>a.navbar-item:focus,.navbar.is-danger .navbar-start>a.navbar-item:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start .navbar-link:focus,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-end>a.navbar-item:focus,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end .navbar-link:focus,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-start .navbar-link::after,.navbar.is-danger .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#f14668;color:#fff}}.navbar>.container{align-items:stretch;display:flex;min-height:2rem;width:100%}.navbar.has-shadow{box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top{top:0}html.has-navbar-fixed-top,body.has-navbar-fixed-top{padding-top:2rem}html.has-navbar-fixed-bottom,body.has-navbar-fixed-bottom{padding-bottom:2rem}.navbar-brand,.navbar-tabs{align-items:stretch;display:flex;flex-shrink:0;min-height:2rem}.navbar-brand a.navbar-item:focus,.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:2rem;position:relative;width:2rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color, opacity, transform;transition-timing-function:ease-out;width:16px}.navbar-burger span:nth-child(1){top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0,0,0,0.05)}.navbar-burger.is-active span:nth-child(1){transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:0.5rem 0.75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-0.25rem;margin-right:-0.25rem}a.navbar-item,.navbar-link{cursor:pointer}a.navbar-item:focus,a.navbar-item:focus-within,a.navbar-item:hover,a.navbar-item.is-active,.navbar-link:focus,.navbar-link:focus-within,.navbar-link:hover,.navbar-link.is-active{background-color:#fafafa;color:#4876ff}.navbar-item{flex-grow:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{flex-grow:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:2rem;padding-bottom:calc(0.5rem - 1px)}.navbar-item.is-tab:focus,.navbar-item.is-tab:hover{background-color:rgba(0,0,0,0);border-bottom-color:#4876ff}.navbar-item.is-tab.is-active{background-color:rgba(0,0,0,0);border-bottom-color:#4876ff;border-bottom-style:solid;border-bottom-width:3px;color:#4876ff;padding-bottom:calc(0.5rem - 3px)}.navbar-content{flex-grow:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless)::after{border-color:#4876ff;margin-top:-0.375em;right:1.125em}.navbar-dropdown{font-size:0.875rem;padding-bottom:0.5rem;padding-top:0.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:#f5f5f5;border:none;display:none;height:2px;margin:0.5rem 0}@media screen and (max-width: 839px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{align-items:center;display:flex}.navbar-link::after{display:none}.navbar-menu{background-color:#fff;box-shadow:0 8px 16px rgba(10,10,10,0.1);padding:0.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,0.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top .navbar-menu,.navbar.is-fixed-top-touch .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 2rem);overflow:auto}html.has-navbar-fixed-top-touch,body.has-navbar-fixed-top-touch{padding-top:2rem}html.has-navbar-fixed-bottom-touch,body.has-navbar-fixed-bottom-touch{padding-bottom:2rem}}@media screen and (min-width: 840px){.navbar,.navbar-menu,.navbar-start,.navbar-end{align-items:stretch;display:flex}.navbar{min-height:2rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-start,.navbar.is-spaced .navbar-end{align-items:center}.navbar.is-spaced a.navbar-item,.navbar.is-spaced .navbar-link{border-radius:4px}.navbar.is-transparent a.navbar-item:focus,.navbar.is-transparent a.navbar-item:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent .navbar-link:focus,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent .navbar-link.is-active{background-color:transparent !important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{background-color:transparent !important}.navbar.is-transparent .navbar-dropdown a.navbar-item:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#4876ff}.navbar-burger{display:none}.navbar-item,.navbar-link{align-items:center;display:flex}.navbar-item.has-dropdown{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link::after{transform:rotate(135deg) translate(0.25em, -0.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px rgba(10,10,10,0.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu{flex-grow:1;flex-shrink:0}.navbar-start{justify-content:flex-start;margin-right:auto}.navbar-end{justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px rgba(10,10,10,0.1);display:none;font-size:0.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:0.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:focus,.navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#4876ff}.navbar.is-spaced .navbar-dropdown,.navbar-dropdown.is-boxed{border-radius:6px;border-top:none;box-shadow:0 8px 8px rgba(10,10,10,0.1),0 0 0 1px rgba(10,10,10,0.1);display:block;opacity:0;pointer-events:none;top:calc(100% + (-4px));transform:translateY(-5px);transition-duration:86ms;transition-property:opacity, transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.navbar>.container .navbar-brand,.container>.navbar .navbar-brand{margin-left:-.75rem}.navbar>.container .navbar-menu,.container>.navbar .navbar-menu{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,0.1)}.navbar.is-fixed-top-desktop{top:0}html.has-navbar-fixed-top-desktop,body.has-navbar-fixed-top-desktop{padding-top:2rem}html.has-navbar-fixed-bottom-desktop,body.has-navbar-fixed-bottom-desktop{padding-bottom:2rem}html.has-spaced-navbar-fixed-top,body.has-spaced-navbar-fixed-top{padding-top:4rem}html.has-spaced-navbar-fixed-bottom,body.has-spaced-navbar-fixed-bottom{padding-bottom:4rem}a.navbar-item.is-active,.navbar-link.is-active{color:#0a0a0a}a.navbar-item.is-active:not(:focus):not(:hover),.navbar-link.is-active:not(:focus):not(:hover){background-color:rgba(0,0,0,0)}.navbar-item.has-dropdown:focus .navbar-link,.navbar-item.has-dropdown:hover .navbar-link,.navbar-item.has-dropdown.is-active .navbar-link{background-color:#fafafa}}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 2rem)}.pagination{font-size:1rem;margin:-.25rem}.pagination.is-small{font-size:.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-previous,.pagination.is-rounded .pagination-next{padding-left:1em;padding-right:1em;border-radius:9999px}.pagination.is-rounded .pagination-link{border-radius:9999px}.pagination,.pagination-list{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{font-size:1em;justify-content:center;margin:.25rem;padding-left:.5em;padding-right:.5em;text-align:center}.pagination-previous,.pagination-next,.pagination-link{border-color:#dbdbdb;color:#363636;min-width:2.5em}.pagination-previous:hover,.pagination-next:hover,.pagination-link:hover{border-color:#b5b5b5;color:#363636}.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus{border-color:#485fc7}.pagination-previous:active,.pagination-next:active,.pagination-link:active{box-shadow:inset 0 1px 2px rgba(10,10,10,0.2)}.pagination-previous[disabled],.pagination-next[disabled],.pagination-link[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:0.5}.pagination-previous,.pagination-next{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current{background-color:#4876ff;border-color:#4876ff;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{flex-wrap:wrap}.pagination-list li{list-style:none}@media screen and (max-width: 768px){.pagination{flex-wrap:wrap}.pagination-previous,.pagination-next{flex-grow:1;flex-shrink:1}.pagination-list li{flex-grow:1;flex-shrink:1}}@media screen and (min-width: 769px), print{.pagination-list{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{margin-bottom:0;margin-top:0}.pagination-previous{order:2}.pagination-next{order:3}.pagination{justify-content:space-between;margin-bottom:0;margin-top:0}.pagination.is-centered .pagination-previous{order:1}.pagination.is-centered .pagination-list{justify-content:center;order:2}.pagination.is-centered .pagination-next{order:3}.pagination.is-right .pagination-previous{order:1}.pagination.is-right .pagination-next{order:2}.pagination.is-right .pagination-list{justify-content:flex-end;order:3}}.panel{border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10,10,10,0.1),0 0px 0 1px rgba(10,10,10,0.02);font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel.is-white .panel-heading{background-color:#fff;color:#0a0a0a}.panel.is-white .panel-tabs a.is-active{border-bottom-color:#fff}.panel.is-white .panel-block.is-active .panel-icon{color:#fff}.panel.is-black .panel-heading{background-color:#0a0a0a;color:#fff}.panel.is-black .panel-tabs a.is-active{border-bottom-color:#0a0a0a}.panel.is-black .panel-block.is-active .panel-icon{color:#0a0a0a}.panel.is-light .panel-heading{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.panel.is-light .panel-tabs a.is-active{border-bottom-color:#d2f9d6}.panel.is-light .panel-block.is-active .panel-icon{color:#d2f9d6}.panel.is-dark .panel-heading{background-color:#459558;color:#fff}.panel.is-dark .panel-tabs a.is-active{border-bottom-color:#459558}.panel.is-dark .panel-block.is-active .panel-icon{color:#459558}.panel.is-primary .panel-heading{background-color:#55be6f;color:#fff}.panel.is-primary .panel-tabs a.is-active{border-bottom-color:#55be6f}.panel.is-primary .panel-block.is-active .panel-icon{color:#55be6f}.panel.is-link .panel-heading{background-color:#4876ff;color:#fff}.panel.is-link .panel-tabs a.is-active{border-bottom-color:#4876ff}.panel.is-link .panel-block.is-active .panel-icon{color:#4876ff}.panel.is-info .panel-heading{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.panel.is-info .panel-tabs a.is-active{border-bottom-color:#f0f8ff}.panel.is-info .panel-block.is-active .panel-icon{color:#f0f8ff}.panel.is-success .panel-heading{background-color:#48c78e;color:#fff}.panel.is-success .panel-tabs a.is-active{border-bottom-color:#48c78e}.panel.is-success .panel-block.is-active .panel-icon{color:#48c78e}.panel.is-warning .panel-heading{background-color:#ffd975;color:rgba(0,0,0,0.7)}.panel.is-warning .panel-tabs a.is-active{border-bottom-color:#ffd975}.panel.is-warning .panel-block.is-active .panel-icon{color:#ffd975}.panel.is-danger .panel-heading{background-color:#f14668;color:#fff}.panel.is-danger .panel-tabs a.is-active{border-bottom-color:#f14668}.panel.is-danger .panel-block.is-active .panel-icon{color:#f14668}.panel-tabs:not(:last-child),.panel-block:not(:last-child){border-bottom:1px solid #ededed}.panel-heading{background-color:#ededed;border-radius:6px 6px 0 0;color:#363636;font-size:1.25em;font-weight:700;line-height:1.25;padding:0.75em 1em}.panel-tabs{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:0.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#4876ff}.panel-block{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:0.5em 0.75em}.panel-block input[type="checkbox"]{margin-right:.75em}.panel-block>.control{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{flex-wrap:wrap}.panel-block.is-active{border-left-color:#4876ff;color:#363636}.panel-block.is-active .panel-icon{color:#4876ff}.panel-block:last-child{border-bottom-left-radius:6px;border-bottom-right-radius:6px}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:#f5f5f5}.panel-icon{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:0.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#4876ff;color:#4876ff}.tabs ul{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left{padding-right:0.75em}.tabs ul.is-center{flex:none;justify-content:center;padding-left:0.75em;padding-right:0.75em}.tabs ul.is-right{justify-content:flex-end;padding-left:0.75em}.tabs .icon:first-child{margin-right:.5em}.tabs .icon:last-child{margin-left:.5em}.tabs.is-centered ul{justify-content:center}.tabs.is-right ul{justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:#fff;border-color:#dbdbdb;border-bottom-color:rgba(0,0,0,0) !important}.tabs.is-fullwidth li{flex-grow:1;flex-shrink:0}.tabs.is-toggle a{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-top-left-radius:4px;border-bottom-left-radius:4px}.tabs.is-toggle li:last-child a{border-top-right-radius:4px;border-bottom-right-radius:4px}.tabs.is-toggle li.is-active a{background-color:#4876ff;border-color:#4876ff;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:9999px;border-top-left-radius:9999px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:9999px;border-top-right-radius:9999px;padding-right:1.25em}.tabs.is-small{font-size:.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow{flex:none;width:unset}.columns.is-mobile>.column.is-full{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{flex:none;width:50%}.columns.is-mobile>.column.is-one-third{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-0{flex:none;width:0%}.columns.is-mobile>.column.is-offset-0{margin-left:0%}.columns.is-mobile>.column.is-1{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1{margin-left:8.33333%}.columns.is-mobile>.column.is-2{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2{margin-left:16.66667%}.columns.is-mobile>.column.is-3{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4{margin-left:33.33333%}.columns.is-mobile>.column.is-5{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5{margin-left:41.66667%}.columns.is-mobile>.column.is-6{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7{margin-left:58.33333%}.columns.is-mobile>.column.is-8{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8{margin-left:66.66667%}.columns.is-mobile>.column.is-9{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10{margin-left:83.33333%}.columns.is-mobile>.column.is-11{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11{margin-left:91.66667%}.columns.is-mobile>.column.is-12{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}@media screen and (max-width: 768px){.column.is-narrow-mobile{flex:none;width:unset}.column.is-full-mobile{flex:none;width:100%}.column.is-three-quarters-mobile{flex:none;width:75%}.column.is-two-thirds-mobile{flex:none;width:66.6666%}.column.is-half-mobile{flex:none;width:50%}.column.is-one-third-mobile{flex:none;width:33.3333%}.column.is-one-quarter-mobile{flex:none;width:25%}.column.is-one-fifth-mobile{flex:none;width:20%}.column.is-two-fifths-mobile{flex:none;width:40%}.column.is-three-fifths-mobile{flex:none;width:60%}.column.is-four-fifths-mobile{flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-0-mobile{flex:none;width:0%}.column.is-offset-0-mobile{margin-left:0%}.column.is-1-mobile{flex:none;width:8.33333%}.column.is-offset-1-mobile{margin-left:8.33333%}.column.is-2-mobile{flex:none;width:16.66667%}.column.is-offset-2-mobile{margin-left:16.66667%}.column.is-3-mobile{flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{flex:none;width:33.33333%}.column.is-offset-4-mobile{margin-left:33.33333%}.column.is-5-mobile{flex:none;width:41.66667%}.column.is-offset-5-mobile{margin-left:41.66667%}.column.is-6-mobile{flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{flex:none;width:58.33333%}.column.is-offset-7-mobile{margin-left:58.33333%}.column.is-8-mobile{flex:none;width:66.66667%}.column.is-offset-8-mobile{margin-left:66.66667%}.column.is-9-mobile{flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{flex:none;width:83.33333%}.column.is-offset-10-mobile{margin-left:83.33333%}.column.is-11-mobile{flex:none;width:91.66667%}.column.is-offset-11-mobile{margin-left:91.66667%}.column.is-12-mobile{flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}@media screen and (min-width: 769px), print{.column.is-narrow,.column.is-narrow-tablet{flex:none;width:unset}.column.is-full,.column.is-full-tablet{flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-0,.column.is-0-tablet{flex:none;width:0%}.column.is-offset-0,.column.is-offset-0-tablet{margin-left:0%}.column.is-1,.column.is-1-tablet{flex:none;width:8.33333%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.33333%}.column.is-2,.column.is-2-tablet{flex:none;width:16.66667%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.66667%}.column.is-3,.column.is-3-tablet{flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{flex:none;width:33.33333%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.33333%}.column.is-5,.column.is-5-tablet{flex:none;width:41.66667%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.66667%}.column.is-6,.column.is-6-tablet{flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{flex:none;width:58.33333%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.33333%}.column.is-8,.column.is-8-tablet{flex:none;width:66.66667%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.66667%}.column.is-9,.column.is-9-tablet{flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{flex:none;width:83.33333%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.33333%}.column.is-11,.column.is-11-tablet{flex:none;width:91.66667%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.66667%}.column.is-12,.column.is-12-tablet{flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}@media screen and (max-width: 1023px){.column.is-narrow-touch{flex:none;width:unset}.column.is-full-touch{flex:none;width:100%}.column.is-three-quarters-touch{flex:none;width:75%}.column.is-two-thirds-touch{flex:none;width:66.6666%}.column.is-half-touch{flex:none;width:50%}.column.is-one-third-touch{flex:none;width:33.3333%}.column.is-one-quarter-touch{flex:none;width:25%}.column.is-one-fifth-touch{flex:none;width:20%}.column.is-two-fifths-touch{flex:none;width:40%}.column.is-three-fifths-touch{flex:none;width:60%}.column.is-four-fifths-touch{flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-0-touch{flex:none;width:0%}.column.is-offset-0-touch{margin-left:0%}.column.is-1-touch{flex:none;width:8.33333%}.column.is-offset-1-touch{margin-left:8.33333%}.column.is-2-touch{flex:none;width:16.66667%}.column.is-offset-2-touch{margin-left:16.66667%}.column.is-3-touch{flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{flex:none;width:33.33333%}.column.is-offset-4-touch{margin-left:33.33333%}.column.is-5-touch{flex:none;width:41.66667%}.column.is-offset-5-touch{margin-left:41.66667%}.column.is-6-touch{flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{flex:none;width:58.33333%}.column.is-offset-7-touch{margin-left:58.33333%}.column.is-8-touch{flex:none;width:66.66667%}.column.is-offset-8-touch{margin-left:66.66667%}.column.is-9-touch{flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{flex:none;width:83.33333%}.column.is-offset-10-touch{margin-left:83.33333%}.column.is-11-touch{flex:none;width:91.66667%}.column.is-offset-11-touch{margin-left:91.66667%}.column.is-12-touch{flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}@media screen and (min-width: 1024px){.column.is-narrow-desktop{flex:none;width:unset}.column.is-full-desktop{flex:none;width:100%}.column.is-three-quarters-desktop{flex:none;width:75%}.column.is-two-thirds-desktop{flex:none;width:66.6666%}.column.is-half-desktop{flex:none;width:50%}.column.is-one-third-desktop{flex:none;width:33.3333%}.column.is-one-quarter-desktop{flex:none;width:25%}.column.is-one-fifth-desktop{flex:none;width:20%}.column.is-two-fifths-desktop{flex:none;width:40%}.column.is-three-fifths-desktop{flex:none;width:60%}.column.is-four-fifths-desktop{flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-0-desktop{flex:none;width:0%}.column.is-offset-0-desktop{margin-left:0%}.column.is-1-desktop{flex:none;width:8.33333%}.column.is-offset-1-desktop{margin-left:8.33333%}.column.is-2-desktop{flex:none;width:16.66667%}.column.is-offset-2-desktop{margin-left:16.66667%}.column.is-3-desktop{flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{flex:none;width:33.33333%}.column.is-offset-4-desktop{margin-left:33.33333%}.column.is-5-desktop{flex:none;width:41.66667%}.column.is-offset-5-desktop{margin-left:41.66667%}.column.is-6-desktop{flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{flex:none;width:58.33333%}.column.is-offset-7-desktop{margin-left:58.33333%}.column.is-8-desktop{flex:none;width:66.66667%}.column.is-offset-8-desktop{margin-left:66.66667%}.column.is-9-desktop{flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{flex:none;width:83.33333%}.column.is-offset-10-desktop{margin-left:83.33333%}.column.is-11-desktop{flex:none;width:91.66667%}.column.is-offset-11-desktop{margin-left:91.66667%}.column.is-12-desktop{flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}@media screen and (min-width: 1216px){.column.is-narrow-widescreen{flex:none;width:unset}.column.is-full-widescreen{flex:none;width:100%}.column.is-three-quarters-widescreen{flex:none;width:75%}.column.is-two-thirds-widescreen{flex:none;width:66.6666%}.column.is-half-widescreen{flex:none;width:50%}.column.is-one-third-widescreen{flex:none;width:33.3333%}.column.is-one-quarter-widescreen{flex:none;width:25%}.column.is-one-fifth-widescreen{flex:none;width:20%}.column.is-two-fifths-widescreen{flex:none;width:40%}.column.is-three-fifths-widescreen{flex:none;width:60%}.column.is-four-fifths-widescreen{flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-0-widescreen{flex:none;width:0%}.column.is-offset-0-widescreen{margin-left:0%}.column.is-1-widescreen{flex:none;width:8.33333%}.column.is-offset-1-widescreen{margin-left:8.33333%}.column.is-2-widescreen{flex:none;width:16.66667%}.column.is-offset-2-widescreen{margin-left:16.66667%}.column.is-3-widescreen{flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{flex:none;width:33.33333%}.column.is-offset-4-widescreen{margin-left:33.33333%}.column.is-5-widescreen{flex:none;width:41.66667%}.column.is-offset-5-widescreen{margin-left:41.66667%}.column.is-6-widescreen{flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{flex:none;width:58.33333%}.column.is-offset-7-widescreen{margin-left:58.33333%}.column.is-8-widescreen{flex:none;width:66.66667%}.column.is-offset-8-widescreen{margin-left:66.66667%}.column.is-9-widescreen{flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{flex:none;width:83.33333%}.column.is-offset-10-widescreen{margin-left:83.33333%}.column.is-11-widescreen{flex:none;width:91.66667%}.column.is-offset-11-widescreen{margin-left:91.66667%}.column.is-12-widescreen{flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}@media screen and (min-width: 1408px){.column.is-narrow-fullhd{flex:none;width:unset}.column.is-full-fullhd{flex:none;width:100%}.column.is-three-quarters-fullhd{flex:none;width:75%}.column.is-two-thirds-fullhd{flex:none;width:66.6666%}.column.is-half-fullhd{flex:none;width:50%}.column.is-one-third-fullhd{flex:none;width:33.3333%}.column.is-one-quarter-fullhd{flex:none;width:25%}.column.is-one-fifth-fullhd{flex:none;width:20%}.column.is-two-fifths-fullhd{flex:none;width:40%}.column.is-three-fifths-fullhd{flex:none;width:60%}.column.is-four-fifths-fullhd{flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-0-fullhd{flex:none;width:0%}.column.is-offset-0-fullhd{margin-left:0%}.column.is-1-fullhd{flex:none;width:8.33333%}.column.is-offset-1-fullhd{margin-left:8.33333%}.column.is-2-fullhd{flex:none;width:16.66667%}.column.is-offset-2-fullhd{margin-left:16.66667%}.column.is-3-fullhd{flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{flex:none;width:33.33333%}.column.is-offset-4-fullhd{margin-left:33.33333%}.column.is-5-fullhd{flex:none;width:41.66667%}.column.is-offset-5-fullhd{margin-left:41.66667%}.column.is-6-fullhd{flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{flex:none;width:58.33333%}.column.is-offset-7-fullhd{margin-left:58.33333%}.column.is-8-fullhd{flex:none;width:66.66667%}.column.is-offset-8-fullhd{margin-left:66.66667%}.column.is-9-fullhd{flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{flex:none;width:83.33333%}.column.is-offset-10-fullhd{margin-left:83.33333%}.column.is-11-fullhd{flex:none;width:91.66667%}.column.is-offset-11-fullhd{margin-left:91.66667%}.column.is-12-fullhd{flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns:last-child{margin-bottom:-.75rem}.columns:not(:last-child){margin-bottom:calc(1.5rem - .75rem)}.columns.is-centered{justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0 !important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:flex}.columns.is-multiline{flex-wrap:wrap}.columns.is-vcentered{align-items:center}@media screen and (min-width: 769px), print{.columns:not(.is-desktop){display:flex}}@media screen and (min-width: 1024px){.columns.is-desktop{display:flex}}.columns.is-variable{--columnGap: 0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable>.column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap: 0rem}@media screen and (max-width: 768px){.columns.is-variable.is-0-mobile{--columnGap: 0rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-0-tablet{--columnGap: 0rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-0-tablet-only{--columnGap: 0rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-0-touch{--columnGap: 0rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-0-desktop{--columnGap: 0rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-0-desktop-only{--columnGap: 0rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-0-widescreen{--columnGap: 0rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-0-widescreen-only{--columnGap: 0rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-0-fullhd{--columnGap: 0rem}}.columns.is-variable.is-1{--columnGap: .25rem}@media screen and (max-width: 768px){.columns.is-variable.is-1-mobile{--columnGap: .25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-1-tablet{--columnGap: .25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-1-tablet-only{--columnGap: .25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-1-touch{--columnGap: .25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-1-desktop{--columnGap: .25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-1-desktop-only{--columnGap: .25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-1-widescreen{--columnGap: .25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-1-widescreen-only{--columnGap: .25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-1-fullhd{--columnGap: .25rem}}.columns.is-variable.is-2{--columnGap: .5rem}@media screen and (max-width: 768px){.columns.is-variable.is-2-mobile{--columnGap: .5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-2-tablet{--columnGap: .5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-2-tablet-only{--columnGap: .5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-2-touch{--columnGap: .5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-2-desktop{--columnGap: .5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-2-desktop-only{--columnGap: .5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-2-widescreen{--columnGap: .5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-2-widescreen-only{--columnGap: .5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-2-fullhd{--columnGap: .5rem}}.columns.is-variable.is-3{--columnGap: .75rem}@media screen and (max-width: 768px){.columns.is-variable.is-3-mobile{--columnGap: .75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-3-tablet{--columnGap: .75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-3-tablet-only{--columnGap: .75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-3-touch{--columnGap: .75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-3-desktop{--columnGap: .75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-3-desktop-only{--columnGap: .75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-3-widescreen{--columnGap: .75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-3-widescreen-only{--columnGap: .75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-3-fullhd{--columnGap: .75rem}}.columns.is-variable.is-4{--columnGap: 1rem}@media screen and (max-width: 768px){.columns.is-variable.is-4-mobile{--columnGap: 1rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-4-tablet{--columnGap: 1rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-4-tablet-only{--columnGap: 1rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-4-touch{--columnGap: 1rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-4-desktop{--columnGap: 1rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-4-desktop-only{--columnGap: 1rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-4-widescreen{--columnGap: 1rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-4-widescreen-only{--columnGap: 1rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-4-fullhd{--columnGap: 1rem}}.columns.is-variable.is-5{--columnGap: 1.25rem}@media screen and (max-width: 768px){.columns.is-variable.is-5-mobile{--columnGap: 1.25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-5-tablet{--columnGap: 1.25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-5-tablet-only{--columnGap: 1.25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-5-touch{--columnGap: 1.25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-5-desktop{--columnGap: 1.25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-5-desktop-only{--columnGap: 1.25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-5-widescreen{--columnGap: 1.25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-5-widescreen-only{--columnGap: 1.25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-5-fullhd{--columnGap: 1.25rem}}.columns.is-variable.is-6{--columnGap: 1.5rem}@media screen and (max-width: 768px){.columns.is-variable.is-6-mobile{--columnGap: 1.5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-6-tablet{--columnGap: 1.5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-6-tablet-only{--columnGap: 1.5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-6-touch{--columnGap: 1.5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-6-desktop{--columnGap: 1.5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-6-desktop-only{--columnGap: 1.5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-6-widescreen{--columnGap: 1.5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-6-widescreen-only{--columnGap: 1.5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-6-fullhd{--columnGap: 1.5rem}}.columns.is-variable.is-7{--columnGap: 1.75rem}@media screen and (max-width: 768px){.columns.is-variable.is-7-mobile{--columnGap: 1.75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-7-tablet{--columnGap: 1.75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-7-tablet-only{--columnGap: 1.75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-7-touch{--columnGap: 1.75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-7-desktop{--columnGap: 1.75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-7-desktop-only{--columnGap: 1.75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-7-widescreen{--columnGap: 1.75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-7-widescreen-only{--columnGap: 1.75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-7-fullhd{--columnGap: 1.75rem}}.columns.is-variable.is-8{--columnGap: 2rem}@media screen and (max-width: 768px){.columns.is-variable.is-8-mobile{--columnGap: 2rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-8-tablet{--columnGap: 2rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-8-tablet-only{--columnGap: 2rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-8-touch{--columnGap: 2rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-8-desktop{--columnGap: 2rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-8-desktop-only{--columnGap: 2rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-8-widescreen{--columnGap: 2rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-8-widescreen-only{--columnGap: 2rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-8-fullhd{--columnGap: 2rem}}.tile{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:min-content}.tile.is-ancestor{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor:last-child{margin-bottom:-.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:.75rem}.tile.is-child{margin:0 !important}.tile.is-parent{padding:.75rem}.tile.is-vertical{flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem !important}@media screen and (min-width: 769px), print{.tile:not(.is-child){display:flex}.tile.is-1{flex:none;width:8.33333%}.tile.is-2{flex:none;width:16.66667%}.tile.is-3{flex:none;width:25%}.tile.is-4{flex:none;width:33.33333%}.tile.is-5{flex:none;width:41.66667%}.tile.is-6{flex:none;width:50%}.tile.is-7{flex:none;width:58.33333%}.tile.is-8{flex:none;width:66.66667%}.tile.is-9{flex:none;width:75%}.tile.is-10{flex:none;width:83.33333%}.tile.is-11{flex:none;width:91.66667%}.tile.is-12{flex:none;width:100%}}.has-text-white{color:#fff !important}a.has-text-white:hover,a.has-text-white:focus{color:#e6e6e6 !important}.has-background-white{background-color:#fff !important}.has-text-black{color:#0a0a0a !important}a.has-text-black:hover,a.has-text-black:focus{color:#000 !important}.has-background-black{background-color:#0a0a0a !important}.has-text-light{color:#d2f9d6 !important}a.has-text-light:hover,a.has-text-light:focus{color:#a5f3ad !important}.has-background-light{background-color:#d2f9d6 !important}.has-text-dark{color:#459558 !important}a.has-text-dark:hover,a.has-text-dark:focus{color:#357243 !important}.has-background-dark{background-color:#459558 !important}.has-text-primary{color:#55be6f !important}a.has-text-primary:hover,a.has-text-primary:focus{color:#3ea257 !important}.has-background-primary{background-color:#55be6f !important}.has-text-primary-light{color:#f0f9f2 !important}a.has-text-primary-light:hover,a.has-text-primary-light:focus{color:#cbebd3 !important}.has-background-primary-light{background-color:#f0f9f2 !important}.has-text-primary-dark{color:#2f7a41 !important}a.has-text-primary-dark:hover,a.has-text-primary-dark:focus{color:#3d9f55 !important}.has-background-primary-dark{background-color:#2f7a41 !important}.has-text-link{color:#4876ff !important}a.has-text-link:hover,a.has-text-link:focus{color:#1550ff !important}.has-background-link{background-color:#4876ff !important}.has-text-link-light{color:#ebf0ff !important}a.has-text-link-light:hover,a.has-text-link-light:focus{color:#b8caff !important}.has-background-link-light{background-color:#ebf0ff !important}.has-text-link-dark{color:#0037db !important}a.has-text-link-dark:hover,a.has-text-link-dark:focus{color:#0f4cff !important}.has-background-link-dark{background-color:#0037db !important}.has-text-info{color:#f0f8ff !important}a.has-text-info:hover,a.has-text-info:focus{color:#bde0ff !important}.has-background-info{background-color:#f0f8ff !important}.has-text-info-light{color:#f0f8ff !important}a.has-text-info-light:hover,a.has-text-info-light:focus{color:#bde0ff !important}.has-background-info-light{background-color:#f0f8ff !important}.has-text-info-dark{color:#004f94 !important}a.has-text-info-dark:hover,a.has-text-info-dark:focus{color:#006ac7 !important}.has-background-info-dark{background-color:#004f94 !important}.has-text-success{color:#48c78e !important}a.has-text-success:hover,a.has-text-success:focus{color:#34a873 !important}.has-background-success{background-color:#48c78e !important}.has-text-success-light{color:#effaf5 !important}a.has-text-success-light:hover,a.has-text-success-light:focus{color:#c8eedd !important}.has-background-success-light{background-color:#effaf5 !important}.has-text-success-dark{color:#257953 !important}a.has-text-success-dark:hover,a.has-text-success-dark:focus{color:#31a06e !important}.has-background-success-dark{background-color:#257953 !important}.has-text-warning{color:#ffd975 !important}a.has-text-warning:hover,a.has-text-warning:focus{color:#ffcb42 !important}.has-background-warning{background-color:#ffd975 !important}.has-text-warning-light{color:#fff9eb !important}a.has-text-warning-light:hover,a.has-text-warning-light:focus{color:#ffebb8 !important}.has-background-warning-light{background-color:#fff9eb !important}.has-text-warning-dark{color:#946b00 !important}a.has-text-warning-dark:hover,a.has-text-warning-dark:focus{color:#c79000 !important}.has-background-warning-dark{background-color:#946b00 !important}.has-text-danger{color:#f14668 !important}a.has-text-danger:hover,a.has-text-danger:focus{color:#ee1742 !important}.has-background-danger{background-color:#f14668 !important}.has-text-danger-light{color:#feecf0 !important}a.has-text-danger-light:hover,a.has-text-danger-light:focus{color:#fabdc9 !important}.has-background-danger-light{background-color:#feecf0 !important}.has-text-danger-dark{color:#cc0f35 !important}a.has-text-danger-dark:hover,a.has-text-danger-dark:focus{color:#ee2049 !important}.has-background-danger-dark{background-color:#cc0f35 !important}.has-text-black-bis{color:#121212 !important}.has-background-black-bis{background-color:#121212 !important}.has-text-black-ter{color:#242424 !important}.has-background-black-ter{background-color:#242424 !important}.has-text-grey-darker{color:#363636 !important}.has-background-grey-darker{background-color:#363636 !important}.has-text-grey-dark{color:#4a4a4a !important}.has-background-grey-dark{background-color:#4a4a4a !important}.has-text-grey{color:#7a7a7a !important}.has-background-grey{background-color:#7a7a7a !important}.has-text-grey-light{color:#b5b5b5 !important}.has-background-grey-light{background-color:#b5b5b5 !important}.has-text-grey-lighter{color:#dbdbdb !important}.has-background-grey-lighter{background-color:#dbdbdb !important}.has-text-white-ter{color:#f5f5f5 !important}.has-background-white-ter{background-color:#f5f5f5 !important}.has-text-white-bis{color:#fafafa !important}.has-background-white-bis{background-color:#fafafa !important}.is-flex-direction-row{flex-direction:row !important}.is-flex-direction-row-reverse{flex-direction:row-reverse !important}.is-flex-direction-column{flex-direction:column !important}.is-flex-direction-column-reverse{flex-direction:column-reverse !important}.is-flex-wrap-nowrap{flex-wrap:nowrap !important}.is-flex-wrap-wrap{flex-wrap:wrap !important}.is-flex-wrap-wrap-reverse{flex-wrap:wrap-reverse !important}.is-justify-content-flex-start{justify-content:flex-start !important}.is-justify-content-flex-end{justify-content:flex-end !important}.is-justify-content-center{justify-content:center !important}.is-justify-content-space-between{justify-content:space-between !important}.is-justify-content-space-around{justify-content:space-around !important}.is-justify-content-space-evenly{justify-content:space-evenly !important}.is-justify-content-start{justify-content:start !important}.is-justify-content-end{justify-content:end !important}.is-justify-content-left{justify-content:left !important}.is-justify-content-right{justify-content:right !important}.is-align-content-flex-start{align-content:flex-start !important}.is-align-content-flex-end{align-content:flex-end !important}.is-align-content-center{align-content:center !important}.is-align-content-space-between{align-content:space-between !important}.is-align-content-space-around{align-content:space-around !important}.is-align-content-space-evenly{align-content:space-evenly !important}.is-align-content-stretch{align-content:stretch !important}.is-align-content-start{align-content:start !important}.is-align-content-end{align-content:end !important}.is-align-content-baseline{align-content:baseline !important}.is-align-items-stretch{align-items:stretch !important}.is-align-items-flex-start{align-items:flex-start !important}.is-align-items-flex-end{align-items:flex-end !important}.is-align-items-center{align-items:center !important}.is-align-items-baseline{align-items:baseline !important}.is-align-items-start{align-items:start !important}.is-align-items-end{align-items:end !important}.is-align-items-self-start{align-items:self-start !important}.is-align-items-self-end{align-items:self-end !important}.is-align-self-auto{align-self:auto !important}.is-align-self-flex-start{align-self:flex-start !important}.is-align-self-flex-end{align-self:flex-end !important}.is-align-self-center{align-self:center !important}.is-align-self-baseline{align-self:baseline !important}.is-align-self-stretch{align-self:stretch !important}.is-flex-grow-0{flex-grow:0 !important}.is-flex-grow-1{flex-grow:1 !important}.is-flex-grow-2{flex-grow:2 !important}.is-flex-grow-3{flex-grow:3 !important}.is-flex-grow-4{flex-grow:4 !important}.is-flex-grow-5{flex-grow:5 !important}.is-flex-shrink-0{flex-shrink:0 !important}.is-flex-shrink-1{flex-shrink:1 !important}.is-flex-shrink-2{flex-shrink:2 !important}.is-flex-shrink-3{flex-shrink:3 !important}.is-flex-shrink-4{flex-shrink:4 !important}.is-flex-shrink-5{flex-shrink:5 !important}.is-clearfix::after{clear:both;content:" ";display:table}.is-pulled-left{float:left !important}.is-pulled-right{float:right !important}.is-radiusless{border-radius:0 !important}.is-shadowless{box-shadow:none !important}.is-clickable{cursor:pointer !important;pointer-events:all !important}.is-clipped{overflow:hidden !important}.is-relative{position:relative !important}.is-marginless{margin:0 !important}.is-paddingless{padding:0 !important}.m-0{margin:0 !important}.mt-0{margin-top:0 !important}.mr-0{margin-right:0 !important}.mb-0{margin-bottom:0 !important}.ml-0{margin-left:0 !important}.mx-0{margin-left:0 !important;margin-right:0 !important}.my-0{margin-top:0 !important;margin-bottom:0 !important}.m-1{margin:.25rem !important}.mt-1{margin-top:.25rem !important}.mr-1{margin-right:.25rem !important}.mb-1{margin-bottom:.25rem !important}.ml-1{margin-left:.25rem !important}.mx-1{margin-left:.25rem !important;margin-right:.25rem !important}.my-1{margin-top:.25rem !important;margin-bottom:.25rem !important}.m-2{margin:.5rem !important}.mt-2{margin-top:.5rem !important}.mr-2{margin-right:.5rem !important}.mb-2{margin-bottom:.5rem !important}.ml-2{margin-left:.5rem !important}.mx-2{margin-left:.5rem !important;margin-right:.5rem !important}.my-2{margin-top:.5rem !important;margin-bottom:.5rem !important}.m-3{margin:.75rem !important}.mt-3{margin-top:.75rem !important}.mr-3{margin-right:.75rem !important}.mb-3{margin-bottom:.75rem !important}.ml-3{margin-left:.75rem !important}.mx-3{margin-left:.75rem !important;margin-right:.75rem !important}.my-3{margin-top:.75rem !important;margin-bottom:.75rem !important}.m-4{margin:1rem !important}.mt-4{margin-top:1rem !important}.mr-4{margin-right:1rem !important}.mb-4{margin-bottom:1rem !important}.ml-4{margin-left:1rem !important}.mx-4{margin-left:1rem !important;margin-right:1rem !important}.my-4{margin-top:1rem !important;margin-bottom:1rem !important}.m-5{margin:1.5rem !important}.mt-5{margin-top:1.5rem !important}.mr-5{margin-right:1.5rem !important}.mb-5{margin-bottom:1.5rem !important}.ml-5{margin-left:1.5rem !important}.mx-5{margin-left:1.5rem !important;margin-right:1.5rem !important}.my-5{margin-top:1.5rem !important;margin-bottom:1.5rem !important}.m-6{margin:3rem !important}.mt-6{margin-top:3rem !important}.mr-6{margin-right:3rem !important}.mb-6{margin-bottom:3rem !important}.ml-6{margin-left:3rem !important}.mx-6{margin-left:3rem !important;margin-right:3rem !important}.my-6{margin-top:3rem !important;margin-bottom:3rem !important}.m-auto{margin:auto !important}.mt-auto{margin-top:auto !important}.mr-auto{margin-right:auto !important}.mb-auto{margin-bottom:auto !important}.ml-auto{margin-left:auto !important}.mx-auto{margin-left:auto !important;margin-right:auto !important}.my-auto{margin-top:auto !important;margin-bottom:auto !important}.p-0{padding:0 !important}.pt-0{padding-top:0 !important}.pr-0{padding-right:0 !important}.pb-0{padding-bottom:0 !important}.pl-0{padding-left:0 !important}.px-0{padding-left:0 !important;padding-right:0 !important}.py-0{padding-top:0 !important;padding-bottom:0 !important}.p-1{padding:.25rem !important}.pt-1{padding-top:.25rem !important}.pr-1{padding-right:.25rem !important}.pb-1{padding-bottom:.25rem !important}.pl-1{padding-left:.25rem !important}.px-1{padding-left:.25rem !important;padding-right:.25rem !important}.py-1{padding-top:.25rem !important;padding-bottom:.25rem !important}.p-2{padding:.5rem !important}.pt-2{padding-top:.5rem !important}.pr-2{padding-right:.5rem !important}.pb-2{padding-bottom:.5rem !important}.pl-2{padding-left:.5rem !important}.px-2{padding-left:.5rem !important;padding-right:.5rem !important}.py-2{padding-top:.5rem !important;padding-bottom:.5rem !important}.p-3{padding:.75rem !important}.pt-3{padding-top:.75rem !important}.pr-3{padding-right:.75rem !important}.pb-3{padding-bottom:.75rem !important}.pl-3{padding-left:.75rem !important}.px-3{padding-left:.75rem !important;padding-right:.75rem !important}.py-3{padding-top:.75rem !important;padding-bottom:.75rem !important}.p-4{padding:1rem !important}.pt-4{padding-top:1rem !important}.pr-4{padding-right:1rem !important}.pb-4{padding-bottom:1rem !important}.pl-4{padding-left:1rem !important}.px-4{padding-left:1rem !important;padding-right:1rem !important}.py-4{padding-top:1rem !important;padding-bottom:1rem !important}.p-5{padding:1.5rem !important}.pt-5{padding-top:1.5rem !important}.pr-5{padding-right:1.5rem !important}.pb-5{padding-bottom:1.5rem !important}.pl-5{padding-left:1.5rem !important}.px-5{padding-left:1.5rem !important;padding-right:1.5rem !important}.py-5{padding-top:1.5rem !important;padding-bottom:1.5rem !important}.p-6{padding:3rem !important}.pt-6{padding-top:3rem !important}.pr-6{padding-right:3rem !important}.pb-6{padding-bottom:3rem !important}.pl-6{padding-left:3rem !important}.px-6{padding-left:3rem !important;padding-right:3rem !important}.py-6{padding-top:3rem !important;padding-bottom:3rem !important}.p-auto{padding:auto !important}.pt-auto{padding-top:auto !important}.pr-auto{padding-right:auto !important}.pb-auto{padding-bottom:auto !important}.pl-auto{padding-left:auto !important}.px-auto{padding-left:auto !important;padding-right:auto !important}.py-auto{padding-top:auto !important;padding-bottom:auto !important}.is-size-1{font-size:3rem !important}.is-size-2{font-size:2.5rem !important}.is-size-3{font-size:2rem !important}.is-size-4{font-size:1.5rem !important}.is-size-5{font-size:1.25rem !important}.is-size-6{font-size:1rem !important}.is-size-7{font-size:.75rem !important}@media screen and (max-width: 768px){.is-size-1-mobile{font-size:3rem !important}.is-size-2-mobile{font-size:2.5rem !important}.is-size-3-mobile{font-size:2rem !important}.is-size-4-mobile{font-size:1.5rem !important}.is-size-5-mobile{font-size:1.25rem !important}.is-size-6-mobile{font-size:1rem !important}.is-size-7-mobile{font-size:.75rem !important}}@media screen and (min-width: 769px), print{.is-size-1-tablet{font-size:3rem !important}.is-size-2-tablet{font-size:2.5rem !important}.is-size-3-tablet{font-size:2rem !important}.is-size-4-tablet{font-size:1.5rem !important}.is-size-5-tablet{font-size:1.25rem !important}.is-size-6-tablet{font-size:1rem !important}.is-size-7-tablet{font-size:.75rem !important}}@media screen and (max-width: 1023px){.is-size-1-touch{font-size:3rem !important}.is-size-2-touch{font-size:2.5rem !important}.is-size-3-touch{font-size:2rem !important}.is-size-4-touch{font-size:1.5rem !important}.is-size-5-touch{font-size:1.25rem !important}.is-size-6-touch{font-size:1rem !important}.is-size-7-touch{font-size:.75rem !important}}@media screen and (min-width: 1024px){.is-size-1-desktop{font-size:3rem !important}.is-size-2-desktop{font-size:2.5rem !important}.is-size-3-desktop{font-size:2rem !important}.is-size-4-desktop{font-size:1.5rem !important}.is-size-5-desktop{font-size:1.25rem !important}.is-size-6-desktop{font-size:1rem !important}.is-size-7-desktop{font-size:.75rem !important}}@media screen and (min-width: 1216px){.is-size-1-widescreen{font-size:3rem !important}.is-size-2-widescreen{font-size:2.5rem !important}.is-size-3-widescreen{font-size:2rem !important}.is-size-4-widescreen{font-size:1.5rem !important}.is-size-5-widescreen{font-size:1.25rem !important}.is-size-6-widescreen{font-size:1rem !important}.is-size-7-widescreen{font-size:.75rem !important}}@media screen and (min-width: 1408px){.is-size-1-fullhd{font-size:3rem !important}.is-size-2-fullhd{font-size:2.5rem !important}.is-size-3-fullhd{font-size:2rem !important}.is-size-4-fullhd{font-size:1.5rem !important}.is-size-5-fullhd{font-size:1.25rem !important}.is-size-6-fullhd{font-size:1rem !important}.is-size-7-fullhd{font-size:.75rem !important}}.has-text-centered{text-align:center !important}.has-text-justified{text-align:justify !important}.has-text-left{text-align:left !important}.has-text-right{text-align:right !important}@media screen and (max-width: 768px){.has-text-centered-mobile{text-align:center !important}}@media screen and (min-width: 769px), print{.has-text-centered-tablet{text-align:center !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-centered-tablet-only{text-align:center !important}}@media screen and (max-width: 1023px){.has-text-centered-touch{text-align:center !important}}@media screen and (min-width: 1024px){.has-text-centered-desktop{text-align:center !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-centered-desktop-only{text-align:center !important}}@media screen and (min-width: 1216px){.has-text-centered-widescreen{text-align:center !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-centered-widescreen-only{text-align:center !important}}@media screen and (min-width: 1408px){.has-text-centered-fullhd{text-align:center !important}}@media screen and (max-width: 768px){.has-text-justified-mobile{text-align:justify !important}}@media screen and (min-width: 769px), print{.has-text-justified-tablet{text-align:justify !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-justified-tablet-only{text-align:justify !important}}@media screen and (max-width: 1023px){.has-text-justified-touch{text-align:justify !important}}@media screen and (min-width: 1024px){.has-text-justified-desktop{text-align:justify !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-justified-desktop-only{text-align:justify !important}}@media screen and (min-width: 1216px){.has-text-justified-widescreen{text-align:justify !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-justified-widescreen-only{text-align:justify !important}}@media screen and (min-width: 1408px){.has-text-justified-fullhd{text-align:justify !important}}@media screen and (max-width: 768px){.has-text-left-mobile{text-align:left !important}}@media screen and (min-width: 769px), print{.has-text-left-tablet{text-align:left !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-left-tablet-only{text-align:left !important}}@media screen and (max-width: 1023px){.has-text-left-touch{text-align:left !important}}@media screen and (min-width: 1024px){.has-text-left-desktop{text-align:left !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-left-desktop-only{text-align:left !important}}@media screen and (min-width: 1216px){.has-text-left-widescreen{text-align:left !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-left-widescreen-only{text-align:left !important}}@media screen and (min-width: 1408px){.has-text-left-fullhd{text-align:left !important}}@media screen and (max-width: 768px){.has-text-right-mobile{text-align:right !important}}@media screen and (min-width: 769px), print{.has-text-right-tablet{text-align:right !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-right-tablet-only{text-align:right !important}}@media screen and (max-width: 1023px){.has-text-right-touch{text-align:right !important}}@media screen and (min-width: 1024px){.has-text-right-desktop{text-align:right !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-right-desktop-only{text-align:right !important}}@media screen and (min-width: 1216px){.has-text-right-widescreen{text-align:right !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-right-widescreen-only{text-align:right !important}}@media screen and (min-width: 1408px){.has-text-right-fullhd{text-align:right !important}}.is-capitalized{text-transform:capitalize !important}.is-lowercase{text-transform:lowercase !important}.is-uppercase{text-transform:uppercase !important}.is-italic{font-style:italic !important}.is-underlined{text-decoration:underline !important}.has-text-weight-light{font-weight:300 !important}.has-text-weight-normal{font-weight:400 !important}.has-text-weight-medium{font-weight:500 !important}.has-text-weight-semibold{font-weight:600 !important}.has-text-weight-bold{font-weight:700 !important}.is-family-primary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-secondary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-sans-serif{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif !important}.is-family-monospace{font-family:monospace !important}.is-family-code{font-family:monospace !important}.is-block{display:block !important}@media screen and (max-width: 768px){.is-block-mobile{display:block !important}}@media screen and (min-width: 769px), print{.is-block-tablet{display:block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-block-tablet-only{display:block !important}}@media screen and (max-width: 1023px){.is-block-touch{display:block !important}}@media screen and (min-width: 1024px){.is-block-desktop{display:block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-block-desktop-only{display:block !important}}@media screen and (min-width: 1216px){.is-block-widescreen{display:block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-block-widescreen-only{display:block !important}}@media screen and (min-width: 1408px){.is-block-fullhd{display:block !important}}.is-flex{display:flex !important}@media screen and (max-width: 768px){.is-flex-mobile{display:flex !important}}@media screen and (min-width: 769px), print{.is-flex-tablet{display:flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-flex-tablet-only{display:flex !important}}@media screen and (max-width: 1023px){.is-flex-touch{display:flex !important}}@media screen and (min-width: 1024px){.is-flex-desktop{display:flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-flex-desktop-only{display:flex !important}}@media screen and (min-width: 1216px){.is-flex-widescreen{display:flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-flex-widescreen-only{display:flex !important}}@media screen and (min-width: 1408px){.is-flex-fullhd{display:flex !important}}.is-inline{display:inline !important}@media screen and (max-width: 768px){.is-inline-mobile{display:inline !important}}@media screen and (min-width: 769px), print{.is-inline-tablet{display:inline !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-tablet-only{display:inline !important}}@media screen and (max-width: 1023px){.is-inline-touch{display:inline !important}}@media screen and (min-width: 1024px){.is-inline-desktop{display:inline !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-desktop-only{display:inline !important}}@media screen and (min-width: 1216px){.is-inline-widescreen{display:inline !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-widescreen-only{display:inline !important}}@media screen and (min-width: 1408px){.is-inline-fullhd{display:inline !important}}.is-inline-block{display:inline-block !important}@media screen and (max-width: 768px){.is-inline-block-mobile{display:inline-block !important}}@media screen and (min-width: 769px), print{.is-inline-block-tablet{display:inline-block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-block-tablet-only{display:inline-block !important}}@media screen and (max-width: 1023px){.is-inline-block-touch{display:inline-block !important}}@media screen and (min-width: 1024px){.is-inline-block-desktop{display:inline-block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-block-desktop-only{display:inline-block !important}}@media screen and (min-width: 1216px){.is-inline-block-widescreen{display:inline-block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-block-widescreen-only{display:inline-block !important}}@media screen and (min-width: 1408px){.is-inline-block-fullhd{display:inline-block !important}}.is-inline-flex{display:inline-flex !important}@media screen and (max-width: 768px){.is-inline-flex-mobile{display:inline-flex !important}}@media screen and (min-width: 769px), print{.is-inline-flex-tablet{display:inline-flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-flex-tablet-only{display:inline-flex !important}}@media screen and (max-width: 1023px){.is-inline-flex-touch{display:inline-flex !important}}@media screen and (min-width: 1024px){.is-inline-flex-desktop{display:inline-flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-flex-desktop-only{display:inline-flex !important}}@media screen and (min-width: 1216px){.is-inline-flex-widescreen{display:inline-flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-flex-widescreen-only{display:inline-flex !important}}@media screen and (min-width: 1408px){.is-inline-flex-fullhd{display:inline-flex !important}}.is-hidden{display:none !important}.is-sr-only{border:none !important;clip:rect(0, 0, 0, 0) !important;height:0.01em !important;overflow:hidden !important;padding:0 !important;position:absolute !important;white-space:nowrap !important;width:0.01em !important}@media screen and (max-width: 768px){.is-hidden-mobile{display:none !important}}@media screen and (min-width: 769px), print{.is-hidden-tablet{display:none !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-hidden-tablet-only{display:none !important}}@media screen and (max-width: 1023px){.is-hidden-touch{display:none !important}}@media screen and (min-width: 1024px){.is-hidden-desktop{display:none !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-hidden-desktop-only{display:none !important}}@media screen and (min-width: 1216px){.is-hidden-widescreen{display:none !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-hidden-widescreen-only{display:none !important}}@media screen and (min-width: 1408px){.is-hidden-fullhd{display:none !important}}.is-invisible{visibility:hidden !important}@media screen and (max-width: 768px){.is-invisible-mobile{visibility:hidden !important}}@media screen and (min-width: 769px), print{.is-invisible-tablet{visibility:hidden !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-invisible-tablet-only{visibility:hidden !important}}@media screen and (max-width: 1023px){.is-invisible-touch{visibility:hidden !important}}@media screen and (min-width: 1024px){.is-invisible-desktop{visibility:hidden !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-invisible-desktop-only{visibility:hidden !important}}@media screen and (min-width: 1216px){.is-invisible-widescreen{visibility:hidden !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-invisible-widescreen-only{visibility:hidden !important}}@media screen and (min-width: 1408px){.is-invisible-fullhd{visibility:hidden !important}}.hero{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar{background:none}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:#fff;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:rgba(10,10,10,0.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}@media screen and (max-width: 1023px){.hero.is-white .navbar-menu{background-color:#fff}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:rgba(10,10,10,0.7)}.hero.is-white a.navbar-item:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white .navbar-link:hover,.hero.is-white .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:0.9}.hero.is-white .tabs a:hover{opacity:1}.hero.is-white .tabs li.is-active a{color:#fff !important;opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold{background-image:linear-gradient(141deg, #e6e6e6 0%, #fff 71%, #fff 100%)}@media screen and (max-width: 768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg, #e6e6e6 0%, #fff 71%, #fff 100%)}}.hero.is-black{background-color:#0a0a0a;color:#fff}.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong{color:inherit}.hero.is-black .title{color:#fff}.hero.is-black .subtitle{color:rgba(255,255,255,0.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-black a.navbar-item:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black .navbar-link:hover,.hero.is-black .navbar-link.is-active{background-color:#000;color:#fff}.hero.is-black .tabs a{color:#fff;opacity:0.9}.hero.is-black .tabs a:hover{opacity:1}.hero.is-black .tabs li.is-active a{color:#0a0a0a !important;opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:#fff}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg, #000 0%, #0a0a0a 71%, #181616 100%)}@media screen and (max-width: 768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg, #000 0%, #0a0a0a 71%, #181616 100%)}}.hero.is-light{background-color:#d2f9d6;color:rgba(0,0,0,0.7)}.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong{color:inherit}.hero.is-light .title{color:rgba(0,0,0,0.7)}.hero.is-light .subtitle{color:rgba(0,0,0,0.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-light .navbar-menu{background-color:#d2f9d6}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-light a.navbar-item:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light .navbar-link:hover,.hero.is-light .navbar-link.is-active{background-color:#bcf6c2;color:rgba(0,0,0,0.7)}.hero.is-light .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-light .tabs a:hover{opacity:1}.hero.is-light .tabs li.is-active a{color:#d2f9d6 !important;opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#d2f9d6}.hero.is-light.is-bold{background-image:linear-gradient(141deg, #a6f8a0 0%, #d2f9d6 71%, #e8fded 100%)}@media screen and (max-width: 768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg, #a6f8a0 0%, #d2f9d6 71%, #e8fded 100%)}}.hero.is-dark{background-color:#459558;color:#fff}.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#fff}.hero.is-dark .subtitle{color:rgba(255,255,255,0.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-dark .navbar-menu{background-color:#459558}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-dark a.navbar-item:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark .navbar-link.is-active{background-color:#3d844e;color:#fff}.hero.is-dark .tabs a{color:#fff;opacity:0.9}.hero.is-dark .tabs a:hover{opacity:1}.hero.is-dark .tabs li.is-active a{color:#459558 !important;opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#fff}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#459558}.hero.is-dark.is-bold{background-image:linear-gradient(141deg, #2d7a32 0%, #459558 71%, #47ad70 100%)}@media screen and (max-width: 768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg, #2d7a32 0%, #459558 71%, #47ad70 100%)}}.hero.is-primary{background-color:#55be6f;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:rgba(255,255,255,0.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-primary .navbar-menu{background-color:#55be6f}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-primary a.navbar-item:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary .navbar-link.is-active{background-color:#45b461;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:0.9}.hero.is-primary .tabs a:hover{opacity:1}.hero.is-primary .tabs li.is-active a{color:#55be6f !important;opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#55be6f}.hero.is-primary.is-bold{background-image:linear-gradient(141deg, #33ad3d 0%, #55be6f 71%, #62ca8d 100%)}@media screen and (max-width: 768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg, #33ad3d 0%, #55be6f 71%, #62ca8d 100%)}}.hero.is-link{background-color:#4876ff;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:rgba(255,255,255,0.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-link .navbar-menu{background-color:#4876ff}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-link a.navbar-item:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link .navbar-link:hover,.hero.is-link .navbar-link.is-active{background-color:#2f63ff;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:0.9}.hero.is-link .tabs a:hover{opacity:1}.hero.is-link .tabs li.is-active a{color:#4876ff !important;opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#4876ff}.hero.is-link.is-bold{background-image:linear-gradient(141deg, #1577ff 0%, #4876ff 71%, #626fff 100%)}@media screen and (max-width: 768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg, #1577ff 0%, #4876ff 71%, #626fff 100%)}}.hero.is-info{background-color:#f0f8ff;color:rgba(0,0,0,0.7)}.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong{color:inherit}.hero.is-info .title{color:rgba(0,0,0,0.7)}.hero.is-info .subtitle{color:rgba(0,0,0,0.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-info .navbar-menu{background-color:#f0f8ff}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-info a.navbar-item:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info .navbar-link:hover,.hero.is-info .navbar-link.is-active{background-color:#d7ecff;color:rgba(0,0,0,0.7)}.hero.is-info .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-info .tabs a:hover{opacity:1}.hero.is-info .tabs li.is-active a{color:#f0f8ff !important;opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#f0f8ff}.hero.is-info.is-bold{background-image:linear-gradient(141deg, #bdebff 0%, #f0f8ff 71%, #fff 100%)}@media screen and (max-width: 768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg, #bdebff 0%, #f0f8ff 71%, #fff 100%)}}.hero.is-success{background-color:#48c78e;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:rgba(255,255,255,0.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-success .navbar-menu{background-color:#48c78e}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-success a.navbar-item:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success .navbar-link:hover,.hero.is-success .navbar-link.is-active{background-color:#3abb81;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:0.9}.hero.is-success .tabs a:hover{opacity:1}.hero.is-success .tabs li.is-active a{color:#48c78e !important;opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#48c78e}.hero.is-success.is-bold{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}@media screen and (max-width: 768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}}.hero.is-warning{background-color:#ffd975;color:rgba(0,0,0,0.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0,0,0,0.7)}.hero.is-warning .subtitle{color:rgba(0,0,0,0.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0,0,0,0.7)}@media screen and (max-width: 1023px){.hero.is-warning .navbar-menu{background-color:#ffd975}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0,0,0,0.7)}.hero.is-warning a.navbar-item:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning .navbar-link.is-active{background-color:#ffd25c;color:rgba(0,0,0,0.7)}.hero.is-warning .tabs a{color:rgba(0,0,0,0.7);opacity:0.9}.hero.is-warning .tabs a:hover{opacity:1}.hero.is-warning .tabs li.is-active a{color:#ffd975 !important;opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0,0,0,0.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.7);color:#ffd975}.hero.is-warning.is-bold{background-image:linear-gradient(141deg, #ffab42 0%, #ffd975 71%, #fff38f 100%)}@media screen and (max-width: 768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg, #ffab42 0%, #ffd975 71%, #fff38f 100%)}}.hero.is-danger{background-color:#f14668;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:rgba(255,255,255,0.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-danger .navbar-menu{background-color:#f14668}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:rgba(255,255,255,0.7)}.hero.is-danger a.navbar-item:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger .navbar-link.is-active{background-color:#ef2e55;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:0.9}.hero.is-danger .tabs a:hover{opacity:1}.hero.is-danger .tabs li.is-active a{color:#f14668 !important;opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:rgba(10,10,10,0.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#f14668}.hero.is-danger.is-bold{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}@media screen and (max-width: 768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}}.hero.is-small .hero-body{padding:1.5rem}@media screen and (min-width: 769px), print{.hero.is-medium .hero-body{padding:9rem 4.5rem}}@media screen and (min-width: 769px), print{.hero.is-large .hero-body{padding:18rem 6rem}}.hero.is-halfheight .hero-body,.hero.is-fullheight .hero-body,.hero.is-fullheight-with-navbar .hero-body{align-items:center;display:flex}.hero.is-halfheight .hero-body>.container,.hero.is-fullheight .hero-body>.container,.hero.is-fullheight-with-navbar .hero-body>.container{flex-grow:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%, -50%, 0)}.hero-video.is-transparent{opacity:0.3}@media screen and (max-width: 768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}@media screen and (max-width: 768px){.hero-buttons .button{display:flex}.hero-buttons .button:not(:last-child){margin-bottom:0.75rem}}@media screen and (min-width: 769px), print{.hero-buttons{display:flex;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-head,.hero-foot{flex-grow:0;flex-shrink:0}.hero-body{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}@media screen and (min-width: 769px), print{.hero-body{padding:3rem 3rem}}.section{padding:3rem 1.5rem}@media screen and (min-width: 1024px){.section{padding:3rem 3rem}.section.is-medium{padding:9rem 4.5rem}.section.is-large{padding:18rem 6rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}:host{font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif;color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5;box-sizing:border-box;overflow:hidden}\n',""]);const n=s},6314:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i="",a=void 0!==t[5];return t[4]&&(i+="@supports (".concat(t[4],") {")),t[2]&&(i+="@media ".concat(t[2]," {")),a&&(i+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),i+=e(t),a&&(i+="}"),t[2]&&(i+="}"),t[4]&&(i+="}"),i})).join("")},t.i=function(e,i,a,r,o){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(a)for(var n=0;n<this.length;n++){var l=this[n][0];null!=l&&(s[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);a&&s[c[0]]||(void 0!==o&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=o),i&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=i):c[2]=i),r&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=r):c[4]="".concat(r)),t.push(c))}},t}},1601:e=>{"use strict";e.exports=function(e){return e[1]}},5563:function(e,t){"use strict";var i=this&&this.__await||function(e){return this instanceof i?(this.v=e,this):new i(e)},a=this&&this.__asyncGenerator||function(e,t,a){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=a.apply(e,t||[]),s=[];return r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r;function n(e){o[e]&&(r[e]=function(t){return new Promise((function(i,a){s.push([e,t,i,a])>1||l(e,t)}))})}function l(e,t){try{(a=o[e](t)).value instanceof i?Promise.resolve(a.value.v).then(d,c):h(s[0][2],a)}catch(e){h(s[0][3],e)}var a}function d(e){l("next",e)}function c(e){l("throw",e)}function h(e,t){e(t),s.shift(),s.length&&l(s[0][0],s[0][1])}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return a(this,arguments,(function*(){const t=/\r?\n/,a=new TextDecoder;let r="",o=e.read();for(;;){const{done:s,value:n}=yield i(o);if(s)return r.length>0&&(yield yield i(JSON.parse(r))),yield i(void 0);r+=a.decode(n,{stream:!0});const l=r.split(t);r=l.pop();for(const e of l)yield yield i(JSON.parse(e));o=e.read()}}))}},431:e=>{"use strict";const t=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],i=["B","kiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],a=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],r=["b","kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],o=(e,t,i)=>{let a=e;return"string"==typeof t||Array.isArray(t)?a=e.toLocaleString(t,i):!0!==t&&void 0===i||(a=e.toLocaleString(void 0,i)),a};e.exports=(e,s)=>{if(!Number.isFinite(e))throw new TypeError(`Expected a finite number, got ${typeof e}: ${e}`);const n=(s=Object.assign({bits:!1,binary:!1},s)).bits?s.binary?r:a:s.binary?i:t;if(s.signed&&0===e)return` 0 ${n[0]}`;const l=e<0,d=l?"-":s.signed?"+":"";let c;if(l&&(e=-e),void 0!==s.minimumFractionDigits&&(c={minimumFractionDigits:s.minimumFractionDigits}),void 0!==s.maximumFractionDigits&&(c=Object.assign({maximumFractionDigits:s.maximumFractionDigits},c)),e<1){return d+o(e,s.locale,c)+" "+n[0]}const h=Math.min(Math.floor(s.binary?Math.log(e)/Math.log(1024):Math.log10(e)/3),n.length-1);e/=Math.pow(s.binary?1024:1e3,h),c||(e=e.toPrecision(3));return d+o(Number(e),s.locale,c)+" "+n[h]}},3873:e=>{e.exports='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="wrlogo" version="1.1" viewBox="0 0 66.712425 66.712425"><defs id="defs1391"><linearGradient xlink:href="#linearGradient5691" id="linearGradient6615" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.2909748,0,0,1.2909748,126.71149,146.96477)" x1="2.9740067" y1="48.223869" x2="97.913383" y2="48.223869"></linearGradient><linearGradient id="linearGradient5691"><stop id="stop5687" offset="0" style="stop-color:#4876ff;stop-opacity:1"></stop><stop id="stop5689" offset="1" style="stop-color:#04cdff;stop-opacity:1"></stop></linearGradient></defs><metadata id="metadata1394"><rdf:RDF><cc:Work rdf:about><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc><dc:title></dc:title></cc:Work></rdf:RDF></metadata><g transform="translate(-72.47712,-114.81045)" id="layer1"><g id="g6505-0" transform="matrix(0.54430533,0,0,0.54430533,3.1570572,32.715999)"><g id="g6654"><circle style="fill:url(#linearGradient6615);fill-opacity:1;stroke:none;stroke-width:42.9582;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path6016-0-7-6-9-11-2-8-67-6-50-4-33" cx="191.83304" cy="209.22058" r="61.282173" transform="rotate(0.86915877)"></circle><path id="path114-4-0-85-6-0-5-3-6-1-6" d="m 213.97635,227.49063 h 10.04864 c 7.00225,0 12.69803,-5.69578 12.69803,-12.69802 0,-7.00225 -5.69578,-12.69803 -12.69803,-12.69803 h -28.65835 c -7.00224,0 -12.69802,5.69578 -12.69802,12.69803 0,3.61344 1.52335,6.86798 3.95295,9.1827 -1.52592,1.02374 -3.35394,1.62921 -5.32526,1.62921 h -3.82517 c -1.91579,-3.1603 -3.04024,-6.85378 -3.04024,-10.81191 0,-11.5439 9.39185,-20.93574 20.93574,-20.93574 h 28.65835 c 11.5439,0 20.93445,9.39054 20.93445,20.93574 0,11.54519 -9.39218,21.12976 -20.93445,20.93573 L 214,236 v -4 z" style="fill:#eeadff;fill-opacity:1;stroke-width:1.29097"></path><path id="path116-9-4-7-0-8-3-2-08-9-1" d="m 163,202 -8.98973,0.0946 c -7.00187,0.0737 -12.69803,5.69578 -12.69803,12.69932 0,7.00095 5.69577,12.69673 12.69803,12.69673 h 28.65835 c 7.00224,0 12.69802,-5.69578 12.69802,-12.69673 0,-3.61344 -1.52335,-6.86928 -3.95296,-9.18399 1.52593,-1.02375 3.35394,-1.62793 5.32527,-1.62793 h 3.82258 c 1.91709,3.15902 3.04153,6.85249 3.04153,10.81192 0,11.5426 -9.39054,20.93444 -20.93444,20.93444 h -28.65835 c -11.54261,0 -20.93575,-9.39054 -20.93575,-20.93444 0,-11.54519 9.39331,-21.1208 20.93575,-20.93703 L 163,194 v 4 z" style="fill:#64e986;fill-opacity:1;stroke-width:1.29097"></path><path transform="matrix(-0.70292103,0,0,0.73238527,212.74337,173.39159)" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" id="path3919-5-9-8-6-6-56-0-37-5-8" style="fill:#64e986;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></path><path transform="matrix(0.75733451,0,0,-0.74979977,161.4911,257.29221)" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" id="path3919-3-3-7-5-9-7-2-6-8-7-7" style="fill:#eeadff;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></path></g></g></g></svg>'},9696:e=>{e.exports='<svg viewBox="-14.305 -26.054 671.927 428.238" xmlns="http://www.w3.org/2000/svg"><g id="Browsertrix-Horizontal-no-padding" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(0.736865, 0, 0, 0.736865, 142.301071, 121.421288)" style><g id="C4-Logo" transform="translate(2.000000, 5.000000)" fill="#000000"><path d="M88,142.596779 L88,187.400287 C129.247836,195.322678 179.850046,199.721014 233.177384,199.721014 C286.783114,199.721014 337.635191,195.276635 379,187.275923 L379,142.796048 C432.052464,153.427171 466,169.72673 466,188 C466,220.032515 361.682347,246 233,246 C104.317653,246 0,220.032515 0,188 C0,169.612176 34.3745016,153.222886 88,142.596779 Z" id="Combined-Shape"></path><path d="M353,0 L353,155.25055 C317.606088,160.636359 276.364698,163.605072 233.177384,163.605072 C190.252242,163.605072 149.249471,160.672294 114,155.348368 L114,0 L353,0 Z M187,13 L187,30 L337,30 L337,13 L187,13 Z M131,13 L131,30 L149,30 L149,13 L131,13 Z M159,13 L159,30 L177,30 L177,13 L159,13 Z" id="Combined-Shape" fill-rule="nonzero"></path></g></g><g transform="matrix(10.641995, 0, 0, 10.641995, -2.323544, -134.788986)" style><g><path style="fill: rgb(69, 121, 255);" d="M50.752,47.941H13.72C6.155,47.941,0,41.786,0,34.221S6.154,20.5,13.72,20.5 c1.233,0,2.466,0.171,3.673,0.511c2.143-5.025,7.094-8.338,12.611-8.338c3.96,0,7.659,1.68,10.27,4.637 c1.211-0.511,2.521-0.779,3.833-0.779c5.438,0,9.862,4.424,9.862,9.862c0,0.763-0.092,1.524-0.271,2.275 c4.066,1.27,6.916,5.067,6.916,9.411C60.614,43.516,56.19,47.941,50.752,47.941z M13.72,22.5C7.258,22.5,2,27.758,2,34.221 c0,6.462,5.258,11.72,11.72,11.72h37.032c4.335,0,7.861-3.527,7.861-7.862c0-3.758-2.676-7.003-6.362-7.715 c-0.286-0.056-0.534-0.233-0.679-0.487c-0.145-0.254-0.172-0.558-0.072-0.833c0.311-0.868,0.469-1.759,0.469-2.65 c0-4.335-3.527-7.862-7.862-7.862c-1.279,0-2.505,0.302-3.642,0.898c-0.428,0.224-0.952,0.111-1.251-0.268 c-2.243-2.853-5.601-4.489-9.21-4.489c-4.992,0-9.441,3.176-11.072,7.902c-0.086,0.252-0.271,0.459-0.512,0.575 c-0.24,0.115-0.518,0.131-0.77,0.041C16.366,22.732,15.042,22.5,13.72,22.5z"></path></g></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g><g transform="matrix(1, 0, 0, 1, 234.888443, 3.585283)"></g></svg>'},6420:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient spreadMethod="pad" y2="0" x2="1" y1="0" x1="0" id="svg_6"><stop offset="0" stop-opacity="1.0" stop-color="#4876ff"></stop><stop offset="1" stop-opacity="1.0" stop-color="#04cdff"></stop></linearGradient><linearGradient y2="0" x2="1" y1="0" x1="0" id="svg_7"><stop offset="0" stop-opacity="1.0" stop-color="#4876ff"></stop><stop offset="1" stop-opacity="1.0" stop-color="#04cdff"></stop></linearGradient></defs><g><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"></rect></g></g><g><ellipse stroke="url(#svg_7)" ry="24.37472" rx="24.37472" id="svg_3" cy="32" cx="32" stroke-width="1.5" fill="url(#svg_6)"></ellipse></g></svg>'},2785:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>'},4722:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"></path></svg>'},5275:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>'},886:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg>'},4562:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36z"></path></svg>'},2383:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z"></path></svg>'},6400:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path></svg>'},5729:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>'},3898:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>'},8657:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>'},6532:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>'},4939:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>'},4e3:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>'},1294:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>'},7050:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>'},504:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>'},96:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z"></path></svg>'},5017:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"></path></svg>'},2427:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>'},5555:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>'},5139:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>'},3525:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg>'},1940:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>'},5111:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>'},494:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path></svg>'},8340:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>'},9397:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>'},7087:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"></path></svg>'},1995:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>'},4688:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path></svg>'},8360:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>'},5403:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>'},2724:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>'},2740:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>'},9671:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>'},5364:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>'},1453:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path><path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path></svg>'},3954:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"></path><path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>'},6736:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path></svg>'},7948:e=>{e.exports='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 66.712418 66.712418" version="1.1" id="wrlogo"><defs id="defs1341"><linearGradient y2="48.223869" x2="97.913383" y1="48.223869" x1="2.9740067" gradientTransform="matrix(0.70268446,0,0,0.70268446,72.622704,112.65806)" gradientUnits="userSpaceOnUse" id="linearGradient6615" xlink:href="#linearGradient5691"></linearGradient><linearGradient id="linearGradient5691"><stop style="stop-color:#4876ff;stop-opacity:1" offset="0" id="stop5687"></stop><stop style="stop-color:#04cdff;stop-opacity:1" offset="1" id="stop5689"></stop></linearGradient></defs><metadata id="metadata1344"><rdf:RDF><cc:Work rdf:about><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc><dc:title></dc:title></cc:Work></rdf:RDF></metadata><g id="layer1" transform="translate(-72.477124,-114.81046)"><circle transform="rotate(0.86915873)" r="33.356209" cy="146.54422" cx="108.06871" id="path6016-0-7-6-9-11-2-8-67-6-50-4-33" style="fill:url(#linearGradient6615);fill-opacity:1;stroke:none;stroke-width:23.3824;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal"></circle><path style="fill:#d2f9d6;fill-opacity:1;stroke-width:0.702683" d="m 119.62552,156.54036 h 5.46953 c 3.81136,0 6.91161,-3.10024 6.91161,-6.9116 0,-3.81136 -3.10025,-6.9116 -6.91161,-6.9116 h -15.59889 c -3.81136,0 -6.9116,3.10024 -6.9116,6.9116 0,1.96682 0.82917,3.73828 2.15161,4.9982 -0.83057,0.55722 -1.82557,0.88678 -2.89857,0.88678 h -2.082056 c -1.042775,-1.72016 -1.654819,-3.73054 -1.654819,-5.88498 0,-6.2834 5.112035,-11.39543 11.395435,-11.39543 h 15.59889 c 6.28341,0 11.39474,5.11132 11.39474,11.39543 0,6.28411 -5.11222,11.50105 -11.39474,11.39543 l -5.45665,0.14787 v -2.17722 z" id="path114-4-0-85-6-0-5-3-6-1-6"></path><path style="fill:#64e986;fill-opacity:1;stroke-width:0.702683" d="m 91.878825,142.66568 -4.893158,0.0515 c -3.811155,0.0401 -6.911605,3.10024 -6.911605,6.91231 0,3.81065 3.100238,6.91089 6.911605,6.91089 h 15.598893 c 3.81136,0 6.9116,-3.10024 6.9116,-6.91089 0,-1.96682 -0.82917,-3.73899 -2.15162,-4.9989 0.83057,-0.55723 1.82557,-0.88609 2.89857,-0.88609 h 2.08066 c 1.04348,1.71947 1.65552,3.72985 1.65552,5.88499 0,6.28269 -5.11132,11.39472 -11.39473,11.39472 H 86.985667 c -6.282704,0 -11.39544,-5.11132 -11.39544,-11.39472 0,-6.28411 5.112828,-11.49617 11.39544,-11.39614 l 4.893158,0.0779 v 2.17722 z" id="path116-9-4-7-0-8-3-2-08-9-1"></path><path style="fill:#64e986;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path3919-5-9-8-6-6-56-0-37-5-8" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" transform="matrix(-0.38260367,0,0,0.3986412,118.95441,127.09397)"></path><path style="fill:#d2f9d6;fill-opacity:1;stroke:none;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal" id="path3919-3-3-7-5-9-7-2-6-8-7-7" d="m 73.728819,47.245763 -10.861072,-6.335289 -10.86107,-6.33529 10.917057,-6.238319 10.917057,-6.238318 -0.05599,12.573609 z" transform="matrix(0.4122212,0,0,-0.40812,91.057524,172.76152)"></path></g></svg>'},7809:()=>{}},t={};function i(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={id:a,exports:{}};return e[a].call(o.exports,o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";i.r(a),i.d(a,{ArchiveWebApp:()=>Lo,Embed:()=>ur,Loader:()=>Gi});var e={};i.r(e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}}const l=e=>new n("string"==typeof e?e:e+"",void 0,o),d=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1]),e[0]);return new n(i,e,o)},c=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return l(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var h;const p=window,f=p.trustedTypes,u=f?f.emptyScript:"",b=p.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:g},w="finalized";class x extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const a=this._$Ep(i,t);void 0!==a&&(this._$Ev.set(a,i),e.push(a))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const r=this[e];this[t]=a,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(w))return!1;this[w]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{r?e.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):i.forEach((i=>{const a=document.createElement("style"),r=t.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=i.cssText,e.appendChild(a)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var a;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:m).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,r=a._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=a.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:m;this._$El=r,this[r]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;x[w]=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},null==b||b({ReactiveElement:x}),(null!==(h=p.reactiveElementVersions)&&void 0!==h?h:p.reactiveElementVersions=[]).push("1.6.3");const k=window,$=k.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",C=`lit$${(Math.random()+"").slice(9)}$`,I="?"+C,A=`<${I}>`,U=document,P=()=>U.createComment(""),_=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,D=e=>L(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,R=/>/g,O=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),N=/'/g,M=/"/g,B=/^(?:script|style|textarea|title)$/i,j=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),F=j(1),H=(j(2),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),q=new WeakMap,G=U.createTreeWalker(U,129,null,!1);function V(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":"",s=T;for(let t=0;t<i;t++){const i=e[t];let n,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===T?"!--"===l[1]?s=E:void 0!==l[1]?s=R:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=O):void 0!==l[3]&&(s=O):s===O?">"===l[0]?(s=null!=r?r:T,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?O:'"'===l[3]?M:N):s===M||s===N?s=O:s===E||s===R?s=T:(s=O,r=void 0);const h=s===O&&e[t+1].startsWith("/>")?" ":"";o+=s===T?i+A:d>=0?(a.push(n),i.slice(0,d)+z+i.slice(d)+C+h):i+C+(-2===d?(a.push(void 0),t):h)}return[V(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),a]};class Z{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,o=0;const s=e.length-1,n=this.parts,[l,d]=K(e,t);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=G.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith(z)||t.startsWith(C)){const i=d[o++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+z).split(C),t=/([.?@])?(.*)/.exec(i);n.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?ee:"?"===t[1]?ie:"@"===t[1]?ae:X})}else n.push({type:6,index:r})}for(const t of e)a.removeAttribute(t)}if(B.test(a.tagName)){const e=a.textContent.split(C),t=e.length-1;if(t>0){a.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],P()),G.nextNode(),n.push({type:2,index:++r});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===I)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(C,e+1));)n.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=U.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){var r,o,s,n;if(t===H)return t;let l=void 0!==a?null===(r=i._$Co)||void 0===r?void 0:r[a]:i._$Cl;const d=_(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,a)),void 0!==a?(null!==(s=(n=i)._$Co)&&void 0!==s?s:n._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(t=J(e,l._$AS(e,t.values),l,a)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:U).importNode(i,!0);G.currentNode=r;let o=G.nextNode(),s=0,n=0,l=a[0];for(;void 0!==l;){if(s===l.index){let t;2===l.type?t=new Q(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new re(o,this,e)),this._$AV.push(t),l=a[++n]}s!==(null==l?void 0:l.index)&&(o=G.nextNode(),s++)}return G.currentNode=U,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{constructor(e,t,i,a){var r;this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(r=null==a?void 0:a.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),_(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):D(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==W&&_(this._$AH)?this._$AA.nextSibling.data=e:this.$(U.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,r="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=Z.createElement(V(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new Y(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}T(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Q(this.k(P()),this.k(P()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class X{constructor(e,t,i,a,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=J(this,e,t,0),o=!_(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{const a=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=J(this,a[i+s],t,s),n===H&&(n=this._$AH[s]),o||(o=!_(n)||n!==this._$AH[s]),n===W?e=W:e!==W&&(e+=(null!=n?n:"")+r[s+1]),this._$AH[s]=n}o&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}const te=$?$.emptyScript:"";class ie extends X{constructor(){super(...arguments),this.type=4}j(e){e&&e!==W?this.element.setAttribute(this.name,te):this.element.removeAttribute(this.name)}}class ae extends X{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=J(this,e,t,0))&&void 0!==i?i:W)===H)return;const a=this._$AH,r=e===W&&a!==W||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==W&&(a===W||r);r&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=k.litHtmlPolyfillSupport;null==oe||oe(Z,Q),(null!==(y=k.litHtmlVersions)&&void 0!==y?y:k.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var se,ne;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var a,r;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let s=o._$litPart$;if(void 0===s){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=s=new Q(t.insertBefore(P(),e),e,void 0,null!=i?i:{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return H}}le.finalized=!0,le._$litElement$=!0,null===(se=globalThis.litElementHydrateSupport)||void 0===se||se.call(globalThis,{LitElement:le});const de=globalThis.litElementPolyfillSupport;null==de||de({LitElement:le});(null!==(ne=globalThis.litElementVersions)&&void 0!==ne?ne:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=1,he=2,pe=e=>(...t)=>({_$litDirective$:e,values:t});class fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ue extends fe{constructor(e){if(super(e),this.et=W,e.type!==he)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this.ft=void 0,this.et=e;if(e===H)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ue.directiveName="unsafeHTML",ue.resultType=1;const be=pe(ue);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class me extends ue{}me.directiveName="unsafeSVG",me.resultType=2;const ge=pe(me),ve="important",we=pe(class extends fe{constructor(e){var t;if(super(e),e.type!==ce||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const a=e[i];return null==a?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const a=t[e];if(null!=a){this.ht.add(e);const t="string"==typeof a&&a.endsWith(" !important");e.includes("-")||t?i.setProperty(e,t?a.slice(0,-11):a,t?ve:""):i[e]=a}}return H}});var xe=i(4536),ye=i(7948),ke=i.n(ye);const $e="./w/api",Se=l(xe.A);function ze(e){return[Se,e]}const Ce=window.IS_APP||window.electron&&window.electron.IS_APP||window.matchMedia("(display-mode: standalone)").matches,Ie="1.8.17";function Ae(e){" "==e.key&&(e.preventDefault(),e.target.click())}class Ue extends le{constructor(){super(),this.size="1.1em",this.width=null,this.height=null}static get properties(){return{svg:{type:String},size:{type:String},width:{type:String},height:{type:String}}}static get styles(){return d`
      :host {
        display: inline-block;
        padding: 0;
        margin: 0;
        line-height: 1em;
      }
      :host svg {
        fill: var(--fa-icon-fill-color, currentcolor);
        width: var(--fa-icon-width, 19px);
        height: var(--fa-icon-height, 19px);
      }
    `}render(){if(!this.svg)return F``;const e={};return this.size?(e.width=this.size,e.height=this.size):(this.width&&(e.width=this.width),this.height&&(e.height=this.height)),F`<svg style="${we(e)}">
      <g>${ge(this.svg)}</g>
    </svg>`}}customElements.define("fa-icon",Ue),customElements.define("wr-anim-logo",class extends Ue{constructor(){super(),this.svg=ke()}static get styles(){return d`
      #wrlogo #stop5687 {
        animation: animLeft 7s linear infinite;
      }

      #wrlogo #stop5689 {
        animation: animRight 7s linear infinite;
      }

      @keyframes animLeft {
        0% {
          stop-color: #4876ff;
        }
        25% {
          stop-color: #1b0921;
        }
        50% {
          stop-color: #4876ff;
        }
        75% {
          stop-color: #04cdff;
        }
        100% {
          stop-color: #4876ff;
        }
      }

      @keyframes animRight {
        0% {
          stop-color: #04cdff;
        }
        25% {
          stop-color: #4876ff;
        }
        50% {
          stop-color: #1b0921;
        }
        75% {
          stop-color: #4876ff;
        }
        100% {
          stop-color: #04cdff;
        }
      }
    `}}),customElements.define("wr-modal",class extends le{constructor(){super(),this.title="",this.bgClass="",this.noBgClose=!1}static get properties(){return{title:{type:String},bgClass:{type:String},noBgClose:{type:Boolean}}}static get styles(){return ze(d`
      .modal-background {
        background-color: rgba(10, 10, 10, 0.5);
      }

      .modal-card-head {
        background-color: var(--background, #97a1ff);
      }

      .modal-card {
        width: 100%;
        max-width: var(--modal-width, 640px);
      }
    `)}render(){return F` <div class="modal is-active">
      <div
        class="modal-background"
        @click="${()=>!this.noBgClose&&this.onClose()}"
      ></div>
      <div class="modal-card">
        <header class="modal-card-head ${this.bgClass}">
          <p class="modal-card-title is-3">${this.title}</p>
          <button
            class="delete"
            aria-label="close"
            @click="${this.onClose}"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
      </div>
    </div>`}onClose(){this.dispatchEvent(new CustomEvent("modal-closed"))}});var Pe,_e=i(8340),Le=i.n(_e),De=i(6532),Te=i.n(De),Ee=i(4939),Re=i.n(Ee);function Oe(e,t){void 0===t&&(t={});var i=t.registrationOptions;void 0===i&&(i={}),delete t.registrationOptions;var a=function(e){for(var i=[],a=arguments.length-1;a-- >0;)i[a]=arguments[a+1];t&&t[e]&&t[e].apply(t,i)};"serviceWorker"in navigator&&Pe.then((function(){Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))?(!function(e,t,i){fetch(e).then((function(a){404===a.status?(t("error",new Error("Service worker not found at "+e)),Be()):-1===a.headers.get("content-type").indexOf("javascript")?(t("error",new Error("Expected "+e+" to have javascript content-type, but received "+a.headers.get("content-type"))),Be()):Me(e,t,i)})).catch((function(e){return Ne(t,e)}))}(e,a,i),navigator.serviceWorker.ready.then((function(e){a("ready",e)})).catch((function(e){return Ne(a,e)}))):(Me(e,a,i),navigator.serviceWorker.ready.then((function(e){a("ready",e)})).catch((function(e){return Ne(a,e)})))}))}function Ne(e,t){navigator.onLine||e("offline"),e("error",t)}function Me(e,t,i){navigator.serviceWorker.register(e,i).then((function(e){t("registered",e),e.waiting?t("updated",e):e.onupdatefound=function(){t("updatefound",e);var i=e.installing;i.onstatechange=function(){"installed"===i.state&&(navigator.serviceWorker.controller?t("updated",e):t("cached",e))}}})).catch((function(e){return Ne(t,e)}))}function Be(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){return Ne(emit,e)}))}"undefined"!=typeof window&&(Pe="undefined"!=typeof Promise?new Promise((function(e){return window.addEventListener("load",e)})):{then:function(e){return window.addEventListener("load",e)}});class je{constructor({name:e="sw.js",scope:t="./",appName:i="ReplayWeb.page",requireSubdomainIframe:a=!1}={}){this.name=e,this.scope=t,this.appName=i,this.requireSubdomainIframe=a,this.errorMsg=null}setAppName(e){this.appName=e}register(){let e,t;const i=new Promise(((i,a)=>{e=i,t=a}));this.errorMsg=this.getSWErrorMsg(),this.errorMsg&&(console.error(this.errorMsg),t(this.errorMsg));const a=e=>{console.error("Error during service worker registration:",e),this.errorMsg=this.getCrossOriginIframeMsg(),this.errorMsg||(this.errorMsg=`${this.appName} could not be loaded due to the following error:\n${e.toString()}`),t(this.errorMsg)};return Oe(this.scope+this.name,{registrationOptions:{scope:this.scope},registered(){console.log("Service worker is registered"),e()},error(e){a(e)}}),i}getCrossOriginIframeMsg(){return this.isCrossOriginIframe()?`      Sorry, Service Workers can not be used in cross-origin iframes.\n      This web archive embed is loaded from ${window.location.origin} but the top page is on a different origin.\n      The embed must be loaded from the same origin or a subdomain.`:null}isCrossOriginIframe(){if(window.parent===window)return!1;try{return""===window.top.location.href}catch(e){return!0}}getSWErrorMsg(){if(navigator.serviceWorker)return this.requireSubdomainIframe&&!this.isCrossOriginIframe()?`Sorry, due to security settings, this ${this.appName} embed only be viewed within a subdomain iframe.`:null;const e=this.getCrossOriginIframeMsg();return e||(window.isSecureContext?"MozAppearance"in document.documentElement.style?"Sorry, Service Workers are disabled in Firefox in Private Mode. Please try loading this page in regular mode instead.":`Sorry, ${this.appName} won't work in this browser as Service Workers are not supported in this window.\n  Please try a different browser.`:`\n      Sorry, the ${this.appName} system must be loaded from an HTTPS URL (or localhost), but was loaded from: ${window.location.host}.\n      Please try loading this page from an HTTPS URL`)}renderErrorReport(e,t){const i=this.errorMsg||t;return i?F`
      <section class="is-fullwidth">
        <div class="has-text-centered">
          <fa-icon
            style="margin: 1em;flex-grow: 1;"
            id="wrlogo"
            size="2.5rem"
            .svg=${e}
            aria-hidden="true"
          ></fa-icon>
        </div>
        <div style="white-space: pre-wrap; text-align: center">${i}</div>
      </section>
    `:""}}class Fe extends le{constructor(e="sw.js"){super(),this.sourceUrl=null,this.collTitle=null,this.showAbout=!1,this.showFileDropOverlay=!1,this.pageParams=new URLSearchParams,this.inited=!1,this.navMenuShown=!1,this.collPageUrl="",this.pageTitle="",this.pageReplay=!1,this.loadInfo=null,this.swName=e,this.swmanager=null,this.skipRuffle=!1,this.useRuffle=!1,this.safariKeyframes(),this.addEventListener("dragenter",(e=>{this.maybeStartFileDrop(e)})),this.addEventListener("dragover",(e=>{this.maybeStartFileDrop(e)})),this.addEventListener("dragleave",(()=>{this.showFileDropOverlay=!1})),this.addEventListener("dragend",(()=>{this.showFileDropOverlay=!1})),this.addEventListener("drop",(e=>{this.droppedFile=e.dataTransfer.files[0],this.showFileDropOverlay=!1,e.preventDefault()})),this.maybeStartFileDrop=e=>{this.sourceUrl||(this.showFileDropOverlay=!0,e.preventDefault())}}get appName(){return"ReplayWeb.page"}get homeUrl(){return window.location.pathname}static get properties(){return{inited:{type:Boolean},pageParams:{type:Object},sourceUrl:{type:String},navMenuShown:{type:Boolean},showAbout:{type:Boolean},showFileDropOverlay:{type:Boolean},collTitle:{type:String},loadInfo:{type:Object},embed:{type:String},collPageUrl:{type:String},pageTitle:{type:String},pageReplay:{type:Boolean},source:{type:String},skipRuffle:{type:Boolean},swErrorMsg:{type:Object}}}static get styles(){return ze(Fe.appStyles)}static get appStyles(){return d`
      #wrlogo {
        max-height: 1rem;
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
        margin-top: 1rem;
      }

      .drop-file-overlay {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        inset: 0;
        z-index: 50;
        font-weight: bold;
        font-size: 1.5rem;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
      }

      .drop-file-overlay:after {
        pointer-events: none;
        content: " ";
        position: absolute;
        inset: 0;
        border: 5px dashed #aaa;
        margin: 15px;
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
          padding: 0 1em;
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
    `}get mainLogo(){return ke()}renderNavBrand(){return F` <span
      id="home"
      class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only"
    >
      <span class="has-text-primary">replay</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`}renderNavBar(){return F` <a
        href="#skip-main-target"
        @click=${this.skipMenu}
        class="skip-link"
        >Skip main navigation</a
      >
      <nav class="navbar has-background-info" aria-label="main">
        <div class="navbar-brand">
          ${this.embed?F`
                <span class="navbar-item wr-logo-item">
                  <fa-icon
                    id="wrlogo"
                    size="1.0rem"
                    .svg=${this.mainLogo}
                    aria-hidden="true"
                  ></fa-icon>
                </span>
              `:F`
                <a
                  href="${this.homeUrl}"
                  class="navbar-item wr-logo-item"
                  aria-labelledby="home"
                >
                  <fa-icon
                    id="wrlogo"
                    size="1.0rem"
                    .svg=${this.mainLogo}
                    aria-hidden="true"
                  ></fa-icon>
                  ${this.renderNavBrand()}
                </a>
                ${this.collTitle?F`
                      <a
                        href="${this.collPageUrl}"
                        class="no-wrap is-size-6 has-text-black"
                        >/&nbsp;&nbsp;<i>${this.collTitle}</i></a
                      >
                      <span class="no-wrap is-size-6"
                        >&nbsp;&nbsp;/&nbsp;
                        ${this.pageReplay?F`<i>${this.pageTitle}</i>`:this.pageTitle}
                      </span>
                    `:""}
              `}
          <a
            href="#"
            role="button"
            id="menu-button"
            @click="${this.onNavMenu}"
            @keyup="${Ae}"
            class="navbar-burger burger ${this.navMenuShown?"is-active":""}"
            aria-label="main menu"
            aria-haspopup="true"
            aria-expanded="${this.navMenuShown}"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        ${this.sourceUrl?F``:F` <div
              class="navbar-menu ${this.navMenuShown?"is-active":""}"
            >
              <div class="navbar-start">
                ${Ce?F`
                      <a
                        role="button"
                        href="#"
                        class="navbar-item arrow-button"
                        title="Go Back"
                        @click="${()=>window.history.back()}"
                        @keyup="${Ae}"
                      >
                        <fa-icon
                          size="1.0rem"
                          .svg="${Te()}"
                          aria-hidden="true"
                        ></fa-icon
                        ><span class="menu-only is-size-7">&nbsp;Go Back</span>
                      </a>
                      <a
                        role="button"
                        href="#"
                        class="navbar-item arrow-button"
                        title="Go Forward"
                        @click="${()=>window.history.forward()}"
                        @keyup="${Ae}"
                      >
                        <fa-icon
                          size="1.0rem"
                          .svg="${Re()}"
                          aria-hidden="true"
                        ></fa-icon
                        ><span class="menu-only is-size-7"
                          >&nbsp;Go Forward</span
                        >
                      </a>
                    `:""}
              </div>
              ${this.embed?F``:F` <div class="navbar-end">${this.renderNavEnd()}</div>`}
            </div>`}
      </nav>
      <p id="skip-main-target" tabindex="-1" class="is-sr-only">Skipped</p>`}renderNavEnd(){return F` <a href="/docs" target="_blank" class="navbar-item is-size-6">
        <fa-icon .svg="${Le()}" aria-hidden="true"></fa-icon
        ><span>&nbsp;User Docs</span>
      </a>
      <!--
    -- NB: the About modal is currently inaccessible to people using keyboards or screen readers.
    --  Should all the JS and infrastructure for accessible modals be added, or should About be a normal page?
    -->
      <a
        href="?terms"
        @click="${e=>{e.preventDefault(),this.showAbout=!0}}"
        class="navbar-item is-size-6"
        >About
      </a>`}renderColl(){return F` <wr-coll
      .loadInfo="${this.loadInfo}"
      sourceUrl="${this.sourceUrl}"
      embed="${this.embed}"
      appName="${this.appName}"
      swName="${this.swName}"
      .appLogo="${this.mainLogo}"
      @replay-favicons=${this.onFavIcons}
      @update-title=${this.onTitle}
      @coll-loaded=${this.onCollLoaded}
      @about-show=${()=>this.showAbout=!0}
    ></wr-coll>`}renderHomeIndex(){return F` <wr-coll-index>
      ${Ce?"":F`
            <p slot="header" class="tagline is-size-5 has-text-centered">
              Explore and Replay Interactive Archived Webpages Directly in your
              Browser.
              <i
                ><a target="_blank" href="./docs/examples">(See Examples)</a></i
              >
            </p>
          `}
      <wr-chooser
        slot="header"
        .droppedFile=${this.droppedFile}
        @did-drop-file="${()=>this.droppedFile=null}"
        @load-start=${this.onStartLoad}
      ></wr-chooser>
    </wr-coll-index>`}render(){return this.inited?this.embed&&this.swErrorMsg?this.swErrorMsg:F`
      ${this.embed&&"full"!==this.embed?"":this.renderNavBar()}
      ${this.sourceUrl?this.renderColl():this.renderHomeIndex()}
      ${this.showAbout?this.renderAbout():""}
      ${this.showFileDropOverlay?this.renderDropFileOverlay():""}
    `:F``}firstUpdated(){this.initRoute();let e=this.swName;const t=new URLSearchParams;let i="";this.useRuffle&&t.set("injectScripts","ruffle/ruffle.js"),this.embed&&t.set("serveIndex","1"),i=t.toString(),i.length&&(e+="?"+i),this.swmanager=new je({name:e,appName:this.appName}),this.swmanager.register().catch((()=>this.swErrorMsg=this.swmanager.renderErrorReport(this.mainLogo))),window.addEventListener("popstate",(()=>{this.initRoute()}))}updated(e){e.has("sourceUrl")&&(this.collTitle=null)}onFavIcons(e){const t=document.querySelector("head"),i=document.querySelectorAll("link[rel*='icon']");for(const e of i)t.removeChild(e);for(const i of e.detail.icons){const e=document.createElement("link");e.rel=i.rel,e.href=i.href,t.appendChild(e)}}skipMenu(e){e.preventDefault(),this.renderRoot.querySelector("#skip-main-target").focus()}onNavMenu(e){e.preventDefault(),e.stopPropagation(),this.navMenuShown=!this.navMenuShown,this.navMenuShown&&(document.addEventListener("click",(e=>{e.preventDefault(),this.navMenuShown=!1,this.renderRoot.querySelector("#menu-button").focus()}),{once:!0}),document.addEventListener("keypress",(e=>{"Escape"==e.key&&(e.preventDefault(),this.navMenuShown=!1,this.renderRoot.querySelector("#menu-button").focus())}),{once:!0}))}initRoute(){this.inited=!0,this.pageParams=new URLSearchParams(window.location.search);let e=this.pageParams.get("state");if(e)try{if(e=JSON.parse(e),e.ids instanceof Array&&e.userId&&"open"===e.action)return this.pageParams.set("source","googledrive://"+e.ids[0]),this.pageParams.delete("state"),void(window.location.search=this.pageParams.toString())}catch(e){console.log(e)}if(this.source){this.pageParams.set("source",this.source);const e=new URL(window.location.href);e.search=this.pageParams.toString(),window.history.replaceState({},document.title,e.href)}if(this.sourceUrl=this.pageParams.get("source")||"",this.embed=this.pageParams.get("embed")||"",this.embed?this.useRuffle="1"===this.pageParams.get("ruffle"):this.useRuffle=!this.skipRuffle,this.pageParams.has("terms")&&(this.showAbout=!0),this.pageParams.has("embed")&&(this.loadInfo||(this.loadInfo={})),this.pageParams.get("config"))try{this.loadInfo.extraConfig=JSON.parse(this.pageParams.get("config"))}catch(e){console.log("invalid config: "+e)}this.pageParams.get("baseUrlSourcePrefix")&&(this.loadInfo.extraConfig=this.loadInfo.extraConfig||{},this.loadInfo.extraConfig.baseUrlSourcePrefix=this.pageParams.get("baseUrlSourcePrefix")),this.pageParams.get("basePageUrl")&&(this.loadInfo.extraConfig=this.loadInfo.extraConfig||{},this.loadInfo.extraConfig.baseUrl=this.pageParams.get("basePageUrl")),this.pageParams.get("customColl")&&(this.loadInfo.customColl=this.pageParams.get("customColl")),"1"===this.pageParams.get("noWebWorker")&&(this.loadInfo.noWebWorker=!0),"1"===this.pageParams.get("noCache")&&(this.loadInfo.noCache=!0),"1"===this.pageParams.get("hideOffscreen")&&(this.loadInfo.hideOffscreen=!0),"eager"===this.pageParams.get("loading")&&(this.loadInfo.loadEager=!0),this.pageParams.get("swName")&&(this.swName=this.pageParams.get("swName")),Ce&&this.sourceUrl.startsWith("file://")&&(this.loadInfo={sourceUrl:this.sourceUrl,loadUrl:this.sourceUrl.replace("file://","file2://")})}onStartLoad(e){this.pageParams.set("source",e.detail.sourceUrl);const t=new URL(window.location.href);t.search=this.pageParams.toString(),this.collPageUrl=t.toString(),e.detail.isFile?(window.history.pushState({},"",this.collPageUrl),this.sourceUrl=e.detail.sourceUrl,this.loadInfo=e.detail):window.location.search=this.pageParams.toString()}onCollLoaded(e){this.loadInfo=null,e.detail.collInfo&&(this.collTitle=e.detail.collInfo.name||e.detail.collInfo.title),e.detail.alreadyLoaded||e.detail.sourceUrl!==this.sourceUrl&&(this.pageParams.set("source",e.detail.sourceUrl),window.location.search=this.pageParams.toString())}onTitle(e){e.detail.title&&(this.pageTitle=e.detail.title,this.pageReplay=e.detail.replayTitle,document.title=(e.detail.replayTitle?"Archive of ":"")+this.pageTitle+" | "+this.appName)}safariKeyframes(){const e=document.createElement("style");document.head.appendChild(e),e.appendChild(document.createTextNode("\n    @keyframes spinAround {\n      from {\n        transform: rotate(0deg);\n      }\n      to {\n        transform: rotate(359deg);\n      }\n    }\n    "))}renderAbout(){return F`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ReplayWeb.page ${Ce?"App":""}</p>
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div style="display: flex">
                    <div class="has-text-centered" style="width: 220px">
                      <wr-anim-logo class="logo" size="48px"></wr-anim-logo>
                      <div style="font-size: smaller; margin-bottom: 1em">${Ce?"App":""} v${Ie}</div>
                    </div>

                    ${Ce?F`
                            <p>
                              ReplayWeb.page App is a standalone app for Mac,
                              Windows and Linux that loads web archive files
                              provided by the user and renders them for replay.
                            </p>
                          `:F` <p>
                            <a href="https://replayweb.page" target="_blank"
                              >ReplayWeb.page</a
                            >
                            is a browser-based viewer that loads web archive
                            files provided by the user and renders them for
                            replay in the browser.
                          </p>`}
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
      </div>`}onAboutClose(){this.showAbout=!1}renderDropFileOverlay(){return F`
      <div class="drop-file-overlay">Drop to load web archive</div>
    `}}customElements.define("replay-app-main",Fe);var He=i(5364),We=i.n(He);customElements.define("wr-chooser",class extends le{constructor(){super(),this.fileDisplayName="",this.file=null,this.droppedFile=null,this.hasNativeFS=!!window.showOpenFilePicker&&!Ce,this.newFullImport=!1,this.noHead=!1,this.showOpenFilePickerOptions={types:[{description:"WARC, WACZ, HAR and WBN Files",accept:{"application/warc":[".warc",".gz"],"application/har":[".har"],"application/wacz":[".wacz"],"application/wbn":[".wbn"],"application/json":[".json"]}}]}}static get properties(){return{fileDisplayName:{type:String},droppedFile:{type:File},newFullImport:{type:Boolean},noHead:{type:Boolean}}}updated(e){e.has("droppedFile")&&this.droppedFile&&this.onDropFile()}onDropFile(){this.showOpenFilePickerOptions.types.map((e=>e.accept)).map(Object.values).flat(2).some((e=>this.droppedFile.name.endsWith(e)))&&(this.setFile(this.droppedFile),this.dispatchEvent(new CustomEvent("did-drop-file",{bubbles:!0,composed:!0})),this.onStartLoad())}onChooseFile(e){0!==e.currentTarget.files.length&&this.setFile(e.currentTarget.files[0])}setFile(e){this.file=e,this.fileDisplayName="file://"+(this.file.path||this.file.name)}async onChooseNativeFile(){if(!this.hasNativeFS)return;const[e]=await window.showOpenFilePicker(this.showOpenFilePickerOptions);this.fileHandle=e,this.file=await e.getFile(),this.fileDisplayName="file://"+e.name}randomId(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}onStartLoad(e){e&&e.preventDefault();const t={sourceUrl:this.fileDisplayName};return this.file&&(t.isFile=!0,this.file.path?(t.loadUrl="file2://"+this.file.path,t.noCache=!0):this.fileHandle?(t.loadUrl=this.fileDisplayName,t.extra={fileHandle:this.fileHandle},t.noCache=!1):(t.loadUrl=URL.createObjectURL(this.file),t.blob=this.file,t.noCache=!1),t.size=this.file.size,t.name=this.fileDisplayName),t.newFullImport=this.newFullImport,this.dispatchEvent(new CustomEvent("load-start",{bubbles:!0,composed:!0,detail:t})),!1}onInput(e){this.fileDisplayName=e.currentTarget.value,this.file&&this.fileDisplayName&&this.fileDisplayName.startsWith("file://")&&(this.file=null,this.fileDisplayName="")}static get styles(){return ze(d`
      :host {
        min-width: 0;
      }
      .extra-padding {
        padding: 1.5em;
      }
      .less-padding {
        padding-top: 1em;
        padding-bottom: 1em;
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
    `)}render(){return F` <section
      class="section ${this.noHead?"is-paddingless":"less-padding"}"
    >
      <div class="${this.noHead?"":"panel"}">
        <div
          class="${this.noHead?"is-hidden":"panel-heading"} heading-size"
        >
          ${this.newFullImport?"Import Existing":"Load"} Web Archive
        </div>
        <div
          class="${this.noHead?"":"panel-body extra-padding"} file has-name"
        >
          <form class="is-flex" @submit="${this.onStartLoad}">
            <label class="file-label">
              ${this.hasNativeFS?"":F` <input
                    class="file-input"
                    @click="${e=>e.currentTarget.value=null}"
                    @change=${this.onChooseFile}
                    type="file"
                    id="fileupload"
                    name="fileupload"
                  />`}
              <span class="file-cta" @click="${this.onChooseNativeFile}">
                <span class="file-icon">
                  <fa-icon
                    size="0.9em"
                    .svg=${We()}
                    aria-hidden="true"
                  ></fa-icon>
                </span>
                <span class="file-label is-hidden-touch"> Choose File... </span>
              </span>
            </label>

            <div class="field has-addons">
              <p class="control is-expanded">
                <input
                  class="file-name input"
                  type="text"
                  name="filename"
                  id="filename"
                  pattern="((file|http|https|ipfs|s3)://.*.(warc|warc.gz|zip|wacz|har|wbn|json)([?#].*)?)|(googledrive://.+)|(ssb://.+)"
                  .value="${this.fileDisplayName}"
                  @input="${this.onInput}"
                  autocomplete="off"
                  placeholder="${this.newFullImport?"Click 'Choose File' to select a local archive to import":"Enter a URL or click 'Choose File' to select a WARC, WACZ, HAR or WBN archive source"}"
                />
              </p>
              <div class="control">
                <button
                  type="submit"
                  class="button is-hidden-mobile is-primary"
                >
                  ${this.newFullImport?"Import":"Load"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>`}});var qe=i(431),Ge=i.n(qe),Ve=i(5275),Ke=i.n(Ve),Ze=i(6400),Je=i.n(Ze),Ye=i(2383),Qe=i.n(Ye),Xe=i(1995),et=i.n(Xe);class tt extends le{constructor(){super(),this.colls=[],this.filteredColls=[],this.sortedColls=null,this.query="",this.hideHeader="1"===localStorage.getItem("index:hideHeader"),this._deleting={},this.dateName="Date Loaded",this.headerName="Loaded Archives",this.typeFilter="",this.indexParams=""}get sortKeys(){return[{key:"title",name:"Title"},{key:"sourceUrl",name:"Source"},{key:"ctime",name:this.dateName},{key:"size",name:"Total Size"}]}static get properties(){return{colls:{type:Array},query:{type:String},filteredColls:{type:Array},sortedColls:{type:Array},hideHeader:{type:Boolean},_deleting:{type:Object},dateName:{type:String},headerName:{type:String}}}firstUpdated(){this.loadColls()}updated(e){e.has("hideHeader")&&localStorage.setItem("index:hideHeader",this.hideHeader?"1":"0"),(e.has("colls")||e.has("query"))&&this.filter()}filter(){if(this.query){this.filteredColls=[];for(const e of this.colls)(e.sourceUrl.indexOf(this.query)>=0||e.filename.indexOf(this.query)>=0||e.loadUrl&&e.loadUrl.indexOf(this.query)>=0||e.title&&e.title.indexOf(this.query)>=0)&&this.filteredColls.push(e)}else this.filteredColls=this.colls}async loadColls(){const e=await fetch(`./w/api/coll-index?${this.indexParams}`);try{if(200!==e.status)throw new Error("Invalid API Response, Retry");const t=await e.json();this.colls=t.colls.map((e=>(e.title=e.title||e.filename,e))),this._deleting={},this.sortedColls=[]}catch(e){setTimeout((()=>this.loadColls()),500)}}async onDeleteColl(e){if(e.preventDefault(),e.stopPropagation(),!this.sortedColls)return;const t=Number(e.currentTarget.getAttribute("data-coll-index")),i=this.sortedColls[t];if(!i||this._deleting[i.sourceUrl])return;this._deleting[i.sourceUrl]=!0,this.requestUpdate();const a=await fetch(`./w/api/c/${i.id}`,{method:"DELETE"});if(200===a.status){const e=await a.json();this.colls=e.colls}return!1}static get styles(){return ze(tt.compStyles)}static get compStyles(){return d`
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
        padding-top: 1em;
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
    `}renderHeader(){return F`<h2 class="panel-heading panel-color">
      <span>${this.headerName}</span>
    </h2>`}renderSearchHeader(){return""}render(){const e=this.childElementCount>0;return F`
      <header class="${this.hideHeader?"closed":""}">
        <slot name="header"></slot>
      </header>
      <section class="section no-top-padding">
        <div class="sort-header is-small">
          ${e?F`
        <button @click=${()=>this.hideHeader=!this.hideHeader} class="collapse button is-small">
          <span class="icon"><fa-icon .svg=${this.hideHeader?Qe():Je()}></span>
          <span>${this.hideHeader?"Show ":"Hide"} <span class="is-sr-only">Header</span></span>
        </button>`:""}
        </div>
        <div class="panel">
          ${this.renderHeader()}
          ${this.colls.length?F`
                <div class="panel-block sort-header is-small">
                  ${this.renderSearchHeader()}
                  <div class="control has-icons-left has-addons">
                    <input
                      type="text"
                      class="input is-small"
                      @input="${e=>this.query=e.currentTarget.value}"
                      .value="${this.query}"
                      placeholder="Search by Archive Title or Source"
                    />
                    <span class="icon is-left is-small">
                      <fa-icon .svg="${et()}"></fa-icon>
                    </span>
                  </div>
                  <wr-sorter
                    id="index"
                    sortKey="ctime"
                    ?sortDesc="${!0}"
                    .sortKeys="${this.sortKeys}"
                    .data="${this.filteredColls}"
                    @sort-changed="${e=>this.sortedColls=e.detail.sortedData}"
                  >
                  </wr-sorter>
                </div>

                <div class="coll-list">
                  ${this.sortedColls&&this.sortedColls.map(((e,t)=>F`
                      <div class="coll-block panel-block">
                        ${this.renderCollInfo(e)}
                        ${this._deleting[e.sourceUrl]?F` <span
                              class="button delete-button is-loading is-static"
                            >
                              Deleting
                            </span>`:F`
                              <button
                                class="delete delete-button"
                                aria-label="Unload Collection"
                                title="Unload Collection"
                                data-coll-index="${t}"
                                @click="${this.onDeleteColl}"
                              ></button>
                            `}
                      </div>
                    `))}
                </div>
              `:F`
                <div class="panel-block extra-padding">
                  ${null===this.sortedColls?F`<i>Loading Archives...</i>`:this.renderEmpty()}
                </div>
              `}
        </div>
      </section>
    `}renderCollInfo(e){return F`<wr-coll-info .coll=${e}></wr-coll-info>`}renderEmpty(){return F`<i
      >No Archives so far! Archives loaded in the section above will appear
      here.</i
    >`}}class it extends le{constructor(){super(),this.detailed=!1,this.canDelete=!1}static get properties(){return{coll:{type:Object},detailed:{type:Boolean},canDelete:{type:Boolean}}}static get styles(){return ze(it.compStyles)}static get compStyles(){return d`
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
      .column:hover > .copy,
      .source-text:hover + .copy,
      .copy:hover {
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
    `}renderSource(e){return F`
      <div class="column is-4">
        <span class="source-text"
          ><p class="minihead">Source</p>
          ${e.sourceUrl&&(e.sourceUrl.startsWith("http://")||e.sourceUrl.startsWith("https://"))?F` <a href="${e.sourceUrl}">${e.sourceUrl}&nbsp;</a>`:F` ${e.sourceUrl}&nbsp;`}
        </span>

        <a @click="${t=>this.onCopy(t,e.sourceUrl)}" class="copy">
          <fa-icon .svg="${Ke()}"></fa-icon>
        </a>
        ${e.sourceUrl&&e.sourceUrl.startsWith("googledrive://")?F` <p><i>(${e.filename})</i></p>`:""}
      </div>
      <div class="column is-2">
        <p class="minihead">Date Loaded</p>
        ${e.ctime?new Date(e.ctime).toLocaleString():""}
      </div>
      <div class="column is-2">
        <p class="minihead">Total Size</p>
        ${Ge()(Number(e.totalSize||e.size||0))}
      </div>
    `}renderSummaryView(){const e=this.coll;return F` <div class="columns">
      <div class="column col-title is-4">
        <span class="subtitle has-text-weight-bold">
          <a href="?source=${encodeURIComponent(e.sourceUrl)}"
            >${e.name||e.title||e.filename}</a
          >
        </span>
      </div>
      ${this.renderSource(e)}
    </div>`}renderDetailed(){const e=this.coll;let{numValid:t,numInvalid:i,domain:a,certFingerprint:r,datapackageHash:o,publicKey:s,software:n}=this.coll.verify||{};t=t||0,i=i||0;const l=r?`https://crt.sh/?q=${r}`:"";return F` <div class="columns">
      <div class="column col-title is-4">
        <span class="subtitle has-text-weight-bold">
          ${e.name||e.title||e.filename}
        </span>
      </div>
      ${e.desc?F` <div class="column">
            <p class="minihead">Description</p>
            ${e.desc}
          </div>`:F``}
      ${e.description?F`<div class="column">
            <p class="minihead">Description</p>
            ${e.description}
          </div>`:F``}
      <!--  Only show filename if coll.resources doesn't exist -->
      ${e.resources?F`<div class="column">
            <p class="minihead">Files</p>
            <ol style="padding: revert">
              ${
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*(e,t){if(void 0!==e){let i=0;for(const a of e)yield t(a,i++)}}(e.resources,(e=>F`<li>
                    <a href="${e.path}">${e.name+"\n"}</a>
                  </li>`))}
            </ol>
          </div>`:F`<div class="column">
            <p class="minihead">Filename</p>
            ${e.filename}
          </div>`}
      ${this.renderSource(e)}
      ${a?F`
            <div class="column">
              <p class="minihead">Observed By</p>
              <p>${a}</p>
              ${l?F`<span
                    ><a target="_blank" href="${l}"
                      >View Certificate</a
                    ></span
                  >`:""}
            </div>
          `:n?F`
            <div class="column">
              <p class="minihead">Created With</p>
              ${n||"Unknown"}
            </div>
          `:""}

      <div class="column">
        <p class="minihead">Validation</p>
        ${t>0||i>0?F` <p>
              ${t} hashes
              verified${i?F`, ${i} invalid`:""}
            </p>`:F` Not Available`}
      </div>

      <div class="column">
        <p class="minihead">Package Hash</p>
        ${o||"Not Available"}
      </div>

      <div class="column">
        <p class="minihead">Observer Public Key</p>
        ${s||"Not Available"}
      </div>

      <div class="column">
        <p class="minihead">Loading Mode</p>
        ${e.onDemand?"Download On-Demand":"Fully Local"}
      </div>
      <div class="column">
        <p class="minihead">Collection id</p>
        ${e.coll}
      </div>
    </div>`}render(){return this.detailed?this.renderDetailed():this.renderSummaryView()}onCopy(e,t){return e.preventDefault(),e.stopPropagation(),navigator.clipboard.writeText(t),!1}onPurge(e){const t={reload:e};this.dispatchEvent(new CustomEvent("coll-purge",{detail:t}))}}function at(e){if(!e)return"";e.length<14&&(e+="00000101000000".substr(e.length));const t=e.substring(0,4)+"-"+e.substring(4,6)+"-"+e.substring(6,8)+"T"+e.substring(8,10)+":"+e.substring(10,12)+":"+e.substring(12,14)+"-00:00";return new Date(t)}function rt(e){let t=null;try{t=new Date(e.ts||e.date)}catch(e){}const i=t&&!isNaN(t)?ot(t.toISOString()):"";return{date:t,timestamp:i}}function ot(e){return e.replace(/[-:T]/g,"").slice(0,14)}function st(e,t,i){const a=new URLSearchParams;return a.set("view",e),a.set("url",t),a.set("ts",i),"#"+a.toString()}async function nt(e){try{new URL(e)}catch(t){e=new URL(e,document.baseURI).href}const t=await async function(e,t){const i=(new TextEncoder).encode(e),a=await crypto.subtle.digest(t,i),r=Array.from(new Uint8Array(a)).map((e=>e.toString(16).padStart(2,"0"))).join("");return r}(e,"SHA-256");return{url:e,coll:"id-"+t.slice(0,12)}}customElements.define("wr-coll-info",it),customElements.define("wr-coll-index",tt);var lt=i(4e3),dt=i.n(lt),ct=i(2427),ht=i.n(ct),pt=i(4562),ft=i.n(pt),ut=i(494),bt=i.n(ut),mt=i(886),gt=i.n(mt),vt=i(1940),wt=i.n(vt),xt=i(2724),yt=i.n(xt),kt=i(9397),$t=i.n(kt),St=i(5017),zt=i.n(St),Ct=i(96),It=i.n(Ct),At=i(5139),Ut=i.n(At),Pt=i(3898),_t=i.n(Pt),Lt=i(8657),Dt=i.n(Lt),Tt=i(6736),Et=i.n(Tt),Rt=i(1453),Ot=i.n(Rt),Nt=i(3954),Mt=i.n(Nt),Bt=i(2785),jt=i.n(Bt);class Ft extends le{constructor(){super(),this.collInfo=null,this.appLogo=null,this.ts=null,this.url=null,this.active=!1}get renderRoot(){return this}static get properties(){return{collInfo:{type:Object},appLogo:{type:Object},url:{type:String},ts:{type:String},active:{type:Boolean}}}static get embedStyles(){return d`
      rwp-embed-receipt {
        display: flex;
        flex-direction: column;
      }

      .icon {
        vertical-align: text-top;
      }

      #embed-dropdown {
        max-height: calc(100vh - 50px);
        padding-top: 0;
        margin-top: -0.5rem;
        display: block;
        z-index: 1;
        pointer-events: none;
        transition: all 0.3s linear;
        transform-origin: left top;
        transform: scaleY(0);
        transition: all 300ms cubic-bezier(0.15, 0, 0.1, 1);
        filter: drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.15));
      }

      .dropdown.is-active #embed-dropdown {
        transform: scaleY(1);
      }

      .embed-info-container {
        width: 100%;
        display: flex !important;
        justify-content: center;
      }

      button.embed-info {
        padding: 0;
        background-color: white;
        justify-content: space-between;
        max-width: 40rem;
        width: calc(100% - 1rem);
        height: 42px;
        border-color: #d1d5da;
        border-width: 1px;
        border-style: solid;
        border-radius: 999px;
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
        transition-duration: 50ms;
        transition-timing-function: ease-out;
        cursor: pointer;
        z-index: 2;
      }

      button.embed-info:active {
        color: initial;
      }

      button.embed-info:hover {
        filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
        transform: scale(1.01);
      }

      button.embed-info:hover:active {
        transform: translateY(0.25rem);
      }

      .embed-info-buttontext {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        text-align: start;
        font-size: 13px;
      }

      .embed-info-drop {
        font-size: 14px;
        padding: 1rem;
        padding-top: 2rem;
        max-width: 38rem;
        max-height: 42rem;
        width: calc(100% - 2rem);
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        pointer-events: auto;
        overflow-y: auto;
      }

      .embed-info-drop > p {
        font-size: 14px;
        color: black;
      }

      .embed-info-drop > h2 {
        margin-bottom: 0.25rem;
        font-size: 16px;
        font-weight: bold;
        text-transform: none;
        letter-spacing: 0;
        color: #24292e;
      }

      .embed-info-drop-statscontainer > h3 {
        font-size: 12px;
        color: #394146;
      }

      .embed-info-drop-statscontainer > p {
        font-size: 14px;
        color: black;
      }

      .embed-info-drop a {
        word-break: break-all;
      }

      .embed-info-drop .show-hash {
        word-break: break-all;
        font-family: monospace;
      }

      .embed-info-drop .show-key {
        text-overflow: ellipsis;
        overflow: hidden;
        whitespace: nowrap;
        font-family: monospace;
      }

      .embed-globe {
        margin: 0.25rem;
        padding: 7px;
        background-color: #0366d6;
        border-radius: 9999px;
        color: white;
        border-width: 1px;
        border-color: #d1d5da;
        border-style: solid;
        line-height: 0.5em;
      }
    `}render(){let{numValid:e,numInvalid:t,domain:i,certFingerprint:a,datapackageHash:r,publicKey:o,software:s}=this.collInfo.verify||{};e=e||0,t=t||0;const n=this.collInfo.sourceUrl,l=a?`https://crt.sh/?q=${a}`:"",d=at(this.ts).toLocaleString();return F`
      <div class="dropdown mb-4 ${this.active?"is-active":""}">
        <div class="dropdown-trigger embed-info-container">
          <button
            class="embed-info is-small is-rounded mt-4"
            aria-haspopup="true"
            aria-controls="embed-dropdown"
            @click="${this.onEmbedDrop}"
          >
            <fa-icon
              class="menu-logo mr-2 embed-globe"
              size="1rem"
              aria-hidden="true"
              .svg=${Et()}
            ></fa-icon>
            <span class="embed-info-buttontext">
              This embed is part of a web archive. Click here to learn more.
            </span>
            <span class="icon is-small mr-4 ml-2">
              <fa-icon
                title="Toggle"
                .svg="${this.active?Mt():Ot()}"
                aria-hidden="true"
              ></fa-icon>
            </span>
          </button>
        </div>
        <div
          class="dropdown-menu embed-info-container"
          id="embed-dropdown"
          role="menu"
        >
          <div class="dropdown-content embed-info-drop">
            <p class="mb-4">
              Even if the original page goes offline or is changed, the content
              below will remain unchanged as it is loaded from a web archive.
            </p>
            <hr class="dropdown-divider" />
            <h2 class="mt-4">Get A Copy!</h2>
            <p class="mt-2">
              After downloading, this web archive can be loaded and viewed
              directly in your browser via
              <a
                style="white-space: nowrap;"
                target="_blank"
                href="https://replayweb.page"
                >replayweb.page</a
              >.
            </p>
            <a
              href="${n}"
              class="button is-primary mt-4"
              @keyup="${Ae}"
            >
              <span class="icon is-small">
                <fa-icon
                  size="1.0em"
                  aria-hidden="true"
                  .svg="${ht()}"
                ></fa-icon>
              </span>
              <span>Download Archive</span>
            </a>
            <hr class="dropdown-divider mt-4" />
            <h2 class="mt-4">Technical Information</h2>
            <div class="embed-info-drop-statscontainer mb-4">
              <h3>Original URL:</h3>
              <p><a target="_blank" href="${this.url}">${this.url}</a></p>
              <h3 class="mt-2">Archived On:</h3>
              <p>${d}</p>
              ${i?F`
                    <h3 class="mt-2">Observed By:</h3>
                    <p>${i}</p>
                    ${l?F` <p>
                          <a target="_blank" href="${l}"
                            >View Certificate</a
                          >
                        </p>`:""}
                  `:s?F` <h3 class="mt-2">Created With:</h3>
                    <p>${s}</p>`:""}
              ${!i&&o?F` <h3 class="mt-2">Observer Public Key:</h3>
                    <p class="show-key">${o}</p>`:""}
              <h3 class="mt-2">Validation:</h3>
              ${e>0||t>0?F` <p>
                    ${e} hashes
                    verified${t?F`, ${t} invalid`:""}
                  </p>`:F` <p>Not Available</p> `}
              <h3 class="mt-2">Package Hash:</h3>
              <p class="show-hash">${r}</p>
              <h3 class="mt-2">Size</h3>
              <p>${Ge()(Number(this.collInfo.size||0))}</p>
            </div>
            ${n?F``:""}
            <p
              class="is-size-7 is-flex is-justify-content-space-between"
              style="margin-top: 40px"
            >
              <span>
                <a
                  class="has-text-black"
                  target="_blank"
                  href="https://github.com/webrecorder/replayweb.page"
                >
                  <fa-icon
                    class="menu-logo mr-1"
                    size="1.0rem"
                    aria-hidden="true"
                    .svg=${this.appLogo}
                  ></fa-icon>
                  Powered by ReplayWeb.page
                </a>
              </span>
              <span>
                <a
                  class="has-text-black"
                  target="_blank"
                  href="https://github.com/webrecorder/replayweb.page"
                  >Source Code
                  <fa-icon
                    class="menu-logo ml-1"
                    size="1.0rem"
                    aria-hidden="true"
                    .svg=${jt()}
                  ></fa-icon>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    `}onEmbedDrop(e){e.stopPropagation(),this.active=!this.active}}customElements.define("rwp-embed-receipt",Ft);var Ht="undefined"!=typeof window?window:null,Wt=null===Ht,qt=Wt?void 0:Ht.document,Gt="horizontal",Vt=function(){return!1},Kt=Wt?"calc":["","-webkit-","-moz-","-o-"].filter((function(e){var t=qt.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length})).shift()+"calc",Zt=function(e){return"string"==typeof e||e instanceof String},Jt=function(e){if(Zt(e)){var t=qt.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},Yt=function(e,t,i){var a=e[t];return void 0!==a?a:i},Qt=function(e,t,i,a){if(t){if("end"===a)return 0;if("center"===a)return e/2}else if(i){if("start"===a)return 0;if("center"===a)return e/2}return e},Xt=function(e,t){var i=qt.createElement("div");return i.className="gutter gutter-"+t,i},ei=function(e,t,i){var a={};return Zt(t)?a[e]=t:a[e]=Kt+"("+t+"% - "+i+"px)",a},ti=function(e,t){var i;return(i={})[e]=t+"px",i};const ii=function(e,t){if(void 0===t&&(t={}),Wt)return{};var i,a,r,o,s,n,l=e;Array.from&&(l=Array.from(l));var d=Jt(l[0]).parentNode,c=getComputedStyle?getComputedStyle(d):null,h=c?c.flexDirection:null,p=Yt(t,"sizes")||l.map((function(){return 100/l.length})),f=Yt(t,"minSize",100),u=Array.isArray(f)?f:l.map((function(){return f})),b=Yt(t,"maxSize",1/0),m=Array.isArray(b)?b:l.map((function(){return b})),g=Yt(t,"expandToMin",!1),v=Yt(t,"gutterSize",10),w=Yt(t,"gutterAlign","center"),x=Yt(t,"snapOffset",30),y=Array.isArray(x)?x:l.map((function(){return x})),k=Yt(t,"dragInterval",1),$=Yt(t,"direction",Gt),S=Yt(t,"cursor",$===Gt?"col-resize":"row-resize"),z=Yt(t,"gutter",Xt),C=Yt(t,"elementStyle",ei),I=Yt(t,"gutterStyle",ti);function A(e,t,a,r){var o=C(i,t,a,r);Object.keys(o).forEach((function(t){e.style[t]=o[t]}))}function U(){return n.map((function(e){return e.size}))}function P(e){return"touches"in e?e.touches[0][a]:e[a]}function _(e){var t=n[this.a],i=n[this.b],a=t.size+i.size;t.size=e/this.size*a,i.size=a-e/this.size*a,A(t.element,t.size,this._b,t.i),A(i.element,i.size,this._c,i.i)}function L(e){var i,a=n[this.a],r=n[this.b];this.dragging&&(i=P(e)-this.start+(this._b-this.dragOffset),k>1&&(i=Math.round(i/k)*k),i<=a.minSize+a.snapOffset+this._b?i=a.minSize+this._b:i>=this.size-(r.minSize+r.snapOffset+this._c)&&(i=this.size-(r.minSize+this._c)),i>=a.maxSize-a.snapOffset+this._b?i=a.maxSize+this._b:i<=this.size-(r.maxSize-r.snapOffset+this._c)&&(i=this.size-(r.maxSize+this._c)),_.call(this,i),Yt(t,"onDrag",Vt)(U()))}function D(){var e=n[this.a].element,t=n[this.b].element,a=e.getBoundingClientRect(),s=t.getBoundingClientRect();this.size=a[i]+s[i]+this._b+this._c,this.start=a[r],this.end=a[o]}function T(e){var t=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;var i=e[s];return 0===i?null:i-=$===Gt?parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)}(d);if(null===t)return e;if(u.reduce((function(e,t){return e+t}),0)>t)return e;var i=0,a=[],r=e.map((function(r,o){var s=t*r/100,n=Qt(v,0===o,o===e.length-1,w),l=u[o]+n;return s<l?(i+=l-s,a.push(0),l):(a.push(s-l),s)}));return 0===i?e:r.map((function(e,r){var o=e;if(i>0&&a[r]-i>0){var s=Math.min(i,a[r]-i);i-=s,o=e-s}return o/t*100}))}function E(){var e=this,i=n[e.a].element,a=n[e.b].element;e.dragging&&Yt(t,"onDragEnd",Vt)(U()),e.dragging=!1,Ht.removeEventListener("mouseup",e.stop),Ht.removeEventListener("touchend",e.stop),Ht.removeEventListener("touchcancel",e.stop),Ht.removeEventListener("mousemove",e.move),Ht.removeEventListener("touchmove",e.move),e.stop=null,e.move=null,i.removeEventListener("selectstart",Vt),i.removeEventListener("dragstart",Vt),a.removeEventListener("selectstart",Vt),a.removeEventListener("dragstart",Vt),i.style.userSelect="",i.style.webkitUserSelect="",i.style.MozUserSelect="",i.style.pointerEvents="",a.style.userSelect="",a.style.webkitUserSelect="",a.style.MozUserSelect="",a.style.pointerEvents="",e.gutter.style.cursor="",e.parent.style.cursor="",qt.body.style.cursor=""}function R(e){if(!("button"in e)||0===e.button){var i=this,a=n[i.a].element,r=n[i.b].element;i.dragging||Yt(t,"onDragStart",Vt)(U()),e.preventDefault(),i.dragging=!0,i.move=L.bind(i),i.stop=E.bind(i),Ht.addEventListener("mouseup",i.stop),Ht.addEventListener("touchend",i.stop),Ht.addEventListener("touchcancel",i.stop),Ht.addEventListener("mousemove",i.move),Ht.addEventListener("touchmove",i.move),a.addEventListener("selectstart",Vt),a.addEventListener("dragstart",Vt),r.addEventListener("selectstart",Vt),r.addEventListener("dragstart",Vt),a.style.userSelect="none",a.style.webkitUserSelect="none",a.style.MozUserSelect="none",a.style.pointerEvents="none",r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",i.gutter.style.cursor=S,i.parent.style.cursor=S,qt.body.style.cursor=S,D.call(i),i.dragOffset=P(e)-i.end}}$===Gt?(i="width",a="clientX",r="left",o="right",s="clientWidth"):"vertical"===$&&(i="height",a="clientY",r="top",o="bottom",s="clientHeight"),p=T(p);var O=[];function N(e){var t=e.i===O.length,i=t?O[e.i-1]:O[e.i];D.call(i);var a=t?i.size-e.minSize-i._c:e.minSize+i._b;_.call(i,a)}return n=l.map((function(e,t){var a,r={element:Jt(e),size:p[t],minSize:u[t],maxSize:m[t],snapOffset:y[t],i:t};if(t>0&&((a={a:t-1,b:t,dragging:!1,direction:$,parent:d})._b=Qt(v,t-1==0,!1,w),a._c=Qt(v,!1,t===l.length-1,w),"row-reverse"===h||"column-reverse"===h)){var o=a.a;a.a=a.b,a.b=o}if(t>0){var s=z(t,$,r.element);!function(e,t,a){var r=I(i,t,a);Object.keys(r).forEach((function(t){e.style[t]=r[t]}))}(s,v,t),a._a=R.bind(a),s.addEventListener("mousedown",a._a),s.addEventListener("touchstart",a._a),d.insertBefore(s,r.element),a.gutter=s}return A(r.element,r.size,Qt(v,0===t,t===l.length-1,w),t),t>0&&O.push(a),r})),n.forEach((function(e){var t=e.element.getBoundingClientRect()[i];t<e.minSize&&(g?N(e):e.minSize=t)})),{setSizes:function(e){var t=T(e);t.forEach((function(e,i){if(i>0){var a=O[i-1],r=n[a.a],o=n[a.b];r.size=t[i-1],o.size=e,A(r.element,r.size,a._b,r.i),A(o.element,o.size,a._c,o.i)}}))},getSizes:U,collapse:function(e){N(n[e])},destroy:function(e,t){O.forEach((function(a){if(!0!==t?a.parent.removeChild(a.gutter):(a.gutter.removeEventListener("mousedown",a._a),a.gutter.removeEventListener("touchstart",a._a)),!0!==e){var r=C(i,a.a.size,a._b);Object.keys(r).forEach((function(e){n[a.a].element.style[e]="",n[a.b].element.style[e]=""}))}}))},parent:d,pairs:O}},ai="search://";class ri extends le{constructor(){super(),this.sourceUrl=null,this.inited=!1,this.isLoading=!1,this.coll="",this.collInfo=null,this._replaceLoc=!1,this._locUpdateNeeded=!1,this._locationHash="",this.tabData={},this.url="",this.ts="",this.tabNames=["pages","story","resources","info"],this.tabLabels={pages:"Pages",story:"Story",resources:"URLs",info:"Archive Info"},this.menuActive=!1,this.embedDropdownActive=!1,this.hasStory=!1,this.editable=!1,this.browsable=!0,this.clearable=!0,this.showSidebar="1"===localStorage.getItem("pages:showSidebar"),this.splitter=null,this.isVisible=!0,this.favIconUrl="",this.autoUpdateInterval=10,this._autoUpdater=null,this.appName="ReplayWeb.page",this.appVersion=Ie,this.appLogo=ke()}static get properties(){return{inited:{type:Boolean},sourceUrl:{type:String},loadInfo:{type:Object,attribute:!1},showSidebar:{type:Boolean},collInfo:{type:Object,attribute:!1},coll:{type:String},hasStory:{type:Boolean},isLoading:{type:Boolean},tabData:{type:Object,attribute:!1},url:{type:String},ts:{type:String},isFullscreen:{type:Boolean},menuActive:{type:Boolean},embed:{type:String},embedDropdownActive:{type:Boolean},editable:{type:Boolean},browsable:{type:Boolean},clearable:{type:Boolean},isVisible:{type:Boolean},favIconUrl:{type:String},appName:{type:String},appVersion:{type:String},appLogo:{type:String},autoUpdateInterval:{type:Number},swName:{type:String}}}firstUpdated(){this.inited=!0,window.addEventListener("hashchange",(e=>this.onHashChange(e))),this.addEventListener("fullscreenchange",(()=>{this.isFullscreen=!!document.fullscreenElement})),this.embed&&this.loadInfo&&this.loadInfo.hideOffscreen&&(this.observer=new IntersectionObserver((e=>{this.isVisible=e[0].isIntersecting})),this.observer.observe(this))}async runUpdateLoop(){try{for(;this.editable&&this.autoUpdateInterval&&(!this.collInfo||!this.collInfo.pages||this.collInfo.pages.length<100);)await new Promise((e=>setTimeout(e,1e3*this.autoUpdateInterval))),await this.doUpdateInfo(!0)}finally{this._autoUpdater=null}}updated(e){if(e.has("sourceUrl")&&this.doUpdateInfo(),e.has("editable")&&this.editable&&this.autoUpdateInterval&&!this._autoUpdater&&(this._autoUpdater=this.runUpdateLoop()),e.has("tabData")){if(!this.collInfo||!this.collInfo.coll)return;Object.keys(this.tabData).forEach((e=>!this.tabData[e]&&delete this.tabData[e]));const t="#"+new URLSearchParams(this.tabData).toString();if(this.tabData.url||(this.url=ai+decodeURIComponent(this._paramsToString(this.tabData))),t!==this._locationHash){if(this._locationHash=t,this._replaceLoc||0===Object.keys(e.get("tabData")).length){const e=new URL(window.location.href);e.hash=this._locationHash,window.history.replaceState({},"",e.href),this._replaceLoc=!1}else if(window.location.hash=this._locationHash,!this.showSidebar){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.focus()}this.embed&&window.parent!==window&&window.parent.postMessage(this.tabData,"*")}this._locUpdateNeeded=!1}e.has("showSidebar")&&(this.embed||localStorage.setItem("pages:showSidebar",this.showSidebar?"1":"0")),(e.has("tabData")||e.has("showSidebar"))&&this.configureSplitter()}configureSplitter(){if(this.tabData.url&&this.showSidebar){const e=this.renderRoot.querySelector("#contents"),t=this.renderRoot.querySelector("wr-coll-replay");if(e&&t&&!this.splitter){const i={sizes:[30,70],minSize:[300,300],gutterSize:4,onDragStart(){t.setDisablePointer(!0)},onDragEnd(){t.setDisablePointer(!1)}};this.splitter=ii([e,t],i)}}else if(this.splitter){try{this.splitter.destroy()}catch(e){}this.splitter=null}}async doUpdateInfo(e=!1){if(e&&this.tabData.url&&!this.showSidebar)return;let t=this.loadInfo&&this.loadInfo.customColl;if(!t){t=(await nt(this.sourceUrl)).coll}this.coll=t;const i="./w/api/c/"+t,a="./w/"+t,r=await fetch(i+"?all=1");if(200!=r.status)return void(this.collInfo={});const o=await r.json();if(this.collInfo={apiPrefix:i,replayPrefix:a,coll:t,...o},this.loadInfo&&this.loadInfo.extraConfig&&this.loadInfo.extraConfig.headers){const e=this.loadInfo.extraConfig.headers;await fetch(`${i}/updateAuth`,{method:"POST",body:JSON.stringify({headers:e})})}this.collInfo.title||(this.collInfo.title=this.collInfo.filename),"replayonly"!==this.embed&&"replay-with-info"!==this.embed||(this.showSidebar=!1),this.hasStory=this.collInfo.desc||this.collInfo.lists.length,this.dispatchEvent(new CustomEvent("coll-loaded",{detail:{collInfo:this.collInfo,alreadyLoaded:!0}})),this.onHashChange()}onCollLoaded(e){this.doUpdateInfo(),this.loadInfo=null,e.detail.sourceUrl&&(this.sourceUrl=e.detail.sourceUrl),this.dispatchEvent(new CustomEvent("coll-loaded",{detail:{sourceUrl:this.sourceUrl,collInfo:this.collInfo}}))}onCollUpdate(e){this.editable&&(this.collInfo={...this.collInfo,...e.detail})}onHashChange(){const e=window.location.hash;if(e&&e!==this._locationHash&&(this.tabData=Object.fromEntries(new URLSearchParams(e.slice(1)).entries()),this._locationHash=e),this.collInfo.coll&&!this.tabNames.includes(this.tabData.view)){const e=this.hasStory?"story":this.editable||this.collInfo.pages.length?"pages":"resources";this.tabData={...this.tabData,view:e}}if(this.tabData.url&&this.tabData.url.startsWith("page:")){const e=Number(this.tabData.url.slice("page:".length));if(!isNaN(e)&&e<this.collInfo.pages.length){const t=this.collInfo.pages[e];this.tabData.url=t.url,this.tabData.ts=rt(t).timestamp}}this.hasStory||"story"!==this.tabData.view||(this.tabData.view="pages"),this.tabData.url&&this.tabData.query&&(this.showSidebar=!0)}onTabClick(e){e.preventDefault();const t=e.currentTarget.getAttribute("href");return this.tabData={...this.tabData,view:t.slice(1)},!1}onCollTabNav(e){e.detail.reload?this.onRefresh(null,!0):e.target.id===this.tabData.view||"replay"===e.target.id&&this.tabData.url?this.updateTabData(e.detail.data,e.detail.replaceLoc,!1):this.showSidebar&&this.tabData.url&&this.updateTabData(e.detail.data,e.detail.replaceLoc,!0)}updateTabData(e,t=!1){this.tabData={...this.tabData,...e},this.tabData.url&&(this.url=this.tabData.url||""),this.tabData.ts&&(this.ts=this.tabData.ts||""),this._replaceLoc=!this._locUpdateNeeded&&t,this._locUpdateNeeded=!0}static get styles(){return ze(ri.compStyles)}static get compStyles(){return d`
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

      @media screen and (max-width: ${Ce?d`1163px`:d`1053px`}) {
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
        background-color: white;
      }

      #tabContents {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        min-height: 0px;
        flex: auto;
      }

      rwp-embed-receipt {
        flex-direction: column;
        display: flex;
      }

      ${Ft.embedStyles}

      ${ri.replayBarStyles}
    `}static get replayBarStyles(){return d`
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
        border-bottom: solid 0.1rem #97989a;
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
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0),
          #fff 15%,
          #fff
        );
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

      main,
      wr-coll-replay {
        width: 100%;
      }

      .info-bg {
        background-color: whitesmoke;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: auto;
      }

      .is-list {
        margin: 1em;
        background-color: whitesmoke;
        height: fit-content;
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
    `}render(){if(!this.inited)return F``;const e=!!this.tabData.url,t=e&&this.showSidebar;if(!e&&this.tabData&&this.tabData.view){const e={title:this.tabLabels[this.tabData.view],replayTitle:!1};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}return this.collInfo&&!this.collInfo.coll?F` <wr-loader
        .loadInfo="${this.loadInfo}"
        embed="${this.embed}"
        swName="${this.swName}"
        .coll="${this.coll}"
        .sourceUrl="${this.sourceUrl}"
        @coll-loaded=${this.onCollLoaded}
      ></wr-loader>`:this.collInfo?F`
        ${this.renderLocationBar()} ${this.renderVerifyInfo()}
        <div id="tabContents">
          <div
            id="contents"
            class="is-light ${t?"sidebar":e?"is-hidden":"full-pages"}"
            role="${t?"complementary":""}"
            aria-label="${t?"Browse Contents":""}"
          >
            ${this.renderTabHeader(t)}
            ${t||!e?this.renderCollTabs(t):F``}
          </div>

          ${e&&this.isVisible?F`
                <wr-coll-replay
                  role="main"
                  tabindex="-1"
                  .collInfo="${this.collInfo}"
                  sourceUrl="${this.sourceUrl}"
                  url="${this.tabData.url||""}"
                  ts="${this.tabData.ts||""}"
                  @coll-tab-nav="${this.onCollTabNav}"
                  id="replay"
                  @replay-loading="${e=>this.isLoading=e.detail.loading}"
                  @replay-favicons="${this.onFavIcons}"
                >
                </wr-coll-replay>
              `:""}
        </div>
      `:F``}renderTabHeader(e){return F` <nav
      class="main tabs is-centered ${e?"sidebar":""}"
      aria-label="tabs"
    >
      <ul>
        ${e?F` <li class="sidebar-nav left">
              <a
                role="button"
                href="#"
                @click="${this.onHideSidebar}"
                @keyup="${Ae}"
                class="is-marginless is-size-6 is-paddingless"
              >
                <fa-icon
                  title="Hide"
                  .svg="${_t()}"
                  aria-hidden="true"
                ></fa-icon>
                <span class="nav-hover" aria-hidden="true">Hide</span>
                <span class="is-sr-only">Hide Sidebar</span>
              </a>
            </li>`:""}
        ${this.hasStory?F` <li
              class="${"story"===this.tabData.view?"is-active":""}"
            >
              <a
                @click="${this.onTabClick}"
                href="#story"
                class="is-size-6"
                aria-label="Story"
                aria-current="${"story"===this.tabData.view?"location":""}"
              >
                <span class="icon"
                  ><fa-icon
                    .svg="${dt()}"
                    aria-hidden="true"
                    title="Story"
                  ></fa-icon
                ></span>
                <span
                  class="tab-label ${e?"is-hidden":""}"
                  title="Story"
                  >Story</span
                >
              </a>
            </li>`:""}

        <li class="${"pages"===this.tabData.view?"is-active":""}">
          <a
            @click="${this.onTabClick}"
            href="#pages"
            class="is-size-6"
            aria-label="Pages"
            aria-current="${"pages"===this.tabData.view?"location":""}"
          >
            <span class="icon"
              ><fa-icon
                .svg="${gt()}"
                aria-hidden="true"
                title="Pages"
              ></fa-icon
            ></span>
            <span
              class="tab-label ${e?"is-hidden":""}"
              title="Pages"
              >Pages</span
            >
          </a>
        </li>

        <li class="${"resources"===this.tabData.view?"is-active":""}">
          <a
            @click="${this.onTabClick}"
            href="#resources"
            class="is-size-6"
            aria-label="URLs"
            aria-current="${"resources"===this.tabData.view?"location":""}"
          >
            <span class="icon"
              ><fa-icon
                .svg="${bt()}"
                aria-hidden="true"
                title="URLs"
              ></fa-icon
            ></span>
            <span class="tab-label ${e?"is-hidden":""}" title="URLs"
              >URLs</span
            >
          </a>
        </li>

        <li class="${"info"===this.tabData.view?"is-active":""}">
          <a
            @click="${this.onTabClick}"
            href="#info"
            class="is-size-6"
            aria-label="Archive Info"
            aria-current="${"info"===this.tabData.view?"location":""}"
          >
            <span class="icon"
              ><fa-icon
                .svg="${wt()}"
                aria-hidden="true"
                title="Archive Info"
              ></fa-icon
            ></span>
            <span
              class="tab-label ${e?"is-hidden":""}"
              title="Archive Info"
              >Info</span
            >
          </a>
        </li>

        ${e?F` <li class="sidebar-nav right">
              <a
                role="button"
                href="#"
                @click="${this.onFullPageView}"
                @keyup="${Ae}"
                class="is-marginless is-size-6 is-paddingless"
              >
                <span class="nav-hover" aria-hidden="true">Expand</span>
                <span class="is-sr-only">Expand Sidebar to Full View</span>
                <fa-icon
                  title="Expand"
                  .svg="${Dt()}"
                  aria-hidden="true"
                ></fa-icon>
              </a>
            </li>`:""}
      </ul>
    </nav>`}renderLocationBar(){if("replayonly"===this.embed||"replay-with-info"==this.embed)return"";const e=at(this.ts).toLocaleString(),t=!!this.tabData.url,i=t&&this.favIconUrl;return F` <a
        class="skip-link"
        href="#skip-replay-target"
        @click="${this.skipMenu}"
        >Skip replay navigation</a
      >
      <nav class="replay-bar" aria-label="replay">
        <div class="field has-addons">
          <a
            href="#"
            role="button"
            class="button narrow is-borderless is-hidden-touch"
            id="fullscreen"
            @click="${this.onFullscreenToggle}"
            @keyup="${Ae}"
            title="${this.isFullscreen?"Exit Full Screen":"Full Screen"}"
            aria-label="${this.isFullscreen?"Exit Fullscreen":"Fullscreen"}"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="has-text-grey"
                aria-hidden="true"
                .svg="${this.isFullscreen?It():zt()}"
              ></fa-icon>
            </span>
          </a>
          <a
            href="#"
            role="button"
            class="button narrow is-borderless is-hidden-mobile"
            @click="${this.onGoBack}"
            @keyup="${Ae}"
            title="Back"
            aria-label="Back"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="has-text-grey"
                aria-hidden="true"
                .svg="${Te()}"
              ></fa-icon>
            </span>
          </a>
          <a
            href="#"
            role="button"
            class="button narrow is-borderless is-hidden-mobile"
            @click="${this.onGoForward}"
            @keyup="${Ae}"
            title="Forward"
            aria-label="Forward"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="has-text-grey"
                aria-hidden="true"
                .svg="${Re()}"
              ></fa-icon>
            </span>
          </a>
          <a
            href="#"
            role="button"
            class="button narrow is-borderless ${this.isLoading?"is-loading":"is-hidden-mobile"}"
            id="refresh"
            @click="${this.onRefresh}"
            @keyup="${Ae}"
            title="Reload"
            aria-label="Reload"
          >
            <span class="icon is-small">
              ${this.isLoading?"":F`
                    <fa-icon
                      size="1.0em"
                      class="has-text-grey"
                      aria-hidden="true"
                      .svg="${$t()}"
                    ></fa-icon>
                  `}
            </span>
          </a>
          ${this.browsable?F` <a
                href="#"
                role="button"
                class="button narrow is-borderless is-hidden-mobile ${t?"":"grey-disabled"}"
                @click="${this.onShowPages}"
                @keyup="${Ae}"
                ?disabled="${!t}"
                title="Browse Contents"
                aria-label="Browse Contents"
                aria-controls="contents"
              >
                <span class="icon is-small">
                  <fa-icon
                    size="1.0em"
                    class="has-text-grey"
                    aria-hidden="true"
                    .svg="${ft()}"
                  ></fa-icon>
                </span>
              </a>`:""}
          ${this.renderExtraToolbar(!1)}
          <form @submit="${this.onSubmit}">
            <div
              class="control is-expanded ${i?"has-icons-left":""}"
            >
              <input
                id="url"
                class="input"
                type="text"
                @keydown="${this.onKeyDown}"
                @blur="${this.onLostFocus}"
                .value="${this.url}"
                placeholder="Enter text to search or a URL to replay"
              />
              ${t?F`<p id="datetime" class="control is-hidden-mobile">
                    ${e}
                  </p>`:F``}
              ${i?F` <span class="favicon icon is-small is-left">
                    <img src="${this.favIconUrl}" />
                  </span>`:F``}
            </div>
          </form>

          <div
            class="dropdown is-right ${this.menuActive?"is-active":""}"
            @click="${()=>this.menuActive=!1}"
          >
            <div class="dropdown-trigger">
              <button
                class="button is-borderless"
                aria-haspopup="true"
                aria-controls="menu-dropdown"
                aria-expanded="${this.menuActive}"
                @click="${this.onMenu}"
                aria-label="more replay controls"
              >
                <span class="icon is-small">
                  <fa-icon
                    size="1.0em"
                    class="has-text-grey"
                    aria-hidden="true"
                    .svg="${Ut()}"
                  ></fa-icon>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="menu-dropdown">
              <div class="dropdown-content">
                <a
                  href="#"
                  role="button"
                  class="dropdown-item is-hidden-desktop"
                  @click="${this.onFullscreenToggle}"
                  @keyup="${Ae}"
                >
                  <span class="icon is-small">
                    <fa-icon
                      size="1.0em"
                      class="has-text-grey"
                      aria-hidden="true"
                      .svg="${this.isFullscreen?It():zt()}"
                    ></fa-icon>
                  </span>
                  <span>Full Screen</span>
                </a>
                <a
                  href="#"
                  role="button"
                  class="dropdown-item is-hidden-tablet"
                  @click="${this.onGoBack}"
                  @keyup="${Ae}"
                >
                  <span class="icon is-small">
                    <fa-icon
                      size="1.0em"
                      class="has-text-grey"
                      aria-hidden="true"
                      .svg="${Te()}"
                    ></fa-icon>
                  </span>
                  <span>Back</span>
                </a>
                <a
                  href="#"
                  role="button"
                  class="dropdown-item is-hidden-tablet"
                  @click="${this.onGoForward}"
                  @keyup="${Ae}"
                >
                  <span class="icon is-small">
                    <fa-icon
                      size="1.0em"
                      class="has-text-grey"
                      aria-hidden="true"
                      .svg="${Re()}"
                    ></fa-icon>
                  </span>
                  <span>Forward</span>
                </a>
                <a
                  href="#"
                  role="button"
                  class="dropdown-item is-hidden-tablet"
                  @click="${this.onRefresh}"
                  @keyup="${Ae}"
                >
                  <span class="icon is-small">
                    <fa-icon
                      size="1.0em"
                      class="has-text-grey"
                      aria-hidden="true"
                      .svg="${$t()}"
                    ></fa-icon>
                  </span>
                  <span>Reload</span>
                </a>
                ${this.browsable?F` <a
                      href="#"
                      role="button"
                      class="dropdown-item is-hidden-tablet ${t?"":"grey-disabled"}"
                      @click="${this.onShowPages}"
                      @keyup="${Ae}"
                    >
                      <span class="icon is-small">
                        <fa-icon
                          size="1.0em"
                          class="has-text-grey"
                          aria-hidden="true"
                          .svg="${ft()}"
                        ></fa-icon>
                      </span>
                      <span>Browse Contents</span>
                    </a>`:""}
                ${this.renderExtraToolbar(!0)}
                ${this.clearable?F` <hr class="dropdown-divider is-hidden-desktop" />
                      <a
                        href="#"
                        role="button"
                        class="dropdown-item"
                        @click="${this.onPurgeCache}"
                        @keyup="${Ae}"
                      >
                        <span class="icon is-small">
                          <fa-icon
                            size="1.0em"
                            class="has-text-grey"
                            aria-hidden="true"
                            .svg="${yt()}"
                          ></fa-icon>
                        </span>
                        <span>Purge Cache + Full Reload</span>
                      </a>`:F``}
                ${!this.editable&&this.sourceUrl.startsWith("http://")||this.sourceUrl.startsWith("https://")?F` <hr class="dropdown-divider" />
                      <a
                        href="${this.sourceUrl}"
                        role="button"
                        class="dropdown-item"
                        @keyup="${Ae}"
                      >
                        <span class="icon is-small">
                          <fa-icon
                            size="1.0em"
                            class="has-text-grey"
                            aria-hidden="true"
                            .svg="${ht()}"
                          ></fa-icon>
                        </span>
                        <span>Download Archive</span>
                      </a>`:F``}
                ${e?F` <hr class="dropdown-divider is-hidden-desktop" />
                      <div class="dropdown-item info is-hidden-desktop">
                        <span class="menu-head">Capture Date</span>${e}
                      </div>`:""}
                <hr class="dropdown-divider" />
                <a
                  href="#"
                  role="button"
                  class="dropdown-item"
                  @click="${this.onAbout}"
                >
                  <fa-icon
                    class="menu-logo"
                    size="1.0rem"
                    aria-hidden="true"
                    .svg=${this.appLogo}
                  ></fa-icon>
                  <span>&nbsp;About ${this.appName}</span>
                  <span class="menu-version">(${this.appVersion})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <p id="skip-replay-target" tabindex="-1" class="is-sr-only">Skipped</p>`}renderVerifyInfo(){return"replay-with-info"!==this.embed?"":F`<rwp-embed-receipt
      .collInfo=${this.collInfo}
      url=${this.url}
      ts=${this.ts}
      .appLogo=${this.appLogo}
    >
    </rwp-embed-receipt>`}dragStart(){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.setDisablePointer(!0)}dragEnd(){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.setDisablePointer(!1)}renderCollInfo(){return F` <div class="info-bg">
      <wr-coll-info
        class="is-list"
        .coll="${this.collInfo}"
        ?detailed="${!0}"
        ?canDelete="${!this.embed}"
        @coll-purge="${this.onPurgeCache}"
      ></wr-coll-info>
    </div>`}renderExtraToolbar(){return""}renderCollTabs(e){const t=this.hasStory&&"story"===this.tabData.view,i="pages"===this.tabData.view,a="resources"===this.tabData.view,r="info"===this.tabData.view;return F`
      ${r?this.renderCollInfo():F``}
      ${t?F` <wr-coll-story
            .collInfo="${this.collInfo}"
            .active="${t}"
            currList="${this.tabData.currList||0}"
            @coll-tab-nav="${this.onCollTabNav}"
            id="story"
            .isSidebar="${e}"
            class="${t?"":"is-hidden"} ${e?"sidebar":""}"
            role="${e?"":"main"}"
          >
          </wr-coll-story>`:""}
      ${a?F` <wr-coll-resources
            .collInfo="${this.collInfo}"
            .active="${a}"
            query="${this.tabData.query||""}"
            urlSearchType="${this.tabData.urlSearchType||""}"
            .currMime="${this.tabData.currMime||""}"
            @coll-tab-nav="${this.onCollTabNav}"
            id="resources"
            .isSidebar="${e}"
            class="is-paddingless ${a?"":"is-hidden"} ${e?"sidebar":""}"
            role="${e?"":"main"}"
          >
          </wr-coll-resources>`:""}
      ${i?F` <wr-page-view
            .collInfo="${this.collInfo}"
            .active="${i}"
            .editable="${this.editable}"
            .isSidebar="${e}"
            currList="${this.tabData.currList||0}"
            query="${this.tabData.query||""}"
            .url="${this.tabData.url||""}"
            .ts="${this.tabData.ts||""}"
            @coll-tab-nav="${this.onCollTabNav}"
            id="pages"
            @coll-update="${this.onCollUpdate}"
            class="${i?"":"is-hidden"} ${e?"sidebar":""}"
            role="${e?"":"main"}"
          >
          </wr-page-view>`:""}
    `}skipMenu(e){e.preventDefault(),this.renderRoot.querySelector("#skip-replay-target").focus()}onKeyDown(e){"Esc"!==e.key&&"Escape"!==e.key||(e.preventDefault(),e.currentTarget.value=this.url)}onMenu(e){e.stopPropagation(),this.menuActive=!this.menuActive,this.menuActive&&document.addEventListener("click",(()=>{this.menuActive=!1}),{once:!0})}onFullscreenToggle(e){e.preventDefault(),this.menuActive=!1,this.isFullscreen?document.exitFullscreen():this.requestFullscreen()}onGoBack(e){e.preventDefault(),this.menuActive=!1,window.history.back()}onGoForward(e){e.preventDefault(),this.menuActive=!1,window.history.forward()}onShowPages(e){e.preventDefault(),this.showSidebar||document.documentElement.clientWidth>=769?this.showSidebar=!this.showSidebar:(this.showSidebar=!1,this.updateTabData({url:"",ts:""}))}onFullPageView(e){e.preventDefault(),this.updateTabData({url:"",ts:""})}onHideSidebar(e){e.preventDefault(),this.showSidebar=!1}async onFavIcons(e){for(const t of e.detail.icons){const e=await fetch(t.href);if(200===e.status){const i=e.headers.get("Content-Type");if(i&&!i.startsWith("text/"))return void(this.favIconUrl=t.href)}}this.favIconUrl=""}onPurgeCache(e){e.preventDefault();const t=!e.detail||void 0===e.detail.reload||e.detail.reload;this.deleteFully(t)}async deleteFully(e=!1){const t=this.collInfo.apiPrefix+(e?"?reload=1":""),i=await fetch(t,{method:"DELETE"});200!==i.status&&console.warn("purge failed: "+i.status),e||this.embed?window.location.reload():window.location.search=""}onSubmit(e){e.preventDefault();const t=this.renderRoot.querySelector("input");return t.value?this.navigateTo(t.value):t.value=this.url,!1}onLostFocus(e){e.currentTarget.value||(e.currentTarget.value=this.url)}navigateTo(e){let t;if(e.startsWith("http://")||e.startsWith("https://")){if(t={url:e},e===this.tabData.url){const e=this.renderRoot.querySelector("wr-coll-replay");return void(e&&e.refresh())}}else t=e.startsWith(ai)?this._stringToParams(e):{query:e,view:"pages"};this.updateTabData(t)}_stringToParams(e){const t=new URLSearchParams(e.slice(ai.length)),i={url:"",ts:""};for(const e of["query","view","currList","currMime","urlSearchType"])t.has(e)&&(i[e]=t.get(e));return i}_paramsToString(e){const t=new URLSearchParams;for(const i of["query","view","currList","currMime","urlSearchType"])i in e&&t.set(i,e[i]);return t.toString()}onRefresh(e,t=!1){if(e&&e.preventDefault(),this.menuActive=!1,this.tabData.url){const e=this.renderRoot.querySelector("wr-coll-replay");e&&e.refresh()}else t||window.location.reload()}onAbout(){this.dispatchEvent(new CustomEvent("about-show"))}}function oi(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}customElements.define("wr-coll",ri);let si={async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};const ni=/[&<>"']/,li=new RegExp(ni.source,"g"),di=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ci=new RegExp(di.source,"g"),hi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pi=e=>hi[e];function fi(e,t){if(t){if(ni.test(e))return e.replace(li,pi)}else if(di.test(e))return e.replace(ci,pi);return e}const ui=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function bi(e){return e.replace(ui,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const mi=/(^|[^\[])\^/g;function gi(e,t){e="string"==typeof e?e:e.source,t=t||"";const i={replace:(t,a)=>(a=(a=a.source||a).replace(mi,"$1"),e=e.replace(t,a),i),getRegex:()=>new RegExp(e,t)};return i}const vi=/[^\w:]/g,wi=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function xi(e,t,i){if(e){let e;try{e=decodeURIComponent(bi(i)).replace(vi,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!wi.test(i)&&(i=function(e,t){yi[" "+e]||(ki.test(e)?yi[" "+e]=e+"/":yi[" "+e]=Ii(e,"/",!0));const i=-1===(e=yi[" "+e]).indexOf(":");return"//"===t.substring(0,2)?i?t:e.replace($i,"$1")+t:"/"===t.charAt(0)?i?t:e.replace(Si,"$1")+t:e+t}(t,i));try{i=encodeURI(i).replace(/%25/g,"%")}catch(e){return null}return i}const yi={},ki=/^[^:]+:\/*[^/]*$/,$i=/^([^:]+:)[\s\S]*$/,Si=/^([^:]+:\/*[^/]*)[\s\S]*$/;const zi={exec:function(){}};function Ci(e,t){const i=e.replace(/\|/g,((e,t,i)=>{let a=!1,r=t;for(;--r>=0&&"\\"===i[r];)a=!a;return a?"|":" |"})).split(/ \|/);let a=0;if(i[0].trim()||i.shift(),i.length>0&&!i[i.length-1].trim()&&i.pop(),i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;a<i.length;a++)i[a]=i[a].trim().replace(/\\\|/g,"|");return i}function Ii(e,t,i){const a=e.length;if(0===a)return"";let r=0;for(;r<a;){const o=e.charAt(a-r-1);if(o!==t||i){if(o===t||!i)break;r++}else r++}return e.slice(0,a-r)}function Ai(e,t){if(t<1)return"";let i="";for(;t>1;)1&t&&(i+=e),t>>=1,e+=e;return i+e}function Ui(e,t,i,a){const r=t.href,o=t.title?fi(t.title):null,s=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){a.state.inLink=!0;const e={type:"link",raw:i,href:r,title:o,text:s,tokens:a.inlineTokens(s)};return a.state.inLink=!1,e}return{type:"image",raw:i,href:r,title:o,text:fi(s)}}class Pi{constructor(e){this.options=e||si}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:Ii(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],i=function(e,t){const i=e.match(/^(\s+)(?:```)/);if(null===i)return t;const a=i[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[i]=t;return i.length>=a.length?e.slice(a.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=Ii(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *>[ \t]?/gm,""),i=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(e);return this.lexer.state.top=i,{type:"blockquote",raw:t[0],tokens:a,text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i,a,r,o,s,n,l,d,c,h,p,f,u=t[1].trim();const b=u.length>1,m={type:"list",raw:"",ordered:b,start:b?+u.slice(0,-1):"",loose:!1,items:[]};u=b?`\\d{1,9}\\${u.slice(-1)}`:`\\${u}`,this.options.pedantic&&(u=b?u:"[*+-]");const g=new RegExp(`^( {0,3}${u})((?:[\t ][^\\n]*)?(?:\\n|$))`);for(;e&&(f=!1,t=g.exec(e))&&!this.rules.block.hr.test(e);){if(i=t[0],e=e.substring(i.length),d=t[2].split("\n",1)[0].replace(/^\t+/,(e=>" ".repeat(3*e.length))),c=e.split("\n",1)[0],this.options.pedantic?(o=2,p=d.trimLeft()):(o=t[2].search(/[^ ]/),o=o>4?1:o,p=d.slice(o),o+=t[1].length),n=!1,!d&&/^ *$/.test(c)&&(i+=c+"\n",e=e.substring(c.length+1),f=!0),!f){const t=new RegExp(`^ {0,${Math.min(3,o-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),a=new RegExp(`^ {0,${Math.min(3,o-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),r=new RegExp(`^ {0,${Math.min(3,o-1)}}(?:\`\`\`|~~~)`),s=new RegExp(`^ {0,${Math.min(3,o-1)}}#`);for(;e&&(h=e.split("\n",1)[0],c=h,this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!r.test(c))&&!s.test(c)&&!t.test(c)&&!a.test(e);){if(c.search(/[^ ]/)>=o||!c.trim())p+="\n"+c.slice(o);else{if(n)break;if(d.search(/[^ ]/)>=4)break;if(r.test(d))break;if(s.test(d))break;if(a.test(d))break;p+="\n"+c}n||c.trim()||(n=!0),i+=h+"\n",e=e.substring(h.length+1),d=c.slice(o)}}m.loose||(l?m.loose=!0:/\n *\n *$/.test(i)&&(l=!0)),this.options.gfm&&(a=/^\[[ xX]\] /.exec(p),a&&(r="[ ] "!==a[0],p=p.replace(/^\[[ xX]\] +/,""))),m.items.push({type:"list_item",raw:i,task:!!a,checked:r,loose:!1,text:p}),m.raw+=i}m.items[m.items.length-1].raw=i.trimRight(),m.items[m.items.length-1].text=p.trimRight(),m.raw=m.raw.trimRight();const v=m.items.length;for(s=0;s<v;s++)if(this.lexer.state.top=!1,m.items[s].tokens=this.lexer.blockTokens(m.items[s].text,[]),!m.loose){const e=m.items[s].tokens.filter((e=>"space"===e.type)),t=e.length>0&&e.some((e=>/\n.*\n/.test(e.raw)));m.loose=t}if(m.loose)for(s=0;s<v;s++)m.items[s].loose=!0;return m}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};if(this.options.sanitize){const i=this.options.sanitizer?this.options.sanitizer(t[0]):fi(t[0]);e.type="paragraph",e.text=i,e.tokens=this.lexer.inline(i)}return e}}def(e){const t=this.rules.block.def.exec(e);if(t){const e=t[1].toLowerCase().replace(/\s+/g," "),i=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:Ci(t[1]).map((e=>({text:e}))),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){e.raw=t[0];let i,a,r,o,s=e.align.length;for(i=0;i<s;i++)/^ *-+: *$/.test(e.align[i])?e.align[i]="right":/^ *:-+: *$/.test(e.align[i])?e.align[i]="center":/^ *:-+ *$/.test(e.align[i])?e.align[i]="left":e.align[i]=null;for(s=e.rows.length,i=0;i<s;i++)e.rows[i]=Ci(e.rows[i],e.header.length).map((e=>({text:e})));for(s=e.header.length,a=0;a<s;a++)e.header[a].tokens=this.lexer.inline(e.header[a].text);for(s=e.rows.length,a=0;a<s;a++)for(o=e.rows[a],r=0;r<o.length;r++)o[r].tokens=this.lexer.inline(o[r].text);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:fi(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):fi(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=Ii(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;const i=e.length;let a=0,r=0;for(;r<i;r++)if("\\"===e[r])r++;else if(e[r]===t[0])a++;else if(e[r]===t[1]&&(a--,a<0))return r;return-1}(t[2],"()");if(e>-1){const i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],a="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);e&&(i=e[1],a=e[3])}else a=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(i=this.options.pedantic&&!/>$/.test(e)?i.slice(1):i.slice(1,-1)),Ui(t,{href:i?i.replace(this.rules.inline._escapes,"$1"):i,title:a?a.replace(this.rules.inline._escapes,"$1"):a},t[0],this.lexer)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=(i[2]||i[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e){const e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return Ui(i,e,i[0],this.lexer)}}emStrong(e,t,i=""){let a=this.rules.inline.emStrong.lDelim.exec(e);if(!a)return;if(a[3]&&i.match(/[\p{L}\p{N}]/u))return;const r=a[1]||a[2]||"";if(!r||r&&(""===i||this.rules.inline.punctuation.exec(i))){const i=a[0].length-1;let r,o,s=i,n=0;const l="*"===a[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+i);null!=(a=l.exec(t));){if(r=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!r)continue;if(o=r.length,a[3]||a[4]){s+=o;continue}if((a[5]||a[6])&&i%3&&!((i+o)%3)){n+=o;continue}if(s-=o,s>0)continue;o=Math.min(o,o+s+n);const t=e.slice(0,i+a.index+(a[0].length-r.length)+o);if(Math.min(i,o)%2){const e=t.slice(1,-1);return{type:"em",raw:t,text:e,tokens:this.lexer.inlineTokens(e)}}const l=t.slice(2,-2);return{type:"strong",raw:t,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const i=/[^ ]/.test(e),a=/^ /.test(e)&&/ $/.test(e);return i&&a&&(e=e.substring(1,e.length-1)),e=fi(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const i=this.rules.inline.autolink.exec(e);if(i){let e,a;return"@"===i[2]?(e=fi(this.options.mangle?t(i[1]):i[1]),a="mailto:"+e):(e=fi(i[1]),a=e),{type:"link",raw:i[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let i;if(i=this.rules.inline.url.exec(e)){let e,a;if("@"===i[2])e=fi(this.options.mangle?t(i[0]):i[0]),a="mailto:"+e;else{let t;do{t=i[0],i[0]=this.rules.inline._backpedal.exec(i[0])[0]}while(t!==i[0]);e=fi(i[0]),a="www."===i[1]?"http://"+i[0]:i[0]}return{type:"link",raw:i[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t){const i=this.rules.inline.text.exec(e);if(i){let e;return e=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):fi(i[0]):i[0]:fi(this.options.smartypants?t(i[0]):i[0]),{type:"text",raw:i[0],text:e}}}}const _i={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:zi,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};_i.def=gi(_i.def).replace("label",_i._label).replace("title",_i._title).getRegex(),_i.bullet=/(?:[*+-]|\d{1,9}[.)])/,_i.listItemStart=gi(/^( *)(bull) */).replace("bull",_i.bullet).getRegex(),_i.list=gi(_i.list).replace(/bull/g,_i.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+_i.def.source+")").getRegex(),_i._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_i._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,_i.html=gi(_i.html,"i").replace("comment",_i._comment).replace("tag",_i._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_i.paragraph=gi(_i._paragraph).replace("hr",_i.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i._tag).getRegex(),_i.blockquote=gi(_i.blockquote).replace("paragraph",_i.paragraph).getRegex(),_i.normal={..._i},_i.gfm={..._i.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},_i.gfm.table=gi(_i.gfm.table).replace("hr",_i.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i._tag).getRegex(),_i.gfm.paragraph=gi(_i._paragraph).replace("hr",_i.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",_i.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i._tag).getRegex(),_i.pedantic={..._i.normal,html:gi("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",_i._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:gi(_i.normal._paragraph).replace("hr",_i.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",_i.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const Li={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:zi,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:zi,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function Di(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function Ti(e){let t,i,a="";const r=e.length;for(t=0;t<r;t++)i=e.charCodeAt(t),Math.random()>.5&&(i="x"+i.toString(16)),a+="&#"+i+";";return a}Li._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",Li.punctuation=gi(Li.punctuation).replace(/punctuation/g,Li._punctuation).getRegex(),Li.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,Li.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,Li._comment=gi(_i._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),Li.emStrong.lDelim=gi(Li.emStrong.lDelim).replace(/punct/g,Li._punctuation).getRegex(),Li.emStrong.rDelimAst=gi(Li.emStrong.rDelimAst,"g").replace(/punct/g,Li._punctuation).getRegex(),Li.emStrong.rDelimUnd=gi(Li.emStrong.rDelimUnd,"g").replace(/punct/g,Li._punctuation).getRegex(),Li._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,Li._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,Li._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,Li.autolink=gi(Li.autolink).replace("scheme",Li._scheme).replace("email",Li._email).getRegex(),Li._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,Li.tag=gi(Li.tag).replace("comment",Li._comment).replace("attribute",Li._attribute).getRegex(),Li._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Li._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,Li._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,Li.link=gi(Li.link).replace("label",Li._label).replace("href",Li._href).replace("title",Li._title).getRegex(),Li.reflink=gi(Li.reflink).replace("label",Li._label).replace("ref",_i._label).getRegex(),Li.nolink=gi(Li.nolink).replace("ref",_i._label).getRegex(),Li.reflinkSearch=gi(Li.reflinkSearch,"g").replace("reflink",Li.reflink).replace("nolink",Li.nolink).getRegex(),Li.normal={...Li},Li.pedantic={...Li.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:gi(/^!?\[(label)\]\((.*?)\)/).replace("label",Li._label).getRegex(),reflink:gi(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Li._label).getRegex()},Li.gfm={...Li.normal,escape:gi(Li.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Li.gfm.url=gi(Li.gfm.url,"i").replace("email",Li.gfm._extended_email).getRegex(),Li.breaks={...Li.gfm,br:gi(Li.br).replace("{2,}","*").getRegex(),text:gi(Li.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class Ei{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||si,this.options.tokenizer=this.options.tokenizer||new Pi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:_i.normal,inline:Li.normal};this.options.pedantic?(t.block=_i.pedantic,t.inline=Li.pedantic):this.options.gfm&&(t.block=_i.gfm,this.options.breaks?t.inline=Li.breaks:t.inline=Li.gfm),this.tokenizer.rules=t}static get rules(){return{block:_i,inline:Li}}static lex(e,t){return new Ei(t).lex(e)}static lexInline(e,t){return new Ei(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let i,a,r,o;for(e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,((e,t,i)=>t+"    ".repeat(i.length)));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((a=>!!(i=a.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))))if(i=this.tokenizer.space(e))e=e.substring(i.raw.length),1===i.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(i);else if(i=this.tokenizer.code(e))e=e.substring(i.raw.length),a=t[t.length-1],!a||"paragraph"!==a.type&&"text"!==a.type?t.push(i):(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue[this.inlineQueue.length-1].src=a.text);else if(i=this.tokenizer.fences(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.heading(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.hr(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.blockquote(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.list(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.html(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.def(e))e=e.substring(i.raw.length),a=t[t.length-1],!a||"paragraph"!==a.type&&"text"!==a.type?this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title}):(a.raw+="\n"+i.raw,a.text+="\n"+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=a.text);else if(i=this.tokenizer.table(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.lheading(e))e=e.substring(i.raw.length),t.push(i);else{if(r=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const i=e.slice(1);let a;this.options.extensions.startBlock.forEach((function(e){a=e.call({lexer:this},i),"number"==typeof a&&a>=0&&(t=Math.min(t,a))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(r)))a=t[t.length-1],o&&"paragraph"===a.type?(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):t.push(i),o=r.length!==e.length,e=e.substring(i.raw.length);else if(i=this.tokenizer.text(e))e=e.substring(i.raw.length),a=t[t.length-1],a&&"text"===a.type?(a.raw+="\n"+i.raw,a.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):t.push(i);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,a,r,o,s,n,l=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(l));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,o.index)+"["+Ai("a",o[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(l));)l=l.slice(0,o.index)+"["+Ai("a",o[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.escapedEmSt.exec(l));)l=l.slice(0,o.index+o[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(s||(n=""),s=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((a=>!!(i=a.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))))if(i=this.tokenizer.escape(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.tag(e))e=e.substring(i.raw.length),a=t[t.length-1],a&&"text"===i.type&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(i=this.tokenizer.link(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(i.raw.length),a=t[t.length-1],a&&"text"===i.type&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(i=this.tokenizer.emStrong(e,l,n))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.codespan(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.br(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.del(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.autolink(e,Ti))e=e.substring(i.raw.length),t.push(i);else if(this.state.inLink||!(i=this.tokenizer.url(e,Ti))){if(r=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const i=e.slice(1);let a;this.options.extensions.startInline.forEach((function(e){a=e.call({lexer:this},i),"number"==typeof a&&a>=0&&(t=Math.min(t,a))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(r,Di))e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(n=i.raw.slice(-1)),s=!0,a=t[t.length-1],a&&"text"===a.type?(a.raw+=i.raw,a.text+=i.text):t.push(i);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(i.raw.length),t.push(i);return t}}class Ri{constructor(e){this.options=e||si}code(e,t,i){const a=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,a);null!=t&&t!==e&&(i=!0,e=t)}return e=e.replace(/\n$/,"")+"\n",a?'<pre><code class="'+this.options.langPrefix+fi(a)+'">'+(i?e:fi(e,!0))+"</code></pre>\n":"<pre><code>"+(i?e:fi(e,!0))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e){return e}heading(e,t,i,a){if(this.options.headerIds){return`<h${t} id="${this.options.headerPrefix+a.slug(i)}">${e}</h${t}>\n`}return`<h${t}>${e}</h${t}>\n`}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,i){const a=t?"ol":"ul";return"<"+a+(t&&1!==i?' start="'+i+'"':"")+">\n"+e+"</"+a+">\n"}listitem(e){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>\n`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,i){if(null===(e=xi(this.options.sanitize,this.options.baseUrl,e)))return i;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+i+"</a>",a}image(e,t,i){if(null===(e=xi(this.options.sanitize,this.options.baseUrl,e)))return i;let a=`<img src="${e}" alt="${i}"`;return t&&(a+=` title="${t}"`),a+=this.options.xhtml?"/>":">",a}text(e){return e}}class Oi{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,i){return""+i}image(e,t,i){return""+i}br(){return""}}class Ni{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let i=e,a=0;if(this.seen.hasOwnProperty(i)){a=this.seen[e];do{a++,i=e+"-"+a}while(this.seen.hasOwnProperty(i))}return t||(this.seen[e]=a,this.seen[i]=0),i}slug(e,t={}){const i=this.serialize(e);return this.getNextSafeSlug(i,t.dryrun)}}class Mi{constructor(e){this.options=e||si,this.options.renderer=this.options.renderer||new Ri,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Oi,this.slugger=new Ni}static parse(e,t){return new Mi(t).parse(e)}static parseInline(e,t){return new Mi(t).parseInline(e)}parse(e,t=!0){let i,a,r,o,s,n,l,d,c,h,p,f,u,b,m,g,v,w,x,y="";const k=e.length;for(i=0;i<k;i++)if(h=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[h.type]&&(x=this.options.extensions.renderers[h.type].call({parser:this},h),!1!==x||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(h.type)))y+=x||"";else switch(h.type){case"space":continue;case"hr":y+=this.renderer.hr();continue;case"heading":y+=this.renderer.heading(this.parseInline(h.tokens),h.depth,bi(this.parseInline(h.tokens,this.textRenderer)),this.slugger);continue;case"code":y+=this.renderer.code(h.text,h.lang,h.escaped);continue;case"table":for(d="",l="",o=h.header.length,a=0;a<o;a++)l+=this.renderer.tablecell(this.parseInline(h.header[a].tokens),{header:!0,align:h.align[a]});for(d+=this.renderer.tablerow(l),c="",o=h.rows.length,a=0;a<o;a++){for(n=h.rows[a],l="",s=n.length,r=0;r<s;r++)l+=this.renderer.tablecell(this.parseInline(n[r].tokens),{header:!1,align:h.align[r]});c+=this.renderer.tablerow(l)}y+=this.renderer.table(d,c);continue;case"blockquote":c=this.parse(h.tokens),y+=this.renderer.blockquote(c);continue;case"list":for(p=h.ordered,f=h.start,u=h.loose,o=h.items.length,c="",a=0;a<o;a++)m=h.items[a],g=m.checked,v=m.task,b="",m.task&&(w=this.renderer.checkbox(g),u?m.tokens.length>0&&"paragraph"===m.tokens[0].type?(m.tokens[0].text=w+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&"text"===m.tokens[0].tokens[0].type&&(m.tokens[0].tokens[0].text=w+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:w}):b+=w),b+=this.parse(m.tokens,u),c+=this.renderer.listitem(b,v,g);y+=this.renderer.list(c,p,f);continue;case"html":y+=this.renderer.html(h.text);continue;case"paragraph":y+=this.renderer.paragraph(this.parseInline(h.tokens));continue;case"text":for(c=h.tokens?this.parseInline(h.tokens):h.text;i+1<k&&"text"===e[i+1].type;)h=e[++i],c+="\n"+(h.tokens?this.parseInline(h.tokens):h.text);y+=t?this.renderer.paragraph(c):c;continue;default:{const e='Token with "'+h.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return y}parseInline(e,t){t=t||this.renderer;let i,a,r,o="";const s=e.length;for(i=0;i<s;i++)if(a=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]&&(r=this.options.extensions.renderers[a.type].call({parser:this},a),!1!==r||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)))o+=r||"";else switch(a.type){case"escape":case"text":o+=t.text(a.text);break;case"html":o+=t.html(a.text);break;case"link":o+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break;case"image":o+=t.image(a.href,a.title,a.text);break;case"strong":o+=t.strong(this.parseInline(a.tokens,t));break;case"em":o+=t.em(this.parseInline(a.tokens,t));break;case"codespan":o+=t.codespan(a.text);break;case"br":o+=t.br();break;case"del":o+=t.del(this.parseInline(a.tokens,t));break;default:{const e='Token with "'+a.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return o}}class Bi{constructor(e){this.options=e||si}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(e){return e}postprocess(e){return e}}function ji(e,t){return(i,a,r)=>{"function"==typeof a&&(r=a,a=null);const o={...a},s=function(e,t,i){return a=>{if(a.message+="\nPlease report this to https://github.com/markedjs/marked.",e){const e="<p>An error occurred:</p><pre>"+fi(a.message+"",!0)+"</pre>";return t?Promise.resolve(e):i?void i(null,e):e}if(t)return Promise.reject(a);if(!i)throw a;i(a)}}((a={...Fi.defaults,...o}).silent,a.async,r);if(null==i)return s(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof i)return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(i)+", string expected"));if(function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}(a),a.hooks&&(a.hooks.options=a),r){const o=a.highlight;let n;try{a.hooks&&(i=a.hooks.preprocess(i)),n=e(i,a)}catch(e){return s(e)}const l=function(e){let i;if(!e)try{a.walkTokens&&Fi.walkTokens(n,a.walkTokens),i=t(n,a),a.hooks&&(i=a.hooks.postprocess(i))}catch(t){e=t}return a.highlight=o,e?s(e):r(null,i)};if(!o||o.length<3)return l();if(delete a.highlight,!n.length)return l();let d=0;return Fi.walkTokens(n,(function(e){"code"===e.type&&(d++,setTimeout((()=>{o(e.text,e.lang,(function(t,i){if(t)return l(t);null!=i&&i!==e.text&&(e.text=i,e.escaped=!0),d--,0===d&&l()}))}),0))})),void(0===d&&l())}if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(i):i).then((t=>e(t,a))).then((e=>a.walkTokens?Promise.all(Fi.walkTokens(e,a.walkTokens)).then((()=>e)):e)).then((e=>t(e,a))).then((e=>a.hooks?a.hooks.postprocess(e):e)).catch(s);try{a.hooks&&(i=a.hooks.preprocess(i));const r=e(i,a);a.walkTokens&&Fi.walkTokens(r,a.walkTokens);let o=t(r,a);return a.hooks&&(o=a.hooks.postprocess(o)),o}catch(e){return s(e)}}}function Fi(e,t,i){return ji(Ei.lex,Mi.parse)(e,t,i)}Fi.options=Fi.setOptions=function(e){var t;return Fi.defaults={...Fi.defaults,...e},t=Fi.defaults,si=t,Fi},Fi.getDefaults=oi,Fi.defaults=si,Fi.use=function(...e){const t=Fi.defaults.extensions||{renderers:{},childTokens:{}};e.forEach((e=>{const i={...e};if(i.async=Fi.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if(e.renderer){const i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let a=e.renderer.apply(this,t);return!1===a&&(a=i.apply(this,t)),a}:e.renderer}if(e.tokenizer){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");t[e.level]?t[e.level].unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}e.childTokens&&(t.childTokens[e.name]=e.childTokens)})),i.extensions=t),e.renderer){const t=Fi.defaults.renderer||new Ri;for(const i in e.renderer){const a=t[i];t[i]=(...r)=>{let o=e.renderer[i].apply(t,r);return!1===o&&(o=a.apply(t,r)),o}}i.renderer=t}if(e.tokenizer){const t=Fi.defaults.tokenizer||new Pi;for(const i in e.tokenizer){const a=t[i];t[i]=(...r)=>{let o=e.tokenizer[i].apply(t,r);return!1===o&&(o=a.apply(t,r)),o}}i.tokenizer=t}if(e.hooks){const t=Fi.defaults.hooks||new Bi;for(const i in e.hooks){const a=t[i];Bi.passThroughHooks.has(i)?t[i]=r=>{if(Fi.defaults.async)return Promise.resolve(e.hooks[i].call(t,r)).then((e=>a.call(t,e)));const o=e.hooks[i].call(t,r);return a.call(t,o)}:t[i]=(...r)=>{let o=e.hooks[i].apply(t,r);return!1===o&&(o=a.apply(t,r)),o}}i.hooks=t}if(e.walkTokens){const t=Fi.defaults.walkTokens;i.walkTokens=function(i){let a=[];return a.push(e.walkTokens.call(this,i)),t&&(a=a.concat(t.call(this,i))),a}}Fi.setOptions(i)}))},Fi.walkTokens=function(e,t){let i=[];for(const a of e)switch(i=i.concat(t.call(Fi,a)),a.type){case"table":for(const e of a.header)i=i.concat(Fi.walkTokens(e.tokens,t));for(const e of a.rows)for(const a of e)i=i.concat(Fi.walkTokens(a.tokens,t));break;case"list":i=i.concat(Fi.walkTokens(a.items,t));break;default:Fi.defaults.extensions&&Fi.defaults.extensions.childTokens&&Fi.defaults.extensions.childTokens[a.type]?Fi.defaults.extensions.childTokens[a.type].forEach((function(e){i=i.concat(Fi.walkTokens(a[e],t))})):a.tokens&&(i=i.concat(Fi.walkTokens(a.tokens,t)))}return i},Fi.parseInline=ji(Ei.lexInline,Mi.parseInline),Fi.Parser=Mi,Fi.parser=Mi.parse,Fi.Renderer=Ri,Fi.TextRenderer=Oi,Fi.Lexer=Ei,Fi.lexer=Ei.lex,Fi.Tokenizer=Pi,Fi.Slugger=Ni,Fi.Hooks=Bi,Fi.parse=Fi;Fi.options,Fi.setOptions,Fi.use,Fi.walkTokens,Fi.parseInline;class Hi extends le{constructor(){super(),this.collInfo=null,this.curatedPageMap={},this.currList=0,this.active=!1,this.lastST=0,this.clickTime=0,this.isSidebar=!1,this.splitDirection=!1}static get properties(){return{collInfo:{type:Object},active:{type:Boolean},curatedPageMap:{type:Object},currList:{type:Number},isSidebar:{type:Boolean},splitDirection:{type:Boolean}}}recalcSplitter(e){this.splitDirection=this.isSidebar||e<769?"vertical":"horizontal"}firstUpdated(){this.recalcSplitter(document.documentElement.clientWidth),this.obs=new ResizeObserver((e=>{this.recalcSplitter(e[0].contentRect.width)})),this.obs.observe(this)}updated(e){e.has("collInfo")&&this.doLoadCurated(),(e.has("collInfo")||e.has("isSidebar"))&&this.recalcSplitter(document.documentElement.clientWidth),e.has("splitDirection")&&this.configureSplitter(),e.has("currList")&&this.active&&this.sendChangeEvent({currList:this.currList})}configureSplitter(){const e=this.renderRoot.querySelector(".sidebar"),t=this.renderRoot.querySelector(".main-content");if(this.splitter){try{this.splitter.destroy()}catch(e){}this.splitter=null}if(e&&t&&!this.splitter){const i={sizes:[20,80],gutterSize:4,direction:this.splitDirection};this.splitter=ii([e,t],i)}}async doLoadCurated(){this.curatedPageMap={};const e={};for(const t of this.collInfo.pages)e[t.id]=t;for(const e of this.collInfo.curatedPages){this.curatedPageMap[e.list]||(this.curatedPageMap[e.list]=[]);const t=e,i=t.url,a=t.ts,r=t.title||t.url,o=e.desc;this.curatedPageMap[e.list].push({url:i,ts:a,title:r,desc:o})}this.scrollToList()}static get styles(){return ze(d`
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

      ${Hi.sidebarStyles(l(":host(.sidebar)"))}

      .desc p {
        margin-bottom: 1em;
      }

      .columns {
        width: 100%;
        height: 100%;
        justify-self: stretch;
        margin: 1em 0 0 0 !important;
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
        ${Hi.sidebarStyles()}
      }

      .gutter.gutter-vertical:hover {
        cursor: row-resize;
      }

      .gutter.gutter-horizontal:hover {
        cursor: col-resize;
      }
    `)}static sidebarStyles(e=d``){return d`
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
        font-size: 0.8rem;
      }
    `}render(){const e=this.currList;return F`
      <div
        class="is-sr-only"
        role="heading"
        aria-level="${this.isSidebar?"2":"1"}"
      >
        Story for ${this.collInfo.title}
      </div>
      <div class="columns">
        <div class="column sidebar is-one-fifth">
          <aside class="menu">
            <ul class="menu-list">
              <li>
                <a
                  href="#list-0"
                  data-list="0"
                  class="${0===e?"is-active":""} menu-label is-size-4"
                  @click=${this.onClickScroll}
                  >${this.collInfo.title}</a
                >
                <ul class="menu-list">
                  ${this.collInfo.lists.map((t=>F` <li>
                        <a
                          @click=${this.onClickScroll}
                          href="#list-${t.id}"
                          data-list="${t.id}"
                          class="${e===t.id?"is-active":""}"
                          >${t.title}</a
                        >
                      </li>`))}
                </ul>
              </li>
            </ul>
          </aside>
        </div>
        <div @scroll=${this.onScroll} class="column main-content main-scroll">
          <section id="list-0" class="desc">
            <h2 class="has-text-centered title is-3">${this.collInfo.title}</h2>
            ${this.collInfo.desc?be(Fi(this.collInfo.desc)):""}
          </section>
          ${this.renderLists()}
        </div>
      </div>
    `}renderLists(){return F` ${this.collInfo.lists.map((e=>F`
        <article id="list-${e.id}">
          <div class="content">
            <hr />
            <h3>${e.title}</h3>
            <p>${e.desc}</p>
            <ol>
              ${this.curatedPageMap[e.id]?this.curatedPageMap[e.id].map((e=>this.renderCPage(e))):F``}
            </ol>
          </div>
        </article>
      `))}`}renderCPage(e){const t=new Date(e.ts),i=ot(t.toISOString());return F` <li>
      <div class="content">
        <a
          @click="${this.onReplay}"
          data-url="${e.url}"
          data-ts="${i}"
          href="${st("story",e.url,i)}"
        >
          <p class="is-size-6 has-text-weight-bold has-text-link">${e.title}</p>
          <p class="has-text-dark">${e.url}</p>
        </a>
        <p>${t.toLocaleString()}</p>
        <p>${e.desc}</p>
      </div>
      <hr />
    </li>`}onReplay(e){e.preventDefault();const t={url:e.currentTarget.getAttribute("data-url"),ts:e.currentTarget.getAttribute("data-ts")};return this.sendChangeEvent(t),!1}sendChangeEvent(e){this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:e}}))}onClickScroll(e){return e.preventDefault(),this.currList=Number(e.currentTarget.getAttribute("data-list")),this.scrollToList(),!1}scrollToList(){this.currList>this.collInfo.lists.length&&(this.currList=0);const e={behavior:"smooth",block:"nearest",inline:"nearest"};this.clickTime=(new Date).getTime();const t=this.renderRoot.getElementById("list-"+this.currList);t&&t.scrollIntoView(e)}onScroll(e){const t=e.currentTarget,i=this.renderRoot.getElementById("list-"+this.currList);if(!i)return;let a=i;const r=t.offsetTop,o=t.scrollTop;if(o>this.lastST)for(;a.nextElementSibling&&a.nextElementSibling.getBoundingClientRect().top<r;)a=a.nextElementSibling;else for(;a.previousElementSibling&&a.previousElementSibling.getBoundingClientRect().bottom>=r;)a=a.previousElementSibling;if(this.lastST=o,a&&a!=i&&a.id.startsWith("list-")&&(this.currList=Number(a.id.slice(5))),(new Date).getTime()-this.clickTime<1e3)return;const s=this.renderRoot.querySelector(`a[data-list="${this.currList}"]`);if(s){const e={behavior:"smooth",block:"nearest",inline:"nearest"};s.scrollIntoView(e)}}}customElements.define("wr-coll-story",Hi);var Wi=i(4722),qi=i.n(Wi);customElements.define("wr-gdrive",class extends le{constructor(){super(),this.state="trypublic",this.sourceUrl="",this.scriptLoaded=!1,this.error=!1}static get properties(){return{state:{type:String},sourceUrl:{type:String},error:{type:Boolean},reauth:{type:Boolean}}}updated(e){e.has("sourceUrl")&&(this.error=!1,this.state="trypublic",this.tryPublicAccess().then((e=>{e||(this.state="tryauto",this.requestUpdate())})))}async tryPublicAccess(){try{const e=this.sourceUrl,t=e.slice("googledrive://".length),i=`${__HELPER_PROXY__}/g/${t}`;let a=null;try{a=await fetch(i)}catch(e){return!1}const r=await a.json();if(!r.url||!r.name||!r.size)return!1;if(r.size>15e6)return!1;const o=r.url;try{const e=new AbortController,t=e.signal;if(a=await fetch(o,{signal:t}),e.abort(),200!=a.status)return!1}catch(e){return!1}const s=r.name,n={publicUrl:o},l=Number(r.size);return this.dispatchEvent(new CustomEvent("load-ready",{detail:{name:s,extra:n,size:l,sourceUrl:e}})),!0}catch(e){return!1}}onLoad(){this.scriptLoaded=!0,this.gauth("none",(e=>{e.error?"implicitonly"!==this.state&&(this.state="trymanual"):this.authed(e)}))}onClickAuth(){this.gauth("select_account",(e=>{e.error||this.authed(e)}))}async authed(e){const t=this.sourceUrl,i=`https://www.googleapis.com/drive/v3/files/${t.slice("googledrive://".length)}`,a={Authorization:`Bearer ${e.access_token}`},r=await fetch(i+"?fields=name,size&supportsAllDrives=true",{headers:a});if(404===r.status||403==r.status)return"implicitonly"!==this.state&&(this.state="trymanual"),void(this.error=!0);this.error=!1;const o=await r.json(),s=o.name,n=Number(o.size);this.dispatchEvent(new CustomEvent("load-ready",{detail:{sourceUrl:t,headers:a,size:n,name:s}}))}static get styles(){return ze(d``)}render(){return F` ${this.script()}
    ${"trymanual"!==this.state?F` <p>Connecting to Google Drive...</p> `:F`
          ${this.error?F`
                <div class="error has-text-danger">
                  <p>
                    ${this.reauth?"Some resources are loaded on demand from Google Drive, which requires reauthorization.":"Could not access this file with the current Google Drive account."}
                  </p>
                  <p>
                    If you have multiple Google Drive accounts, be sure to
                    select the correct one.
                  </p>
                </div>
                <br />
              `:""}
          <button
            class="button is-warning is-rounded"
            @click="${this.onClickAuth}"
          >
            <span class="icon"
              ><fa-icon .svg="${qi()}"></fa-icon
            ></span>
            <span>Authorize Google Drive</span>
          </button>
        `}`}script(){if("trypublic"===this.state||this.scriptLoaded)return F``;const e=document.createElement("script");return e.onload=()=>this.onLoad(),e.src="https://apis.google.com/js/platform.js",e}gauth(e,t){self.gapi.load("auth2",(()=>{self.gapi.auth2.authorize({client_id:__GDRIVE_CLIENT_ID__,scope:"https://www.googleapis.com/auth/drive.file",response_type:"token",prompt:e},t)}))}});class Gi extends le{constructor(){super(),this.progress=0,this.total=0,this.percent=0,this.coll="",this.state="waiting",this.loadInfo=null,this.currentSize=0,this.totalSize=0,this.tryFileHandle=!!window.showOpenFilePicker,this.fileHandle=null,this.errorAllowRetry=!1,this.pingInterval=0,this.noWebWorker=!1}static get properties(){return{sourceUrl:{type:String},loadInfo:{type:Object},state:{type:String},progress:{type:Number},percent:{type:Number},currentSize:{type:Number},totalSize:{type:Number},error:{type:String},total:{type:Number},status:{type:String},coll:{type:String},embed:{type:String},tryFileHandle:{type:Boolean},errorAllowRetry:{type:Boolean},extraMsg:{type:String},swName:{type:String}}}firstUpdated(){this.initMessages()}initMessages(){if(this.noWebWorker=this.loadInfo&&this.loadInfo.noWebWorker,this.noWebWorker){if(!navigator.serviceWorker)return;this.worker=navigator.serviceWorker}else this.worker=new Worker(this.swName);this.worker.addEventListener("message",(e=>{switch(e.data.msg_type){case"collProgress":if(e.data.name===this.coll){if(this.percent=e.data.percent,e.data.error)if(this.error=e.data.error,this.state="errored",this.errorAllowRetry=!0,this.fileHandle=e.data.fileHandle,"missing_local_file"===this.error)this.tryFileHandle=!1;else if("permission_needed"===this.error&&e.data.fileHandle){this.state="permission_needed";break}e.data.currentSize&&e.data.totalSize&&(this.currentSize=e.data.currentSize,this.totalSize=e.data.totalSize),this.extraMsg=e.data.extraMsg}break;case"collAdded":e.data.name===this.coll&&(this.total||(this.total=100),this.progress=this.total,this.percent=100,this.dispatchEvent(new CustomEvent("coll-loaded",{detail:e.data})),this.noWebWorker?this.pingInterval&&clearInterval(this.pingInterval):this.worker.terminate(),this.worker=null)}}))}async doLoad(){let e,t,i=this.sourceUrl,a=null;if(this.percent=this.currentSize=this.totalSize=0,this.loadInfo&&this.loadInfo.swError)return this.state="errored",this.error=this.loadInfo.swError,void(this.errorAllowRetry=!1);try{const{scheme:e,host:t,path:r}=function(e){let t=e.indexOf("://"),i=0,a="",r="",o="";return t>=0?(a=e.slice(0,t),t+=3):(t++,e.startsWith("//")&&(t+=2)),i=e.indexOf("/",t),i>0?(r=e.slice(t,i),o=e.slice(i)):(r=e.slice(t),o=""),{scheme:a,host:r,path:o}}(i);switch(e){case"googledrive":this.state="googledrive",a=await this.googledriveInit();break;case"s3":a={sourceUrl:i,loadUrl:`https://${t}.s3.amazonaws.com${r}`,name:this.sourceUrl};break;case"file":if(!this.loadInfo&&!this.tryFileHandle)return this.state="errored",this.error="File URLs can not be entered directly or shared.\nYou can select a file to upload from the main page by clicking the 'Choose File...' button.",void(this.errorAllowRetry=!1);a=this.loadInfo;break;case"proxy":i="proxy:"+i.slice("proxy://".length)}}catch(e){console.log(e)}a||(a={sourceUrl:i}),this.state="started",this.loadInfo&&(a.newFullImport=this.loadInfo.newFullImport,a.loadEager=this.loadInfo.loadEager,a.noCache=this.loadInfo.noCache,this.loadInfo.extraConfig&&(t=this.loadInfo.extraConfig),i.startsWith("proxy:")&&t&&t.recording&&(e="recordingproxy"));const r={msg_type:"addColl",name:this.coll,extraConfig:t,type:e,skipExisting:!0,file:a};navigator.serviceWorker.controller||await new Promise((e=>{navigator.serviceWorker.addEventListener("controllerchange",(()=>e()))})),this.worker&&(this.noWebWorker?(navigator.serviceWorker.controller.postMessage(r),this.pingInterval=setInterval((()=>{navigator.serviceWorker.controller.postMessage({msg_type:"ping"})}),15e3)):this.worker.postMessage(r))}googledriveInit(){return this._gdWait=new Promise((e=>this._gdResolve=e)),this._gdWait}async onLoadReady(e){this._gdResolve&&this._gdResolve(e.detail)}onCancel(){if(!this.worker)return;const e={msg_type:"cancelLoad",name:this.coll};this.noWebWorker?navigator.serviceWorker&&navigator.serviceWorker.controller&&(navigator.serviceWorker.controller.postMessage(e),this.pingInterval&&clearInterval(this.pingInterval)):this.worker.postMessage(e)}updated(e){(this.sourceUrl&&e.has("sourceUrl")||e.has("tryFileHandle"))&&this.doLoad()}static get styles(){return ze(d`
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

      .extra-msg {
        font-size: 0.8rem;
      }
    `)}render(){return F`
      <section class="container">
        <div class="has-text-centered is-flex">
          <wr-anim-logo class="logo" size="96px"></wr-anim-logo>
        </div>
        ${this.embed?"":F` <div class="level">
              <p class="level-item">Loading&nbsp;<b>${this.sourceUrl}</b>...</p>
            </div>`}
        <div class="level">
          <div class="level-item has-text-centered">
            ${this.renderContent()}
          </div>
        </div>
      </section>
    `}renderContent(){switch(this.state){case"googledrive":return F`<wr-gdrive
          .sourceUrl=${this.sourceUrl}
          @load-ready=${this.onLoadReady}
        ></wr-gdrive>`;case"started":return F` <div class="progress-div">
          <progress
            id="progress"
            class="progress is-primary is-large"
            value="${this.percent}"
            max="100"
          ></progress>
          <label class="progress-label" for="progress">${this.percent}%</label>
          ${this.currentSize&&this.totalSize?F` <div class="loaded-prog">
                Loaded <b>${Ge()(this.currentSize)}</b> of
                <b>${Ge()(this.totalSize)}</b>
                ${this.extraMsg&&F` <p class="extra-msg">(${this.extraMsg})</p> `}
              </div>`:F``}
          ${this.embed?"":F` <button @click="${this.onCancel}" class="button is-danger">
                Cancel
              </button>`}
        </div>`;case"errored":return F` <div class="has-text-left">
          <div class="error has-text-danger">${this.error}</div>
          <div>
            ${this.errorAllowRetry?F` <a
                  class="button is-warning"
                  @click=${()=>window.parent.location.reload()}
                  >Try Again</a
                >`:""}
            ${this.embed?F``:F` <a href="/" class="button is-warning">Back</a>`}
          </div>
        </div>`;case"permission_needed":return F` <div class="has-text-left">
          <div class="">
            Permission is needed to reload the archive file. (Click
            <i>Cancel</i> to cancel loading this archive.)
          </div>
          <button @click="${this.onAskPermission}" class="button is-primary">
            Show Permission
          </button>
          <a href="/" class="button is-danger">Cancel</a>
        </div>`;default:return F`<progress
          class="progress is-primary is-large"
          style="max-width: 400px"
        ></progress>`}}async onAskPermission(){"granted"===await this.fileHandle.requestPermission({mode:"read"})&&this.doLoad()}}customElements.define("wr-loader",Gi);var Vi,Ki=i(5563),Zi=i.n(Ki);function Ji(e){return void 0===e||e}function Yi(e){const t=Array(e);for(let i=0;i<e;i++)t[i]=Qi();return t}function Qi(){return Object.create(null)}function Xi(e,t){return t.length-e.length}function ea(e){return"string"==typeof e}function ta(e){return"object"==typeof e}function ia(e){return"function"==typeof e}function aa(e,t){var i=ra;if(e&&(t&&(e=na(e,t)),this.H&&(e=na(e,this.H)),this.J&&1<e.length&&(e=na(e,this.J)),i||""===i)){if(t=e.split(i),this.filter){e=this.filter,i=t.length;const a=[];for(let r=0,o=0;r<i;r++){const i=t[r];i&&!e[i]&&(a[o++]=i)}e=a}else e=t;return e}return e}const ra=/[\p{Z}\p{S}\p{P}\p{C}]+/u,oa=/[\u0300-\u036f]/g;function sa(e,t){const i=Object.keys(e),a=i.length,r=[];let o="",s=0;for(let n,l,d=0;d<a;d++)n=i[d],(l=e[n])?(r[s++]=la(t?"(?!\\b)"+n+"(\\b|_)":n),r[s++]=l):o+=(o?"|":"")+n;return o&&(r[s++]=la(t?"(?!\\b)("+o+")(\\b|_)":"("+o+")"),r[s]=""),r}function na(e,t){for(let i=0,a=t.length;i<a&&(e=e.replace(t[i],t[i+1]),e);i+=2);return e}function la(e){return new RegExp(e,"g")}function da(e){let t="",i="";for(let a,r=0,o=e.length;r<o;r++)(a=e[r])!==i&&(t+=i=a);return t}var ca={encode:ha,F:!1,G:""};function ha(e){return aa.call(this,(""+e).toLowerCase(),!1)}const pa={},fa={};function ua(e){ba(e,"add"),ba(e,"append"),ba(e,"search"),ba(e,"update"),ba(e,"remove")}function ba(e,t){e[t+"Async"]=function(){const e=this,i=arguments;var a=i[i.length-1];let r;return ia(a)&&(r=a,delete i[i.length-1]),a=new Promise((function(a){setTimeout((function(){e.async=!0;const r=e[t].apply(e,i);e.async=!1,a(r)}))})),r?(a.then(r),this):a}}function ma(e,t,i,a){const r=e.length;let o,s,n=[],l=0;a&&(a=[]);for(let d=r-1;0<=d;d--){const c=e[d],h=c.length,p=Qi();let f=!o;for(let e=0;e<h;e++){const h=c[e],u=h.length;if(u)for(let e,c,b=0;b<u;b++)if(c=h[b],o){if(o[c]){if(!d)if(i)i--;else if(n[l++]=c,l===t)return n;(d||a)&&(p[c]=1),f=!0}if(a&&(e=(s[c]||0)+1,s[c]=e,e<r)){const t=a[e-2]||(a[e-2]=[]);t[t.length]=c}}else p[c]=1}if(a)o||(s=p);else if(!f)return[];o=p}if(a)for(let e,r,s=a.length-1;0<=s;s--){e=a[s],r=e.length;for(let a,s=0;s<r;s++)if(a=e[s],!o[a]){if(i)i--;else if(n[l++]=a,l===t)return n;o[a]=1}}return n}function ga(e,t){const i=Qi(),a=Qi(),r=[];for(let t=0;t<e.length;t++)i[e[t]]=1;for(let e,o=0;o<t.length;o++){e=t[o];for(let t,o=0;o<e.length;o++)t=e[o],i[t]&&!a[t]&&(a[t]=1,r[r.length]=t)}return r}function va(e){this.l=!0!==e&&e,this.cache=Qi(),this.h=[]}function wa(e,t,i){ta(e)&&(e=e.query);let a=this.cache.get(e);return a||(a=this.search(e,t,i),this.cache.set(e,a)),a}va.prototype.set=function(e,t){if(!this.cache[e]){var i=this.h.length;for(i===this.l?delete this.cache[this.h[i-1]]:i++,--i;0<i;i--)this.h[i]=this.h[i-1];this.h[0]=e}this.cache[e]=t},va.prototype.get=function(e){const t=this.cache[e];if(this.l&&t&&(e=this.h.indexOf(e))){const t=this.h[e-1];this.h[e-1]=this.h[e],this.h[e]=t}return t};const xa={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},default:{}};function ya(e,t,i,a,r,o,s,n){setTimeout((function(){const l=e(i?i+"."+a:a,JSON.stringify(s));l&&l.then?l.then((function(){t.export(e,t,i,r,o+1,n)})):t.export(e,t,i,r,o+1,n)}))}function ka(e,t){if(!(this instanceof ka))return new ka(e);var i;if(e){ea(e)?e=xa[e]:(i=e.preset)&&(e=Object.assign({},i[i],e)),i=e.charset;var a=e.lang;ea(i)&&(-1===i.indexOf(":")&&(i+=":default"),i=fa[i]),ea(a)&&(a=pa[a])}else e={};let r,o,s=e.context||{};if(this.encode=e.encode||i&&i.encode||ha,this.register=t||Qi(),this.D=r=e.resolution||9,this.G=t=i&&i.G||e.tokenize||"strict",this.depth="strict"===t&&s.depth,this.l=Ji(s.bidirectional),this.s=o=Ji(e.optimize),this.m=Ji(e.fastupdate),this.B=e.minlength||1,this.C=e.boost,this.map=o?Yi(r):Qi(),this.A=r=s.resolution||1,this.h=o?Yi(r):Qi(),this.F=i&&i.F||e.rtl,this.H=(t=e.matcher||a&&a.H)&&sa(t,!1),this.J=(t=e.stemmer||a&&a.J)&&sa(t,!0),i=t=e.filter||a&&a.filter){i=t,a=Qi();for(let e=0,t=i.length;e<t;e++)a[i[e]]=1;i=a}this.filter=i,this.cache=(t=e.cache)&&new va(t)}function $a(e,t,i,a,r){return i&&1<e?t+(a||0)<=e?i+(r||0):(e-1)/(t+(a||0))*(i+(r||0))+1|0:0}function Sa(e,t,i,a,r,o,s){let n=s?e.h:e.map;(!t[i]||s&&!t[i][s])&&(e.s&&(n=n[a]),s?((t=t[i]||(t[i]=Qi()))[s]=1,n=n[s]||(n[s]=Qi())):t[i]=1,n=n[i]||(n[i]=[]),e.s||(n=n[a]||(n[a]=[])),o&&n.includes(r)||(n[n.length]=r,e.m&&((e=e.register[r]||(e.register[r]=[]))[e.length]=n)))}function za(e,t,i,a,r,o,s,n){let l=[],d=n?e.h:e.map;if(e.s||(d=Ia(d,s,n,e.l)),d){let i=0;const c=Math.min(d.length,n?e.A:e.D);for(let t,h,p=0,f=0;p<c&&!((t=d[p])&&(e.s&&(t=Ia(t,s,n,e.l)),r&&t&&o&&(h=t.length,h<=r?(r-=h,t=null):(t=t.slice(r),r=0)),t&&(l[i++]=t,o&&(f+=t.length,f>=a))));p++);if(i)return o?Ca(l,a,0):void(t[t.length]=l)}return!i&&l}function Ca(e,t,i){return e=1===e.length?e[0]:[].concat.apply([],e),i||e.length>t?e.slice(i,i+t):e}function Ia(e,t,i,a){return i?e=(e=e[(a=a&&t>i)?t:i])&&e[a?i:t]:e=e[t],e}function Aa(e,t,i,a,r){let o=0;if(e.constructor===Array)if(r)-1!==(t=e.indexOf(t))?1<e.length&&(e.splice(t,1),o++):o++;else{r=Math.min(e.length,i);for(let s,n=0;n<r;n++)(s=e[n])&&(o=Aa(s,t,i,a,r),a||o||delete e[n])}else for(let s in e)(o=Aa(e[s],t,i,a,r))||delete e[s];return o}function Ua(e){e=e.data;var t=self._index;const i=e.args;var a=e.task;if("init"===a)a=e.options||{},e=e.factory,t=a.encode,a.cache=!1,t&&0===t.indexOf("function")&&(a.encode=Function("return "+t)()),e?(Function("return "+e)()(self),self._index=new self.FlexSearch.Index(a),delete self.FlexSearch):self._index=new ka(a);else e=e.id,t=t[a].apply(t,i),postMessage("search"===a?{id:e,msg:t}:{id:e})}(Vi=ka.prototype).append=function(e,t){return this.add(e,t,!0)},Vi.add=function(e,t,i,a){if(t&&(e||0===e)){if(!a&&!i&&this.register[e])return this.update(e,t);if(a=(t=this.encode(t)).length){const d=Qi(),c=Qi(),h=this.depth,p=this.D;for(let f=0;f<a;f++){let u=t[this.F?a-1-f:f];var r=u.length;if(u&&r>=this.B&&(h||!c[u])){var o=$a(p,a,f),s="";switch(this.G){case"full":if(2<r){for(o=0;o<r;o++)for(var n=r;n>o;n--)if(n-o>=this.B){var l=$a(p,a,f,r,o);s=u.substring(o,n),Sa(this,c,s,l,e,i)}break}case"reverse":if(1<r){for(n=r-1;0<n;n--)s=u[n]+s,s.length>=this.B&&Sa(this,c,s,$a(p,a,f,r,n),e,i);s=""}case"forward":if(1<r){for(n=0;n<r;n++)s+=u[n],s.length>=this.B&&Sa(this,c,s,o,e,i);break}default:if(this.C&&(o=Math.min(o/this.C(t,u,f)|0,p-1)),Sa(this,c,u,o,e,i),h&&1<a&&f<a-1)for(r=Qi(),s=this.A,o=u,n=Math.min(h+1,a-f),r[o]=1,l=1;l<n;l++)if((u=t[this.F?a-1-f-l:f+l])&&u.length>=this.B&&!r[u]){r[u]=1;const t=this.l&&u>o;Sa(this,d,t?o:u,$a(s+(a/2>s?0:1),a,f,n-1,l-1),e,i,t?u:o)}}}}this.m||(this.register[e]=1)}}return this},Vi.search=function(e,t,i){i||(!t&&ta(e)?e=(i=e).query:ta(t)&&(i=t));let a,r,o,s,n,l=[],d=0;if(i){e=i.query||e,t=i.limit,d=i.offset||0;var c=i.context;r=i.suggest}if(e&&(a=(e=this.encode(""+e)).length,1<a)){i=Qi();var h=[];for(let t,o=0,s=0;o<a;o++)if((t=e[o])&&t.length>=this.B&&!i[t]){if(!(this.s||r||this.map[t]))return l;h[s++]=t,i[t]=1}a=(e=h).length}if(!a)return l;for(t||(t=100),i=0,(c=this.depth&&1<a&&!1!==c)?(o=e[0],i=1):1<a&&e.sort(Xi);i<a;i++){if(n=e[i],c?(s=za(this,l,r,t,d,2===a,n,o),r&&!1===s&&l.length||(o=n)):s=za(this,l,r,t,d,1===a,n),s)return s;if(r&&i===a-1){if(!(h=l.length)){if(c){c=0,i=-1;continue}return l}if(1===h)return Ca(l[0],t,d)}}return ma(l,t,d,r)},Vi.contain=function(e){return!!this.register[e]},Vi.update=function(e,t){return this.remove(e).add(e,t)},Vi.remove=function(e,t){const i=this.register[e];if(i){if(this.m)for(let t,a=0;a<i.length;a++)t=i[a],t.splice(t.indexOf(e),1);else Aa(this.map,e,this.D,this.s),this.depth&&Aa(this.h,e,this.A,this.s);if(t||delete this.register[e],this.cache){t=this.cache;for(let i,a,r=0;r<t.h.length;r++)a=t.h[r],i=t.cache[a],i.includes(e)&&(t.h.splice(r--,1),delete t.cache[a])}}return this},Vi.searchCache=wa,Vi.export=function(e,t,i,a,r,o){let s,n,l=!0;switch(void 0===o&&(l=new Promise((e=>{o=e}))),r||(r=0)){case 0:if(s="reg",this.m){n=Qi();for(let e in this.register)n[e]=1}else n=this.register;break;case 1:s="cfg",n={doc:0,opt:this.s?1:0};break;case 2:s="map",n=this.map;break;case 3:s="ctx",n=this.h;break;default:return void(void 0===i&&o&&o())}return ya(e,t||this,i,s,a,r,n,o),l},Vi.import=function(e,t){if(t)switch(ea(t)&&(t=JSON.parse(t)),e){case"cfg":this.s=!!t.opt;break;case"reg":this.m=!1,this.register=t;break;case"map":this.map=t;break;case"ctx":this.h=t}},ua(ka.prototype);let Pa=0;function _a(e){if(!(this instanceof _a))return new _a(e);var t;e?ia(t=e.encode)&&(e.encode=t.toString()):e={},(t=(self||window)._factory)&&(t=t.toString());const a="undefined"==typeof window&&self.exports,r=this;this.o=function(e,t,a){let r;try{r=t?new(i(7809).Worker)("//node/node.js"):e?new Worker(URL.createObjectURL(new Blob(["onmessage="+Ua.toString()],{type:"text/javascript"}))):new Worker(ea(a)?a:"worker/worker.js",{type:"module"})}catch(e){}return r}(t,a,e.worker),this.h=Qi(),this.o&&(a?this.o.on("message",(function(e){r.h[e.id](e.msg),delete r.h[e.id]})):this.o.onmessage=function(e){e=e.data,r.h[e.id](e.msg),delete r.h[e.id]},this.o.postMessage({task:"init",factory:t,options:e}))}function La(e){_a.prototype[e]=_a.prototype[e+"Async"]=function(){const t=this,i=[].slice.call(arguments);var a=i[i.length-1];let r;return ia(a)&&(r=a,i.splice(i.length-1,1)),a=new Promise((function(a){setTimeout((function(){t.h[++Pa]=a,t.o.postMessage({task:e,id:Pa,args:i})}))})),r?(a.then(r),this):a}}function Da(e){if(!(this instanceof Da))return new Da(e);var t,i=e.document||e.doc||e;this.K=[],this.h=[],this.A=[],this.register=Qi(),this.key=(t=i.key||i.id)&&Ta(t,this.A)||"id",this.m=Ji(e.fastupdate),this.C=(t=i.store)&&!0!==t&&[],this.store=t&&Qi(),this.I=(t=i.tag)&&Ta(t,this.A),this.l=t&&Qi(),this.cache=(t=e.cache)&&new va(t),e.cache=!1,this.o=e.worker,this.async=!1,t=Qi();let a=i.index||i.field||i;ea(a)&&(a=[a]);for(let i,r,o=0;o<a.length;o++)i=a[o],ea(i)||(r=i,i=i.field),r=ta(r)?Object.assign({},e,r):e,this.o&&(t[i]=new _a(r),t[i].o||(this.o=!1)),this.o||(t[i]=new ka(r,this.register)),this.K[o]=Ta(i,this.A),this.h[o]=i;if(this.C)for(ea(e=i.store)&&(e=[e]),i=0;i<e.length;i++)this.C[i]=Ta(e[i],this.A);this.index=t}function Ta(e,t){const i=e.split(":");let a=0;for(let r=0;r<i.length;r++)e=i[r],0<=e.indexOf("[]")&&(e=e.substring(0,e.length-2))&&(t[a]=!0),e&&(i[a++]=e);return a<i.length&&(i.length=a),1<a?i:i[0]}function Ea(e,t){if(ea(t))e=e[t];else for(let i=0;e&&i<t.length;i++)e=e[t[i]];return e}function Ra(e,t,i,a,r){if(e=e[r],a===i.length-1)t[r]=e;else if(e)if(e.constructor===Array)for(t=t[r]=Array(e.length),r=0;r<e.length;r++)Ra(e,t,i,a,r);else t=t[r]||(t[r]=Qi()),r=i[++a],Ra(e,t,i,a,r)}function Oa(e,t,i,a,r,o,s,n){if(e=e[s])if(a===t.length-1){if(e.constructor===Array){if(i[a]){for(t=0;t<e.length;t++)r.add(o,e[t],!0,!0);return}e=e.join(" ")}r.add(o,e,n,!0)}else if(e.constructor===Array)for(s=0;s<e.length;s++)Oa(e,t,i,a,r,o,s,n);else s=t[++a],Oa(e,t,i,a,r,o,s,n)}function Na(e,t,i,a){let r=this.l[e],o=r&&r.length-i;if(o&&0<o)return(o>t||i)&&(r=r.slice(i,i+t)),a&&(r=Ma.call(this,r)),{tag:e,result:r}}function Ma(e){const t=Array(e.length);for(let i,a=0;a<e.length;a++)i=e[a],t[a]={id:i,doc:this.store[i]};return t}La("add"),La("append"),La("search"),La("update"),La("remove"),(Vi=Da.prototype).add=function(e,t,i){if(ta(e)&&(e=Ea(t=e,this.key)),t&&(e||0===e)){if(!i&&this.register[e])return this.update(e,t);for(let a,r,o=0;o<this.h.length;o++)r=this.h[o],a=this.K[o],ea(a)&&(a=[a]),Oa(t,a,this.A,0,this.index[r],e,a[0],i);if(this.I){let a=Ea(t,this.I),r=Qi();ea(a)&&(a=[a]);for(let t,o,s=0;s<a.length;s++)if(t=a[s],!r[t]&&(r[t]=1,o=this.l[t]||(this.l[t]=[]),!i||!o.includes(e))&&(o[o.length]=e,this.m)){const t=this.register[e]||(this.register[e]=[]);t[t.length]=o}}if(this.store&&(!i||!this.store[e])){let i;if(this.C){i=Qi();for(let e,a=0;a<this.C.length;a++)e=this.C[a],ea(e)?i[e]=t[e]:Ra(t,i,e,0,e[0])}this.store[e]=i||t}}return this},Vi.append=function(e,t){return this.add(e,t,!0)},Vi.update=function(e,t){return this.remove(e).add(e,t)},Vi.remove=function(e){if(ta(e)&&(e=Ea(e,this.key)),this.register[e]){for(var t=0;t<this.h.length&&(this.index[this.h[t]].remove(e,!this.o),!this.m);t++);if(this.I&&!this.m)for(let i in this.l){t=this.l[i];const a=t.indexOf(e);-1!==a&&(1<t.length?t.splice(a,1):delete this.l[i])}this.store&&delete this.store[e],delete this.register[e]}return this},Vi.search=function(e,t,i,a){i||(!t&&ta(e)?(i=e,e=""):ta(t)&&(i=t,t=0));let r,o,s,n,l,d,c=[],h=[],p=0;if(i)if(i.constructor===Array)s=i,i=null;else{if(e=i.query||e,s=(r=i.pluck)||i.index||i.field,n=i.tag,o=this.store&&i.enrich,l="and"===i.bool,t=i.limit||t||100,d=i.offset||0,n&&(ea(n)&&(n=[n]),!e)){for(let e,i=0;i<n.length;i++)(e=Na.call(this,n[i],t,d,o))&&(c[c.length]=e,p++);return p?c:[]}ea(s)&&(s=[s])}s||(s=this.h),l=l&&(1<s.length||n&&1<n.length);const f=!a&&(this.o||this.async)&&[];for(let r,u,b,m=0;m<s.length;m++){let g;if(u=s[m],ea(u)||(g=u,u=g.field,e=g.query||e,t=g.limit||t,o=g.enrich||o),f)f[m]=this.index[u].searchAsync(e,t,g||i);else{if(r=a?a[m]:this.index[u].search(e,t,g||i),b=r&&r.length,n&&b){const e=[];let i=0;l&&(e[0]=[r]);for(let t,a,r=0;r<n.length;r++)t=n[r],(b=(a=this.l[t])&&a.length)&&(i++,e[e.length]=l?[a]:a);i&&(r=l?ma(e,t||100,d||0):ga(r,e),b=r.length)}if(b)h[p]=u,c[p++]=r;else if(l)return[]}}if(f){const a=this;return new Promise((function(r){Promise.all(f).then((function(o){r(a.search(e,t,i,o))}))}))}if(!p)return[];if(r&&(!o||!this.store))return c[0];for(let e,t=0;t<h.length;t++){if(e=c[t],e.length&&o&&(e=Ma.call(this,e)),r)return e;c[t]={field:h[t],result:e}}return c},Vi.contain=function(e){return!!this.register[e]},Vi.get=function(e){return this.store[e]},Vi.set=function(e,t){return this.store[e]=t,this},Vi.searchCache=wa,Vi.export=function(e,t,i,a,r,o){let s;if(void 0===o&&(s=new Promise((e=>{o=e}))),r||(r=0),a||(a=0),a<this.h.length){const i=this.h[a],s=this.index[i];t=this,setTimeout((function(){s.export(e,t,r?i:"",a,r++,o)||(a++,r=1,t.export(e,t,i,a,r,o))}))}else{let t,s;switch(r){case 1:t="tag",s=this.l,i=null;break;case 2:t="store",s=this.store,i=null;break;default:return void o()}ya(e,this,i,t,a,r,s,o)}return s},Vi.import=function(e,t){if(t)switch(ea(t)&&(t=JSON.parse(t)),e){case"tag":this.l=t;break;case"reg":this.m=!1,this.register=t;for(let e,i=0;i<this.h.length;i++)e=this.index[this.h[i]],e.register=t,e.m=!1;break;case"store":this.store=t;break;default:const i=(e=e.split("."))[0];e=e[1],i&&e&&this.index[i].import(e,t)}},ua(Da.prototype);var Ba={encode:Fa,F:!1,G:""};const ja=[la("[àáâãäå]"),"a",la("[èéêë]"),"e",la("[ìíîï]"),"i",la("[òóôõöő]"),"o",la("[ùúûüű]"),"u",la("[ýŷÿ]"),"y",la("ñ"),"n",la("[çc]"),"k",la("ß"),"s",la(" & ")," and "];function Fa(e){var t=e=""+e;return t.normalize&&(t=t.normalize("NFD").replace(oa,"")),aa.call(this,t.toLowerCase(),!e.normalize&&ja)}var Ha={encode:Ga,F:!1,G:"strict"};const Wa=/[^a-z0-9]+/,qa={b:"p",v:"f",w:"f",z:"s",x:"s",ß:"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Ga(e){const t=[];if(e=Fa.call(this,e).join(" ")){const i=e.split(Wa),a=i.length;for(let r,o=0,s=0;o<a;o++)if((e=i[o])&&(!this.filter||!this.filter[e])){r=e[0];let i=qa[r]||r,a=i;for(let t=1;t<e.length;t++){r=e[t];const o=qa[r]||r;o&&o!==a&&(i+=o,a=o)}t[s++]=i}}return t}var Va={encode:Za,F:!1,G:""};const Ka=[la("ae"),"a",la("oe"),"o",la("sh"),"s",la("th"),"t",la("ph"),"f",la("pf"),"f",la("(?![aeo])h(?![aeo])"),"",la("(?!^[aeo])h(?!^[aeo])"),""];function Za(e,t){return e&&(2<(e=Ga.call(this,e).join(" ")).length&&(e=na(e,Ka)),t||(1<e.length&&(e=da(e)),e&&(e=e.split(" ")))),e||[]}var Ja={encode:function(e){return e&&(1<(e=Za.call(this,e,!0)).length&&(e=e.replace(Ya,"")),1<e.length&&(e=da(e)),e&&(e=e.split(" "))),e||[]},F:!1,G:""};const Ya=la("(?!\\b)[aeo]");fa["latin:default"]=ca,fa["latin:simple"]=Ba,fa["latin:balance"]=Ha,fa["latin:advanced"]=Va,fa["latin:extra"]=Ja;var Qa=i(5729),Xa=i.n(Qa),er=i(5555),tr=i.n(er);class ir extends le{constructor(){super(),this.filteredPages=[],this.sortedPages=[],this.query="",this.flex=null,this.textPages=null,this.newQuery=null,this.loading=!1,this.updatingSearch=!1,this.showAllPages=!1,this.hasExtraPages=!1,this.currList=0,this.active=!1,this.editable=!1,this.changeNeeded=!1,this.selectedPages=new Set,this.menuActive=!1,this.sortKey="date",this.sortDesc=!0,this.isSidebar=!1,this.url="",this.ts="",this.editing=!1,this.toDeletePages=null,this.toDeletePage=null}static get sortKeys(){return[{key:"",name:"Best Match"},{key:"title",name:"Title"},{key:"date",name:"Date"}]}static get properties(){return{active:{type:Boolean},collInfo:{type:Object},currList:{type:Number},filteredPages:{type:Array},sortedPages:{type:Array},showAllPages:{type:Boolean},query:{type:String},defaultKey:{type:String},loading:{type:Boolean},updatingSearch:{type:Boolean},editable:{type:Boolean},selectedPages:{type:Set},allSelected:{type:Boolean},menuActive:{type:Boolean},sortKey:{type:String},sortDesc:{type:Boolean},isSidebar:{type:Boolean},url:{type:String},ts:{type:String},editing:{type:Boolean},toDeletePages:{type:Object},toDeletePage:{type:Object}}}_timedUpdate(){null!==this.newQuery&&(this.query=this.newQuery,this.newQuery=null,this.filter())}async updated(e){if(e.has("collInfo")?this.updateTextSearch():(e.has("query")||e.has("currList")||e.has("showAllPages"))&&this.filter(),e.has("active")&&this.active&&this.changeNeeded&&this.filter(),e.has("query")){this.query?(this.sortKey="",this.sortDesc=!1):(this.sortKey="date",this.sortDesc=!0);const e=this.renderRoot.querySelector("wr-sorter");e&&(e.sortKey=this.sortKey,e.sortDesc=this.sortDesc)}if(e.has("sortedPages")&&this.isSidebar){const e=this.renderRoot.querySelector(".current");if(e){const t={behavior:"smooth",block:"nearest",inline:"nearest"};setTimeout((()=>e.scrollIntoView(t)),100)}}}onChangeQuery(e){this.newQuery=e.currentTarget.value,this._ival&&window.clearTimeout(this._ival),this._ival=window.setTimeout((()=>this._timedUpdate()),250)}async filter(){if(this.loading)return;if(this.active||(this.changeNeeded=!0),this.loading=!0,this.flex&&this.query&&this.textPages){const e=await this.flex.searchAsync(this.query,25);this.filteredPages=e.map((e=>this.textPages[e]))}else this.showAllPages&&this.hasExtraPages?this.filteredPages=[...this.textPages]:this.filteredPages=[...this.collInfo.pages];0!==this.currList&&await this.filterCurated();for(const e of this.filteredPages){const{timestamp:t,date:i}=rt(e);e.timestamp=t,e.date=i}this.loading=!1,this.changeNeeded=!1;const e={query:this.query,currList:this.currList};this.sendChangeEvent(e)}async filterCurated(){const e=await fetch(`${this.collInfo.apiPrefix}/curated/${this.currList}`),t=(await e.json()).curated;this.filteredPages=t}sendChangeEvent(e){this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:e}}))}addPages(t){const i=new e.Index;return this.flex=i,this.textPages=t,this.hasExtraPages=this.textPages&&this.collInfo&&this.collInfo.pages&&this.textPages.length>this.collInfo.pages.length,Promise.all(t.map(((e,t)=>{let a=e.url;return e.title&&(a+=" "+e.title),e.text&&(a+=" "+e.text),i.addAsync(t,a)})))}async updateTextSearch(){if(this.updatingSearch)return;this.updatingSearch=!0;let e=0;try{const t=await caches.open("cache:"+this.collInfo.coll),i=`${this.collInfo.apiPrefix}/textIndex`;let a=await t.match(i);a&&Number(a.headers.get("Content-Length"))||(a=await fetch(i),200===a.status&&Number(a.headers.get("Content-Length"))&&t.put(i,a.clone()));const r=[];for await(const t of Zi()(a.body.getReader()))t.url&&(t.id=++e,r.push(t));await this.addPages(r)}catch(e){console.warn(e)}finally{0===e&&await this.addPages(this.collInfo.pages),this.updatingSearch=!1}await this.filter()}static get styles(){return ze(d`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        min-width: 0px;
        flex-direction: column;
        box-sizing: border-box !important;
      }

      div[role="main"],
      #contents div[role="complementary"] {
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
        margin-bottom: 1rem;
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
        margin-top: 1rem;
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
        ${ir.sidebarStyles()}
      }

      ${ir.sidebarStyles(l`:host(.sidebar)`)}

      .mobile-lists {
        display: block !important;
      }

      :host(.sidebar) .columns.is-hidden-mobile,
      :host(.sidebar) .is-hidden-mobile {
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

        padding-bottom: 1em;
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
        opacity: 0.65;
      }

      .page-header {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        width: 100%;
        min-height: fit-content;

        margin-bottom: 1em;
        border-bottom: 3px solid rgb(237, 237, 237);
      }

      .check-select {
        padding: 0 1em 0 0.5em;
      }

      .search-bar {
        width: auto;
        display: flex;
        flex-direction: column;
      }

      .flex-auto {
        flex: auto;
      }

      .index-bar-description {
        margin-bottom: 20px;
        font-style: italic;
      }
    `)}static sidebarStyles(e=d``){return d`
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
        margin-left: 1rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
        min-height: 24px;
        width: 100%;
      }

      ${e} .menu {
        font-size: 0.8rem;
      }
    `}onSelectList(e){e.preventDefault(),this.currList=Number(e.currentTarget.getAttribute("data-list"))}onSelectListDrop(e){e.preventDefault(),this.currList=Number(e.currentTarget.value)}render(){const e=this.currList;return F`
      <div
        class="is-sr-only"
        role="heading"
        aria-level="${this.isSidebar?"2":"1"}"
      >
        Pages in ${this.collInfo.title}
      </div>
      <div class="search-bar notification is-marginless">
        ${this.isSidebar?F`<h3 class="is-sr-only">Search and Filter Pages</h3>`:""}
        <div class="field flex-auto">
          <div
            class="control has-icons-left ${this.loading?"is-loading":""}"
          >
            <input
              class="input"
              @input="${this.onChangeQuery}"
              .value="${this.query}"
              type="text"
              placeholder="Search by Page URL, Title or Text"
            />
            <span class="icon is-left"
              ><fa-icon .svg="${et()}" aria-hidden="true"></fa-icon
            ></span>
          </div>
        </div>
      </div>
      <div class="main columns">
        <div
          class="column index-bar is-one-fifth ${this.isSidebar?"is-hidden-mobile":""}"
        >
          ${this.editable&&this.editing?F`
                <form @submit="${this.onUpdateTitle}">
                  <input
                    id="titleEdit"
                    class="input"
                    value="${this.collInfo.title}"
                    @blur="${this.onUpdateTitle}"
                  />
                </form>
              `:F` <div
                  class="index-bar-title"
                  @dblclick="${()=>this.editing=!0}"
                >
                  ${this.collInfo.name||this.collInfo.title}
                </div>
                ${this.collInfo.description?F`<div
                      class="index-bar-description"
                      @dblclick="${()=>this.editing=!0}"
                    >
                      ${this.collInfo.description}
                    </div>`:F``}`}
          ${this.editable?F`<fa-icon class="editIcon" .svg="${tr()}"></fa-icon>`:F``}
          ${this.hasExtraPages?F` <span class="check-select">
                <label class="checkbox">
                  <input
                    @change=${e=>this.showAllPages=e.currentTarget.checked}
                    type="checkbox"
                    .checked="${this.showAllPages}"
                  />
                  Show Non-Seed Pages
                </label>
              </span>`:""}

          <span
            class="num-results is-hidden-mobile"
            aria-live="polite"
            aria-atomic="true"
            >${this.formatResults()}</span
          >
          ${this.editable?F` <div class="index-bar-actions">
                ${this.renderDownloadMenu()}
              </div>`:""}
          ${this.collInfo.lists.length?F`
                <p id="filter-label" class="menu-label">Filter By List:</p>
                <div class="index-bar-menu menu">
                  <ul class="menu-list">
                    <li>
                      <a
                        href="#list-0"
                        data-list="0"
                        class="${0===e?"is-active":""}"
                        @click=${this.onSelectList}
                        ><i>All Pages</i></a
                      >
                    </li>
                    ${this.collInfo.lists.map((t=>F` <li>
                          <a
                            @click=${this.onSelectList}
                            href="#list-${t.id}"
                            data-list="${t.id}"
                            class="${e===t.id?"is-active":""}"
                            >${t.title}</a
                          >
                        </li>`))}
                  </ul>
                </div>
              `:""}
        </div>
        <div class="column main-content">
          <div
            class="is-sr-only"
            role="heading"
            aria-level="${this.isSidebar?"3":"2"}"
          >
            Page List
          </div>
          ${this.renderPages()}
        </div>
      </div>
      ${this.renderDeleteModal()}
    `}renderDownloadMenu(){return F` <div class="dropdown ${this.menuActive?"is-active":""}">
      <div class="dropdown-trigger">
        <button
          @click="${this.onMenu}"
          class="button is-small"
          aria-haspopup="true"
          aria-expanded="${this.menuActive}"
          aria-controls="dropdown-menu"
        >
          <span>Download</span>
          <span class="icon is-small">
            <fa-icon .svg="${Xa()}" aria-hidden="true"></fa-icon>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu">
        <div class="dropdown-content">
          <a
            role="button"
            href="#"
            @click="${e=>this.onDownload(e,"wacz")}"
            @keyup="${Ae}"
            class="dropdown-item"
          >
            Download ${0===this.selectedPages.size?"All":"Selected"} as
            WACZ (Web Archive Collection Zip)
          </a>
          <a
            role="button"
            href="#"
            @click="${e=>this.onDownload(e,"warc")}"
            @keyup="${Ae}"
            class="dropdown-item"
          >
            Download ${0===this.selectedPages.size?"All":"Selected"} as
            WARC 1.1 Only
          </a>
          <a
            role="button"
            href="#"
            @click="${e=>this.onDownload(e,"warc1.0")}"
            @keyup="${Ae}"
            class="dropdown-item"
          >
            Download ${0===this.selectedPages.size?"All":"Selected"} as
            WARC 1.0 Only
          </a>
        </div>
      </div>
    </div>`}renderPageHeader(){return F`
      ${!this.isSidebar&&this.editable&&this.filteredPages.length?F` <div class="check-select">
            <label class="checkbox">
              <input
                @change=${this.onSelectAll}
                type="checkbox"
                .checked="${this.allSelected}"
              />
            </label>
          </div>`:F``}

      <div class="header columns is-hidden-mobile">
        ${this.query?F` <a
              role="button"
              href="#"
              @click="${this.onSort}"
              @keyup="${Ae}"
              data-key=""
              class="column is-1 ${""===this.sortKey?this.sortDesc?"desc":"asc":""}"
              >Match</a
            >`:""}

        <a
          role="button"
          href="#"
          @click="${this.onSort}"
          @keyup="${Ae}"
          data-key="date"
          class="column is-2 ${"date"===this.sortKey?this.sortDesc?"desc":"asc":""}"
          >Date</a
        >
        <a
          role="button"
          href="#"
          @click="${this.onSort}"
          @keyup="${Ae}"
          data-key="title"
          class="column is-6 pagetitle ${"title"===this.sortKey?this.sortDesc?"desc":"asc":""}"
          >Page Title</a
        >
      </div>

      <div class="is-hidden-tablet mobile-header">
        <div class="num-results" aria-live="polite" aria-atomic="true">
          ${this.formatResults()}
        </div>
        <wr-sorter
          id="pages"
          .sortKey="${this.sortKey}"
          .sortDesc="${this.sortDesc}"
          .sortKeys="${ir.sortKeys}"
          .data="${this.filteredPages}"
          pageResults="100"
          @sort-changed="${this.onSortChanged}"
          class="${this.filteredPages.length?"":"is-hidden"}"
        >
        </wr-sorter>
      </div>
    `}renderDeleteModal(){return this.toDeletePages?F` <wr-modal
      bgClass="has-background-grey-lighter"
      @modal-closed="${()=>this.toDeletePages=this.toDeletePage=null}"
      title="Confirm Delete"
    >
      ${this.toDeletePage?F` <p>
            Are you sure you want to delete the page
            <b>${this.toDeletePage.title}</b>? (Size:
            <b>${Ge()(this.toDeletePage.size)}</b>)
          </p>`:F`
            <p>
              Are you sure you want to delete the
              <b>${this.toDeletePages.size}</b> selected pages?
            </p>
          `}
      <p>This operation can not be undone.</p>

      <button @click="${this.onDeletePages}" class="button is-danger">
        Delete
      </button>
      <button
        @click="${()=>this.toDeletePages=this.toDeletePage=null}"
        class="button"
      >
        Cancel
      </button>
    </wr-modal>`:F``}isCurrPage(e){if(this.isSidebar&&e.url===this.url){let t=e.timestamp;return!t&&e.date?t=ot(e.date):"string"==typeof e.ts&&(t=ot(e.ts)),t===this.ts}return!1}renderPages(){return F`
      <div class="page-header has-text-weight-bold">
        ${this.renderPageHeader()}
      </div>
      <ul class="scroller" @scroll="${this.onScroll}">
        ${this.sortedPages.length?F` ${this.sortedPages.map(((e,t)=>{const i=this.selectedPages.has(e.id);return F` <li class="page-entry ${i?"selected":""}">
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
              </li>`}))}`:F`<p class="mobile-header">${this.getNoResultsMessage()}</p>`}
      </ul>
    `}onUpdateTitle(e){if(e.preventDefault(),this.editing=!1,!this.editable)return;const t=this.renderRoot.querySelector("#titleEdit");if(!t||!t.value.trim())return;const i=t.value,a=JSON.stringify({title:i});fetch(`${this.collInfo.apiPrefix}/metadata`,{method:"POST",body:a}).then((e=>{200===e.status&&this.dispatchEvent(new CustomEvent("coll-update",{detail:{title:i}}))}))}onMenu(e){e.stopPropagation(),this.menuActive=!this.menuActive,this.menuActive&&document.addEventListener("click",(()=>{this.menuActive=!1}),{once:!0})}onSort(e){e.preventDefault();const t=e.currentTarget.getAttribute("data-key")||"";t===this.sortKey?this.sortDesc=!this.sortDesc:(this.sortDesc=!1,this.sortKey=t)}onSortChanged(e){this.sortedPages=e.detail.sortedData,this.sortKey=e.detail.sortKey,this.sortDesc=e.detail.sortDesc}onSelectToggle(e){const{page:t,selected:i}=e.detail;i?this.selectedPages.add(t):this.selectedPages.delete(t),this.allSelected=this.selectedPages.size===this.sortedPages.length,this.requestUpdate()}onSelectAll(e){this.allSelected=e.currentTarget.checked,this.allSelected?this.sortedPages.forEach((e=>{this.selectedPages.add(e.id)})):this.selectedPages.clear(),this.requestUpdate()}async onDownload(e,t){e.preventDefault();const i=this.selectedPages.size>0,a=new URLSearchParams;a.set("pages",i?Array.from(this.selectedPages.keys()).join(","):"all"),a.set("format",t),this.collInfo.filename&&a.set("filename",this.collInfo.filename),window.location.href=`${this.collInfo.apiPrefix}/dl?`+a.toString()}onDeleteConfirm(e){const t=e.currentTarget.page;this.selectedPages.has(t.id)?(this.toDeletePages=this.selectedPages,this.toDeletePage=null):(this.toDeletePages=[t.id],this.toDeletePage=t)}async onDeletePages(){const e={};for(const t of this.toDeletePages){const i=this.renderRoot.querySelector(`wr-page-entry[pid="${t}"]`);i&&(i.deleting=!0,e[t]=i)}for(const t of this.toDeletePages){const i=await fetch(`${this.collInfo.apiPrefix}/page/${t}`,{method:"DELETE"}),a=await i.json();if(a.error){console.warn(a.error);continue}const r=e[t];if(!r)continue;const o=this.collInfo.pages.indexOf(r);o<0||this.collInfo.pages.splice(o,1)}this.toDeletePages=null,this.toDeletePage=null,this.updateTextSearch(),this.requestUpdate()}formatResults(){if(!this.query){const e=this.filteredPages.length;return e===this.sortedPages.length?`${e} Page${1!==e?"s":""}`:`${this.sortedPages.length} of ${e} Pages Shown`}return 1===this.sortedPages.length?"1 Page":`${this.sortedPages.length} Pages`}getNoResultsMessage(){return this.collInfo&&this.collInfo.pages.length?this.updatingSearch?"Initializing Search...":this.loading?"Searching...":this.query?F`<span class="fix-text-wrapping"
        >No matching pages found. Try changing the search query, or
        <a href="#view=resources">browse by URL</a>.</span
      >`:"No Pages Found":F`<span class="fix-text-wrapping"
        >No Pages are defined in this archive. The archive may be empty.
        <a href="#view=resources">Try browsing by URL</a>.</span
      >`}onScroll(e){const t=e.currentTarget;if(t.scrollHeight-t.scrollTop-t.clientHeight<40){const e=this.renderRoot.querySelector("wr-sorter");e&&e.getMore()}}}customElements.define("wr-page-view",ir);const ar=new RegExp(`[${["-","[","]","/","{","}","(",")","*","+","?",".","\\","^","$","|"].join("\\")}]`,"g"),rr=e=>e.replace(ar,"\\$&");class or extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["keywords","delimiter"]}get keywords(){var e;return null!==(e=this.getAttribute("keywords"))&&void 0!==e?e:""}set keywords(e){this.setAttribute("keywords",e)}get delimiter(){var e;return null!==(e=this.getAttribute("delimiter"))&&void 0!==e?e:""}set delimiter(e){this.setAttribute("delimiter",e)}attributeChangedCallback(e,t,i){"keywords"!==e&&"delimiter"!==e||i!==t&&this._render()}connectedCallback(){this._render(),this.__observer=new MutationObserver((()=>{this._render()})),this.__observer.observe(this,{childList:!0,characterData:!0,subtree:!0})}disconnectedCallback(){this.__observer&&(this.__observer.disconnect(),this.__observer=void 0)}_render(){if(!this.shadowRoot)return;const e=this.textContent||"",t=this.getAttribute("keywords"),i=this.getAttribute("delimiter")||/\s+/;if(!t)return void(this.shadowRoot.textContent=e);const a=e.toLowerCase(),r=t.toLowerCase().split(i).sort(((e,t)=>t.length-e.length)),o=new RegExp(`${r.map(rr).join("|")}`,"gi"),s=e.split(o),n=document.createElement("div");let l=0;for(const t of s)if(n.appendChild(document.createTextNode(t)),l+=t.length,l<a.length){const t=a.substring(l),i=r.find((e=>t.startsWith(e)));if(i){const t=document.createElement("mark");t.textContent=e.substr(l,i.length),n.appendChild(t),l+=i.length}}this.shadowRoot.innerHTML=`\n      <style>\n        mark {\n          color: var(--keyword-mark-color);\n          background: var(--keyword-mark-background, yellow);\n        }\n      </style>\n      ${n.innerHTML}\n    `}}customElements.define("keyword-mark",or);class sr extends le{constructor(){super(),this.query="",this.textSnippet="",this.page=null,this.replayPrefix="",this.deleting=!1,this.editable=!1,this.iconValid=!1,this.index=0,this.isCurrent=!1,this.isSidebar=!1}static get properties(){return{query:{type:String},textSnippet:{type:String},page:{type:Object},replayPrefix:{type:String},deleting:{type:Boolean},selected:{type:Boolean},editable:{type:Boolean},iconValid:{type:Boolean},index:{type:Number},isCurrent:{type:Boolean},isSidebar:{type:Boolean}}}static get styles(){return ze(d`
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
        padding: 0 1em 0 0.5em;
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
        ${sr.sidebarStyles()}
      }

      ${sr.sidebarStyles(l`:host(.sidebar)`)}

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
    `)}static sidebarStyles(e=d``){return d`
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
    `}updated(e){(e.has("page")||e.has("query"))&&(this.updateSnippet(),this.iconValid=!!this.page.favIconUrl,this.deleting=!1)}render(){const e=this.page,t=this.page.date,i="number"==typeof e.size,a=this.editable&&!this.isSidebar;return F`
      ${a?F` <div class="check-select">
            <label class="checkbox">
              <input
                @change=${this.onSendSelToggle}
                type="checkbox"
                .checked="${this.selected}"
              />
            </label>
          </div>`:""}

      <div class="columns">
        ${this.index?F`
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
                ${this.iconValid?F` <img
                      class="favicon"
                      @error="${()=>this.iconValid=!1}"
                      src="${this.replayPrefix}/${this.page.timestamp}id_/${e.favIconUrl}"
                    />`:F` <span class="favicon"></span>`}
              </p>
            </figure>
            <div class="media-content ${this.isCurrent?"current":""}">
              <div role="heading" aria-level="${this.isSidebar?"4":"3"}">
                <a
                  @dblclick="${this.onReload}"
                  @click="${this.onReplay}"
                  href="${st("pages",this.page.url,this.page.timestamp)}"
                >
                  <p class="is-size-6 has-text-weight-bold has-text-link text">
                    <keyword-mark keywords="${this.query}"
                      >${e.title||e.url}</keyword-mark
                    >
                  </p>
                  <p class="has-text-dark text">
                    <keyword-mark keywords="${this.query}"
                      >${e.url}</keyword-mark
                    >
                  </p>
                  <p class="has-text-grey-dark text is-inline-date">
                    ${t?t.toLocaleString():""}
                  </p>
                </a>
                ${this.textSnippet?F` <div class="text">
                      <keyword-mark keywords="${this.query}"
                        >${this.textSnippet}</keyword-mark
                      >
                    </div>`:F``}
              </div>
              ${i?F` <div class="media-right" style="margin-right: 2em">
                    ${Ge()(e.size)}
                  </div>`:""}
            </div>
          </div>
        </div>

        ${a?F` ${this.deleting?F`
                  <button
                    class="button is-loading delete-button is-static"
                  ></button>
                `:F` <button
                  @click="${this.onSendDeletePage}"
                  class="delete delete-button"
                ></button>`}`:""}
      </div>
    `}async updateFavIcon(){if(!this.page.favIconUrl)return void(this.favIconData=null);const e=await fetch(`${this.replayPrefix}/${this.page.timestamp}id_/${this.page.favIconUrl}`);if(200!=e.status)return void(this.favIconData=null);const t=await e.arrayBuffer(),i=e.headers.get("content-type");try{this.favIconData=`data:${i};base64,${btoa(String.fromCharCode.apply(null,t))}`}catch(e){console.log(e),this.favIconData=null}}updateSnippet(){const e=this.textSnippet;if(!this.query||!this.page.text)return this.textSnippet=null,void this.requestUpdate("textSnippet",e);let t=this.page.text,i=this.query,a=t.indexOf(this.query);if(a<0){let r=t.toLowerCase(),o=i.toLowerCase();if(a=r.indexOf(o),a<0)return this.textSnippet=null,void this.requestUpdate("textSnippet",e);t=r,i=o}let r=a;a=Math.max(a-100,0),r=Math.min(r+200,t.length),0===a&&r===t.length?this.textSnippet=t:this.textSnippet="..."+t.slice(a,r)+"...",this.requestUpdate("textSnippet",e)}onReplay(e,t=!1){e.preventDefault();const i={url:this.page.url,ts:this.page.timestamp};return this.sendChangeEvent(i,t),!1}onReload(e){return this.onReplay(e,!0)}sendChangeEvent(e,t){this.dispatchEvent(new CustomEvent("coll-tab-nav",{bubbles:!0,composed:!0,detail:{data:e,reload:t}}))}onSendDeletePage(){const e=this.page;this.dispatchEvent(new CustomEvent("delete-page",{detail:{page:e}}))}onSendSelToggle(e){const t=this.page.id,i=e.currentTarget.checked;this.dispatchEvent(new CustomEvent("sel-page",{detail:{page:t,selected:i}}))}}customElements.define("wr-page-entry",sr);customElements.define("wr-coll-replay",class extends le{constructor(){super(),this.replayUrl="",this.replayTS="",this.actualTS="",this.url="",this.ts="",this.title="",this.collInfo=null,this.showAuth=!1,this.reauthWait=null,this.authFileHandle=null}static get properties(){return{collInfo:{type:Object},sourceUrl:{type:String},url:{type:String},ts:{type:String},replayUrl:{type:String},replayTS:{type:String},actualTS:{type:String},title:{type:String},iframeUrl:{type:String},showAuth:{type:Boolean},authFileHandle:{type:Object}}}firstUpdated(){window.addEventListener("message",(e=>this.onReplayMessage(e))),navigator.serviceWorker.addEventListener("message",(e=>this.handleAuthMessage(e)))}async handleAuthMessage(e){if("authneeded"===e.data.type&&this.collInfo&&e.data.coll===this.collInfo.coll){if(e.data.fileHandle){this.authFileHandle=e.data.fileHandle;try{if("granted"===await this.authFileHandle.requestPermission({mode:"read"}))return this.showAuth=!1,this.reauthWait=null,void this.refresh()}catch(e){console.warn(e)}}else this.authFileHandle=null;this.reauthWait?await this.reauthWait:this.showAuth=!0}}doSetIframeUrl(){this.iframeUrl=this.url?`${this.collInfo.replayPrefix}/${this.ts||""}mp_/${this.url}`:""}updated(e){if((e.has("sourceUrl")||e.has("collInfo"))&&(this.reauthWait=null),!this.url||this.replayUrl==this.url&&this.replayTS==this.ts||!e.has("url")&&!e.has("ts")||(this.replayUrl=this.url,this.replayTS=this.ts,this.showAuth=!1,this.reauthWait=null,this.doSetIframeUrl()),this.iframeUrl&&e.has("iframeUrl")){this.waitForLoad();const e={title:"Archived Page",replayTitle:!1};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}if(this.replayUrl&&e.has("replayUrl")||this.replayTS&&e.has("replayTS")){const e={url:this.replayUrl,ts:this.replayTS};this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{replaceLoc:!0,data:e}}))}if(this.title&&(e.has("title")||e.has("actualTS"))){const e={title:this.title,url:this.replayUrl,ts:this.actualTS,replayTitle:!0};this.dispatchEvent(new CustomEvent("update-title",{bubbles:!0,composed:!0,detail:e}))}}setDisablePointer(e){const t=this.renderRoot.querySelector("iframe");t&&(t.style.pointerEvents=e?"none":"all")}onReplayMessage(e){const t=this.renderRoot.querySelector("iframe");if(t&&e.source===t.contentWindow)if("load"===e.data.wb_type||"replace-url"===e.data.wb_type){if(this.replayTS=e.data.is_live?"":e.data.ts,this.actualTS=e.data.ts,this.replayUrl=e.data.url,this.title=e.data.title||this.title,this.clearLoading(t.contentWindow),e.data.icons){const t=e.data.icons;this.dispatchEvent(new CustomEvent("replay-favicons",{bubbles:!0,composed:!0,detail:{icons:t}}))}}else"title"===e.data.wb_type&&(this.title=e.data.title)}onReAuthed(e){this.reauthWait=(async()=>{if(this.authFileHandle){if("granted"!==await this.authFileHandle.requestPermission({mode:"read"}))return void(this.reauthWait=null);this.authFileHandle=null}else{const t=e.detail.headers;await fetch(`${this.collInfo.apiPrefix}/updateAuth`,{method:"POST",body:JSON.stringify({headers:t})})}this.showAuth&&(this.showAuth=!1,this.reauthWait=null),this.refresh()})()}waitForLoad(){this.setLoading(),this._loadPoll=window.setInterval((()=>{const e=this.renderRoot.querySelector("iframe");e&&e.contentDocument&&e.contentWindow&&("complete"!==e.contentDocument.readyState||e.contentWindow._WBWombat)||this.clearLoading(e&&e.contentWindow)}),5e3)}clearLoading(e){this.dispatchEvent(new CustomEvent("replay-loading",{detail:{loading:!1}})),this._loadPoll&&(window.clearInterval(this._loadPoll),this._loadPoll=null),e&&e.addEventListener("beforeunload",(()=>{this.setLoading()}))}setLoading(){this.dispatchEvent(new CustomEvent("replay-loading",{detail:{loading:!0}}))}refresh(){const e=this.renderRoot.querySelector("iframe");if(!e)return;const t=this.iframeUrl;this.doSetIframeUrl(),t!==this.iframeUrl&&this.url!==this.replayUrl||(this.waitForLoad(),e.contentWindow.location.reload())}static get styles(){return ze(d`
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
        font-size: 1em;
        display: inline-block;
      }

      .iframe-main.modal-bg {
        z-index: 200;
        background-color: rgba(10, 10, 10, 0.7);
      }

      #wrlogo {
        vertical-align: middle;
      }

      .intro-panel .panel-block {
        padding: 1em;
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
    `)}render(){const e=`Replay of ${this.title?`${this.title}:`:""} ${this.url}`;return F` <h1 id="replay-heading" class="is-sr-only">${e}</h1>

      ${this.iframeUrl?F`
            <div class="iframe-container">
              <iframe
                class="iframe-main"
                name="___wb_replay_top_frame"
                @message="${this.onReplayMessage}"
                allow="autoplay 'self'; fullscreen"
                allowfullscreen
                src="${this.iframeUrl}"
                title="${e}"
              ></iframe>

              ${this.showAuth?F`
                    <div class="iframe-main modal-bg">
                      <div class="panel intro-panel">
                        <p class="panel-heading">
                          <fa-icon
                            id="wrlogo"
                            size="1.5rem"
                            .svg=${ke()}
                            aria-hidden="true"
                          ></fa-icon>
                          Authorization Needed
                        </p>
                        <div class="panel-block">
                          ${this.authFileHandle?F`
                                <p>
                                  This archive is loaded from a local file:
                                  <b>${this.authFileHandle.name}</b>
                                </p>
                                <p>
                                  The browser needs to confirm your permission
                                  to continue loading from this file.
                                </p>
                                <button
                                  class="button is-warning is-rounded"
                                  @click="${this.onReAuthed}"
                                >
                                  Show Confirmation
                                </button>
                              `:F` <wr-gdrive
                                .sourceUrl="${this.sourceUrl}"
                                .state="trymanual"
                                .reauth="${!0}"
                                @load-ready="${this.onReAuthed}"
                              ></wr-gdrive>`}
                        </div>
                      </div>
                    </div>
                  `:""}
            </div>
          `:F` <div class="panel intro-panel">
            <p class="panel-heading">Replay Web Page</p>
            <div class="panel-block">
              <p>Enter a URL above to replay it from the web archive!</p>
              <p>
                (Or, check out <a href="#view=pages">Pages</a> or
                <a href="#view=resources">URLs</a> to explore the contents of
                this archive.)
              </p>
            </div>
          </div>`}`}});var nr=i(8360),lr=i.n(nr),dr=i(5403),cr=i.n(dr);customElements.define("wr-sorter",class extends le{constructor(){super(),this.sortedData=[],this.data=[],this.pageResults=0,this.numResults=0,this.sortKey=null,this.sortDesc=null}static get properties(){return{id:{type:String},pageResults:{type:Number},data:{type:Array},sortedData:{type:Array},sortKey:{type:String},sortDesc:{type:Boolean}}}firstUpdated(){if(this.id){const e=localStorage.getItem(`${this.id}:sortKey`);null!==e&&(this.sortKey=e);const t=localStorage.getItem(`${this.id}:sortDesc`);null!==t&&(this.sortDesc="1"===t)}}updated(e){const t=e.has("sortKey"),i=e.has("sortDesc"),a=e.has("data");t&&null!==this.sortKey&&localStorage.setItem(`${this.id}:sortKey`,this.sortKey),i&&null!==this.sortDesc&&localStorage.setItem(`${this.id}:sortDesc`,this.sortDesc?"1":"0"),(t||i||a)&&this.sortData()}sortData(){this.sortedData=[...this.data],this.numResults=this.pageResults,""===this.sortKey?this.sortDesc&&this.sortedData.reverse():this.sortedData.sort(((e,t)=>e[this.sortKey]===t[this.sortKey]?0:this.sortDesc==e[this.sortKey]<t[this.sortKey]?1:-1)),this.sendSortChanged()}sendSortChanged(){const e={sortKey:this.sortKey,sortDesc:this.sortDesc,sortedData:this.numResults?this.sortedData.slice(0,this.numResults):this.sortedData};this.dispatchEvent(new CustomEvent("sort-changed",{detail:e}))}getMore(e=100){this.pageResults&&this.numResults>=this.sortedData.length||(this.numResults+=e,this.sendSortChanged())}static get styles(){return ze(d`
      :host {
        min-width: 100px;
        box-sizing: border-box !important;
      }
      button.button.is-small {
        border-radius: 4px;
      }
    `)}render(){return F`
    <div class="select is-small">
      <select id="sort-select" @change=${e=>this.sortKey=e.currentTarget.value}>
      ${this.sortKeys.map((e=>F`
          <option value="${e.key}" ?selected="${e.key===this.sortKey}">
            Sort By: ${e.name}
          </option>
        `))}
      </select>
    </div>
    <button @click=${()=>this.sortDesc=!this.sortDesc} class="button is-small">
      <span>Order:</span>
      <span class="is-sr-only">${this.sortDesc?"Ascending":"Descending"}</span>
      <span class="icon"><fa-icon aria-hidden="true" .svg=${this.sortDesc?cr():lr()}></span>
    </button>`}});class hr extends le{static get filters(){return[{name:"HTML",filter:"text/html,text/xhtml"},{name:"Images",filter:"image/"},{name:"Audio/Video",filter:"audio/,video/"},{name:"PDF",filter:"application/pdf"},{name:"Javascript",filter:"application/javascript,application/x-javascript"},{name:"CSS",filter:"text/css"},{name:"Fonts",filter:"font/,application/font-woff"},{name:"Plain Text",filter:"text/plain"},{name:"JSON",filter:"application/json"},{name:"DASH/HLS",filter:"application/dash+xml,application/x-mpegURL,application/vnd.apple.mpegurl"},{name:"All URLs",filter:""}]}static get sortKeys(){return[{key:"url",name:"URL"},{key:"ts",name:"Date"},{key:"mime",name:"Mime Type"},{key:"status",name:"Status"}]}constructor(){super(),this.collInfo=null,this.isSidebar=!1,this.currMime="",this.query="",this.urlSearchType="",this.filteredResults=[],this.sortedResults=[],this.results=[],this.newQuery=null,this.tryMore=!1,this.loading=!1,this.sortKey="url",this.sortDesc=!1}static get properties(){return{collInfo:{type:Object},isSidebar:{type:Boolean},currMime:{type:String},query:{type:String},urlSearchType:{type:String},filteredResults:{type:Array},sortedResults:{type:Array},loading:{type:Boolean},sortKey:{type:String},sortDesc:{type:Boolean}}}firstUpdated(){""===this.urlSearchType&&(this.urlSearchType="prefix")}_timedUpdate(){null!==this.newQuery&&(this.query=this.newQuery,this.newQuery=null)}updated(e){if(e.has("query")||e.has("urlSearchType")||e.has("currMime")){this.doLoadResources();const t={query:this.query,urlSearchType:this.urlSearchType,currMime:this.currMime},i=!e.has("currMime")&&!e.has("urlSearchType");this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{replaceLoc:i,data:t}}))}(e.has("sortKey")||e.has("sortDesc"))&&this.filter()}async doLoadResources(e=!1){if(e&&(!this.tryMore||!this.results.length))return;if(this.loading)return;this.loading=!0;let t="contains"!==this.urlSearchType?this.query:"";const i=t&&"prefix"===this.urlSearchType?1:0;t&&!t.startsWith("http")&&(t="https://"+t);const a=this.currMime,r=new URLSearchParams({mime:a,url:t,prefix:i,count:100});if(e){const e=this.results[this.results.length-1];r.set("fromMime",e.mime),r.set("fromUrl",e.url),r.set("fromStatus",e.status),r.set("fromTs",new Date(e.date).getTime())}let o=await fetch(`${this.collInfo.apiPrefix}/urls?${r.toString()}`);o=await o.json(),this.results=e?this.results.concat(o.urls):o.urls,this.tryMore=o.urls.length>=100,this.filter(),this.loading=!1}onChangeTypeSearch(e){this.currMime=e.currentTarget.value}onChangeQuery(e){this.newQuery=e.currentTarget.value,this._ival&&window.clearTimeout(this._ival),this._ival=window.setTimeout((()=>this._timedUpdate()),250)}onClickUrlType(e){this.urlSearchType=e.currentTarget.value}filter(){const e=[],t="contains"===this.urlSearchType?this.query:"";for(const i of this.results)(!t||i.url.indexOf(t)>=0)&&e.push(i);this.filteredResults=e}onScroll(e){const t=e.currentTarget,i=t.scrollHeight-t.scrollTop-t.clientHeight;this.tryMore&&i<40&&this.doLoadResources(!0)}static get styles(){return ze(d`
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

      :host(.sidebar) .level,
      :host(.sidebar) .level-left,
      :host(.sidebar) .level-right {
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
    `)}render(){return F`
      <div
        role="heading"
        aria-level="${this.isSidebar?"2":"1"}"
        class="is-sr-only"
      >
        URLs in ${this.collInfo.title}
      </div>

      <div
        role="heading"
        aria-level="${this.isSidebar?"3":"2"}"
        class="is-sr-only"
      >
        Search and Filter
      </div>
      <div class="notification level is-marginless">
        <div class="level-left flex-auto">
          <div class="level-item flex-auto">
            <span class="is-hidden-mobile">Search:&nbsp;&nbsp;</span>
            <div class="select">
              <select @change="${this.onChangeTypeSearch}">
                ${hr.filters.map((e=>F`
                    <option
                      value="${e.filter}"
                      ?selected="${e.filter===this.currMime}"
                    >
                      ${e.name}
                    </option>
                  `))}
              </select>
            </div>
            <div class="field flex-auto">
              <div
                class="control has-icons-left ${this.loading?"is-loading":""}"
              >
                <input
                  type="text"
                  class="input"
                  @input="${this.onChangeQuery}"
                  .value="${this.query}"
                  placeholder="Enter URL to Search"
                />
                <span class="icon is-left"
                  ><fa-icon .svg="${et()}"></fa-icon
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="control level-right">
          <div style="margin-left: 1em" class="control">
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="contains"
                ?checked="${"contains"===this.urlSearchType}"
                @click="${this.onClickUrlType}"
              />&nbsp;Contains</label
            >
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="prefix"
                ?checked="${"prefix"===this.urlSearchType}"
                @click="${this.onClickUrlType}"
              />&nbsp;Prefix</label
            >
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="exact"
                ?checked="${"exact"===this.urlSearchType}"
                @click="${this.onClickUrlType}"
              />&nbsp;Exact</label
            >
            <span
              id="num-results"
              class="num-results"
              is-pulled-right
              aria-live="polite"
              aria-atomic="true"
              >${this.filteredResults.length} Result(s)</span
            >
          </div>
        </div>
      </div>

      <div class="sort-header is-hidden-tablet">
        <wr-sorter
          id="urls"
          .sortKey="${this.sortKey}"
          .sortDesc="${this.sortDesc}"
          .sortKeys="${hr.sortKeys}"
          .data="${this.filteredResults}"
          @sort-changed="${this.onSortChanged}"
        >
        </wr-sorter>
      </div>

      <div
        role="heading"
        aria-level="${this.isSidebar?"3":"2"}"
        id="results-heading"
        class="is-sr-only"
      >
        Results
      </div>

      <table class="all-results" aria-labelledby="results-heading num-results">
        <thead>
          <tr class="columns results-head has-text-weight-bold">
            <th scope="col" class="column col-url is-6 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${Ae}"
                data-key="url"
                class="${"url"===this.sortKey?this.sortDesc?"desc":"asc":""}"
                >URL</a
              >
            </th>
            <th scope="col" class="column col-ts is-2 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${Ae}"
                data-key="ts"
                class="${"ts"===this.sortKey?this.sortDesc?"desc":"asc":""}"
                >Date</a
              >
            </th>
            <th scope="col" class="column col-mime is-3 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${Ae}"
                data-key="mime"
                class="${"mime"===this.sortKey?this.sortDesc?"desc":"asc":""}"
                >Mime Type</a
              >
            </th>
            <th scope="col" class="column col-status is-1 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${Ae}"
                data-key="status"
                class="${"status"===this.sortKey?this.sortDesc?"desc":"asc":""}"
                >Status</a
              >
            </th>
          </tr>
        </thead>

        <tbody class="main-scroll" @scroll="${this.onScroll}">
          ${this.sortedResults.length?this.sortedResults.map((e=>F`
                  <tr class="columns result">
                    <td class="column col-url is-6">
                      <p class="minihead is-hidden-tablet">URL</p>
                      <a
                        @click="${this.onReplay}"
                        data-url="${e.url}"
                        data-ts="${e.ts}"
                        href="${st("resources",e.url,e.ts)}"
                      >
                        <keyword-mark keywords="${this.query}"
                          >${e.url}</keyword-mark
                        >
                      </a>
                    </td>
                    <td class="column col-ts is-2">
                      <p class="minihead is-hidden-tablet">Date</p>
                      ${new Date(e.date).toLocaleString()}
                    </td>
                    <td class="column col-mime is-3">
                      <p class="minihead is-hidden-tablet">Mime Type</p>
                      ${e.mime}
                    </td>
                    <td class="column col-status is-1">
                      <p class="minihead is-hidden-tablet">Status</p>
                      ${e.status}
                    </td>
                  </tr>
                `)):F`<tr class="section">
                <td colspan="4"><i>No Results Found.</i></td>
              </tr>`}
        </tbody>
      </table>
    `}onSort(e){e.preventDefault();const t=e.currentTarget.getAttribute("data-key");t===this.sortKey?this.sortDesc=!this.sortDesc:(this.sortDesc=!1,this.sortKey=t)}onSortChanged(e){this.sortedResults=e.detail.sortedData,this.sortKey=e.detail.sortKey,this.sortDesc=e.detail.sortDesc}onReplay(e){e.preventDefault();const t={url:e.currentTarget.getAttribute("data-url"),ts:e.currentTarget.getAttribute("data-ts")};return this.dispatchEvent(new CustomEvent("coll-tab-nav",{detail:{data:t}})),!1}}customElements.define("wr-coll-resources",hr);var pr=document.currentScript&&document.currentScript.src,fr="";class ur extends le{constructor(){super(),this.replaybase="./replay/",this.replayfile=fr,this.swName="sw.js",this.mainElementName="replay-app-main",this.appName="ReplayWeb.page",this.view="replay",this.ts="",this.url="",this.query="",this.config="",this.customConfig=null,this.coll="",this.paramString=null,this.deepLink=!1,this.newWindowBase="",this.inited=!1,this.embed=null,this.reloadCount=0,this.sandbox=!1,this.noWebWorker=!1,this.noCache=!1,this.noSandbox=null,this.logo=ke(),this.loading="",this.useRuffle=!1}static setDefaultReplayFile(e){fr=e}static get properties(){return{url:{type:String},ts:{type:String},query:{type:String},source:{type:String},src:{type:String},view:{type:String},embed:{type:String},replaybase:{type:String},swName:{type:String},title:{type:String},coll:{type:String},config:{type:String},inited:{type:Boolean},paramString:{type:String},hashString:{type:String},deepLink:{type:Boolean},sandbox:{type:Boolean},noSandbox:{type:Boolean},noWebWorker:{type:Boolean},noCache:{type:Boolean},hideOffscreen:{type:Boolean},newWindowBase:{type:String},errorMessage:{type:String},requireSubdomainIframe:{type:Boolean},loading:{type:String},useRuffle:{type:Boolean}}}async doRegister(){const e=new URL(this.replaybase,window.location.href);if(this.isCrossOrigin=e.origin!==window.location.origin,this.isCrossOrigin)return void(this.inited=!0);const t=this.swName+"?serveIndex=1",i=this.appName,a=this.replaybase,r=this.requireSubdomainIframe;this.swmanager=new je({name:t,scope:a,requireSubdomainIframe:r,appName:i});try{await this.swmanager.register(),this.inited=!0}catch(e){this.errorMessage=this.swmanager.renderErrorReport(this.logo)}}handleMessage(e){const t=this.renderRoot.querySelector("iframe");if(t&&e.source===t.contentWindow){if(!e.data.view)return;if(e.data.title&&(this.title=e.data.title),!this.deepLink)return;const t=new URLSearchParams(e.data),i=new URL(window.location.href);i.hash="#"+t.toString(),window.history.replaceState({},"",i)}}firstUpdated(){this.noSandbox&&console.warn("The noSandbox flag is deprecated. ReplayWeb.page does not add a sandbox by default. To enable sandboxing, use 'sandbox' flag instead. This may result in PDFs not loading and pages opening in new windows, but may be more secure in some situations"),this.doRegister(),window.addEventListener("message",(e=>this.handleMessage(e))),this.deepLink&&(this.updateFromHash(),window.addEventListener("hashchange",(()=>this.updateFromHash()))),this.loadBrowserDefaults()}loadBrowserDefaults(){void 0!==window.GestureEvent&&void 0===window.SharedWorker&&(this.noWebWorker=!0),navigator.storage&&navigator.storage.estimate||(this.noCache=!0)}updateFromHash(){const e=new URLSearchParams(window.location.hash.slice(1));e.has("url")&&(this.url=e.get("url")),e.has("ts")&&(this.ts=e.get("ts")),e.has("query")&&(this.query=e.get("query")),e.has("view")&&(this.view=e.get("view"))}mergeConfigs(){if(!this.customConfig)return this.config;if(this.config){const e={...this.customConfig,...JSON.parse(this.config)};return JSON.stringify(e)}return JSON.stringify(this.customConfig)}updated(e){if(e.has("url")||e.has("ts")||e.has("query")||e.has("view")||e.has("source")||e.has("src")){this.embed=this.embed||"default",this.src&&(this.source=this.src);const e=new URL(this.source,document.baseURI),t=this.mergeConfigs(),i={source:e,customColl:this.coll,config:t,basePageUrl:window.location.href.split("#")[0],baseUrlSourcePrefix:this.newWindowBase,embed:this.embed};this.deepLink||i.baseUrlSourcePrefix||(i.baseUrlSourcePrefix="https://replayweb.page/"),this.noWebWorker&&(i.noWebWorker="1"),this.noCache&&(i.noCache="1"),this.hideOffscreen&&(i.hideOffscreen="1"),"eager"===this.loading&&(i.loading="eager"),"sw.js"!==this.swName&&(i.swName=this.swName),this.useRuffle&&(i.ruffle="1"),this.paramString=new URLSearchParams(i).toString(),this.hashString=new URLSearchParams({url:this.url,ts:this.ts,query:this.query,view:this.view}).toString()}}static get styles(){return ze(d`
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
        display: block;
      }
    `)}render(){return F`
      ${this.paramString&&this.hashString&&this.inited?F`
            <iframe
              sandbox="${(e=>null!=e?e:W)(this.sandbox?"allow-downloads allow-modals allow-orientation-lock allow-pointer-lock         allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts         allow-same-origin allow-forms":void 0)}"
              @load="${this.onLoad}"
              src="${this.replaybase}${this.replayfile}?${this.paramString}#${this.hashString}"
              allow="autoplay *; fullscreen"
              title="Replay of ${this.title?`${this.title}:`:""} ${this.url}"
            ></iframe>
          `:F``}
      ${this.errorMessage}
    `}onLoad(e){if(this.isCrossOrigin)return;const t=e.target.contentWindow,i=e.target.contentDocument;if(t.navigator.serviceWorker&&!t.navigator.serviceWorker.controller&&this.reloadCount<=2)return this.reloadCount++,void setTimeout((()=>t.location.reload()),100);if(this.reloadCount=0,t.customElements.get(this.mainElementName))return;const a=i.createElement("script");a.src=pr,i.head.appendChild(a)}}!async function(){customElements.define("replay-web-page",ur)}();var br=i(5111),mr=i.n(br),gr=i(504),vr=i.n(gr),wr=i(6420),xr=i.n(wr);class yr extends ri{constructor(){super(),this._sizeUpdater=null,this.totalSize=0}static get properties(){return{...ri.properties,totalSize:{type:Number},shareOpts:{type:Object}}}static get styles(){return ze(yr.compStyles)}static get compStyles(){return d`
    .rec-button {
      display: flex;
      flex-direction: row;
      margin: 0 1px;
      align-items: center;
      border: 1px darkgrey solid;
      border-radius: 16px;
      padding: 0 0.5em;
      min-width: max-content;
    }

    .size-label {
      margin-left: 0.5em;
      font-weight: bold;
    }

    ${ri.compStyles}
    `}updated(e){e.has("embed")&&this.embed&&!this._sizeUpdater&&(this._sizeUpdater=this.runSizeUpdater()),super.updated(e)}async runSizeUpdater(){try{for(;this.embed;){if(this.coll){const e=await fetch(`./w/api/c/${this.coll}`),t=await e.json();this.totalSize=t.size||0}await new Promise((e=>setTimeout(e,3e3)))}}finally{this._sizeUpdater=null}}renderExtraToolbar(e=!1){return this.embed?e?F`
        <a href="${$e}/c/${this.coll}/dl?format=wacz&pages=all" role="button" class="dropdown-item" @keyup="${Ae}">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${ht()}"></fa-icon>
          </span>
          <span>Download Archive</span>
        </a>
        <hr class="dropdown-divider">
        `:F`
        <span class="rec-button" title="Archiving">
          <span class="icon is-small" title="Archiving">
            <fa-icon size="1.2em" aria-hidden="true" .svg="${xr()}"></fa-icon>
          </span>
          <span class="size-label">${Ge()(this.totalSize)}</span>
        </span>
        `:e?"":F`
    <a href="#" role="button"
    class="${e?"dropdown-item is-hidden-tablet":"button narrow is-borderless"}"
      title="Start Archiving" aria-label="Start Archiving" aria-controls="record"
      @click="${this.onShowStart}" @keyup="${Ae}">
      <span class="icon is-small">
        <fa-icon size="1.2em" aria-hidden="true" .svg="${xr()}"></fa-icon>
      </span>
    </a>`}renderCollInfo(){return console.log(this.collInfo),F`
    <div class="info-bg">
      <wr-rec-coll-info
      class="is-list"
      .coll="${this.collInfo}"
      .shareOpts=${this.shareOpts}
      ?detailed="${!0}"
      ></wr-rec-coll-info>
    </div>`}onShowStart(){if(this.embed)return;const e=this.coll,t=this.collInfo.title,i=this.tabData.url;this.dispatchEvent(new CustomEvent("show-start",{detail:{coll:e,title:t,url:i}}))}}customElements.define("wr-rec-coll",yr);var kr=i(7050),$r=i.n(kr),Sr=i(1294),zr=i.n(Sr),Cr=i(4688),Ir=i.n(Cr),Ar=i(7087),Ur=i.n(Ar),Pr=i(9671),_r=i.n(Pr),Lr=i(9696),Dr=i.n(Lr);class Tr extends it{constructor(){super(),this.detailed=!1,this.ipfsURL=null,this.shareWait=!1,this.showShareMenu=!1,this.shareWarn=!1,this.shareProgressSize=0,this.shareProgressTotalSize=0}static get properties(){return{coll:{type:Object},detailed:{type:Boolean},ipfsURL:{type:String},shareWait:{type:Boolean},showShareMenu:{type:Boolean},shareWarn:{type:Boolean},shareProgressSize:{type:Number},shareProgressTotalSize:{type:Number},isUploadNeeded:{type:Boolean},shareOpts:{type:Object},btrixOpts:{type:Object},ipfsOpts:{type:Object}}}static get styles(){return ze(Tr.compStyles)}static get compStyles(){return d`
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

    ${it.compStyles}
    `}firstUpdated(){this.renderRoot.addEventListener("click",(()=>this.showShareMenu=!1)),this.isUploadNeeded=this.coll&&this.coll.uploadTime&&this.coll.mtime>this.coll.uploadTime}updated(e){if(e.has("shareOpts")&&this.shareOpts){const{ipfsOpts:e,btrixOpts:t}=this.shareOpts;this.ipfsOpts=e,this.btrixOpts=t}e.has("coll")&&this.coll&&("main.archive"===this.coll.id&&"local://main.archive"!==this.coll.sourceUrl&&(this.coll={...this.coll,sourceUrl:"local://main.archive"}),this.coll.ipfsPins&&this.coll.ipfsPins.length&&(this.ipfsURL=this.coll.ipfsPins[this.coll.ipfsPins.length-1].url),this.isUploadNeeded=this.coll&&this.coll.uploadTime&&this.coll.mtime>this.coll.uploadTime)}render(){const e=this.coll,t=this.detailed,i=!!this.btrixOpts,a=!!this.ipfsOpts&&this.ipfsOpts.daemonUrl;return F`
      <div class="columns">
        <div class="column is-2">
          <p class="minihead">Name</p>
          <span class="subtitle has-text-weight-bold">
            ${t?F`
            ${e.title}
            `:F`
            <a href="?source=${encodeURIComponent(e.sourceUrl)}">${e.title}</a>`}
          </span>
        </div>

        <div class="column is-2"><p class="minihead">Date Created</p>${e.ctime?new Date(e.ctime).toLocaleString():""}</div>
        <div class="column is-1"><p class="minihead">Total Size</p>
        ${Ge()(Number(e.size||0))}
        </div>

        <div class="column is-2">
          <p class="minihead">Actions</p>
          <div class="button-row is-flex">
            <a href="${$e}/c/${this.coll.id}/dl?format=wacz&pages=all" class="button is-small" title="Download">
              <span class="icon is-small">
                <fa-icon aria-hidden="true" .svg="${ht()}"></fa-icon>
              </span>
            </a>
            <button @click="${this.onShowImport}" class="button is-small" title="Import File">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${We()}"></fa-icon>
              </span>
            </button>
            <button @click="${this.onShowStart}" class="button is-small" title="Start Archiving">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${xr()}"></fa-icon>
              </span>
            </button>
          </div>
        </div>

        ${i?F`
        <div class="column is-1">
          <p class="minihead">Upload</p>
          <div class="button-row is-flex">
          ${i?this.renderBtrixUpload():""}
        </div>
        `:F`
        <div class="column">
        </div>
        `}

        ${a?F`
        </div>
          <div class="column">
          <p class="minihead">Share (via IPFS)</p>
          <div class="button-row is-flex">
          ${a?this.renderIPFSSharing():""}
          </div>
        </div>
        `:""}

        ${e.loadUrl?F`
        <div class="column is-3">
          <p class="minihead">Imported From</p>
          ${e.loadUrl}
          <a @click="${t=>this.onCopy(t,e.loadUrl)}" class="copy"><fa-icon .svg="${Ke()}"/></a>
        </div>`:""}
      </div>
      ${this.shareWarn?this.renderShareWarn():""}
      `}renderIPFSSharing(){return this.ipfsURL?F`
      <div class="is-flex is-flex-direction-column">
        <div class="dropdown is-up ${this.showShareMenu?"is-active":""}">
          <div class="dropdown-trigger">
            <button @click="${this.onShowShareMenu}" class="button is-link is-light is-small ${this.shareWait?"is-loading":""}"" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Sharing!</span>
              <span class="icon">
                <fa-icon .svg=${zr()}></fa-icon>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu" style="z-index: 100">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <i class="is-size-7">${this.ipfsOpts&&this.ipfsOpts.message||""}</i>
              </div>
              <hr class="dropdown-divider"/>
              <a @click="${this.onPin}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon .svg="${Ur()}"></fa-icon>
                </span>
                Reshare Latest
              </a>
              <hr class="dropdown-divider"/>
              <a @click="${this.onCopyIPFSLink}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${Ir()}"></fa-icon>
                </span>
                Copy IPFS URL
              </a>
              <a @click="${this.onCopyGatewayLink}" class="has-text-weight-bold dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${Ir()}"></fa-icon>
                </span>
                Copy Gateway Link
              </a>
              <a @click="${this.onCopyRWPLink}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${Ir()}"></fa-icon>
                </span>
                Copy Shareable ReplayWeb.page Link
              </a>
            </div>
          </div>
        </div>
        <progress value="${this.shareProgressSize}" max="${this.shareProgressTotalSize}" class="progress is-small ${this.shareProgressTotalSize?"mini":"is-hidden"}"></progress>
      </div>

      <button class="button is-small" @click="${this.onUnpin}">
        <span class="icon is-small">
          <fa-icon .svg="${_r()}"></fa-icon>
        </span>
        <span>Stop Sharing</span>
      </button>

      `:F`
    
      <div class="is-flex is-flex-direction-column">
        <button class="button is-small ${this.shareWait?"is-loading":""}" @click="${this.onPinOrWarn}">
          <span class="icon is-small">
            <fa-icon .svg="${Ir()}"></fa-icon>
          </span>
          <span>Start</span>
        </button>
        <progress value="${this.shareProgressSize}" max="${this.shareProgressTotalSize}" class="progress is-small ${this.shareProgressTotalSize?"mini":"is-hidden"}"></progress>
      </div>
    `}renderBtrixUpload(){const{uploadId:e,uploadTime:t}=this.coll;return F`
    <div class="is-flex is-flex-direction-column">
      <button @click="${this.onUpload}" class="button is-small" title="Upload to Cloud">
        <span class="icon">
        ${t&&e?this.isUploadNeeded?F`
          <fa-icon aria-hidden="true" class="has-text-warning-dark" .svg="${yt()}"></fa-icon>
          `:F`
          <fa-icon aria-hidden="true" class="has-text-success" .svg="${$r()}"></fa-icon>
          `:F`
          <fa-icon aria-hidden="true" size="2.2em" .svg="${Dr()}"></fa-icon>
          `}
        </span>
      </button>
    </div>
    `}renderShareWarn(){return F`
    <wr-modal bgClass="has-background-warning" @modal-closed="${()=>this.shareWarn=!1}" title="Start Sharing?">
      <div class="content is-size-7">
        <p>
          Do you want to share all the content in "<i>${this.coll.title}</i>" via IPFS, a peer-to-peer
          distributed storage network?
        </p>
        <p>Your archiving session will have a unique link which can be shared with others to load and replay
        on-demand in ReplayWeb.page. This feature is experimental and likely works best with smaller archives.</p>
        <p>You can cancel sharing at any time.
        </p>
        <p><b>Once shared, this data leaves your computer and can be read by others.</b></p>
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
    </wr-modal>`}onShowImport(){const e=this.coll.id,t=this.coll.title;this.dispatchEvent(new CustomEvent("show-import",{bubbles:!0,composed:!0,detail:{coll:e,title:t}}))}async onShowShareMenu(e){e.preventDefault(),e.stopPropagation(),this.showShareMenu=!this.showShareMenu}onShowStart(){const e=this.coll.id,t=this.coll.title;this.dispatchEvent(new CustomEvent("show-start",{bubbles:!0,composed:!0,detail:{coll:e,title:t}}))}toggleShareWarn(e){localStorage.setItem("nosharewarn",e.currentTarget.checked?"1":"0")}onPinOrWarn(){"1"===localStorage.getItem("nosharewarn")?this.onPin():this.shareWarn=!0}async onPin(){this.shareWarn=!1,this.shareWait=!0;try{const{ipfsURL:e}=await this.ipfsAdd();this.ipfsURL=e,this.onCopyGatewayLink()}catch(e){console.log("ipfs share failed"),this.dispatchEvent(new CustomEvent("ipfs-share-failed",{bubbles:!0,composed:!0}))}this.shareWait=!1}async onUnpin(){this.shareWait=!0;const{removed:e}=await this.ipfsRemove();e?this.ipfsURL=null:this.dispatchEvent(new CustomEvent("ipfs-share-failed",{bubbles:!0,composed:!0})),this.shareWait=!1}ipfsAdd(){let e;this.dispatchEvent(new CustomEvent("ipfs-share",{detail:{pending:!0}}));const t=new Promise(((t,i)=>e={resolve:t,reject:i})),i=t=>{const{data:a}=t;if(a&&a.collId===this.coll.id)switch(a.type){case"ipfsProgress":this.shareProgressSize=a.size,this.shareProgressTotalSize=a.totalSize||this.coll.size;break;case"ipfsAdd":this.shareProgressSize=0,this.shareProgressTotalSize=0,a.result?e.resolve(a.result):e.reject(),this.dispatchEvent(new CustomEvent("ipfs-share",{detail:{pending:!1}})),navigator.serviceWorker.removeEventListener("message",i)}};return navigator.serviceWorker.addEventListener("message",i),fetch(`./w/api/c/${this.coll.id}/ipfs`,{method:"POST",body:JSON.stringify({ipfsDaemonUrl:this.ipfsOpts.daemonUrl,gzip:!1,customSplits:!0})}).then((t=>{t.ok||e.reject()})),t}async ipfsRemove(){const e=await fetch(`./w/api/c/${this.coll.id}/ipfs`,{method:"DELETE",body:JSON.stringify({ipfsDaemonUrl:this.ipfsOpts.daemonUrl})});return await e.json()}onCopyRWPLink(){const e=new URLSearchParams;e.set("source",this.ipfsURL);const t="https://replayweb.page/"+e.toString();this.showShareMenu=!1,navigator.clipboard.writeText(t)}onCopyGatewayLink(){const e=this.ipfsURL.split("/")[2],t=this.ipfsOpts.gatewayUrl+e+"/";this.showShareMenu=!1,navigator.clipboard.writeText(t)}onCopyIPFSLink(){const e=this.ipfsURL.slice(0,this.ipfsURL.lastIndexOf("/")+1);this.showShareMenu=!1,navigator.clipboard.writeText(e)}onUpload(){const e={coll:this.coll,isUploadNeeded:this.isUploadNeeded};this.dispatchEvent(new CustomEvent("do-upload",{bubbles:!0,composed:!0,detail:e}))}async doDelete(){this.coll.ipfsPins&&this.coll.ipfsPins.length&&await this.ipfsRemove();const e=await fetch(`./w/api/c/${this.coll.id}`,{method:"DELETE"});if(200===e.status){const t=await e.json();this.colls=t.colls}}}customElements.define("wr-rec-coll-info",Tr);customElements.define("wr-rec-coll-index",class extends tt{constructor(){super(),this.deleteConfirm=null,this.ipfsSharePending=0}get sortKeys(){return[{key:"title",name:"Title"},{key:"ctime",name:this.dateName},{key:"mtime",name:"Date Modified"},{key:"size",name:"Total Size"},{key:"loadUrl",name:"Source"}]}firstUpdated(){this.loadColls(),this._poll=setInterval((()=>{this.ipfsSharePending||this.loadColls()}),1e4)}updated(e){super.updated(e),e.has("sortedColls")&&this.sortedColls&&this.sortedColls.length&&this.dispatchEvent(new CustomEvent("colls-updated",{detail:{colls:this.sortedColls}}))}static get properties(){return{...tt.properties,deleteConfirm:{type:Object},shareOpts:{type:Object}}}renderCollInfo(e){return F`
    <wr-rec-coll-info
      style="overflow: visible" data-coll="${e.id}"
      .coll=${e}
      .shareOpts=${this.shareOpts}
      @ipfs-share="${this.onIpfsShare}">
    </wr-rec-coll-info>`}render(){return F`
    ${super.render()}
    ${this.renderDeleteConfirm()}
    `}renderDeleteConfirm(){return this.deleteConfirm?F`
    <wr-modal bgClass="has-background-grey-lighter" @modal-closed="${()=>this.deleteConfirm=null}" title="Confirm Delete">
      <p>Are you sure you want to permanentely delete the archive <b>${this.deleteConfirm.title}</b>
      (Size: <b>${Ge()(this.deleteConfirm.size)}</b>)</p>
      <button @click="${this.doDelete}"class="button is-danger">Delete</button>
      <button @click="${()=>this.deleteConfirm=null}" class="button">Cancel</button>
    </wr-modal>`:null}onIpfsShare(e){e.detail.pending?this.ipfsSharePending++:this.ipfsSharePending--}onDeleteColl(e){if(e.preventDefault(),e.stopPropagation(),!this.sortedColls)return;const t=Number(e.currentTarget.getAttribute("data-coll-index"));this.deleteConfirm=this.sortedColls[t]}async doDelete(){if(!this.deleteConfirm)return;this._deleting[this.deleteConfirm.sourceUrl]=!0,this.requestUpdate();const e=this.renderRoot.querySelector(`wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`);e&&await e.doDelete(),this.deleteConfirm=null}renderEmpty(){return F`No archived items. Click "New Archiving Session" above to begin archiving pages!`}});var Er=i(3873),Rr=i.n(Er);ur.setDefaultReplayFile("replay.html");class Or extends ur{constructor(){super(),this.replaybase="./replay/",this.replayfile="record.html",this.mainElementName="archive-web-page-app",this.appName="Embedded ArchiveWeb.page",this.embed="default",this.noWebWorker=!0,this.proxyPrefix="https://wabac-cors-proxy.webrecorder.workers.dev/proxy/",this.archivePrefix="";const e=new URL(window.location);e.hash="",this.logo=Rr(),this.customConfig={prefix:this.proxyPrefix,isLive:!1,archivePrefix:this.archivePrefix,baseUrl:e.href,baseUrlHashReplay:!1,recording:!0,noPostToGet:!0},this.downloaded=null,this.source="proxy://"+this.proxyPrefix}static get properties(){return{...ur.properties,archivePrefix:{type:String},proxyPrefix:{type:String}}}updated(e){e.has("proxyPrefix")&&(this.customConfig.proxyPrefix=this.proxyPrefix),e.has("archivePrefix")&&(this.customConfig.archivePrefix=this.archivePrefix,this.customConfig.isLive=!this.archivePrefix),super.updated(e)}handleMessage(e){this.downloaded&&"object"==typeof e.data&&"downloadedBlob"===e.data.msg_type&&(this.downloaded(e.data.url),this.downloaded=null)}doDownload(){const e=this.renderRoot.querySelector("iframe");if(!e)return;const t=new Promise((e=>{this.downloaded=e}));return e.contentWindow.postMessage({msg_type:"downloadToBlob"}),t}}!async function(){customElements.define("record-web-page",Or)}();var Nr=i(3525),Mr=i.n(Nr),Br=i(2740),jr=i.n(Br);customElements.define("wr-btrix-upload",class extends le{static get properties(){return{btrixOpts:{type:Object},coll:{type:Object},uploadColl:{type:Object},status:{type:String},uploadId:{type:String},uploadTime:{type:Number},isUploadNeeded:{type:Boolean},actualSize:{type:Number},uploadSize:{type:Number},uploadTotal:{type:Number}}}static get styles(){return ze(d``)}updated(e){if(e.has("uploadColl")){const{coll:e,isUploadNeeded:t}=this.uploadColl;this.coll=e,this.actualSize=0,this.isUploadNeeded=t,this.uploadTime=this.coll.uploadTime,this.uploadId=this.coll.uploadId}e.has("coll")&&this.coll&&this.pollUploadState()}async pollUploadState(){if(this.pollingUploadState)return;this.pollingUploadState=!0;for(;;){const e=await fetch(`./w/api/c/${this.coll.id}/upload`),t=await e.json();if(this.status=t.status,this.uploadTime=t.uploadTime,this.uploadId=t.uploadId,"uploading"===this.status?this.isUploadNeeded=!1:"idle"===this.status&&this.btrixOpts&&this.btrixOpts.client&&t.uploadTime&&t.uploadId&&t.mtime<=t.uploadTime?this.getRemoteUpload():this.uploadId||(this.isUploadNeeded=!0),this.uploadSize=t.size,this.uploadTotal=t.totalSize,"uploading"!==this.status)break;await new Promise((e=>setTimeout(e,1e3)))}this.pollingUploadState=!1}async getRemoteUpload(){try{const e=await this.btrixOpts.client.getRemoteUpload(this.uploadId);this.actualSize=e.fileSize}catch(e){this.isUploadNeeded=!0,this.status="missing"}}render(){if(!this.coll)return F``;const e=this.uploadTime,t=!this.isUploadNeeded&&e;let i="";try{if(this.btrixOpts.client&&this.uploadId){const{client:e}=this.btrixOpts;i=new URL(`/orgs/${e.defaultOrg}/artifacts/upload/${this.uploadId}`,e.url).href}}catch(e){}return F`
      <wr-modal
      @modal-closed="${()=>this.coll=null}"
      title="Upload To Browsertrix Cloud">
        <table class="is-size-6" style="margin-left: 3.0rem">
          <tr class="is-italic">
            <td class="has-text-right pr-4">Collection:</td>
            <td>${this.coll.title}</td>
          </tr>
          <tr class="is-italic">
            <td class="has-text-right pr-4">Local Size:</td>
            <td>${Ge()(this.coll.size)}</td>
          </tr>
          ${this.actualSize?F`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Uploaded Size:</td>
            <td>${Ge()(this.actualSize)}</td>
          </tr>`:""}
          ${e?F`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Last Uploaded At:</td>
            <td>${new Date(e).toLocaleString()}</td>
          </tr>`:""}
          ${i?F`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Link:</td>
            <td><a href="${i}" target="_blank">
            <fa-icon aria-hidden="true" class="" size="0.7em" .svg="${Mr()}"></fa-icon>
            View in Browsertrix Cloud</a></td>
          </tr>`:""}
        </table>
        <div class="is-flex is-flex-direction-column">
          <div class="has-text-centered mt-2 mb-2">
            ${this.renderUploadStatus()}
          </div>
          <div class="has-text-centered mt-4">
            ${"uploading"===this.status?F`
            <button class="button is-danger" type="button" @click="${this.onCancelUpload}">Cancel Upload</button>
            <button class="button" type="button" @click="${()=>this.coll=null}">Close</button>
            `:F`
            <button class="button ${this.isUploadNeeded?"is-primary":""}" type="button" @click="${this.onUpload}">${t?"Upload Again":"Upload"}</button>
            <button class="button" type="button" @click="${()=>this.coll=null}" title="Cancel without uploading">Cancel</button>
            `}
          </div>
        </div>
      </wr-modal>
    `}renderUploadStatus(){switch(this.status){case"done":return F`<p class="has-text-weight-bold has-text-primary">Upload Finished</p>`;case"failed":return F`<p class="has-text-weight-bold has-text-danger">Sorry, Upload Failed, or, the Browsertrix credentials may be incorrect.</p>;
                  <p>Check your credentials in <i>Settings</i> and then click <b>Upload</b> to try again.</p>`;case"aborted":return F`<p class="has-text-weight-bold has-text-danger">Upload has been canceled</p>`;case"uploading":return F`
          <progress value="${this.uploadSize}" max="${this.uploadTotal}" class="progress is-primary is-small mt-3 mb-1">
          </progress>
          <p class="has-text-centered is-size-7">
            ${Ge()(this.uploadSize||0)} / ${Ge()(this.uploadTotal||0)}
          </p>`;case"missing":return F`<p class="has-text-weight-bold has-text-danger">Previously uploaded data not found, or, the Browsertrix credentials may be incorrect.</p>
                  <p>Check your credentials in <i>Settings</i> and then click <b>Upload</b> to try again.</p>`;case"idle":return this.isUploadNeeded?this.uploadId?F`<p class="has-text-weight-bold has-text-warning-dark">
        <fa-icon aria-hidden="true" class="has-text-warning-dark" .svg="${yt()}"></fa-icon>
        Archive updated since last upload. Click "Upload" below to upload latest.
        ${this.renderDeleteUploaded()}
        </p>
        `:F`<p class="has-text-weight-bold has-text-primary">Archive not yet uploaded. Click "Upload" below to start.</p>`:F`<p class="is-italic">
        <fa-icon aria-hidden="true" class="has-text-success" .svg="${$r()}"></fa-icon>
        Archive already uploaded to Browsertrix Cloud.
        ${this.renderDeleteUploaded()}
        </p>
        `;case"deleted":return F`<p class="has-text-weight-bold has-text-primary">Upload to Browsertrix Cloud has been deleted.</p>
      <p>(Data is still saved locally in your browser)</p>`;case"deleteFailed":return F`<p class="has-text-weight-bold has-text-danger">Sorry, deleting upload has failed, or, the Browsertrix credentials may be incorrect.</p>;
                  <p>Check your credentials in <i>Settings</i> and then click <b>Delete</b> to try again.
                  ${this.renderDeleteUploaded()}
                  </p>
                  `;default:return""}}renderDeleteUploaded(){return F`
    <span><button class="button is-small" title="Delete Upload from Browsertrix Cloud" type="button" @click="${this.onDeleteUpload}">
    <fa-icon aria-hidden="true" class="has-text-danger pr-2" .svg="${jr()}"></fa-icon>
    Delete
    </button></span>
    `}async onUpload(){const e=this.btrixOpts.client,t=await e.getOrg(this.btrixOpts.orgName),i=new URL(`/api/orgs/${t}/uploads/stream`,e.url);this.uploadId&&i.searchParams.set("replaceId",this.uploadId);const a=(new Date).toLocaleString();i.searchParams.set("notes",`Uploaded by ArchiveWeb.page 0.11.4 at ${a}`);const r=i.href,o={Authorization:e.auth},s=JSON.stringify({url:r,headers:o});this.status="uploading",this.uploadSize=0,this.uploadTotal=0;const n=await fetch(`./w/api/c/${this.coll.id}/upload?format=wacz&pages=all`,{method:"POST",body:s});(await n.json()).uploading&&this.pollUploadState()}async onCancelUpload(){const e=JSON.stringify({abortUpload:!0});await fetch(`./w/api/c/${this.coll.id}/upload`,{method:"POST",body:e}),this.pollUploadState()}async onDeleteUpload(){try{const{client:e}=this.btrixOpts;if(!e)return;await e.deleteUpload(this.uploadId),await fetch(`./w/api/c/${this.coll.id}/upload`,{method:"DELETE"}),this.status="deleted",this.isUploadNeeded=!0,this.uploadTime=this.btrixOpts.uploadTime=null,this.uploadId=this.btrixOpts.uploadId=null}catch(e){this.status="deleteFailed"}}});class Fr{static async login({url:e,username:t,password:i,orgName:a}){const r=e+"/api/auth/jwt/login",o=new FormData;o.append("username",t),o.append("password",i);const s=await fetch(r,{method:"POST",body:o}),n=await s.json(),{token_type:l,access_token:d}=n;if(!d||!l)throw new Error("Invalid login");const c=new Fr(e,l+" "+d),h=await c.getOrg(a);return c.defaultOrg=h,c}constructor(e,t){this.url=e,this.auth=t,this.defaultOrg=null}async fetchAPI(e,t="GET",i=null){const a={Authorization:this.auth};"GET"!==t&&(a["Content-Type"]="application/json");try{const r=await fetch(this.url+e,{headers:a,method:t,body:i,duplex:"half"});return await r.json()}catch(e){return console.warn(e),{}}}async getOrg(e=""){const t=await this.fetchAPI("/api/users/me-with-orgs"),{orgs:i}=t;if(!i||!i.length)return null;if(!e)return i[0].id;for(const t of i)if(t.name===e)return t.id;return i[0].id}async getRemoteUpload(e,t=null){const i=this.defaultOrg||t,a=await this.fetchAPI(`/api/orgs/${i}/uploads/${e}`);if(!a.name)throw new Error("upload_missing");return a}async deleteUpload(e,t=null){const i=this.defaultOrg||t,a=JSON.stringify({crawl_ids:[e]});if(!(await this.fetchAPI(`/api/orgs/${i}/uploads/delete`,"POST",a)).deleted)throw new Error("delete_failed")}}const Hr="https://w3s.link/";function Wr(e){const{hostname:t,protocol:i,pathname:a}=new URL(e),r=i.slice(0,-1);if(!t){const[e,...t]=a.slice(2).split("/");return{type:r,cid:e,path:"/"+t.join("/")}}return{type:r,cid:t,path:a}}async function qr(e){return Yr(e)?e:Qr(e)?Kr(e):e}async function Gr(e){return new Response(e).blob()}async function*Vr(e){const t=await e.getReader();try{for(;;){const{done:e,value:i}=await t.read();if(e)return;yield i}}finally{t.releaseLock()}}function Kr(e){let t=e;t.next||(t=e[Symbol.asyncIterator]());const i=new TextEncoder;return new ReadableStream({async pull(e){const{value:a,done:r}=await t.next();if(r)await e.close();else{let t=a;"string"==typeof t&&(t=i.encode(t)),await e.enqueue(t)}}})}async function Zr(e){if(!e.ok){const t=await e.text(),i=e.status;throw new Error(`HTTP Error ${i}: ${t}`)}}async function Jr({url:e,file:t,fileName:i="",parameterName:a="file",fetch:r=globalThis.fetch,signal:o}){const s=new FormData,n=new Headers;Xr(e,n);const l=await async function(e){if(Yr(e))return await Gr(e);if(Qr(e)){const t=Kr(e);return await Gr(t)}return e instanceof Blob?e:new Blob([e])}(t);i?s.append(a,l,i):s.append(a,l);const d=await r(e,{method:"POST",body:s,headers:n,signal:o});return await Zr(d),d}function Yr(e){return"function"==typeof e.getReader}function Qr(e){return e[Symbol.asyncIterator]}function Xr(e,t){if(e.password)if(e.username){const i=`Basic ${btoa(`${unescape(e.username)}:${unescape(e.password)}`)}`;t.append("Authorization",unescape(i)),e.username="",e.password=""}else{const i=`Bearer ${e.password}`;t.append("Authorization",unescape(i)),e.password=""}}async function eo({url:e,fetch:t=globalThis.fetch,signal:i}){const a=await t(e,{method:"HEAD",signal:i});await Zr(a);const r=a.headers.get("x-ipfs-datasize")||a.headers.get("Content-Length");return parseInt(r,10)}async function*to({url:e,start:t,end:i,format:a,signal:r,fetch:o=globalThis.fetch}){const s=new Headers;Number.isInteger(t)&&(Number.isInteger(i)?s.set("Range",`bytes=${t}-${i}`):s.set("Range",`bytes=${t}-`));const n=new URL(e);a&&(s.set("Accept",`application/vnd.ipld.${a}`),s.set("cache-control","no-cache"));const l=await o(n.href,{headers:s,signal:r});await Zr(l),yield*Vr(l.body)}async function*io({url:e,start:t,end:i,format:a,signal:r,gatewayURL:o=ao()}){const s=function(e,t=ao()){const{cid:i,path:a,type:r}=Wr(e);return new URL(`/${r}/${i}${a}`,t)}(e,o);yield*to({url:s,start:t,end:i,format:a,signal:r})}function ao(){if(!globalThis.location)return Hr;const{pathname:e,hostname:t,protocol:i}=globalThis.location;if(e.startsWith("/ipfs/")||e.startsWith("/ipns/"))return`${i}//${t}/`;const[a,...r]=t.split(".");return 59===a.length&&r.length>=2?`${i}//${r.join(".")}/`:Hr}let ro=!1;const oo=[5001,45001,45002,45003,45004,45005],so="https://api.web3.storage/",no="https://api.estuary.tech/",lo="http://localhost:5001/",co="agregore",ho="daemon",po="daemon:preferred",fo="web3.storage",uo="estuary",bo="readonly",mo=[po,co,ho,fo,uo,bo];class go{get type(){return"invalid"}async*get(e,{start:t,end:i,signal:a=null,format:r=null}={}){throw new Error("Not Implemented")}async getSize(e,t=null){throw new Error("Not Implemented")}async uploadCAR(e,t=null){throw new Error("Not Implemented")}async uploadFile(e,t,i=null){throw new Error("Not Implemented")}async clear(e,t=null){throw new Error("Not Implemented")}}async function vo({daemonURL:e,web3StorageToken:t,web3StorageURL:i=so,estuaryToken:a,estuaryURL:r=no,publicGatewayURL:o=ao(),readonly:s=!0,timeout:n=1e3,fetch:l=globalThis.fetch}={}){const d=[],c=[];if(c.push(async function(e=globalThis.fetch){try{return await e("ipfs://localhost/"),!0}catch(e){return ro&&console.warn("Unable to detect Agregore",e),!1}}(l).then((e=>e&&d.push({type:co,fetch:l})))),c.push(async function(){const e=oo.map((e=>`http://localhost:${e}`));try{const i=await Promise.any(e.map((e=>Io(e).then((t=>{if(t)return e;throw new Error("Not found")})))));return!!i&&(Co&&!zo&&(t=i,zo=!0,globalThis.chrome.webRequest.onBeforeSendHeaders.addListener((e=>{const{requestHeaders:i}=e;for(const e of i)if("origin"===e.name.toLowerCase())return e.value=t,{requestHeaders:i};return e.requestHeaders.push({name:"Origin",value:t}),{requestHeaders:i}}),{urls:[t+"/*"]},["blocking","requestHeaders","extraHeaders"])),i)}catch{return!1}var t}().then((e=>e&&d.push({type:ho,url:e,fetch:l})))),e&&c.push(Io(e,n,l).then((t=>t&&d.push({type:po,url:e,fetch:l})))),a){const e=r,t=a;d.push({type:uo,url:e,authorization:t,fetch:l,publicGatewayURL:o})}if(t){const e=i,a=t;d.push({type:fo,url:e,authorization:a,fetch:l,publicGatewayURL:o})}return s&&o&&d.push({type:bo,fetch:l,publicGatewayURL:o}),await Promise.allSettled(c),d}async function wo({chooseOrder:e=mo,...t}={}){const i=function(e,t=mo){const i=e.filter((({type:e})=>t.includes(e))).sort((({type:e},{type:i})=>t.indexOf(e)-t.indexOf(i)))[0];if(!i)throw new Error("Unable to find valid type");return i}(await vo(t),e);return async function(e){const{type:t}=e;let i=null;if(t===co)i=new ko(e.fetch||globalThis.fetch);else if(t.startsWith(ho))i=new So(e.url);else if(t===fo)i=new $o(e.authorization,e.url,e.publicGatewayURL);else if(t===uo)i=new yo(e.authorization,e.url,e.publicGatewayURL);else{if(t!==bo)throw new TypeError(`Unknown API type: ${t}.`);i=new xo(e.publicGatewayURL)}return i}(i)}class xo extends go{constructor(e=ao()){super(),this.gatewayURL=e}get type(){return bo}async*get(e,{start:t,end:i,signal:a=null,format:r=null}={}){yield*io({url:e,start:t,end:i,format:r,gatewayURL:this.gatewayURL,signal:a})}async getSize(e,t=null){const{cid:i,path:a,type:r}=Wr(e);return eo({url:new URL(`/${r}/${i}${a}`,this.gatewayURL),signal:t})}}class yo extends xo{constructor(e,t=no,i=ao()){super(i),this.authorization=e,this.url=t}get type(){return uo}async uploadCAR(e,t=null){throw new Error("Not Implemented")}async uploadFile(e,t,i=null){const a=new URL("/content/add",this.url);a.password=this.authorization;const r=await Jr({url:a,file:e,fileName:t,parameterName:"data",signal:i}),{cid:o}=await r.json();return`ipfs://${o}/`}}class ko extends go{constructor(e=globalThis.fetch){super(),this.fetch=e}get type(){return co}async*get(e,{start:t,end:i,signal:a=null,format:r=null}={}){const{fetch:o}=this;yield*to({url:e,start:t,end:i,format:r,fetch:o,signal:a})}async getSize(e,t=null){const{fetch:i}=this;return eo({url:e,fetch:i,signal:t})}async uploadCAR(e,t=null){const i=await qr(e),{fetch:a}=this,r=await a("ipfs://localhost",{method:"POST",headers:{"Content-Type":"application/vnd.ipld.car"},signal:t,body:i});await Zr(r);return(await r.text()).split("\n")}async uploadFile(e,t=null){const i=await qr(e),{fetch:a}=this,r=await a("ipfs://localhost",{method:"POST",headers:{"Content-Type":"application/octet-stream"},signal:t,body:i});return await Zr(r),r.headers.get("Location")}}class $o extends xo{constructor(e,t=so,i=ao()){super(i),this.authorization=e,this.url=t}get type(){return fo}async uploadCAR(e,t=null){const i=new URL("/car",this.url);i.password=this.authorization;const a=await async function({url:e,fileIterator:t,signal:i}){const a=new Headers;a.set("Content-Type","application/octet-stream"),Xr(e,a);const r=await qr(t),o=await fetch(e,{method:"POST",signal:i,body:r,headers:a,duplex:"half"});return await Zr(o),o}({url:i,fileIterator:e,signal:t});return(await a.text()).split("\n").filter((e=>e)).map((e=>{const{cid:t}=JSON.parse(e);return`ipfs://${t}/`}))}async uploadFile(e,{fileName:t="",signal:i=null}={}){const a=new URL("/upload",this.url);a.password=this.authorization;const r=await Jr({url:a,file:e,fileName:t,signal:i}),{cid:o}=await r.json();return`ipfs://${o}/`}}class So extends go{constructor(e=lo){super(),this.url=e}get type(){return ho}async*getFile(e,{start:t,end:i,signal:a=null,format:r=null}={}){const{cid:o,path:s,type:n}=Wr(e),l=new URL(`/api/v0/cat?arg=/${n}/${o}${s}`,this.url);if(t&&l.searchParams.set("offset",t),i&&l.searchParams.set("length",i-(t||0)+1),r)throw new Error("Format is unsupported on Kubo Daemons for now");const d=await fetch(l,{method:"POST",signal:a});await Zr(d),yield*Vr(d.body)}async*getRaw(e,{signal:t=null}={}){const{cid:i,path:a,type:r}=Wr(e),o=new URL(`/api/v0/block/get?arg=/${r}/${i}${a}`,this.url),s=await fetch(o,{method:"POST",signal:t});await Zr(s),yield*Vr(s.body)}async*getCar(e,{signal:t=null}={}){const{cid:i,path:a,type:r}=Wr(e),o=new URL(`/api/v0/dag/export?arg=/${r}/${i}${a}`,this.url),s=await fetch(o,{method:"POST",signal:t});await Zr(s),yield*Vr(s.body)}async*get(e,{start:t,end:i,signal:a=null,format:r=null}={}){if(r)if("raw"===r)yield*this.getRaw(e,{start:t,end:i,signal:a});else{if("car"!==r)throw new Error(`Invalid format type, must be car or 'raw', got ${r}`);yield*this.getCar(e,{start:t,end:i,signal:a})}yield*this.getFile(e,{start:t,end:i,signal:a})}async getSize(e,t=null){try{const{cid:i,path:a,type:r}=Wr(e),o=`/api/v0/file/ls?arg=/${r}/${i}${a}&size=true`,s=new URL(o,this.url),n=await fetch(s,{method:"POST",signal:t});await Zr(n);const{Objects:l}=await n.json(),[{Size:d}]=Object.values(l);return d}catch(i){return ro&&console.warn(i),this._getSizeWithDag(e,t)}}async _getSizeWithDag(e,t=null){const{cid:i,path:a,type:r}=Wr(e),o=new URL(`/api/v0/dag/stat?arg=/${r}/${i}${a}`,this.url),s=await fetch(o,{method:"POST",signal:t});await Zr(s);const{Size:n}=await s.json();return parseInt(n,10)}async _pin(e,t=null){const{cid:i,path:a,type:r}=Wr(e),o=new URL(`/api/v0/pin/add?arg=/${r}/${i}${a}`,this.url),s=await fetch(o,{method:"POST",signal:t});await Zr(s)}async _unpin(e,t=null){const{cid:i,path:a,type:r}=Wr(e),o=new URL(`/api/v0/pin/rm?arg=/${r}/${i}${a}`,this.url),s=await fetch(o,{method:"POST",signal:t});await Zr(s)}async clear(e,t=null){return this._unpin(e,t)}async uploadCAR(e,t=null){const i=new URL("/api/v0/dag/import?allow-big-block=true&pin-roots=true",this.url),a=await Jr({url:i,file:e,signal:t});return(await a.text()).split("\n").filter((e=>e)).map((e=>{const{Root:t}=JSON.parse(e);return`ipfs://${t.Cid["/"]}/`}))}async uploadFile(e,t="",i=null){const a=new URL("/api/v0/add?pin=true&cid-version=1&inline=false&raw-leaves=true",this.url),r=e.name&&e instanceof Blob;(t||r)&&a.searchParams.set("wrap-with-directory","true");const o=await Jr({url:a,file:e,fileName:t,signal:i}),s=await o.text(),[n]=s.split("\n"),{Hash:l}=JSON.parse(n),d=`ipfs://${l}/`;return await this._pin(d,i),d}}let zo=!1;const Co=!!(globalThis&&globalThis.chrome&&globalThis.chrome.webRequest&&globalThis.chrome.webRequest.onBeforeSendHeaders&&globalThis.chrome.webRequest.onBeforeSendHeaders.addListener);async function Io(e=lo,t=1e3,i=globalThis.fetch){try{const a=new AbortController,{signal:r}=a;setTimeout((()=>a.abort()),t);const o=await i(new URL("/api/v0/version",e),{method:"POST",signal:r});return!!o.ok||!(!o.status||404===o.status)}catch(t){return ro&&console.warn("Unable to detect Kubo Daemon",t,e),!1}}function Ao(e,t){return self.chrome&&self.chrome.storage?new Promise((i=>{const a={};a[e]=t,self.chrome.storage.local.set(a,(()=>i()))})):self.localStorage?Promise.resolve(localStorage.setItem(e,t)):Promise.reject()}function Uo(e){return self.chrome&&self.chrome.storage?new Promise((t=>{self.chrome.storage.local.get(e,(i=>{t(i[e])}))})):self.localStorage?Promise.resolve(localStorage.getItem(e)):Promise.reject()}const Po="0.11.4",_o="https://w3s.link/ipfs/";class Lo extends Fe{constructor(){super(),this.navMenuShown=!1,this.showCollDrop=!1,this.colls=[],this.autorun=!1,this.settingsError="",this.settingsTab=localStorage.getItem("settingsTab")||"ipfs";try{const e=localStorage.getItem("ipfsOpts");this.ipfsOpts=JSON.parse(e)}catch(e){}this.ipfsOpts=this.ipfsOpts||{daemonUrl:"",message:"",useCustom:!1,autoDetect:!1,gatewayUrl:_o};try{const e=localStorage.getItem("btrixOpts");this.btrixOpts=JSON.parse(e),Fr.login(this.btrixOpts).then((e=>this.btrixOpts.client=e))}catch(e){this.btrixOpts=null}Uo("autorunBehaviors").then((e=>this.autorun="1"===e)),window.archivewebpage&&window.archivewebpage.setDownloadCallback((e=>this.onDownloadProgress(e)))}get appName(){return"ArchiveWeb.page"}static get properties(){return{...Fe.properties,showStartRecord:{type:Boolean},showCollDrop:{type:Boolean},colls:{type:Array},selCollId:{type:String},selCollTitle:{type:String},recordUrl:{type:String},autorun:{type:Boolean},showNew:{type:String},showImport:{type:Boolean},isImportExisting:{type:Boolean},loadedCollId:{type:String},showDownloadProgress:{type:Boolean},download:{type:Object},ipfsOpts:{type:Object},btrixOpts:{type:Object},uploadCollOpts:{type:Object},showSettings:{type:Boolean},settingsTab:{type:String},settingsError:{type:String},showIpfsShareFailed:{type:Boolean}}}initRoute(){const e=new URLSearchParams(window.location.search);e.has("config")?(super.initRoute(),this.handleMessages()):(this.inited=!0,this.sourceUrl=e.get("source")||""),this.embed||this.checkIPFS()}handleMessages(){window.addEventListener("message",(async e=>{if(this.embed&&this.loadedCollId&&"object"==typeof e.data&&"downloadToBlob"===e.data.msg_type){const t=await fetch(`./w/api/c/${this.loadedCollId}/dl?format=wacz&pages=all`),i=await t.blob();e.source.postMessage({msg_type:"downloadedBlob",coll:this.loadedCollId,url:URL.createObjectURL(i)})}}))}onStartLoad(e){this.embed||(this.showImport=!1,this.sourceUrl=e.detail.sourceUrl,this.loadInfo=e.detail,this.isImportExisting&&this.selCollId&&(this.loadInfo.importCollId=this.selCollId))}onCollLoaded(e){if(this.loadInfo&&this.loadInfo.importCollId&&navigator.serviceWorker.controller){const e={msg_type:"reload",full:!0,name:this.loadInfo.importCollId};navigator.serviceWorker.controller.postMessage(e)}this.embed&&(this.loadedCollId=e.detail.collInfo&&e.detail.collInfo.coll),super.onCollLoaded(e),!e.detail.alreadyLoaded&&e.detail.sourceUrl&&e.detail.sourceUrl!==this.sourceUrl&&(this.sourceUrl=e.detail.sourceUrl)}getLoadInfo(e){if(this.disableCSP(),this.loadInfo)return this.loadInfo;return{customColl:e.startsWith("local://")?e.slice("local://".length):e}}async disableCSP(){if(this.embed||!self.chrome||!self.chrome.runtime)return;const e=navigator.userAgent.match(/Chrome\/([\d]+)/);if(!e||Number(e[1])<94)return;console.log("attempt to disable CSP to ensure replay works");let t=await new Promise((e=>{chrome.tabs.getCurrent((t=>e(t.id)))}));chrome.runtime.sendMessage({msg:"disableCSP",tabId:t})}static get styles(){return ze(Lo.appStyles)}static get appStyles(){return ze(d`
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
        max-width: 300px;
        padding-right: 8px;
      }

      .rightbar {
        margin-left: auto;
        display: flex;
      }

      .dl-progress {
        display: flex;
        flex-direction: column;
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

      ${Fe.appStyles}
    `)}get mainLogo(){return Rr()}renderNavEnd(){return F`
    <a href="https://archiveweb.page/guide" target="_blank" class="navbar-item is-size-6">
    <fa-icon .svg="${Le()}" aria-hidden="true"></fa-icon><span>&nbsp;User Guide</span>

    <a href="?about" @click="${e=>{e.preventDefault(),this.showAbout=!0}}"class="navbar-item is-size-6">About
    </a>`}renderNavBrand(){return F`
      <span id="home" class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only">
      <span class="" style="color: #8878c3">archive</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`}renderHomeIndex(){return F`
      <section class="section less-padding">
        <div class="message is-small">
          <div class="message-body">
            <div class="buttons">
              <button class="button is-small no-pad-mobile" title="New Archiving Session" @click="${()=>this.showNew="show"}">
                <span class="icon">
                  <fa-icon .svg=${mr()}></fa-icon>
                </span>
                <span class="is-hidden-mobile">New Archiving Session</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Import File" @click="${()=>this.showImport=!0}">
                <span class="icon">
                  <fa-icon .svg=${We()}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Import File</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Start Archiving" ?disabled="${!this.colls}" @click="${this.onShowStart}">
                <span class="icon">
                  <fa-icon size="1.0em" aria-hidden="true" .svg="${xr()}"></fa-icon>
                </span>
                <span class="is-hidden-mobile">Start Archiving</span>
              </button>
              <div class="rightbar">
                <div class="infomsg is-hidden-mobile">The ArchiveWeb.page ${Ce?"App":"Extension"} allows you to archive webpages directly in your browser!</div>
                <button class="button is-small" @click="${()=>this.showSettings=!0}">
                  <fa-icon .svg=${vr()}></fa-icon>
                </button>
              </div>
            </div>
          </div>
        </div> 
      </section>

      <wr-rec-coll-index
       dateName="Date Created"
       headerName="Archived Items"
       .shareOpts=${{ipfsOpts:this.ipfsOpts,btrixOpts:this.btrixOpts}}
       @show-start=${this.onShowStart}
       @show-import=${this.onShowImport}
       @colls-updated=${this.onCollsLoaded}
       @ipfs-share-failed=${()=>this.showIpfsShareFailed=!0}
       @do-upload=${e=>this.uploadCollOpts=e.detail}
       style="overflow: visible"
       >
      </wr-rec-coll-index>
     `}render(){return F`
    ${this.showStartRecord?this.renderStartModal():""}
    ${this.showNew?this.renderNewCollModal():""}
    ${this.showImport?this.renderImportModal():""}
    ${this.showDownloadProgress&&this.download?this.renderDownloadModal():""}
    ${this.showSettings?this.renderSettingsModal():""}
    ${this.showIpfsShareFailed?this.renderIPFSShareFailedModal():""}
    ${this.uploadCollOpts&&this.btrixOpts?this.renderBtrixUploadModal():""}
    ${super.render()}`}renderColl(){return F`
    <wr-rec-coll 
    .editable="${!0}"
    .clearable="${this.embed}"
    .browsable="${!this.embed}"
    .loadInfo="${this.getLoadInfo(this.sourceUrl)}"
    .appLogo="${this.mainLogo}"
    .autoUpdateInterval=${this.embed||this.showDownloadProgress?0:10}
    .shareOpts=${{ipfsOpts:this.ipfsOpts,btrixOpts:this.btrixOpts}}
    swName=${this.swName}
    embed="${this.embed}"
    sourceUrl="${this.sourceUrl}"
    appName="${this.appName}"
    appVersion=${Po}
    @replay-favicons=${this.onFavIcons}
    @update-title=${this.onTitle}
    @coll-loaded=${this.onCollLoaded}
    @show-start=${this.onShowStart}
    @show-import=${this.onShowImport}
    @do-upload=${e=>this.uploadCollOpts=e.detail}
    @about-show=${()=>this.showAbout=!0}></wr-rec-coll>`}renderCollList(e=""){return F`
    <div class="dropdown-row">
      <span>${e}&nbsp;</span>
      <div class="select is-small">
        <select @change="${this.onSelectColl}">
        ${this.colls&&this.colls.map((e=>F`
          <option value="${e.id}"
          ?selected="${this.selCollId===e.id}"
          >${e.title||e.loadUrl}</option>`))}
        </select>
      </div>
    </div>
    `}renderStartModal(){return F`
    <wr-modal @modal-closed="${()=>this.showStartRecord=!1}" title="Start Archiving">
      ${this.renderCollList("Save To:")}
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
            placeholder="Enter a URL to Start Archiving">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-outlined is-link">
              <span class="icon">
                <fa-icon size="1.0em" aria-hidden="true" .svg="${xr()}"></fa-icon>
              </span>
              <span>Go!</span>
            </button>
          </div>
        </div>
        ${Ce?F`
        <label class="checkbox">
          <input id="preview" type="checkbox"><span>&nbsp;Start in Preview Mode (without archiving.)</span>
        </label>`:""}
      </form>
    </wr-modal>`}renderNewCollModal(){return F`
    <wr-modal @modal-closed="${()=>this.showNew=null}" title="New Archiving Session">
      <form @submit="${this.onNewColl}" class="create-new">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input type="text" id="new-title" name="new-title" class="input" required placeholder="Give this archiving session a name">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-primary ${"loading"===this.showNew?"is-loading ":""}" ?disabled="${"loading"===this.showNew}">Create</button>
          </div>
        </div>
      </form>
    </wr-modal`}renderImportModal(){return F`
    <wr-modal style="--modal-width: 740px" @modal-closed="${()=>this.showImport=!1}" title="Import File">
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
            Add to an existing archived item${this.isImportExisting?":":""}
          </label>
        </div>
        ${this.isImportExisting?this.renderCollList():""}
      </div>
    </wr-modal`}renderIPFSShareFailedModal(){return F`
    <wr-modal @modal-closed="${()=>this.showIpfsShareFailed=!1}" title="IPFS Connection Failed">
      <div>
        <p>Sorry, IPFS sharing / unsharing failed as IPFS could not be reached.</p>
        <p>(Check the IPFS settings and try again.)</p>
      </div>
    </wr-modal`}renderBtrixUploadModal(){return F`
      <wr-btrix-upload
      .btrixOpts=${this.btrixOpts}
      .uploadColl=${this.uploadCollOpts}
      >
      </wr-btrix-upload>`}renderDownloadModal(){return F`
    <wr-modal .noBgClose=${!0} style="--modal-width: 740px" @modal-closed="${()=>this.showDownloadProgress=!1}" title="Download Progress">
      <div class="dl-progress">
        <div>Downloading to: <i>${this.download.filename}</i></div>
        <div>Size Downloaded: <b>${Ge()(this.download.currSize)}</b></div>
        <div>Time Elapsed: ${Math.round(Date.now()/1e3-this.download.startTime)} seconds</div>

        <div class="has-text-centered">
        ${(()=>{switch(this.download.state){case"progressing":return F`
          <button @click="${this.onDownloadCancel}" class="button is-danger">Cancel Download</button>
          `;case"interrupted":return F`
          <p class="has-text-weight-bold has-text-danger">The download was interrupted</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `;case"cancelled":return F`
          <p class="has-text-weight-bold has-text-danger">The download was canceled</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `;case"completed":return F`
          <p class="has-text-weight-bold has-text-primary">Download Completed!</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `}})()}
        </div>
      </div>
    </wr-modal>`}onDownloadProgress(e){e.filename?(this.showDownloadProgress=!0,this.download=e):this.download&&(this.download={...this.download,state:e.state})}onDownloadCancel(){window.archivewebpage&&(this.download&&"progressing"===this.download.state?window.archivewebpage.downloadCancel(this.download):this.showDownloadProgress=!1)}getDeployType(){return Ce?"App":this.embed?"Embedded":"Extension"}renderAbout(){return F`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ArchiveWeb.page ${this.getDeployType()}</p>
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${Rr()}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${this.getDeployType()} v${Po}</div>
                    </div>

                    ${Ce?F`
                    <p>ArchiveWeb.page App is a standalone app for Mac, Windows and Linux that allows users to archive webpages as they browse</p>

                    `:F`
                    <p>ArchiveWeb.page allows users to archive webpages directly in your browser!</p>`}
                  </div>

                  <p>See the <a href="https://archiveweb.page/guide" target="_blank">ArchiveWeb.page Guide</a> for more info on how to use this tool.</p>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/archiveweb.page" target="_blank">https://github.com/webrecorder/archiveweb.page</a>
                  </p>

                  <p>ArchiveWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>

                  <h3>Privacy Policy</h3>
                  <p class="is-size-7">ArchiveWeb.page allows users to archive what they browse, storing captured data directly in the browser.
                  Users can downloaded this data as files to their hard drive. Users can also delete any and all archived data at any time.
                  ArchiveWeb.page does not collect any usage or tracking data.</p>

                  <p class="is-size-7">ArchiveWeb.page includes an experimental sharing option for each archive collection. Users can choose to share select archives on a peer-to-peer network (IPFS) via a unique id.
                  Once shared on this network, the data may become accessible to others.
                  All archived items are private and not shared by default, unless explicitly opted-in by the user. (A warning is displayed when sharing via IPFS.)</p>

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
      </div>`}renderSettingsModal(){return F`
    <wr-modal @modal-closed="${this.onCancelSettings}" title="Settings">
      <div class="tabs mb-3">
        <ul>
          <li class="${"ipfs"===this.settingsTab?"is-active":""}">
            <a @click=${()=>this.settingsTab="ipfs"}>IPFS</a>
          </li>
          <li class="${"browsertrix"===this.settingsTab?"is-active":""}">
            <a @click=${()=>this.settingsTab="browsertrix"}>Browsertrix Cloud</a>
          </li>
        </ul>
      </div>

      <form class="is-flex is-flex-direction-column is-size-7" @submit="${this.onSaveSettings}">

        ${"ipfs"===this.settingsTab?F`
        <p class="is-size-6 mb-3">Configure settings for sharing archived items to IPFS.</p>
        <fieldset>
          <div class="field">
            <input name="ipfsAutoDetect" id="ipfsAutoDetect" class="checkbox is-small" type="checkbox" ?checked="${this.ipfsOpts.autoDetect}"><span class="ml-1">Auto-Detect IPFS</span>
          </div>
          <div class="field has-addons">
            <p class="is-expanded">
              IPFS Daemon URL (leave blank to auto-detect IPFS):
              <input class="input is-small" type="url"
              name="ipfsDaemonUrl" id="ipfsDaemonUrl" value="${this.ipfsOpts.daemonUrl}"
              placeholder="Set IPFS Daemon URL or set blank to auto-detect IPFS">
            </p>
          </div>
          <div class="field has-addons">
            <p class="is-expanded">
              IPFS Gateway URL:
              <input class="input is-small" type="url"
              name="ipfsGatewayUrl" id="ipfsGatewayUrl" value="${this.ipfsOpts.gatewayUrl}"
              placeholder="${_o}">
            </p>
          </div>
        </fieldset>`:""}

        ${"browsertrix"===this.settingsTab?F`
        <p class="is-size-6 mb-3">Configure your credentials to upload archived items to Browsertrix Cloud.</p>
        <fieldset>
          <div class="field has-addons">
            <p class="is-expanded">
              Browsertrix Cloud URL:
              <input class="input is-small" type="url"
              name="btrixUrl" id="btrixUrl" value="${this.btrixOpts&&this.btrixOpts.url}"
              placeholder="https://...">
            </p>
          </div>
          <div class="field has-addons">
            <p class="is-expanded">
              Username
              <input class="input is-small" type="text"
              name="btrixUsername" id="btrixUsername" value="${this.btrixOpts&&this.btrixOpts.username}"
              placeholder="Username">
            </p>
          </div>
          <div class="field has-addons">
            <p class="is-expanded">
              Password
              <input class="input is-small" type="password"
              name="btrixPassword" id="btrixPassword" value="${this.btrixOpts&&this.btrixOpts.password}"
              placeholder="Password">
            </p>
          </div>
          <div class="field has-addons">
            <p class="is-expanded">
              Organization Name (Optional)
              <input class="input is-small" type="text"
              name="btrixOrgName" id="btrixOrgName" value="${this.btrixOpts&&this.btrixOpts.orgName}"
              placeholder="Organization (optional)">
            </p>
          </div>
        </fieldset>
        `:""}
        <div class="has-text-centered has-text-danger">${this.settingsError}</div>
        <div class="has-text-centered mt-4">
          <button class="button is-primary" type="submit">Save</button>
          <button class="button" type="button" @click="${this.onCancelSettings}">Cancel</button>
        </div>
      </form>
    </wr-modal>
    `}async onNewColl(e){this.showNew="loading",e.preventDefault();const t=this.renderRoot.querySelector("#new-title").value,i=JSON.stringify({metadata:{title:t}}),a=await fetch("./w/api/c/create",{method:"POST",body:i});await a.json();const r=this.renderRoot.querySelector("wr-rec-coll-index");r&&r.loadColls(),this.showNew=null}onSelectColl(e){this.selCollId=e.currentTarget.value}async setDefaultColl(){this.selCollId||(this.selCollId=await Uo("defaultCollId")),!this.selCollId&&this.colls&&this.colls.length&&(this.selCollId=this.colls[0].id),self.chrome&&self.chrome.storage&&self.chrome.storage.local&&self.localStorage&&(await Ao("index:sortKey",localStorage.getItem("index:sortKey")),await Ao("index:sortDesc",localStorage.getItem("index:sortDesc")))}_setCurrColl(e){if(!(e instanceof CustomEvent))return void this.setDefaultColl();const{detail:t}=e;this.selCollId=t.coll,this.colls&&this.colls.length||(this.colls=[{id:t.coll,title:t.title}])}async onShowStart(e){this._setCurrColl(e),this.recordUrl=e.detail.url||"https://example.com/",this.showStartRecord=!0}onShowImport(e){this._setCurrColl(e),this.showImport=!0,this.isImportExisting=!0}onCollsLoaded(e){this.colls=e.detail.colls,this.setDefaultColl()}async onStartRecord(e){e.preventDefault();const t=this.renderRoot.querySelector("#url").value,i=this.renderRoot.querySelector("#preview"),a=i&&i.checked;this.showStartRecord=!1;const r=this.autorun,o=this.selCollId;if(await Ao("defaultCollId",o),await Ao("autorunBehaviors",r?"1":"0"),self.chrome&&self.chrome.runtime)chrome.runtime.sendMessage({msg:"startNew",url:t,collId:o,autorun:r});else if(window.archivewebpage&&window.archivewebpage.record){const e=!a;window.archivewebpage.record({url:t,collId:o,startRec:e,autorun:r})}return!1}async onTitle(e){if(super.onTitle(e),this.embed&&this.loadedCollId&&e.detail.replayTitle&&e.detail.title)try{await fetch(`./w/api/c/${this.loadedCollId}/pageTitle`,{method:"POST",body:JSON.stringify(e.detail)})}catch(e){console.warn(e)}}async onSaveSettings(e){e.preventDefault();const t=this.renderRoot.querySelector("#ipfsDaemonUrl"),i=this.renderRoot.querySelector("#ipfsGatewayUrl"),a=this.renderRoot.querySelector("#ipfsAutoDetect");if(t&&i){const e=t.value,r=i.value,o=a&&a.checked;this.ipfsOpts={daemonUrl:e,useCustom:!!e,gatewayUrl:r,autoDetect:o},await this.checkIPFS(),localStorage.setItem("ipfsOpts",JSON.stringify(this.ipfsOpts))}const r=this.renderRoot.querySelector("#btrixUrl"),o=this.renderRoot.querySelector("#btrixUsername"),s=this.renderRoot.querySelector("#btrixPassword"),n=this.renderRoot.querySelector("#btrixOrgName");if(r&&o&&s){const e=r.value,t=o.value,i=s.value,a=n&&n.value||"";if(e&&t&&i){const r={url:e,username:t,password:i,orgName:a};let o;try{o=await Fr.login(r),this.settingsError=""}catch(e){return this.settingsError="Unable to log in to Browsertrix Cloud. Check your credentials.",!1}localStorage.setItem("btrixOpts",JSON.stringify(r)),this.btrixOpts={...r,client:o}}else this.btrixOpts=null,localStorage.removeItem("btrixOpts")}return localStorage.setItem("settingsTab",this.settingsTab),this.showSettings=!1,!1}async onCancelSettings(){this.settingsError=null,this.showSettings=!1}async checkIPFS(){const e=this.ipfsOpts;if(e.useCustom&&e.daemonUrl)e.message="IPFS Access -- Custom IPFS Daemon";else if(!e.daemonUrl&&e.autoDetect){const t=await wo({web3StorageToken:""});t instanceof So&&(e.daemonUrl=t.url),e.useCustom=!1,t instanceof $o?e.message="Sharing via remote web3.storage":e.daemonUrl?e.daemonUrl.startsWith("http://localhost:45")?e.message="Sharing via Brave IPFS node":e.daemonUrl.startsWith("http://localhost")?e.message="Sharing via local IPFS node":e.message="":e.message="IPFS Access Unknown - Sharing Not Available"}}}customElements.define("archive-web-page-app",Lo)})();var r=self;for(var o in a)r[o]=a[o];a.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();