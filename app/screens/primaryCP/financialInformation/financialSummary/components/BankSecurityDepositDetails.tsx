import React from 'react';
import DataCard from 'components/dataCard/DataCard';
import {IDepositDetailsProps} from '../../FinancialInformation.interface';
import {View} from 'react-native';

const BankSecurityDepositDetails = ({
  bankGuaranteeData,
  securityDepositData,
}: {
  bankGuaranteeData: IDepositDetailsProps[];
  securityDepositData: IDataCard[];
}) => {
  return (
    <View>
      <DataCard data={securityDepositData} />
      {bankGuaranteeData?.map((item, index) => (
        <DataCard data={item.data} key={index} />
      ))}
    </View>
  );
};

export default BankSecurityDepositDetails;
