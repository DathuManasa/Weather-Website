// import { myApi } from './api.js';
// const apikey = myApi();

// const input = document.getElementById('input');
// const searchBtn = document.getElementById('search');

// searchBtn.addEventListener('click', () => {
//   const city = input.value.trim();
//   if (city) {
//     getWeather(city);
//   }
// });

// window.addEventListener("load", () => {
//   // Default city on load
//   getWeather("Delhi");
// });

// function getWeather(city) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Current Weather:", data);
//       weatherReport(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching weather:", error);
//     });
// }

// function weatherReport(data) {
//   const urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

//   fetch(urlcast)
//     .then((res) => res.json())
//     .then((forecast) => {
//       console.log("Forecast:", forecast);
//       hourForecast(forecast);

//       document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
//       document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273.15) + ' °C';
//       document.getElementById('clouds').innerText = data.weather[0].description;
//       document.getElementById('wind').innerText = data.wind.speed + " km/h";
//       document.getElementById('humidity').innerText = data.main.humidity + " %";

//       // 🌤️ Weather-based image switch
//       const mainWeather = data.weather[0].main.toLowerCase();
//       const description = data.weather[0].description.toLowerCase();
//       console.log("Main Weather:", mainWeather);
//       console.log("Description:", description);

//       const imageElement = document.getElementById('img');

//       if (description.includes("scattered clouds")) {
//         imageElement.src = "scatteredClouds.jpg";
//       } else if (description.includes("overcast clouds")) {
//         imageElement.src = "overcastClouds.jpg";
//       } else if (mainWeather.includes("snow")) {
//         imageElement.src = "snow.jpg";
//       } else if (
//         mainWeather.includes("rain") ||
//         mainWeather.includes("drizzle") ||
//         mainWeather.includes("thunderstorm")
//       ) {
//         imageElement.src = "rain.jpg";
//       } else if (mainWeather.includes("clear")) {
//         imageElement.src = "sun.jpg";
//       } else if (mainWeather.includes("cloud")) {
//         imageElement.src = "weather.jpg"; // general cloud fallback
//       } else {
//         imageElement.src = "weather.jpg"; // ultimate fallback
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching forecast:", error);
//     });
// }

// function hourForecast(forecast) {
//   const scrollContainer = document.querySelector('.hourly-scroll');
//   scrollContainer.innerHTML = '';

//   for (let i = 0; i < 12; i++) {
//     const dt = new Date(forecast.list[i].dt * 1000);
//     let hour = dt.getHours();
//     const temp = Math.floor(forecast.list[i].main.temp - 273.15);

//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12;
//     hour = hour === 0 ? 12 : hour;
//     const formattedTime = `${hour} ${ampm}`;

//     const card = document.createElement('div');
//     card.className = 'forecast-card';
//     card.innerHTML = `${formattedTime}<br>${temp}°C`;

//     scrollContainer.appendChild(card);
//   }
// }
import { myApi } from './api.js';
const apikey = myApi();

const input = document.getElementById('input');
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', () => {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
});

window.addEventListener("load", () => {
  getWeather("Delhi");
});

function getWeather(city) {
  let url = '';
  let isManali = city.toLowerCase() === 'manali';

  if (isManali) {
    // Use coordinates for Manali, HP
    url = `https://api.openweathermap.org/data/2.5/weather?lat=32.2396&lon=77.1887&appid=${apikey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apikey}&units=metric`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("Current Weather:", data);
      weatherReport(data, isManali);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
}

function weatherReport(data, isManali = false) {
  let urlcast = '';

  if (isManali) {
    urlcast = `https://api.openweathermap.org/data/2.5/forecast?lat=32.2396&lon=77.1887&appid=${apikey}&units=metric`;
  } else {
    urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}&units=metric`;
  }

  fetch(urlcast)
    .then((res) => res.json())
    .then((forecast) => {
      console.log("Forecast:", forecast);
      hourForecast(forecast);

      document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
      document.getElementById('temperature').innerText = Math.floor(data.main.temp) + ' °C';
      document.getElementById('clouds').innerText = data.weather[0].description;
      document.getElementById('wind').innerText = data.wind.speed + " km/h";
      document.getElementById('humidity').innerText = data.main.humidity + " %";

      // 🌤️ Weather-based image switch
      const mainWeather = data.weather[0].main.toLowerCase();
      const description = data.weather[0].description.toLowerCase();

      console.log("Main Weather:", mainWeather);
      console.log("Description:", description);

      const imageElement = document.getElementById('img');

      if (description.includes("scattered clouds")) {
        imageElement.src = "scatteredClouds.jpg";
      } else if (description.includes("overcast clouds")) {
        imageElement.src = "overcastClouds.jpg";
      } else if (mainWeather.includes("snow")) {
        imageElement.src = "snow.jpg";
      } else if (
        mainWeather.includes("rain") ||
        mainWeather.includes("drizzle") ||
        mainWeather.includes("thunderstorm")
      ) {
        imageElement.src = "rain.jpg";
      } else if (mainWeather.includes("clear")) {
        imageElement.src = "sun.jpg";
      } else if (mainWeather.includes("cloud")) {
        imageElement.src = "weather.jpg";
      } else {
        imageElement.src = "weather.jpg";
      }
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    });
}

function hourForecast(forecast) {
  const scrollContainer = document.querySelector('.hourly-scroll');
  scrollContainer.innerHTML = '';

  for (let i = 0; i < 12; i++) {
    const dt = new Date(forecast.list[i].dt * 1000);
    let hour = dt.getHours();
    const temp = Math.floor(forecast.list[i].main.temp);

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    const formattedTime = `${hour} ${ampm}`;

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `${formattedTime}<br>${temp}°C`;

    scrollContainer.appendChild(card);
  }
}

