import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    findNodeHandle,
    requireNativeComponent,
    Dimensions,
    NativeModules,
    View
} from 'react-native';
import ToolbarButton from './ToolbarButton';

/**
 * TODO.
 */
const MPVolumeView = requireNativeComponent('MPVolumeView', null);
const VOLUME_VIEW_REF = 'volumeView';

/**
 * TODO.
 */
const window = Dimensions.get('window');
// eslint-disable-next-line object-property-newline
const HIDE_VIEW_STYLE = { bottom: -window.height, top: window.height };

/**
 * TODO.
 */
class AudioRouteButton extends Component {
    /**
     * AbstractToolbarButton component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The name of the Icon of this {@code AbstractToolbarButton}.
         */
        iconName: PropTypes.string,

        /**
         * The style of the Icon of this {@code AbstractToolbarButton}.
         */
        iconStyle: PropTypes.object,

        /**
         * {@code AbstractToolbarButton} styles.
         */
        style:
            PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.object
            ]),

        /**
         * The color underlaying the button.
         */
        underlayColor: PropTypes.any
    };

    /**
     * TODO.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onClick = this._onClick.bind(this);
    }

    /**
     * TODO
     *
     * @private
     */
    _onClick() {
        if (NativeModules.MPVolumeViewManager) {
            // eslint-disable-next-line react/no-string-refs
            const handle = findNodeHandle(this.refs[VOLUME_VIEW_REF]);

            NativeModules.MPVolumeViewManager.show(handle);
        }
    }

    render() {
        const { iconName, iconStyle, style, underlayColor } = this.props;

        return (
            <View>
                <ToolbarButton
                    iconName = { iconName }
                    iconStyle = { iconStyle }
                    onClick = { this._onClick }
                    style = { style }
                    underlayColor = { underlayColor } />
                <MPVolumeView
                    ref = { VOLUME_VIEW_REF }
                    style = { HIDE_VIEW_STYLE } />
            </View>
        );
    }
}

export default AudioRouteButton;
