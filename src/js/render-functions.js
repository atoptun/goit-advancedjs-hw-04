import SimpleLightbox from 'simplelightbox';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 220,
  captionsData: 'alt',
});

const refs = {
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

const createItemMarkup = image => {
  return `
    <li class="gallery-item" data-img-id="${image.id}">
      <a href="${image.largeImageURL}" class="picture-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="picture-img" />
        <div class="picture-info">
          <ul class="info-list">
            <li class="info-item">
              <span class="info-title">Likes</span>
              <span class="info-data">${image.likes}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Views</span>
              <span class="info-data">${image.views}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Comments</span>
              <span class="info-data">${image.comments}</span>
            </li>
            <li class="info-item">
              <span class="info-title">Downloads</span>
              <span class="info-data">${image.downloads}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>  
  `;
};

export const createGallery = images => {
  const markup = images.map(i => createItemMarkup(i)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const getGalleryCartHeight = () => {
  return refs.gallery?.firstElementChild?.getBoundingClientRect().height || 0;  
}

export const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

export const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  refs.loadMoreBtn.classList.add('is-hidden');
};

