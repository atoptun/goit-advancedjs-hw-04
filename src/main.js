import './js/debug';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';
import * as render from './js/render-functions';

const refs = {
  form: document.querySelector('.js-search-form'),
  formSubmitBtn: document.querySelector(
    '.js-search-form > button[type="submit"]'
  ),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
});

let currentPage = 1;
let perPage = 15;
let currentQuery = null;
let galleryCartHeight = 0;

const checkLoadMoreBtn = totalImages => {
  const totalPages = Math.ceil(totalImages / perPage);
  // console.log(`Page ${currentPage} of ${totalPages}`);
  if (totalPages > currentPage) {
    render.showLoadMoreButton();
  } else {
    render.hideLoadMoreButton();
    iziToast.warning({
      message: `We're sorry, but you've reached the end of search results.`,
    });
  }
};

const onSearchFormSubmit = async e => {
  e.preventDefault();

  const form = e.target;
  currentQuery = form.elements.query.value.trim();
  if (!currentQuery) {
    iziToast.error({ message: 'Query must be!' });
    return;
  }

  currentPage = 1;
  render.clearGallery();
  render.showLoader();
  render.hideLoadMoreButton();
  refs.formSubmitBtn && (refs.formSubmitBtn.disabled = true);

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (data.totalHits === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    render.createGallery(data.hits);
    checkLoadMoreBtn(data.totalHits);
    galleryCartHeight = render.getGalleryCartHeight();
  } catch (error) {
    iziToast.error({ message: error.message });
  } finally {
    refs.formSubmitBtn && (refs.formSubmitBtn.disabled = false);
    render.hideLoader();
  }
};

const onLoadMoreBtnClick = async e => {
  refs.formSubmitBtn && (refs.formSubmitBtn.disabled = true);
  render.hideLoadMoreButton();
  render.showLoader();
  currentPage++;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (data.totalHits === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    render.createGallery(data.hits);
    checkLoadMoreBtn(data.totalHits);

    setTimeout(() => {
      window.scrollBy({
        top: galleryCartHeight * 2,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  } catch (error) {
    iziToast.error({ message: error.message });
  } finally {
    refs.formSubmitBtn && (refs.formSubmitBtn.disabled = false);
    render.hideLoader();
  }
};

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
