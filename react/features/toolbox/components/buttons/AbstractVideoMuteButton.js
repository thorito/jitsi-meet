// @flow

import React, { Component } from 'react';

import ToolboxItem from '../ToolboxItem';

export type Props = {
    showLabel: boolean,

    label: string,

    tooltip: string,

    tooltipPosition: string,

    styles: Object
};

/**
 * An abstract implementation of a button for toggling video mute.
 */
export default class AbstractVideoMuteButton extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this._setVideoMuted(!this._isVideoMuted());
    }

    _isDisabled() {
        return false;
    }

    _isVideoMuted() {
        // Nothing.
    }

    _setVideoMuted(videoMuted: boolean) {
        // Nothing.
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const videoMuted = this._isVideoMuted();

        return (
            <ToolboxItem
                accessibilityLabel = 'Video mute'
                disabled = { this._isDisabled() }
                iconName = { videoMuted
                    ? 'icon-camera-disabled toggled'
                    : 'icon-camera' }
                onClick = { this._onClick }
                { ...this.props } />
        );
    }
}
