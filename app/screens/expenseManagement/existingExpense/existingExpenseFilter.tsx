import {View} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import DateRange from 'components/dateRange/DateRange';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import {
  ValidRangeEndDate,
  ValidRangeStartDateUpToTwoYear,
} from 'constants/dateFormat';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import { EXPENSE_STATUS } from 'utils/Constants';

export interface IFilterData {
  dateFilter: string[] | Date[];
  statusFilter: string[];
}


interface IExisitingExpenseFilterProps {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

const ExistingExpenseFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IExisitingExpenseFilterProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);
  const [statusData, setStatusData] = useState([]);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      dateFilter: dateValue,
    });
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      statusFilter: [],
      dateFilter: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    setStatusData(EXPENSE_STATUS)
  }, []);

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.statusFilter?.length > 0 || isCustomDateFilled;

    setButtonDisabled(!applyButtonEnabled);
  }, [filterData, dateValue]);

  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      setDateValue([startDate, endDate]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setDateValue(filterData.dateFilter);
  }, []);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Status"
          data={statusData}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              statusFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData.statusFilter}
        />
        <DateRange
          startDate={startDate ? startDate : dateValue?.[0]?.toString()}
          setStartDate={setStartDate}
          endDate={endDate ? endDate : dateValue?.[1]?.toString()}
          setEndDate={setEndDate}
          containerStyle={CommonStyles.flexOne}
          validRangeStartDate={ValidRangeStartDateUpToTwoYear}
          validRangeEndDate={ValidRangeEndDate(startDate)}
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

export default ExistingExpenseFilter;
