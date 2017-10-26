import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import ActionSheet from './ActionSheet';

import ToolbarButton from './ToolbarButton';

const options = [ 'Bluetooth', 'Speaker', 'Phone', 'Test 1', 'Test 2', 'Test 3' ];

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
        this._onSelect = this._onSelect.bind(this);
    }

    /**
     * Handles clicking/pressing this {@code AudioRouteButton} by showing an
     * audio route picker.
     *
     * @private
     * @returns {void}
     */
    _onClick(i) {
        /*
        BottomSheet.showBottomSheetWithOptions({
            options: ['Bluetooth', 'Speaker', 'Phone'],
            //title: 'Demo Bottom Sheet',
            //dark: true,
            cancelButtonIndex: 3,
        }, (value) => {
            //alert(value);
        });
        */


        this.ActionSheet.show();
    }

    _onSelect(i) {
        console.log('XXXXXXXX');
        console.log(i);
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
                <ActionSheet
                    ref = { o => this.ActionSheet = o }
                    options = { options }
                    cancelButtonIndex = { 3 }
                    onPress = { this._onSelect }
                />
            </View>
        );
    }
}

export default AudioRouteButton;
