import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {
  IOrderFilterProps,
  Relation,
} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import DateRange from 'components/dateRange/DateRange';
import {ValidRangeEndDate} from 'constants/dateFormat';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';
import {getStatusFilterData} from 'screens/orderTaking/OrderTaking.business';
import Accordion from 'components/accordion/Accordion';
import {getTranslationLabel} from 'utils/commonMethods';

const OrderFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
  relation,
}: IOrderFilterProps) => {
  const [statusData, setStatusData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      getStatusFilterData(setStatusData);
    }
  }, [relation]);

  const handleClearFilters = () => {
    setFilterData({
      dateFilter: [],
      statusFilters: [],
    });
    onApplyFilter();
  };

  const handleApplyFilter = () => {
    setFilterData({
      ...filterData,
      dateFilter: dateValue,
    });
    onApplyFilter();
  };

  useEffect(() => {
    const isCustomDateFilled = startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      filterData?.statusFilters?.length > 0 ||
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
        {relation === Relation.PRIMARY_CHANNEL_PARTNER && (
          <>
            <FilterCheckbox
              setFilterData={data => {
                setFilterData({
                  ...filterData,
                  statusFilters: [...data],
                });
              }}
              filterData={filterData.statusFilters}
              data={statusData}
              title={'status'}
            />
          </>
        )}
        <Accordion
          headingStyle={CommonStyles.accordionHeadingStyle}
          titleStyle={CommonStyles.accordionTitleStyle}
          isExpanded
          title={'date'}>
          <DateRange
            startDate={startDate ? startDate : dateValue?.[0]?.toString()}
            setStartDate={setStartDate}
            endDate={endDate ? endDate : dateValue?.[1]?.toString()}
            setEndDate={setEndDate}
            validRangeEndDate={ValidRangeEndDate(startDate)}
            containerStyle={CommonStyles.flexOne}
          />
        </Accordion>
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

export default OrderFilter;
