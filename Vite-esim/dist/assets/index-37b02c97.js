(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const b=s=>{const{name:n,address:t,company:c}=s,e=document.createElement("tr"),o=document.createElement("td");o.innerText=n;const r=document.createElement("td");r.innerText=t;const a=document.createElement("td");return a.innerText=c,e.appendChild(o),e.appendChild(r),e.appendChild(a),e},x=(s,n)=>{const{name:t,address:c,city:e,postalCode:o,phone:r,company:a}=s;let l=`<h3>${t}</h3>
    <p>${a}</p>
    <p>${c} ${o} ${e}</p>
    <p>${r}</p>
    <table>
      <tr>
        <th>Course</th>
        <th>Diet</th>
        <th>Price</th>
      </tr>
    `;return n.courses.forEach(d=>{const{name:m,diets:h,price:p}=d;l+=`
          <tr>
            <td>${m}</td>
            <td>${h??" - "}</td>
            <td>${p??" - "}</td>
          </tr>
          `}),l+="</table>",l},y=s=>`
        <h3>Error</h3>
        <p>${s}</p>
        `,g=async(s,n={})=>{const t=await fetch(s,n);if(!t.ok)throw new Error(`Error ${t.status} occured`);return t.json()},E="https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1",M={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};const i=document.querySelector("dialog");if(!i)throw new Error("Modal not found");i.addEventListener("click",()=>{i.close()});const f=(s,n,t,c)=>Math.sqrt((t-s)**2+(c-n)**2),u=s=>{const n=document.querySelector("table");if(!n)throw new Error("Table not found");n.innerHTML="",s.forEach(t=>{const c=b(t);n.appendChild(c),c.addEventListener("click",async()=>{try{document.querySelectorAll(".highlight").forEach(a=>{a.classList.remove("highlight")}),c.classList.add("highlight"),i.innerHTML="";const o=await g(E+`/restaurants/daily/${t._id}/fi`);console.log(o);const r=x(t,o);i.insertAdjacentHTML("beforeend",r),i.showModal()}catch(e){i.innerHTML=y(e.message),i.showModal()}})})},C=s=>{console.warn(`ERROR(${s.code}): ${s.message}`)},v=async s=>{try{const n=s.coords,t=await g(E+"/restaurants");console.log(t),t.sort((r,a)=>{const l=n.latitude,d=n.longitude,m=r.location.coordinates[1],h=r.location.coordinates[0],p=f(l,d,m,h),w=a.location.coordinates[1],L=a.location.coordinates[0],$=f(l,d,w,L);return p-$}),u(t);const c=document.querySelector("#sodexo"),e=document.querySelector("#compass"),o=document.querySelector("#reset");if(!c||!e||!o)throw new Error("Button not found");c.addEventListener("click",()=>{const r=t.filter(a=>a.company==="Sodexo");console.log(r),u(r)}),e.addEventListener("click",()=>{const r=t.filter(a=>a.company==="Compass Group");console.log(r),u(r)}),o.addEventListener("click",()=>{u(t)})}catch(n){i.innerHTML=y(n.message),i.showModal()}};navigator.geolocation.getCurrentPosition(v,C,M);
