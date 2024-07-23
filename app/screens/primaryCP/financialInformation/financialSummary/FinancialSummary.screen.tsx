import Layout from 'components/Layout';
import Accordion from 'components/accordion/Accordion';
import React, {useEffect, useState} from 'react';
import VGILCreditLimit from './components/VGILCreditLimit';
import CommonStyles from 'utils/commonStyle';
import VGOutstanding from './components/VGOutstanding';
import ChannelFinance from './components/ChannelFinance';
import BankSecurityDepositDetails from './components/BankSecurityDepositDetails';
import {getFinancialSummaryData} from '../FinancialInformation.business';
import {convertDateToDisplay} from 'utils/commonMethods';
import {CURRENT_DATE, DateFormats} from 'constants/dateFormat';
import {
  IDepositDetailsProps,
  IOutstandingData,
  IVgilCreditLimitProps,
} from '../FinancialInformation.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const FinancialSummary = () => {
  const initialVgilData = {
    totalCreditLimit: 0,
    utilizedCreditLimit: 0,
    availableCreditLimit: 0,
    pei: 0,
  };

  const initialOutstandingData = {
    pieChartData: [],
    totalOutstanding: 0,
    maxOverdueDays: 0,
  };

  const [vgilData, setVgilData] =
    useState<IVgilCreditLimitProps>(initialVgilData);
  const [bankGuaranteeData, setBankGuaranteeData] = useState<
    IDepositDetailsProps[]
  >([]);
  const [securityDepositData, setSecurityDepositData] = useState<IDataCard[]>(
    [],
  );
  const [outstandingData, setOutstandingData] = useState<IOutstandingData>(
    initialOutstandingData,
  );

  const channelPartnerId = useSelector(
    (state: RootState) => state.channelPartner.channelPartnerId,
  );

  useEffect(() => {
    getFinancialSummaryData(
      channelPartnerId,
      convertDateToDisplay(CURRENT_DATE, DateFormats.YYYY_MM_DD),
      setVgilData,
      setBankGuaranteeData,
      setSecurityDepositData,
      setOutstandingData,
    );
  }, [channelPartnerId]);

  return (
    <Layout
      headerTitle="Financial Summary"
      style={CommonStyles.padding}
      isScrollable>
      <Accordion title="VGIL Credit Limit">
        <VGILCreditLimit data={vgilData} />
      </Accordion>
      <Accordion title="VG Outstanding">
        <VGOutstanding data={outstandingData} />
      </Accordion>
      <Accordion title="Channel Finance">
        <ChannelFinance />
      </Accordion>
      <Accordion title="Bank Security Deposit Details">
        <BankSecurityDepositDetails
          bankGuaranteeData={bankGuaranteeData}
          securityDepositData={securityDepositData}
        />
      </Accordion>
    </Layout>
  );
};

export default FinancialSummary;
