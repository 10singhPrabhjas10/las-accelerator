import {View} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import CustomRange from 'components/customRange/CustomRange';
import {CURRENT_DATE, ValidRangeEndDate} from 'constants/dateFormat';

const SchemeFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: ISecondarySchemesPerformanceFilters) => {
  const [dateFilter, setDateFilter] = useState('');

  const handleClearFilters = () => {
    setFilterData({
      startDate: '',
      endDate: '',
    });
    setDateFilter('');
    onApplyFilter();
  };

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <CustomRange
          showDropdown={true}
          dateFilter={dateFilter}
          dateFilterType={[]}
          setDateFilter={data => setDateFilter(data)}
          handleDropdown={() => {}}
          startDate={filterData.startDate}
          setStartDate={val =>
            setFilterData({
              ...filterData,
              startDate: val,
            })
          }
          endDate={filterData.endDate}
          setEndDate={val =>
            setFilterData({
              ...filterData,
              endDate: val,
            })
          }
          validRangeStartDate={{
            endDate: CURRENT_DATE,
          }}
          validRangeEndDate={ValidRangeEndDate(filterData.startDate)}
          containerStyle={CommonStyles.flexOne}
          dateViewStyle={CommonStyles.dateViewStyle}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
      />
    </View>
  );
};

export default SchemeFilter;
