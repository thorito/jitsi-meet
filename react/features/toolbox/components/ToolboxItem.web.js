// @flow

import Tooltip from '@atlaskit/tooltip';
import React from 'react';

import AbstractToolboxItem from './AbstractToolboxItem';
import type { Props as AbstractToolboxItemProps } from './AbstractToolboxItem';

type Props = AbstractToolboxItemProps & {

    /**
     * The text to display in the tooltip.
     */
    tooltip: string,

    /**
     * From which direction the tooltip should appear, relative to the
     * button.
     */
    tooltipPosition: string
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
        tooltipPosition: 'top',
        visible: true
    };

    _renderItem() {
        const {
            accessibilityLabel,
            label,
            onClick,
            showLabel
        } = this.props;
        const props = {
            'aria-label': accessibilityLabel,
            className: showLabel ? 'overflow-menu-item' : 'toolbox-button',
            onClick
        };
        const elementType = showLabel ? 'li' : 'div';
        const children = [ this._renderIcon(!showLabel) ];

        showLabel && children.push(label);

        return React.createElement(elementType, props, children);
    }

    _renderIcon(forToolbar) {
        const { iconName, tooltip, tooltipPosition } = this.props;

        if (forToolbar) {
            return (
                <Tooltip
                    description = { tooltip }
                    position = { tooltipPosition }>
                    <div className = 'toolbox-icon'>
                        <i className = { iconName } />
                    </div>
                </Tooltip>
            );
        }

        return (
            <span className = 'overflow-menu-item-icon'>
                <i className = { iconName } />
            </span>
        );
    }
}
