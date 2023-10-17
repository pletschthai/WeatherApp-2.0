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
let apiKey = "c76db1bd2c2a808bab15d20555e59a59";
let units = "metric";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayResults);

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

  document.querySelector("#hour").innerHTML = getFormattedTime(
    response.data.timezone
  );
  const formattedTimezone = getFormattedTime(response.data.timezone);
  timeBackground(formattedTimezone);
  getForecast(response.data.coord);
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
