const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bb8500039a9a5f00487731195bfa14d2/' + longitude + ',' + latitude + '?units=si'

    request({url, json: true}, (error, { body }) => { 
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error){
            callback('Unable to find location')
        } else{
            const {summary, temperature, precipProbability} = body.currently
            callback(undefined,summary 
                        + ' It is currently '
                        + temperature 
                        + ' degrees out. There is a '
                        + precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast