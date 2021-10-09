const getWeatherBtn = document.querySelector("form");
const displayContent = document.querySelector("#display-content");
let createForecastToday = document.createElement("div");
let createForecastTomorrow = document.createElement("div");
let createForecastNextTwoDays = document.createElement("div");

const forecast = document.querySelector("#forecast");
forecast.append(
  createForecastToday,
  createForecastTomorrow,
  createForecastNextTwoDays
);

getWeatherBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("#location-input").value;
  getWeather(input);
});

function getWeather(inputCity) {
  let url = `https://wttr.in/${inputCity}?format=j1`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let cityHeading = data.nearest_area[0].areaName[0].value;
      let cityRegion = data.nearest_area[0].region[0].value;
      let cityCountry = data.nearest_area[0].country[0].value;
      let cityCurrentlyFeelsLifeInFarenheit =
        data.current_condition[0].FeelsLikeF;

      displayContent.innerHTML = `
            <h2>${cityHeading}</h2>
            <p class="display-data">
            <span><strong>Area: </strong>${cityHeading}</span>
            <span><strong>Region: </strong>${cityRegion}</span>
            <span><strong>Country: </strong>${cityCountry}</span>
            <span><strong>Currently: </strong>Feels Like ${cityCurrentlyFeelsLifeInFarenheit}&#176;F</span>
            </p> 
        `;

      let todayAvgTemp = data.weather[0].avgtempF;
      let todayMaxTemp = data.weather[0].maxtempF;
      let todayMinTemp = data.weather[0].mintempF;
      let tomorrowAvgTemp = data.weather[1].avgtempF;
      let tomorrowMaxTemp = data.weather[1].maxtempF;
      let tomorrowMinTemp = data.weather[1].mintempF;
      let nextTwoDaysAvgTemp = data.weather[2].avgtempF;
      let nextTwoDaysMaxTemp = data.weather[2].maxtempF;
      let nextTwoDaysMinTemp = data.weather[1].mintempF;

      createForecastToday.innerHTML = `
        <h4>Today</h4>
        <p class="display-today">
        <span><strong>Average Temperature: </strong>${todayAvgTemp}&#176;F</span>
        <span><strong>Max Temperature: </strong>${todayMaxTemp}&#176;F</span>
        <span><strong>Min Temperature: </strong>${todayMinTemp}&#176;F</span>
        </p> 
        `;

      createForecastTomorrow.innerHTML = `
        <h4>Tomorrow</h4>
        <p class="display-tomorrow">
        <span><strong>Average Temperature: </strong>${tomorrowAvgTemp}&#176;F</span>
        <span><strong>Max Temperature: </strong>${tomorrowMaxTemp}&#176;F</span>
        <span><strong>Min Temperature: </strong>${tomorrowMinTemp}&#176;F</span>
        </p> 
        `;

      createForecastNextTwoDays.innerHTML = `
        <h4>Day After Tomorrow</h4>
        <p class="display-next-two-days">
        <span><strong>Average Temperature: </strong>${nextTwoDaysAvgTemp}&#176;F</span>
        <span><strong>Max Temperature: </strong>${nextTwoDaysMaxTemp}&#176;F</span>
        <span><strong>Min Temperature: </strong>${nextTwoDaysMinTemp}&#176;F</span>
        </p> 
        `;
    });
}
