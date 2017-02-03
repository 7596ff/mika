const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns the benchmarks of average stat values for a specific hero.
 * @param {string} hero_id - Which hero to request.
 */
function getBenchmarks(hero_id) {
    if (!hero_id || hero_id < 1 || hero_id >= 114) reject('Please supply a proper hero id!')
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/benchmarks?hero_id=${hero_id}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getBenchmarks
