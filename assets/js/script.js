//look for search city
//look for click search button
//look for history stored after user search

var apiKey = "8d6fedb89a89e930cd42aacc3d71bd01";
var currentDay = moment().format("h:mm:ss a");

/*var searchCity = document.getElementById("city");
var startbtn = document.getElementById("search");
var historyStored = document.getElementById("history");
var sectionContainer = document.getElementById("container")*/







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