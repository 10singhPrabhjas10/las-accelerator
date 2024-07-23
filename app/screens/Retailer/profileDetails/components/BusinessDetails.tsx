import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import FileCard from 'components/fileCard/FileCard';
import {
  getAreaNameData,
  getBusinessDetailsData,
} from '../ProfileDetails.business';
import {ITransformedBusinessDetails} from '../ProfileDetails.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const BusinessDetails = () => {
  const [businessDetails, setBusinessDetails] =
    useState<ITransformedBusinessDetails>();
  const [areaName, setAreaName] = useState('');

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  useEffect(() => {
    getBusinessDetailsData(undefined, customerCode, setBusinessDetails);
  }, []);

  useEffect(() => {
    if (businessDetails?.areaId !== '') {
      businessDetails?.areaId &&
        getAreaNameData(businessDetails?.areaId, setAreaName);
    }
  }, [businessDetails?.areaId]);

  useEffect(() => {
    const updateAreaName = (
      data: ITransformedBusinessDetails,
      newAreaName: string,
    ) => {
      const updatedData = data?.data?.map(item => {
        if (item.title === 'Area') {
          return {...item, text: newAreaName};
        }
        return item;
      });

      return {...data, data: updatedData};
    };

    // Update the state with the new area name
    if (areaName !== '' && businessDetails) {
      setBusinessDetails(updateAreaName(businessDetails, areaName));
    }
  }, [areaName]);

  return (
    <View>
      <DataCard
        body={
          businessDetails?.storeImage && (
            <FileCard
              leftIcon={
                <Image
                  style={{width: 30, height: 30}}
                  source={{uri: businessDetails?.storeImage}}
                />
              }
              fileName={'Product Image.jpg'}
            />
          )
        }
        data={businessDetails?.data}
      />
    </View>
  );
};

export default BusinessDetails;
