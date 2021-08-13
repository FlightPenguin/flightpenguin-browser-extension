(()=>{"use strict";var e=function(e){return e?["expedia"]:["southwest","skyscanner","expedia"]};const t="https://subscribe.flightpenguin.com";const r={airlineDetailsMap:{"American Airlines":{display:"American",color:"#C5423E",code:"AA"},American:{display:"American",color:"#C5423E",code:"AA"},Delta:{display:"Delta",color:"#EE722E",code:"DL"},Southwest:{display:"Southwest",color:"#F6C04D",code:"WN"},United:{display:"United",color:"#235EA6",code:"UA"},"Air Canada":{display:"Air Canada",color:"#E53222",code:"AC"},"Alaska Airlines":{display:"Alaska",color:"#51172C",code:"AS"},jetBlue:{display:"jetBlue",color:"#5F90C8",code:"B6"},"JetBlue Airways":{display:"jetBlue",color:"#5F90C8",code:"B6"},"Spirit Airlines":{display:"Spirit",color:"#BBB140",code:"NK"},WestJet:{display:"WestJet",color:"#4BA89C",code:"WS"},Aeromexico:{display:"Aeromexico",color:"#000000",code:"AM"},"Frontier Airlines":{display:"Frontier",color:"#378055",code:"F9"},Interjet:{display:"Interjet",color:"#A8A8A8",code:"4O"},"Hawaiian Airlines":{display:"Hawaiian",color:"#4D388A",code:"HA"},"Sun Country Airlines":{display:"Sun Country",color:"#D79A71",code:"SY"},"Porter Airlines":{display:"Porter",color:"#0F2B53",code:"PD"},"China Southern Airlines":{display:"China Southern",color:"#93ACCA",code:"CZ"},Lufthansa:{display:"Lufthansa",color:"#EFB95D",code:"LH"},SWISS:{display:"Swiss",color:"#D42D21",code:"LX"},"China Eastern Airlines":{display:"China Eastern",color:"#A9545F",code:"MU"},"British Airways":{display:"British",color:"#EA8E8C",code:"BA"},Iberia:{display:"Iberia",color:"#D05653",code:"IB"},"Air China":{display:"Air China",color:"#DF524B",code:"CA"},"Emirates Airlines":{display:"Emirates",color:"#CF534F",code:"EK"},"KLM-Royal Dutch Airlines":{display:"KLM",color:"#44A0DC",code:"KL"},"Air France":{display:"Air France",color:"#DB3832",code:"AF"},"Turkish Airlines":{display:"Turkish",color:"#DB3832",code:"TK"},"Cathay Pacific":{display:"Cathay",color:"#2A645A",code:"CX"},"Cathay Dragon":{display:"Cathay",color:"#2A645A",code:"CX"},"EVA Airways":{display:"EVA",color:"#6F9F64",code:"BR"},"China Airlines":{display:"China Airlines",color:"#DAABB1",code:"CI"},"ANA Airlines":{display:"ANA",color:"#254897",code:"NH"},"Japan Airlines":{display:"Japan Airlines",color:"#E56E69",code:"JL"},"Air India":{display:"Air India",color:"#D47346",code:"AI"},"Qantas Airways":{display:"Qantas",color:"#E34538",code:"QF"},"Singapore Airlines":{display:"Sinagpore",color:"#EFA952",code:"SQ"},"ANA (All Nippon Airways)":{display:"ANA",color:"#0f4a8d"}},getAirlineName:function(e){if(e&&"string"==typeof e){var t=e.trim(),r=this.airlineDetailsMap[t];return r&&(t=r.display),t}},getAirlineDetails:function(e){var t=e.trim();return this.airlineDetailsMap[t]||{display:t,color:"#DFCCFB"}}};var n=["Aer Lingus Regional","Aeromexico Connect","SkyWest","Alaska Horizon","Horizon Air","Alitalia CityLiner","Air Canada Express","Air New Zealand Link","American Eagle","Delta Connection","Fiji Link","HOP!","Iberia Regional","KLM Cityhopper","Lufthansa Regional","Moçambique Expresso","Ohana by Hawaiian","PAL Express","QantasLink","South African Express","TAP Express","Tunisair Express","United Express","Virgin Australia Regional Airlines","WestJet Encore","WestJet Link"];const i=function(e){var t=e.toLowerCase(),r=n.find((function(e){return t.includes(e.toLowerCase())}));return Boolean(r)};function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function s(e,t){var r=e.toLowerCase(),n=o(r.split(":"),2),i=n[0],a=n[1];i=Number(i);var s=Number(a.replace(/(pm)|(am)|(\+\d)/g,"").trim());if(t){var c=e.match(/(\+\d)/);c&&(i+=24*c[0].split("+")[1])}return r.includes("pm")&&i%12!=0?i+=12:r.includes("am")&&i%12==0&&(i-=12),{hours:i,minutes:s}}function c(e){var t,r;if(e.includes("h")){var n=o(e.split("h"),2);t=n[0],r=n[1]}else t=0,r=e;var i=r.trim().split("m")[0]||0;return Number(i)+60*Number(t)}function l(e,t,r){var n=s(e),i=n.hours,a=n.minutes,l=s(t),u=l.hours,d=l.minutes,p=t.match(/(\+\d)/),f=e.match(/(\+\d)/),h=0,m=0;if(f){var y=o(f[0].split("+"),2),A=(y[0],y[1]);m=h+=Number(A)}if(p){var b=o(p[0].split("+"),2),g=(b[0],b[1]);m+=Number(g)}var v=60*(i+24*h)+a,w=60*(u+24*m)+d;return c(r)-(w-v)}function u(e){var t=s(e,!0),r=t.hours,n=t.minutes,i=e.toLowerCase().match(/(pm)|(am)/)[0],o=e.match(/(\+\d)/);return{hours:r,displayHours:Number(e.split(":")[0]),minutes:n,timeOfDay:i,excessDays:o?o[0]:o}}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t,n,o,a,s){this.fromTime=e,this.toTime=t,this.fromTimeDetails=u(e),this.toTimeDetails=u(t);var l=n?n.replace("Operated by","").replace("Partially operated by",""):n;l=r.getAirlineName(l);var d=r.getAirlineName(o);if(l){var p=n.includes("Partially operated by");i(l)||p?(this.operatingAirline=d,this.marketingAirlineText=p?n:"Operated by ".concat(l)):(this.operatingAirline=l,this.marketingAirlineText="Marketed by ".concat(d))}else this.operatingAirline=d;this.operatingAirline=A(this.operatingAirline),this.id="".concat(this.fromTime,"-").concat(this.toTime,"-").concat(d),this.duration=a,this.durationMinutes=c(a),this.layovers=s||[],this.itinIds=[],this.timezoneOffset=this.calculateTimezoneOffset()}function A(e){var t=[e];e.includes("Partially operated by")?t=e.split("Partially operated by "):e.includes("Operated by")&&(t=e.split("Operated by"));var n,i=t[t.length-1].trim().split(" + ");return n=1===i.length?i[0]:i.map((function(e){return r.getAirlineName(e.replace("  "," "))})).join(", "),r.getAirlineDetails(n.replace("  "," "))}function b(e,t){for(var r=0,n=Object.entries(e);r<n.length;r++){var i=d(n[r],2),o=(i[0],i[1]),a=1;if(o.layovers.length)for(var s=1;s<o.layovers.length;s++)if(o.layovers[s-1].to!==o.layovers[s].from){a=2;break}var c=t[o.itinIds.sort((function(e,r){return t[e].fareNumber-t[r].fareNumber}))[0]].fareNumber;o.pain=(Math.log2(o.durationMinutes)+Math.log2(c)+o.layovers.length)*a}return Object.values(e).sort((function(e,t){return e.pain-t.pain}))}function g(e,t,r,n,i,o,a,s){this.depFlight=s?e:new y(e.fromTime,e.toTime,e.operatingAirline,e.marketingAirline,e.duration,e.layovers),t?(this.retFlight=new y(t.fromTime,t.toTime,t.operatingAirline,t.marketingAirline,t.duration,t.layovers),this.id="".concat(this.depFlight.id,"-").concat(this.retFlight.id)):this.id=this.depFlight.id,this.provider=i,this.windowId=o,this.tabId=a,this.fareNumber=Number("".concat(r).match(/\d+/g).join("")),this.currency=n}function v(e,t,r,n,i,o){var a=arguments.length>6&&void 0!==arguments[6]&&arguments[6],s={};return e.forEach((function(e){var c=new g(e.departureFlight,e.returnFlight,e.fare,e.currency,n,i,o,a);t[c.depFlight.id]?c.depFlight=t[c.depFlight.id]:t[c.depFlight.id]=c.depFlight,c.retFlight&&(s[c.retFlight.id]?c.retFlight=s[c.retFlight.id]:s[c.retFlight.id]=c.retFlight,c.retFlight.itinIds.push(c.id)),c.depFlight.itinIds.push(c.id),r[c.id]=c})),{itins:r,departures:t,returns:s}}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||E(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){if(e){if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?S(e,t):void 0}}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?T(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function D(e,t,r,n,i,o,a){try{var s=e[o](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,i)}function I(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){D(o,n,i,a,s,"next",e)}function s(e){D(o,n,i,a,s,"throw",e)}a(void 0)}))}}y.prototype.calculateTimezoneOffset=function(){var e=this,t=0;if(this.layovers.length){for(var r=this.layovers.map((function(r,n){var i=r.fromTime,o=r.toTime,a=r.duration,s=r.operatingAirline;return t+=l(i,o,a),h(h({},e.layovers[n]),{},{operatingAirline:A(s),timezoneOffset:t})})),n=[],i=0;i<r.length-1;i++){var o=r[i],a=r[i+1],s=o.toTime,c=o.to,u=a.fromTime,d=a.from;n.push(o),n.push({fromTime:s,toTime:u,from:c,to:d,isLayoverStop:!0,operatingAirline:{display:"Layover at ".concat(c,"."),color:"transparent"}})}n.push(r[r.length-1]),this.layovers=n}else t=l(this.fromTime,this.toTime,this.duration);return t},Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6",(function(){Sentry.captureMessage("uninstall")})),chrome.runtime.onInstalled.addListener((function(){}));var L=!1;chrome.browserAction.onClicked.addListener((function(){L||(L=!0,chrome.identity.getAuthToken({interactive:!0},function(){var e=I((function*(e){var r;yield(r=e,fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json",{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(r)})}).then((function(e){if(200===e.status)return e.json();throw new Error(e.status)})));try{(yield function(e){return fetch("".concat(t,"/api/subscription/status"),{method:"GET",credentials:"include",mode:"cors",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(e)})}).then((function(e){if(200===e.status)return e.json();throw new Error(e.status)}))}(e)).status?X({}):chrome.tabs.create({url:t})}catch(e){chrome.tabs.create({url:t})}finally{L=!1}}));return function(t){return e.apply(this,arguments)}}()))}));var F,j,N,P,_={},x={},R={},k=[],B={},M={},U=!1,H=!0,G=[],z=0,W=new Set,Y=new Set,J={};function K(e){F?chrome.tabs.get(F,(function(t){t?chrome.tabs.sendMessage(t.id,e):X(e)})):X(e)}function Q(e){R.searchByPoints?chrome.tabs.create({url:"https://flightpenguin.com/flight-penguin-points"}):chrome.windows.update(x[e.provider],{focused:!0},(function(t){chrome.tabs.sendMessage(e.tabId,{event:"HIGHLIGHT_FLIGHT",selectedDepartureId:e.depFlight.id,selectedReturnId:e.retFlight?e.retFlight.id:"",provider:e.provider})}))}function V(){for(var e=0,t=Object.values(x);e<t.length;e++){var r=t[e];chrome.windows.remove(r)}}function X(e){chrome.tabs.create({url:chrome.extension.getURL("./index.html")},(function(t){window.setTimeout((function(){chrome.tabs.sendMessage(t.id,e)}),1e3),j=t.windowId,F=t.id,N=t.index}))}function $(){return($=I((function*(t,r){var n=e(t.searchByPoints).map((function(e){return q(Z[e](t),e,r,t)}));yield Promise.all(n),chrome.windows.update(j,{focused:!0})}))).apply(this,arguments)}function q(e,t,r,n){var i=r.height,o=r.width,a=r.left,s=r.top;return new Promise((function(r){chrome.windows.create({url:e,focused:!1,height:i,width:o,left:a,top:s},function(){var e=I((function*(e){chrome.windows.update(j,{focused:!0}),_[t]=e.tabs[0].id,x[t]=e.id,chrome.tabs.onUpdated.addListener((function e(i,o){"complete"===o.status&&i===_[t]&&(chrome.tabs.onUpdated.removeListener(e),chrome.tabs.sendMessage(_[t],{event:"BEGIN_PARSING",formData:n}),z||(z=performance.now()),r())}))}));return function(t){return e.apply(this,arguments)}}())}))}chrome.runtime.onMessage.addListener((function(e,t,r){switch(e.event){case"FORM_DATA_RECEIVED":(function(e,t){$.apply(this,arguments)})(R=O(O({},e.formData),{},{from:e.formData.from.toUpperCase(),to:e.formData.to.toUpperCase()}),e.windowConfig),V(),_={},x={},B={},M={},U=!1,G=[],W=new Set,Y=new Set,!1,k=[],J={},H=!0,P=null,F&&chrome.tabs.sendMessage(F,{event:"RESET_SEARCH",formData:R});break;case"NO_FLIGHTS_FOUND":Y.add(e.provider),clearTimeout(J[e.provider]),Y.size>=Object.keys(_).length&&(K({event:"NO_FLIGHTS_FOUND_CLIENT"}),V()),Sentry.captureException(new Error("No flights found ".concat(e.provider),{extra:R}));break;case"FAILED_SCRAPER":!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Y.add(e),Y.size>=Object.keys(_).length&&(K({event:"FAILED_SCRAPER_CLIENT"}),V());Sentry.captureException(new Error("Scraper failed for ".concat(e)),{extra:R,details:t})}(e.provider,null==e?void 0:e.description);break;case"FLIGHT_RESULTS_RECEIVED":if(U)break;var n=e.flights,i=e.provider;if(clearTimeout(J[i]),0===n.length)break;W.has(i)||(Sentry.captureMessage("".concat(i," flight results took ").concat(performance.now()-z)),W.add(i));var o=v(n,B,M,i,x[i],_[i]),a=o.departures,s=o.itins;M=O({},s),K({event:"FLIGHT_RESULTS_FOR_CLIENT",flights:{departureList:b(B=O({},a),M),itins:M},tabId:_[i],formData:R});break;case"RETURN_FLIGHTS_RECEIVED":var c=e.flights,l=e.provider;if(0===c.length)return;clearTimeout(J.expedia);var u=v(c,B,M,l,x[l],_[l],!0),d=u.itins,p=u.returns;M=O(O({},M),d);var f=Object.values(p);f=b(f,M),k=k.concat(f),chrome.tabs.sendMessage(F,{event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:k,itins:d}});break;case"DEPARTURE_SELECTED":if(!R.roundtrip)return;U=!0;var h=B[e.departureId],m=h.itinIds.flatMap((function(e){return M[e]})),y=m.map((function(e){return e.provider}));if(y.includes("expedia")){var A=function(){chrome.tabs.sendMessage(_.expedia,{event:"GET_RETURN_FLIGHTS",departure:h,itin:m[y.indexOf("expedia")]}),J.expedia=setTimeout((function(){Sentry.captureException(new Error("Scraper failed for expedia"),{extra:R})}),1e4)};H?A():P=A}else(y.includes("skyscanner")||y.includes("southwest"))&&(k=b(k=function(e,t){return e.itinIds.map((function(e){return t[e].retFlight}))}(h,M),M),chrome.tabs.sendMessage(F,{event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:k}}));break;case"HIGHLIGHT_TAB":var g=e.selectedDepartureId,w=e.selectedReturnId,S=g;w&&(S+="-".concat(w)),Q(M[S]);break;case"SKYSCANNER_READY":if(!0,G.length>0){var T,C=function(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=E(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw o}}}}(G);try{for(C.s();!(T=C.n()).done;){Q(T.value)}}catch(e){C.e(e)}finally{C.f()}}break;case"SEND_BEGIN_EVENT":setTimeout((function(){chrome.tabs.sendMessage(_[e.provider],{event:"BEGIN_PARSING",formData:R})}),2e3);break;case"EXPEDIA_READY":H=!0,P&&(P(),P=null);break;case"FOCUS_WEBPAGE":K({event:"FOCUS_WEBPAGE_CLIENT"}),chrome.windows.update(j,{focused:!0},(function(e){chrome.tabs.highlight({tabs:[N]})}));break;case"CLEAR_SELECTIONS":k=[],_.expedia&&(H=!1,chrome.tabs.sendMessage(_.expedia,{event:"CLEAR_SELECTION"}))}})),chrome.tabs.onRemoved.addListener((function(e){e===F&&V()}));var Z={priceline:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.cabin;return"https://www.priceline.com/m/fly/search/".concat(t,"-").concat(r,"-").concat(n.replace(/-/g,""),"/").concat(r,"-").concat(t,"-").concat(i.replace(/-/g,""),"/?cabin-class=").concat(re[a],"&num-adults=").concat(o)},southwest:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.roundtrip,s=t.toUpperCase(),c=r.toUpperCase(),l="https://www.southwest.com/air/booking/select.html?adultPassengersCount=".concat(o,"&departureDate=").concat(n,"&departureTimeOfDay=ALL_DAY&destinationAirportCode=").concat(c,"&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=").concat(s,"&passengerType=ADULT&reset=true&seniorPassengersCount=0");return l+=a?"&returnDate=".concat(i,"&returnTimeOfDay=ALL_DAY&tripType=roundtrip"):"&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway"},skyscanner:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.cabin,s=e.roundtrip,c=n.replace(/-/g,"").slice(2),l="https://www.skyscanner.com/transport/flights/".concat(t,"/").concat(r,"/").concat(c,"/");if(s){var u=i.replace(/-/g,"").slice(2);l+="".concat(u,"/")}return"".concat(l,"?adults=").concat(o,"&children=0&adultsv2=").concat(o,"&childrenv2=&infants=0&cabinclass=").concat(te[a])},expedia:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.cabin,s=e.roundtrip,c=u(n),l="https://www.expedia.com/Flights-Search?mode=search&trip=".concat(s?"roundtrip":"oneway","&leg1=from:").concat(t,",to:").concat(r,",departure:").concat(c,"TANYT&leg2=from:").concat(r,",to:").concat(t,",");function u(e){var t=w(e.split("-"),3),r=t[0];return[t[1],t[2],r].join("/")}if(s){var d=u(i);l+="departure:".concat(d,"TANYT")}else l+="departure:".concat(c,"TANYT");return l+="&passengers=adults:".concat(o,",children:0,seniors:0,infantinlap:N&options=carrier:*,"),l+="cabinclass:".concat(ee[a],","),l+="maxhops:1,nopenalty:N&pageId=0"}},ee={econ:"economy",prem_econ:"premium_economy",business:"business",first:"first"};var te={econ:"economy",prem_econ:"premiumeconomy",business:"business",first:"first"};var re={econ:"ECO",prem_econ:"PEC",business:"BUS",first:"FST"}})();