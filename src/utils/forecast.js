const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bb8500039a9a5f00487731195bfa14d2/' + longitude + ',' + latitude + '?units=si'

    request({url, json: true}, (error, { body }) => { 
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error){
            callback('Unable to find location')
        } else{
            const {summary, temperatureMin, temperatureMax, precipProbability} = body.daily.data[0]
            callback(undefined,summary 
                        + 'The maximum temperature is '
                        + temperatureMax 
                        + ' degrees, and the Mininum is '
                        + temperatureMin + ' degrees. There is a '
                        + precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast