const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns a list of the heroes in Dota 2 as hero objects.
 */
function getHeroes() {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/heroes`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}

module.exports = getHeroes
