//look for search city
//look for click search button
//look for history stored after user search

var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
var currentDay = moment().format("h:mm:ss a");

var searchCity = document.getElementById("city");
var startSearch = document.getElementById("search");
var historyStored = document.getElementById("history");


var searchForTheCity = "";
var historyOfTheCity = [];

// pulls the city array from the local storage
function cityList() {
    var searchedCities = Json.parse(localStorage.getItem("City"));
    if (searchedCities !== undefined) {
        historyOfTheCity = searchedCities;

    }

}


/*function weatherList() {
    var storedWeather = Json.parse(localStorage.getItem("currentCity"));
    if (storedWeather !== null) {
        searchForTheCity = storedWeather;

    }
}*/




startSearch.addEventListener("click", function (event) {
    
    event.preventDefault();

    startFunction();
    historySaved(historyOfTheCity);

    
    //fetchData();
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity.value}&appid=8d6fedb89a89e930cd42aacc3d71bd01`)
        .then(response => response.json())
        .then(geoData => {
            console.log(geoData);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=8d6fedb89a89e930cd42aacc3d71bd01`)
                .then(response => response.json())
                .then(weatherData => {
                    console.log(weatherData);
                  
                    //console.log(weatherList);
                    //console.log(cityData);

                })
            console.log(geoData[0].lat);
            console.log(geoData[0].lon);
        })


})


function startFunction(){
    searchForTheCity = searchCity.value;
    console.log(searchCity.value);

    historyOfTheCity.push(searchCity.value);
    localStorage.setItem("searchedCities", JSON.stringify(historyOfTheCity));


}

function historySaved(){
    historyStored.innerHTML ="";
    for (var i = 0; i < historyOfTheCity.length; i++){
        var savedButton = document.getElementById("button");
        
    
        

    }
}

/*function fetchData(){
    var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
    //fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity.value}&appid=${apiKey}`)
    .then(response => response.json())
    .then(geoData => {
        //
https://api.openweathermap.org/data/2.5/forecast?lat=42.3554334&lon=-71.060511&appid=8d6fedb89a89e930cd42aacc3d71bd01
//https://api.openweathermap.org/geo/1.0/direct?q=boston&appid=8d6fedb89a89e930cd42aacc3d71bd01
    //return fetch(`https://api.openweathermap.org/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}&exclude=hourly,minutely&units=imperial`)
    })
    .then(response => response.json())
    .then(cityData => {

       

        //pullCurrentData(cityData, searchForTheCity);
        //futureData(cityData);
  console.log(cityData);
    })

}*/