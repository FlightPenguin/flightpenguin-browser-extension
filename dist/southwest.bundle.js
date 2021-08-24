(()=>{"use strict";var e=function(e){return e.toLowerCase().replace(" ","").trim()};function t(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=o(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){u=!0,i=e},f:function(){try{l||null==r.return||r.return()}finally{if(u)throw i}}}}function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw a}}return r}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(){chrome.runtime.sendMessage({event:"FOCUS_WEBPAGE"})}function l(e,t){return e.find((function(e){return e.dataset.id===t}))}function u(e){var t=n(e.split(":"),2),r=t[0],o=t[1],a=(r=Number(r))>=12?"PM":"AM";return 0===r?r=12:r>12&&(r-=12),"".concat(r,":").concat(o).concat(a)}function c(e){var t=Math.floor(e/60),r=e%60;return"".concat(t,"h ").concat(r,"m")}function d(t){var r,n,o,a,i,l,d,s,f,v,m,y,p,h,b,g=[];t.segments.length>1&&(g=(g=t.segments.map((function(t){return t.stopsDetails.map((function(t){return{fromTime:e(u(t.departureTime)),toTime:e(u(t.arrivalTime)),operatingAirline:"Southwest",duration:c(t.legDuration),from:t.originationAirportCode,to:t.destinationAirportCode}}))}))).flat());var S=null===(r=t.fareProducts)||void 0===r||null===(n=r.ADULT)||void 0===n||null===(o=n.WGA)||void 0===o||null===(a=o.fare)||void 0===a||null===(i=a.totalFare)||void 0===i?void 0:i.value;return(S=(S=S||(null===(l=t.fareProducts)||void 0===l||null===(d=l.ADULT)||void 0===d||null===(s=d.ANY)||void 0===s||null===(f=s.fare)||void 0===f||null===(v=f.totalFare)||void 0===v?void 0:v.value))||(null===(m=t.fareProducts)||void 0===m||null===(y=m.ADULT)||void 0===y||null===(p=y.BUS)||void 0===p||null===(h=p.fare)||void 0===h||null===(b=h.totalFare)||void 0===b?void 0:b.value))?{fromTime:e(u(t.departureTime)),toTime:e(u(t.arrivalTime)),marketingAirline:"Southwest",layovers:g,fare:Math.round(Number(S)),currency:"$",duration:c(t.totalDuration),from:t.originationAirportCode,to:t.destinationAirportCode}:null}function s(t){return r(t).map((function(t){var o={},a=n(r(t.querySelectorAll(".time--value")).map((function(e){return e.textContent})),2),i=a[0],l=a[1],u=e(i).replace("departs",""),c=e(l).replace("arrives","");return o.fromTime=u,o.toTime=c,o.airline="Southwest",t.dataset.id=[o.fromTime,o.toTime,o.airline].join("-"),o}))}Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.onMessage.addListener((function(e,o,a){switch(e.event){case"STOP_PARSING":break;case"BEGIN_PARSING":var u=window.setInterval((function(){var e=JSON.parse(window.sessionStorage.getItem("AirBookingSearchResultsSearchStore-searchResults-v1"));e&&e.searchResults&&(!function(e){if(!e)return;var r=n(e.searchResults.airProducts,2),o=r[0],a=r[1];if(o&&0===o.details.length||a&&0===a.details.length)return void chrome.runtime.sendMessage({event:"NO_FLIGHTS_FOUND",provider:"southwest"});o=o.details,a=a?a.details:[];var i=function(e,r){var n=[];if(r.length>0){var o,a=t(e);try{for(a.s();!(o=a.n()).done;){var i=d(o.value);if(i){var l,u=t(r);try{for(u.s();!(l=u.n()).done;){var c=d(l.value);c&&n.push({departureFlight:i,returnFlight:c,fare:i.fare+c.fare,currency:i.currency})}}catch(e){u.e(e)}finally{u.f()}}}}catch(e){a.e(e)}finally{a.f()}}else{var s,f=t(e);try{for(f.s();!(s=f.n()).done;){var v=d(s.value);v&&n.push({departureFlight:v,fare:v.fare,currency:v.currency})}}catch(e){f.e(e)}finally{f.f()}}return n}(o,a);chrome.runtime.sendMessage({event:"FLIGHT_RESULTS_RECEIVED",flights:i,provider:"southwest"})}(e),window.clearInterval(u))}),500);break;case"HIGHLIGHT_FLIGHT":var c=e.selectedDepartureId,f=e.selectedReturnId;!function(){var e=n(document.querySelectorAll(".transition-content.price-matrix--details-area ul"),2),t=e[0],r=e[1],o=t.querySelectorAll("li:not([data-visited='true']"),a=[];if(r){var i=r.querySelectorAll("li:not([data-visited='true']");a=a.concat(s(i))}a=a.concat(s(o))}(),function(e,t){var o=n(document.querySelectorAll(".transition-content.price-matrix--details-area ul"),2),a=o[0],i=o[1],u=a.querySelector("[data-selected='true']");u&&(u.dataset.selected="false",u.style.border="");var c=l(r(a.children),e);if(c.style.border="10px solid #f2554b",c.style.borderRadius="6px",c.style.paddingTop="25px",c.style.paddingBottom="25px",c.dataset.selected="true",t){var d=i.querySelector("[data-selected='true']");d&&(d.dataset.selected="false",d.style.border="");var s=l(r(i.children),t);s.style.border="10px solid #f2554b",s.style.borderRadius="6px",s.style.paddingTop="25px",s.style.paddingBottom="25px",s.dataset.selected="true"}var f=window.pageYOffset+c.getBoundingClientRect().top-window.innerHeight/2;window.scroll(0,f)}(c,f),function(){if(document.querySelector("#back-to-search"))return;var e=document.createElement("button");e.id="back-to-search",e.textContent="Return to FlightPenguin",e.title="Click to return to FlightPenguin and keep browsing.",e.addEventListener("click",i),document.body.append(e)}()}}))})();