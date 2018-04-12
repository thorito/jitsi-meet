// @flow

import Tooltip from '@atlaskit/tooltip';
import React from 'react';

import { Fragment } from '../../base/react';

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
        tooltip: '',
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
        // eslint-disable-next-line no-extra-parens
        const children = (
            <Fragment>
                { this._renderIcon() }
                { showLabel && label }
            </Fragment>
        );

        return React.createElement(elementType, props, children);
    }

    _renderIcon() {
        const { iconName, tooltip, tooltipPosition, showLabel } = this.props;
        const icon = <i className = { iconName } />;
        const elementType = showLabel ? 'span' : 'div';
        const className
            = showLabel ? 'overflow-menu-item-icon' : 'toolbox-icon';
        const iconWrapper
            = React.createElement(elementType, { className }, icon);
        const useTooltip = !showLabel && tooltip.length > 0;

        if (useTooltip) {
            return (
                <Tooltip
                    description = { tooltip }
                    position = { tooltipPosition }>
                    { iconWrapper }
                </Tooltip>
            );
        }

        return iconWrapper;
    }
}
