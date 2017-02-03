const request = require('request')
const BaseURL = require('../constants').BaseURL
const queryString = require('../util/queryString')

/**
 * Returns an array of terms related to the query.
 * @param {string} search_term - The term to search for.
 * @param {string} [0.4] similarity - The similarity value, between 0 and 1.
 */
function search(search_term, similarity = "0.4") {
    return new Promise((resolve, reject) => {
        let query = '?' + queryString({
            "q": search_term ? search_term : reject('Please supply a search term!'),
            "similarity": similarity
        })

        this.bucket.enqueue(function () {
            request(`${BaseURL}/search${query}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = search
