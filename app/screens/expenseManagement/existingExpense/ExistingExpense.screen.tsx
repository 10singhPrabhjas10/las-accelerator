import {FlatList, InteractionManager} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {RootNavigationProp} from 'routes/RootNavigation';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import ExistingExpenseFilter, {IFilterData} from './existingExpenseFilter';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {COLORS} from '@/theme/colors';
// import {getFilteredExpensedataAPI} from '../ExpenseManagement.business';
// import {IExpenseFilterRequestBody} from '../ExpenseManagement.Interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const ExistingExpense = () => {
  const forms =
    useSelector((state: RootState) => state.expenseForm.forms) || [];
  console.log('formData', forms);
  const mockExpenseData = forms.map((entry, idx) => ({
    id: idx + 1,
    status: entry.form.status || 'Pending Approval',
    data: [
      {
        title: 'Expense Date',
        text: entry.form.fromDate
          ? moment(entry.form.fromDate).format(DateFormats.DD_MM_YYYY)
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Expense Amount',
        text:
          entry.form.calculatedAmount !== undefined
            ? entry.form.calculatedAmount
            : EMPTY_DATA_DASH,
      },
      {
        title: 'Expense Status',
        text: entry.form.status || 'Pending Approval',
        showStatusColor: true,
      },
    ],
  }));
  console.log('mockExpenseData', mockExpenseData);
  // const [existingExpenseDataList, setExistingExpenseDataList] = useState([]);
  // const [modifiedExistingExpenseDataList, setModifiedExistingExpenseDataList] = useState([]);
  const existingExpenseDataList = mockExpenseData;
  const modifiedExistingExpenseDataList = mockExpenseData;
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const flatListRef = useRef<FlatList<any>>(null);

  const [filterData, setFilterData] = useState<IFilterData>({
    dateFilter: [],
    statusFilter: [],
  });

  // Comment out API and filter logic
  // useEffect(() => {
  //   if (existingExpenseDataList.length > 0) {
  //     let result = transformExpenseData(existingExpenseDataList);
  //     setModifiedExistingExpenseDataList(result);
  //   } else {
  //     setModifiedExistingExpenseDataList([]);
  //   }
  // }, [existingExpenseDataList]);

  // const transformExpenseData = jsonData => {
  //   return jsonData.map(expense => ({
  //     id: expense.id,
  //     status: expense.status,
  //     data: [
  //       {
  //         title: 'Expense Date',
  //         text: expense?.createdAt
  //           ? moment(expense?.createdAt).format(DateFormats.DD_MM_YYYY)
  //           : EMPTY_DATA_DASH,
  //       },
  //       {
  //         title: 'Expense Amount',
  //         text: Number(expense.totalAmount) ?? EMPTY_DATA_DASH,
  //       },
  //       {
  //         title: 'Expense Status',
  //         text: expense.status ?? EMPTY_DATA_DASH,
  //       },
  //     ],
  //   }));
  // };

  // Comment out getFilterExpenseList
  // const getFilterExpenseList = useCallback(
  //   (filterType: IFilterData) => {
  //     const reqBody: IExpenseFilterRequestBody = {
  //       pagination: {
  //         page: pageNumber,
  //         pageSize: 10,
  //       },
  //       filters: {},
  //     };
  //     let filters = '';
  //     if (filterType?.statusFilter?.length > 0) {
  //       reqBody.filters.status = filterType?.statusFilter
  //         .filter(item => item !== ID_ALL)
  //         .map(status => `filters[$and][0][status][$eq]=${status}`);
  //       filters += reqBody.filters?.status?.join('&');
  //     }
  //     if (filterType.dateFilter?.[0])
  //       filters += `&filters[$and][0][fromDate][$gte]=${moment(
  //         filterType.dateFilter?.[0],
  //       ).format(DateFormats.YYYY_MM_DD)}`;
  //     if (filterType.dateFilter?.[1])
  //       filters += `&filters[$and][0][toDate][$lte]=${moment(
  //         filterType.dateFilter?.[1],
  //       ).format(DateFormats.YYYY_MM_DD)}`;
  //     filters += `&sort[createdAt]=asc`;

  //     getFilteredExpensedataAPI(
  //       filters,
  //       setExistingExpenseDataList,
  //       setTotalPages,
  //     );
  //     setIsFilterApplied(false);
  //   },
  //   [pageNumber],
  // );

  // useEffect(() => {
  //   if (pageNumber <= totalPages && isFilterApplied) {
  //     getFilterExpenseList(filterData);
  //   }
  // }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    // setExistingExpenseDataList([]);
    setPageNumber(1);
    setTotalPages(1);
    scrollToTop();
  };

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setFilterData({
          dateFilter: [],
          statusFilter: [],
        });
        setIsFilterApplied(true);
        setPageNumber(1);
        setTotalPages(1);
        scrollToTop();
      });

      return () => task.cancel();
    }, []),
  );

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <Layout headerTitle="Existing Expense">
      <FlatList
        data={modifiedExistingExpenseDataList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        ref={flatListRef}
        style={CommonStyles.flatListMargin}
        renderItem={({item, index}) => (
          <DataCard
            key={item.id}
            data={item.data}
            showViewDetailsButton={item.status === 'Draft' ? true : false}
            //showViewDetailsButton={item.status === 'Rejected' ? true : false}
            buttonText={
              //item.status === 'Rejected' ? 'Modify Expense' : undefined
              item.status === 'Draft' ? 'Modify Expense' : undefined
            }
            onPressViewLeadDetails={() => {
              navigation.navigate('NewExpense', {
                selectedExpenseToBeModified: forms[index],
                selectedExpenseIndex: index,
              });
            }}
            detailTextStyle={{color: COLORS.dgreen}}
            detailsStyle={{borderColor: COLORS.dgreen}}
          />
        )}
        ListEmptyComponent={
          <EmptyContainer title="No Existing Expense Available" />
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        ref={bottomSheetModalRef}>
        <ExistingExpenseFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default ExistingExpense;
