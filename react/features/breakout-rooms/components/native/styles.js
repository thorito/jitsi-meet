import BaseTheme from '../../../base/ui/components/BaseTheme.native';

/**
 * The styles of the native components of the feature {@code breakout rooms}.
 */
export default {

    addButtonLabel: {
        fontSize: 15,
        lineHeight: 24,
        textTransform: 'capitalize',
        color: BaseTheme.palette.text01
    },

    addButton: {
        height: BaseTheme.spacing[6],
        backgroundColor: BaseTheme.palette.ui03,
        marginTop: BaseTheme.spacing[2],
        marginLeft: BaseTheme.spacing[3],
        marginRight: BaseTheme.spacing[3]
    },

    collapsibleRoom: {
        height: BaseTheme.spacing[6],
        marginTop: BaseTheme.spacing[2],
        marginLeft: BaseTheme.spacing[3],
        marginRight: BaseTheme.spacing[3],
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    arrowIcon: {
        backgroundColor: BaseTheme.palette.ui03,
        height: BaseTheme.spacing[5],
        width: BaseTheme.spacing[5],
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    roomName: {
        fontSize: 15,
        color: BaseTheme.palette.text01,
        fontWeight: 'bold',
        marginLeft: BaseTheme.spacing[2]
    },

    leaveButton: {
        height: BaseTheme.spacing[6],
        backgroundColor: 'transparent',
        marginTop: BaseTheme.spacing[2],
        marginLeft: BaseTheme.spacing[3],
        marginRight: BaseTheme.spacing[3]
    },

    leaveButtonLabel: {
        fontSize: 15,
        lineHeight: 24,
        textTransform: 'capitalize',
        color: BaseTheme.palette.textError
    }
};
