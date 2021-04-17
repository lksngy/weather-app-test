const request = require('request')

const weatherstack = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f0ebef48b81018f2d8dbc2bb99f16088&query=${latitude},${longitude}`

    request({url, json: true}, (error,{body}) => {
        if (error) {
            callback('Cannot finish your request', undefined)
        } else if (body.error) {
            callback(`Error code: ${body.error.code}. ${body.error.info}`, undefined)
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees outside and it feels like ${current.feelslike} degrees.`)
        }
    })
}

module.exports = weatherstack