import React from 'react';
import {View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';

import {IAccountOutstandingFilter} from '../FinancialInformation.interface';
import CommonStyles from 'utils/commonStyle';

const AccountOutstandingFilter = ({
  categoryIds,
  filterData,
  setFilterData,
  onApplyFilter,
}: IAccountOutstandingFilter) => {
  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Product Division"
          data={categoryIds}
          showSearch
          filterData={filterData.categoryIds}
          setFilterData={data =>
            setFilterData({
              categoryIds: [...data],
            })
          }
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={onApplyFilter}
        isFilterButtonDisabled={true}
      />
    </View>
  );
};

export default AccountOutstandingFilter;
