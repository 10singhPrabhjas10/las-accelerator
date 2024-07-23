import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  getReplacementSubmitInformationData,
  getReturnSubmitInformationData,
} from '../OrderManagement.business';
import CommonStyles from 'utils/commonStyle';

const ReturnReplacementInformation = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'ReturnReplacementInformation'>>();
  const navigation = useNavigation<RootNavigationProp>();

  const isReturn = route.params?.isReturn;

  const [informationData, setInformationData] = useState<IDataCard[]>([]);

  useEffect(() => {
    if (isReturn) {
      getReturnSubmitInformationData(setInformationData);
    } else {
      getReplacementSubmitInformationData(setInformationData);
    }
  }, [isReturn]);

  return (
    <Layout
      style={CommonStyles.padding}
      headerTitle={isReturn ? 'Returns' : 'Replacement'}
      onBackPress={() => navigation.navigate('OrderManagement')}>
      <DataCard data={informationData} />
    </Layout>
  );
};

export default ReturnReplacementInformation;
