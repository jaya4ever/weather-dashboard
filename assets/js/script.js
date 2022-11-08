
// one call API key
var apiKey = "bffc4134e0146aa836b4872685a56bfe";

// form inputs for weather
let searchBtn = document.querySelector("#search")
let city_Input = document.querySelector("#city")
let storeHistory = document.querySelector("#storeHistory")
let searchCity = ""

let cityHistory = [];
if (localStorage.searchedCity !== undefined) {
    cityHistory = JSON.parse(localStorage.searchedCity)
}
saveHistory();

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    mainFunction()
    saveHistory(cityHistory);
})
// function for local storage for the cities searched
function mainFunction() {
    searchCity = city_Input.value

    console.log(city_Input.value)

    cityHistory.push(city_Input.value)

    localStorage.setItem("searchedCity", JSON.stringify(cityHistory))
    console.log(localStorage);
    console.log(localStorage.searchedCity);
    console.log(cityHistory);

    fetchCityData(searchCity)

}
// fetching weather data through API key
function fetchCityData(searchCity) {
    let apiKey = "bffc4134e0146aa836b4872685a56bfe";

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=bffc4134e0146aa836b4872685a56bfe`)
        .then(response => response.json())
        .then(geoData => {


            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=bffc4134e0146aa836b4872685a56bfe&exclude=hourly,minutely&units=imperial`)
        })

        .then(response => response.json())
        .then(cityData => {

            // console.log(cityData);

            pullCurrentData(cityData, searchCity);
            futureData(cityData);

        })
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
function pullCurrentData(cityData, searchCity) {

    console.log(cityData);
    
    document.querySelector("#currentArea").classList.add("currentBorder")

    let currentDate = moment()
    let date = (currentDate.format('MMM Do YY'))
    document.querySelector("#cityCurrent").innerText = searchCity + ", " + date;

    let iconUrl = `<img src= "http://openweathermap.org/img/wn/${cityData.current.weather[0].icon}@2x.png"/>`
  

    document.querySelector("#currentIcon").innerHTML = iconUrl
    document.querySelector("#temp").innerText = "Temp: " + cityData.current.temp + "℉"
    document.querySelector("#wind").innerText = "Wind: " + cityData.current.wind_speed + " MPH"
    document.querySelector("#humidity").innerText = "Humidity: " + cityData.current.humidity + " %"
    

    
}

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function futureData(cityData) {

    let futureHeader = document.querySelector("#futureHeader");
    futureHeader.innerHTML = "5-Day Forecast";

    // console.log(cityData.daily);
    let futureArray8 = cityData.daily;
    let futureArray = futureArray8.slice(1);
    

    let cardsArea = document.querySelector("#cityFuture");
    // console.log(cardsArea);
    cardsArea.innerHTML = "";


    for (let i = 0; i < 5; i++) {
        let cardContent = document.createElement("div")


        let iconUrl = `<img src= "http://openweathermap.org/img/wn/${futureArray[i].weather[0].icon}@2x.png"/>`
        // console.log(iconUrl)


        let temp = document.createElement("p")
        temp.textContent = futureArray[i].temp.day + "℉"
        cardContent.appendChild(temp)
        cardContent.classList.add("card");

        let humidity = document.createElement("p")
        humidity.textContent = "humidity"
        cardContent.appendChild(humidity)

        let wind = document.createElement("p")
        wind.textContent = "wind"
        cardContent.appendChild(wind)

        /

        cardsArea.appendChild(cardContent);

        cardContent.innerHTML = `
        <div >
        <div class="card custom-card forecastColor">
            <h2 class="futureDate whiteText" style="font-size: 0.9rem">${moment.unix(futureArray[i].dt).format("l")}</h2>
            <p>${iconUrl}</p>
            <p class="tempFuture whiteText" style="font-size: 0.9rem">Temp: ${futureArray[i].temp.day + "℉"}</p>
            <p class="windFuture whiteText" style="font-size: 0.9rem">Wind: ${futureArray[i].wind_speed + " MPH"}</p>
            <p class="humidityFuture whiteText" style="font-size: 0.9rem">Humidity: ${futureArray[i].humidity + " %"}</p>
        </div>
    </div>
        `
    }
}

// Build search history using local storage from above
function saveHistory() {
    storeHistory.innerHTML = "";

    for (let i = 0; i < cityHistory.length; i++) {

        let pastButton = document.createElement("button")
        pastButton.textContent = cityHistory[i];
        pastButton.classList.add("btn-light");
        pastButton.classList.add("col-md-11");
        pastButton.classList.add("display")
        storeHistory.prepend(pastButton);

        console.log(pastButton.textContent)

    }
}

// console.log(cityHistory)

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
$(document).on("click", ".display", function () {
    let buttonCity = $(this).text();
    console.log(buttonCity);

    fetchCityData(buttonCity)

}
)