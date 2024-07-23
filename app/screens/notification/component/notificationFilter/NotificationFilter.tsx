import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import CustomRange from 'components/customRange/CustomRange';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import {getNotificationType} from './NotificationFilter.business';

import {COLORS} from 'theme/colors';
import styles from './NotificationFilter.style';
import CommonStyles from 'utils/commonStyle';
import {
  convertDateToDisplay,
  getNotificationFilterDateDropDown,
} from 'utils/commonMethods';
import FieldIcon from '../../../../../assets/icons/fieldIcon.svg';
import {
  INotificationCheckboxProps,
  INotificationFilterProps,
  IRequestDateProps,
} from './NotificationFilter.interface';
import useLanguageSelection from 'hooks/useLanguageSelection';
import {DateFormats} from 'constants/dateFormat';
import FilterCheckbox from 'components/filterCheckbox/FilterCheckbox';

const NotificationFilter = ({
  filterData,
  setFilterData,
  onApplyFilter,
}: INotificationFilterProps) => {
  const [notificationType, setNotificationType] = useState<
    INotificationCheckboxProps[]
  >([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dateFilterType] = useState(getNotificationFilterDateDropDown());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [requestBodyDate, setRequestBodyDate] = useState<IRequestDateProps>({
    date: null,
  });

  useEffect(() => {
    getNotificationType(setNotificationType);
  }, []);

  const handleClearFilters = () => {
    setFilterData({
      notificationType: [],
      date: null,
    });
    onApplyFilter();
  };
  useEffect(() => {
    filterData.notificationType.length > 0 || requestBodyDate.date !== null
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  }, [filterData, requestBodyDate]);

  const handleApplyFilters = () => {
    setFilterData({
      ...filterData,
      date:
        startDate && endDate
          ? {
              from: convertDateToDisplay(
                startDate.toString(),
                DateFormats.YYYY_MM_DD,
              ),
              to: convertDateToDisplay(
                endDate.toString(),
                DateFormats.YYYY_MM_DD,
              ),
            }
          : requestBodyDate.date,
    });
    onApplyFilter();
  };

  const handleDropdown = (data: string) => {
    setStartDate('');
    setEndDate('');
    const currentDate = new Date();
    let fromDate = '';
    let toDate = '';

    switch (data) {
      case 'today':
        fromDate = toDate = convertDateToDisplay(
          currentDate.toString(),
          DateFormats.YYYY_MM_DD,
        );
        break;
      case 'yesterday':
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        fromDate = toDate = convertDateToDisplay(
          yesterday.toString(),
          DateFormats.YYYY_MM_DD,
        );
        break;
      case 'last week':
        const sevenDaysBack = new Date(currentDate);
        sevenDaysBack.setDate(currentDate.getDate() - 6);
        fromDate = convertDateToDisplay(
          sevenDaysBack.toString(),
          DateFormats.YYYY_MM_DD,
        );
        toDate = convertDateToDisplay(
          currentDate.toString(),
          DateFormats.YYYY_MM_DD,
        );
        break;
      default:
        break;
    }

    setRequestBodyDate({date: {from: fromDate, to: toDate}});
  };

  return (
    <View style={styles.container}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title={useLanguageSelection('notification_type').label}
          data={notificationType}
          filterData={filterData.notificationType}
          setFilterData={data => {
            setFilterData({
              ...filterData,
              notificationType: [...data],
            });
          }}
        />
        <CustomRange
          dateFilter={dateFilter}
          dropDownType={'dropDownType'}
          dateFilterType={dateFilterType}
          setDateFilter={data => setDateFilter(data)}
          handleDropdown={data => handleDropdown(data)}
          startDate={startDate}
          setStartDate={val => setStartDate(val)}
          endDate={endDate}
          setEndDate={val => setEndDate(val)}
          dateViewStyle={CommonStyles.dateViewStyle}
          containerStyle={CommonStyles.flexOne}
        />
        <Card style={styles.bottomCard}>
          <Card.Content>
            <View style={styles.requestCard}>
              <FieldIcon />
              <Text
                style={styles.notificationRangeText}
                theme={{colors: {onSurface: COLORS.darkBlue}}}
                variant="bodySmall">
                {useLanguageSelection('date_range_limit_notification').label}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </BottomSheetScrollView>
      <BottomSheetFooter
        handleClearFilters={handleClearFilters}
        handleApplyFilters={handleApplyFilters}
        isApplyButtonDisabled={isButtonDisabled}
        isFilterButtonDisabled={false}
      />
    </View>
  );
};

export default NotificationFilter;
