import { fetchBreeds } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchCatBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    const options = breeds.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));
    new SlimSelect({
      select: breedSelect,
      data: options,
    });
    loader.style.display = 'none';
  })
  .catch(error => {
    //console.error('Error', error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });
