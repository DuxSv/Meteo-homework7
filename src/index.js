//date
function actualDay(actualDay) {
  //let actualDay = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[actualDay.getDay()];
  let hours = actualDay.getHours();
  let minutes = actualDay.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let stringTime = `${day}, ${hours}:${minutes}`;
  return stringTime;
}

let actualDate = new Date();
let changeDay = document.querySelector("#main-day");
changeDay.innerHTML = actualDay(actualDate);

//change temperature for find city
function displayWeather(response) {
  let weatherDiv = document.querySelector("#temp-actual");
  let temperature = Math.round(response.data.main.temp);

  tempMainCelsiu = temperature; //for change Celsiu or Farengeit
  weatherDiv.innerHTML = temperature;
  //change humidity
  let weatherHumidity = document.querySelector("#humididty");
  let humidity = Math.round(response.data.main.humidity);
  weatherHumidity.innerHTML = humidity;
  //change wind
  let weatherWind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  weatherWind.innerHTML = windSpeed;
  //change condition
  let weatherCondition = document.querySelector("#condition");
  let condition = response.data.weather[0].description;
  weatherCondition.innerHTML = condition;
  // icon description
  let weatherIcon = document.querySelector("#iconMain");
  let icon = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" class ="weather-icon"/>`;
  weatherIcon.innerHTML = icon;
  let city = document.querySelector("#main-city");
  city.innerHTML = response.data.name;
  getWeekWeather(response.data.name);
}

// Search-change city and click changeTemp
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputEmail1");

  //know temperature actual and call change temp
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", changeCity);

//find actual geolocation

function geoPosition(position) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lanGeo = position.coords.latitude;
  let longGeo = position.coords.longitude;
  let urlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lanGeo}&lon=${longGeo}&appid=${key}&units=metric`;
  axios.get(urlGeo).then(displayWeatherMain);
}

//change site with actual GEO
function displayWeatherMain(response) {
  let weatherTempMain = document.querySelector("#temp-actual");
  let temperature = Math.round(response.data.main.temp);
  let weatherCityMain = document.querySelector("#main-city");

  weatherTempMain.innerHTML = temperature;
  weatherCityMain.innerHTML = response.data.name;
  //change humidity
  let weatherHumidity = document.querySelector("#humididty");
  let humidity = Math.round(response.data.main.humidity);
  weatherHumidity.innerHTML = humidity;
  //change wind
  let weatherWind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  weatherWind.innerHTML = windSpeed;
  //change condition
  let weatherCondition = document.querySelector("#condition");
  let condition = response.data.weather[0].description;
  weatherCondition.innerHTML = condition;
  // icon description
  //console.log(response.data.weather[0].icon);
  let weatherIcon = document.querySelector("#iconMain");

  let icon = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" class ="weather-icon"/>`;
  weatherIcon.innerHTML = icon;

  getWeekWeather(response.data.name);
}

navigator.geolocation.getCurrentPosition(geoPosition);

// format days for week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// get weather information from Forecast
function getWeekWeather(city) {
  let apiKey = "t758dfo6497f0ccb733838c9b0b4a2a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayWeekWeather);
}
//add week temperature in HTML

function displayWeekWeather(response) {
  let weekWeather = "";
  console.log(response.data);
  response.data.daily.forEach(function (day, index) {
    if ((index > 0) & (index < 6)) {
      weekWeather =
        weekWeather +
        `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div class="weather-forecast-icon">
    <img
      src="${day.condition.icon_url}"
      class="weather-forecast-icon"
    />
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}</strong>
    </div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}</div>
  </div>
</div>`;
    }
  });

  let weekWeatherForecast = document.querySelector("#weekWeather");
  weekWeatherForecast.innerHTML = weekWeather;
}
