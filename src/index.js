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
}

// Search-change city and click changeTemp
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputEmail1");
  let city = document.querySelector("#main-city");
  city.innerHTML = cityInput.value;

  //know temperature actual and call change temp
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", changeCity);

/*
//Change C and F
let tempCelsiuActual = document.querySelector("#temp-actual");
let tempMainCelsiu = parseInt(tempCelsiuActual.textContent);

//console.log(tempMainCelsiu);

function changeCelsiu() {
  tempCelsiuActual.innerHTML = tempMainCelsiu;
}
function changeFarengeit() {
  let changeFarengeit = Math.floor((tempMainCelsiu * 9) / 5 + 32);
  tempCelsiuActual.innerHTML = changeFarengeit;
}

let tempCelsiu = document.querySelector("#temp-celsiu");
tempCelsiu.addEventListener("click", changeCelsiu);

let tempFarengeit = document.querySelector("#temp-farengeit");
tempFarengeit.addEventListener("click", changeFarengeit);
*/

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
}

navigator.geolocation.getCurrentPosition(geoPosition);

//add week temperature in HTML

function displayWeekWeather() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(function (day) {
    weekWeather.innerHTML += `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-icon">
    <img
      src="https://openweathermap.org/img/wn/01d@2x.png"
      class="weather-forecast-icon"
    />
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>15º</strong>
    </div>
    <div class="weather-forecast-temperature">9º</div>
  </div>
</div>`;
  });
  let weekWeatherForecast = document.querySelector("weekWeather");
  weekWeatherForecast.innerHTML = weekWeather;
}

displayWeekWeather();
