import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = 'key=39422663-06959b14903a1567dcb1fb643';

  constructor() {
    this.q = null;
    this.page = 1;
  }

  getPhotoBySearch() {
    const axiosOptions = {
      params: {
        q: this.q,
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };
    return axios.get(
      `${PixabayAPI.BASE_URL}?${PixabayAPI.API_KEY}`,
      axiosOptions
    );
  }
}
