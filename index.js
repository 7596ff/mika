function Mika() {
    this.matches = {
        getMatch: require('./lib/matches/getMatch.js')
    }
    
    this.players = {
        getPlayer: require('./lib/players/getPlayer.js')
    }
}

module.exports = Mika
