const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFsbHVyaXJhamVzaCIsImEiOiJja2p2aDJ5aTYwNWV1MnpudHRqa25iZHYyIn0.3_K8NiMlk9w8Ms8dmgk3jA'
    // console.log(url)
    request ({ url: url, json: true}, (error,response) => {
        if (error) {
            callback('Some kind of an error',undefined)
        } else if ( response.body.features.length === 0) {
            callback('Some other kind of error',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].text
            })
        }
    })
}
module.exports =  geocode