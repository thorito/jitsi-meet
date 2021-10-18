// @flow

import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { moveToRoom } from '../../actions';

const useStyles = makeStyles(theme => {
    return {
        button: {
            color: theme.palette.textError
        }
    };
});

export const LeaveButton = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const styles = useStyles();

    const onLeave = useCallback(() => {
        dispatch(moveToRoom());
    }, [ dispatch ]);

    return (
        <button
            aria-label = { t('breakoutRooms.actions.leaveBreakoutRoom') }
            className = { `breakout-button ${styles.button}` }
            onClick = { onLeave }>
            {t('breakoutRooms.actions.leaveBreakoutRoom')}
        </button>
    );
};
