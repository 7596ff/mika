const request = require('request')
const BaseURL = require('../../constants.js').BaseURL
const queryString = require('../../util/queryString.js')

module.exports = (account_id, options) => {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/players/${account_id}/wl${query}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
