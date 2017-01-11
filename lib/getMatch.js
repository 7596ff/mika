const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns data about a specified match.
 * @param {string} match_id - Which match to request.
 */
function getMatch(match_id) {
    return new Promise((resolve, reject) => {
        if (!match_id) reject('Please supply a match id!')
        request(`${BaseURL}/matches/${match_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}

module.exports = getMatch