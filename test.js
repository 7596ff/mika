const Mika = require('./index.js')

var mika = new Mika();

console.log('starting getPlayer')
mika.getPlayer('103637655').then((player) => {
    console.log(`Solo MMR: ${player.solo_competitive_rank}`)
    console.log(`Account ID: ${player.profile.account_id}`)
    console.log(`Name: ${player.profile.personaname}`)
}).catch((response) => {
    console.log(`statusCode: ${response.statusCode}`)
    console.log(`body: ${response.body}`)
})

console.log('starting getPlayerCounts')
mika.getPlayerCounts('103637655').then((counts) => {
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

console.log('starting getPlayerWL')
mika.getPlayerWL('103637655').then(wl => {
    console.log(`Wins: ${wl.win}`)
    console.log(`Loss: ${wl.lose}`)
    console.log(`Winrate: ${(wl.win / wl.win + wl.lose) * 100}`)
})

console.log('starting getHealth')
mika.getHealth().then(health => {
    console.log("health of API:")
    console.log(JSON.stringify(health, null, 4))
}).catch((response) => {
    console.log(`statusCode: ${response.statusCode}`)
    console.log(`body: ${response.body}`)
})
