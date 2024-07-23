import {View, Text} from 'react-native';
import React from 'react';
import DataCard from 'components/dataCard/DataCard';
import {callNumber, openMaps} from 'utils/commonMethods';
import CustomButton from 'components/button/CustomButton';
import Spacer from 'components/spacer';
import {ButtonTypes} from 'types/buttons';
import CallingIcon from '../../../../assets/icons/callingIcon.svg';
import GPSIcon from '../../../../assets/icons/gps.svg';
import {EMPTY_DATA_DASH} from 'utils/Constants';

export interface ICustomer {
  addressLine1: string;
  addressLine2: string;
  blockCustomer: boolean;
  channelPartnerId: string;
  city: string;
  code: string;
  contactPerson: string;
  customerBlockReason: string;
  customerMobile: string;
  emailId: string;
  gstin: string;
  id: number;
  latitude: number;
  longitude: number;
  nameOfFirm: string;
  phoneNo: string;
  pincode: string;
  retailerCode: string;
  state: string;
  retailerName: string;
}

interface IRetailerDetailsProps {
  data?: ICustomer;
  onPressLiveLocation: () => void;
}

const RetailerDetails = ({
  data,
  onPressLiveLocation,
}: IRetailerDetailsProps) => {
  const callBtnIcon = <CallingIcon height={14} width={14} />;
  const gpsBtnIcon = <GPSIcon height={14} width={14} />;

  return (
    <View>
      <DataCard
        data={[
          {
            title: 'Retailer ID',
            text: data?.retailerCode ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Retailer Name',
            text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Contact Person Name',
            text: data?.retailerName ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Phone No.',
            text: data?.customerMobile
              ? `+91 ${data?.customerMobile}`
              : EMPTY_DATA_DASH,
          },
          {
            title: 'Geo-Location',
            text:
              data?.latitude !== null && data?.longitude !== null
                ? `${data?.latitude?.toFixed(4)}° N, ${data?.longitude?.toFixed(
                    4,
                  )}° E `
                : EMPTY_DATA_DASH,
          },
        ]}
      />
      <Spacer size={20} />
      <CustomButton
        icon={callBtnIcon}
        type={ButtonTypes.outline}
        text={'Call Contact Person'}
        isDisabled={!data?.customerMobile}
        onPress={() => callNumber(`+91 ${data?.customerMobile}`)}
      />
      {data?.latitude === null && data?.longitude === null && (
        <>
          <Spacer size={20} />
          <CustomButton
            icon={gpsBtnIcon}
            type={ButtonTypes.contained}
            text={'Get Live Location'}
            onPress={onPressLiveLocation}
          />
        </>
      )}
    </View>
  );
};

export default RetailerDetails;
