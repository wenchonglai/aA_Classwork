class Clock {
    constructor() {
        this.time = new Date();
        setInterval(this._tick.bind(this), 1000)
    }

    printTime(time) {
        console.log(time.toTimeString().split(' ')[0]);
    }

    _tick() {
        this.time = new Date();
        this.printTime(this.time);
    }

}

clock = new Clock()