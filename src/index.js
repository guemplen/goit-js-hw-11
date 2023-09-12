import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
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
      settings: {
        contentPosition: 'absolute', // 'absolute' or 'relative'
      },
    });
    loader.style.display = 'none';
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      catInfo.innerHTML = `
      <div class="cat-info-left">
        <img src="${catData.url}" alt="Cat">
      </div>
      <div class="cat-info-right">
        <h2>${catData.breeds[0].name}</h2>
        <p>${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      </div>
      `;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
