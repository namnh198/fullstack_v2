class State {
    constructor(seconds, minutes, hours) {
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours   = hours;
    }

    static now() {
        const NOW = new Date();
        const seconds = NOW.getSeconds() + NOW.getMilliseconds() / 1000;
        const minutes = NOW.getMinutes() + seconds / 60;
        const hours = NOW.getHours() + minutes / 60;
        return new State(seconds, minutes, hours);
    }
}

class Clock {
    constructor(state) {
        this.state = state;
        this.tick = this.tick.bind(this);
        requestAnimationFrame(this.tick);
    }

    tick() {
        this.setState(State.now());
        requestAnimationFrame(this.tick);
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.render();
    }

    render() {
        const { seconds, minutes, hours } = this.state;
        var secondElement = document.querySelector('.second-hand');
        var minuteElement = document.querySelector('.minute-hand');
        var hourElement   = document.querySelector('.hour-hand');

        secondElement.style.transform = `rotate(${ Math.floor(seconds) / 60 * 360 }deg)`;
        minuteElement.style.transform = `rotate(${ minutes / 60 * 360 }deg)`;
        hourElement.style.transform = `rotate(${ hours / 12 * 360 }deg)`;
    }
}

const CLOCK = new Clock();
