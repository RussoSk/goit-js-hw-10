// export function fetchCountries(name) {
//     const url = `https://restcountries.com/v2/name/${name}`;
    
//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Unable to fetch countries.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.error(error);
//         return [];
//       });
//   }

  // fetchCountries.js (продовження)

  export function fetchCountries(name) {
    const params = new URLSearchParams({
      fields: 'name,flags,capital,population,languages',
    });
    return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`).then(
      countries => {
        if (!countries.ok) {
          throw new Error(countries.status);
        }
        return countries.json();
    })
          .then(data => {
            return data;
          })
          .catch(error => {
            console.error(error);
            return [];
          });
      }
    