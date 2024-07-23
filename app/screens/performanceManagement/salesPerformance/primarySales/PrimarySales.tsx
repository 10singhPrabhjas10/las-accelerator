/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView} from 'react-native';
import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import SalesCard from 'screens/performanceManagement/components/salesCard/SalesCard';
import Spacer from 'components/spacer';
import {getPrimarySalesData} from 'screens/performanceManagement/PerformanceMgmt.business';
import {ReportType} from 'screens/orderTaking/OrderTaking.interface';
import {
  IDropdownItem,
  ITransformedSalesResponse,
} from 'screens/performanceManagement/PerformanceMgmt.interface';
import {getTranslationLabel} from 'utils/commonMethods';

export interface ISalesProps {
  tabCurrentIndex: number;
  categoryData: IDropdownItem[];
  channelPartnerData: IDropdownItem[];
}

const PrimarySales = ({
  tabCurrentIndex,
  categoryData,
  channelPartnerData,
}: ISalesProps) => {
  const [ytdData, setYtdData] = useState<ITransformedSalesResponse>({
    leftTitle: '',
    rightTitle: '',
  });
  const [mtdData, setMtdData] = useState<ITransformedSalesResponse>({
    leftTitle: '',
    rightTitle: '',
  });
  const [salesPerformance, setSalesPerformance] =
    useState<ITransformedSalesResponse>({
      leftTitle: '',
      rightTitle: '',
    });
  const [ytdDropdownValue, setYtdDropdownValue] = useState('');
  const [ytdChannelValue, setYtdChannelValue] = useState('');
  const [mtdDropdownValue, setMtdDropdownValue] = useState('');
  const [mtdChannelValue, setMtdChannelValue] = useState('');

  const fetchPrimarySales = useCallback(
    (
      categoryId: string,
      reportType: string,
      channelPartnerId: string,
      setData: SetStateAction<any>,
    ) => {
      getPrimarySalesData(reportType, setData, channelPartnerId, categoryId);
    },
    [],
  );

  useEffect(() => {
    if (tabCurrentIndex === 0) {
      fetchPrimarySales(
        ytdDropdownValue,
        ReportType.YEARLY,
        ytdChannelValue,
        setYtdData,
      );
    }
  }, [ytdChannelValue, ytdDropdownValue, tabCurrentIndex]);

  useEffect(() => {
    if (tabCurrentIndex === 0) {
      fetchPrimarySales(
        mtdDropdownValue,
        ReportType.MONTHLY,
        mtdChannelValue,
        setMtdData,
      );
    }
  }, [mtdChannelValue, mtdDropdownValue, tabCurrentIndex]);

  useEffect(() => {
    if (tabCurrentIndex === 0) {
      fetchPrimarySales('', ReportType.YEARLY, '', setSalesPerformance);
    }
  }, [tabCurrentIndex]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}>
      <SalesCard
        title={getTranslationLabel('sales_performance')}
        leftValue={getTranslationLabel('target')}
        rightValue="Actual"
        data={salesPerformance && salesPerformance}
      />
      <Spacer size={16} />
      <SalesCard
        title="YTD Details"
        leftValue={getTranslationLabel('target')}
        rightValue="Actual"
        data={ytdData && ytdData}
        productDropdownRequired
        channelDropdownRequired
        productDropdownData={categoryData}
        channelDropdownData={channelPartnerData}
        setDropdownValue={setYtdDropdownValue}
        setChannelDropdownValue={setYtdChannelValue}
      />
      <Spacer size={16} />
      <SalesCard
        title="MTD Details"
        leftValue={getTranslationLabel('target')}
        rightValue="Actual"
        data={mtdData && mtdData}
        productDropdownRequired
        channelDropdownRequired
        productDropdownData={categoryData}
        channelDropdownData={channelPartnerData}
        setDropdownValue={setMtdDropdownValue}
        setChannelDropdownValue={setMtdChannelValue}
      />
      <Spacer size={16} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
  },
});
export default PrimarySales;
