let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let weekDay = document.querySelector("#weekday");
weekDay.innerHTML = day;

let hours = [now.getHours()];
let minutes = [now.getMinutes()];
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currenthour = document.querySelector("#hour");
currenthour.innerHTML = `${hours}:${minutes}`;

getForecast();

let dayNumber = [now.getDate()];
let year = now.getFullYear();
let months = [
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
let month = months[now.getMonth()];

let currentdate = document.querySelector("#date");
currentdate.innerHTML = `📅 ${dayNumber}.${month}.${year}`;

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemp");
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}ºC`;

  let currentDescription = document.querySelector("#currentDescription");
  let description = response.data.condition.description;
  currentDescription.innerHTML = `${description}`;

  let currenthumidity = document.querySelector("#humidityValue");
  let humidity = response.data.temperature.humidity;
  currenthumidity.innerHTML = `${humidity}%`;

  let currentWind = document.querySelector("#windValue");
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `${wind} km/h`;

  let icon = document.querySelector("#weatherIcon");
  let currentIcon = response.data.condition.icon_url;
  icon.innerHTML = `<img
              src="${currentIcon}"
              class="Icon"
            />`;
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city");
  let cityElement = document.querySelector("#currentCity");
  let city = searchInputElement.value;
  cityElement.innerHTML = city;
  let apiKey = "bb038cb05o3654etef561d10bfa5ef4f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

function defaultCity(city) {
  let apiKey = "bb038cb05o3654etef561d10bfa5ef4f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", search);

let bodyImage = document.querySelector("body");
if (hours < 12) {
  bodyImage.style.backgroundImage =
    'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
} else if (hours > 18) {
  bodyImage.style.backgroundImage =
    'url("https://images.unsplash.com/photo-1568140457903-3755df7a9206?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
} else {
  bodyImage.style.backgroundImage =
    'url("https://images.unsplash.com/photo-1464069668014-99e9cd4abf16?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
}

function getForecast(city) {
  let apiKey = "bb038cb05o3654etef561d10bfa5ef4f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="row">
          <div class="firstDay">
            <div class="forecastDay">${formatDay(day.time)}</div>
            <img 
              src="${day.condition.icon_url}"
              alt=""
              width="72"
              class="forecastIcon"
            />
            <div class="forecastMaxMin">
              <span class="forecastMax">${Math.round(
                day.temperature.maximum
              )}ºC</span>
              <span class="forecastMin">${Math.round(
                day.temperature.minimum
              )}ºC</span>
            </div>
          </div>
        </div>
`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

getForecast("Lisbon");
defaultCity("Lisbon");
