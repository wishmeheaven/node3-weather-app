
const request = require('postman-request')

const geocode = (address, callback) => {
    // const url = 'https://dev.virtualearth.net/REST/v1/Locations/' + address + '?includeNeighborhood=0&include=ciso2&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8'
    // const url = 'https://dev.virtualearth.net/REST/v1/Locations?q=' + address + '&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8&maxResults=1';
    // const url = 'https://dev.virtualearth.net/REST/v1/Locations?q=' + address + '&includeNeighborhood=1&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8&maxResults=1';
    const url = 'https://dev.virtualearth.net/REST/v1/Locations?q=' + address + '&maxResults=1&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8';

    // const url = 'https://dev.virtualearth.net/REST/v1/Locations?postalCode=19147&includeEntityTypes=PopulatedPlace&key=' + encodeURIComponent(address) + '&maxResults=1&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8'
    // const url = 'https://dev.virtualearth.net/REST/v1/Locations?query=locationQuery&locality='+ encodeURIComponent(address) +'&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8'
    


        request({ url, json: true }, (error, response) => {

            const resp = response.body.resourceSets[0]            

            if (error) {
                callback('Unable to connect to location services', {})
            } else if (resp.resources.length === 0) {
                callback('Unable to find location. Try another search', {})
            } else {
                callback(undefined, {
                    lon: resp.resources[0].point.coordinates[1],
                    lat: resp.resources[0].point.coordinates[0],
                    location: resp.resources[0].address.locality
                })
            }
        })
    }


//     const geocode = (address, callback) => {
//         const url = 'https://dev.virtualearth.net/REST/v1/Locations?q=' + encodeURIComponent(address) + '&maxResults=1&key=AqlC3mPpMo8yf_jvflK4mahehlXROCV5ZPazxTdhhtREVJBW1y5F6OyZL7ytJvD8'

//         request({ url, json: true }, (error, response) => {
//             const resp = response.body.resourceSets[0]
//             if (error) {
//                 callback('Unable to connect to location services', {})
//             } else if (resp && resp.resources && resp.resources.length > 0) {
//                 callback(undefined, {
//                     lon: resp.resources[0].point.coordinates[1].toFixed(4),
//                     lat: resp.resources[0].point.coordinates[0].toFixed(4),
//                     location: resp.resources[0].address.formattedAddress
//                 })
//             } else {
//                 callback('Unable to find location. Try another search', {})
//             }
//         })
//     }
// }


// geocode(process.argv[2], (error,response) => {
//     console.log(error)
//     console.log(response)
// })

// export default geocode

module.exports = geocode