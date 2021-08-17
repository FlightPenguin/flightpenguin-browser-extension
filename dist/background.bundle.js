(()=>{"use strict";var e=["expedia"],t=["expedia"],r=["expedia","skyscanner","southwest"],n=function(){};function i(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){u=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(u)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const a={airlineDetailsMap:{"American Airlines":{display:"American",color:"#C5423E",code:"AA"},American:{display:"American",color:"#C5423E",code:"AA"},Delta:{display:"Delta",color:"#EE722E",code:"DL"},Southwest:{display:"Southwest",color:"#F6C04D",code:"WN"},United:{display:"United",color:"#235EA6",code:"UA"},"Air Canada":{display:"Air Canada",color:"#E53222",code:"AC"},"Alaska Airlines":{display:"Alaska",color:"#51172C",code:"AS"},jetBlue:{display:"jetBlue",color:"#5F90C8",code:"B6"},"JetBlue Airways":{display:"jetBlue",color:"#5F90C8",code:"B6"},"Spirit Airlines":{display:"Spirit",color:"#BBB140",code:"NK"},WestJet:{display:"WestJet",color:"#4BA89C",code:"WS"},Aeromexico:{display:"Aeromexico",color:"#000000",code:"AM"},"Frontier Airlines":{display:"Frontier",color:"#378055",code:"F9"},Interjet:{display:"Interjet",color:"#A8A8A8",code:"4O"},"Hawaiian Airlines":{display:"Hawaiian",color:"#4D388A",code:"HA"},"Sun Country Airlines":{display:"Sun Country",color:"#D79A71",code:"SY"},"Porter Airlines":{display:"Porter",color:"#0F2B53",code:"PD"},"China Southern Airlines":{display:"China Southern",color:"#93ACCA",code:"CZ"},Lufthansa:{display:"Lufthansa",color:"#EFB95D",code:"LH"},SWISS:{display:"Swiss",color:"#D42D21",code:"LX"},"China Eastern Airlines":{display:"China Eastern",color:"#A9545F",code:"MU"},"British Airways":{display:"British",color:"#EA8E8C",code:"BA"},Iberia:{display:"Iberia",color:"#D05653",code:"IB"},"Air China":{display:"Air China",color:"#DF524B",code:"CA"},"Emirates Airlines":{display:"Emirates",color:"#CF534F",code:"EK"},"KLM-Royal Dutch Airlines":{display:"KLM",color:"#44A0DC",code:"KL"},"Air France":{display:"Air France",color:"#DB3832",code:"AF"},"Turkish Airlines":{display:"Turkish",color:"#DB3832",code:"TK"},"Cathay Pacific":{display:"Cathay",color:"#2A645A",code:"CX"},"Cathay Dragon":{display:"Cathay",color:"#2A645A",code:"CX"},"EVA Airways":{display:"EVA",color:"#6F9F64",code:"BR"},"China Airlines":{display:"China Airlines",color:"#DAABB1",code:"CI"},"ANA Airlines":{display:"ANA",color:"#254897",code:"NH"},"Japan Airlines":{display:"Japan Airlines",color:"#E56E69",code:"JL"},"Air India":{display:"Air India",color:"#D47346",code:"AI"},"Qantas Airways":{display:"Qantas",color:"#E34538",code:"QF"},"Singapore Airlines":{display:"Sinagpore",color:"#EFA952",code:"SQ"},"ANA (All Nippon Airways)":{display:"ANA",color:"#0f4a8d"}},getAirlineName:function(e){if(e&&"string"==typeof e){var t=e.trim(),r=this.airlineDetailsMap[t];return r&&(t=r.display),t}},getAirlineDetails:function(e){var t=e.trim();return this.airlineDetailsMap[t]||{display:t,color:"#DFCCFB"}}};var s=["Aer Lingus Regional","Aeromexico Connect","SkyWest","Alaska Horizon","Horizon Air","Alitalia CityLiner","Air Canada Express","Air New Zealand Link","American Eagle","Delta Connection","Fiji Link","HOP!","Iberia Regional","KLM Cityhopper","Lufthansa Regional","Moçambique Expresso","Ohana by Hawaiian","PAL Express","QantasLink","South African Express","TAP Express","Tunisair Express","United Express","Virgin Australia Regional Airlines","WestJet Encore","WestJet Link"];const u=function(e){var t=e.toLowerCase(),r=s.find((function(e){return t.includes(e.toLowerCase())}));return Boolean(r)};function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(e,t){var r=e.toLowerCase(),n=c(r.split(":"),2),i=n[0],o=n[1];i=Number(i);var a=Number(o.replace(/(pm)|(am)|(\+\d)/g,"").trim());if(t){var s=e.match(/(\+\d)/);s&&(i+=24*s[0].split("+")[1])}return r.includes("pm")&&i%12!=0?i+=12:r.includes("am")&&i%12==0&&(i-=12),{hours:i,minutes:a}}function f(e){var t,r;if(e.includes("h")){var n=c(e.split("h"),2);t=n[0],r=n[1]}else t=0,r=e;var i=r.trim().split("m")[0]||0;return Number(i)+60*Number(t)}function p(e,t,r){var n=d(e),i=n.hours,o=n.minutes,a=d(t),s=a.hours,u=a.minutes,l=t.match(/(\+\d)/),p=e.match(/(\+\d)/),h=0,y=0;if(p){var m=c(p[0].split("+"),2),v=(m[0],m[1]);y=h+=Number(v)}if(l){var g=c(l[0].split("+"),2),b=(g[0],g[1]);y+=Number(b)}var A=60*(i+24*h)+o,w=60*(s+24*y)+u;return f(r)-(w-A)}function h(e){var t=d(e,!0),r=t.hours,n=t.minutes,i=e.toLowerCase().match(/(pm)|(am)/)[0],o=e.match(/(\+\d)/);return{hours:r,displayHours:Number(e.split(":")[0]),minutes:n,timeOfDay:i,excessDays:o?o[0]:o}}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function A(e,t,r,n,i,o){this.fromTime=e,this.toTime=t,this.fromTimeDetails=h(e),this.toTimeDetails=h(t);var s=r?r.replace("Operated by","").replace("Partially operated by",""):r;s=a.getAirlineName(s);var c=a.getAirlineName(n);if(s){var l=r.includes("Partially operated by");u(s)||l?(this.operatingAirline=c,this.marketingAirlineText=l?r:"Operated by ".concat(s)):(this.operatingAirline=s,this.marketingAirlineText="Marketed by ".concat(c))}else this.operatingAirline=c;this.operatingAirline=w(this.operatingAirline),this.id="".concat(this.fromTime,"-").concat(this.toTime,"-").concat(c),this.duration=i,this.durationMinutes=f(i),this.layovers=o||[],this.itinIds=[],this.timezoneOffset=this.calculateTimezoneOffset()}function w(e){var t=[e];e.includes("Partially operated by")?t=e.split("Partially operated by "):e.includes("Operated by")&&(t=e.split("Operated by"));var r,n=t[t.length-1].trim().split(" + ");return r=1===n.length?n[0]:n.map((function(e){return a.getAirlineName(e.replace("  "," "))})).join(", "),a.getAirlineDetails(r.replace("  "," "))}function T(e,t){for(var r=0,n=Object.entries(e);r<n.length;r++){var i=y(n[r],2),o=(i[0],i[1]),a=1;if(o.layovers.length)for(var s=1;s<o.layovers.length;s++)if(o.layovers[s-1].to!==o.layovers[s].from){a=2;break}var u=t[o.itinIds.sort((function(e,r){return t[e].fareNumber-t[r].fareNumber}))[0]].fareNumber;o.pain=(Math.log2(o.durationMinutes)+Math.log2(u)+o.layovers.length)*a}return Object.values(e).sort((function(e,t){return e.pain-t.pain}))}function O(e,t,r,n,i,o,a,s){this.depFlight=s?e:new A(e.fromTime,e.toTime,e.operatingAirline,e.marketingAirline,e.duration,e.layovers),t?(this.retFlight=new A(t.fromTime,t.toTime,t.operatingAirline,t.marketingAirline,t.duration,t.layovers),this.id="".concat(this.depFlight.id,"-").concat(this.retFlight.id)):this.id=this.depFlight.id,this.provider=i,this.windowId=o,this.tabId=a,this.fareNumber=Number("".concat(r).match(/\d+/g).join("")),this.currency=n}function I(e,t,r,n,i,o){var a=arguments.length>6&&void 0!==arguments[6]&&arguments[6],s={};return e.forEach((function(e){var u=new O(e.departureFlight,e.returnFlight,e.fare,e.currency,n,i,o,a);t[u.depFlight.id]?u.depFlight=t[u.depFlight.id]:t[u.depFlight.id]=u.depFlight,u.retFlight&&(s[u.retFlight.id]?u.retFlight=s[u.retFlight.id]:s[u.retFlight.id]=u.retFlight,u.retFlight.itinIds.push(u.id)),u.depFlight.itinIds.push(u.id),r[u.id]=u})),{itins:r,departures:t,returns:s}}function E(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw o}}}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}A.prototype.calculateTimezoneOffset=function(){var e=this,t=0;if(this.layovers.length){for(var r=this.layovers.map((function(r,n){var i=r.fromTime,o=r.toTime,a=r.duration,s=r.operatingAirline;return t+=p(i,o,a),g(g({},e.layovers[n]),{},{operatingAirline:w(s),timezoneOffset:t})})),n=[],i=0;i<r.length-1;i++){var o=r[i],a=r[i+1],s=o.toTime,u=o.to,c=a.fromTime,l=a.from;n.push(o),n.push({fromTime:s,toTime:c,from:u,to:l,isLayoverStop:!0,operatingAirline:{display:"Layover at ".concat(u,"."),color:"transparent"}})}n.push(r[r.length-1]),this.layovers=n}else t=p(this.fromTime,this.toTime,this.duration);return t};var D=function(t){return e.some((function(e){return t.includes(e)}))},S=function(e,t,r,n){var i,o=E(r);try{var a=function(){var o=i.value,a=t.getTabId(o);if(a){var s=function(){chrome.tabs.sendMessage(a,{event:"GET_RETURN_FLIGHTS",departure:e,itin:n[r.indexOf(o)]}),t.setTimer(o,1e4,(function(){Sentry.captureException(new Error("Scraper failed for ".concat(o," return flights")),{extra:t.getFormData()})}))};t.getReady(o)?s():t.setOnReady(o,s)}};for(o.s();!(i=o.n()).done;)a()}catch(e){o.e(e)}finally{o.f()}},P=function(e,t){var r,n=t.getItineraries(),i={event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:T((r=n,e.itinIds.map((function(e){return r[e].retFlight}))),n)}};t.sendMessageToIndexPage(i)};function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){j(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function L(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?L(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var x=function(e){e.sendMessageToIndexPage({event:"FOCUS_WEBPAGE_CLIENT"});var t=e.getPrimaryWindowId(),r=e.getPrimaryTabId();null!=t&&null!=r&&function(e,t){chrome.windows.update(e,{focused:!0},(function(e){chrome.tabs.update(t,{selected:!0})}))}(t,r)};function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach((function(t){U(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var B=function(e,t,r){var n=t;r&&(n+="-".concat(r));var i=e.getItineraries()[n];!function(e,t){var r;if(null!==(r=e.getFormData())&&void 0!==r&&r.searchByPoints)return void chrome.tabs.create({url:"https://flightpenguin.com/flight-penguin-points"});var n=e.getWindowId(t.provider);null!=n&&null!==t.tabId&&void 0!==t.tabId&&chrome.windows.update(n,{focused:!0},(function(e){chrome.tabs.sendMessage(t.tabId,{event:"HIGHLIGHT_FLIGHT",selectedDepartureId:t.depFlight.id,selectedReturnId:t.retFlight?t.retFlight.id:"",provider:t.provider}),chrome.tabs.update(t.tabId,{selected:!0})}))}(e,i)};var H={econ:"economy",prem_econ:"premium_economy",business:"business",first:"first"};function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return G(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return G(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var J=function(e){var t=W(e.split("-"),3),r=t[0];return[t[1],t[2],r].join("/")};var Y={econ:"economy",prem_econ:"premiumeconomy",business:"business",first:"first"},z=function(e){var t=e.extensionOpenCallback,r=e.extensionClosedCallback,n=K();chrome.tabs.query({},(function(e){var i=e.find((function(e){return e.url===n}));i?t(i):r()}))},K=function(){var e=chrome.runtime.id;return"chrome-extension://".concat(e,"/index.html")};function Q(e,t,r,n,i,o,a){try{var s=e[o](a),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,i)}function V(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var X=["FAILED","SUCCESS"],$=["SUCCESS"],q={southwest:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.roundtrip,s=t.toUpperCase(),u=r.toUpperCase(),c="https://www.southwest.com/air/booking/select.html?adultPassengersCount=".concat(o,"&departureDate=").concat(n,"&departureTimeOfDay=ALL_DAY&destinationAirportCode=").concat(u,"&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=").concat(s,"&passengerType=ADULT&reset=true&seniorPassengersCount=0");return c+=a?"&returnDate=".concat(i,"&returnTimeOfDay=ALL_DAY&tripType=roundtrip"):"&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway"},skyscanner:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.cabin,s=e.roundtrip,u=n.replace(/-/g,"").slice(2),c="https://www.skyscanner.com/transport/flights/".concat(t,"/").concat(r,"/").concat(u,"/");if(s){var l=i.replace(/-/g,"").slice(2);c+="".concat(l,"/")}return"".concat(c,"?adults=").concat(o,"&children=0&adultsv2=").concat(o,"&childrenv2=&infants=0&cabinclass=").concat(Y[a||"econ"])},expedia:function(e){var t=e.from,r=e.to,n=e.fromDate,i=e.toDate,o=e.numPax,a=e.cabin,s=e.roundtrip,u=J(n),c="https://www.expedia.com/Flights-Search?mode=search&trip=".concat(s?"roundtrip":"oneway","&leg1=from:").concat(t,",to:").concat(r,",departure:").concat(u,"TANYT&leg2=from:").concat(r,",to:").concat(t,",");if(s){var l=J(i);c+="departure:".concat(l,"TANYT")}else c+="departure:".concat(u,"TANYT");return c+="&passengers=adults:".concat(o,",children:0,seniors:0,infantinlap:N&options=carrier:*,"),c+="cabinclass:".concat(H[a||"econ"],","),c+="maxhops:1,nopenalty:N&pageId=0"}},Z=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.knownProviders=[],this.state={},this.itineraries={},this.departures={},this.returns=[],this.formData=null,this.primaryTab=null,this.setPrimaryTab(),this.setupClosePrimaryTabListener()}var i,o,a;return i=e,(o=[{key:"setupClosePrimaryTabListener",value:function(){var e=this;chrome.tabs.onRemoved.addListener((function(t){t===e.getPrimaryTabId()&&e.closeWindows()}))}},{key:"getPrimaryTabId",value:function(){var e;return null===(e=this.primaryTab)||void 0===e?void 0:e.id}},{key:"getPrimaryTabIndex",value:function(){var e;return null===(e=this.primaryTab)||void 0===e?void 0:e.index}},{key:"getPrimaryWindowId",value:function(){var e;return null===(e=this.primaryTab)||void 0===e?void 0:e.windowId}},{key:"setFormData",value:function(e){this.formData=e,this.knownProviders=this.formData.searchByPoints?t:r,this.setDefault()}},{key:"getFormData",value:function(){return this.formData}},{key:"setPending",value:function(e){this.state[e].status="PENDING",this.setFlightCount(e,0)}},{key:"setFailed",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.state[e].status="FAILED",this.setFlightCount(e,t)}},{key:"setSuccessful",value:function(e,t){this.state[e].status="SUCCESS",this.setFlightCount(e,t)}},{key:"setPartialReturn",value:function(e,t){return this.state[e].status="PARTIAL_RETURN_CONTINUING",this.getFlightCount(e)+t}},{key:"getStatus",value:function(e){return this.state[e].status}},{key:"isProviderComplete",value:function(e){var t=this.getStatus(e);return X.includes(t)}},{key:"isComplete",value:function(){var e=this;return this.knownProviders.every((function(t){e.isProviderComplete(t)}))}},{key:"isProviderSuccessful",value:function(e){var t=this.getStatus(e);return $.includes(t)}},{key:"isSuccessful",value:function(){var e=this;return this.knownProviders.every((function(t){e.isProviderSuccessful(t)}))}},{key:"getItineraries",value:function(){return this.itineraries}},{key:"addItineraries",value:function(e){var t=this;e.entries().forEach((function(e,r){t.itineraries[e]=r}))}},{key:"setItineraries",value:function(e){this.itineraries=e}},{key:"getDepartures",value:function(){return this.departures}},{key:"getDeparture",value:function(e){return this.departures[e]}},{key:"addDepartures",value:function(e){var t=this;e.entries().forEach((function(e,r){t.departures[e]=r}))}},{key:"setDepartures",value:function(e){this.departures=e}},{key:"getReturns",value:function(){return this.returns}},{key:"addReturns",value:function(e){var t=this;e.entries().forEach((function(e,r){t.returns[e]=r}))}},{key:"setReturns",value:function(e){this.returns=e}},{key:"setFlightCount",value:function(e,t){this.state[e].flightCount=t}},{key:"getFlightCount",value:function(e){return this.state[e].flightCount}},{key:"setReady",value:function(e,t){this.state[e].ready=t}},{key:"getReady",value:function(e){return this.state[e].ready}},{key:"setOnReady",value:function(e,t){this.state[e].onReady=t}},{key:"getOnReady",value:function(e){return this.state[e].onReady}},{key:"setDefault",value:function(){var e=this;this.knownProviders.forEach((function(t){e.state[t]={status:"PENDING",flightCount:0,ready:!0,onReady:n,timer:null}})),this.itineraries={},this.departures={},this.returns=[]}},{key:"setTimer",value:function(e,t,r){this.state[e].timer=setTimeout(r,t)}},{key:"getTimer",value:function(e){return this.state[e].timer}},{key:"clearTimeout",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){var t=this.state[e].timer;t&&(clearTimeout(t),this.state[e].timer=null)}))},{key:"setTab",value:function(e,t){this.state[e].tab=t}},{key:"setWindow",value:function(e,t){this.state[e].window=t}},{key:"getTabId",value:function(e){var t;return null===(t=this.state[e].tab)||void 0===t?void 0:t.id}},{key:"getTabIndex",value:function(e){var t;return null===(t=this.state[e].tab)||void 0===t?void 0:t.index}},{key:"getWindowId",value:function(e){var t;return null===(t=this.state[e].window)||void 0===t?void 0:t.id}},{key:"setPrimaryTab",value:function(){var e=this;z({extensionOpenCallback:function(t){e.primaryTab=t},extensionClosedCallback:function(){(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4;return new Promise((function(t){setTimeout(t,e)}))})(500).then((function(){e.setPrimaryTab()}))}})}},{key:"createWindow",value:function(e,t,r,n){var i=r.height,o=r.width,a=r.left,s=r.top,u=this;return new Promise((function(r){chrome.windows.create({url:e,focused:!1,height:i,width:o,left:a,top:s},function(){var e,i=(e=function*(e){var i;if(!(e&&e.tabs&&null!==(i=u.primaryTab)&&void 0!==i&&i.windowId))throw new Error("Unable to create window - no window!");chrome.windows.update(u.primaryTab.windowId,{focused:!0}),u.setTab(t,e.tabs[0]),u.setWindow(t,e),chrome.tabs.onUpdated.addListener((function e(i,o){"complete"===o.status&&i===u.getTabId(t)&&(chrome.tabs.onUpdated.removeListener(e),chrome.tabs.sendMessage(i,{event:"BEGIN_PARSING",formData:n}),r())}))},function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){Q(o,n,i,a,s,"next",e)}function s(e){Q(o,n,i,a,s,"throw",e)}a(void 0)}))});return function(e){return i.apply(this,arguments)}}())}))}},{key:"closeWindow",value:function(e){var t=this.getWindowId(e);t&&chrome.windows.remove(t)}},{key:"closeWindows",value:function(){var e=this;this.knownProviders.forEach((function(t){e.closeWindow(t)}))}},{key:"searchForResults",value:function(e,t){var r,n=this;this.setFormData(e);var i=null==this||null===(r=this.primaryTab)||void 0===r?void 0:r.id;if(i){var o=this.knownProviders.map((function(r){var i=q[r](e);return n.createWindow(i,r,t,e)}));Promise.all(o).then((function(){chrome.windows.update(i,{focused:!0})}))}}},{key:"getTotalFlightCount",value:function(){var e=this;if(!this.isComplete())return null;var t=0;return this.knownProviders.forEach((function(r){t+=e.getFlightCount(r)})),t}},{key:"sendMessageToIndexPage",value:function(e){var t;null!==(t=this.primaryTab)&&void 0!==t&&t.id&&chrome.tabs.sendMessage(this.primaryTab.id,e)}}])&&V(i.prototype,o),a&&V(i,a),e}();const ee="https://subscribe.flightpenguin.com";function te(e,t,r,n,i,o,a){try{var s=e[o](a),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,i)}var re=function(){chrome.browserAction.disable()},ne=function(){chrome.browserAction.enable()},ie=function(e){chrome.windows.update(e.windowId,{focused:!0},(function(){null!=e.id&&chrome.tabs.update(e.id,{active:!0})}))},oe=function(){chrome.tabs.create({url:chrome.extension.getURL("./index.html")},(function(e){window.setTimeout((function(){null!=e.id&&chrome.tabs.sendMessage(e.id,{})}),1e3)}))};Sentry.init({dsn:"https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"}),chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6",(function(){})),chrome.runtime.onInstalled.addListener((function(){})),chrome.browserAction.onClicked.addListener((function(){re(),chrome.identity.getAuthToken({interactive:!0},function(){var e,t=(e=function*(e){try{(yield(t=e,fetch("".concat(ee,"/api/subscription/status"),{method:"GET",credentials:"include",mode:"cors",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(t)})}).then((function(e){if(200===e.status)return e.json();throw new Error(e.status)})))).status?z({extensionOpenCallback:ie,extensionClosedCallback:oe}):chrome.tabs.create({url:ee})}catch(e){chrome.tabs.create({url:ee})}finally{ne()}var t},function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){te(o,n,i,a,s,"next",e)}function s(e){te(o,n,i,a,s,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}())}));var ae=new Z;chrome.runtime.onMessage.addListener((function(t,r,o){switch(t.event){case"FORM_DATA_RECEIVED":!function(e,t,r){t=M(M({},t),{},{from:t.from.toUpperCase(),to:t.to.toUpperCase()}),e.searchForResults(t,r)}(ae,t.formData,t.windowConfig);break;case"NO_FLIGHTS_FOUND":!function(e,t){e.setSuccessful(t,0),e.isComplete()&&0===e.getTotalFlightCount()&&(e.sendMessageToIndexPage({event:"NO_FLIGHTS_FOUND_CLIENT"}),e.closeWindows())}(ae,t.provider);break;case"FAILED_SCRAPER":!function(e,t,r){e.setFailed(t),e.isComplete()&&0===e.getTotalFlightCount()&&(e.sendMessageToIndexPage({event:"FAILED_SCRAPER_CLIENT"}),e.closeWindows()),window.Sentry.captureException(new Error("Scraper failed for ".concat(t)),{extra:e.getFormData(),details:r})}(ae,t.source,t.formData,t.description);break;case"FLIGHT_RESULTS_RECEIVED":!function(e,t,r){if(0!==t.length){var n=e.getWindowId(r),i=e.getTabId(r);if(n&&i){var o=I(t,e.getDepartures(),e.getItineraries(),r,n,i),a=o.departures,s=o.itins;e.setItineraries(F({},s)),e.setDepartures(F({},a));var u=e.getDepartures(),c=e.getItineraries(),l={event:"FLIGHT_RESULTS_FOR_CLIENT",flights:{departureList:T(u,c),itins:c},tabId:i,formData:e.getFormData()};e.sendMessageToIndexPage(l)}}}(ae,t.flights,t.provider);break;case"RETURN_FLIGHTS_RECEIVED":!function(e,t,r){if(0!==t.length){var n=e.getWindowId(r),i=e.getTabId(r);if(n&&i){var o=I(t,e.getDepartures(),e.getItineraries(),r,n,i,!0),a=o.returns,s=o.itins,u=R(R({},e.getItineraries()),s);e.setItineraries(u);var c=T(Object.values(a),u);e.setReturns(c);var l={event:"RETURN_FLIGHTS_FOR_CLIENT",flights:{returnList:e.getReturns(),itins:s}};e.sendMessageToIndexPage(l)}}}(ae,t.flights,t.provider);break;case"DEPARTURE_SELECTED":!function(e,t){var r;if(null!==(r=e.getFormData())&&void 0!==r&&r.roundtrip){var n=e.getDeparture(t),i=e.getItineraries(),o=n.itinIds.flatMap((function(e){return i[e]})),a=o.map((function(e){return e.provider}));D(a)?S(n,e,a,o):P(n,e)}}(ae,t.departureId);break;case"HIGHLIGHT_TAB":B(ae,t.selectedDepartureId,t.selectedReturnId);break;case"SEND_BEGIN_EVENT":!function(e,t,r){var n=e.getTabId(t);n&&setTimeout((function(){chrome.tabs.sendMessage(n,{event:"BEGIN_PARSING",formData:e.getFormData()})}),r)}(ae,t.provider,2e3);break;case"EXPEDIA_READY":!function(e,t){e.setReady(t,!0),e.getOnReady(t)(),e.setOnReady(t,n)}(ae,"expedia");break;case"FOCUS_WEBPAGE":x(ae);break;case"CLEAR_SELECTIONS":!function(t){t.setReturns([]);var r,o=i(e);try{for(o.s();!(r=o.n()).done;){var a=r.value;t.setReady(a,!1),t.setOnReady(a,n);var s=t.getTabId(a);s&&chrome.tabs.sendMessage(s,{event:"CLEAR_SELECTION"})}}catch(e){o.e(e)}finally{o.f()}}(ae);break;default:window.Sentry.captureException(new Error(t))}}))})();