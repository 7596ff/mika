const needle = require("needle");
const Bottleneck = require("bottleneck");

const FeedClient = require("./util/FeedClient");
const constants = require("./constants");

/**
 * The bigol thing
 */
class Mika {
    constructor(key) {
        this.baseURL = constants.BaseURL;
        this.key = key;

        if (key) {
            this.limiter = new Bottleneck({
                maxConcurrent: 300,
                minTime: 200
            });
        } else {
            this.limiter = new Bottleneck({
                maxConcurrent: 60,
                minTime: 1000
            });
        }
    }

    _queryString(options) {
        let args = [];

        if (this.key) {
            options.api_key = this.key;
        }

        for (let p in options) {
            if (options.hasOwnProperty(p)) {
                if (Array.isArray(options[p])) {
                    for (let index of options[p]) {
                        args.push(`${encodeURIComponent(p)}=${encodeURIComponent(index)}`);
                    }
                } else {
                    args.push(`${encodeURIComponent(p)}=${encodeURIComponent(options[p])}`);
                }
            }
        }

        return `?${args.join("&")}`;
    }

    _requestHandler(method, url) {

        console.log(url)
        if (!url.includes("?")) {
            url += this._queryString({});
        }

        url = this.baseURL + url;

        return new Promise((resolve, reject) => {
            this.limiter.submit(needle.request, method, url, null, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (response && response.statusCode) {
                        reject({
                            "code": response.statusCode,
                            "error": body
                        });
                    } else {
                        reject(err);
                    }
                }
            });
        });
    }

    /**
     * Returns match data for a specified match id.
     * @param {number} matchID - Which match to request
     */
    getMatch(matchID) {
        return this._requestHandler("GET", `/matches/${matchID}`);
    }

    /**
     * Returns player data for a specified account id
     * @param {number} accountID - Which account to request
     */
    getPlayer(accountID) {
        return this._requestHandler("GET", `/players/${accountID}`);
    }
    
    /**
     * Returns win/loss counts for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerWL(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/wl${options || ""}`);
    }
    
    /**
     * Returns summaries of the last 20 matches of a specified account id
     * @param {number} accountID - Which account to request
     */
    getPlayerRecentMatches(accountID) {
        return this._requestHandler("GET", `/players/${accountID}/recentMatches`);
    }
    
    /**
     * Returns matches played for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerMatches(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/matches${options || ""}`);
    }

    /**
     * Returns heroes played for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerHeroes(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/heroes${options || ""}`);
    }

    /**
     * Returns players played with for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerPeers(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/peers${options || ""}`);
    }

    /**
     * Returns pro players played with for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerPros(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/pros${options || ""}`);
    }

    /**
     * Returns truncated player match data for each record for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerTotals(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/totals${options || ""}`);
    }

    /**
     * Returns categorical counts for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerCounts(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/counts${options || ""}`);
    }

    /**
     * Returns histogram data for a specified account id
     * @param {number} accountID - Which account to request
     * @param {string} field - Which field to aggregate on
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerHistograms(accountID, field, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/histograms/${field}${options || ""}`);
    }

    /**
     * Returns ward map data for observers and sentries for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerWardmap(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/wardmap${options || ""}`);
    }

    /**
     * Returns words said and read for a specified account id
     * @param {number} accountID - Which account to request
     * @param {object} [options] - Query paramaters for the request
     * @param {number} options.limit - Number of matches to limit to
     * @param {number} options.offset - Number of matches to offset start by
     * @param {number} options.win - Whether the player won
     * @param {number} options.patch - Patch ID
     * @param {number} options.game_mode - Game Mode ID
     * @param {number} options.lobby_type - Lobby type ID
     * @param {number} options.region - Region ID
     * @param {number} options.date - Days previous
     * @param {number} options.lane_role - Lane Role ID
     * @param {number} options.hero_id - Hero ID
     * @param {number} options.is_radiant - Whether the player was radiant (1 for yes, 0 for no)
     * @param {number[]} options.included_account_id - Account IDs in the match
     * @param {number[]} options.excluded_account_id - Account IDs not in the match
     * @param {number[]} options.with_hero_id - Hero IDs on the player's team
     * @param {number[]} options.against_hero_id - Hero IDs against the player's team
     * @param {number} options.significant - Whether the match was significant for aggregation purposes (1 for yes, 0 for no)
     * @param {string} options.sort - The field to return matches sorted by in descending order
     */
    getPlayerWordcloud(accountID, options) {
        if (options) options = this._queryString(options);
        return this._requestHandler("GET", `/players/${accountID}/wordcloud${options || ""}`);
    }

    /**
     * Returns an array of rating history for a specified account id on solo and party MMR
     * @param {number} accountID - Which account to request
     */
    getPlayerRatings(accountID) {
        return this._requestHandler("GET", `/players/${accountID}/ratings`);
    }

    /**
     * Returns an array of hero rankings for a specified account id
     * @param {number} accountID - Which account to request
     */
    getPlayerRankings(accountID) {
        return this._requestHandler("GET", `/players/${accountID}/rankings`);
    }

    /**
     * Queues a refresh for player match history.
     * @param {number} accountID - Which account to refresh
     */
    postPlayerRefresh(accountID) {
        return this._requestHandler("POST", `/players/${accountID}/refresh`);
    }

    /**
     * Returns an array of pro players
     */
    getProPlayers() {
        return this._requestHandler("GET", `/proPlayers`);
    }

    /**
     * Returns an array of pro matches
     */
    getProMatches() {
        return this._requestHandler("GET", `/proMatches`);
    }

    /**
     * Returns an array of truncated public matches
     * @param {boolean} ascending - Whether or not to order by lowest MMR
     */
    getPublicMatches(ascending) {
        return this._requestHandler("GET", `/publicMatches${ascending ? "?mmr_ascending=1" : ""}`);
    }

    /**
     * Submit arbitrary SQL queries to the database
     * @param {string} sql - The string sql query to submit - visit {@link https://www.opendota.com/explorer|the OpenDota explorer page} for details
     * @param {boolean} [encoded=false] - Whether or not the supplied string is percent encoded (false to auto encode)
     */
    explorer(sql, encoded) {
        if (!encoded) sql = encodeURI(sql);
        return this._requestHandler("GET", `/explorer?sql=${sql}`);
    }

    /**
     * Returns OpenDota metadata
     */
    getMetadata() {
        return this._requestHandler("GET", `/metadata`);
    }

    /**
     * Returns MMR distributions overall and by country
     */
    getDistributions() {
        return this._requestHandler("GET", `/distributions`);
    }

    /**
     * Returns an array of players searched by player name.
     * @param {string} q - search string
     * @param {number} [similarity=0.51] - minimum similarity threshold, between 0 and 1
     */
    search(q, similarity) {
        return this._requestHandler("GET", `/search?q=${q}${similarity ? "&similarity=" + similarity : ""}`);
    }

    /**
     * Returns rankings for a specified hero
     * @param {number} heroID - Hero ID
     */
    getRankings(heroID) {
        return this._requestHandler("GET", `/rankings?hero_id=${heroID}`);
    }

    /**
     * Returns benchmarks of average stats for a specified hero
     * @param {number} heroID - Hero ID
     */
    getBenchmarks(heroID) {
        return this._requestHandler("GET", `/benchmarks?hero_id=${heroID}`);
    }

    /**
     * Returns service status of OpenDota
     */
    getStatus() {
        return this._requestHandler("GET", `/status`);
    }

    /**
     * Returns health of OpenDota services
     */
    getHealth() {
        return this._requestHandler("GET", `/health`);
    }

    /**
     * Returns status of a parse request
     * @param {number} jobID - Job ID
     */
    getParseStatus(jobID) {
        return this._requestHandler("GET", `/request/${jobID}`);
    }

    /**
     * Request a match to be parsed by OpenDota
     * @param {number} matchID - Match ID
     */
    requestParse(matchID) {
        return this._requestHandler("POST", `/request/${matchID}`);
    }

    /**
     * Returns an array of the current heroes in the game
     */
    getHeroes() {
        return this._requestHandler("GET", `/heroes`);
    }

    /**
     * Returns an array of recent matches with a hero.
     * @param {number} heroID - The hero ID
     */
    getHeroMatches(heroID) {
        return this._requestHandler("GET", `/heroes/${heroID}/matches`);
    }

    /**
     * Returns results of a particular hero against other heroes.
     * @param {number} heroID - The hero ID
     */
    getHeroMatchups(heroID) {
        return this._requestHandler("GET", `/heroes/${heroID}/matchups`);
    }

    /**
     * Returns hero preformance over a range of match durations.
     * @param {number} heroID - The hero ID
     */
    getHeroDurations(heroID) {
        return this._requestHandler("GET", `/heroes/${heroID}/durations`);
    }

    /**
     * Returns players who have played this hero.
     * @param {number} heroID - The hero ID
     */
    getHeroPlayers(heroID) {
        return this._requestHandler("GET", `/heroes/${heroID}/players`);
    }

    /**
     * Returns an array of hero stats in recent matches
     */
    getHeroStats() {
        return this._requestHandler("GET", `/heroStats`);
    }

    /**
     * Returns an array of leagues in the game
     */
    getLeagues() {
        return this._requestHandler("GET", `/leagues`);
    }

    /**
     * Returns an array of teams in the game
     */
    getTeams() {
        return this._requestHandler("GET", `/teams`);
    }

    /**
     * Gets data for a team.
     * @param {number} teamID - The team ID
     */
    getTeam(teamID) {
        return this._requestHandler("GET", `/teams/${teamID}`);
    }

    /**
     * Gets matches for a team.
     * @param {number} teamID - The team ID
     */
    getTeamMatches(teamID) {
        return this._requestHandler("GET", `/teams/${teamID}/matches`);
    }

    /**
     * Gets players who have played for a team.
     * @param {number} teamID - The team ID
     */
    getTeamPlayers(teamID) {
        return this._requestHandler("GET", `/teams/${teamID}/players`);
    }

    /**
     * Gets heroes a team has played.
     * @param {number} teamID - The team ID
     */
    getTeamHeroes(teamID) {
        return this._requestHandler("GET", `/teams/${teamID}/heroes`);
    }

    /**
     * Returns data to construct a replay URL with
     @param {number} matchID - 
     */
    getReplays(matchID) {
        return this._requestHandler("GET", `/replays?match_id=${matchID}`);
    }

    /**
     * Gets top preformances in a stat.
     * @param {string} field - The field (See <Mika>.Constants)
     */
    getRecords(field) {
        return this._requestHandler("GET", `/records/${field}`);
    }

    /**
     * Get currently ongoing games.
     */
    getLiveGames() {
        return this._requestHandler("GET", `/live`);
    }

    /**
     * Get database schema.
     */
    getSchema() {
        return this._requestHandler("GET", `/schema`);
    }
}

Mika.FeedClient = FeedClient;
Mika.Constants = constants;
module.exports = Mika;
