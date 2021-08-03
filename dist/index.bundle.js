(()=>{"use strict";function e(e,t){let n=e.toLowerCase(),[s,a]=n.split(":");s=Number(s);let r=Number(a.replace(/(pm)|(am)|(\+\d)/g,"").trim());if(t){const t=e.match(/(\+\d)/);t&&(s+=24*t[0].split("+")[1])}return n.includes("pm")&&s%12!=0?s+=12:n.includes("am")&&s%12==0&&(s-=12),{hours:s,minutes:r}}function t(t){const{hours:n,minutes:s}=e(t,!0);return 60*n+s}function n(e,t){const n=Math.abs(e),s=Math.floor(n/60)%24;let a=""+n%60;a=a.padStart(2,"0");let r="";return s<12?(r+=0===s?"12":s,r+=`:${a} AM`):(r+=12===s?12:""+(s-12),r+=`:${a} PM`),t&&n/60>24&&(r+=`+${Math.floor(n/60/24)}`),r}let s,a=0,r={},i=[],o=[],l={},c=[],d={},u=!1,m=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY;const f=1067;var y,h,g,L,E,T;y=window,h=document,g="script",L="ga",y.GoogleAnalyticsObject=L,y.ga=y.ga||function(){(y.ga.q=y.ga.q||[]).push(arguments)},y.ga.l=1*new Date,E=h.createElement(g),T=h.getElementsByTagName(g)[0],E.async=1,E.src="https://www.google-analytics.com/analytics.js",T.parentNode.insertBefore(E,T),ga("create","UA-164337457-1","auto"),ga("set","checkProtocolTask",(function(){})),ga("set","transport","beacon"),ga("require","displayfeatures"),ga("send","pageview","/index.html");document.querySelectorAll(".table-header").forEach((e=>e.style.width="1418px"));const b=document.querySelector(".departures-section"),S=document.querySelector(".departures-content"),I=document.querySelector(".departures-list"),x=document.querySelector(".returns-section"),v=(document.querySelector(".returns-content"),document.querySelector(".returns-list")),N=document.querySelector(".departures-time-bar-container"),w=document.querySelector(".departures-time-bar-container-header"),D=document.querySelector(".returns-time-bar-container"),M=document.querySelector(".returns-time-bar-container-header"),$=document.getElementById("loading"),q=document.querySelector("form"),H=document.querySelector("main"),C=document.getElementById("search-form-logo"),A=document.getElementById("results-logo");window.addEventListener("popstate",(function(){chrome.runtime.sendMessage({event:"CLEAR_SELECTIONS"}),function(){$.style.display="none",c.forEach((e=>{e.style.border="",delete e.dataset.selected,e.tabIndex="0"})),B.forEach((e=>e.style.display=null)),c[0].querySelector(".fare").style.display=null,document.querySelector(".sort-container").style.display=null,document.querySelector(".section-header").textContent="Departures",x.style.display="none",u=!1,v.innerHTML="";const e=D.children[0];e.innerHTML="",D.innerHTML="",D.append(e),c=[],window.scroll(0,0)}()}));function k(e,t,n,s,a){t.innerHTML="",e.forEach((e=>{const i=document.createElement("li");i.classList.add("flight-list-item"),i.style.width="1418px",i.tabIndex="0",i.addEventListener("click",O),i.addEventListener("keypress",(e=>{[13,32].includes(e.keyCode)&&O(e)}));const o=document.createElement("div");o.classList.add("flight-list-item__left-column");const{operatingAirline:{display:u},marketingAirlineText:m,id:p,itinIds:f}=e;let y;y=a?f.map((e=>r[e])).sort(((e,t)=>e.fareNumber-t.fareNumber))[0]:r[`${c[0].dataset.id}-${p}`];const h=y.fareNumber,g=document.createElement("div");g.classList.add("cost-container");const L=document.createElement("span");L.classList.add("fare");let E="";d.searchByPoints?(L.classList.add("points"),L.textContent=`${Math.floor(h/d.pointsValue).toLocaleString("en")}`,E="points"):(L.classList.add("dollar"),L.textContent=`$${h.toLocaleString("en")}`),g.append(L),g.append(E),o.append(g);const T=document.createElement("div");T.classList.add("airlines");const b=[u];m&&b.push(m),b.forEach(((e,t)=>{const n=document.createElement("span");n.textContent=e,n.title=e,0===t?n.classList.add("primary-airline"):n.classList.add("secondary-airline"),T.append(n)})),o.append(T);const S=function(e,t,n){const{layovers:s,fromTimeDetails:a,toTimeDetails:r,duration:i}=e,o=document.createElement("div"),l=document.createElement("div");l.classList.add("time-bar-segment-container"),l.dataset.content=i,o.append(l),o.classList.add("time-bar-row","tooltip");const c=function(e,t){return[e,t].map(((e,t)=>{const{displayHours:n,minutes:s,timeOfDay:a,excessDays:r}=e,i=document.createElement("div");i.classList.add("time-container"),0===t?i.classList.add("departure-time"):i.classList.add("arrival-time");let o=String(s);return o=o.padStart(2,"0"),i.textContent=`${n}:${o} ${a}`,i}))}(a,r);let d=0,u=0;const m=document.createDocumentFragment(),p=s.length?s:[e];for(let{fromTime:e,toTime:s,isLayoverStop:a,from:r,to:i,operatingAirline:{color:o,display:l}}of p){const i=s.match(/(\+\d)/),c=e.match(/(\+\d)/);if(!a){if(c){const[e,t]=c[0].split("+");d+=Number(t),u=d}if(i){const[e,t]=i[0].split("+");u+=Number(t)}}const{timeBarSegment:p}=F(e,s,o,l,d,u,t,n);a||i&&(d=u),p.classList.add("time-bar-segment"),a&&(p.classList.add("layover"),p.dataset.content=r,p.style.width=1*p.style.width.replace("px","")+1+"px"),m.append(p)}let f=m.children[m.childElementCount-1],y=Number(f.style.left.replace("px",""))+Number(f.style.width.replace("px","")),h=m.children[0].style.left,g=Number(h.replace("px",""));return l.style.left=m.children[0].style.left,l.append(m),c[0].style.left=g-107+"px",c[1].style.left=y+10+"px",o.append(...c),o}(e,n,s);i.append(o),i.append(S),i.dataset.id=e.id,l[e.id]=i,t.append(i)}))}function _(e){const{from:t,to:n,fromDate:s,toDate:a,cabin:r,numPax:i,roundtrip:o}=e,l=document.getElementById("header");if(l.children.length>1)return;const c=document.createDocumentFragment(),d={Airports:`${t}${o?"&harr;":"&rarr;"}${n}`,Depart:s,Return:a,Cabin:{econ:"Economy",prem_econ:"Premium Economy",business:"Business",first:"First"}[r],Passengers:i};for(const[e,t]of Object.entries(d)){if(!t)continue;const n=document.createElement("h2");n.classList.add("content");const s=document.createElement("span");s.classList.add("label"),s.innerText=e,n.append(s),n.innerHTML+=t,c.append(n)}l.append(c)}document.querySelectorAll(".sort-container").forEach((e=>{e.addEventListener("change",(e=>{let n;switch(e.target.value){case"pain":n=(e,t)=>e.pain-t.pain;break;case"price":n=(e,t)=>r[e.itinIds[0]].fareNumber-r[t.itinIds[0]].fareNumber,u&&(n=(e,t)=>r[`${c[0].dataset.id}-${e.id}`].fareNumber-r[`${c[0].dataset.id}-${t.id}`].fareNumber);break;case"duration":n=(e,t)=>e.durationMinutes-t.durationMinutes;break;case"stops":n=(e,t)=>e.layovers.length-t.layovers.length;break;case"takeoff":n=(e,n)=>t(e.fromTime)-t(n.fromTime);break;case"landing":n=(e,n)=>t(e.toTime)-t(n.toTime);break;default:return}let s=I,a=i;u&&(s=v,a=o);const d=a.slice().sort(n).map((({id:e})=>l[e]));s.innerHTML="",s.append(...d)}))})),chrome.runtime.onMessage.addListener((function(e){switch(e.event){case"RESET_SEARCH":a=0,r={},i=[],o=[],l={},c=[],d=e.formData,s=0,u=!1,m=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY,_(e.formData),b.style.display="none",I.innerHTML="";let t=w;t.innerHTML="",N.innerHTML="",N.style.display=null,N.append(t),x.style.display="none",v.innerHTML="",t=M,t.innerHTML="",D.innerHTML="",D.append(t);break;case"FLIGHT_RESULTS_FOR_CLIENT":const{flights:{departureList:n,itins:f},formData:y}=e;if(d=y,r={...r,...f},H.style.display=null,q.style.display="none",C.style.display="none",A.style.display=null,n.length){i=n,b.style.display=null;const{increment:e,startHourOffset:t,intervals:s,dayWidths:a}=R(n);k(n,I,e,t,!0),P(n[0].timezoneOffset,N,w,s,a)}_(d);break;case"RETURN_FLIGHTS_FOR_CLIENT":const{returnList:h,itins:g}=e.flights;r={...r,...g},o=h,u=!0,x.style.display=null,c[0].querySelector(".fare").style.display="none",$.style.display="none";const{increment:L,startHourOffset:E,intervals:T,dayWidths:S}=R(h);k(h,v,L,E,!1),P(h[0].timezoneOffset,D,M,T,S),window.scroll(0,window.pageYOffset+x.getBoundingClientRect().top);break;case"FOCUS_WEBPAGE_CLIENT":$.style.display="none";const B=c.pop();B.tabIndex="0",delete B.dataset.selected}}));let B=[];function O(e){if(e.currentTarget.dataset.selected)return;const t=e.currentTarget;if(t.dataset.selected=!0,t.tabIndex="-1",c.push(t),1===c.length&&d.roundtrip)$.style.display=null,history.pushState({},null,window.location.pathname),chrome.runtime.sendMessage({event:"DEPARTURE_SELECTED",departureId:t.dataset.id}),B=Array.from(S.querySelectorAll("li:not([data-selected='true'])")),B.forEach((e=>e.style.display="none")),document.querySelector(".sort-container").style.display="none",document.querySelector(".section-header").textContent="Your selected departure";else if(2===c.length||!d.roundtrip){const e=c.map((e=>e.dataset.id));chrome.runtime.sendMessage({event:"HIGHLIGHT_TAB",selectedDepartureId:e[0],selectedReturnId:e[1]})}}function P(t,s,a,r,i){s.style.width="1067px";const o=function(t,s,a){const r=document.createDocumentFragment(),i=f/(t.length-1);let o=d.fromDate,l=d.from,c=d.to;u&&(o=d.toDate,l=d.to,c=d.from);const[m,p,y]=o.split("-").map((e=>Number(e))),h=new Date(m,p-1,y),g=h.getDate();let L,E=0;for(let a=0;a<t.length;a++){const o=60*t[a],d=n(Math.abs(o)),u=d.replace(":00",""),m=document.createElement("div");m.classList.add("interval-time");const p=document.createElement("div"),f=document.createElement("span");f.classList.add("interval-time-text"),s?(m.classList.add("tz-change"),f.classList.add("tz-change")):(m.classList.add("no-tz-change"),f.classList.add("no-tz-change")),0===a?(m.classList.add("first"),f.classList.add("first"),f.dataset.content=`Time at ${l}`):a>0&&p.classList.add("interval-line");let y="";if("12 AM"===u?y="midnight":"12 PM"===u&&(y="midday"),y&&(m.classList.add(y),p.classList.add("interval-line",y),f.classList.add(y)),"12 AM"===u||0===a){const e=document.createElement("span");L=new Date(h.getTime()),L.setDate(g+E),e.innerText=L.toLocaleString("en-us",{weekday:"long"}),e.classList.add("day-of-the-week"),m.append(e),E++}f.innerText=u.toLowerCase(),f.classList.add(b(d)),m.append(f),m.style.left=i*a+"px",p.style.left=i*a+"px";const T=document.createElement("div");function b(t){const{hours:n}=e(t);let s="";return n<=5?s="early-morning":n<=12?s="morning":n<5?s="afternoon":n<24&&(s="evening"),s}if(T.append(m),r.append(T),r.append(p),s){const e=o-s,t=n(Math.abs(e)).replace(":00",""),r=document.createElement("span");r.classList.add("interval-time-text","timezone"),0===a&&(r.classList.add("first"),r.dataset.content=`Time at ${c}`),r.classList.add(b(d)),r.innerText=t.toLowerCase(),m.append(r)}}return r}(r,t);a.innerHTML="",a.append(o)}function F(t,n,a,r,i,o,l,c){const d=document.createElement("div"),{timeBarWidth:u,startPositionPx:m}=function(t,n,a,r,i,o){const l=f/((s-1)*i*60),c=60,d=24*c,u=l*d,m=a*d-o*c,p=r*d-o*c,y=e(t),h=m+y.minutes+y.hours*c,g=e(n),L=p+g.minutes+g.hours*c,E=h*l;let T=L*l;T<E&&(T+=u);return{timeBarWidth:T-E,startPositionPx:E}}(t,n,i,o,l,c);return d.title=`${r} ${t}-${n}`,d.style.width=`${u}px`,d.style.backgroundColor=a,d.style.left=`${m}px`,{timeBarSegment:d}}function R(e){const t=e.slice().sort(((e,t)=>e.fromTimeDetails.hours-t.fromTimeDetails.hours))[0],n=e.slice().sort(((e,t)=>t.toTimeDetails.hours-e.toTimeDetails.hours))[0];t.fromTimeDetails.hours<m&&(m=Math.max(0,t.fromTimeDetails.hours-2)),n.toTimeDetails.hours>p&&(p=n.toTimeDetails.hours+2);let a,r=m;r=r<12?0:12,p-m>72?a=6:p-r<=12?a=1:p-r<=24?r%4==0?a=2:r%3==0&&(a=3):a=r%4==0?4:3;const i=[];let o=r;for(;o<=p+a;)i.push(o),o+=a;s=i.length;const l=f/(s-1),c=[];let d=0;for(let[e,t]of i.entries())t%24==0&&0!==t&&(c.push(l*(e-d)),d=e);return d!==i.length-1&&c.push(l*(i.length-1-d)),{intervals:i,increment:a,startHourOffset:r,dayWidths:c}}})();