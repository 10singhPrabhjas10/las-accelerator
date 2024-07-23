import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {AttendanceOptions} from 'utils/Constants';
import CheckinCheckoutArrowsIcon from '../../../../assets/icons/checkin-checkout-arrow.svg';
import AttendanceRegularisationIcon from '../../../../assets/icons/attendance-regularisation.svg';
import ApplyLeavesIcon from '../../../../assets/icons/apply-leaves.svg';
import ActionButton from 'components/button/ActionButton';
import Spacer from 'components/spacer';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';

const menuItems = [
  {
    name: AttendanceOptions.CHECK_IN_CHECK_OUT,
    icon: <CheckinCheckoutArrowsIcon height={21} width={21} />,
    navigationScreen: 'CheckInCheckOut',
  },
  {
    name: AttendanceOptions.APPLY_REGULARISATION,
    icon: <AttendanceRegularisationIcon height={21} width={21} />,
    navigationScreen: 'AttendanceRegularisation',
  },
  {
    name: AttendanceOptions.APPLY_LEAVES,
    icon: <ApplyLeavesIcon height={21} width={21} />,
    navigationScreen: 'AttendanceLeaves',
  },
];

export const AttendanceLandingScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout headerTitle={'Attendance'} style={CommonStyles.padding16}>
      <FlatList
        data={menuItems}
        renderItem={({item}) => (
          <ActionButton
            icon={item.icon}
            title={item.name}
            key={item.name}
            onPress={() => navigation.navigate(item.navigationScreen)}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item, index) => `tile_${index}`}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {paddingHorizontal: 4},
});
