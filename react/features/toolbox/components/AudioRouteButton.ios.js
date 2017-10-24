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
 * Define the {@code MPVolumeView} React component. It will only be available
 * on iOS.
 */
const MPVolumeView = requireNativeComponent('MPVolumeView', null);
const VOLUME_VIEW_REF = 'volumeView';

/**
 * Style required to hide the {@code MPVolumeView} view, since it's displayed
 * programmatically.
 *
 * TODO: replace with 'display: none' which is suported in RN >= 0.43.
 */
const window = Dimensions.get('window');
// eslint-disable-next-line object-property-newline
const HIDE_VIEW_STYLE = { bottom: -window.height, top: window.height };

/**
 * A toolbar button which triggers an audio route picker when pressed.
 */
class AudioRouteButton extends Component {
    /**
     * AudioRouteButton component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The name of the Icon of this {@code AudioRouteButton}.
         */
        iconName: PropTypes.string,

        /**
         * The style of the Icon of this {@code AudioRouteButton}.
         */
        iconStyle: PropTypes.object,

        /**
         * {@code AudioRouteButton} styles.
         */
        style:
            PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.object
            ]),

        /**
         * The color underlying the button.
         */
        underlayColor: PropTypes.any
    };

    /**
     * Initializes a new {@code AudioRouteButton} instance.
     *
     * @param {Object} props - The React {@code Component} props to initialize
     * the new {@code AudioRouteButton} instance with.
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onClick = this._onClick.bind(this);
    }

    /**
     * Handles clicking/pressing this {@code AudioRouteButton} by showing an
     * audio route picker.
     *
     * @private
     * @returns {void}
     */
    _onClick() {
        // eslint-disable-next-line react/no-string-refs
        const handle = findNodeHandle(this.refs[VOLUME_VIEW_REF]);

        NativeModules.MPVolumeViewManager.show(handle);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
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
