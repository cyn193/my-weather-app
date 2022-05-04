function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°F`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels-like");
  feel.innerHTML = `Feels like 🌡️  ${feelsLike}°F`;
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity-rate");
  humidity.innerHTML = `Humidity 💧 ${humid}`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind-rate");
  windSpeed.innerHTML = `Wind speed 🌀 ${wind}km/h`;
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

let form = document.querySelector("#user-form");
form.addEventListener("submit", search);

let currentTime = new Date();
let h4 = document.querySelector("h4");
h4.innerHTML = `${currentTime}`;
