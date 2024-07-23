import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Text} from 'react-native-paper';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';
import CustomButton from 'components/button/CustomButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CardWrapper from 'components/card/Card';
import CustomPieChart from 'components/pieChart/CustomPieChart';
import Spacer from 'components/spacer';
import AccountOutstandingFilter from '../components/AccountOutstandingFilter';
import {getAccountOutstandingData} from '../FinancialInformation.business';

import CommonStyles from 'utils/commonStyle';
import {ButtonTypes} from 'types/buttons';
import DownloadIcon from './../../../../../assets/icons/downloadIcon.svg';
import {COLORS} from 'theme/colors';
import {
  IAccountOutstandingListData,
  IPieChartProps,
} from '../FinancialInformation.interface';
import {convertDateToDisplay, convertNumberToRupees} from 'utils/commonMethods';
import {CURRENT_DATE, DateFormats} from 'constants/dateFormat';
import {ICheckboxProps} from 'types/components';
import {createPDF} from '../FinancialInformation.helper';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const OutstandingAgeingGraph = ({data}: {data: IPieChartProps[]}) => {
  const total = data.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);

  return (
    <CardWrapper>
      <Text variant="titleMedium" style={style.textCenter}>
        Outstanding Ageing
      </Text>
      <Text variant="bodySmall" style={style.textCenterGrey}>
        Total: {convertNumberToRupees(total)}
      </Text>
      <Spacer size={15} />
      <CustomPieChart data={data} />
    </CardWrapper>
  );
};

const AccountOutstanding = () => {
  const [accountsData, setAccountsData] = useState<
    IAccountOutstandingListData[]
  >([]);
  const [productDivisionFilters, setProductDivisionFilters] = useState<
    ICheckboxProps[]
  >([]);
  const [pieChartData, setPieChartData] = useState<IPieChartProps[]>([]);
  const [filterData, setFilterData] = useState<IMappedRetailerFilters>({
    categoryIds: [],
  });
  const [filteredList, setFilteredList] = useState<
    IAccountOutstandingListData[]
  >([]);
  const [pdfData, setPdfData] = useState();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  useEffect(() => {
    getAccountOutstandingData(
      convertDateToDisplay(CURRENT_DATE, DateFormats.YYYY_MM_DD),
      setAccountsData,
      setProductDivisionFilters,
      setPdfData,
    );
  }, []);

  const getFilteredData = () => {
    let data = [];
    if (filterData.categoryIds.length > 0) {
      data = accountsData.filter(item =>
        filterData.categoryIds.includes(item.category),
      );
    } else {
      data = accountsData;
    }
    setFilteredList(data);

    const chartData = [
      {value: 0, label: '0-30 days'},
      {value: 0, label: '31-60 days'},
      {value: 0, label: '61-90 days'},
      {value: 0, label: '>90 days'},
    ];

    data.forEach(item => {
      const {overdueDays, amount} = item;
      if (overdueDays < 30) {
        chartData[0].value += amount;
      } else if (overdueDays > 30 && overdueDays < 60) {
        chartData[1].value += amount;
      } else if (overdueDays > 60 && overdueDays < 90) {
        chartData[2].value += amount;
      } else {
        chartData[3].value += amount;
      }
    });

    const isDataEmpty = chartData.every(item => item.value === 0);

    setPieChartData(isDataEmpty ? [] : chartData);
  };

  useEffect(() => {
    getFilteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountsData]);

  const handleApplyFilters = () => {
    getFilteredData();
    bottomSheetModalRef.current?.close();
  };

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title="No Records Found" />
      </View>
    );

  return (
    <Layout headerTitle="Account Outstanding">
      <FlatList
        data={filteredList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DataCard
            key={index}
            data={item.data}
            header={item.date}
            isExpandableButtonVisible
          />
        )}
        style={CommonStyles.flatListMargin}
        contentContainerStyle={CommonStyles.gap10}
        ListFooterComponent={
          pieChartData.length > 0 ? (
            <OutstandingAgeingGraph data={pieChartData} />
          ) : null
        }
        ListEmptyComponent={emptyContainer()}
      />
      <Spacer size={10} />
      <CustomButton
        type={ButtonTypes.outline}
        text="Download"
        icon={<DownloadIcon />}
        isDisabled={!filteredList.length}
        onPress={() => createPDF(pdfData)}
        style={CommonStyles.marginHorizontal}
      />
      <FilterButton
        onPress={() => bottomSheetModalRef.current?.present()}
        isDisabled={!accountsData.length}
      />
      <BottomSheetModalComponent
        maxHeight={'77%'}
        minHeight={'77%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <AccountOutstandingFilter
          categoryIds={productDivisionFilters}
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default AccountOutstanding;

const style = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  textCenterGrey: {textAlign: 'center', color: COLORS.grey2},
});
