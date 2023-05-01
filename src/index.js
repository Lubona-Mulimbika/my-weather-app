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

let currentLocation = document.querySelector("#currentLocation");
let enterLocation = document.querySelector("#enterLocation");
let searchForm = document.querySelector("#search-city");
let currentTemp = document.querySelector(".current-temp");
let humidityValue = document.querySelector(".humidity-value");
let windspeedValue = document.querySelector(".windspeed-value");
let weatherDetail = document.querySelector(".weatherDetail");
let apiKey = "c6f8ef4575250284954db9f4dfa7a996";

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
  } // else {alert("Enter a city name");
}

searchForm.addEventListener("submit", updateWeatherDetails);

let currentLocationBtn = document.querySelector("#current-location-btn");

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

currentLocationBtn.addEventListener("click", setCurrentLocation);
setCurrentLocation();
