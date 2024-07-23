import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  rightContent: {
    flexDirection: 'row',
    marginRight: 30,
    gap: 30,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderColor: COLORS.lightGrey2,
    borderWidth: 1,
    borderRadius: 8,
  },
  subActivity: {paddingLeft: 16},
  cardTitleView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 16,
    width: '92%',
    alignSelf: 'center',
  },
  cardContent: {flexDirection: 'row', gap: 16},
  addressView: {flexDirection: 'column'},
  text: {color: COLORS.grey2},
  addressSubView: {
    height: 60,
    marginRight: 30,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  button: {marginBottom: 16, flex: 1},
  orderCard: {marginHorizontal: 20, marginBottom: 16},
  orderDivider: {marginVertical: 16},
  subTitle: {width: 250},
  customButton: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default styles;
