const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns metadata about OpenDota.
 */
function getMetadata() {
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/metadata`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getMetadata
