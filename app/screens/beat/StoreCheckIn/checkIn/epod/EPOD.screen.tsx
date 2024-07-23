import {FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import ModalComponent from 'modals/ModalComponent';
import BalanceModal from '../balanceConfirmation/BalanceModal';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {COLORS} from 'theme/colors';
import {getInvoicesData, submitEpodDateData} from './EPOD.business';
import {
  Fields,
  IEPODRequestBody,
  IInvoiceResponse,
  IInvoicesRequestBody,
} from './EPOD.interface';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import EPODFilter, {IFilterData} from './EPODFilter';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const EPODScreen = () => {
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [invoicesData, setInvoicesData] = useState<IInvoiceResponse[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState('');

  const [filterData, setFilterData] = useState<IFilterData>({
    dateFilter: [],
    productDivisionFilter: [],
  });

  const handleSubmit = (data: string, invoiceNo: string) => {
    const requestBody: IEPODRequestBody = {
      podDateTime: data,
    };
    submitEpodDateData(invoiceNo, requestBody, () => {
      setShowSuccessModal(true);
    });
  };

  const getInvoiceListData = useCallback(
    (filterType: IFilterData) => {
      const requestBody: IInvoicesRequestBody = {
        sort: {invoiceDate: 'desc'},
        fields: Object.values(Fields),
        filters: {
          channelPartnerCode: relationId,
        },
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
      };

      if (filterType?.dateFilter?.length > 0) {
        requestBody.filters.invoiceDate = {
          $gte: convertDateToDisplay(
            filterType?.dateFilter?.[0],
            DateFormats.YYYY_MM_DD,
          ),
          $lte: convertDateToDisplay(
            filterType?.dateFilter?.[1],
            DateFormats.YYYY_MM_DD,
          ),
        };
      }
      if (filterType?.productDivisionFilter?.length > 0) {
        requestBody.filters.categoryId =
          filterType?.productDivisionFilter?.filter(item => item !== ID_ALL);
      }
      getInvoicesData(requestBody, setInvoicesData, setTotalPages);
      setIsFilterApplied(false);
    },
    [pageNumber, relationId],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getInvoiceListData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setPageNumber(1);
    setTotalPages(1);
    setInvoicesData([]);
  };

  return (
    <Layout headerTitle="Invoice Information">
      {invoicesData?.length <= 0 && (
        <EmptyContainer title="No Invoices found for EPOD" />
      )}
      <FlatList
        data={invoicesData}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }}
        style={CommonStyles.flatListMargin}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <DataCard
            showViewDetailsButton
            key={item.id}
            data={[
              {
                title: 'Invoice Amount',
                text:
                  item?.totalInvoiceAmount !== null
                    ? `₹ ${formatNumberWithCommas(item?.totalInvoiceAmount)}`
                    : EMPTY_DATA_DASH,
              },
              {
                title: 'Invoice Date',
                text: item?.invoiceDate
                  ? convertDateToDisplay(
                      item?.invoiceDate,
                      DateFormats.DD_MM_YYYY,
                    )
                  : EMPTY_DATA_DASH,
              },
              {
                title: 'Product Division',
                text: item?.categoryName ?? EMPTY_DATA_DASH,
              },
              {
                title: 'ePOD Status',
                text: item?.podReceived?.toString() ?? EMPTY_DATA_DASH,
              },
            ]}
            header={'Invoice No: ' + item?.invoiceNo ?? EMPTY_DATA_DASH}
            buttonText="Expected ePOD Date"
            onPressViewLeadDetails={() => {
              setShowModal(true);
              setSelectedInvoiceNo(item?.invoiceNo);
            }}
            buttonDisabled={item?.podDateTime !== null}
          />
        )}
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <EPODFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
          relationId={relationId}
        />
      </BottomSheetModalComponent>
      <ModalComponent showModal={showModal}>
        <BalanceModal
          setShowSuccessModal={setShowSuccessModal}
          setShowModal={setShowModal}
          headerTitle={'Expected ePOD Date'}
          dateLabel={'ePOD Date'}
          onSubmit={data => handleSubmit(data, selectedInvoiceNo)}
        />
      </ModalComponent>
      <SuccessFailureModal
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title="Date Saved"
        label="You have successfully saved the expected ePOD date"
        secondaryBtnTitle="Dismiss"
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          handleApplyFilters();
        }}
        headlineStyle={styles.headlineStyle}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  headlineStyle: {color: COLORS.darkGreen2},
});

export default EPODScreen;
