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
      // Notiflix.Notify.failure(
      //   'Oops! Something went wrong! Try reloading the page!'
      // );
      //console.error('Error', error);
      throw error;
    });
}
