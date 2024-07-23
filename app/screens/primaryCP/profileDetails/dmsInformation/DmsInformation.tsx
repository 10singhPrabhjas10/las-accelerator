import React, {useEffect, useState} from 'react';

import {getDmsInformationDetails} from 'screens/primaryCP/PrimaryChannelPartner.business';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';

import CommonStyles from 'utils/commonStyle';

const DmsInformation = () => {
  const [dmsData, setDmsData] = useState<IDataCard[]>([]);

  useEffect(() => {
    getDmsInformationDetails(setDmsData);
  }, []);

  return (
    <Layout headerTitle="DMS Information" style={CommonStyles.padding}>
      <DataCard data={dmsData} />
    </Layout>
  );
};

export default DmsInformation;
