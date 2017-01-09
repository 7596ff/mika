const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns an array of pro players.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/proPlayers`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            }
            else {
                reject(response)
            }
        })
    })
}
