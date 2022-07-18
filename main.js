import { getHourlyForecastByCoords } from "./weatherService.js"

// 1. Get user's latitude & longitude coordinates.
// 2. Send those coordinates to a weather API to retrieve weather data.

const geolocationOptions = { enableHighAccuracy: true }
navigator.geolocation.getCurrentPosition(onSuccess, onError, geolocationOptions)

function onSuccess(position) {
    console.log(position.coords.latitude, position.coords.longitude)

    getHourlyForecastByCoords(position.coords.latitude, position.coords.longitude)
        .then(forecastPeriods => console.log(forecastPeriods[0]))
}

function onError(error) {
    console.warn(error)

    getHourlyForecastByCoords(41.881832, -87.623177)
        .then(forecastPeriods => console.log(forecastPeriods[0]))
}
