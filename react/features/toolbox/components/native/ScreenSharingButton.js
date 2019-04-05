// @flow

import { translate } from '../../../base/i18n';
import { MEDIA_TYPE } from '../../../base/media';
import { connect } from '../../../base/redux';
import { AbstractButton } from '../../../base/toolbox';
import type { AbstractButtonProps } from '../../../base/toolbox';
import { getLocalVideoTrack, isLocalTrackMuted, toggleScreensharing } from '../../../base/tracks';

/**
 * The type of the React {@code Component} props of {@link ScreenSharingButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether the current conference is in audio only mode or not.
     */
    _disabled: boolean,

    /**
     * Whether video is currently muted or not.
     */
    _screensharing: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for toggling the camera facing mode.
 */
class ScreenSharingButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.shareYourScreen';
    iconName = 'icon-share-desktop';
    label = 'toolbar.startScreenSharing';
    toggledLabel = 'toolbar.stopScreenSharing';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(toggleScreensharing());
    }

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isDisabled() {
        return false;
        //return this.props._disabled;
    }
    
    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._screensharing;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code ToggleCameraButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _disabled: boolean,
 *     _screensharing: boolean
 * }}
 */
function _mapStateToProps(state): Object {
    const localVideo = getLocalVideoTrack(state['features/base/tracks']);
    const { audioOnly, desktopSharingEnabled } = state['features/base/conference'];
    const tracks = state['features/base/tracks'];

    return {
        _disabled: Boolean(audioOnly) || isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO) || !desktopSharingEnabled,
        _screensharing: localVideo && localVideo.videoType === 'desktop'
    };
}

export default translate(connect(_mapStateToProps)(ScreenSharingButton));
