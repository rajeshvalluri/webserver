const request = require('request')
const iptogeo = (ipaddr,callback ) => {
    const url = 'http://api.ipstack.com/' +encodeURIComponent(ipaddr) +'?access_key=c5b64d9a2b62de9e54fabdfb9210c7b3&format=1'
    // console.log(url)
    request ({url: url, json: true},(error,response) => {
        if (error) {
            callback('There has been an error',undefined)
        } else if (response.body.error) {
            callback('Another kind of error',undefined)
        } else {
            callback(undefined,{city, country_code} = response.body)
        }
    })
}

module.exports = iptogeo