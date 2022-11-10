
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

// when searching the city from here it will show the current data of the city and also save it in the history
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    mainFunction()
    saveHistory(cityHistory);
})
//function for local storage for the cities searched
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

// this function will show the current city data of weather humid temp wind speed with icon
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

// this function will display the 5 day forcast
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
       

      // creating all the elements for temp, humidity, wind and adding styles
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

// search history from the local history
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



//this code while clicking the city search history then it will present with current and future weather conditions
$(document).on("click", ".display", function () {
    let buttonCity = $(this).text();
    console.log(buttonCity);

    fetchCityData(buttonCity)

}
)