import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Divider} from 'react-native-paper';

import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import DateRange from 'components/dateRange/DateRange';
import Accordion from 'components/accordion/Accordion';

import {ICheckboxProps} from 'types/components';
import CommonStyles from 'utils/commonStyle';
import {ValidRangeEndDate, ValidRangeStartDate} from 'constants/dateFormat';
import {getOrderHistoryFilterData} from '../OrderManagement.business';

const OrderHistoryFilter = ({
  filterData,
  onApplyFilter,
  setFilterData,
}: IOrderHistoryFilterProps) => {
  const [orderStatus, setOrderStatus] = useState<ICheckboxProps[]>([]);
  const [categoryIds, setCategoryIds] = useState<ICheckboxProps[]>([]);

  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);

  const handleClearFilters = () => {
    setFilterData({
      orderStatus: [],
      categoryIds: [],
      customDate: {
        fromDate: '',
        toDate: '',
      },
    });
    onApplyFilter();
  };

  useEffect(() => {
    getOrderHistoryFilterData(setOrderStatus, setCategoryIds);
  }, []);

  useEffect(() => {
    if (
      filterData.orderStatus.length > 0 ||
      filterData.categoryIds.length > 0
    ) {
      setIsFilterButtonDisabled(false);
    }
  }, [filterData]);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Product Division"
          data={categoryIds}
          filterData={filterData.categoryIds}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              categoryIds: [...data],
            });
          }}
        />
        <Accordion
          title="Date"
          isWhiteAccordion
          isExpanded
          headingStyle={CommonStyles.accordionHeadingStyle}
          titleStyle={CommonStyles.accordionTitleStyle}>
          <View style={CommonStyles.padding10}>
            <DateRange
              startDate={filterData.customDate.fromDate}
              setStartDate={date => {
                setFilterData({
                  ...filterData,
                  customDate: {
                    ...filterData.customDate,
                    fromDate: date,
                  },
                });
              }}
              endDate={filterData.customDate.toDate}
              setEndDate={date => {
                setFilterData({
                  ...filterData,
                  customDate: {
                    ...filterData.customDate,
                    toDate: date,
                  },
                });
              }}
              validRangeStartDate={ValidRangeStartDate}
              validRangeEndDate={ValidRangeEndDate(
                filterData.customDate.fromDate,
              )}
              containerStyle={CommonStyles.flexOne}
            />
          </View>
        </Accordion>
        <Divider style={CommonStyles.horizontalDivider2} />
        <FilterCheckbox
          title="Order Status"
          data={orderStatus}
          filterData={filterData.orderStatus}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              orderStatus: [...data],
            });
          }}
          showSearch={false}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={isFilterButtonDisabled}
      />
    </View>
  );
};

export default OrderHistoryFilter;
