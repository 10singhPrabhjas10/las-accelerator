import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import CustomRange from 'components/customRange/CustomRange';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CommonStyles from 'utils/commonStyle';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {ITicketFilterData} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';

import {
  getLastMonthRange,
  getLastQuarterRange,
  getLastWeekRange,
  ValidRangeEndDate,
  ValidRangeStartDate,
} from 'constants/dateFormat';
import {getRaiseTicketDropdownData} from '../../CheckIn.business';

interface ITicketHistory {
  filterData: ITicketFilterData;
  setFilterData: (data: ITicketFilterData) => void;
  onApplyFilter: () => void;
  relationId: string;
}

const TicketFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
  relationId,
}: ITicketHistory) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);
  const [requestType, setRequestType] = useState([]);
  const [status, setStatus] = useState([]);
  const [dateFilterType, setDateFilterType] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    getRaiseTicketDropdownData(
      relationId,
      undefined,
      setRequestType,
      setStatus,
      setDateFilterType,
    );
  }, []);

  const handleDropdown = (data: string) => {
    if (data === 'Last Week') {
      setDateValue(getLastWeekRange());
    } else if (data === 'Last Month') {
      setDateValue(getLastMonthRange());
    } else if (data === 'Last Quarter') {
      setDateValue(getLastQuarterRange());
    } else {
      setDateValue([]);
    }
  };

  useEffect(() => {
    if (dateFilter === 'Custom Range' && startDate !== '' && endDate !== '') {
      setDateValue([startDate, endDate]);
    }
  }, [startDate, endDate, dateFilter]);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      dateFilter: dateValue,
      dropdownType: dateFilter,
    });
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      requestFilter: [],
      statusFilter: [],
      dateFilter: [],
      dropdownType: '',
    });
    onApplyFilter();
  };

  useEffect(() => {
    const isDateFilled = dateFilter !== 'Custom Range' && dateValue?.length > 0;
    const isCustomDateFilled =
      dateFilter === 'Custom Range' && startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.requestFilter?.length > 0 ||
      filterData?.statusFilter?.length > 0 ||
      (isDateFilled && !isCustomDateFilled) ||
      isCustomDateFilled ||
      dateValue?.length > 0;

    setButtonDisabled(!applyButtonEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData?.requestFilter, dateValue, filterData?.statusFilter]);

  useEffect(() => {
    setDateValue(filterData.dateFilter);
    setDateFilter(filterData.dropdownType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Request Type"
          data={requestType}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              requestFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData.requestFilter}
        />
        <FilterCheckbox
          title="Status"
          data={status}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              statusFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData.statusFilter}
        />

        <CustomRange
          dateFilter={dateFilter}
          dropDownType={filterData.dropdownType}
          dateFilterType={dateFilterType}
          setDateFilter={data => setDateFilter(data)}
          handleDropdown={data => handleDropdown(data)}
          startDate={startDate ? startDate : dateValue[0]}
          setStartDate={val => setStartDate(val)}
          endDate={endDate ? endDate : dateValue[1]}
          setEndDate={val => setEndDate(val)}
          validRangeStartDate={ValidRangeStartDate}
          validRangeEndDate={ValidRangeEndDate(startDate)}
          containerStyle={CommonStyles.flexOne}
          dateViewStyle={styles.dateViewStyle}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={handleApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={buttonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateViewStyle: {paddingTop: 10, paddingHorizontal: 10},
});

export default TicketFilter;
