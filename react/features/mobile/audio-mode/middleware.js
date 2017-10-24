/* @flow */

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../../app';
import {
    CONFERENCE_FAILED,
    CONFERENCE_LEFT,
    CONFERENCE_WILL_JOIN,
    SET_AUDIO_ONLY
} from '../../base/conference';
import { MiddlewareRegistry } from '../../base/redux';

import { _SET_AUDIOMODE_SUBSCRIPTIONS } from './actionTypes';
import AudioMode from './AudioMode';

/**
 * Middleware that captures conference actions and sets the correct audio mode
 * based on the type of conference. Audio-only conferences don't use the speaker
 * by default, and video conferences do.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(({ dispatch, getState }) => next => action => {
    if (AudioMode) {
        let mode;

        switch (action.type) {
        case APP_WILL_MOUNT: {
            AudioMode.addListener('AudioRouteChanged', data => {
                console.log("XXXXX - AUDIO ROUTE CHANGED!");
                console.log(data);
            });
            break;
        }

        case APP_WILL_UNMOUNT:
            dispatch({
                type: _SET_AUDIOMODE_SUBSCRIPTIONS,
                subscriptions: undefined
            });
            break;

        case CONFERENCE_FAILED:
        case CONFERENCE_LEFT:
            mode = AudioMode.DEFAULT;
            break;

        case CONFERENCE_WILL_JOIN:
        case SET_AUDIO_ONLY: {
            if (getState()['features/base/conference'].conference
                    || action.conference) {
                mode
                    = action.audioOnly
                        ? AudioMode.AUDIO_CALL
                        : AudioMode.VIDEO_CALL;
            }
            break;
        }

        case _SET_AUDIOMODE_SUBSCRIPTIONS:
            break;
        }

        if (typeof mode !== 'undefined') {
            AudioMode.setMode(mode)
                .catch(err =>
                    console.error(
                        `Failed to set audio mode ${String(mode)}: ${err}`));
        }
    }

    return next(action);
});
