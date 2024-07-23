/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getRelatedCodesFilterData} from 'screens/primaryCP/PrimaryChannelPartner.business';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import CommonStyles from 'utils/commonStyle';
import {ICheckboxProps} from 'types/components';

const RelatedCodeFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IRelatedCodeFilterProps) => {
  const [productDivision, setProductDivision] = useState<ICheckboxProps[]>([]);
  const [relationship, setRelationship] = useState<ICheckboxProps[]>([]);
  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);

  const handleClearFilters = () => {
    setFilterData({
      productDivision: [],
      relationship: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    getRelatedCodesFilterData(setProductDivision, setRelationship);
  }, []);

  useEffect(() => {
    if (
      filterData.productDivision.length > 0 ||
      filterData.relationship.length > 0
    ) {
      setIsFilterButtonDisabled(false);
    }
  }, [filterData]);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Product Division"
          data={productDivision}
          filterData={filterData.productDivision}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              productDivision: [...data],
            });
          }}
        />
        <FilterCheckbox
          title="Relationship"
          data={relationship}
          filterData={filterData.relationship}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              relationship: [...data],
            });
          }}
          showSearch={false}
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

export default RelatedCodeFilter;
