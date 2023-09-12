import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_3oGRLVqz5p58IVaJVGiTooNddylqRli4ddKloHZIupFuXHbYrVBGGRTqxCUc7xpx';

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  // headers: {
  //   common: {
  //     'x-api-key':
  //       'live_3oGRLVqz5p58IVaJVGiTooNddylqRli4ddKloHZIupFuXHbYrVBGGRTqxCUc7xpx',
  //   },
  // },
});

export function fetchBreeds() {
  return api
    .get('/breeds')
    .then(response => {
      return response.data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  return api
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      console.log(error);
    });
}
