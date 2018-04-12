// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';

import { Icon } from '../../base/font-icons';

import AbstractToolboxItem from './AbstractToolboxItem';
import type { Props as AbstractToolboxItemProps } from './AbstractToolboxItem';

type Props = AbstractToolboxItemProps & {

    iconStyle: Object,
    style: Object,
    underlayColor: string
};

export default class ToolboxItem extends AbstractToolboxItem<Props> {
    /**
     * Default values for {@code ToolbarButtonV2} component's properties.
     *
     * @static
     */
    static defaultProps = {
        disabled: false,
        showLabel: false,
        visible: true
    };

    _renderItem() {
        const {
            accessibilityLabel,
            disabled,
            onClick,
            styles
        } = this.props;

        return (
            <TouchableHighlight
                accessibilityLabel = { accessibilityLabel }
                disabled = { disabled }
                onPress = { onClick }
                style = { styles.style }
                underlayColor = { styles.underlayColor } >
                { this._renderIcon() }
            </TouchableHighlight>
        );
    }

    _renderIcon() {
        const { styles } = this.props;

        return (
            <Icon
                name = { styles.iconName }
                style = { styles.iconStyle } />
        );
    }
}
