const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns the status of the OpenDota api.
 */
function getStatus() {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/status`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}

module.exports = getStatus