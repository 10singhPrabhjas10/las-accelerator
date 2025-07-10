import {View} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {CATEGORY_FILTER} from 'utils/Constants';
import {COLORS} from '@/theme/colors';
import SearchInput from '@/components/searchInput';

export interface IFilterData {
  leadTypeFilter: string[];
  categoryFilter: string[];
}

interface IExisitingExpenseFilterProps {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

const AddedLeadsFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: IExisitingExpenseFilterProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [categoryData, setCategoryData] = useState<
    {id: string; name: string}[]
  >([]);
  const [leadTypeData] = useState([
    {id: 'all', name: 'Select All'},
    {id: 'consumer', name: 'Consumer'},
    {id: 'institutional', name: 'Institutional'},
  ]);

  const handleApplyFilter = () => {
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      leadTypeFilter: [],
      categoryFilter: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    setCategoryData(CATEGORY_FILTER);
  }, []);

  useEffect(() => {
    const applyButtonEnabled =
      filterData?.categoryFilter?.length > 0 ||
      filterData?.leadTypeFilter?.length > 0;
    setButtonDisabled(!applyButtonEnabled);
  }, [filterData]);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title="Category"
          data={categoryData}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              categoryFilter: [...data],
            });
          }}
          showSearch={true}
          searchPlaceholder="Search Category"
          filterData={filterData.categoryFilter}
        />
        <FilterCheckbox
          title="Lead Type"
          data={leadTypeData}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              leadTypeFilter: [...data],
            });
          }}
          showSearch={false}
          filterData={filterData.leadTypeFilter}
        />
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={handleApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={buttonDisabled}
        leftTextStyle={{color: COLORS.dgreen}}
        leftButtonStyle={{borderColor: COLORS.dgreen}}
      />
    </View>
  );
};

export default AddedLeadsFilter;
