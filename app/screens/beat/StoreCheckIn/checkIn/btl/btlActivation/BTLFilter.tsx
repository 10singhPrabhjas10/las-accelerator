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
import {getBTLTypeDropdownData} from '../BTL.business';
import {getTranslationLabel} from 'utils/commonMethods';

export interface IFilterData {
  dateFilter: string[] | Date[];
  statusFilter: string[];
}

interface IBTLFilterProps {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

const BTLFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IBTLFilterProps) => {
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
    getBTLTypeDropdownData(undefined, setStatusData);
  }, []);

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.statusFilter?.length > 0 ||
      isCustomDateFilled ||
      dateValue?.length > 0;

    setButtonDisabled(!applyButtonEnabled);
  }, [filterData, dateValue]);

  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      setDateValue([startDate, endDate]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setDateValue(filterData.dateFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title={getTranslationLabel('status')}
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

export default BTLFilter;
