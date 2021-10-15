// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog';
import { Icon, IconArrowDown, IconArrowUp } from '../../../base/icons';

import BreakoutRoomContextMenu from './BreakoutRoomContextMenu';
import BreakoutRoomParticipantItem from './BreakoutRoomParticipantItem';
import styles from './styles';

type Props = {

    /**
     * Room to display.
     */
    room: Object
}

export const CollapsibleRoom = ({ room }: Props) => {
    const dispatch = useDispatch();
    const [ collapsed, setCollapsed ] = useState(false);
    const { t } = useTranslation();

    /**
     * Returns a key for a passed item of the list.
     *
     * @param {string} item - The user ID.
     * @returns {string} - The user ID.
     */
    function _keyExtractor(item) {
        return item.jid;
    }

    /**
     * Toggles collpased state.
     *
     * @returns {void}
     */
    function _toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    /**
     * Opens breakout room context menu.
     *
     * @returns {void}
     */
    function _openContextMenu() {
        dispatch(openDialog(BreakoutRoomContextMenu, { room }));
    }

    return (
        <View>
            <TouchableOpacity
                onLongPress = { _openContextMenu }
                onPress = { _toggleCollapsed }
                style = { styles.collapsibleRoom }>
                <TouchableOpacity
                    onPress = { _toggleCollapsed }
                    style = { styles.arrowIcon }>
                    <Icon
                        size = { 18 }
                        src = { collapsed ? IconArrowUp : IconArrowDown } />
                </TouchableOpacity>
                <Text style = { styles.roomName }>{room.name || t('breakoutRooms.mainRoom')}</Text>
            </TouchableOpacity>
            {!collapsed && <FlatList
                bounces = { false }
                data = { Object.values(room.participants || {}) || [] }
                horizontal = { false }
                keyExtractor = { _keyExtractor }
                renderItem = { BreakoutRoomParticipantItem }
                showsHorizontalScrollIndicator = { false }
                windowSize = { 2 } />}
        </View>
    );
};
