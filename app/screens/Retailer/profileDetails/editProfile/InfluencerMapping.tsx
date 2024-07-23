import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import Spacer from 'components/spacer';
import {IInfluncerMappingResponse} from '../ProfileDetails.interface';
import {getInfluencerDetailsData} from '../ProfileDetails.business';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const InfluencerMapping = ({navigationFrom}: {navigationFrom: string}) => {
  const [influencerDetails, setInfluencerDetails] =
    useState<IInfluncerMappingResponse>();

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code = navigationFrom === 'Profile' ? customerCode : relationId;

  useEffect(() => {
    getInfluencerDetailsData(setInfluencerDetails, code);
  }, []);

  return (
    <View>
      <PrimaryTextInput
        titleText={'Influencer Name'}
        value={influencerDetails?.influencerName ?? EMPTY_DATA_DASH}
        onChangeText={val => {}}
        placeHolder={'Influencer Name'}
        disabled
      />
      <Spacer size={15} />
      <PrimaryTextInput
        titleText={'Status'}
        value={influencerDetails?.status ?? EMPTY_DATA_DASH}
        onChangeText={val => {}}
        placeHolder={'Status'}
        disabled
      />
      <Spacer size={15} />
      <PrimaryTextInput
        titleText={'Date of Joining'}
        value={
          influencerDetails?.dateOfJoining
            ? convertDateToDisplay(
                influencerDetails?.dateOfJoining,
                DateFormats.DD_MM_YYYY,
              )
            : EMPTY_DATA_DASH
        }
        onChangeText={val => {}}
        placeHolder={'Date of Joining'}
        disabled
      />
    </View>
  );
};

export default InfluencerMapping;
