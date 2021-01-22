
const request = require('request')

const weather = (location,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a6d8ca5446c1e62b802ccb89bba9d6cb&query=' + encodeURIComponent(location)
    // console.log(location)
    // console.log(url)
    request( {url: url, json: true}, (error,response) => {
    if (error) {
        callback(error,undefined)
    } else { 
        if (response.body.error) {
        callback(response.body.error,undefined)
        } else {
        const weatherData = response.body.current
        const city = response.body.location.name + ', ' + response.body.location.region +',' + response.body.location.country
        const currTemp = weatherData.temperature
        const feelsLike = weatherData.feelslike
        callback(undefined,{city,currTemp,feelsLike} )
    } }
})

}

module.exports = weather