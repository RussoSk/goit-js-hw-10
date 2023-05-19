import './css/styles.css';

const DEBOUNCE_DELAY = 300;


// import { fetchCountries } from './fetchCountries.js';

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// searchBox.addEventListener('input', handleSearch);

// function handleSearch(event) {
//   const searchTerm = event.target.value.trim();

//   if (searchTerm) {
//     fetchCountries(searchTerm)
//       .then(countries => {
//         renderCountryList(countries);
//       })
//       .catch(error => {
//         console.error(error);
//         countryList.innerHTML = 'Error occurred while fetching countries.';
//       });
//   } else {
//     countryList.innerHTML = '';
//     countryInfo.innerHTML = '';
//   }
// }

// function renderCountryList(countries) {
//   if (countries.length === 0) {
//     countryList.innerHTML = 'No countries found.';
//     return;
//   }

//   const countryItems = countries
//     .map(country => `<li>${country.name.official}</li>`)
//     .join('');
//   countryList.innerHTML = countryItems;
// }

// countryList.addEventListener('click', handleCountryItemClick);

// function handleCountryItemClick(event) {
//   const selectedCountry = event.target.textContent;

//   fetchCountries(selectedCountry)
//     .then(countries => {
//       if (countries.length > 0) {
//         const country = countries[0];
//         renderCountryInfo(country);
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       countryInfo.innerHTML = 'Error occurred while fetching country.';
//     });
// }

// function renderCountryInfo(country) {
//     const { name, capital, population, flags, languages } = country;
  
//     const languageList = Object.values(languages).join(', ');
  
//     const countryHTML = `
//       <h2>${name.official}</h2>
//       <p><strong>Capital:</strong> ${capital}</p>
//       <p><strong>Population:</strong> ${population}</p>
//       <img src="${flags.png}" alt="${flags.alt}" />
//       <p><strong>Languages:</strong> ${languageList}</p>
//     `;
  
//     countryInfo.innerHTML = countryHTML;
//   }


// 2
// import { fetchCountries } from './fetchCountries.js';
// import debounce from 'lodash.debounce';

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

// function handleSearch(event) {
//   const searchTerm = event.target.value.trim();

//   if (searchTerm) {
//     fetchCountries(searchTerm)
//       .then(countries => {
//         renderCountryList(countries);
//       })
//       .catch(error => {
//         console.error(error);
//         countryList.innerHTML = 'Error occurred while fetching countries.';
//       });
//   } else {
//     countryList.innerHTML = '';
//     countryInfo.innerHTML = '';
//   }
// }

// function renderCountryList(countries) {
//   if (countries.length === 0) {
//     countryList.innerHTML = 'No countries found.';
//     return;
//   }

//   const countryItems = countries
//     .map(country => `<li>${country.name.official}</li>`)
//     .join('');
//   countryList.innerHTML = countryItems;

//   countryList.addEventListener('click', handleCountryItemClick);
// }

// function handleCountryItemClick(event) {
//   const selectedCountry = event.target.textContent;

//   fetchCountries(selectedCountry)
//     .then(countries => {
//       if (countries.length > 0) {
//         const country = countries[0];
//         renderCountryInfo(country);
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       countryInfo.innerHTML = 'Error occurred while fetching country.';
//     });
// }

// function renderCountryInfo(country) {
//   const { name, capital, population, flags, languages } = country;
//   const languageList = Object.values(languages).join(', ');

//   const countryHTML = `
//     <h2>${name.official}</h2>
//     <p><strong>Capital:</strong> ${capital}</p>
//     <p><strong>Population:</strong> ${population}</p>
//     <img src="${flags.png}" alt="${flags.alt}" />
//     <p><strong>Languages:</strong> ${languageList}</p>
//   `;

//   countryInfo.innerHTML = countryHTML;
// }
// 3
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm) {
    fetchCountries(searchTerm)
      .then(countries => {
        if (countries.length > 10) {
          showNotification('Too many matches found. Please enter a more specific name.');
          clearResults();
        } else if (countries.length > 1 && countries.length <= 10) {
          renderCountryList(countries);
          clearInfo();
        } else if (countries.length === 1) {
          renderCountryInfo(countries[0]);
          clearResults();
        } else {
          clearResults();
          clearInfo();
        }
      })
      .catch(error => {
        console.error(error);
        showNotification('Error occurred while fetching countries.');
      });
  } else {
    clearResults();
    clearInfo();
  }
}

function renderCountryList(countries) {
  const countryItems = countries
    .map(country => `<li><img src="${country.flags.png}" alt="${country.flags.alt}">${country.name.official}</li>`)
    .join('');

  countryList.innerHTML = countryItems;
}

function renderCountryInfo(country) {
  const { name, capital, population, flags, languages } = country;
  const languageList = Object.values(languages).join(', ');

  const countryHTML = `
    <h2>${name.official}</h2>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <img src="${flags.png}" alt="${flags.alt}" />
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

function showNotification(message) {
  Notiflix.Notify.info(message);
}
