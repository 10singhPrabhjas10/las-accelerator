import React, {useEffect, useState} from 'react';

import Layout from 'components/Layout';
import {getGeneralInformationDetails} from '../../PrimaryChannelPartner.business';
import DataCard from 'components/dataCard/DataCard';

import CommonStyles from 'utils/commonStyle';

export const GeneralInformation = () => {
  const [generalInfo, setGeneralInfo] = useState<IDataCard[]>([]);

  useEffect(() => {
    getGeneralInformationDetails(setGeneralInfo);
  }, []);

  return (
    <Layout
      headerTitle="General Information"
      isScrollable
      style={CommonStyles.padding}>
      {generalInfo.length > 0 ? <DataCard data={generalInfo} /> : null}
    </Layout>
  );
};

export default GeneralInformation;
