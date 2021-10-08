let getWeatherBtn = document.querySelector("form#get-weather-form");
let selectDetails = document.querySelector(".display");
let selectUL = document.querySelector("ul");

let selectHistoryDefaultText = document.querySelector(".history-default-text");

getWeatherBtn.addEventListener("submit", getWeather);

function getWeather(obj) {
  obj.preventDefault();

  let inputLocation = document.querySelector("#location-input");
  let url = `https://wttr.in/${inputLocation.value}?format=j1`;

  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      let cityHeading = data.nearest_area[0].areaName[0].value;
      let cityRegion = data.nearest_area[0].region[0].value;
      let cityCountry = data.nearest_area[0].country[0].value;
      let cityCurrentlyFeelsLifeInFarenheit =
        data.current_condition[0].FeelsLikeF;

      selectDetails.innerHTML = `
                    <h2>${cityHeading}</h2>
                    <p class="display-data">
                    <span><strong>Area: </strong>${cityHeading}</span>
                    <span><strong>Region: </strong>${cityRegion}</span>
                    <span><strong>Country: </strong>${cityCountry}</span>
                    <span><strong>Currently: </strong>Feels Like ${cityCurrentlyFeelsLifeInFarenheit}&#176;F</span>
                    </p> 
                `;
      selectHistoryDefaultText.setAttribute("style", "display:none");
      let createRecentList = document.createElement("li");
      createRecentList.textContent = `${cityHeading} - ${cityCurrentlyFeelsLifeInFarenheit}\u00B0F`;
      selectUL.append(createRecentList);
    });
}
