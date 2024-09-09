import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Layout from 'components/Layout';
import ScreenHeader from '../../../components/headers/ScreenHeader';
import SubHeader from '../../../components/subHeader/subHeader';
import {COLORS} from '../../../theme/colors';
import CalendarSvg from '../../../../assets/images/calendar.svg';
import {widthToRatio, heightToRatio} from '../../../utils/commonMethods';

interface AttendanceLandingScreenProps {
  title?: string;
}

export const AttendanceLandingScreen: React.FC<
  AttendanceLandingScreenProps
> = ({title = 'Gururaj Chandera'}) => {
  return (
    <Layout isScrollable>
      <ScreenHeader showScreenName={false} />
      <SubHeader title={title}>
        <View style={styles.headingContainer}>
          <CalendarSvg
            width={heightToRatio() * 25}
            height={heightToRatio() * 25}
          />
          <Text style={styles.salesTextStyle}>Sales Operations</Text>
        </View>
        <Text style={styles.headingTextStyle}>Today’s</Text>
        <Text style={styles.headingTextStyle}>Attendance</Text>
      </SubHeader>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {paddingHorizontal: 4},
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightToRatio() * 16,
  },
  headingTextStyle: {
    fontSize: heightToRatio() * 20,
    fontWeight: '700',
    // marginTop: heightToRatio() * 16,
    // lineHeight: heightToRatio() * 25,
  },
  salesTextStyle: {
    color: COLORS.dDarkGreen,
    fontSize: heightToRatio() * 10,
    fontWeight: '400',
    lineHeight: heightToRatio() * 12.5,
    textAlignVertical: 'center',
    backgroundColor: COLORS.neutralLight,
    paddingHorizontal: widthToRatio() * 8,
    paddingVertical: heightToRatio() * 8,
  },
});

// import React from 'react';
// import {FlatList, StyleSheet} from 'react-native';
// import {AttendanceOptions} from 'utils/Constants';
// import CheckinCheckoutArrowsIcon from '../../../../assets/icons/checkin-checkout-arrow.svg';
// import AttendanceRegularisationIcon from '../../../../assets/icons/attendance-regularisation.svg';
// import ApplyLeavesIcon from '../../../../assets/icons/apply-leaves.svg';
// import ActionButton from 'components/button/ActionButton';
// import Spacer from 'components/spacer';
// import Layout from 'components/Layout';
// import CommonStyles from 'utils/commonStyle';
// import {useNavigation} from '@react-navigation/native';

// const menuItems = [
//   {
//     name: AttendanceOptions.CHECK_IN_CHECK_OUT,
//     icon: <CheckinCheckoutArrowsIcon height={21} width={21} />,
//     navigationScreen: 'CheckInCheckOut',
//   },
//   {
//     name: AttendanceOptions.APPLY_REGULARISATION,
//     icon: <AttendanceRegularisationIcon height={21} width={21} />,
//     navigationScreen: 'AttendanceRegularisation',
//   },
//   {
//     name: AttendanceOptions.APPLY_LEAVES,
//     icon: <ApplyLeavesIcon height={21} width={21} />,
//     navigationScreen: 'AttendanceLeaves',
//   },
// ];

// export const AttendanceLandingScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <Layout headerTitle={'Attendance'} style={CommonStyles.padding16}>
//       <FlatList
//         data={menuItems}
//         renderItem={({item}) => (
//           <ActionButton
//             icon={item.icon}
//             title={item.name}
//             key={item.name}
//             onPress={() => navigation.navigate(item.navigationScreen)}
//           />
//         )}
//         contentContainerStyle={styles.flatListContainer}
//         keyExtractor={(item, index) => `tile_${index}`}
//         showsVerticalScrollIndicator={false}
//       />
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   flatListContainer: {paddingHorizontal: 4},
// });
