// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var fetchButton = document.getElementById("search-btn");
var inputValue = document.getElementById("search-input");
fetchButton.addEventListener("click", function(event) {
    event.preventDefault();
    getApi(inputValue.value);
});
// var formSubmitHandler = function (event) {
//     event.preventDefault();
//     var cityName = city.value.trim();
// }


function getApi(city) {
    var getLatLong = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=e893f77c4ef5c1780913960b49428199";
    console.log(getLatLong);
    // var getLatLong = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=e893f77c4ef5c1780913960b49428199";
;
    fetch(getLatLong)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getCityData(data[0]);
        })
        .catch(function (error) {
            console.log(error);
        })

    // 
}
function getCityData(data) { 
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + data.lat + "&lon=" + data.lon + "&appid=e893f77c4ef5c1780913960b49428199";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            oneDayDisplay(data.list[0], data.city.name);
            fiveDayDisplay(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function oneDayDisplay(cityData, cityName) {
    let currentCard = document.getElementById("current-weather");
    let card = document.createElement("div");
    card.classList.add("card");
    let cardName = document.createElement("div");
    cardName.classList.add("card-title");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardName.textContent = cityName;
    cardBody.innerHTML = `temp: ${cityData.main.temp}`;
    card.append(cardName);
    card.append(cardBody);
    currentCard.append(card);
}

function fiveDayDisplay(weatherData) {
    var fiveDays = document.getElementById("five-day-container");
    for (let i = 0; i < weatherData.list.length; i++) {
        var element = weatherData.list[i];
        if (element.dt_txt.includes("06:00:00")) {
            let card = document.createElement("div");
            card.classList.add("card");
            let cardName = document.createElement("div");
            cardName.classList.add("card-title");
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardName.textContent = element.dt_txt;
            cardBody.innerHTML = element.main.temp;
            card.append(cardName);
            card.append(cardBody);
            fiveDays.append(card);
        
        }
        
    }

}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city