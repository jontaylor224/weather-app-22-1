function requestLocationPermission (onSuccess, onError) {
    const onSuccessWithLogging = position => {
        console.info(`Found coordinates: ${position.coords.latitude}, ${position.coords.longitude}`)
        onSuccess(position)
    }

    navigator
        .geolocation
        .getCurrentPosition(onSuccessWithLogging, onError, { enableHighAccuracy: true })
}

function guessCoordsByIPAddress () {
    return fetch("https://hutils.loxal.net/whois")
        .then(response => response.json())
        .then(payload => {
            const coords = {
                latitude: payload.latitude,
                longitude: payload.longitude,
            }

            console.info(`Guessed coordinates: ${coords.latitude}, ${coords.longitude}`)
            return coords
        })
}

export { requestLocationPermission, guessCoordsByIPAddress }