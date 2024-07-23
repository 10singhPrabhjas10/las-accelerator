import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import {getPersonalDetailsData} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const PersonalDetails = () => {
  const [personalDetails, setPersonalDetails] = useState([]);

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  useEffect(() => {
    getPersonalDetailsData(undefined, customerCode, setPersonalDetails);
  }, []);

  return (
    <View>
      <DataCard data={personalDetails} />
    </View>
  );
};

export default PersonalDetails;
