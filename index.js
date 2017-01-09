function Mika() {
    this.matches = {
        getMatch: require('./lib/matches/getMatch.js')
    }
    
    this.players = {
        getPlayer: require('./lib/players/getPlayer.js'),
        getPlayerWL: require('./lib/players/getPlayerWL.js'),
        getPlayerMatches: require('./lib/players/getPlayerMatches.js')
    }
}

module.exports = Mika
