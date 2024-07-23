import moment from 'moment';
import {ValidRangeType} from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export enum DateFormats {
  DD_MM_YYYY = 'DD-MM-YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  DD_MMM_YYYY = 'DD MMM YYYY',
  DDD_MMM_D = 'ddd, MMM D',
  DD_MM_YYYY_ = 'DD/MM/YYYY',
  Do_MMMM_YYYY = 'Do MMMM YYYY',
  Do_MMM_YYYY = 'Do MMM YYYY',
  DD_MMM_YY = 'DD MMM YY',
  DD_MMM_YY_2 = "DD MMM' YY",
  DD_MM_YYYY_2 = 'DD.MM.YYYY',
  DD_MMM1_YYYY = "DD MMM' YYYY",
  MMM = 'MMM',
  YYYY = 'YYYY',
  DD_MM_YYYY_HH_MM_A = 'DD/MM/YYYY, hh:mm A',
  DD_MMM_YYYY_2 = 'DD-MMM-YYYY',
  DD_MMM = 'DD MMM',
  H_MM_A = 'h:mm A',
  Do_MMMM = 'Do MMMM',
}

export const CURRENT_DATE = new Date();

export const ONE_YEAR_AGO = new Date(
  CURRENT_DATE.getFullYear() - 1,
  CURRENT_DATE.getMonth(),
  CURRENT_DATE.getDate(),
);

export const TWO_YEAR_AGO = new Date(
  CURRENT_DATE.getFullYear() - 2,
  CURRENT_DATE.getMonth(),
  CURRENT_DATE.getDate(),
);

export const ValidRangeStartDateUpToTwoYear = {
  startDate: TWO_YEAR_AGO,
  endDate: CURRENT_DATE,
};

export const ValidRangeStartDate = {
  startDate: ONE_YEAR_AGO, // Start date
  endDate: CURRENT_DATE, // End date
};

export const ValidRangeEndDate = (startDate: Date | string) => ({
  startDate: new Date(startDate), // Start date
  endDate: CURRENT_DATE, // End date
});

// Function to calculate valid range end date (up to 3 months from the selected start date or the current date)
export const validEndDateRangeUptoThreeMonths = (
  selectedStartDate: Date,
): ValidRangeType => {
  const currentDate = new Date();
  const endDate = new Date(selectedStartDate);

  // Calculate the end date based on selected start date
  endDate.setMonth(selectedStartDate.getMonth() + 3);

  // Check if the end date exceeds the current date
  if (endDate > currentDate) {
    // If it does, set the end date to the current date
    endDate.setTime(currentDate.getTime());
  }

  return {
    startDate: selectedStartDate, // Start date in ISO string format
    endDate: endDate, // End date in ISO string format
  };
};

export const getLastWeekRange = () => {
  const lastWeekStartDate = new Date();
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
  return [lastWeekStartDate, new Date()];
};

export const getCurrentMonthRange = () => {
  return [
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 1),
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() + 1, 0),
  ];
};

export const getLastMonthRange = () => {
  return [
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() - 1, 1),
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 0),
  ];
};

export const getLastQuarterRange = () => {
  return [
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() - 3, 1),
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 0),
  ];
};

export const getLastSixMonthsRange = () => {
  return [
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() - 6, 1),
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 0),
  ];
};

export const getCurrentFinancialYearRange = () => {
  const financialYearStartMonth = 3; // April (0-indexed)
  let financialYearStartYear = CURRENT_DATE.getFullYear();
  if (CURRENT_DATE.getMonth() < financialYearStartMonth) {
    financialYearStartYear--; // If the current month is before April, the financial year ends in the previous year
  }
  const financialYearStartDate = new Date(
    financialYearStartYear,
    financialYearStartMonth,
    1,
  );

  return [financialYearStartDate, CURRENT_DATE];
};

export const getLastFinancialYearRange = () => {
  const currentYear = CURRENT_DATE.getFullYear();
  const financialYearStartMonth = 3; // April (0-indexed)
  let lastFinancialYearStartYear = currentYear - 1;
  if (CURRENT_DATE.getMonth() < financialYearStartMonth) {
    lastFinancialYearStartYear--; // If the current month is before April, the last financial year starts in the year before the current year
  }
  const lastFinancialYearStartDate = new Date(
    lastFinancialYearStartYear,
    financialYearStartMonth,
    1,
  );
  const lastFinancialYearEndDate = new Date(
    currentYear,
    financialYearStartMonth,
    0,
  );

  return [lastFinancialYearStartDate, lastFinancialYearEndDate];
};

export const convertDateFormat = (dateStr: string) => {
  // Parse input date string using Moment.js and format it
  return moment(dateStr, DateFormats.YYYY_MM_DD).format(
    DateFormats.DD_MMM1_YYYY,
  );
};

export const ACCOUNT_STATEMENT_DATE_FILTERS = [
  {label: 'Current Month', value: 'Current Month'},
  {label: 'Last Month', value: 'Last Month'},
  {label: 'Last 3 Month', value: 'Last 3 Month'},
  {label: 'Last 6 Month', value: 'Last 6 Month'},
  {label: 'Current Financial Year', value: 'Current Financial Year'},
  {label: 'Last Financial Year', value: 'Last Financial Year'},
  {label: 'Custom Range', value: 'Custom Range'},
];
