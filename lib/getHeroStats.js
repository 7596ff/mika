const request = require('request')
const BaseURL = require('../constants').BaseURL
const queryString = require('../util/queryString')

/**
 * Returns stats about hero preformance in recent matches.
 * @param {Object} [{}] options - An object of options to query for (see https://docs.opendota.com/#tag/hero-stats%2Fpaths%2F~1heroStats%2Fget query paramanters for more details)
 */
function getHeroStats(options) {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/heroStats${query}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getHeroStats
