const Mika = require('./index.js')

var mika = new Mika();

test = mika.players.getPlayer('103637655').then((player) => {
    console.log(`Solo MMR: ${player.solo_competitive_rank}`)
    console.log(`Account ID: ${player.profile.account_id}`)
    console.log(`Name: ${player.profile.personaname}`)
}).catch((err) => {
    console.log("err:" + err)
})
