// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var fetchButton = document.getElementById("search-btn");
var inputValue = document.getElementById("search-input");

fetchButton.addEventListener("click", function(event) {
    event.preventDefault();
    getApi(inputValue.value);
});


function getApi(city) {
    var getLatLong = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=e893f77c4ef5c1780913960b49428199";
    console.log(getLatLong);
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
    var currentCard = document.getElementById("current-weather");
    var card = document.createElement("div");
    var cardName = document.createElement("div");
    var cardBody = document.createElement("div");
    var iconImg = document.createElement("img");
    while (currentCard.firstChild) {
        currentCard.removeChild(currentCard.firstChild);
      }
    card.classList.add("card");
    cardName.classList.add("card-header");
    cardBody.classList.add("card-body");
    cardName.textContent = cityName;
    cardBody.innerHTML = `temp: ${cityData.main.temp} humidity: ${cityData.main.humidity} wind speed: ${cityData.wind.speed}`;
    iconImg.setAttribute("src", `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`);
    card.append(cardName);
    card.append(iconImg);
    card.append(cardBody);
    currentCard.append(card);
    
    localStorage.setItem(cityName, JSON.stringify(cityName));
}

function fiveDayDisplay(weatherData) {
    var fiveDays = document.getElementById("five-day-container");
    while (fiveDays.firstChild) {
        fiveDays.removeChild(fiveDays.firstChild);
      }
    for (let i = 0; i < weatherData.list.length; i++) {
        var element = weatherData.list[i];
        if (element.dt_txt.includes("06:00:00")) {
            let card = document.createElement("div");
            card.classList.add("card", "col-2");
            let cardName = document.createElement("div");
            cardName.classList.add("card-header");
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardName.textContent = element.dt_txt;
            cardBody.innerHTML = `temp: ${element.main.temp} humidity: ${element.main.humidity} wind speed: ${element.wind.speed}`;
            let cardImg = document.createElement("img");
            cardImg.setAttribute("src", `https://openweathermap.org/img/wn/${element.weather[0].icon}.png`);
            card.append(cardName);
            card.append(cardImg);
            card.append(cardBody);
            fiveDays.append(card);
        
        }
        
    }

}



function renderPast() {
    var savedCard = document.getElementById("past-searches");
    for (let i = 0; i < window.localStorage.length; i++) {
        var keys = JSON.parse(localStorage.getItem(localStorage.key(i)));

        var savedBtn = document.createElement("button");
        savedBtn.classList.add("btn", "saved-btn", "btn-outline-primary", "col");
        savedBtn.textContent = keys;
        savedCard.append(savedBtn);
    }
    
}

renderPast();

var fetchSaved = $(".saved-btn");

// why did this not work with vanilla javascript??????

fetchSaved.on("click", function(event) {
    var savedCity = event.target.textContent;
    getApi(savedCity);
});

