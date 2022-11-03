//look for search city
//look for click search button
//look for history stored after user search

var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
var currentDay = moment().format("h:mm:ss a");

var searchCity = document.getElementById("#search-city");
var startSearch = document.getElementById("#search-button");
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

startSearch.addEventListener("click", function (event){
    event.preventDefault();
 
})