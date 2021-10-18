// @flow

import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { autoAssignToBreakoutRooms } from '../../actions';

const useStyles = makeStyles(theme => {
    return {
        button: {
            color: theme.palette.link01
        }
    };
});

export const AutoAssignButton = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const styles = useStyles();

    const onAutoAssign = useCallback(() => {
        dispatch(autoAssignToBreakoutRooms());
    }, [ dispatch ]);

    return (
        <button
            aria-label = { t('breakoutRooms.actions.autoAssign') }
            className = { `breakout-button ${styles.button}` }
            onClick = { onAutoAssign }>
            {t('breakoutRooms.actions.autoAssign')}
        </button>
    );
};
