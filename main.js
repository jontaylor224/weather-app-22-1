// 1. Get user's latitude & longitude coordinates.
// 2. Send those coordinates to a weather API to retrieve weather data.

import { requestLocationPermission, guessCoordsByIPAddress } from "./locationService.js"
import { getHourlyForecastByCoords, getWeeklyForecastByCoords } from "./weatherService.js"
import { renderForecasts } from "./view.js"

const mainElement = document.querySelector("main")

requestLocationPermission(weeklySuccess, weeklyError)

function hourlySuccess(position) {
    getHourlyForecastByCoords(position.coords)
        .then(selectAndRenderForecasts)
}

function weeklySuccess(position) {
    getWeeklyForecastByCoords(position.coords)
        .then(periods => renderForecasts(periods, mainElement))
}

function hourlyError(_error) {  // A variable beginning with an underscore is usually used as a convention to show a parameter which is available for use but is currently UNUSED.
    console.warn(
        new Error("User denied accurate geolocation. Guessing location by IP address...")
    )

    guessCoordsByIPAddress()
        .then(getHourlyForecastByCoords)
        .then(selectAndRenderForecasts)
}

function weeklyError(_error) {  // A variable beginning with an underscore is usually used as a convention to show a parameter which is available for use but is currently UNUSED.
    console.warn(
        new Error("User denied accurate geolocation. Guessing location by IP address...")
    )

    guessCoordsByIPAddress()
        .then(getWeeklyForecastByCoords)
        .then(periods => renderForecasts(periods, mainElement))
}

function selectAndRenderForecasts (forecastPeriods) {
    const selectedForecasts = forecastPeriods.slice(0, 6)
    renderForecasts(selectedForecasts, mainElement)
}
