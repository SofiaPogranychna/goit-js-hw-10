import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorElement = document.querySelector(".error");

function showLoader() {
  loader.textContent = "";
  loader.style.display = "block";
  catInfoDiv.innerHTML = "";
}

function hideLoader() {
  loader.style.display = "none";

}

function showError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function hideError() {
  errorElement.style.display = "none";
}

hideLoader();
hideError();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    

new SlimSelect({
  select: document.querySelector('.breed-select')

  
})
    
})

  .catch(error => {
    console.error("Error loading breeds:", error);
    showError(error);
  })
  .finally(() => {
    hideLoader();
  });

breedSelect.addEventListener("change", () => {
  showLoader();
  hideError();

  const selectedBreedId = breedSelect.value;


fetchCatByBreed(selectedBreedId)
  .then(catData => {
    if (catData) {
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" class="cat-image">
        <p class="breed-info"> ${catData.breeds[0].name}</p>
        <p class="description-info"> ${catData.breeds[0].description}</p>
        <p class="temperament-info"><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;
    } else {
      catInfoDiv.innerHTML = "<p>No information available for this breed.</p>";
    }
  })
   .catch(error => {
      console.error("Error fetching cat info:", error);
      showError(error);
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
})
    .finally(() => {
      hideLoader();
    });
});
