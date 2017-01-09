const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns metadata about OpenDota.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/metadata`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
