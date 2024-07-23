import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CommonStyles from 'utils/commonStyle';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {getProductDivisionData} from 'screens/beat/StoreCheckIn/checkIn/epod/EPOD.business';

const sortData = [
  {
    value: 'name',
    label: 'Alphabetically',
  },
  {
    value: 'sales',
    label: 'Total Sales',
  },
];

const SecondarySalesFilter = ({
  filterData,
  setFilterData,
  isSortFilter,
  onApplyFilter,
}: ISecondarySalesFilterProps) => {
  const [productDivision, setProductDivision] = useState<ICheckboxProps[]>([]);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const handleClearFilters = () => {
    setFilterData({
      ...filterData,
      categoryNames: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    if (!isSortFilter) {
      getProductDivisionData(customerCode, setProductDivision, true);
    }
  }, [customerCode, isSortFilter]);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        {isSortFilter ? (
          <CustomRadioButton
            data={sortData}
            title=""
            value={filterData.sortBy}
            onChange={value =>
              setFilterData({
                ...filterData,
                sortBy: value,
              })
            }
            isVerticalButtons
          />
        ) : (
          <FilterCheckbox
            title="Product Division"
            data={productDivision}
            filterData={filterData.categoryNames}
            setFilterData={data => {
              setFilterData({
                ...filterData,
                categoryNames: [...data],
              });
            }}
          />
        )}
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        hideClearButton={isSortFilter}
      />
    </View>
  );
};

export default SecondarySalesFilter;
