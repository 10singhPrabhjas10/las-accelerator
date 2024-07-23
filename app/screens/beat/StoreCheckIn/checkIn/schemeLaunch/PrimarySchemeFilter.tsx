import {View} from 'react-native';
import React from 'react';
import CommonStyles from 'utils/commonStyle';
import FilterCheckbox from 'screens/beat/components/filterCheckbox/FilterCheckbox';
import {IPSchemeFilterProps} from '../../StoreCheckIn.interface';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';

const productDivisionData = [
  {id: 'all', name: 'Select All'},
  {id: 'Water Heater', name: 'Water Heater'},
  {id: 'Voltage Stabilizer', name: 'Voltage Stabilizer'},
  {id: 'Fans', name: 'Fans'},
];

const PrimarySchemeFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IPSchemeFilterProps) => {
  const handleClearFilters = () => {
    setFilterData([]);
    onApplyFilter();
  };
  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          setFilterData={data => {
            setFilterData(data);
          }}
          showSearch
          filterData={filterData}
          data={productDivisionData}
          accordionTitle={'Product Division'}
          isExpanded={true}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={filterData?.length <= 0}
      />
    </View>
  );
};

export default PrimarySchemeFilter;
