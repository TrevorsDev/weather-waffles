/*
1) user inputs city into search bar
2) user clicks submit button 
3) JS needs to be connected to users action of clicking HTML button (event listener)
3) Event listener attached to submit button listens for a click of button to submit username
4) We create a function that takes in the location of the users city name  
5) We create a function that takes in the users city name and gathers data about that city
6) Display users city data on current city temp
7) Create function for current weather

setparate functions for current weather and five day forecst*/
// My API key: 38438435bd1e08c9d78e0ac7cd864567
function getWeather(lat, lon) {
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=38438435bd1e08c9d78e0ac7cd864567&units=imperial';

    fetch(weatherURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log("This here b tha data", data);
            clearSubmition();
            todayWeather(data);
        })
}

const button = document.getElementById("submit-button");
const searchBox = document.getElementById("search-box");
button.addEventListener("click", (event) => {
    console.log(searchBox.value);
    event.preventDefault();
    getLatAndLong(searchBox.value);
});

// added the ability to press the "Enter" key after a city is inputted into the Search box
searchBox.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        getLatAndLong(searchBox.value);
        return;
    }
});

if (searchBox.value) {
    console.log(searchBox.value);
} else {
    console.log('im not greater than 1');
}

function getLatAndLong(cityName) {
    console.log(cityName);
    const cityNameURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=38438435bd1e08c9d78e0ac7cd864567'
    console.log(cityNameURL);
    fetch(cityNameURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const lat = data[0].lat
            const lon = data[0].lon
            getWeather(lat, lon);
        })
}
var currentWeather = document.querySelector("#current-weather");
function todayWeather(data) {
    var currentCity = document.createElement("h2");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentCity.textContent = data.name;

    var currentTemp = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentTemp.textContent = `Temp :    ${data.main.temp} °`;

    var currentWind = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentWind.textContent = `Wind༄ :    ${data.wind.speed}`;

    var currentHumidity = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentHumidity.textContent = 'Humidity ♨ :' + '   ' + data.main.humidity;

    currentWeather.appendChild(currentCity);
    currentWeather.appendChild(currentTemp);
    currentWeather.appendChild(currentWind);
    currentWeather.appendChild(currentHumidity);

}

function clearSubmition() {
    currentWeather.innerHTML = "";
}


