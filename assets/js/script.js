//look for search city
//look for click search button
//look for history stored after user search

//var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
var currentDay = moment().format("h:mm:ss a");

var searchCity = document.getElementById("#search-city");
var startSearch = document.getElementById("#search");
var historyStored = document.getElementById("#history");

var searchForTheCity ="";
var historyOfTheCity =[];

// pulls the city array from the local storage
function cityList(){
    var searchedCities = Json.parse(localStorage.getItem("CityList"));
    if(searchedCities !== null){
        historyOfTheCity = searchedCities;
        //localStorage.setItem("CityList", JSON.stringify(searchedCities));
    }
    
}

function weatherList(){
    var storedWeather = Json.parse(localStorage.getItem("currentCity"));
    if(storedWeather !==null){
        searchForTheCity = storedWeather;
    }
}

function fetchData(){
    var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${apiKey}`)
    .then(response => response.json())
    .then(geoData => {
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}&exclude=hourly,minutely&units=imperial`)
    })
    .then(response => response.json())
    .then(cityData => {

       

        //pullCurrentData(cityData, searchForTheCity);
        //futureData(cityData);
  console.log(cityData);
    })

}

startSearch.addEventListener("click", function (event){
    event.preventDefault();
 
})