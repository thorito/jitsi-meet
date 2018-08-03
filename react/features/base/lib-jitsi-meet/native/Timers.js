// @flow

import { AppState } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

/**
 * TODO.
 */
class Timers {
    _timerID: number;
    _timers: Map<*, *>;

    /**
     * TODO.
     */
    constructor() {
        this._timerID = 0;
        this._timers = new Map();

        this.origSetTimeout = global.setTimeout;
        this.origClearTimeout = global.clearTimeout;
        this.bgClearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer);
        this.bgSetTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer);
    }

    /**
     * 
     * @param {*} callback 
     * @param {*} delay 
     */
    setTimeout(callback, delay = 0) {
        return this._scheduleTimer(callback, delay, false);
    }

    /**
     * 
     * @param {*} id 
     */
    clearTimeout(id) {
        const item = this._timers.get(id);

        if (item) {
            item.fns.clearTimeout(item.origId);
            this._timers.delete(id);
        }
    }

    /**
     * 
     * @param {*} callback 
     * @param {*} delay 
     */
    setInterval(callback, delay = 0) {
        return this._scheduleTimer(callback, delay, true);
    }

    /**
     * 
     * @param {*} id 
     */
    clearInterval(id) {
        this.clearTimeout(id);
    }

    /**
     * TODO.
     */
    _getTimeoutFunctions() {
        if (AppState.currentState === 'active') {
            return {
                type: 'orig',
                clearTimeout: this.origClearTimeout,
                setTimeout: this.origSetTimeout
            }
        }

        // Not active, so the app is either inactive or in the background, let's
        // play safe.
        return {
            type: 'background',
            clearTimeout: this.bgClearTimeout,
            setTimeout: this.bgSetTimeout
        }
    }

    /**
     * TODO.
     *
     * @param {*} callback 
     * @param {*} delay 
     * @param {*} interval 
     */
    _scheduleTimer(callback, delay, interval) {
        const fns = this._getTimeoutFunctions();
        const id = ++this._timerID;
        const origId = fns.setTimeout(() => {
            this._timerCallback(id);
        }, delay);
        const item = {
            callback,
            delay,
            fns,
            interval,
            origId
        };

        this._timers.set(id, item);

        return id;
    }

    /**
     * TODO.
     *
     * @param {*} id 
     */
    _timerCallback(id) {
        const item = this._timers.get(id);

        if (item) {
            item.callback();
            if (item.interval) {
                const fns = this._getTimeoutFunctions();
                const origId = fns.setTimeout(() => {
                    this._timerCallback(id);
                }, item.delay);

                item.fns = fns;
                item.origId = origId;
            } else {
                this._timers.delete(id);
            }
        }
    }
}

export default new Timers();
