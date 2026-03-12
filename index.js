import{a as c,S as u,i as a}from"./assets/vendor-CDxLX-s2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();c.defaults.baseURL="https://pixabay.com/api/";const d="54999884-4d839e27ebe2eddea2e630097",f=t=>c.get("",{params:{key:d,q:String(t),image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r?.data?.hits);let p=new u(".gallery a",{captionDelay:220,captionsData:"alt"});const n={gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")},m=t=>`
    <li class="gallery-item" data-img-id="${t.id}">
      <a href="${t.largeImageURL}" class="picture-link">
        <img src="${t.webformatURL}" alt="${t.tags}" class="picture-img" />
        <div class="picture-info">
          <ul class="info-list">
            <li class="info-item">
              <span class="info-title">Likes</span>
              <span class="info-data">${t.likes}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Views</span>
              <span class="info-data">${t.views}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Comments</span>
              <span class="info-data">${t.comments}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Downloads</span>
              <span class="info-data">${t.downloads}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>  
  `,y=t=>{const r=t.map(o=>m(o)).join("");n.gallery.innerHTML=r,p.refresh()},g=()=>{n.gallery.innerHTML=""},h=()=>{n.loader.classList.remove("is-hidden")},b=()=>{n.loader.classList.add("is-hidden")},L={form:document.querySelector(".js-search-form")};a.settings({timeout:5e3,resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight"});const S=t=>{t.preventDefault();const r=t.target,o=r.elements.query.value.trim();if(!o){a.error({message:"Query must be!",position:"topRight"});return}g(),h();const i=t.submitter||r.querySelector('button[type="submit"]');i&&(i.disabled=!0),f(o).then(e=>{if(e.length===0){a.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(e)}).catch(e=>{a.error({message:e.message,position:"topRight"})}).finally(()=>{i&&(i.disabled=!1),b()})};L.form.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
