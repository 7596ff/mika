function Mika() {
    this.constants           = require('./constants')
    this.getMatch            = require('./lib/getMatch')
    this.players = {
        "getPlayer":           require('./lib/players/getPlayer'),
        "getPlayerWL":         require('./lib/players/getPlayerWL'),
        "getPlayerMatches":    require('./lib/players/getPlayerMatches'),
        "getPlayerHeroes":     require('./lib/players/getPlayerHeroes'),
        "getPlayerPeers":      require('./lib/players/getPlayerPeers'),
        "getPlayerPros":       require('./lib/players/getPlayerPros'),
        "getPlayerRecords":    require('./lib/players/getPlayerRecords'),
        "getPlayerCounts":     require('./lib/players/getPlayerCounts'),
        "getPlayerHistograms": require('./lib/players/getPlayerHistograms'),
        "getPlayerWardmap":    require('./lib/players/getPlayerWardmap'),
        "getPlayerWordcloud":  require('./lib/players/getPlayerWordcloud'),
        "getPlayerRatings":    require('./lib/players/getPlayerRatings'),
        "getPlayerRankings":   require('./lib/players/getPlayerRankings'),
        "postPlayerRefresh":   require('./lib/players/postPlayerRefresh')
    }
    this.getProPlayers       = require('./lib/getProPlayers')
    this.getProMatches       = require('./lib/getProMatches')
    this.getPublicMatches    = require('./lib/getPublicMatches')
    this.getHeroStats        = require('./lib/getHeroStats')
    this.getMetadata         = require('./lib/getMetadata')
    this.getDistributions    = require('./lib/getDistributions')
    this.search              = require('./lib/search')
    this.getRankings         = require('./lib/getRankings')
    this.getBenchmarks       = require('./lib/getBenchmarks')
    this.getStatus           = require('./lib/getStatus')
    this.getHealth           = require('./lib/getHealth')
    this.request = {
        "getByJobId":          require('./lib/request/getRequestByJobId'),
        "postByMatchId":       require('./lib/request/postRequestByMatchId')
    }
    this.getHeroes           = require('./lib/getHeroes')
    this.getLeagues          = require('./lib/getLeagues')
    this.getReplays          = require('./lib/getReplays')
}

module.exports = Mika
