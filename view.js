function renderForecasts(arrayOfForecasts, parentElement) {
    arrayOfForecasts.forEach(forecast => renderWeatherCard(forecast, parentElement))

    return parentElement
}

function renderWeatherCard(weatherObject, parentElement) {
    const cardSection = document.createElement("section")
    const iconElement = document.createElement("img")
    const temperatureElement = document.createElement("p")
    const shortForecastElement = document.createElement("p")
    const windConditionsElement = document.createElement("p")

    cardSection.classList.add("weather-card")

    iconElement.src = weatherObject.icon
    temperatureElement.innerText = `${weatherObject.temperature} °F`
    shortForecastElement.innerText = weatherObject.shortForecast
    windConditionsElement.innerText = `${weatherObject.windDirection} ${weatherObject.windSpeed}`

    cardSection.append(
        iconElement,
        temperatureElement,
        shortForecastElement,
        windConditionsElement
    )

    parentElement.append(cardSection)
}

export { renderForecasts }