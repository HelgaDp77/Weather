// Conversion
function convertToFahrenheit() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "87.8";
}
let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", convertToFahrenheit);
function convertToCelsium() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "31";
}
let temperatureCelsium = document.querySelector("#celsium");
temperatureCelsium.addEventListener("click", convertToCelsium);

// Date
function dateTime(currDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Spetember",
    "October",
    "November",
    "December"
  ];

  let date = currDate.getDate();
  let month = months[currDate.getMonth()];
  let day = days[currDate.getDay()];
  let hours = currDate.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = currDate.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  return `${day}, ${month} ${date} ${hours}:${minutes}`;
}

let existingDate = document.querySelector("#curr-date");
let currDate = new Date();
existingDate.innerHTML = dateTime(currDate);

//Geolocation API
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "dc1f6acef2197a10a6392befe52ea1bf";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

function showTemperature(response) {
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-engine");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  let apiKey = "dc1f6acef2197a10a6392befe52ea1bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&app=id${apiKey}`).then(showTemperature);
}

let citySearch = document.querySelector("#searching-form");
citySearch.addEventListener("submit", showCity);
