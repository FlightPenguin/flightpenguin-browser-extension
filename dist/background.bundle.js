(()=>{"use strict";const e={airlineDetailsMap:{"American Airlines":{display:"American",color:"#C5423E",code:"AA"},American:{display:"American",color:"#C5423E",code:"AA"},Delta:{display:"Delta",color:"#EE722E",code:"DL"},Southwest:{display:"Southwest",color:"#F6C04D",code:"WN"},United:{display:"United",color:"#235EA6",code:"UA"},"Air Canada":{display:"Air Canada",color:"#E53222",code:"AC"},"Alaska Airlines":{display:"Alaska",color:"#51172C",code:"AS"},jetBlue:{display:"jetBlue",color:"#5F90C8",code:"B6"},"JetBlue Airways":{display:"jetBlue",color:"#5F90C8",code:"B6"},"Spirit Airlines":{display:"Spirit",color:"#BBB140",code:"NK"},WestJet:{display:"WestJet",color:"#4BA89C",code:"WS"},Aeromexico:{display:"Aeromexico",color:"#000000",code:"AM"},"Frontier Airlines":{display:"Frontier",color:"#378055",code:"F9"},Interjet:{display:"Interjet",color:"#A8A8A8",code:"4O"},"Hawaiian Airlines":{display:"Hawaiian",color:"#4D388A",code:"HA"},"Sun Country Airlines":{display:"Sun Country",color:"#D79A71",code:"SY"},"Porter Airlines":{display:"Porter",color:"#0F2B53",code:"PD"},"China Southern Airlines":{display:"China Southern",color:"#93ACCA",code:"CZ"},Lufthansa:{display:"Lufthansa",color:"#EFB95D",code:"LH"},SWISS:{display:"Swiss",color:"#D42D21",code:"LX"},"China Eastern Airlines":{display:"China Eastern",color:"#A9545F",code:"MU"},"British Airways":{display:"British",color:"#EA8E8C",code:"BA"},Iberia:{display:"Iberia",color:"#D05653",code:"IB"},"Air China":{display:"Air China",color:"#DF524B",code:"CA"},"Emirates Airlines":{display:"Emirates",color:"#CF534F",code:"EK"},"KLM-Royal Dutch Airlines":{display:"KLM",color:"#44A0DC",code:"KL"},"Air France":{display:"Air France",color:"#DB3832",code:"AF"},"Turkish Airlines":{display:"Turkish",color:"#DB3832",code:"TK"},"Cathay Pacific":{display:"Cathay",color:"#2A645A",code:"CX"},"Cathay Dragon":{display:"Cathay",color:"#2A645A",code:"CX"},"EVA Airways":{display:"EVA",color:"#6F9F64",code:"BR"},"China Airlines":{display:"China Airlines",color:"#DAABB1",code:"CI"},"ANA Airlines":{display:"ANA",color:"#254897",code:"NH"},"Japan Airlines":{display:"Japan Airlines",color:"#E56E69",code:"JL"},"Air India":{display:"Air India",color:"#D47346",code:"AI"},"Qantas Airways":{display:"Qantas",color:"#E34538",code:"QF"},"Singapore Airlines":{display:"Sinagpore",color:"#EFA952",code:"SQ"},"ANA (All Nippon Airways)":{display:"ANA",color:"#0f4a8d"}},getAirlineName:function(e){if(!e||"string"!=typeof e)return;let t=e.trim();const i=this.airlineDetailsMap[t];return i&&(t=i.display),t},getAirlineDetails:function(e){let t=e.trim();return this.airlineDetailsMap[t]||{display:t,color:"#DFCCFB"}}},t=["Aer Lingus Regional","Aeromexico Connect","SkyWest","Alaska Horizon","Horizon Air","Alitalia CityLiner","Air Canada Express","Air New Zealand Link","American Eagle","Delta Connection","Fiji Link","HOP!","Iberia Regional","KLM Cityhopper","Lufthansa Regional","Moçambique Expresso","Ohana by Hawaiian","PAL Express","QantasLink","South African Express","TAP Express","Tunisair Express","United Express","Virgin Australia Regional Airlines","WestJet Encore","WestJet Link"];function i(e,t){let i=e.toLowerCase(),[r,o]=i.split(":");r=Number(r);let n=Number(o.replace(/(pm)|(am)|(\+\d)/g,"").trim());if(t){const t=e.match(/(\+\d)/);t&&(r+=24*t[0].split("+")[1])}return i.includes("pm")&&r%12!=0?r+=12:i.includes("am")&&r%12==0&&(r-=12),{hours:r,minutes:n}}function r(e){let t,i;e.includes("h")?[t,i]=e.split("h"):(t=0,i=e);let r=i.trim().split("m")[0]||0;return Number(r)+60*Number(t)}function o(e,t,o){let{hours:n,minutes:s}=i(e),{hours:a,minutes:l}=i(t);const c=t.match(/(\+\d)/),d=e.match(/(\+\d)/);let p=0,u=0;if(d){const[e,t]=d[0].split("+");p+=Number(t),u=p}if(c){const[e,t]=c[0].split("+");u+=Number(t)}const h=60*(n+24*p)+s,m=60*(a+24*u)+l;return r(o)-(m-h)}function n(e){const{hours:t,minutes:r}=i(e,!0),o=e.toLowerCase().match(/(pm)|(am)/)[0],n=e.match(/(\+\d)/);return{hours:t,displayHours:Number(e.split(":")[0]),minutes:r,timeOfDay:o,excessDays:n?n[0]:n}}function s(i,o,s,l,c,d){this.fromTime=i,this.toTime=o,this.fromTimeDetails=n(i),this.toTimeDetails=n(o);let p=s?s.replace("Operated by","").replace("Partially operated by",""):s;p=e.getAirlineName(p);const u=e.getAirlineName(l);if(p){const e=s.includes("Partially operated by");(function(e){const i=e.toLowerCase(),r=t.find((e=>i.includes(e.toLowerCase())));return Boolean(r)})(p)||e?(this.operatingAirline=u,this.marketingAirlineText=e?s:`Operated by ${p}`):(this.operatingAirline=p,this.marketingAirlineText=`Marketed by ${u}`)}else this.operatingAirline=u;this.operatingAirline=a(this.operatingAirline),this.id=`${this.fromTime}-${this.toTime}-${u}`,this.duration=c,this.durationMinutes=r(c),this.layovers=d||[],this.itinIds=[],this.timezoneOffset=this.calculateTimezoneOffset()}function a(t){let i=[t];t.includes("Partially operated by")?i=t.split("Partially operated by "):t.includes("Operated by")&&(i=t.split("Operated by"));const r=i[i.length-1].trim().split(" + ");let o;return o=1===r.length?r[0]:r.map((t=>e.getAirlineName(t.replace("  "," ")))).join(", "),e.getAirlineDetails(o.replace("  "," "))}function l(e,t){for(let[i,r]of Object.entries(e)){let e=1;if(r.layovers.length)for(let t=1;t<r.layovers.length;t++)if(r.layovers[t-1].to!==r.layovers[t].from){e=2;break}const i=t[r.itinIds.sort(((e,i)=>t[e].fareNumber-t[i].fareNumber))[0]].fareNumber;r.pain=(Math.log2(r.durationMinutes)+Math.log2(i)+r.layovers.length)*e}return Object.values(e).sort(((e,t)=>e.pain-t.pain))}function c(e,t,i,r,o,n,a,l){this.depFlight=l?e:new s(e.fromTime,e.toTime,e.operatingAirline,e.marketingAirline,e.duration,e.layovers),t?(this.retFlight=new s(t.fromTime,t.toTime,t.operatingAirline,t.marketingAirline,t.duration,t.layovers),this.id=`${this.depFlight.id}-${this.retFlight.id}`):this.id=this.depFlight.id,this.provider=o,this.windowId=n,this.tabId=a,this.fareNumber=Number(`${i}`.match(/\d+/g).join("")),this.currency=r}function d(e,t,i,r,o,n,s=!1){const a={};return e.forEach((e=>{const l=new c(e.departureFlight,e.returnFlight,e.fare,e.currency,r,o,n,s);t[l.depFlight.id]?l.depFlight=t[l.depFlight.id]:t[l.depFlight.id]=l.depFlight,l.retFlight&&(a[l.retFlight.id]?l.retFlight=a[l.retFlight.id]:a[l.retFlight.id]=l.retFlight,l.retFlight.itinIds.push(l.id)),l.depFlight.itinIds.push(l.id),i[l.id]=l})),{itins:i,departures:t,returns:a}}s.prototype.calculateTimezoneOffset=function(){let e=0;if(this.layovers.length){const t=this.layovers.map((({fromTime:t,toTime:i,duration:r,operatingAirline:n},s)=>(e+=o(t,i,r),{...this.layovers[s],operatingAirline:a(n),timezoneOffset:e}))),i=[];for(let e=0;e<t.length-1;e++){const r=t[e],o=t[e+1];let{toTime:n,to:s}=r,{fromTime:a,from:l}=o;i.push(r),i.push({fromTime:n,toTime:a,from:s,to:l,isLayoverStop:!0,operatingAirline:{display:`Layover at ${s}.`,color:"transparent"}})}i.push(t[t.length-1]),this.layovers=i}else e=o(this.fromTime,this.toTime,this.duration);return e};const p="https://subscribe.flightpenguin.com";Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6",(function(){Sentry.captureMessage("uninstall")})),chrome.runtime.onInstalled.addListener((function(){console.log("Is this thing on?")}));let u=!1;chrome.browserAction.onClicked.addListener((function(){u||(u=!0,chrome.identity.getAuthToken({interactive:!0},(async e=>{const{email:t}=await function(e){const t=new Headers;t.append("Authorization","Bearer "+e);const i=new Request("https://www.googleapis.com/oauth2/v1/userinfo?alt=json",{method:"GET",headers:t});return fetch(i).then((e=>{if(200===e.status)return e.json();throw e.status}))}(e);fetch(`${p}/get-customer/${t}`).then((e=>e.json())).then((({customer:e})=>{e&&(e.stripeSubscriptionId||e.skipSubscription)?k({}):chrome.tabs.create({url:p})})).catch((e=>{console.error(e),chrome.tabs.create({url:p})})).finally((()=>u=!1))})))}));let h,m,f,A,y={},g={},E={},b=[],T={},w={},C=!1,D=!1,L=!0,F=[],I=0,S=new Set,N=new Set,v={};function $(e){h?chrome.tabs.get(h,(t=>{t?chrome.tabs.sendMessage(t.id,e):k(e)})):k(e)}function _(e){chrome.windows.update(g[e.provider],{focused:!0},(t=>{chrome.tabs.sendMessage(e.tabId,{event:"HIGHLIGHT_FLIGHT",selectedDepartureId:e.depFlight.id,selectedReturnId:e.retFlight?e.retFlight.id:"",provider:e.provider})}))}function R(){Object.values(g).forEach((e=>{chrome.windows.remove(e)}))}function k(e){chrome.tabs.create({url:chrome.extension.getURL("./index.html")},(t=>{window.setTimeout((()=>{chrome.tabs.sendMessage(t.id,e)}),1e3),m=t.windowId,h=t.id,f=t.index}))}chrome.runtime.onMessage.addListener((function(e,t,i){switch(console.info(e.event,e),e.event){case"FORM_DATA_RECEIVED":E={...e.formData,from:e.formData.from.toUpperCase(),to:e.formData.to.toUpperCase()},async function(e,t){const{searchByPoints:i}=e;let r=[];r=i?["expedia"]:["southwest","skyscanner","expedia"];const o=r.map((i=>function(e,t,i,r){const{height:o,width:n,left:s,top:a}=i;return new Promise((i=>{chrome.windows.create({url:e,focused:!1,height:o,width:n,left:s,top:a},(async e=>{y[t]=e.tabs[0].id,g[t]=e.id,chrome.tabs.onUpdated.addListener((function e(o,n){"complete"===n.status&&o===y[t]&&(chrome.tabs.onUpdated.removeListener(e),chrome.tabs.sendMessage(y[t],{event:"BEGIN_PARSING",formData:r}),I||(I=performance.now()),i())}))}))}))}(x[i](e),i,t,e)));await Promise.all(o),chrome.windows.update(m,{focused:!0})}(E,e.windowConfig),R(),y={},g={},T={},w={},C=!1,F=[],S=new Set,N=new Set,D=!1,b=[],v={},L=!0,A=null,h&&chrome.tabs.sendMessage(h,{event:"RESET_SEARCH",formData:E});break;case"NO_FLIGHTS_FOUND":N.add(e.provider),clearTimeout(v[e.provider]),N.size>=Object.keys(y).length&&($({event:"NO_FLIGHTS_FOUND_CLIENT"}),R()),Sentry.captureException(new Error(`No flights found ${e.provider}`,{extra:E}));break;case"FAILED_SCRAPER":!function(e){N.add(e),N.size>=Object.keys(y).length&&($({event:"FAILED_SCRAPER_CLIENT"}),R()),Sentry.captureException(new Error(`Scraper failed for ${e}`),{extra:E})}(e.provider);break;case"FLIGHT_RESULTS_RECEIVED":if(C)break;const{flights:t,provider:i}=e;if(clearTimeout(v[i]),!t.length)break;S.has(i)||(Sentry.captureMessage(`${i} flight results took ${performance.now()-I}`),S.add(i));const{departures:r,itins:o}=d(t,T,w,i,g[i],y[i]);w={...o},T={...r},$({event:"FLIGHT_RESULTS_FOR_CLIENT",flights:{departureList:l(T,w),itins:w},tabId:y[i],formData:E});break;case"RETURN_FLIGHTS_RECEIVED":const{flights:n,provider:s}=e;if(0===n.length)return;clearTimeout(v.expedia);const{itins:a,returns:c}=d(n,T,w,s,g[s],y[s],!0);w={...w,...a};let p=Object.values(c);p=l(p,w),b=b.concat(p),chrome.tabs.sendMessage(h,{event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:b,itins:a}});break;case"DEPARTURE_SELECTED":if(!E.roundtrip)return;C=!0;const u=T[e.departureId],k=u.itinIds.flatMap((e=>w[e])),O=k.map((e=>e.provider));if(O.includes("expedia")){const e=()=>{chrome.tabs.sendMessage(y.expedia,{event:"GET_RETURN_FLIGHTS",departure:u,itin:k[O.indexOf("expedia")]}),v.expedia=setTimeout((()=>{Sentry.captureException(new Error("Scraper failed for expedia"),{extra:E})}),1e4)};L?e():A=e}else(O.includes("skyscanner")||O.includes("southwest"))&&(b=function(e,t){return e.itinIds.map((e=>t[e].retFlight))}(u,w),b=l(b,w),chrome.tabs.sendMessage(h,{event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:b}}));break;case"HIGHLIGHT_TAB":const{selectedDepartureId:B,selectedReturnId:M}=e;let P=B;M&&(P+=`-${M}`),_(w[P]);break;case"SKYSCANNER_READY":D=!0,F.length&&F.forEach((e=>{_(e)}));break;case"EXPEDIA_READY":L=!0,A&&(A(),A=null);break;case"FOCUS_WEBPAGE":$({event:"FOCUS_WEBPAGE_CLIENT"}),chrome.windows.update(m,{focused:!0},(e=>{chrome.tabs.highlight({tabs:[f]})}));break;case"CLEAR_SELECTIONS":b=[],y.expedia&&(L=!1,chrome.tabs.sendMessage(y.expedia,{event:"CLEAR_SELECTION"}));break;case"CALL_BEGIN_PARSE":window.setTimeout((()=>{chrome.tabs.sendMessage(y[e.provider],{event:"BEGIN_PARSING",formData:E})}),5e3);break;default:console.error(e)}})),chrome.tabs.onRemoved.addListener((function(e){e===h&&R()}));const x={priceline:function(e){const{from:t,to:i,fromDate:r,toDate:o,numPax:n,cabin:s}=e;return`https://www.priceline.com/m/fly/search/${t}-${i}-${r.replace(/-/g,"")}/${i}-${t}-${o.replace(/-/g,"")}/?cabin-class=${M[s]}&num-adults=${n}`},southwest:function(e){const{from:t,to:i,fromDate:r,toDate:o,numPax:n,roundtrip:s}=e,a=t.toUpperCase();let l=`https://www.southwest.com/air/booking/select.html?adultPassengersCount=${n}&departureDate=${r}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${i.toUpperCase()}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${a}&passengerType=ADULT&reset=true&seniorPassengersCount=0`;return l+=s?`&returnDate=${o}&returnTimeOfDay=ALL_DAY&tripType=roundtrip`:"&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway",l},skyscanner:function(e){const{from:t,to:i,fromDate:r,toDate:o,numPax:n,cabin:s,roundtrip:a}=e;let l=`https://www.skyscanner.com/transport/flights/${t}/${i}/${r.replace(/-/g,"").substring(2)}/`;if(a){l+=`${o.replace(/-/g,"").substring(2)}/`}return`${l}?adults=${n}&children=0&adultsv2=${n}&childrenv2=&infants=0&cabinclass=${B[s]}`},expedia:function(e){const{from:t,to:i,fromDate:r,toDate:o,numPax:n,cabin:s,roundtrip:a}=e,l=d(r);let c=`https://www.expedia.com/Flights-Search?mode=search&trip=${a?"roundtrip":"oneway"}&leg1=from:${t},to:${i},departure:${l}TANYT&leg2=from:${i},to:${t},`;function d(e){const[t,i,r]=e.split("-");return[i,r,t].join("/")}if(a){c+=`departure:${d(o)}TANYT`}else c+=`departure:${l}TANYT`;return c+=`&passengers=adults:${n},children:0,seniors:0,infantinlap:N&options=carrier:*,`,c+=`cabinclass:${O[s]},`,c+="maxhops:1,nopenalty:N&pageId=0",c}},O={econ:"economy",prem_econ:"premium_economy",business:"business",first:"first"},B={econ:"economy",prem_econ:"premiumeconomy",business:"business",first:"first"},M={econ:"ECO",prem_econ:"PEC",business:"BUS",first:"FST"}})();