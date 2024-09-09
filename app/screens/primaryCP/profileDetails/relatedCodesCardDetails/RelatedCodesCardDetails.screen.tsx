import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import CustomButton from 'components/button/CustomButton';
import DataCard from 'components/dataCard/DataCard';

import {callNumber} from 'utils/commonMethods';
import CallingIcon from '../../../../../assets/icons/callingIcon.svg';
import {ButtonTypes} from 'types/buttons';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {gerRelatedCodesDetails} from 'screens/primaryCP/PrimaryChannelPartner.business';

const RelatedCodesCardDetails = () => {
  const [relatedCodeData, setRelatedCodeData] = useState<IRelatedCodesData>({
    code: '3435',
    phoneNo: '5435345345',
    channelPartnerCode: '5345345',
    data: [{title: 'afdsa', text: '20000', formatValueInRupees: true}],
  });
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'RelatedCodesCardDetails'>>();
  const {channelPartnerCode} = route.params;

  const navigation = useNavigation<RootNavigationProp>();

  const callBtnIcon = () => <CallingIcon height={14} width={14} />;

  useEffect(() => {
    gerRelatedCodesDetails(channelPartnerCode, setRelatedCodeData);
  }, []);

  return (
    <Layout
      headerTitle={'Related Codes'}
      style={CommonStyles.padding}
      isScrollable>
      {relatedCodeData ? (
        <>
          <View style={CommonStyles.flexOne}>
            <DataCard
              header={`Customer Code: ${relatedCodeData?.code}`}
              data={relatedCodeData?.data}
            />
          </View>
          <CustomButton
            icon={callBtnIcon()}
            type={ButtonTypes.outline}
            text={'Call Contact Person'}
            onPress={() => callNumber(relatedCodeData?.phoneNo)}
          />
          <Spacer size={10} />
          <CustomButton
            type={ButtonTypes.contained}
            text={'Back to CP menu'}
            onPress={() => navigation.navigate('PrimaryChannelPartner')}
          />
        </>
      ) : (
        <View />
      )}
    </Layout>
  );
};

export default RelatedCodesCardDetails;
