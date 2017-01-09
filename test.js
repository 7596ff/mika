const Mika = require('./index.js')

var mika = new Mika();

test = mika.matches.getMatch('2903478562').then((body) => {
    console.log(body.match_id)
}).catch((err) => console.log(err))
