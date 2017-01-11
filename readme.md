[![NPM](https://nodei.co/npm/mika.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mika/)

##mika [![Build Status](https://travis-ci.org/bippum/mika.svg?branch=master)](https://travis-ci.org/bippum/mika)

a javascript wrapper for the opendota api.

###examples

```js
const Mika = require('mika')

var mika = new Mika();

mika.players.getPlayer('<your account id>').then((player) => {
    console.log(`Solo MMR: ${player.solo_competitive_rank}`)
    console.log(`Account ID: ${player.profile.account_id}`)
    console.log(`Name: ${player.profile.personaname}`)
}).catch((response) => {
    console.log(`statusCode: ${response.statusCode}`)
    console.log(`body: ${response.body}`)
})

mika.players.getPlayerCounts('<your account id>').then((counts) => {
    let leavers = 0
    for (leaver_stat in counts.leaver_status) {
        if (leaver_stat != "0") {
            leavers += counts.leaver_status[leaver_stat].games
        }
    }
    console.log(`\nGames with at least one leaver: ${leavers}`)
}).catch((response) => {
    console.log(`statusCode: ${response.statusCode}`)
    console.log(`body: ${response.body}`)
})
```

###[docs](https://bippum.github.io/mika-docs/)
