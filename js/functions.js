const temp_span = document.querySelector('#temp')
const speed_span = document.querySelector('#speed')
const direction_span = document.querySelector('#direction')
const description_span = document.querySelector('#description')
const icon_img = document.querySelector('img')
const url = 'https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'https://openweathermap.org/img/wn/'

const api_key = ''//don't put this on github

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat_span = document.querySelector('#lat')
            const lng_span = document.querySelector('#lng')
            lat_span.innerHTML = 'fetching '
            lng_span.innerHTML = 'fetching '

            let lat = position.coords.latitude
            let lng = position.coords.longitude
            lat_span.textContent = `${lat.toFixed(3)}, `//HUOM: innerHTML ei toimi tässä, ainoastaan textContent
            lng_span.textContent = `${lng.toFixed(3)}`
            getWeather(lat, lng)
        }, (error) => {
            alert(error)
        })
    } else {
        alert('Your browser does not support geolocation!')
    }
}

const getWeather = (lat, lng) => {
    const address = url +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + api_key
    axios
    .get(address)
    .then((response) => {
        const data = response.data
        temp_span.textContent = `${data.main.temp} °C`
        speed_span.textContent = `${data.wind.speed} m/s`
        direction_span.textContent = `${data.wind.deg}°`
        description_span.textContent = `${data.weather[0].description}`
        icon_img.src = `${icon_url}${data.weather[0].icon}@2x.png`
    }).catch(error => alert(error))
}

document.addEventListener('DOMContentLoaded', (event) => {  
    getLocation()
}); 
