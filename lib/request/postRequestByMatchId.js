const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns the status of a replay parse job.
 * @param {string} match_id - The string of the match id to request.
 */
function postRequestByMatchId(match_id) {
    return new Promise((resolve, reject) => {
        if (!match_id) reject('Please supply a match id!')
        this.bucket.enqueue(function () {
            request.post(`${BaseURL}/request/${match_id}`, (err, response, body) => {
                if (!err && response.statusCode == 200 && !JSON.parse(response.body).err) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = postRequestByMatchId
