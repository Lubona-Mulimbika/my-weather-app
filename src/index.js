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

const hours = dateNow.getHours() < 10 ? `0${hours}` : dateNow.getHours();

const minutes =
  dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes();
const time = `${hours}:${minutes}`;

currentDateDisplayed.innerHTML = `${daysOfWeek[dayNow]}, ${
  monthsOfYear[monthNow]
} ${day}, ${dateNow.getFullYear()} <br> ${time}`;

let currentLocation = document.querySelector("#currentLocation");
let enterLocation = document.querySelector("#enterLocation");
let searchForm = document.querySelector("#search-city");
let currentTemp = document.querySelector(".current-temp");
let apiKey = "c6f8ef4575250284954db9f4dfa7a996";

function displayWeatherData(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  currentLocation.innerHTML = city;
  currentTemp.innerHTML = `${temperature}&deg;C`;
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
