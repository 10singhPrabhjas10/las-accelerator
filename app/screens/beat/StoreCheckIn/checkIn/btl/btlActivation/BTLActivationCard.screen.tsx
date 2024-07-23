import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import DropDown from 'components/dropdown/Dropdown';
import Spacer from 'components/spacer';

import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {getBTLTypeDropdownData, submitBTLStatus} from '../BTL.business';
import {IBTLData, IBTLStatusReqBody} from '../BTL.interface';

const BTLActivationCardScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'BtlActivationCard'>>();
  const {btlData, refreshData} = route.params;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [status, setStatus] = useState('');
  const [btlStatus, setBTLStatus] = useState<IBTLData>();
  const [showDropdown, setShowDropdown] = useState({
    status: false,
    imageType: false,
  });

  useEffect(() => {
    getBTLTypeDropdownData(setBTLStatus);
  }, []);

  const handleSubmit = () => {
    const reqBody: IBTLStatusReqBody = {
      data: {
        status: status,
      },
    };
    submitBTLStatus(reqBody, btlData?.btlMaterialCode, () =>
      setShowSuccessModal(true),
    );
  };

  return (
    <Layout headerTitle="BTL Activation" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DataCard
          key={btlData.id}
          data={btlData.data}
          header={btlData?.btlNo}
        />
        <Spacer size={24} />
        <DropDown
          list={btlStatus?.statusType ?? []}
          label={'Activation Status'}
          placeholder={'Select Status'}
          // isDisabled={false}
          isRequired
          value={status}
          visible={showDropdown.status}
          onChangeDropdownState={() =>
            setShowDropdown({
              ...showDropdown,
              status: !showDropdown.status,
            })
          }
          setValue={data => {
            setStatus(data);
          }}
        />
      </View>
      <CustomButton
        text="Submit"
        type={ButtonTypes.contained}
        onPress={() => handleSubmit()}
        isDisabled={status?.length === 0}
      />

      <SuccessFailureModal
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title="Request Complete"
        label="Thank you! the BTL request is now complete"
        secondaryBtnTitle="Dismiss"
        onSecondaryBtnHandler={() => {
          navigation.goBack();
          refreshData();
        }}
      />
    </Layout>
  );
};

export default BTLActivationCardScreen;
