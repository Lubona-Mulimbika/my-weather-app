let currentDateDisplayed = document.querySelector(".current-date");
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dateNow = new Date();
const dayNow = dateNow.getDay();
const monthNow = dateNow.getMonth();
const day = dateNow.getDate();
let hours = dateNow.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
const minutes =
  dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes();
const time = `${hours}:${minutes}`;

currentDateDisplayed.innerHTML = `${daysOfWeek[dayNow]}, ${monthsOfYear[monthNow]} ${day} <br> ${time}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getDailyForecast(coordinates) {
  let apiKey = "cb4f81d02c3cd5910432ff00a734c2da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  const forecastElement = document.querySelector("#forecast-element");
  let forecastHTML = "";
  forecast.slice(1, 7).forEach(function (forecastDay) {
    let day = formatDay(forecastDay.dt);
    forecastHTML += `<div class="day" class="col">
        <div class="row row1">${day}</div>
        <div class="row row2">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="10" />
        </div>
        <div class="row row3">
           ${Math.round(forecastDay.temp.max)}° | ${Math.round(
      forecastDay.temp.min
    )}° 
        </div>
      </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

let currentLocation = document.querySelector("#currentLocation");
let enterLocation = document.querySelector("#enterLocation");
let searchForm = document.querySelector("#search-city");
let currentTemp = document.querySelector(".current-temp");
let humidityValue = document.querySelector(".humidity-value");
let windspeedValue = document.querySelector(".windspeed-value");
let weatherDetail = document.querySelector(".weatherDetail");
let apiKey = "2478588a2a025d55c9dbe6c95d5058e9";

function displayWeatherData(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let weatherCondition = response.data.weather[0].description;
  weatherCondition =
    weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
  currentLocation.innerHTML = city;
  currentTemp.innerHTML = `${temperature}&deg;C`;
  weatherDetail.innerHTML = weatherCondition;

  let switchCelcius = document.querySelector("#switch-celcius");
  let switchFarenheit = document.querySelector("#switch-farenheit");

  function switchToCelcius() {
    currentTemp.innerHTML = `${temperature}&deg;C`;
  }
  function switchToFarenheit() {
    let farenheitTemp = Math.round(temperature * 1.8 + 32);
    currentTemp.innerHTML = `${farenheitTemp}&deg;F`;
  }

  switchCelcius.addEventListener("click", switchToCelcius);
  switchFarenheit.addEventListener("click", switchToFarenheit);

  let iconToday = document.querySelector("#icon-today");
  let iconData = response.data.weather[0].icon;
  iconToday.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconData}.png`
  );

  humidityValue.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  windspeedValue.innerHTML = ` ${Math.round(response.data.wind.speed)}m/s`;

  getDailyForecast(response.data.coord);
}

function updateWeatherDetails(event) {
  event.preventDefault();
  if (enterLocation.value) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${enterLocation.value}&units=metric&appid=${apiKey}`
      )
      .then(displayWeatherData)
      .catch(() => {
        alert("City not found");
      });
  }
}

searchForm.addEventListener("submit", updateWeatherDetails);

let currentLocationBtn = document.querySelector("#current-location-btn");

currentLocationBtn.addEventListener("click", setCurrentLocation);
setCurrentLocation();

function setCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeatherData);
    },
    function () {
      alert("Could not retrieve your location.");
    }
  );
}
