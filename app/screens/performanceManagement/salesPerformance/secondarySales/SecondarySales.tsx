/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView} from 'react-native';
import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import SalesCard from 'screens/performanceManagement/components/salesCard/SalesCard';
import Spacer from 'components/spacer';
import {
  getSecondarySalesData,
  getStoreDetails,
} from 'screens/performanceManagement/PerformanceMgmt.business';
import {ReportType} from 'screens/orderTaking/OrderTaking.interface';
import {
  ITransformedSalesResponse,
  LasType,
} from 'screens/performanceManagement/PerformanceMgmt.interface';
import {ISalesProps} from '../primarySales/PrimarySales';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {getTranslationLabel} from 'utils/commonMethods';

const SecondarySales = ({
  tabCurrentIndex,
  categoryData,
  channelPartnerData,
}: ISalesProps) => {
  const userData = useSelector((state: RootState) => state?.user?.user);
  const lasType = userData?.lasType;

  const [ytdData, setYtdData] = useState<ITransformedSalesResponse>({
    leftTitle: '',
    rightTitle: '',
  });
  const [mtdData, setMtdData] = useState<ITransformedSalesResponse>({
    leftTitle: '',
    rightTitle: '',
  });
  const [storeData, setStoreData] = useState<ITransformedSalesResponse>({
    leftTitle: '',
    rightTitle: '',
  });
  const [secondarySalesPerformance, setSecondarySalesPerformance] =
    useState<ITransformedSalesResponse>({
      leftTitle: '',
      rightTitle: '',
    });
  const [ytdDropdownValue, setYtdDropdownValue] = useState('');
  const [ytdChannelValue, setYtdChannelValue] = useState('');
  const [mtdDropdownValue, setMtdDropdownValue] = useState('');
  const [mtdChannelValue, setMtdChannelValue] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [channelPartnerCode, setChannelPartnerCode] = useState('');

  const fetchSecondarySales = useCallback(
    (
      categoryId: string,
      reportType: string,
      channelPartnerId: string,
      setData: SetStateAction<any>,
    ) => {
      getSecondarySalesData(reportType, setData, channelPartnerId, categoryId);
    },
    [],
  );

  const fetchStoreDetails = useCallback(
    (
      categoryId: string,
      channelPartnerId: string,
      setData: SetStateAction<any>,
    ) => {
      getStoreDetails(setData, channelPartnerId, categoryId);
    },
    [],
  );

  useEffect(() => {
    if (tabCurrentIndex === 1 || lasType === LasType.RE) {
      fetchSecondarySales(
        ytdDropdownValue,
        ReportType.YEARLY,
        ytdChannelValue,
        setYtdData,
      );
    }
  }, [ytdChannelValue, ytdDropdownValue, tabCurrentIndex, lasType]);

  useEffect(() => {
    if (tabCurrentIndex === 1 || lasType === LasType.RE) {
      fetchSecondarySales(
        mtdDropdownValue,
        ReportType.MONTHLY,
        mtdChannelValue,
        setMtdData,
      );
    }
  }, [mtdChannelValue, mtdDropdownValue, tabCurrentIndex, lasType]);

  useEffect(() => {
    if (tabCurrentIndex === 1 || lasType === LasType.RE) {
      fetchStoreDetails(productCategory, channelPartnerCode, setStoreData);
    }
  }, [tabCurrentIndex, productCategory, channelPartnerCode, lasType]);

  useEffect(() => {
    if (tabCurrentIndex === 1 || lasType === LasType.RE) {
      fetchSecondarySales(
        '',
        ReportType.YEARLY,
        '',
        setSecondarySalesPerformance,
      );
    }
  }, [tabCurrentIndex, lasType]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}>
      <SalesCard
        title={'sales_performance'}
        leftValue={'target'}
        rightValue="Actual"
        data={secondarySalesPerformance && secondarySalesPerformance}
      />
      <Spacer size={16} />
      <SalesCard
        title="YTD Details"
        leftValue={'target'}
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
        leftValue={'target'}
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
      <SalesCard
        title={'store_details'}
        leftValue="Target Active Stores"
        rightValue="Actual Active Stores"
        data={storeData && storeData}
        productDropdownRequired
        channelDropdownRequired
        productDropdownData={categoryData}
        channelDropdownData={channelPartnerData}
        setDropdownValue={setProductCategory}
        setChannelDropdownValue={setChannelPartnerCode}
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
export default SecondarySales;
