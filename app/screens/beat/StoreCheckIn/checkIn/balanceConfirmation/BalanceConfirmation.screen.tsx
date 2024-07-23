import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {COLORS} from 'theme/colors';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import {Text} from 'react-native-paper';
import CardWrapper from 'components/card/Card';
import {getBalanceConfirmationData} from './BalanceConfirmation.business';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import WarningIcon from '../../../../../../assets/icons/warning-triangle.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {submitCollection} from '../CheckIn.business';

interface IBalanceDataResponse {
  attributes: {
    acknowledged: boolean;
    balanceConfirmationId: string;
    channelPartnerId: string;
    createdAt: string;
    updatedAt: string;
  };
  id: number;
}

const BalanceConfirmationScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'BalanceConfirmation'>>();
  const {beatPlanItemId} = route.params;

  const [balanceData, setBalanceData] = useState<IBalanceDataResponse[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const radioButtonData = [
    {value: 'Pending', label: 'Pending'},
    {value: 'Not Pending', label: 'Not Pending'},
  ];

  useEffect(() => {
    getBalanceConfirmationData(relationId, setBalanceData);
  }, []);

  const handleBalanceConfirmation = () => {
    const requestBody = {
      balanceConfirmation: true,
    };
    submitCollection(beatPlanItemId, requestBody, () => {});
  };

  const isPending = !balanceData?.length;

  return (
    <Layout style={CommonStyles.padding} headerTitle="Balance Information">
      <View style={styles.container}>
        <CardWrapper>
          <Text variant="titleMedium" style={styles.textCenter}>
            Balance Confirmation
          </Text>
          <CustomRadioButton
            title=""
            onChange={val => {}}
            value={!isPending ? 'Not Pending' : 'Pending'}
            data={radioButtonData}
            disabled
          />
        </CardWrapper>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Balance Confirmation"
        onPress={() => {
          handleBalanceConfirmation();
          setShowSuccessModal(true);
        }}
      />
      <SuccessFailureModal
        btnType={!isPending ? 'confirm' : 'both'}
        showModal={showSuccessModal}
        isSuccess={!isPending ? true : false}
        icon={<WarningIcon />}
        title={'Confirmation'}
        label={
          !isPending
            ? 'All balance confirmation are up to date'
            : 'Please ask the channel partner to do balance confirmation'
        }
        secondaryBtnTitle={!isPending ? 'Dismiss' : 'Continue'}
        onSecondaryBtnHandler={() => {
          navigation.goBack();
        }}
        primaryButtonTitle="Dismiss"
        onPrimaryBtnHandler={() => {
          navigation?.goBack();
        }}
        headlineStyle={{
          color: !isPending ? COLORS.darkGreen2 : COLORS.delightYellow,
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  container: {flex: 1, marginTop: 20},
});

export default BalanceConfirmationScreen;
