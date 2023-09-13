import { PixabayAPI } from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { initializeInfiniteScroll } from './js/infinite-scroll';

const gallery = document.querySelector('.gallery');
const searchForm = document.getElementById('search-form');
const pixabayAPI = new PixabayAPI();

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  try {
    pixabayAPI.q = searchQuery;
    const response = await pixabayAPI.getPhotoBySearch();
    const data = response.data;

    gallery.innerHTML = '';

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const cardsHTML = data.hits.map(image => createPhotoCard(image)).join('');
      gallery.innerHTML = cardsHTML;
      Notiflix.Notify.success('A match was found.');
    }
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
  }
});

function createPhotoCard(image) {
  return `
    <a href="${image.largeImageURL}" class="photo-card" data-lightbox="image">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `;
}

const lightbox = new SimpleLightbox('.gallery a', {
  navigation: true,
  animationSlide: true,
  animationSpeed: 150,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  swipeClose: true,
});

gallery.addEventListener('DOMNodeInserted', () => {
  lightbox.refresh();
});
