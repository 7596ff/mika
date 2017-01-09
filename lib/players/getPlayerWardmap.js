const request = require('request')
const BaseURL = require('../../constants').BaseURL
const queryString = require('../../util/queryString')

/**
 * Returns mapping data for a player's ward and sentry placing habits, from which a ward map can be generated.
 * @param {string} account_id - Which account to request.
 * @param {Object} options - An object of options to query for (see https://docs.opendota.com/#tag/players%2Fpaths%2F~1players~1%7Baccount_id%7D~1wl%2Fget query paramanters for more details)
 */
module.exports = (account_id, options) => {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/players/${account_id}/wardmap${query}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            }
            else {
                reject(response)
            }
        })
    })
}
