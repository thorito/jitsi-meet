// @flow

import React from 'react';
import { connect } from 'react-redux';

import {
    ACTION_SHORTCUT_TRIGGERED,
    VIDEO_MUTE,
    createShortcutEvent,
    sendAnalytics
} from '../../../analytics';
import { translate } from '../../../base/i18n';
import { MEDIA_TYPE } from '../../../base/media';
import { isLocalTrackMuted } from '../../../base/tracks';

import AbstractVideoMuteButton from './AbstractVideoMuteButton';
import ToolboxItem from '../ToolboxItem';

declare var APP: Object;

import type {
    Props as AbstractVideoMuteButtonProps } from './AbstractVideoMuteButton';

type Props = AbstractVideoMuteButtonProps & {

    /**
     * The {@code JitsiConference} for the current conference.
     */
    _conference: Object,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * Component that renders a toolbar button for toggling video mute.
 *
 * @extends AbstractVideoMuteButton
 */
class VideoMuteButton extends AbstractVideoMuteButton<Props> {
    /**
     * Initializes a new {@code VideoMuteButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onShortcutToggleVideo = this._onShortcutToggleVideo.bind(this);
    }

    /**
     * Sets a keyboard shortcuts for toggling video mute.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        APP.keyboardshortcut.registerShortcut(
            'V',
            null,
            this._onShortcutToggleVideo,
            'keyboardShortcuts.videoMute');
    }

    /**
     * Removes the registered keyboard shortcut handler.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        APP.keyboardshortcut.unregisterShortcut('V');
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _conference, _videoMuted, t, tooltipPosition } = this.props;

        return (
            <ToolboxItem
                accessibilityLabel = 'Video mute'
                iconName = { _videoMuted && _conference
                    ? 'icon-camera-disabled toggled'
                    : 'icon-camera' }
                onClick = { this._onToolbarToggleVideo }
                tooltip = { t('toolbar.videomute') }
                tooltipPosition = { tooltipPosition } />
        );
    }

    _onShortcutToggleVideo: () => void;

    /**
     * Creates an analytics keyboard shortcut event for and dispatches an action
     * for toggling video mute.
     *
     * @private
     * @returns {void}
     */
    _onShortcutToggleVideo() {
        sendAnalytics(createShortcutEvent(
            VIDEO_MUTE,
            ACTION_SHORTCUT_TRIGGERED,
            { enable: !this.props._videoMuted }));

        this._doToggleVideo();
    }
}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _conference: Object,
 *     _videoMuted: boolean,
 * }}
 */
function _mapStateToProps(state) {
    const tracks = state['features/base/tracks'];

    return {
        _conference: state['features/base/conference'].conference,
        _videoMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO)
    };
}

export default translate(connect(_mapStateToProps)(VideoMuteButton));
