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
    }
};
