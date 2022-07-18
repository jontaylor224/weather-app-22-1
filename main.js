// 1. Get user's latitude & longitude coordinates.
// 2. Send those coordinates to a weather API to retrieve weather data.

import { requestLocationPermission, guessCoordsByIPAddress } from "./locationService.js"
import { getHourlyForecastByCoords } from "./weatherService.js"
import { renderForecasts } from "./view.js"

const mainElement = document.querySelector("main")

requestLocationPermission(onSuccess, onError)



function onSuccess(position) {
    getHourlyForecastByCoords(position.coords)
        .then(selectAndRenderForecasts)
}

function onError(_error) {  // A variable beginning with an underscore is usually used as a convention to show a parameter which is available for use but is currently UNUSED.
    console.warn(
        new Error("User denied accurate geolocation. Guessing location by IP address...")
    )

    guessCoordsByIPAddress()
        .then(getHourlyForecastByCoords)
        .then(selectAndRenderForecasts)
}

function selectAndRenderForecasts (forecastPeriods) {
    const selectedForecasts = forecastPeriods.slice(0, 6)
    renderForecasts(selectedForecasts, mainElement)
}
