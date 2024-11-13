import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  userInfoContainer: {
    height: heightToRatio(126),
    width: widthToRatio(360),
    backgroundColor: COLORS.dDarkGreen,
    display: 'flex',
    alignItems: 'center',
  },
  headerVector: {
    position: 'absolute',
    right: 0,
    alignSelf: 'flex-end',
  },
  userInfoCard: {
    height: heightToRatio(80),
    width: widthToRatio(286),
    marginVertical: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userStatusContainer: {
    backgroundColor: COLORS.appliedGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 240,
    bottom: 70,
    padding: 5,
  },
  userStatusText: {
    width: widthToRatio(64),
    height: heightToRatio(20),
    textAlign: 'center',
  },
  userInfoContents: {
    height: heightToRatio(56),
    width: widthToRatio(298),
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    bottom: 5,
  },
  userImageContainer: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.lightGrey,
    height: heightToRatio(54),
    width: widthToRatio(54),
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    right: 24,
  },
  userImage: {
    position: 'relative',
    top: 8,
  },
  userTextContainer: {
    width: widthToRatio(194),
    justifyContent: 'center',
    marginHorizontal: 2,
    position: 'relative',
    right: 10,
  },
  userTextHeading: {
    height: heightToRatio(26),
    padding: 2,
    fontWeight: 'bold',
  },
  userTextSubHeading: {
    height: heightToRatio(26),
    padding: 2,
  },
  dotThreeVerticle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthToRatio(25),
    height: heightToRatio(25),
    position: 'relative',
    top: 18,
    right: 18,
  },
});
