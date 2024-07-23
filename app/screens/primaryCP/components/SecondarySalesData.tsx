import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';
import DataCard from 'components/dataCard/DataCard';
import {gerSecondarySalesPerformanceData} from '../PrimaryChannelPartner.business';

const SecondarySalesData = ({
  retailerChannelPartnerId,
  type,
}: ISecondarySalesDataProps) => {
  const [salesData, setSalesData] = useState<IDataCard[]>([]);

  useEffect(() => {
    gerSecondarySalesPerformanceData(
      retailerChannelPartnerId,
      type,
      setSalesData,
    );
  }, [retailerChannelPartnerId, type]);

  return (
    <ScrollView
      style={CommonStyles.scrollViewContainer}
      automaticallyAdjustKeyboardInsets={true}>
      <Spacer size={20} />
      <DataCard data={salesData} />
    </ScrollView>
  );
};

export default SecondarySalesData;
