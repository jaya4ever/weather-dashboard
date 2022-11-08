//look for search city
//look for click search button
//look for history stored after user search

var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
let searchButton = document.querySelector("#search")
let cityInput = document.querySelector("#city")
let historyArea = document.querySelector("#storeHistory")
let searchCity = ""

let cityHistory = [];
if (localStorage.searchedCity !== undefined) {
    cityHistory = JSON.parse(localStorage.searchedCity)
}
saveHistory();







searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    mainFunction()
    saveHistory(cityHistory);
})



function mainFunction() {
    searchCity = cityInput.value

    console.log(cityInput.value)

    cityHistory.push(cityInput.value)

    localStorage.setItem("searchedCity", JSON.stringify(cityHistory))
    console.log(localStorage);
    console.log(localStorage.searchedCity);
    console.log(cityHistory);

    fetchCityData(searchCity)

}


function pullCurrentData(cityData, searchCity) {

    console.log(cityData);
    // console.log(cityData.current.weather[0].icon)
    // console.log(cityData.current.temp);
    // console.log(cityData.current.wind_speed);
    // console.log(cityData.current.humidity);
    // console.log(cityData.current.uvi);
    document.querySelector("#currentArea").classList.add("currentBorder")

    let currentDate = moment()
    let date = (currentDate.format('MMM Do YY'))
    document.querySelector("#cityCurrent").innerText = searchCity + ", " + date;

    let iconUrl = `<img src= "http://openweathermap.org/img/wn/${cityData.current.weather[0].icon}@2x.png"/>`

    document.querySelector("#currentIcon").innerHTML = iconUrl
    document.querySelector("#temp").innerText = "Temp: " + cityData.current.temp + "℉"
    document.querySelector("#wind").innerText = "Wind: " + cityData.current.wind_speed + " MPH"
    document.querySelector("#humidity").innerText = "Humidity: " + cityData.current.humidity + " %"
    document.querySelector("#uv").innerText = "UV Index: "
    let index = `<span id="uvColor" class="px-2 py-2 rounded">${cityData.current.uvi}</span>`
    $("#uv").append(index)

    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    if (cityData.current.uvi >= 0 && cityData.current.uvi <= 2) {
        $("#uvColor").css("background-color", "green").css("color", "white");
    } else if (cityData.current.uvi >= 2 && cityData.current.uvi <= 5) {
        $("#uvColor").css("background-color", "yellow").css("color", "black");
    } else {
        $("#uvColor").css("background-color", "red").css("color", "white");
    }
}


function futureData(cityData) {

    let futureHeader = document.querySelector("#futureHeader");
    futureHeader.innerHTML = "5-Day Forecast";

    // console.log(cityData.daily);
    let futureArray8 = cityData.daily;
    let futureArray = futureArray8.slice(1);
    // console.log(futureArray.slice(1));
    // console.log(futureArray)

    let cardsArea = document.querySelector("#cityFuture");
    // console.log(cardsArea);
    cardsArea.innerHTML = "";


    for (let i = 0; i < 5; i++) {
        let cardContent = document.createElement("div")


        let iconUrl = `<img src= "http://openweathermap.org/img/wn/${futureArray[i].weather[0].icon}@2x.png"/>`

        let temp = document.createElement("h5")
        temp.textContent = futureArray[i].temp.day + "℉"
        cardContent.appendChild(temp)
        cardContent.classList.add("card");

        let humidity = document.createElement("h5")
        humidity.textContent = "humidity"
        cardContent.appendChild(humidity)

        let wind = document.createElement("h5")
        wind.textContent = "wind"
        cardContent.appendChild(wind)

        // console.log(futureArray[i].dt)
        // console.log(futureArray[i].temp.day + "℉");
        // console.log(futureArray[i].wind_speed + " MPH");
        // console.log(futureArray[i].humidity + " %");

        cardsArea.appendChild(cardContent);

        cardContent.innerHTML = `
        <div >
        <div class="card custom-card forecastColor">
            <h2 class="futureDate whiteText" style="font-size: 0.9rem">${moment.unix(futureArray[i].dt).format("l")}</h2>
            <p>${iconUrl}</p>
            <h5 class="tempFuture whiteText" style="font-size: 0.9rem">Temp: ${futureArray[i].temp.day + "℉"}</h5>
            <h5 class="windFuture whiteText" style="font-size: 0.9rem">Wind: ${futureArray[i].wind_speed + " MPH"}</h5>
            <h5 class="humidityFuture whiteText" style="font-size: 0.9rem">Humidity: ${futureArray[i].humidity + " %"}</h5>
        </div>
    </div>
        `
    }
}
    // console.log(iconUrl)


/*var searchCity = document.getElementById("city");
var startbtn = document.getElementById("search");
var historyStored = document.getElementById("history");
var sectionContainer = document.getElementById("container")*/

