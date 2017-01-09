const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns an array of 100 recent pro matches.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/proMatches`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
