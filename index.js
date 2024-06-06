function displayTemperature(response){
  let cityTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  cityTemperature.innerHTML = `${temperature}°C`;
  
  let cityInput = document.querySelector("#city");
  cityInput.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  let humidityData = response.data.temperature.humidity;
  humidity.innerHTML = `${humidityData}%`;

  let wind = document.querySelector("#wind");
  let windData = response.data.wind.speed;
  wind.innerHTML = `${windData}km/h`
  

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  time.innerHTML = formatDate(date);
  
  let weatherImage = document.querySelector("#weather-icon");
  weatherImage.innerHTML = `<img
  src="${response.data.condition.icon_url}" class= "weather-icon">`
  
  
}
function formatDate(date){
  
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let day = days[date.getDay()];

  if (minutes < 10){
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}


function inputText(event){
  event.preventDefault();
  let textInput = document.querySelector("#text-input");
  let city = textInput.value;

  let key = "83d92b9c8f0fcoa600da63ca304tf074";
  let apiKey = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;

  axios.get(apiKey).then(displayTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit",inputText);

function displayForecast(){
  let forecast = document.querySelector("#weather-forecast");

  let days = ["Sun","Mon","Tue","Wed","Thu"];
  let forecastHtml = "";

  days.forEach(function (day){

    forecastHtml += `<div class="weather-forecast">
    <p class="weather-forecast-date">${day}</p>
    <img
      src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png"
      alt="weather-icon"
      class="forecast-icon"
    />
    <div class="forecast-temperatures">
      <span><strong>19°C</strong> 14°C </span>
    </div>
    </div>`;
  });

  forecast.innerHTML = forecastHtml;
}

displayForecast();







