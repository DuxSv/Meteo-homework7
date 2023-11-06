//date
function actualDay() {
  let actualDay = new Date();
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

let changeDay = document.querySelector("#main-day");
changeDay.innerHTML = actualDay();

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
  console.log(response.data);
}

navigator.geolocation.getCurrentPosition(geoPosition);
