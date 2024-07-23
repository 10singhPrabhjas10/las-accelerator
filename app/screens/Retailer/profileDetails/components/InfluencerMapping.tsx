import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import {getInfluencerDetailsData} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const InfluencerMapping = () => {
  const [influencerDetails, setInfluencerDetails] = useState([]);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  useEffect(() => {
    getInfluencerDetailsData(undefined, customerCode, setInfluencerDetails);
  }, []);

  return (
    <View>
      <DataCard data={influencerDetails} />
    </View>
  );
};

export default InfluencerMapping;
