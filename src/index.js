

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

// пошук країн
function handleSearch(event) {
  const searchTerm = event.target.value.trim();
  console.clear();

  if (searchTerm === "") {
    clearResults();
    clearInfo();
    return;
  }

  fetchCountries(searchTerm)
    .then(countries => {
      if (countries.length === 0) {
        clearResults();
        clearInfo();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (countries.length === 1) {
        renderCountryInfo(countries[0]);
        clearResults();
      } else if (countries.length <= 10) {
        renderCountryList(countries);
        clearInfo();
      } else {
        clearResults();
        clearInfo();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch((error) => {
      clearResults();
      clearInfo();
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        Notiflix.Notify.failure(error.message);
      }
    });
}

// створення списку до 10 країн
function renderCountryList(countries) {
  const countryItems = countries
    .map(country => `<li><img src="${country.flags.png}" alt="${country.flags.alt}"><span>${country.name.official}</span></li>`)
    .join('');

  countryList.innerHTML = countryItems;
}

// інфа про одну країну
function renderCountryInfo(country) {
  const { name, capital, population, flags, languages } = country;
  const languageList = Object.values(languages).join(', ');

  const countryHTML = `
    <h2><img src="${flags.png}" alt="${flags.alt}" /><span>${name.official}</span></h2>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${languageList}</p>
  `;

  countryInfo.innerHTML = countryHTML;
}

function clearResults() {
  countryList.innerHTML = '';
}

function clearInfo() {
  countryInfo.innerHTML = '';
}
