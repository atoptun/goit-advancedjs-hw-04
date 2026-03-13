import{a as p,S as B,i as n}from"./assets/vendor-CDxLX-s2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function d(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();p.defaults.baseURL="https://pixabay.com/api/";const w="54999884-4d839e27ebe2eddea2e630097",y=async(e,t=1,s=15)=>(await p.get("",{params:{key:w,q:String(e),page:t,per_page:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}))?.data;let v=new B(".gallery a",{captionDelay:220,captionsData:"alt"});const i={gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more-btn")},M=e=>`
    <li class="gallery-item" data-img-id="${e.id}">
      <a href="${e.largeImageURL}" class="picture-link">
        <img src="${e.webformatURL}" alt="${e.tags}" class="picture-img" />
        <div class="picture-info">
          <ul class="info-list">
            <li class="info-item">
              <span class="info-title">Likes</span>
              <span class="info-data">${e.likes}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Views</span>
              <span class="info-data">${e.views}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Comments</span>
              <span class="info-data">${e.comments}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Downloads</span>
              <span class="info-data">${e.downloads}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>  
  `,g=e=>{const t=e.map(s=>M(s)).join("");i.gallery.insertAdjacentHTML("beforeend",t),v.refresh()},q=()=>i.gallery?.firstElementChild?.getBoundingClientRect().height||0,P=()=>{i.gallery.innerHTML=""},h=()=>{i.loader.classList.remove("is-hidden")},b=()=>{i.loader.classList.add("is-hidden")},H=()=>{i.loadMoreBtn.classList.remove("is-hidden")},m=()=>{i.loadMoreBtn.classList.add("is-hidden")},o={form:document.querySelector(".js-search-form"),formSubmitBtn:document.querySelector('.js-search-form > button[type="submit"]'),loadMoreBtn:document.querySelector(".js-load-more-btn")};n.settings({timeout:5e3,resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight"});let l=1,f=15,c=null,L=0;const S=e=>{Math.ceil(e/f)>l?H():(m(),n.warning({message:"We're sorry, but you've reached the end of search results."}))},O=async e=>{if(e.preventDefault(),c=e.target.elements.query.value.trim(),!c){n.error({message:"Query must be!"});return}l=1,P(),h(),m(),o.formSubmitBtn&&(o.formSubmitBtn.disabled=!0);try{const s=await y(c,l,f);if(s.totalHits===0){n.warning({message:"Sorry, there are no images matching your search query. Please try again!"});return}g(s.hits),S(s.totalHits),L=q()}catch(s){n.error({message:s.message})}finally{o.formSubmitBtn&&(o.formSubmitBtn.disabled=!1),b()}},$=async e=>{o.formSubmitBtn&&(o.formSubmitBtn.disabled=!0),m(),h(),l++;try{const t=await y(c,l,f);if(t.totalHits===0){n.warning({message:"Sorry, there are no images matching your search query. Please try again!"});return}g(t.hits),S(t.totalHits),setTimeout(()=>{window.scrollBy({top:L*2,left:0,behavior:"smooth"})},500)}catch(t){n.error({message:t.message})}finally{o.formSubmitBtn&&(o.formSubmitBtn.disabled=!1),b()}};o.form.addEventListener("submit",O);o.loadMoreBtn.addEventListener("click",$);
//# sourceMappingURL=index.js.map
