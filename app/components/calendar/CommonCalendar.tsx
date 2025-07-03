import React, {useState} from 'react';
import {View, Text, Pressable, Modal, FlatList} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import moment from 'moment';
import {COLORS} from '../../theme/colors';
import {styles} from '../../components/calendar/CommonCalendarStyle';
import DownArrowIcon from '../../../assets/icons/arrowDown.svg';
import LeftArrowIcon from '../../../assets/icons/bold-arrow-left-.svg';
import RightArrowIcon from '../../../assets/icons/bold-right-arrow.svg';

interface CommonCalendarProps {
  markedDates: Record<string, any>;
  selectedValue: Date;
  onMonthChange: (date: Date) => void;
  calendarStyle?: any;
  onDayPress?: (date: {dateString: string}) => void;
}

const CommonCalendar: React.FC<CommonCalendarProps> = ({
  markedDates,
  selectedValue,
  onMonthChange,
  calendarStyle,
  onDayPress,
}) => {
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);

  const monthsList = Array.from({length: 12}, (_, i) =>
    moment().month(i).format('MMMM'),
  );

  const handlePressLeftArrow = () => {
    const newDate = new Date(selectedValue);
    newDate.setMonth(selectedValue.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handlePressRightArrow = () => {
    const newDate = new Date(selectedValue);
    newDate.setMonth(selectedValue.getMonth() + 1);
    onMonthChange(newDate);
  };

  const handleMonthSelect = (index: number) => {
    const newDate = new Date(selectedValue);
    newDate.setMonth(index);
    onMonthChange(newDate);
    setMonthPickerVisible(false);
  };

  // Custom header for the calendar
  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomHeader = () => (
    <View style={styles.calendarHeaderWrap}>
      <Text style={styles.calenderTitle}>
        {moment(selectedValue).format('ddd, MMM DD')}
      </Text>
      <View style={styles.divider} />
      <View style={styles.headerRow}>
        <Pressable
          style={styles.monthLabel}
          onPress={() => setMonthPickerVisible(true)}>
          <Text style={styles.monthText}>
            {moment(selectedValue).format('MMMM YYYY')}
          </Text>
          <DownArrowIcon width={10} height={10} style={styles.downArrow} />
        </Pressable>
        <View style={styles.arrowsWrap}>
          <Pressable onPress={handlePressLeftArrow} style={styles.arrowBtn}>
            <LeftArrowIcon width={18} height={18} />
          </Pressable>
          <Pressable onPress={handlePressRightArrow} style={styles.arrowBtn}>
            <RightArrowIcon width={18} height={18} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.calendarOverlay}>
      <CustomHeader />
      <Calendar
        key={CalendarUtils.getCalendarDateString(selectedValue)}
        current={CalendarUtils.getCalendarDateString(selectedValue)}
        hideArrows
        enableSwipeMonths
        markingType="custom"
        markedDates={markedDates}
        hideExtraDays={true}
        onPressArrowLeft={handlePressLeftArrow}
        onPressArrowRight={handlePressRightArrow}
        renderHeader={() => <></>}
        onDayPress={onDayPress}
        theme={{
          todayTextColor: COLORS.black,
          textDayStyle: {
            textTransform: 'capitalize',
          },
          textDayFontFamily: 'soleto_regular',
          textDayHeaderFontSize: 16,
          textSectionTitleColor: COLORS.black,
          arrowStyle: {
            padding: 0,
            marginTop: 8,
            justifyContent: 'center',
          },
        }}
        style={[styles.calendar, calendarStyle]}
      />
      <Modal
        visible={isMonthPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMonthPickerVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <FlatList
              data={monthsList}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <Pressable
                  style={styles.monthItem}
                  onPress={() => handleMonthSelect(index)}>
                  <Text style={styles.monthItemText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommonCalendar;
