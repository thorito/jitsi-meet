// @flow

import { Component } from 'react';

export type Props = {

    /**
     * A succinct description of what the button does. Used by accessibility
     * tools and torture tests.
     */
    accessibilityLabel: string,

    /**
     * Whether this item is disabled or not. When disabled, clicking an item
     * has no effect, and it may reflect on its style.
     */
    disabled: boolean,

    /**
     * The name of the Icon of this {@code ToolboxItem}.
     */
    iconName: string,

    /**
     * The text associated with this item. When `showLabel` is set to
     * {@code true}, it will be displayed alongside the icon.
     */
    label: string,

    /**
     * On click handler.
     */
    onClick: Function,

    /**
     * Whether to show the label or not.
     */
    showLabel: boolean,

    /**
     * Whether this item is visible or not.
     */
    visible: boolean
};

/**
 * Abstract (base) class for an item in {@link Toolbox}.
 *
 * @abstract
 */
export default class AbstractToolboxItem extends Component<Props> {
    /**
     * Initializes a new {@code AbstractToolbarButton} instance.
     *
     * @param {Object} props - The React {@code Component} props to initialize
     * the new {@code AbstractToolbarButton} instance with.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onClick = this._onClick.bind(this);
    }

    _onClick: (*) => void;

    /**
     * Handles clicking/pressing this {@code AbstractToolboxItem} by
     * forwarding the event to the {@code onClick} prop of this instance if any.
     *
     * @protected
     * @returns {void}
     */
    _onClick(...args) {
        const { disabled, onClick } = this.props;

        !disabled && onClick && onClick(...args);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        if (!this.props.visible) {
            return null;
        }

        return this._renderItem();
    }
}
