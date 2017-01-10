const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns a list of the leagues in Dota 2 that the API can see.
 */
function getLeagues() {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/leagues`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}

module.exports = getLeagues
