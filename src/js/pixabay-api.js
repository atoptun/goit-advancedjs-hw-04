import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '54999884-4d839e27ebe2eddea2e630097';

export const getImagesByQuery = async (query, page = 1, perPage = 15) => {
  const response = await axios.get('', {
    params: {
      key: apiKey,
      q: String(query),
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response?.data;
};
