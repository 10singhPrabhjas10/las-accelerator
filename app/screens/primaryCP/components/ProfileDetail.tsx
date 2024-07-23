import React, {memo} from 'react';

import Spacer from 'components/spacer';
import CustomButton from 'components/button/CustomButton';
import {InformationCard} from 'components/infoCard/InformationCard';
import DataCard from 'components/dataCard/DataCard';

import CallingIcon from '../../../../assets/icons/callingIcon.svg';
import {ButtonTypes} from 'types/buttons';
import {callNumber} from 'utils/commonMethods';
import {SnackBarEnum} from 'constants/modalTypes';

const ProfileDetails = ({isBlocked, data}: IProfileDetails) => {
  const callBtnIcon = <CallingIcon height={14} width={14} />;

  return (
    <>
      <DataCard data={data} />
      <Spacer size={10} />
      {isBlocked && (
        <InformationCard
          type={SnackBarEnum.ERROR}
          description={
            'Order Placement is not allowed as the customer is blocked.'
          }
        />
      )}
      <Spacer size={6} />
      <CustomButton
        icon={callBtnIcon}
        type={ButtonTypes.outline}
        text={'Call Contact Person'}
        onPress={() => callNumber(data[2].text)}
      />
    </>
  );
};

export default memo(ProfileDetails);
