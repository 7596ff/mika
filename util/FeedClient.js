const FirehoseURL = require("../constants").FirehoseURL;
const EventEmitter = require("events").EventEmitter;
const needle = require("needle");
const JSONStream = require("JSONStream");

const allowedTypes = ["player", "team", "league"];

/*
 * The websocket interface for Opendota/Feed
 * @class
 */
class FeedClient extends EventEmitter {
    constructor() {
        super();    
        this._url = FirehoseURL;

        this._subs = {
            player: [],
            team: [],
            league: [],
        };
    }

    _processMatch(match) {
        let found = {
            player: [],
            team: [],
            league: [],
        };

        found.player = match.players
            .map((player) => Number(player.account_id))
            .filter((id) => !!~this._subs.player.indexOf(id)) || [];

        if (!!~this._subs.team.indexOf(Number(match.radiant_team_id))) found.team.push(Number(match.radiant_team_id));
        if (!!~this._subs.team.indexOf(Number(match.dire_team_id))) found.team.push(Number(match.dire_team_id));

        if (!!~this._subs.league.indexOf(Number(match.leagueid))) found.league.push(Number(match.leagueid));

        if (found.player.concat(found.team.concat(found.league)).length === 0) return;

        /*
         * Fired when a match is found from the client's subscriptions.
         * @prop {Object} match the match data
         * @prop {Object} found which ids were matched in the match
         * @prop {String} origin where the match came from, either "scanner" or "praser"
         */
        this.emit("match", match, found, match.origin);
    }

    /*
     * Tells the client to connect to the firehose.
     */
    connect() {
        needle
            .get(this._url)
            .pipe(JSONStream.parse())
            .on("data", (data) => {
                this._processMatch(data);
            });
    }

    /*
     * Subscribes to IDs
     * @param {String} type the type of ID to subscribe to, either "player", "team", or "league"
     * @param {Array|String} ids one or more IDs to subscribe to
     * @returns {Promise<Object>} every feed it is subscribed to for that type
     */
    subscribe(type, ids) {
        if (!~allowedTypes.indexOf(type)) {
            return new Promise((resolve, reject) => reject("Type is not allowed"));
        }

        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        ids = ids.map((id) => parseInt(id));
        if (ids.find((id) => id === NaN)) Promise.reject("Invalid IDs");

        this._subs[type] = this._subs[type]
            .concat(ids)
            .filter((e, i, a) => a.indexOf(e) === i); // dedupe the array

        return Promise.resolve(this._subs[type]);
    }

    /*
     * Unsubscribes from IDs
     * @param {String} type the type of ID to unsubscribe from, either "player", "team", or "league"
     * @param {Array|String} ids one or more IDs to unsubscribe from
     * @returns {Promise<Object>} every feed it unsubscribed from
     */
    unsubscribe(type, ids) {
        if (!~allowedTypes.indexOf(type)) {
            return Promise.reject("Type is not allowed");
        }

        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        ids = ids.map((id) => parseInt(id));
        if (ids.find((id) => id === NaN)) Promise.reject("Invalid IDs");

        return new Promise(async (resolve, reject) => {
            for (let id in ids) {
                let index = this._subs[type].indexOf(id);
                if (!~index) continue;

                this._subs[type].splice(index, 1);
            }

            resolve(this._subs[type]);
        });
    }

    /*
     * Returns all feeds the client is subscribed to.
     * @returns {Promise<Object>}
     */
    getSubs() {
        return this._subs;
    }
}

module.exports = FeedClient;

