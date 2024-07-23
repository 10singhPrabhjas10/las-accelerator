import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import OrderCard from 'screens/beat/components/orderCard/OrderCard';
import {COLORS} from 'theme/colors';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';

import WarningIcon from '../../../../../../assets/icons/warning-triangle.svg';
import Spacer from 'components/spacer';

const DmsDataScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [mtdData, setMtdData] = useState();
  const [ytdData, setYtdData] = useState();
  return (
    <Layout style={CommonStyles.padding} headerTitle="DMS Data Hygiene">
      <View style={CommonStyles.flexOne}>
        <OrderCard
          data={{leftTitle: `12' Jun 23'`, rightTitle: `50%`}}
          title={'DMS Data Hygiene'}
          leftValue={'Last Sync Date'}
          rightValue={'Data Accuracy Level'}
          rightTitleStyle={styles.rightTitle}
          showFooter={false}
        />
        <Spacer size={16} />
        <OrderCard
          data={{leftTitle: `12' Jun 23'`, rightTitle: `50%`}}
          title={'DMS Data Hygiene'}
          leftValue={'Last Sync Date'}
          rightValue={'Data Accuracy Level'}
          rightTitleStyle={styles.rightTitle}
          showFooter={false}
        />
        <Spacer size={16} />
        <OrderCard
          data={{leftTitle: `12' Jun 23'`, rightTitle: `50%`}}
          title={'DMS Data Hygiene'}
          leftValue={'Last Sync Date'}
          rightValue={'Data Accuracy Level'}
          rightTitleStyle={styles.rightTitle}
          showFooter={false}
        />
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Continue"
        onPress={() => {
          setShowModal(true);
        }}
      />
      <SuccessFailureModal
        btnType="cancel"
        showModal={showModal}
        title="Sync Date"
        label="Please ask Channel Partner to Sync DMS"
        primaryButtonTitle="Dismiss"
        icon={<WarningIcon />}
        onPrimaryBtnHandler={() => setShowModal(false)}
        theme={{colors: {onSurface: COLORS.delightYellow}}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  rightTitle: {
    color: COLORS.red,
  },
});

export default DmsDataScreen;
