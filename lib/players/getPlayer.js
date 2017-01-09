const request = require('request')
const BaseURL = require('../../constants.js').BaseURL

module.exports = (account_id) => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/players/${account_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}
