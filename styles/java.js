//Updating the date
function updateDate() {
  var currentDate = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var formattedDate = currentDate.toLocaleDateString(undefined, options);
  document.getElementById("date").textContent = formattedDate;
}

// Call updateDate initially
updateDate();

// Update the date every second
setInterval(updateDate, 1000);
setInterval(getFormattedTime, 100);

// OpenWeather API

function displayResults(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let feelsLike = document.querySelector("#feelsLike");
  let apTemp = Math.round(response.data.main.feels_like);
  let iconElement = document.querySelector("#icon");
  let celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  feelsLike.innerHTML = `Feels Like: ${apTemp}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#hour").innerHTML = getFormattedTime(
    response.data.timezone
  );
  const formattedTimezone = getFormattedTime(response.data.timezone);
  getForecast(response.data.coord);

  displayForecast;
}

function getFormattedTime(timezoneOffset) {
  const utcDate = new Date();
  const utcHours = utcDate.getUTCHours();
  const utcMinutes = utcDate.getUTCMinutes();
  let localHours = utcHours + Math.floor(timezoneOffset / 3600);
  let localMinutes = utcMinutes + Math.floor((timezoneOffset % 3600) / 60);

  if (localHours >= 24) {
    localHours -= 24;
  } else if (localHours < 0) {
    localHours += 24;
  }

  if (localMinutes >= 60) {
    localHours += Math.floor(localMinutes / 60);
    localMinutes %= 60;
  }
  const formattedTime = `${localHours
    .toString()
    .padStart(2, "0")}:${localMinutes.toString().padStart(2, "0")}`;
  return formattedTime;
}

function search(city) {
  let apiKey = "c76db1bd2c2a808bab15d20555e59a59";
  let units = "metric";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayResults);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", handleSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c76db1bd2c2a808bab15d20555e59a59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

search("San Francisco");
