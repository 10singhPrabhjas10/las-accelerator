import React, {useState} from 'react';
import {View} from 'react-native';

import Layout from 'components/Layout';
import CustomButton from 'components/button/CustomButton';
import DropDown from 'components/dropdown/Dropdown';
import DateRange from 'components/dateRange/DateRange';
import Spacer from 'components/spacer';
import {getAccountStatementData} from '../FinancialInformation.business';

import CommonStyles from 'utils/commonStyle';
import {ButtonTypes} from 'types/buttons';
import {
  ACCOUNT_STATEMENT_DATE_FILTERS,
  DateFormats,
  ValidRangeEndDate,
  ValidRangeStartDate,
  getCurrentFinancialYearRange,
  getCurrentMonthRange,
  getLastFinancialYearRange,
  getLastMonthRange,
  getLastQuarterRange,
  getLastSixMonthsRange,
} from 'constants/dateFormat';
import DownloadIcon from './../../../../../assets/icons/downloadIcon.svg';
import {convertDateToDisplay} from 'utils/commonMethods';

const AccountStatement = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dateValue, setDateValue] = useState<string[] | Date[]>([]);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const CustomRange = dateFilter === 'Custom Range';

  const handleDownloadPdf = () => {
    getAccountStatementData(
      convertDateToDisplay(
        CustomRange ? startDate : dateValue[0],
        DateFormats.YYYY_MM_DD,
      ),
      convertDateToDisplay(
        CustomRange ? endDate : dateValue[1],
        DateFormats.YYYY_MM_DD,
      ),
    );
  };

  const handleDropdown = (data: string) => {
    switch (data) {
      case 'Current Month':
        return setDateValue(getCurrentMonthRange());
      case 'Last Month':
        return setDateValue(getLastMonthRange());
      case 'Last 3 Month':
        return setDateValue(getLastQuarterRange());
      case 'Last 6 Month':
        return setDateValue(getLastSixMonthsRange());
      case 'Current Financial Year':
        return setDateValue(getCurrentFinancialYearRange());
      case 'Last Financial Year':
        return setDateValue(getLastFinancialYearRange());
      default:
        return setDateValue([]);
    }
  };

  return (
    <Layout headerTitle="Account Statement" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DropDown
          value={dateFilter}
          multiSelect={false}
          list={ACCOUNT_STATEMENT_DATE_FILTERS}
          label="Select Period"
          placeholder="Select Date"
          visible={showDateDropdown}
          onChangeDropdownState={() => {
            setShowDateDropdown(!showDateDropdown);
          }}
          setValue={data => {
            setDateFilter(data);
            handleDropdown(data);
          }}
        />
        <Spacer size={15} />
        {CustomRange && (
          <DateRange
            startDate={startDate ?? dateValue?.[0]?.toString()}
            setStartDate={setStartDate}
            endDate={endDate ?? dateValue?.[1].toString()}
            setEndDate={setEndDate}
            validRangeStartDate={ValidRangeStartDate}
            validRangeEndDate={ValidRangeEndDate(startDate)}
            containerStyle={CommonStyles.flexOne}
          />
        )}
      </View>
      <CustomButton
        type={ButtonTypes.outline}
        text="Download Account Statement"
        icon={<DownloadIcon />}
        isDisabled={
          !dateFilter ||
          (CustomRange
            ? !startDate || !endDate
            : !(dateValue[0] && dateValue[1]))
        }
        onPress={handleDownloadPdf}
      />
    </Layout>
  );
};

export default AccountStatement;
