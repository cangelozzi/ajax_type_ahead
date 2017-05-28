const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// create an empty array that will hold all the cities
const cities = [];

// fetch data from endpoint using browser fetch feature. FYI: fetch() returns always a "Promise". With this promise we can use THEN which gives us a "raw data" (which we call BLOB)...this data is still a promise, and we can use a method of if (.json), to finally transform all the raw data in JSON!!!
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data)); // we need to use a SPREAD operator to push data into the array, since we are dealing with 'const'

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the word matches a State or/and a City
    // using a regex
    const regex = new RegExp(wordToMatch, 'gi'); // g = Global; i = Insensitive (lower and upper case)
    return place.city.match(regex) || place.state.match(regex);
  });
}

// to display number with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// function to DISPLAY matches
function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  // show matches on the DOM
  const html = matchArray.map(place => {
    // highlight match finds
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
            <li>
              <span class='name'>${cityName}, ${stateName}</span>
              <span class='population'>${numberWithCommas(place.population)}</span>
            </li>
          `;
  }).join('');
  suggestions.innerHTML = html;
}

// select entry on the DOM
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);