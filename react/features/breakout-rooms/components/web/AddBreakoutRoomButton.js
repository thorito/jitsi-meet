// @flow

import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { createBreakoutRoom } from '../../actions';

const useStyles = makeStyles(theme => {
    return {
        button: {
            backgroundColor: theme.palette.action02,
            color: theme.palette.text01,

            '&:hover': {
                backgroundColor: theme.palette.action02Hover
            }
        }
    };
});

export const AddBreakoutRoomButton = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const styles = useStyles();

    const onAdd = useCallback(() =>
        dispatch(createBreakoutRoom())
    , [ dispatch ]);

    return (
        <button
            aria-label = { t('breakoutRooms.actions.add') }
            className = { `breakout-button ${styles.button}` }
            onClick = { onAdd }>
            {t('breakoutRooms.actions.add')}
        </button>
    );
};
