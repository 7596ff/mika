const Mika = require('./index.js')

var mika = new Mika();

mika.players.getPlayer('103637655').then((player) => {
    console.log(`Solo MMR: ${player.solo_competitive_rank}`)
    console.log(`Account ID: ${player.profile.account_id}`)
    console.log(`Name: ${player.profile.personaname}`)
}).catch((response) => {
    console.log(`statusCode: ${response.statusCode}`)
    console.log(`body: ${response.body}`)
})

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
