import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ICheckboxProps} from 'types/components';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getMappedRetailerFilterData} from '../mappedRetailer/MappedRetailer.business';

const MappedRetailerFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IMappedRetailerFIlterProps) => {
  const [productDivision, setProductDivision] = useState<ICheckboxProps[]>([]);
  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);

  const handleClearFilters = () => {
    setFilterData({
      categoryIds: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    getMappedRetailerFilterData(setProductDivision);
  }, []);

  useEffect(() => {
    if (filterData.categoryIds.length > 0) {
      setIsFilterButtonDisabled(false);
    }
  }, [filterData]);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Product Division"
          data={productDivision}
          filterData={filterData.categoryIds}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              categoryIds: [...data],
            });
          }}
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

export default MappedRetailerFilter;
