// @flow

import React, { Component } from 'react';

import ToolboxItem from '../ToolboxItem';

export type Props = {

    showLabel: boolean,

    label: string,

    tooltip: string,

    tooltipPosition: string,

    t: Function
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
        const {
            t,
            ...props
        } = this.props;
        const videoMuted = this._isVideoMuted();

        if (typeof t !== 'undefined') {
            'label' in props && (props.label = t(props.label));
            'tooltip' in props && (props.tooltip = t(props.tooltip));
        }

        return (
            <ToolboxItem
                accessibilityLabel = 'Video mute'
                iconName = { videoMuted
                    ? 'icon-camera-disabled toggled'
                    : 'icon-camera' }
                onClick = { this._onClick }
                { ...props } />
        );
    }
}
