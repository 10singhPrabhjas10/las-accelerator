import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPrimarySalesFilterData} from '../PrimaryChannelPartner.business';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import {getTranslationLabel} from 'utils/commonMethods';

interface IRadioButton {
  value: string;
  label: string;
}

interface IPrimarySalesFilterProps {
  onApplyFilter: () => void;
  filterData: IPrimarySalesFilters;
  setFilterData: (data: IPrimarySalesFilters) => void;
  channelPartnerId: string;
  monthFilterRequired: boolean;
  fromRetailerPerformance?: boolean;
}

const PrimarySalesFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
  channelPartnerId,
  monthFilterRequired = true,
  fromRetailerPerformance = false,
}: IPrimarySalesFilterProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [categoryFilter, setCategoryfilter] = useState([]);
  const [monthFilter, setMonthFilter] = useState<IRadioButton[]>([
    {
      value: '',
      label: '',
    },
  ]);
  const [selectedMonthName, setSelectedMonthName] = useState('');

  const selectedMonthIndex = selectedMonthName
    ? moment().month(selectedMonthName).month()
    : -1;
  const currentYear = moment().year();
  // Start date
  const startDateRange = moment({
    year: currentYear,
    month: selectedMonthIndex,
    day: 1,
  }).format(DateFormats.YYYY_MM_DD);

  useEffect(() => {
    getPrimarySalesFilterData(
      channelPartnerId,
      setCategoryfilter,
      setMonthFilter,
      fromRetailerPerformance,
    );
  }, []);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      customDate: {
        fromDate: selectedMonthName === '' ? '' : startDateRange,
      },
      selectedMonth: selectedMonthName ?? '',
    });

    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      categoryIds: [],
      customDate: {fromDate: ''},
      selectedMonth: '',
    });
    onApplyFilter();
  };

  useEffect(() => {
    const applyButtonEnabled =
      filterData?.categoryIds?.length > 0 || selectedMonthName !== '';

    setButtonDisabled(!applyButtonEnabled);
  }, [filterData, selectedMonthName]);

  useEffect(() => {
    setSelectedMonthName(filterData?.selectedMonth ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title={getTranslationLabel('product_division')}
          data={categoryFilter}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              categoryIds: [...data],
            });
          }}
          showSearch={true}
          filterData={filterData?.categoryIds}
        />
        {monthFilterRequired && (
          <CustomRadioButton
            value={selectedMonthName ?? ''}
            onChange={value => setSelectedMonthName(value)}
            data={monthFilter ?? []}
            title={getTranslationLabel('month')}
            isVerticalButtons
            containerStyle={styles.containerStyle}
          />
        )}
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleApplyFilters={handleApplyFilter}
        handleClearFilters={handleClearFilters}
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
});

export default PrimarySalesFilter;
