import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import {widthToRatio} from '@/utils/commonMethods';

export const styles = StyleSheet.create({
    listitems: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    itemContainer: {
        borderColor: COLORS.lightGrey,
        borderBottomWidth: 0.24,
        padding: 5,
        flexDirection: 'row',
    },
    iconContainer: {
        padding: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        width: widthToRatio(218),
        paddingVertical: 12,
        paddingHorizontal: 4,
        marginHorizontal: 5,
    },
    rightArrowContainer: {
        padding: 5,
        justifyContent: 'center',
    },  
});
export default styles;