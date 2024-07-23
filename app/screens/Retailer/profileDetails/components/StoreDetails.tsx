import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import {getStoreDetailsData} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const StoreDetails = () => {
  const [storeData, setStoreData] = useState([]);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  useEffect(() => {
    getStoreDetailsData(undefined, customerCode, setStoreData);
  }, []);

  return (
    <View>
      <DataCard data={storeData} />
    </View>
  );
};

export default StoreDetails;
