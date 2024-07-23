import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import DateRange from 'components/dateRange/DateRange';
import {ValidRangeEndDate, ValidRangeStartDate} from 'constants/dateFormat';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getProductDivisionData} from 'screens/beat/StoreCheckIn/checkIn/epod/EPOD.business';
import {getSchemeNameList} from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/SchemeLaunch.business';

export interface IFilterData {
  dateFilter: string[] | Date[];
  categoryFilter: string[];
  schemeNameFilter: string[];
}

interface IActiveSchemeFilter {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
  channelPartnerId: string;
}

const ActiveSchemeFilter = ({
  filterData,
  channelPartnerId,
  setFilterData,
  onApplyFilter,
}: IActiveSchemeFilter) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);
  const [category, setCategory] = useState([]);
  const [schemeNameList, setSchemeNameList] = useState([]);

  useEffect(() => {
    getProductDivisionData(channelPartnerId, setCategory, false);
    getSchemeNameList(setSchemeNameList);
  }, [channelPartnerId]);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      dateFilter: dateValue,
    });
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      categoryFilter: [],
      dateFilter: [],
      schemeNameFilter: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.categoryFilter?.length > 0 ||
      filterData?.schemeNameFilter?.length > 0 ||
      isCustomDateFilled ||
      dateValue?.length > 0;

    setButtonDisabled(!applyButtonEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          title="Category"
          data={category}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              categoryFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData?.categoryFilter}
        />
        <DateRange
          startDate={startDate ? startDate : dateValue?.[0]?.toString()}
          setStartDate={setStartDate}
          endDate={endDate ? endDate : dateValue?.[1]?.toString()}
          setEndDate={setEndDate}
          containerStyle={CommonStyles.flexOne}
          validRangeStartDate={ValidRangeStartDate}
          validRangeEndDate={ValidRangeEndDate(startDate)}
        />
        <FilterCheckbox
          title="Scheme Name"
          data={schemeNameList}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              schemeNameFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData?.schemeNameFilter}
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

export default ActiveSchemeFilter;
