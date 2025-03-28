// A toi de jouer pour cette partie :-) Happy coding !

async function fetchCoordinates(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('les données reçues :', data);

    return data;
}

async function fetchWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${latitude}=52.52&${longitude}=13.41&hourly=temperature_2m`);
    const data = await response.json();
    console.log('la météo du pays', data);

    return data;
}

let cityInput = document.getElementById('cityInput');
let h1 = document.getElementById('city');
let gps = document.getElementById('gps');
let temperature = document.getElementById('temperature');
let details = document.getElementById('details');
const button = document.getElementById('button');


button.addEventListener('click', async () => {

    let coordinates = await fetchCoordinates(cityInput.value);
    h1.innerText = cityInput.value;

    gps.innerText = coordinates;

    if (coordinates.length) {
        gps.innerText = `Coordonnées GPS : ${coordinates[0].lat}, ${coordinates[0].lon}`;
    } else{
        gps.innerText = "Coordonnées non trouvées";
    }

    let weather = await fetchWeather(coordinates[0].lat, coordinates[0].lon);
    temperature.innerText = weather
    if (!weather) {
        temperature.innerText = "Météo indisponible";
    }
    

    details.innerText = 'Température actuelle';
});



