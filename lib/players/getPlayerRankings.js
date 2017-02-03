const request = require('request')
const BaseURL = require('../../constants').BaseURL
const queryString = require('../../util/queryString')

/**
 * Returns the specified player's rankings on heroes, if there is one. 
 * @param {string} account_id - Which account to request.
 * @param {Object} [{}] options - An object of options to query for (see https://docs.opendota.com/#tag/players%2Fpaths%2F~1players~1%7Baccount_id%7D~1wl%2Fget query paramanters for more details)
 */
function getPlayerRankings(account_id, options) {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        if (!account_id) reject('Please supply an account id!')
        this.bucket.enqueue(function () {
            request(`${BaseURL}/players/${account_id}/ratings${query}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getPlayerRankings
