const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns an array of 100 recent pro matches.
 */
function getProMatches() {
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/proMatches`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getProMatches