/*function renderCities(){
    $("#cityList").empty();
    $("#cityInput").val("");
    
    for (i=0; i<cityList.length; i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
        a.text(cityList[i]);
        $("#cityList").prepend(a);
    } 
}



function storedCityList() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    
    if (storedCities !== undefined) {
        cityList = storedCities;
    }
    
    renderCities();
    }
   


  //this function pulls the city list from the local storage to display current weather
    function storedWeatherList() {
        var storedWeather = JSON.parse(localStorage.getItem("currentCity"));
    
        if (storedWeather !== null) {
            cityname = storedWeather;
    
            displayWeather();
            displayFiveDayForecast();
        }
    }

    // This function saves the city array to local storage
function storeCityArray() {
    localStorage.setItem("cities", JSON.stringify(cityList));
    }

// This function saves the currently display city to local storage
function storeCurrentCity() {

    localStorage.setItem("currentCity", JSON.stringify(cityname));
}

$("#citySearchBtn").on("click", function(event){
    event.preventDefault();

    cityname = $("#cityInput").val().trim();
    if(cityname === ""){
        alert("Please enter a city to look up")

    }else if (cityList.length >= 5){  
        cityList.shift();
        cityList.push(cityname);

    }else{
    cityList.push(cityname);
    }

    storeCurrentCity();
    storeCityArray();
    renderCities();
    displayWeather();
    displayFiveDayForecast();
    
});

// Event handler for if the user hits enter after entering the city search term
$("#cityInput").keypress(function(e){
    if(e.which == 13){
        $("#citySearchBtn").click();
    }
})










async function displayWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=8d6fedb89a89e930cd42aacc3d71bd01";

    var response = await $.ajax({
        url: queryURL,
        method: "GET"
      })
        console.log(response);

        var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
        var getCurrentCity = response.name;
        var date = new Date();
        var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        var getCurrentWeatherIcon = response.weather[0].icon;
        var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
        var currentCityEl = $("<h3 class = 'card-body'>").text(getCurrentCity+" ("+val+")");
        currentCityEl.append(displayCurrentWeatherIcon);
        currentWeatherDiv.append(currentCityEl);
        var getTemp = response.main.temp.toFixed(2);
        var tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
        currentWeatherDiv.append(tempEl);
        var getHumidity = response.main.humidity;
        var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
        currentWeatherDiv.append(humidityEl);
        var getWindSpeed = response.wind.speed.toFixed(1);
        var windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+getWindSpeed+" mph");
        currentWeatherDiv.append(windSpeedEl);
        var getLong = response.coord.lon;
        var getLat = response.coord.lat;
        
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=8d6fedb89a89e930cd42aacc3d71bd01&lat="+getLat+"&lon="+getLong;
        var uvResponse = await $.ajax({
            url: uvURL,
            method: "GET"
        })

        // getting UV Index info and setting color class according to value
        var getUVIndex = uvResponse.value;
        var uvNumber = $("<span>");
        if (getUVIndex > 0 && getUVIndex <= 2.99){
            uvNumber.addClass("low");
        }else if(getUVIndex >= 3 && getUVIndex <= 5.99){
            uvNumber.addClass("moderate");
        }else if(getUVIndex >= 6 && getUVIndex <= 7.99){
            uvNumber.addClass("high");
        }else if(getUVIndex >= 8 && getUVIndex <= 10.99){
            uvNumber.addClass("veryhigh");
        }else{
            uvNumber.addClass("extreme");
        } 
        uvNumber.text(getUVIndex);
        var uvIndexEl = $("<p class='card-text'>").text("UV Index: ");
        uvNumber.appendTo(uvIndexEl);
        currentWeatherDiv.append(uvIndexEl);
        $("#weatherContainer").html(currentWeatherDiv);

    }
        // This function runs the AJAX call for the 5 day forecast and displays them to the DOM
async function displayFiveDayForecast() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&units=imperial&appid=8d6fedb89a89e930cd42aacc3d71bd01";

    var response = await $.ajax({
        url: queryURL,
        method: "GET"
      })
      var forecastDiv = $("<div  id='fiveDayForecast'>");
      var forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
      forecastDiv.append(forecastHeader);
      var cardDeck = $("<div  class='card-deck'>");
      forecastDiv.append(cardDeck);
       console.log(response);
      
      
      
      
      
      
      
       for (i=0; i<5;i++){
          var forecastCard = $("<div class='card mb-3 mt-3'>");
          var cardBody = $("<div class='card-body'>");
          var date = new Date();
          var val=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
          var forecastDate = $("<h5 class='card-title'>").text(val);
        



        cardBody.append(forecastDate);
        var getCurrentWeatherIcon = response.list[i].weather[0].icon;
        console.log(getCurrentWeatherIcon);
        var displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png />");
        cardBody.append(displayWeatherIcon);
        var getTemp = response.list[i].main.temp;
        var tempEl = $("<p class='card-text'>").text("Temp: "+getTemp+"° F");
        cardBody.append(tempEl);
        var getHumidity = response.list[i].main.humidity;
        var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
        cardBody.append(humidityEl);
        forecastCard.append(cardBody);
        cardDeck.append(forecastCard);

    }
    $("#forecastContainer").html(forecastDiv);
}

function historyDisplayWeather(){
    cityname = $(this).attr("data-name");
    displayWeather();
    displayFiveDayForecast();
    console.log(cityname);



}     

$(document).on("click", ".city", historyDisplayWeather);

storedCityList();
storedWeatherList();*/