import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import {ISecondarySchemeProps} from '../../StoreCheckIn.interface';
import {COLORS} from 'theme/colors';
import {Divider} from 'react-native-paper';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getCategoryNameData, getSchemeNameList} from './SchemeLaunch.business';
import DateRange from 'components/dateRange/DateRange';
import {ValidRangeEndDate, ValidRangeStartDate} from 'constants/dateFormat';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';

const radioButtonData = [
  {value: 'Active', label: 'Active'},
  {value: 'Expired', label: 'Expired'},
];

const SchemeTypeData = [
  {id: 'all', name: 'Select All'},
  {id: 'Period Based', name: 'Period Based'},
  {id: 'Spot Based', name: 'Spot Based'},
];

const SecondarySchemeFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
  relationId,
}: ISecondarySchemeProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);

  const [schemeNameList, setSchemeNameList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      date: dateValue,
    });
    onApplyFilter();
  };

  const handleClearFilters = () => {
    setFilterData({
      schemeStatus: '',
      date: [],
      category: [],
      schemeName: [],
      schemeType: [],
    });
    onApplyFilter();
  };

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.schemeStatus?.length > 0 ||
      filterData?.category?.length > 0 ||
      filterData?.schemeName?.length > 0 ||
      filterData?.schemeType?.length > 0 ||
      isCustomDateFilled ||
      dateValue?.length > 0;

    setButtonDisabled(!applyButtonEnabled);
  }, [filterData, dateValue]);

  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      setDateValue([startDate, endDate]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getSchemeNameList(setSchemeNameList);
    getCategoryNameData(relationId, setCategoryData);
  }, []);

  useEffect(() => {
    setDateValue(filterData.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheetScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={CommonStyles.scrollViewContainer}>
        <CustomRadioButton
          value={filterData?.schemeStatus}
          onChange={val => setFilterData({...filterData, schemeStatus: val})}
          data={radioButtonData}
          title="Scheme Status"
          textStyle={styles.textStyle}
          containerStyle={styles.containerStyle}
        />
        <Divider style={CommonStyles.horizontalDivider} />
        <DateRange
          startDate={startDate ? startDate : dateValue[0]?.toString()}
          setStartDate={setStartDate}
          endDate={endDate ? endDate : dateValue[1]?.toString()}
          setEndDate={setEndDate}
          containerStyle={CommonStyles.flexOne}
          validRangeStartDate={ValidRangeStartDate}
          validRangeEndDate={ValidRangeEndDate(startDate)}
        />
        <Divider style={CommonStyles.horizontalDivider} />
        <FilterCheckbox
          setFilterData={data => {
            setFilterData({
              ...filterData,
              schemeType: [...data],
            });
          }}
          filterData={filterData?.schemeType}
          data={SchemeTypeData}
          title={'Scheme Type'}
          showSearch
        />
        <FilterCheckbox
          setFilterData={data => {
            setFilterData({
              ...filterData,
              category: [...data],
            });
          }}
          filterData={filterData?.category}
          data={categoryData}
          title={'Category'}
          showSearch
        />
        <FilterCheckbox
          setFilterData={data => {
            setFilterData({
              ...filterData,
              schemeName: [...data],
            });
          }}
          filterData={filterData?.schemeName}
          data={schemeNameList}
          title={'Scheme Name'}
          showSearch
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

const styles = StyleSheet.create({
  container: {flex: 1},
  textStyle: {
    color: COLORS.darkOrange,
    fontWeight: '500',
    fontFamily: 'soleto_medium',
  },
  dateRange: {
    flexDirection: 'row',
    paddingTop: 18,
    justifyContent: 'space-between',
    gap: 20,
  },
  textInputStyle: {
    width: 160,
  },
  containerStyle: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
});

export default SecondarySchemeFilter;
