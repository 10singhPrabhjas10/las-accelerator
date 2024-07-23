export interface DropdownItem {
  label: string;
  value: string;
}

export interface IPrimaryData {
  subType: {[key: string]: string[]};
  productCategory: DropdownItem[];
  supportType: DropdownItem[];
}

interface IProductCategory {
  categoryId: string;
  categoryName: string;
}
export interface IPrimaryDropdownResponse {
  productCategory: IProductCategory[];
  subType: {
    [key: string]: string[];
  };
  supportType: string[];
}

export interface ISecondaryData {
  subType: {[key: string]: string[]};
  productCategory: DropdownItem[];
  supportType: DropdownItem[];
  dateFilter?: DropdownItem[];
}

export interface ISecondaryDropdownResponse {
  productCategory: {
    id: number;
    categoryId: string;
    categoryName: string;
  }[];
  subType: {
    [key: string]: string[];
  };
  supportType: string[];
  dateFilter?: string[];
}

export interface IPrimaryRedressalReqBody {
  supportType: string;
  supportSubType?: string;
  productCategory?: string;
  siebelSrNo?: string;
  mobileNo?: string;
  siebelCreationDate?: string | null;
  comments: string;
  shipmentNo?: string;
  invoiceNo?: string;
  startDate?: string;
  endDate?: string;
  startDateOfLockRemoval?: string;
  typeOfLockRemoval?: string;
  reasonForLockRemoval?: string;
  orderDate?: string | null;
}

export interface IInitialValues {
  grievanceCategory: string;
  grievanceSubCategory: string;
  caseDate: string;
  productCategory: string;
  srNo: string;
  siebelDate: string;
  mobileNo: string;
  comments: string;
  shipmentNo: string;
  invoiceNo: string;
  startDate: string;
  endDate: string;
  orderNo: string;
  orderDate: string;
  startLockRemovalDate: string;
  reasonLockRemoval: string;
  typeLockRemoval: string;
}

export interface ISecondaryData {
  subType: {[key: string]: string[]};
  productCategory: DropdownItem[];
  supportType: DropdownItem[];
}

export enum TICKET {
  OPEN_TICKET = 'OPEN_TICKET',
  CLOSED_TICKET = 'CLOSED_TICKET',
}

export interface ITicketHistoryReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    type: TICKET;
    contentType: string[];
    ticketStatus: string[];
    customDate: {
      fromDate: string | Date;
      toDate: string | Date;
    };
  };
}

export interface ITicketHistoryResponse {
  id: number;
  ticketCreationDate: string;
  ticketStatus: string;
  ticketId: string;
  supportType: string;
  supportSubType: string;
  productCategory: string;
  remarks: null | string;
}

export interface ISupportTicketReqBody {
  supportType: string;
  supportSubType: string;
  productCategory?: (string | null)[];
  comments: string;
}

export interface ISurveyResponse {
  channelPartner: {
    channelFinanceCustomer: boolean;
    emailId: string;
    lastOrderDate: string;
    nameOfFirm: string;
    phoneNo: string;
  };
  surveyFilled: {responseValue: string};
}

export interface ICollectionReqBody {
  collection?: boolean;
  balanceConfirmation?: boolean;
  schemeLaunch?: boolean;
}

export interface ISecondaryAddress {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
}
