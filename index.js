function Mika() {
    this.constants = require('./constants')

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

    this.getProPlayers = require('./lib/proPlayers/getProPlayers')

    this.getProMatches = require('./lib/proMatches/getProMatches')

    this.getPublicMatches = require('./lib/publicMatches/getPublicMatches')

    this.getHeroStats = require('./lib/heroStats/getHeroStats')

    this.getMetadata = require('./lib/metadata/getMetadata')

    this.getDistributions = require('./lib/distributions/getDistributions')

    this.search = require('./lib/search/search')
    
    this.getRankings = require('./lib/rankings/getRankings')

    this.getBenchmarks = require('./lib/benchmarks/getBenchmarks')

    this.getStatus = require('./lib/status/getStatus')

    this.getHealth = require('./lib/health/getHealth')
}

module.exports = Mika
