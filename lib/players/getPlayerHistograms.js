const request = require('request')
const BaseURL = require('../../constants').BaseURL
const Histograms = require('../../constants').HistogramFields
const queryString = require('../../util/queryString')

/**
 * Returns a list of histogram data points from which a histogram can be drawn. 
 * @param {string} account_id - Which account to request.
 * @param {string} field - Which data the histogram should display. Can be a string or a field from Mika.constants.HistogramFields
 * @param {Object} [{}] options - An object of options to query for (see https://docs.opendota.com/#tag/players%2Fpaths%2F~1players~1%7Baccount_id%7D~1wl%2Fget query paramanters for more details)
 */
function getPlayerHistograms(account_id, field, options) {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        if (!account_id) reject('Please supply an account id!')
        if (!field) reject('Please supply a field!')
        this.bucket.enqueue(function () {
            request(`${BaseURL}/players/${account_id}/histograms/${field}${query}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getPlayerHistograms
