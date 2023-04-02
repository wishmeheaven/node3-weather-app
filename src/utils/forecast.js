
const request = require('postman-request')

const forecast = (lon, lat, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c2a4c91ef0e8216986f648cb4af2c86b'
    request({ url, json: true }, (error, { body }) => {

        // const resp = response.body

        if ( error ) {
            callback('Unable to connect the location services', undefined)
        } else if (body.weather.length === 0 ) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                current_temp: (body.main.temp - 273.15).toFixed(2),
                feels_like: (body.main.feels_like - 273.15).toFixed(2),
                weather: body.weather[0].description
            })
        }

        // const jsonpResponse = 'test({"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":284.78,"feels_like":284.11,"temp_min":283.87,"temp_max":285.52,"pressure":995,"humidity":81},"visibility":10000,"wind":{"speed":7.2,"deg":210,"gust":15.43},"clouds":{"all":75},"dt":1679521796,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1679464774,"sunset":1679508922},"timezone":0,"id":2643743,"name":"London","cod":200})';

        // const jsonStr = jsonpResponse.replace(/^test\((.*)\)$/, '$1'); // Remove function call
        // const data = JSON.parse(jsonStr); // Parse JSON string
        // console.log(data); // Outputs parsed JSON object
        // if(error) {
        //     callback('Unable to connect to location services', undefined)
        // } else if () {

        // }
    })
    
}

// export default forecast

module.exports = forecast