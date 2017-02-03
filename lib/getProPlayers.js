const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns an array of pro players.
 */
function getProPlayers() {
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/proPlayers`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getProPlayers
