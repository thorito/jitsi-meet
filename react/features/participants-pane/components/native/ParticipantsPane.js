// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { openDialog } from '../../../base/dialog';
import { JitsiModal } from '../../../base/modal';
import {
    getParticipantCount,
    isLocalParticipantModerator
} from '../../../base/participants';
import { equals } from '../../../base/redux';
import {
    AddBreakoutRoomButton,
    AutoAssignButton,
    LeaveBreakoutRoomButton
} from '../../../breakout-rooms/components/native';
import { CollapsibleRoom } from '../../../breakout-rooms/components/native/CollapsibleRoom';
import { getCurrentRoomId, getRooms, isInBreakoutRoom } from '../../../breakout-rooms/functions';
import MuteEveryoneDialog
    from '../../../video-menu/components/native/MuteEveryoneDialog';
import { close } from '../../actions.native';

import { ContextMenuMore } from './ContextMenuMore';
import HorizontalDotsIcon from './HorizontalDotsIcon';
import LobbyParticipantList from './LobbyParticipantList';
import MeetingParticipantList from './MeetingParticipantList';
import styles from './styles';

/**
 * Participant pane.
 *
 * @returns {React$Element<any>}
 */
const ParticipantsPane = () => {
    const dispatch = useDispatch();
    const openMoreMenu = useCallback(() => dispatch(openDialog(ContextMenuMore)), [ dispatch ]);
    const closePane = useCallback(() => dispatch(close()), [ dispatch ]);
    const isLocalModerator = useSelector(isLocalParticipantModerator);
    const muteAll = useCallback(() => dispatch(openDialog(MuteEveryoneDialog)),
        [ dispatch ]);
    const { t } = useTranslation();

    const { hideAddRoomButton } = useSelector(state => state['features/base/config']);
    const { conference } = useSelector(state => state['features/base/conference']);
    const _isBreakoutRoomsSupported = Boolean(conference && conference.isBreakoutRoomsSupported());
    const currentRoomId = useSelector(getCurrentRoomId);
    const rooms = Object.values(useSelector(getRooms, equals))
        .filter((room: Object) => room.id !== currentRoomId)
        .sort((p1: Object, p2: Object) => (p1?.name || '').localeCompare(p2?.name || ''));
    const inBreakoutRoom = useSelector(isInBreakoutRoom);
    const participantsCount = useSelector(getParticipantCount);

    return (
        <JitsiModal
            headerProps = {{
                headerLabelKey: 'participantsPane.header'
            }}
            onClose = { closePane }
            style = { styles.participantsPane }>
            <LobbyParticipantList />
            <MeetingParticipantList />
            {!inBreakoutRoom
                && isLocalModerator
                && participantsCount > 2
                && rooms.length > 1
                && <AutoAssignButton />}
            {inBreakoutRoom && <LeaveBreakoutRoomButton />}
            {_isBreakoutRoomsSupported
                && rooms.map(room => (<CollapsibleRoom
                    key = { room.id }
                    room = { room } />))}
            {_isBreakoutRoomsSupported && !hideAddRoomButton && isLocalModerator
                && <AddBreakoutRoomButton />}
            {
                isLocalModerator
                && <View style = { styles.footer }>
                    <Button
                        children = { t('participantsPane.actions.muteAll') }
                        labelStyle = { styles.muteAllLabel }
                        mode = 'contained'
                        onPress = { muteAll }
                        style = { styles.muteAllMoreButton } />
                    <Button
                        icon = { HorizontalDotsIcon }
                        labelStyle = { styles.moreIcon }
                        mode = 'contained'
                        onPress = { openMoreMenu }
                        style = { styles.moreButton } />
                </View>
            }
        </JitsiModal>
    );
};

export default ParticipantsPane;
