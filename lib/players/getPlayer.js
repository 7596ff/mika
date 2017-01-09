const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns player data for a specified account id.
 * @param {string} account_id - Which account to request.
 */
module.exports = (account_id) => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/players/${account_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
