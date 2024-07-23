import React from 'react';
import {View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import DateRange from 'components/dateRange/DateRange';
import Accordion from 'components/accordion/Accordion';

import CommonStyles from 'utils/commonStyle';
import {ValidRangeEndDate, ValidRangeStartDate} from 'constants/dateFormat';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import Spacer from 'components/spacer';

const EpodData = [
  {value: 'true', label: 'Yes'},
  {value: 'false', label: 'No'},
];

const InvoiceDetailsFilter = ({
  filterData,
  onApplyFilter,
  setFilterData,
}: IOrderInvoiceFilterProps) => {
  const handleClearFilters = () => {
    setFilterData({
      epod: '',
      invoiceDate: {
        fromDate: '',
        toDate: '',
      },
    });
    onApplyFilter();
  };

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <Spacer size={20} />
        <CustomRadioButton
          title="ePOD Status"
          data={EpodData}
          value={filterData.epod}
          onChange={(value: string) =>
            setFilterData({
              ...filterData,
              epod: value,
            })
          }
          textStyle={CommonStyles.marginHorizontal}
        />
        <Accordion
          title="Date"
          isWhiteAccordion
          isExpanded
          headingStyle={CommonStyles.accordionHeadingStyle}
          titleStyle={CommonStyles.accordionTitleStyle}>
          <View style={CommonStyles.padding10}>
            <DateRange
              startDate={filterData.invoiceDate.fromDate}
              setStartDate={date => {
                setFilterData({
                  ...filterData,
                  invoiceDate: {
                    ...filterData.invoiceDate,
                    fromDate: date,
                  },
                });
              }}
              endDate={filterData.invoiceDate.toDate}
              setEndDate={date => {
                setFilterData({
                  ...filterData,
                  invoiceDate: {
                    ...filterData.invoiceDate,
                    toDate: date,
                  },
                });
              }}
              validRangeStartDate={ValidRangeStartDate}
              validRangeEndDate={ValidRangeEndDate(
                filterData.invoiceDate.fromDate,
              )}
              containerStyle={CommonStyles.flexOne}
            />
          </View>
        </Accordion>
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
      />
    </View>
  );
};

export default InvoiceDetailsFilter;
