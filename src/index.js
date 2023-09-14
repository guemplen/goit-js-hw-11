import { PixabayAPI } from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const pixabayAPI = new PixabayAPI();
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

let searchExecuted = false;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  try {
    pixabayAPI.q = searchQuery;
    pixabayAPI.page = 1;
    gallery.innerHTML = '';
    lightbox.close();

    const response = await pixabayAPI.getPhotoBySearch();
    const data = response.data;

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const cardsHTML = data.hits.map(image => createPhotoCard(image)).join('');
      gallery.innerHTML = cardsHTML;
      Notiflix.Notify.success('A match was found.');
    }

    searchExecuted = true;
  } catch (error) {
    Notiflix.Notify.failure(
      'There is no network connection. Please check your settings and try again..'
    );
    console.error('Error fetching data from Pixabay API:', error);
  }
});

function createPhotoCard(image) {
  return `
    <a href="${image.largeImageURL}" class="photo-card" data-lightbox="image">
      <img src="${image.webformatURL}" alt="${image.tags}"/>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `;
}

const intersectionMarker = document.getElementById('intersection-marker');
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px 0px 400px 0px',
  threshold: 0.1,
});

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMorePhotos();
    }
  });
}

observer.observe(intersectionMarker);

async function loadMorePhotos() {
  if (searchExecuted) {
    try {
      pixabayAPI.page++;
      const response = await pixabayAPI.getPhotoBySearch();
      const data = response.data;

      if (data.hits.length > 0) {
        const cardsHTML = data.hits
          .map(image => createPhotoCard(image))
          .join('');
        gallery.innerHTML += cardsHTML;
        lightbox.refresh();
      }
    } catch (error) {
      console.error('Error fetching more data from Pixabay API:', error);
    }
  }
}
