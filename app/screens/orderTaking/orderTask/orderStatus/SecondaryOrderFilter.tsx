import {View} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {ISecondaryOrderFilterProps} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {CURRENT_DATE, ValidRangeEndDate} from 'constants/dateFormat';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CustomRange from 'components/customRange/CustomRange';

const SecondaryOrderFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: ISecondaryOrderFilterProps) => {
  const [dateFilter, setDateFilter] = useState('');

  const handleClearFilters = () => {
    setFilterData({
      startDate: '',
      endDate: '',
    });
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

export default SecondaryOrderFilter;
