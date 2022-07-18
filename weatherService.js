// GET https://api.weather.gov/points/39.7671755,-86.1591514
// NEXT ENDPOINT TO HIT: payload.forecastHourly 
// EXAMPLE: GET https://api.weather.gov/gridpoints/IND/57,68/forecast/hourly
//          User-Agent: Today's Weather: David Michael Gregg <david@kenzie.academy>
//          Accept: application/ld+json
// HOURLY FORECAST DATA: payload.periods (array)

const baseURL = "https://api.weather.gov"
const headers = new Headers({
    "User-Agent": "Today's Weather: David Michael Gregg <david@kenzie.academy>",
    "Accept": "application/ld+json",
})

function getWeeklyForecastByCoords(coords) {
    return getWeeklyGridPointURL(coords.latitude, coords.longitude)
        .then(getForecastPeriods)
}

function getHourlyForecastByCoords(coords) {
    return getHourlyGridPointURL(coords.latitude, coords.longitude)
        .then(getForecastPeriods)
}

function getWeeklyGridPointURL (latitude, longitude) {
    return fetch(`${baseURL}/points/${latitude},${longitude}`, { headers })
        .then(response => response.json())
        .then(payload => payload.forecast)
}

function getHourlyGridPointURL (latitude, longitude) {
    return fetch(`${baseURL}/points/${latitude},${longitude}`, { headers })
        .then(response => response.json())
        .then(payload => payload.forecastHourly)
}

function getForecastPeriods (url) {
    return fetch(url, { headers })
        .then(response => response.json())
        .then(payload => {
            console.log(payload.periods)
            return payload.periods
        })
}


export { getHourlyForecastByCoords, getWeeklyForecastByCoords }