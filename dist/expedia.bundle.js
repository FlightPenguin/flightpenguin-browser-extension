(()=>{"use strict";function t(){chrome.runtime.sendMessage({event:"FOCUS_WEBPAGE"})}function e(t,e){chrome.runtime.sendMessage({event:"FAILED_SCRAPER",source:t,description:"".concat(e.name," ").concat(e.message)})}function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,e)||r(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var i=/\.(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,a=/#(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,u=/\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?:\*|[\x2D0-9A-Z_a-z]*)\|)?(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+))/g,l={};function c(t){var e=l[t];if(e)return e;e=l[t]={attributes:!0,subtree:!0,childList:!0};var o,c=[],f=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){l=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(l)throw a}}}}(t.matchAll(u));try{for(f.s();!(o=f.n()).done;){var d=n(o.value,2)[1];if(d.startsWith("*")||d.startsWith("|"))return e;c.push(d.replace("|",":"))}}catch(t){f.e(t)}finally{f.f()}return i.test(t)&&c.push("class"),a.test(t)&&c.push("id"),0===c.length?e.attributes=!1:e.attributeFilter=c,e}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.timeout,r=void 0===n?2500:n,o=e.scope,i=void 0===o?document:o;return new Promise((function(e){var n=i.querySelector(t);if(null===n){var o=null,a=new MutationObserver((function(){var n=i.querySelector(t);null!==n&&(clearTimeout(o),a.disconnect(),e(n))}));a.observe(i,c(t)),o=setTimeout((function(){a.disconnect(),e(null)}),r)}else e(n)}))}function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.timeout,r=void 0===n?2500:n,o=e.scope,i=void 0===o?document:o;return new Promise((function(e){var n=null;if(null!==i.querySelector(t)){var o=new MutationObserver((function(){null===i.querySelector(t)&&(clearTimeout(n),o.disconnect(),e(!0))}));o.observe(i,c(t)),n=setTimeout((function(){o.disconnect(),e(!1)}),r)}else e(!0)}))}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&A(t,e)}function p(t){var e=w();return function(){var n,r=g(t);if(e){var o=g(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function h(t,e){return!e||"object"!==s(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function m(t){var e="function"==typeof Map?new Map:void 0;return(m=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return b(t,arguments,g(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),A(r,t)})(t)}function b(t,e,n){return(b=w()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&A(o,n.prototype),o}).apply(null,arguments)}function w(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var F=function(t){v(n,t);var e=p(n);function n(t){return y(this,n),e.call(this,t)}return n}(function(t){v(n,t);var e=p(n);function n(t){var r;return y(this,n),(r=e.call(this)).message=t,r.stack=(new Error).stack,r.name=r.constructor.name,r}return n}(m(Error))),S=function(t){v(n,t);var e=p(n);function n(t){return y(this,n),e.call(this,t)}return n}(F),C=function(t){v(n,t);var e=p(n);function n(t){return y(this,n),e.call(this,t)}return n}(F),D=function(t){v(n,t);var e=p(n);function n(t){return y(this,n),e.call(this,t)}return n}(F);function x(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}function E(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){x(i,r,o,a,u,"next",t)}function u(t){x(i,r,o,a,u,"throw",t)}a(void 0)}))}}var I=function(){var t=E((function*(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window.document;if(n.querySelector(e)){var r=yield d(e,{timeout:t,scope:n});if(!r)throw new S("Took longer than ".concat(t," ms to make the loading indicator (").concat(e,") disappear"))}}));return function(e,n){return t.apply(this,arguments)}}(),B=function(){var t=E((function*(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3,e=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window.document,r=n.querySelector(e);if(!r&&!(r=yield f(e,{timeout:t,scope:n})))throw new S("Render of ".concat(e," failed to complete in ").concat(t));return r}));return function(){return t.apply(this,arguments)}}(),T="button[data-icon='tool-close']",j=function(){var t=document.querySelector(T);if(!t)throw new D("Unable to find modal close element via ".concat(T));t.click()},k=function(t){return t.toLowerCase().replace(" ","").trim()};const O={airlineDetailsMap:{"American Airlines":{display:"American",color:"#C5423E",code:"AA"},American:{display:"American",color:"#C5423E",code:"AA"},Delta:{display:"Delta",color:"#EE722E",code:"DL"},Southwest:{display:"Southwest",color:"#F6C04D",code:"WN"},United:{display:"United",color:"#235EA6",code:"UA"},"Air Canada":{display:"Air Canada",color:"#E53222",code:"AC"},"Alaska Airlines":{display:"Alaska",color:"#51172C",code:"AS"},jetBlue:{display:"jetBlue",color:"#5F90C8",code:"B6"},"JetBlue Airways":{display:"jetBlue",color:"#5F90C8",code:"B6"},"Spirit Airlines":{display:"Spirit",color:"#BBB140",code:"NK"},WestJet:{display:"WestJet",color:"#4BA89C",code:"WS"},Aeromexico:{display:"Aeromexico",color:"#000000",code:"AM"},"Frontier Airlines":{display:"Frontier",color:"#378055",code:"F9"},Interjet:{display:"Interjet",color:"#A8A8A8",code:"4O"},"Hawaiian Airlines":{display:"Hawaiian",color:"#4D388A",code:"HA"},"Sun Country Airlines":{display:"Sun Country",color:"#D79A71",code:"SY"},"Porter Airlines":{display:"Porter",color:"#0F2B53",code:"PD"},"China Southern Airlines":{display:"China Southern",color:"#93ACCA",code:"CZ"},Lufthansa:{display:"Lufthansa",color:"#EFB95D",code:"LH"},SWISS:{display:"Swiss",color:"#D42D21",code:"LX"},"China Eastern Airlines":{display:"China Eastern",color:"#A9545F",code:"MU"},"British Airways":{display:"British",color:"#EA8E8C",code:"BA"},Iberia:{display:"Iberia",color:"#D05653",code:"IB"},"Air China":{display:"Air China",color:"#DF524B",code:"CA"},"Emirates Airlines":{display:"Emirates",color:"#CF534F",code:"EK"},"KLM-Royal Dutch Airlines":{display:"KLM",color:"#44A0DC",code:"KL"},"Air France":{display:"Air France",color:"#DB3832",code:"AF"},"Turkish Airlines":{display:"Turkish",color:"#DB3832",code:"TK"},"Cathay Pacific":{display:"Cathay",color:"#2A645A",code:"CX"},"Cathay Dragon":{display:"Cathay",color:"#2A645A",code:"CX"},"EVA Airways":{display:"EVA",color:"#6F9F64",code:"BR"},"China Airlines":{display:"China Airlines",color:"#DAABB1",code:"CI"},"ANA Airlines":{display:"ANA",color:"#254897",code:"NH"},"Japan Airlines":{display:"Japan Airlines",color:"#E56E69",code:"JL"},"Air India":{display:"Air India",color:"#D47346",code:"AI"},"Qantas Airways":{display:"Qantas",color:"#E34538",code:"QF"},"Singapore Airlines":{display:"Sinagpore",color:"#EFA952",code:"SQ"},"ANA (All Nippon Airways)":{display:"ANA",color:"#0f4a8d"},"Multiple airlines":{display:"Multiple",color:"#000000"}},getAirlineName:function(t){if(t&&"string"==typeof t){var e=t.trim(),n=this.airlineDetailsMap[e];return n&&(e=n.display),e}},getAirlineDetails:function(t){var e=t.trim();return this.airlineDetailsMap[e]||{display:e,color:"#DFCCFB"}}};var U="[data-test-id='select-link']",P=function(t){var e=t.querySelector(U);if(!e)throw new D("Unable to find modal open element via ".concat(U));e.click()};function R(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var L="summary",M=function(){var t,e=(t=function*(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3,n=yield f(L,{timeout:e});if(!n)throw new D("Unable to find collapsible open element via ".concat(L));n.click()},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){R(i,r,o,a,u,"next",t)}function u(t){R(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(t){return e.apply(this,arguments)}}();function _(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var q="[data-test-id='details-and-fares']:not(:empty)",N=function(){var t,e=(t=function*(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6e4,e=yield f(q,{timeout:t});if(!e)throw new D("Unable to locate modal after ".concat(t," ms"));return e},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){_(i,r,o,a,u,"next",t)}function u(t){_(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(){return e.apply(this,arguments)}}();function H(t,e){return t.toLowerCase().includes("pm")&&e.toLowerCase().includes("am")}function G(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return W(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var $=function(t,e,n){var r=G(t.children,3),o=r[0],i=r[1],a=r[2],u=K(o),l=J(a);return e>0&&H(null==n?void 0:n.toTime,u)?u+="+1":H(u,l)&&(l+="+1"),{fromTime:u,toTime:l,from:V(o),to:z(a),operatingAirline:Q(null==i?void 0:i.children[1]),duration:Z(null==i?void 0:i.children[0])}},J=function(t){var e,n=null===(e=t.textContent)||void 0===e?void 0:e.split(" - ")[0].toLowerCase().replace("arrival","");if(!n)throw new C("Unable to determine arrival time for layover");return k(n)},K=function(t){var e,n=null===(e=t.textContent)||void 0===e?void 0:e.split(" - ")[0].toLowerCase().replace("departure","");if(!n)throw new C("Unable to determine departure time for layover");return k(n)},z=function(t){var e,n,r,o,i,a=null===(e=t.textContent)||void 0===e?void 0:e.slice((null===(n=t.textContent)||void 0===n?void 0:n.indexOf("("))+1,null===(r=t.textContent)||void 0===r?void 0:r.indexOf(")"));3!==(null===(o=a)||void 0===o?void 0:o.length)&&(a=null===(i=t.textContent)||void 0===i?void 0:i.split("-")[1]);if(!a)throw new C("Unable to determine departure airport for layover");return a},V=function(t){var e,n,r,o,i,a=null===(e=t.textContent)||void 0===e?void 0:e.slice((null===(n=t.textContent)||void 0===n?void 0:n.indexOf("("))+1,null===(r=t.textContent)||void 0===r?void 0:r.indexOf(")"));3!==(null===(o=a)||void 0===o?void 0:o.length)&&(a=null===(i=t.textContent)||void 0===i?void 0:i.split("-")[1]);if(!a)throw new C("Unable to determine departure airport for layover");return a},Z=function(t){var e,n=null==t||null===(e=t.textContent)||void 0===e?void 0:e.replace("flight","");if(!n)throw new C("Unable to determine duration time for layover");return n},Q=function(t){var e,n,r=null==t||null===(e=t.textContent)||void 0===e||null===(n=e.match(/[A-z]*/g))||void 0===n?void 0:n.join(" ").trim();if(!r)throw new C("Unable to determine operating airline for layover");return r};function X(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||tt(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Y(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=tt(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw i}}}}function tt(t,e){if(t){if("string"==typeof t)return et(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?et(t,e):void 0}}function et(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function nt(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var rt="[data-test-id^='journey-section']",ot=function(){var t,e=(t=function*(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=yield f(rt,{timeout:e});if(!n)throw new D("Could not find ".concat(rt," in modal after ").concat(e," ms"));var r=t.querySelectorAll(rt);if(!r)throw new D("Could not find legs in modal");var o,i=[],a=Y(r.entries());try{for(a.s();!(o=a.n()).done;){var u=X(o.value,2),l=u[0],c=u[1],d=$(c,l,i[i.length-1]);i.push(d)}}catch(t){a.e(t)}finally{a.f()}if(!i)throw new F("Unable to identify layovers");return i},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){nt(i,r,o,a,u,"next",t)}function u(t){nt(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(t){return e.apply(this,arguments)}}();function it(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return at(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return at(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function at(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function ut(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var lt=function(){var t,e=(t=function*(t){var e=ct(t),n=e.marketingAirline,r=e.operatingAirline,o=ft(t),i=o.departureTime,a=o.arrivalTime,u=dt(t),l=u.duration,c=u.hasStops;P(t);var f=yield N();return yield M(f),{marketingAirline:n,operatingAirline:r,fromTime:i,toTime:a,duration:l,layovers:c?yield ot(f):[]}},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){ut(i,r,o,a,u,"next",t)}function u(t){ut(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(t){return e.apply(this,arguments)}}(),ct=function(t){var e,n,r,o=t.querySelector("[data-test-id='flight-operated']");if(!o)throw new D("Unable to lookup marketing airline");return o.childNodes.length>1?(n=o.childNodes[0],r=o.childNodes[1]):(n=o,r=null),{marketingAirline:O.getAirlineName(n.textContent),operatingAirline:r?null===(e=r.textContent)||void 0===e?void 0:e.split(/\s+operated\s+by\s+/)[1]:null}},ft=function(t){var e,n=t.querySelector("[data-test-id='arrival-time']");if(!n)throw new D("Unable to lookup flight arrival time");var r=it((null===(e=n.textContent)||void 0===e?void 0:e.split(" - "))||[null,null],2),o=r[0],i=r[1];if(!o)throw new C("Unable to determine departure time for flight");if(!i)throw new C("Unable to determine arrival time for flight");return{arrivalTime:k(i),departureTime:k(o)}},dt=function(t){var e,n,r=t.querySelector("[data-test-id='journey-duration']");if(!r)throw new D("Unable to lookup flight duration time");var o=null===(e=r.textContent)||void 0===e?void 0:e.split("(")[0].trim(),i=!(null!==(n=r.textContent)&&void 0!==n&&n.includes("Nonstop"));if(!o)throw new C("Unable to determine duration time for flight");return{duration:o,hasStops:i}};function st(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return yt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return yt(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw i}}}}function yt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function vt(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}function pt(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){vt(i,r,o,a,u,"next",t)}function u(t){vt(i,r,o,a,u,"throw",t)}a(void 0)}))}}var ht="[data-test-id='search-results']",mt=".uitk-loading-bar-current",bt=".uitk-progress-indicator-step-details-wrapper > a",wt="[data-test-id='loading-animation']",At="[data-test-id='loading-more-flights']",gt="[name='showMoreButton']",Ft="[data-test-id='offer-listing']",St=function(){var t=pt((function*(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4;if(yield B(3e3,ht),t&&(yield B(3e3,bt)),yield I(e,mt),yield I(e,wt),yield I(e,At),Ct())return[];yield Dt();var n,r=[],o=document.querySelectorAll(Ft),i=st(o);try{for(i.s();!(n=i.n()).done;){var a=n.value;if(!It(a)){var u=yield lt(a),l=null,c=null,f=null;t?(l=t,c=u,f=yield Et(a)):(l=u,f=yield xt()),a.dataset.fpid=Bt(u),r.push({departureFlight:l,returnFlight:c,fare:f}),j()}}}catch(t){i.e(t)}finally{i.f()}return r}));return function(){return t.apply(this,arguments)}}(),Ct=function(){return!!document.querySelector(".uitk-empty-state")},Dt=function(){var t=pt((function*(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e4,e=document.querySelector(gt);if(e){e.click();var n=yield d(gt,{timeout:t});if(!n)throw new S("Took longer than ${loadingTimeout} ms to load the show more flight results")}}));return function(){return t.apply(this,arguments)}}(),xt=function(){var t=pt((function*(){var t=(yield N()).querySelector("[data-test-id='fare-types-carousel'] .uitk-lockup-price");if(!t)throw new D("Unable to find fare in modal");return t.textContent}));return function(){return t.apply(this,arguments)}}(),Et=function(){var t=pt((function*(t){var e=t.querySelector(".uitk-price-subtext");if(!e)throw new D("Unable to find fare in card");return e.textContent}));return function(e){return t.apply(this,arguments)}}(),It=function(t){return["bargain fare","special fare","after booking"].some((function(e){var n;return null===(n=t.textContent)||void 0===n?void 0:n.includes(e)}))},Bt=function(t){return[t.fromTime,t.toTime,t.marketingAirline].join("-")};function Tt(t){return function(t){if(Array.isArray(t))return jt(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return jt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return jt(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function jt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function kt(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var Ot=function(){var t,e=(t=function*(t,e){Ut();var n,r=Pt(e||t);(n=r).style.border="10px solid #f2554b",n.style.borderRadius="6px",n.style.paddingTop="25px",n.style.paddingBottom="25px",n.dataset.selected="true",Rt(r)},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){kt(i,r,o,a,u,"next",t)}function u(t){kt(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(t,n){return e.apply(this,arguments)}}(),Ut=function(){var t,e=document.querySelector("[data-selected='true']");e&&((t=e).dataset.selected="false",t.style.border="",t.style.paddingTop="0px",t.style.paddingBottom="0px",t.style.borderRadius="0px")},Pt=function(t){var e=document.querySelectorAll("[data-test-id='offer-listing']");if(!e)throw new F("Unable to find flights in highlighting");var n,r,o=(n=Tt(e),r=t,n.find((function(t){return t.dataset.fpid===r})));if(!o)throw new D("Unable to find flight to highlight");return o},Rt=function(t){var e=window.pageYOffset+t.getBoundingClientRect().top-window.innerHeight/2;window.scroll(0,e)};function Lt(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}var Mt=function(){var t,e=(t=function*(t){var e=document.querySelector("[data-fpid='".concat(t.id,"']"));if(!(e||(yield St(),e=document.querySelector("[data-fpid='".concat(t.id,"']")))))throw new D("Unable to lookup departure flight");P(e);var n=yield N();_t(n)},function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){Lt(i,r,o,a,u,"next",t)}function u(t){Lt(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(t){return e.apply(this,arguments)}}(),_t=function(t){var e=t.querySelector("[data-test-id='select-button']");if(!e)throw new D("Unable to find select button");e.click()};function qt(t,e,n,r,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void n(t)}u.done?e(l):Promise.resolve(l).then(r,o)}function Nt(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){qt(i,r,o,a,u,"next",t)}function u(t){qt(i,r,o,a,u,"throw",t)}a(void 0)}))}}window.Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.onMessage.addListener(function(){var e=Nt((function*(e){switch(e.event){case"BEGIN_PARSING":yield Ht();break;case"GET_RETURN_FLIGHTS":yield Gt(e.departure);break;case"HIGHLIGHT_FLIGHT":yield Ot(e.selectedDepartureId,e.selectedReturnId),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#back-to-search";if(!document.querySelector(e)){var n=document.createElement("button");n.id="back-to-search",n.textContent="Return to FlightPenguin",n.title="Click to return to FlightPenguin and keep browsing.",n.addEventListener("click",t),document.body.append(n)}}();break;case"CLEAR_SELECTION":history.back(),chrome.runtime.sendMessage({event:"PROVIDER_READY",provider:"expedia"})}}));return function(t){return e.apply(this,arguments)}}());var Ht=function(){var t=Nt((function*(){try{!function(t,e){chrome.runtime.sendMessage({event:"FLIGHT_RESULTS_RECEIVED",flights:e,provider:t})}("expedia",yield St(null))}catch(t){window.Sentry.captureException(t),e("expedia",t)}}));return function(){return t.apply(this,arguments)}}(),Gt=function(){var t=Nt((function*(t){yield Mt(t);try{!function(t,e){chrome.runtime.sendMessage({event:"RETURN_FLIGHTS_RECEIVED",flights:e,provider:t})}("expedia",yield St(t))}catch(t){window.Sentry.captureException(t),e("expedia",t)}}));return function(e){return t.apply(this,arguments)}}()})();