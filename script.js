let currCity = 'Minsk'
let units = 'metric'

let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime')
let weather__forecast = document.querySelector('.weather__forecast')
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");

document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  e.preventDefault();
  currCity = search.value;
  getWeather();
  search.value = "";
});

document.querySelector(".weather__unit_celsius").addEventListener('click', () => {
  if (units !== 'metric'){
    units = 'metric';
    getWeather()
  }
});

document
  .querySelector(".weather__unit_farenheit")
  .addEventListener("click", () => {
    if (units !== "imperial") {
      units = "imperial";
      getWeather();
    }
  });

function convertTimeStamp(timestamp, timezone){
  const convertTimezone = timezone / 3600 //sec to h
  const date = new Date(timestamp * 1000)
  
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(convertTimezone)}`,
    hour12: true
  };

  return date.toLocaleString('en-US', options)
}

function convertCountryCode(country){
     let regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
     return regionNames.of(country)
}

function getWeather(){
  const API_KEY = '273646f2733989c52ef4b848860f715d'

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  ).then(res => res.json()).then(data => { console.log(data) 
    city.innerHTML = `${data.name}, 
    ${convertCountryCode(data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone)
    weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
    weather__temperature.innerHTML = `${Math.round(data.main.temp)}&#176`
    weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
    weather__minmax.innerHTML = `<p>Min: ${Math.round(
      data.main.temp_min
    )}&#176</p><p>Max: ${Math.round(data.main.temp_max)}&#176</p>`;
    weather__realfeel.innerHTML = `${Math.round(data.main.feels_like)}&#176`;
    weather__humidity.innerHTML = `${data.main.humidity}%`;
    weather__wind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph' : 'm/s'}`;
    weather__pressure.innerHTML = `${Math.round(data.main.pressure)} hPa`;
  });
}

document.body.addEventListener('lood', getWeather())