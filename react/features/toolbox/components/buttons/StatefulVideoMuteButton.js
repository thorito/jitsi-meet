
import AbstractVideoMuteButton from './AbstractVideoMuteButton';
import {
    MEDIA_TYPE,
    VIDEO_MUTISM_AUTHORITY,
    setVideoMuted
} from '../../../base/media';
import { connect } from 'react-redux';
import { isLocalTrackMuted } from '../../../base/tracks';
import { translate } from '../../../base/i18n';

import {
    VIDEO_MUTE,
    createToolbarEvent,
    sendAnalytics
} from '../../../analytics';


/**
 * Component that renders a toolbar button for toggling video mute.
 *
 * @extends AbstractVideoMuteButton
 */
class StatefulVideoMuteButton extends AbstractVideoMuteButton {
    static defaultProps = {
        label: 'toolbar.videomute',
        tooltip: 'toolbar.videomute'
    };

    _isVideoMuted() {
        return this.props._videoMuted;
    }

    _setVideoMuted(videoMuted: boolean) {
        console.log('XXXXXX');
        console.log(videoMuted);
        sendAnalytics(createToolbarEvent(VIDEO_MUTE, { enable: videoMuted }));
        this.props.dispatch(
            setVideoMuted(
                videoMuted,
                VIDEO_MUTISM_AUTHORITY.USER,
                /* ensureTrack */ true));
    }

}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _videoMuted: boolean,
 * }}
 */
function _mapStateToProps(state) {
    const tracks = state['features/base/tracks'];

    return {
        _videoMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO)
    };
}

export default translate(
    connect(_mapStateToProps)(StatefulVideoMuteButton));
