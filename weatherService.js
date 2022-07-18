// GET https://api.weather.gov/points/39.7671755,-86.1591514
// NEXT ENDPOINT TO HIT: payload.properties.forecastHourly 
// EXAMPLE: GET https://api.weather.gov/gridpoints/IND/57,68/forecast/hourly
//          User-Agent: (DMG Weather App Demo, dmgregg@hey.com)
//          Accept: application/ld+json
// HOURLY FORECAST DATA: payload.properties.periods (array)

const baseURL = "https://api.weather.gov"

function getGridPointURL (latitude, longitude) {
    return fetch(`${baseURL}/points/${latitude},${longitude}`)
        .then(response => response.json())
        .then(payload => payload.properties.forecastHourly)
}

function getHourlyForecastByURL (url) {
    return fetch(url)
        .then(response => response.json())
        .then(payload => payload.properties.periods)
}

function getHourlyForecastByCoords(latitude, longitude) {
    return getGridPointURL(latitude, longitude)
        .then(getHourlyForecastByURL)
}

export { getHourlyForecastByCoords }