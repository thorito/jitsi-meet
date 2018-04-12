
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

    _isDisabled() {
        return this.props._audioOnly;
    }

    _isVideoMuted() {
        return this.props._videoMuted;
    }

    _setVideoMuted(videoMuted: boolean) {
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
 *     _audioOnly: boolean,
 *     _videoMuted: boolean
 * }}
 */
function _mapStateToProps(state) {
    const { audioOnly } = state['features/base/conference'];
    const tracks = state['features/base/tracks'];

    return {
        _audioOnly: Boolean(audioOnly),
        _videoMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO)
    };
}

function _mergeProps(stateProps, dispatchProps, ownProps) {
    const props = Object.assign({}, ownProps, stateProps, dispatchProps);

    'label' in props && (props.label = props.t(props.label));
    'tooltip' in props && (props.tooltip = props.t(props.tooltip));

    return props;
}

StatefulVideoMuteButton = translate(
    connect(_mapStateToProps, undefined, _mergeProps)(StatefulVideoMuteButton));

StatefulVideoMuteButton.defaultProps = {
    label: 'toolbar.videomute',
    tooltip: 'toolbar.videomute'
};

export default StatefulVideoMuteButton;
