import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '54999884-4d839e27ebe2eddea2e630097';

export const getImagesByQuery = query => {
  return axios
    .get('', {
      params: {
        key: apiKey,
        q: String(query),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(resp => {
      return resp?.data?.hits;
    });
};
