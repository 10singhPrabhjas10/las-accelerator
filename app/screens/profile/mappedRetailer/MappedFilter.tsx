import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import {getMappedRetailerFilterData} from '../Profile.business';
import {getTranslationLabel} from 'utils/commonMethods';

export interface IFilterData {
  productFilter: string[];
}

interface IFilterProps {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

const MappedFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IFilterProps) => {
  const [productData, setProductData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    getMappedRetailerFilterData(setProductData);
  }, []);

  const handleClearFilters = () => {
    setFilterData({
      productFilter: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    const applyButtonEnabled = filterData?.productFilter?.length > 0;

    setButtonDisabled(!applyButtonEnabled);
  }, [filterData]);
  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title={getTranslationLabel('product_division')}
          data={productData}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              productFilter: [...data],
            });
          }}
          showSearch={true}
          filterData={filterData.productFilter}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={onApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={false}
      />
    </View>
  );
};

export default MappedFilter;
