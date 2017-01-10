const request = require('request')
const BaseURL = require('../../constants').BaseURL

/**
 * Returns the status of a replay parse job.
 * @param {string} job_id - The string of the job id to request.
 */
module.exports = (job_id) => {
    return new Promise((resolve, reject) => {
        if (!job_id) reject('Please supply a job id!')
        request(`${BaseURL}/request/{job_id}`, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(response)
            }
        })
    })
}
