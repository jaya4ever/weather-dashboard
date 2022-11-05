//look for search city
//look for click search button
//look for history stored after user search

var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
var currentDay = moment().format("h:mm:ss a");

var searchCity = document.getElementById("city");
var startSearch = document.getElementById("search");
var historyStored = document.getElementById("history");

var cityInput = document.querySelector('#city-input');
var city = document.querySelector('#city-name');

var temp = document.querySelector('#temperature');
var humid = document.querySelector('#humidity');
var wind = document.querySelector('#wind');



var searchForTheCity = "";
// var historyOfTheCity = [];

// pulls the city array from the local storage
// function cityList() {
//     var searchedCities = Json.parse(localStorage.getItem("City"));
//     if (searchedCities !== undefined) {
//         historyOfTheCity = searchedCities;

//     }

// }


/*function weatherList() {
    var storedWeather = Json.parse(localStorage.getItem("currentCity"));
    if (storedWeather !== null) {
        searchForTheCity = storedWeather;
        
    }
}*/
function startFunction() {
    var userInput = searchCity.value;
    console.log(userInput);

    // historyOfTheCity.push(searchCity.value);
    // localStorage.setItem("searchedCities", JSON.stringify(historyOfTheCity));
    start(userInput)

}

function start(city) {


    // startFunction();
    // historySaved(historyOfTheCity);


    //fetchData();
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=imperial&appid=8d6fedb89a89e930cd42aacc3d71bd01`)
        .then(response => response.json())
        .then(geoData => {
            runForecast(geoData);
            runCurrentWeather(geoData)

        })


}

function runCurrentWeather(geoData) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
            console.log('THIS IS CURRENT WEATHER!!!', weatherData);

            

           









        })
        
}


function runForecast(geoData) {
    console.log(geoData);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=8d6fedb89a89e930cd42aacc3d71bd01`)
        .then(response => response.json())
        .then(weatherData => {
            console.log('THIS IS THE FORECAST!!!', weatherData);

            //console.log(weatherList);
            //console.log(cityData);

        })
}






function historySaved() {
    historyStored.innerHTML = "";
    for (var i = 0; i < historyOfTheCity.length; i++) {
        var savedButton = document.getElementById("button");




    }
}


startSearch.addEventListener("click", startFunction)

