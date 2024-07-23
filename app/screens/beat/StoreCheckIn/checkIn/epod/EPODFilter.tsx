import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import DateRange from 'components/dateRange/DateRange';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import {
  ValidRangeEndDate,
  ValidRangeStartDateUpToTwoYear,
} from 'constants/dateFormat';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getProductDivisionData} from './EPOD.business';

export interface IFilterData {
  dateFilter: string[] | Date[];
  productDivisionFilter: string[];
}

interface EPODFilterProps {
  onApplyFilter: () => void;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
  relationId: string;
}

const EPODFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
  relationId,
}: EPODFilterProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);
  const [productDivision, setProductDivision] = useState([]);

  useEffect(() => {
    getProductDivisionData(relationId, setProductDivision, false);
  }, [relationId]);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      dateFilter: dateValue,
    });
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      productDivisionFilter: [],
      dateFilter: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.productDivisionFilter?.length > 0 ||
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
          title="Product Division"
          data={productDivision}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              productDivisionFilter: [...data],
            });
          }}
          showSearch={true}
          filterData={filterData.productDivisionFilter}
        />
        <DateRange
          startDate={startDate ? startDate : dateValue?.[0]?.toString()}
          setStartDate={setStartDate}
          endDate={endDate ? endDate : dateValue?.[1]?.toString()}
          setEndDate={setEndDate}
          containerStyle={CommonStyles.flexOne}
          validRangeStartDate={ValidRangeStartDateUpToTwoYear}
          validRangeEndDate={ValidRangeEndDate(startDate)}
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

export default EPODFilter;
