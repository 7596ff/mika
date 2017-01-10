const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns the status of a replay parse job.
 * @param {string} match_id - The string of the match id to request.
 */
module.exports = (match_id) => {
    return new Promise((resolve, reject) => {
        if (!match_id) reject('Please supply a match id!')
        request(`${BaseURL}/request/{match_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
