const Mika = require('./index.js')

var mika = new Mika();

console.log('starting getPlayer')
mika.getPlayer(103637655).then((player) => {
    console.log(`Rank Tier: ${player.rank_tier}`);
    console.log(`Account ID: ${player.profile.account_id}`);
    console.log(`Name: ${player.profile.personaname}`);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

console.log('starting getPlayerCounts')
mika.getPlayerCounts('103637655').then((counts) => {
    let leavers = 0;
    for (leaver_stat in counts.leaver_status) {
        if (leaver_stat != "0") {
            leavers += counts.leaver_status[leaver_stat].games;
        }
    }
    console.log(`\nGames with at least one leaver: ${leavers}`);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

console.log('starting getPlayerWL')
mika.getPlayerWL('103637655').then(wl => {
    console.log(`Wins: ${wl.win}`);
    console.log(`Loss: ${wl.lose}`);
    console.log(`Winrate: ${(wl.win / (wl.win + wl.lose)) * 100}`);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

console.log('starting getHealth')
mika.getHealth().then(health => {
    console.log("health of API:");
    console.log(JSON.stringify(health, null, 4));
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

console.log('starting getPlayerMatches with restrictions on latest match')
mika.getPlayerMatches("103637655", {
    "limit": 1,
    "included_account_id": ["65158495", "101766284"]
}).then(resp => {
    console.log("Latest match with Bob and Tyler:");
    console.log(resp[0].match_id);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
