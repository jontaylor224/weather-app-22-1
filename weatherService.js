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

function getHourlyForecastByCoords(coords) {
    return getGridPointURL(coords.latitude, coords.longitude)
        .then(getHourlyForecast)
}

function getGridPointURL (latitude, longitude) {
    return fetch(`${baseURL}/points/${latitude},${longitude}`, { headers })
        .then(response => response.json())
        .then(payload => payload.forecastHourly)
}

function getHourlyForecast (url) {
    return fetch(url, { headers })
        .then(response => response.json())
        .then(payload => payload.periods)
}

export { getHourlyForecastByCoords }