export const HELP_SUPPORT_NUMBER = '+91 ';
export const HELP_SUPPORT_MAIL = 'info@a bc.com';

// export const INDIAN_MOBILE_REGEX = /^[6-9][0-9]{9}$/;
export const DL_NO_REGEX = /^[A-Z]{2}\d{2}\d{11}$/;
export const AADHAR_REGEX =
  /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}s[0-9]{4}s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
export const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const PAN_NO_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const IFSC_REGEX = /^[A-Z]{4}[0]{1}[A-Z0-9]{6}$/;
export const YOUTUBE_LINK_REGEX =
  /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/;

export const LANGUAGES = [
  {
    id: 'en',
    icon: require('../../assets/images/englishFont.png'),
    title: 'English',
  },
  {
    id: 'hi',
    icon: require('../../assets/images/hindiFont.png'),
    title: 'हिंदी',
  },
  {
    id: 'mr',
    icon: require('../../assets/images/hindiFont.png'),
    title: 'मराठी',
  },
  {
    id: 'te',
    icon: require('../../assets/images/teluguFont.png'),
    title: 'తెలుగు',
  },
  {
    id: 'bn',
    icon: require('../../assets/images/bengaliFont.png'),
    title: 'বাংলা',
  },
  {
    id: 'ma',
    icon: require('../../assets/images/malayalamFont.png'),
    title: 'മലയാളം',
  },
  {
    id: 'ka',
    icon: require('../../assets/images/kannadaFont.png'),
    title: 'ಕನ್ನಡ',
  },
  {
    id: 'ta',
    icon: require('../../assets/images/tamilFont.png'),
    title: 'தமிழ்',
  },
  {
    id: '', //dummy item to manage FlatList
    icon: '',
    title: '',
  },
];

export enum ProfileActionItem {
  ORDER_TAKING = 'Order Taking',
  PROFILE_DETAILS = 'Profile Details',
  PRODUCT_MAPPING = 'Product Mapping',
  FINANCIAL_INFO = 'Financial Information',
  ORDER_MANAGEMENT = 'Order Management',
  PRIMARY_SALES = 'Primary Sales',
  SECONDARY_SALES = 'Secondary Sales',
  PRIMARY_SCHEMES = 'Primary Schemes',
  SECONDARY_SCHEMES = 'Secondary Schemes',
  INVENTORY_VIEW = 'Inventory View',
  MAPPED_RETAILER = 'Mapped Retailer',
  GRIEVANCE_REDRESSAL = 'Grievance Redressal',
  BTL = 'BTL',
  SE_PIC = 'Customer: SE- PIC',
}

export enum AttendanceOptions {
  CHECK_IN_CHECK_OUT = 'Check-In & Check-Out',
  APPLY_REGULARISATION = 'Apply Regularisation',
  APPLY_LEAVES = 'Apply Leaves',
}

export const dayOfWeekStringToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
export enum LeadType {
  DIRECT_DEALER = 'Direct Dealer',
  DISTRIBUTER = 'Distributer',
}

export const EMPTY_DATA_DASH = '--';
export const ID_ALL = 'all';

export enum PAGE_SIZE {
  RelatedCodes = 10,
  OrderHistory = 10,
  MappedRetailer = 10,
  InvoiceSelection = 10,
}

export const ACCOUNT_DOCUMENT_TYPES: Record<string, string> = {
  RV1: 'Billing doc',
  RV2: 'Cancellation of billing doc',
  CA: 'Customer advance',
  CD: 'Cash discounts',
  CL: 'Clearing of customers',
  DA: 'Reversal document type',
  DC: 'Customer invoice',
  DG: 'Credit notes',
  DR: 'Customer Debit Note',
  DZ: 'Receipt from Customers',
  FR: 'Freepay CD only',
  IC: 'ODI charged-old',
  ID: 'ODI charged-new',
  IE: 'ODI waived',
  SA1: 'Vendor to customer',
  SA2: 'Customer to customer',
};

export const ACCOUNT_OUTSTANDING_TYPES: Record<string, string> = {
  H: 'Credit',
  S: 'Debit',
};

export const martialStatus = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'Married',
    value: 'married',
  },
];

export enum NavigationFrom {
  STORE_CHECKIN = 'Store Check In',
  PRIMARY_CP = 'Primary CP',
  SECONDARY_CP = 'Secondary CP',
}

export const MODE_OF_TRANSPORT = [
  {
    label: 'Own Two/Four Wheeler',
    value: 'Own Vehicle',
  },
  {
    label: 'Bus',
    value: 'Local Travel',
  },
  {
    label: 'Train',
    value: 'Outstation Travel',
  },
];

export const PROOF_TYPE = [
  {
    label: 'Food Bill',
    value: 'food bill',
  },
  {
    label: 'Hotel Bill',
    value: 'hotel bill',
  },
  {
    label: 'Both',
    value: 'both',
  },
];

export const CITY_LIST = [
  {
    label: 'Mumbai',
    value: 'mumbai',
  },
  {
    label: 'Bangalore',
    value: 'bangalore',
  },
  {
    label: 'Pune',
    value: 'pune',
  },
];

export const EXPENSE_TYPE = [
  {
    label: 'Travel Allowance',
    value: 'TA',
  },
  {
    label: 'Lodging Allowance',
    value: 'LA',
  },
  {
    label: 'Others',
    value: 'other',
  },
];

export const EXPENSE_STATUS = [
  {
    id: ID_ALL,
    name: 'Select All',
  },
  {
    id: 'Draft',
    name: 'Draft',
  },
  {
    id: 'Submitted',
    name: 'Submitted',
  },
  {
    id: 'Approved',
    name: 'Approved',
  },
  {
    id: 'Rejected',
    name: 'Rejected',
  },
];
export const CUSTOM_RANGE = 'Custom Range';

export const DropDownData = [
  {label: 'January', value: 'January'},
  {label: 'February', value: 'February'},
  {label: 'March', value: 'March'},
  {label: 'April', value: 'April'},
  {label: 'May', value: 'May'},
  {label: 'June', value: 'June'},
  {label: 'July', value: 'July'},
  {label: 'August', value: 'August'},
  {label: 'September', value: 'September'},
  {label: 'October', value: 'October'},
  {label: 'November', value: 'November'},
  {label: 'December', value: 'December'},
  {label: 'Custom Range', value: 'Custom Range'},
];

export const webViewURL = 'https://www.abc.in/';

export enum SECONDARY_SALES_TYPE {
  MTD = 'MTD',
  YTD = 'YTD',
}

export const DummyMobile = '+91 9876567890';

export const CurrencyCode = '₹';
export const dot = '•';
