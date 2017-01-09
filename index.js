function Mika() {
    this.matches = {
        getMatch: require('./lib/matches/getMatch.js')
    }
    
    this.players = {
        getPlayer: require('./lib/players/getPlayer.js'),
        getPlayerWL: require('./lib/players/getPlayerWL.js'),
        getPlayerMatches: require('./lib/players/getPlayerMatches.js'),
        getPlayerHeroes: require('./lib/players/getPlayerHeroes.js')
    }
}

module.exports = Mika
