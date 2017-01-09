const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns an array of 100 randomly sampled public match shells.
 * @param {Object} options - An object of options to query for (see https://docs.opendota.com/#tag/hero-stats%2Fpaths%2F~1heroStats%2Fget query paramanters for more details)
 */
module.exports = (options) => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/heroStats`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}