const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns MMR data by general distribution and by country.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/distributions`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
