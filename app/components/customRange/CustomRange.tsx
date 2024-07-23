import {View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import Accordion from 'components/accordion/Accordion';
import DropDown from 'components/dropdown/Dropdown';
import styles from './CustomRange.style';
import DateRange from 'components/dateRange/DateRange';
import {getTranslationLabel} from 'utils/commonMethods';

type Dropdown = {
  label: string;
  value: string;
};

type ValidRange = {
  startDate?: Date;
  endDate?: Date;
};

export interface ICustomRangeProps {
  dateFilter: string;
  dropDownType?: string;
  dateFilterType: Dropdown[];
  setDateFilter: (val: string) => void;
  handleDropdown: (val: string) => void;
  startDate: string | Date;
  setStartDate: (val: string) => void;
  endDate: string | Date;
  setEndDate: (val: string) => void;
  validRangeStartDate?: ValidRange;
  validRangeEndDate?: ValidRange;
  showDropdown?: boolean;
  containerStyle?: ViewStyle;
  dateViewStyle?: ViewStyle;
}

const CustomRange = ({
  dateFilter,
  dropDownType,
  dateFilterType,
  setDateFilter,
  handleDropdown,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validRangeStartDate,
  validRangeEndDate,
  showDropdown,
  containerStyle,
  dateViewStyle,
}: ICustomRangeProps) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  return (
    <Accordion
      headingStyle={styles.accordionHeadingStyle}
      titleStyle={styles.accordionTitleStyle}
      isExpanded
      title="Date">
      {!showDropdown && (
        <View style={styles.dropdown}>
          <DropDown
            value={dateFilter === '' ? dropDownType : dateFilter}
            multiSelect={false}
            list={dateFilterType ?? []}
            label=""
            placeholder={getTranslationLabel('select_date')}
            visible={showDateDropdown}
            onChangeDropdownState={() => {
              setShowDateDropdown(!showDateDropdown);
            }}
            setValue={data => {
              setDateFilter(data);
              handleDropdown(data);
            }}
          />
        </View>
      )}
      {(dateFilter === 'Custom Range' || showDropdown) && (
        <DateRange
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          validRangeStartDate={validRangeStartDate}
          validRangeEndDate={validRangeEndDate}
          containerStyle={containerStyle}
          dateViewStyle={dateViewStyle}
        />
      )}
    </Accordion>
  );
};

export default CustomRange;
