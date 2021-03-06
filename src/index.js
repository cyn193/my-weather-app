function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "254df1ba559cbf726420dd388597e410";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div> <ul class="weekly-forecast">
     <li>
       ${formatDay(forecastDay.dt)}
       <img
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         width="30"
       />
       <span class="max-temp"> ${Math.round(
         forecastDay.temp.max
       )}°F </span>|<span class="min-temp"> ${Math.round(
          forecastDay.temp.min
        )}°F</span>
     </li>
   </ul>
   </div>
   `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  fahrenheitTemp = response.data.main.temp;
  let temperature = Math.round(fahrenheitTemp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels-like");
  feel.innerHTML = `Feels like: 🌡️  ${feelsLike}°F`;
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity-rate");
  humidity.innerHTML = `Humidity: 💧 ${humid}%`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind-rate");
  windSpeed.innerHTML = `Wind speed: 🌀 ${wind}km/h`;
  let description = response.data.weather[0].description;
  let weatherType = document.querySelector("#weather-type");
  weatherType.innerHTML = `Expect: ${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");

  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;

  let apiKey = "254df1ba559cbf726420dd388597e410";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let form = document.querySelector("#user-form");
form.addEventListener("submit", search);

let currentTime = new Date();
let h6 = document.querySelector("h6");
h6.innerHTML = `${currentTime}`;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
