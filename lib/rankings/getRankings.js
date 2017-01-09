const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns top players by hero for a specific hero.
 * @param {string} hero_id - Which hero to request.
 */
module.exports = (hero_id) => {
    if (!hero_id || hero_id < 1 || hero_id >= 114) reject('Please supply a proper hero id!')
    return new Promise((resolve, reject) => {
        request(`${BaseURL}/rankings?hero_id=${hero_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
