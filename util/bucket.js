class Bucket {
    constructor(limit = 1) {
        this.limit = limit * 1000
        this._queue = []
        this.last_time = Date.now() - 1000
    }

    execqueue() {
        if (Date.now() > this.last_time + this.limit) {
            this._queue.shift()()
            this.last_time = Date.now()
        } else {
            setTimeout(() => {
                this.execqueue()
            }, this.limit)
        }
    }

    enqueue(func) {
        this._queue.push(func)
        this.execqueue()
    }
};

module.exports = Bucket
