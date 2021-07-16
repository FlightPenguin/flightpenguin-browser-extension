(()=>{"use strict";const e=function(e){return e.toLowerCase().replace(" ","").trim()},t={airlineDetailsMap:{"American Airlines":{display:"American",color:"#C5423E",code:"AA"},American:{display:"American",color:"#C5423E",code:"AA"},Delta:{display:"Delta",color:"#EE722E",code:"DL"},Southwest:{display:"Southwest",color:"#F6C04D",code:"WN"},United:{display:"United",color:"#235EA6",code:"UA"},"Air Canada":{display:"Air Canada",color:"#E53222",code:"AC"},"Alaska Airlines":{display:"Alaska",color:"#51172C",code:"AS"},jetBlue:{display:"jetBlue",color:"#5F90C8",code:"B6"},"JetBlue Airways":{display:"jetBlue",color:"#5F90C8",code:"B6"},"Spirit Airlines":{display:"Spirit",color:"#BBB140",code:"NK"},WestJet:{display:"WestJet",color:"#4BA89C",code:"WS"},Aeromexico:{display:"Aeromexico",color:"#000000",code:"AM"},"Frontier Airlines":{display:"Frontier",color:"#378055",code:"F9"},Interjet:{display:"Interjet",color:"#A8A8A8",code:"4O"},"Hawaiian Airlines":{display:"Hawaiian",color:"#4D388A",code:"HA"},"Sun Country Airlines":{display:"Sun Country",color:"#D79A71",code:"SY"},"Porter Airlines":{display:"Porter",color:"#0F2B53",code:"PD"},"China Southern Airlines":{display:"China Southern",color:"#93ACCA",code:"CZ"},Lufthansa:{display:"Lufthansa",color:"#EFB95D",code:"LH"},SWISS:{display:"Swiss",color:"#D42D21",code:"LX"},"China Eastern Airlines":{display:"China Eastern",color:"#A9545F",code:"MU"},"British Airways":{display:"British",color:"#EA8E8C",code:"BA"},Iberia:{display:"Iberia",color:"#D05653",code:"IB"},"Air China":{display:"Air China",color:"#DF524B",code:"CA"},"Emirates Airlines":{display:"Emirates",color:"#CF534F",code:"EK"},"KLM-Royal Dutch Airlines":{display:"KLM",color:"#44A0DC",code:"KL"},"Air France":{display:"Air France",color:"#DB3832",code:"AF"},"Turkish Airlines":{display:"Turkish",color:"#DB3832",code:"TK"},"Cathay Pacific":{display:"Cathay",color:"#2A645A",code:"CX"},"Cathay Dragon":{display:"Cathay",color:"#2A645A",code:"CX"},"EVA Airways":{display:"EVA",color:"#6F9F64",code:"BR"},"China Airlines":{display:"China Airlines",color:"#DAABB1",code:"CI"},"ANA Airlines":{display:"ANA",color:"#254897",code:"NH"},"Japan Airlines":{display:"Japan Airlines",color:"#E56E69",code:"JL"},"Air India":{display:"Air India",color:"#D47346",code:"AI"},"Qantas Airways":{display:"Qantas",color:"#E34538",code:"QF"},"Singapore Airlines":{display:"Sinagpore",color:"#EFA952",code:"SQ"},"ANA (All Nippon Airways)":{display:"ANA",color:"#0f4a8d"}},getAirlineName:function(e){if(!e||"string"!=typeof e)return;let t=e.trim();const i=this.airlineDetailsMap[t];return i&&(t=i.display),t},getAirlineDetails:function(e){let t=e.trim();return this.airlineDetailsMap[t]||{display:t,color:"#DFCCFB"}}};function i(e,t){return e.toLowerCase().includes("pm")&&t.toLowerCase().includes("am")}Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"});const o={};let r,n;async function a(e,t=null,i=10){try{if(i<1)return document.querySelector("[data-test-id='loading-animation']")&&await a(e,t),Sentry.captureException(o.lastError,{extra:{callback:e,sendEvent:t}}),void chrome.runtime.sendMessage({event:"NO_FLIGHTS_FOUND",provider:"expedia"});let r=await e();t&&t(r);const n=document.querySelector("[name='showMoreButton']");n&&(n.click(),await u(),r=await e(),r&&!r.length&&(await u(),r=await e()),t&&t(r))}catch(r){o.lastError=r,await u(),await a(e,t,--i)}}function l(e){chrome.runtime.sendMessage({event:"FLIGHT_RESULTS_RECEIVED",flights:e,provider:"expedia"})}function s(e){chrome.runtime.sendMessage({event:"RETURN_FLIGHTS_RECEIVED",flights:e,provider:"expedia"})}function c(e,t,i){const o=document.querySelector(`${i}[data-selected='true']`);o&&(o.dataset.selected="false",o.style.border="");let r=e;t&&(r+=`-${t}`);const n=(a=Array.from(document.querySelectorAll(i)),l=r,a.find((e=>e.dataset.id===l)));var a,l;n.style.border="10px solid #f2554b",n.style.borderRadius="6px",n.style.paddingTop="20px",n.style.paddingBottom="20px",n.dataset.selected="true";const s=window.pageYOffset+n.getBoundingClientRect().top-window.innerHeight/2;window.scroll(0,s)}function d(){return new Promise((e=>{setTimeout(e,500)}))}function u(){return new Promise((e=>{setTimeout(e,2e3)}))}function p(){const e=document.querySelector(A.flightContainer);if(!e)return;const t=!e.dataset.id?A.flightContainer:A.flightContainerSecondPass;return Array.from(document.querySelectorAll(t))}async function m(){const o=p();if(!o)return Promise.reject();if(0===o.length)throw new Error("Empty results");const a=[];for(let l=0;l<o.length;l++){if(n)return;const s=o[l];try{const o={};let n=s.querySelector(A.marketingAirline),l=s.querySelector(A.operatingAirline);n.childNodes.length>1&&([n,l]=n.childNodes),o.marketingAirline=t.getAirlineName(n.textContent),l&&([_,o.operatingAirline]=l.textContent.split("operated by ")),s.querySelector(A.clickToOpenModal).click(),await d();let c=document.querySelector(A.modalViewContainerDesktop);c||(c=document.querySelector(A.modalViewContainerMobile));const u=c.querySelector(A.modalViewSummaryContainer),[p,m]=Array.from(u.querySelectorAll("span:not(.is-visually-hidden)")).map((e=>e.textContent));[o.fromTime,o.toTime]=p.split(" - "),o.fromTime=e(o.fromTime),o.toTime=e(o.toTime);let y=u.textContent.match(/(\+\d)/);y&&(o.toTime+=y[0]),[o.duration]=m.split("(");const h=!m.includes("Nonstop");c.querySelector(A.openModalViewLegsContainer).click();const C=c.querySelector(A.modalViewLegsContainer).children,f=[];if(h)for(let t=0;t<C.length;t++){const[o,r,n]=C[t].children;let a=o.textContent,l=a.split(" - ")[0].toLowerCase().replace("departure",""),s=a.slice(a.indexOf("(")+1,a.indexOf(")"));3!==s.length&&(s=a.split("-")[1]);let c=r.children[0].textContent.replace("flight",""),d=r.children[1].textContent.match(/[A-z]*/g).join(" ").trim(),u=n.textContent,p=u.split(" - ")[0].toLowerCase().replace("arrival","");t>0&&i(f[f.length-1].toTime,l)?l+="+1":i(l,p)&&(p+="+1");let m=u.slice(u.indexOf("(")+1,u.indexOf(")"));3!==m.length&&(m=u.split("-")[1]),f.push({fromTime:e(l),toTime:e(p),from:s,to:m,operatingAirline:d,duration:c})}o.layovers=f;let g=null,S=null,w=null;r?(s.dataset.id=[r.id,o.fromTime,o.toTime,o.marketingAirline].join("-"),g=r,S=o,w=s.querySelector(A.listFare).textContent):(s.dataset.id=[o.fromTime,o.toTime,o.marketingAirline].join("-"),g=o,w=c.querySelector(A.modalFare).textContent),a.push({departureFlight:g,returnFlight:S,fare:w}),c.querySelector(A.closeModalViewButton).click()}catch(e){}}return a}function y(i=""){const o=p();for(let r of o){let[o,n]=r.querySelector("[data-test-id='departure-time']").textContent.split(" - ");const a=r.querySelector("[data-test-id='arrives-next-day']");a&&(n+=a.textContent.trim());let l=r.querySelector(A.marketingAirline).textContent;l=t.getAirlineName(l);const s=[];i&&s.push(i),s.push(e(o),e(n),l.trim());const c=s.join("-");if(r.dataset.id=c,i===c)return}}chrome.runtime.onMessage.addListener((async function(e){switch(e.event){case"BEGIN_PARSING":a(m,l);break;case"GET_RETURN_FLIGHTS":r=e.departure,await async function(e){let t=document.querySelector(`[data-id='${e}']`);t||(await a((()=>y(e))),t=document.querySelector(`[data-id='${e}']`));t.querySelector("button").click(),document.querySelector('[data-test-id="select-button"]').click(),await d();try{await a(m,s)}catch(e){chrome.runtime.sendMessage({event:"FAILED_SCRAPER",source:"expedia",description:`${e.name} ${e.message}`})}}(e.departure.id);break;case"HIGHLIGHT_FLIGHT":n=!0;const{selectedDepartureId:t,selectedReturnId:i}=e;try{c(t,i,A.flightContainer)}catch(e){c(t,i,h.flightContainer)}!function(){if(document.querySelector("#back-to-search"))return;const e=document.createElement("button");e.id="back-to-search",e.innerText="Return to FlightPenguin",e.title="Click to return to FlightPenguin and keep browsing.",e.addEventListener("click",(()=>{chrome.runtime.sendMessage({event:"FOCUS_WEBPAGE"})})),document.body.append(e)}();break;case"CLEAR_SELECTION":n=!1,r=null,history.back(),await u(),await a(y),chrome.runtime.sendMessage({event:"EXPEDIA_READY"})}}));const A={flightContainer:"[data-test-id='offer-listing']",flightContainerSecondPass:"[data-test-id='offer-listing']:not([data-id])",marketingAirline:"[data-test-id='flight-operated']",operatingAirline:"[data-test-id='operated-by']",modalFare:"[data-test-id='fare-types-carousel'] .uitk-lockup-price",listFare:".uitk-price-subtext",clickToOpenModal:"[data-test-id='select-link']",modalViewContainerDesktop:"[data-test-id='listing-details-and-fares']:not(:empty)",modalViewContainerMobile:".uitk-dialog-content",openModalViewLegsContainer:"[data-test-id='show-details-link'] button",modalViewLegsContainer:"[data-test-id='flight-details']",modalViewSummaryContainer:"[data-test-id='flight-summary']",closeModalViewButton:"button[data-icon='tool-close']"},h={flightContainer:".flight-module.segment.offer-listing",loadingSelector:"#skeleton-listing"}})();