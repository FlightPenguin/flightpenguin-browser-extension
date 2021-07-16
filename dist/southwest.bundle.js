(()=>{"use strict";const e=function(e){return e.toLowerCase().replace(" ","").trim()};function t(){chrome.runtime.sendMessage({event:"FOCUS_WEBPAGE"})}function r(e,t){return e.find((e=>e.dataset.id===t))}function n(e){let[t,r]=e.split(":");t=Number(t);const n=t>=12?"PM":"AM";return 0===t?t=12:t>12&&(t-=12),`${t}:${r}${n}`}function o(e){return`${Math.floor(e/60)}h ${e%60}m`}function i(t){let r=[];t.segments.length>1&&(r=t.segments.map((({stopsDetails:t})=>t.map((t=>({fromTime:e(n(t.departureTime)),toTime:e(n(t.arrivalTime)),operatingAirline:"Southwest",duration:o(t.legDuration),from:t.originationAirportCode,to:t.destinationAirportCode}))))),r=r.flat());let i=t.fareProducts?.ADULT?.WGA?.fare?.totalFare?.value;return i=i||t.fareProducts?.ADULT?.ANY?.fare?.totalFare?.value,i=i||t.fareProducts?.ADULT?.BUS?.fare?.totalFare?.value,i?{fromTime:e(n(t.departureTime)),toTime:e(n(t.arrivalTime)),marketingAirline:"Southwest",layovers:r,fare:Math.round(Number(i)),currency:"$",duration:o(t.totalDuration),from:t.originationAirportCode,to:t.destinationAirportCode}:null}function a(t){return[...t].map((t=>{const r={},[n,o]=[...t.querySelectorAll(".time--value")].map((e=>e.textContent)),i=e(n).replace("departs",""),a=e(o).replace("arrives","");return r.fromTime=i,r.toTime=a,r.airline="Southwest",t.dataset.id=[r.fromTime,r.toTime,r.airline].join("-"),r}))}Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.onMessage.addListener((function(e,n,o){switch(e.event){case"STOP_PARSING":break;case"BEGIN_PARSING":const n=window.setInterval((()=>{const e=JSON.parse(window.sessionStorage.getItem("AirBookingSearchResultsSearchStore-searchResults-v1"));e&&e.searchResults&&(!function(e){if(!e)return;let[t,r]=e.searchResults.airProducts;if(t&&0===t.details.length||r&&0===r.details.length)return void chrome.runtime.sendMessage({event:"NO_FLIGHTS_FOUND",provider:"southwest"});t=t.details,r=r?r.details:[];const n=function(e,t){const r=[];if(t.length>0)for(let n of e){const e=i(n);if(e)for(let n of t){const t=i(n);t&&r.push({departureFlight:e,returnFlight:t,fare:e.fare+t.fare,currency:e.currency})}}else for(let t of e){const e=i(t);e&&r.push({departureFlight:e,fare:e.fare,currency:e.currency})}return r}(t,r);chrome.runtime.sendMessage({event:"FLIGHT_RESULTS_RECEIVED",flights:n,provider:"southwest"})}(e),window.clearInterval(n))}),500);break;case"HIGHLIGHT_FLIGHT":const{selectedDepartureId:o,selectedReturnId:s}=e;!function(){const[e,t]=document.querySelectorAll(".transition-content.price-matrix--details-area ul"),r=e.querySelectorAll("li:not([data-visited='true']");let n=[];if(t){const e=t.querySelectorAll("li:not([data-visited='true']");n=n.concat(a(e))}n=n.concat(a(r))}(),function(e,t){const[n,o]=document.querySelectorAll(".transition-content.price-matrix--details-area ul"),i=n.querySelector("[data-selected='true']");i&&(i.dataset.selected="false",i.style.border="");const a=r([...n.children],e);if(a.style.border="10px solid #f2554b",a.style.borderRadius="6px",a.style.paddingTop="25px",a.style.paddingBottom="25px",a.dataset.selected="true",t){const e=o.querySelector("[data-selected='true']");e&&(e.dataset.selected="false",e.style.border="");const n=r([...o.children],t);n.style.border="10px solid #f2554b",n.style.borderRadius="6px",n.style.paddingTop="25px",n.style.paddingBottom="25px",n.dataset.selected="true"}const s=window.pageYOffset+a.getBoundingClientRect().top-window.innerHeight/2;window.scroll(0,s)}(o,s),function(){if(document.querySelector("#back-to-search"))return;const e=document.createElement("button");e.id="back-to-search",e.textContent="Return to FlightPenguin",e.title="Click to return to FlightPenguin and keep browsing.",e.addEventListener("click",t),document.body.append(e)}()}}))})();