import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    isFatalJitsiConferenceError,
    isFatalJitsiConnectionError
} from '../../base/lib-jitsi-meet';
import { CallOverlay } from '../../base/jwt';

import PageReloadFilmstripOnlyOverlay from './PageReloadFilmstripOnlyOverlay';
import PageReloadOverlay from './PageReloadOverlay';
import SuspendedFilmstripOnlyOverlay from './SuspendedFilmstripOnlyOverlay';
import SuspendedOverlay from './SuspendedOverlay';
import UserMediaPermissionsFilmstripOnlyOverlay
    from './UserMediaPermissionsFilmstripOnlyOverlay';
import UserMediaPermissionsOverlay from './UserMediaPermissionsOverlay';

declare var interfaceConfig: Object;

/**
 * Implements a React Component that will display the correct overlay when
 * needed.
 */
class OverlayContainer extends Component {
    /**
     * OverlayContainer component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * Type of overlay that should be rendered.
         */
        overlay: PropTypes.element,

        /**
         * Props for the overlay which should be rendered.
         */
        overlayProps: PropTypes.object
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement|null}
     * @public
     */
    render() {
        const { overlay, overlayProps } = this.props;

        return (
            overlay
                ? React.createElement(overlay, overlayProps)
                : null);
    }
}

/**
 * Maps (parts of) the redux state to the associated OverlayContainer's props.
 *
 * @param {Object} state - The redux state.
 * @returns {{
 *      overlay: ?Object,
 *      overlayProps: ?Object
 * }}
 * @private
 */
function _mapStateToProps(state) {
    const conferenceError = state['features/base/conference'].error;
    const connectionError = state['features/base/connection'].error;
    const { callOverlayVisible } = state['features/base/jwt'];
    const filmstripOnly
        = typeof interfaceConfig === 'object' && interfaceConfig.filmStripOnly;
    const overlayState = state['features/overlay'];
    let overlay;
    let overlayProps;

    if ((connectionError && isFatalJitsiConnectionError(connectionError))
        || (conferenceError && isFatalJitsiConferenceError(conferenceError))) {
        overlay
            = filmstripOnly
                ? PageReloadFilmstripOnlyOverlay
                : PageReloadOverlay;
        overlayProps = {
            isNetworkFailure: Boolean(connectionError),
            reason: (connectionError || conferenceError).message
        };
    } else if (overlayState.suspendDetected) {
        overlay
            = filmstripOnly
                ? SuspendedFilmstripOnlyOverlay
                : SuspendedOverlay;
    } else if (overlayState.isMediaPermissionPromptVisible) {
        overlay
            = filmstripOnly
                ? UserMediaPermissionsFilmstripOnlyOverlay
                : UserMediaPermissionsOverlay;
        overlayProps = {
            browser: overlayState.browser
        };
    } else if (callOverlayVisible) {
        overlay = CallOverlay;
    }

    return {
        /**
         * Type of overlay that should be rendered.
         */
        overlay,

        /**
         * Props for the overlay which should be rendered.
         */
        overlayProps
    };
}

export default connect(_mapStateToProps)(OverlayContainer);
