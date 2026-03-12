import './js/debug';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';
import * as render from './js/render-functions';

const refs = {
  form: document.querySelector('.js-search-form'),
};

iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
});

const onSearchSubmit = e => {
  e.preventDefault();

  const form = e.target;
  const query = form.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Query must be!',
      position: 'topRight',
    });
    return;
  }

  render.clearGallery();
  render.showLoader();
  const btn = e.submitter || form.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;

  getImagesByQuery(query)
    .then(data => {
      if (data.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      render.createGallery(data);
    })
    .catch(err => {
      iziToast.error({
        message: err.message,
        position: 'topRight',
      });
    })
    .finally(() => {
      if (btn) btn.disabled = false;
      render.hideLoader();
    });
};

refs.form.addEventListener('submit', onSearchSubmit);
