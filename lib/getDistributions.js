const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns MMR data by general distribution and by country.
 */
function getDistributions() {
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/distributions`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getDistributions
