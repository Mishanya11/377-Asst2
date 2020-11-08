const restaurants = [];

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data))

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi')
        return place.name.match(regex) || place.category.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}<br></span>
                <span class="category">${place.category}<br></span>
                <span class="address_line_1">${place.address_line_1}<br></span>
                <span class="city">${place.city}<br></span>
                <span class="zip">${place.zip}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');

const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);