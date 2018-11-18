[![NPM](https://nodei.co/npm/mika.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mika/)

## mika [![Build Status](https://travis-ci.org/bippum/mika.svg?branch=master)](https://travis-ci.org/bippum/mika)

an unofficial javascript wrapper for the opendota api. 

### getting started

1. install mika from npm: `npm install mika` or from git: `npm install bippum/mika#master`
1. read the docs for [mika](https://bippum.github.io/mika/Mika.html) and [opendota](https://docs.opendota.com/)
1. feel free to msg me on discord (samantha#4444) with any questions, find me in the opendota development server ([discord.gg/opendota](http://www.discord.gg/opendota)), and create an issue here with any bug reports

### examples

```js
const Mika = require("mika");
var mika = new Mika();

mika.getPlayer("<your account id>").then((player) => {
    console.log(`Solo MMR: ${player.solo_competitive_rank}`);
    console.log(`Account ID: ${player.profile.account_id}`);
    console.log(`Name: ${player.profile.personaname}`);
}).catch((err) => console.log(err));

mika.getPlayerCounts("<your account id>").then((counts) => {
    let leavers = 0
    for (leaver_stat in counts.leaver_status) {
        if (leaver_stat != "0") {
            leavers += counts.leaver_status[leaver_stat].games;
        }
    }
    console.log(`\nGames with at least one leaver: ${leavers}`)
}).catch((err) => console.log(err));
