// @flow

import React from 'react';

import AbstractPageReloadOverlay from './AbstractPageReloadOverlay';
import ReloadButton from './ReloadButton';

declare var AJS: Object;
declare var APP: Object;

const logger = require('jitsi-meet-logger').getLogger(__filename);

/**
 * Implements abstract React Component for the page reload overlays.
 */
export default class PageReloadOverlayBase extends AbstractPageReloadOverlay {
    /**
     * React Component method that executes once component is mounted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        // FIXME (CallStats - issue) This event will not make it to CallStats
        // because the log queue is not flushed before "fabric terminated" is
        // sent to the backed.
        // FIXME: We should dispatch action for this.
        APP.conference.logEvent(
            'page.reload',
            /* value */ undefined,
            /* label */ this.props.reason);
        logger.info(
            `The conference will be reloaded after ${
                this.state.timeoutSeconds} seconds.`);

        AJS.progressBars.update('#reloadProgressBar', 0);

        super.componentDidMount();
    }

    /**
     * React Component method that executes once component is updated.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate() {
        const { timeLeft, timeoutSeconds } = this.state;

        AJS.progressBars.update(
            '#reloadProgressBar',
            (timeoutSeconds - timeLeft) / timeoutSeconds);
    }

    /**
     * Renders the button for reloading the page if necessary.
     *
     * @protected
     * @override
     * @returns {ReactElement|null}
     */
    _renderButton() {
        if (this.props.isNetworkFailure) {
            return (
                <ReloadButton textKey = 'dialog.rejoinNow' />
            );
        }

        return null;
    }

    /**
     * Renders the progress bar.
     *
     * @protected
     * @override
     * @returns {ReactElement}
     */
    _renderProgressBar() {
        return (
            <div
                className = 'aui-progress-indicator'
                id = 'reloadProgressBar'>
                <span className = 'aui-progress-indicator-value' />
            </div>
        );
    }
}
