const request = require('request')
const BaseURL = require('../constants').BaseURL

/**
 * Returns an object to generate a replay URL from.
 */
function getReplays(match_id) {
    return new Promise((resolve, reject) => {
        if (!match_id) reject('Please supply a match id!')
        request(`${BaseURL}/replays?match_id=${match_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}

module.exports = getReplays
