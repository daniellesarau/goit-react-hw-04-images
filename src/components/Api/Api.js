import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39005157-18352a45bb3800520d2856245';

export const getImages = async (search, page) => {
  const response = await axios.get(BASE_URL, {
    method: 'get',
    params: {
      key: API_KEY,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  // console.log(response.data);
  // console.log(response.data.hits);
  return response;
};
