import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {FlatList, View} from 'react-native';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import FileIcon from '../../../../assets/icons/file.svg';
import ModalComponent from 'modals/ModalComponent';
import PerformanceModal from './PerformanceModal';
import PrimarySalesFilter from 'screens/primaryCP/primarySales/PrimarySalesFilter';
import {
  downloadRetailerSalesData,
  getRetailerPerformanceData,
} from './Performance.business';
import {
  IDownloadRetailerReportReqBody,
  IRetailerPerformanceReqBody,
  ITransformedResponse,
} from './Performance.interface';
import {ID_ALL} from 'utils/Constants';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import Spacer from 'components/spacer';

const Performance = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const isLoading = useSelector((state: RootState) => state.modal.isLoading);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner?.retailerCustomerCode,
  );
  const flatListRef = useRef<FlatList<any>>(null);
  const [retailerData, setRetailerData] = useState<ITransformedResponse[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [filterData, setFilterData] = useState<IPrimarySalesFilters>({
    categoryIds: [],
    customDate: {
      fromDate: '',
    },
    selectedMonth: '',
  });

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  const getRetailerData = useCallback(
    (appliedFilters: IPrimarySalesFilters) => {
      const reqBody: IRetailerPerformanceReqBody = {
        filters: {
          categoryNames: [
            ...appliedFilters.categoryIds.filter(item => item !== ID_ALL),
          ],
        },
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
      };
      getRetailerPerformanceData(
        setRetailerData,
        setTotalPages,
        reqBody,
        customerCode,
      );
      setIsFilterApplied(false);
    },
    [customerCode, pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getRetailerData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setPageNumber(1);
    setTotalPages(1);
    setRetailerData([]);
    scrollToTop();
  };

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title={'You do not have Sales Performance data'} />
      </View>
    );

  const handleSubmit = (startDate: string, endDate: string) => {
    const reqBody: IDownloadRetailerReportReqBody = {
      filters: {
        customDate: {
          fromDate: startDate
            ? convertDateToDisplay(startDate, DateFormats.YYYY_MM_DD)
            : '',
          toDate: endDate
            ? convertDateToDisplay(endDate, DateFormats.YYYY_MM_DD)
            : '',
        },
      },
    };
    downloadRetailerSalesData(reqBody, startDate, endDate, customerCode);
  };

  return (
    <Layout headerTitle="Secondary Sales Performance">
      <FlatList
        data={retailerData}
        ref={flatListRef}
        renderItem={({item, index}) => (
          <DataCard key={index} header={item.categoryName} data={item.data} />
        )}
        style={CommonStyles.flatListMargin}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        scrollEventThrottle={16}
        onEndReached={() => {
          if (!onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
            setIsFilterApplied(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(false)}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={emptyContainer()}
      />

      <ModalComponent showModal={showModal}>
        <PerformanceModal
          setShowModal={setShowModal}
          onSubmit={(startDate, endDate) => handleSubmit(startDate, endDate)}
        />
      </ModalComponent>

      {retailerData?.length > 0 && (
        <>
          <Spacer size={10} />
          <CustomButton
            type={ButtonTypes.outline}
            style={CommonStyles.marginHorizontal}
            text="Download Report"
            icon={<FileIcon />}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      )}
      <FilterButton
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
      />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <PrimarySalesFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
          channelPartnerId={customerCode}
          monthFilterRequired={false}
          fromRetailerPerformance={true}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default Performance;
