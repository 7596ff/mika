function Mika() {
    this.getMatch = require('./lib/matches/getMatch')
    
    this.players = {
        getPlayer: require('./lib/players/getPlayer'),
        getPlayerWL: require('./lib/players/getPlayerWL'),
        getPlayerMatches: require('./lib/players/getPlayerMatches'),
        getPlayerHeroes: require('./lib/players/getPlayerHeroes'),
        getPlayerPeers: require('./lib/players/getPlayerPeers'),
        getPlayerPros: require('./lib/players/getPlayerPros'),
        getPlayerRecords: require('./lib/players/getPlayerRecords'),
        getPlayerCounts: require('./lib/players/getPlayerCounts'),
        getPlayerHistograms: require('./lib/players/getPlayerHistograms'),
        getPlayerWardmap: require('./lib/players/getPlayerWardmap'),
        getPlayerWordcloud: require('./lib/players/getPlayerWordcloud'),
        getPlayerRatings: require('./lib/players/getPlayerRatings'),
        getPlayerRankings: require('./lib/players/getPlayerRankings'),
        postPlayerRefresh: require('./lib/players/postPlayerRefresh')
    }

    this.getProPlayers = require('./lib/proPlayers/getProPlayers.js')

    this.constants = require('./constants')
}

module.exports = Mika
