import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  containerStyle: {marginHorizontal: 16},
  titleStyle: {fontWeight: '500'},
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 0,
  },
  closeButtonPlayer: {position: 'absolute', top: 60, left: 15},
  playerView: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
  profileStyle: {
    width: 105,
    height: 60,
    borderRadius: 4,
    alignSelf: 'center',
    marginLeft: 30,
  },
  textContainerStyle: {marginLeft: 40},
  customCard: {
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  labelStyle: {
    color: COLORS.grey2,
    gap: 16,
    paddingTop: 16,
    paddingLeft: 4,
  },
});

export default styles;
