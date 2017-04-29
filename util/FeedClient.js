const WebsocketURL = require("../constants").WebsocketURL;
//const WebsocketURL = "ws://192.168.1.120:5000/";
const EventEmitter = require("events").EventEmitter;
const WebSocket = require("ws");
const n = require("nonce")();

const allowedTypes = ["player", "team", "league"];

/*
 * The websocket interface for Opendota/Feed
 * @class
 */
class FeedClient extends EventEmitter {
    constructor() {
        super();    
        this._url = WebsocketURL;
        this._retries = 0;
        this._transactions = {};
    }

    _send(type, message) {
        return this._wsSend({
            type,
            message,
            uuid: this._uuid
        });
    }

    _wsSend(message) {
        return new Promise((resolve, reject) => {
            let nonce = n();
            message.nonce = nonce;
            this._ws.send(JSON.stringify(message), (err) => {
                if (err) {
                    reject(err);
                } else {
                    this._transactions[nonce] = {
                        resolve,
                        reject
                    };
                }
            });
        });
    }

    _processMessage(message) {
        try {
            message = JSON.parse(message.data);
        } catch (err) {
            this.emit("error", err);
            return;
        }

        if (message.nonce && this._transactions.hasOwnProperty(message.nonce)) {
            if (message.type.includes("ACK") || message.type === "PONG" || message.type === "IDENTIFY") {
                this._transactions[message.nonce].resolve(message.message);
            } else if (message.type.includes("NAK")) {
                this._transactions[message.nonce].reject(message.message.err || message.message);
            } else {
                this.emit("unhandledNonce", message);
            }

            delete this._transactions[message.nonce];
        } else if (message.type === "MATCH") {
            /*
             * Fired when a match is found from the client's subscriptions.
             * @prop {Object} match the match data
             * @prop {Object} found which ids were matched in the match
             * @prop {String} origin where the match came from, either "scanner" or "praser"
             */
            this.emit("match", message.message.match, message.message.found, message.message.origin);
        } else {
            /*
             * Fired when an unexpected message is processed.
             * @event FeedClient#unhandled
             * @prop {Object} message the message
             */
            this.emit("unhandled", message);
        }
    }

    _processClose(close) {
        if (this._uuid === undefined) return;

        if (close.code === 1013) delete this._uuid;

        /*
         * Emitted when the websocket loses connection.
         * @event FeedClient#closed
         * @prop {Object} close the CloseEvent object from ws.
         */
        this.emit("closed", close);
        this._retries = 0;
        this._ws.terminate();
        if (close.code === 1006) setTimeout(this.connect.bind(this), 2000);
    }

    /*
     * Tells the client to connect to the websocket.
     */
    connect() {
        this._ws = new WebSocket(this._url);

        this._ws.on("error", (err) => {
            this._retries += 1;
            if (this._retries < 3) {
                setTimeout(() => {
                    this.connect();
                }, 1000);
            } else {
                this._shouldReconnect = false;
                this.emit("error", err);
            }
        });

        this._ws.on("open", () => {
            this._wsSend({
                "type": "IDENTIFY"
            }).catch((err) => {
                console.log(err)
            }).then((message) => {
                this._uuid = message.uuid;
                this.emit("ready", message.uuid);
                // start heartbeating
                this.intervalID = setInterval(() => {
                    setTimeout(() => {
                        this.ping().catch((err) => console.error(err));
                    }, Math.floor(Math.random() * 10000)); // add random jitter 
                }, 60000);
            });
        });

        this._ws.onmessage = this._processMessage.bind(this);
        this._ws.onclose = this._processClose.bind(this);
    }

    /*
     * "Ping" the websocket.
     */
    ping() {
        return this._send("PING");
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

        return this._send("SUBSCRIBE", { type, ids });
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

        return this._send("UNSUBSCRIBE", { type, ids });
    }

    /*
     * Returns all feeds the client is subscribed to.
     * @returns {Promise<Object>}
     */
    getSubs() {
        return this._send("GET_SUBS");
    }
}

module.exports = FeedClient;
