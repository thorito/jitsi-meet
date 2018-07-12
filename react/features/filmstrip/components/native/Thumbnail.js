// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { Audio, MEDIA_TYPE } from '../../../base/media';
import {
    PARTICIPANT_ROLE,
    ParticipantView,
    pinParticipant
} from '../../../base/participants';
import { Container } from '../../../base/react';
import { getTrackByMediaTypeAndParticipant } from '../../../base/tracks';

import AudioMutedIndicator from './AudioMutedIndicator';
import DominantSpeakerIndicator from './DominantSpeakerIndicator';
import ModeratorIndicator from './ModeratorIndicator';
import { AVATAR_SIZE } from '../styles';
import styles from './styles';
import VideoMutedIndicator from './VideoMutedIndicator';

/**
 * Thumbnail component's property types.
 */
type Props = {

    /**
     * The audio track this {@code Thumbnail} will render.
     */
    _audioTrack: Object,

    /**
     * The audio track this {@code Thumbnail} will render.
     */
    _videoTrack: Object,

    /**
     * Redux dispatch function.
     */
    dispatch: Dispatch<*>,

    /**
     * The conference participant this {@code Thumbnail} represents.
     */
    participant: Object
};

/**
 * React component for video thumbnail.
 *
 * @extends Component
 */
class Thumbnail extends Component<Props> {
    /**
     * Initializes new Video Thumbnail component.
     *
     * @param {Props} props - Component props.
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this._onClick = this._onClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            _audioTrack: audioTrack,
            _videoTrack: videoTrack,
            participant
        } = this.props;

        let style = styles.thumbnail;

        if (participant.pinned) {
            style = {
                ...style,
                ...styles.thumbnailPinned
            };
        }

        // We don't render audio in any of the following:
        // 1. The audio (source) is muted. There's no practical reason (that we
        //    know of, anyway) why we'd want to render it given that it's
        //    silence (& not even comfort noise).
        // 2. The audio is local. If we were to render local audio, the local
        //    participants would be hearing themselves.
        const audioMuted = !audioTrack || audioTrack.muted;
        const renderAudio = !audioMuted && !audioTrack.local;
        const participantId = participant.id;
        const videoMuted = !videoTrack || videoTrack.muted;

        return (
            <Container
                onClick = { this._onClick }
                style = { style }>

                { renderAudio
                    && <Audio
                        stream
                            = { audioTrack.jitsiTrack.getOriginalStream() } /> }

                <ParticipantView
                    avatarSize = { AVATAR_SIZE }
                    participantId = { participantId }
                    zOrder = { 1 } />

                { participant.role === PARTICIPANT_ROLE.MODERATOR
                    && <ModeratorIndicator /> }

                { participant.dominantSpeaker
                    && <DominantSpeakerIndicator /> }

                <Container style = { styles.thumbnailIndicatorContainer }>
                    { audioMuted
                        && <AudioMutedIndicator /> }

                    { videoMuted
                        && <VideoMutedIndicator /> }
                </Container>

            </Container>
        );
    }

    _onClick: () => void;

    /**
     * Handles click/tap event on the thumbnail.
     *
     * @returns {void}
     */
    _onClick() {
        const { dispatch, participant } = this.props;

        // TODO The following currently ignores interfaceConfig.filmStripOnly.
        dispatch(pinParticipant(participant.pinned ? null : participant.id));
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @param {Object} ownProps - Properties of component.
 * @private
 * @returns {{
 *      _audioTrack: Track,
 *      _videoTrack: Track
 *  }}
 */
function _mapStateToProps(state, ownProps) {
    const tracks = state['features/base/tracks'];
    const id = ownProps.participant.id;
    const audioTrack
        = getTrackByMediaTypeAndParticipant(tracks, MEDIA_TYPE.AUDIO, id);
    const videoTrack
        = getTrackByMediaTypeAndParticipant(tracks, MEDIA_TYPE.VIDEO, id);

    return {
        _audioTrack: audioTrack,
        _videoTrack: videoTrack
    };
}

export default connect(_mapStateToProps)(Thumbnail);
