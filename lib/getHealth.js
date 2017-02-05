const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns the health of the OpenDota api.
 */
function getHealth() {
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/health`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getHealth
