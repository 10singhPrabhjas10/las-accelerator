import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import {getBankKycDetailsData} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  useEffect(() => {
    getBankKycDetailsData(undefined, customerCode, setBankDetails);
  }, []);
  return (
    <View>
      <DataCard data={bankDetails} />
    </View>
  );
};

export default BankDetails;
