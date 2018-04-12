// @flow

import AbstractVideoMuteButton from '../buttons/AbstractVideoMuteButton';

const { api } = window.alwaysOnTop;


export default class VideoMuteButton extends AbstractVideoMuteButton {
    state = {
        videoAvailable: false,
        videoMuted: false
    };

    componentDidMount() {
        api.on('videoMuteStatusChanged', this._videoMutedListener);
        api.on('videoAvailabilityChanged', this._videoAvailabilityListener);

        Promise.all([
            api.isVideoAvailable(),
            api.isVideoMuted()
        ])
        .then(res => {
            const [ videoAvailable, videoMuted ] = res;

            this.setState({
                videoAvailable,
                videoMuted
            });
        })
        .catch(console.error);
    }

    /**
     * Removes all listeners.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        api.removeListener('videoAvailabilityChanged',
            this._videoAvailabilityListener);
        api.removeListener('videoMuteStatusChanged',
            this._videoMutedListener);
    }

    _isDisabled() {
        return !this.state.videoAvailable;
    }

    _isVideoMuted() {
        return this.state.videoMuted;
    }

    _setVideoMuted() {
        api.executeCommand('toggleVideo');
    }

    /**
     * Handles audio available api events.
     *
     * @param {{ available: boolean }} status - The new available status.
     * @returns {void}
     */
    _videoAvailabilityListener({ available }) {
        this.setState({ videoAvailable: available });
    }

    /**
     * Handles video muted api events.
     *
     * @param {{ muted: boolean }} status - The new muted status.
     * @returns {void}
     */
    _videoMutedListener({ muted }) {
        this.setState({ videoMuted: muted });
    }
}
