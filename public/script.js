const restaurants = [];

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

fetch(endpoint)
    .then(blob => blob.json)
    .then(data => restaurants.push(...data))

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi')
        return restaurants.name.match(regex) || restaurants.category.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}</span>
                <span class="category">${place.category}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');

const searchInput = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);