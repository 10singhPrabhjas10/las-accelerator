import {SetStateAction} from 'react';

export interface IAccountOutstandingFilter {
  categoryIds: ICheckboxProps[];
  filterData: IAccountOutstandingFilterProps;
  setFilterData: (data: IAccountOutstandingFilterProps) => void;
  onApplyFilter: () => void;
}

export interface IAccountOutstandingFilterProps {
  categoryIds: string[];
}

export interface IAccountStatementFilter {
  periodFilters: ICheckboxProps[];
  setPeriodFilters: SetStateAction<any>;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export interface ICheckboxProps {
  id: string;
  name: string;
}

export interface IAccountOutstandingSapResponse {
  KUNNR: string[]; //Customer Code
  UMSKZ: string[]; //
  PROD_DESC: string[]; //Product Division
  BELNR: string[]; //Doc. No.
  BUDAT: string[]; //Date
  XBLNR: string[]; //
  BLART: string[]; //Doc. Type
  SHKZG: string[]; //Debit/Credit
  DMBTR: string[]; //Amount
  VBELN: string[]; //Invoice  No.
  ZDUEDT: string[]; //Due Date
  ZODDS: string[]; //Days Overdue
  DMBTRO: string[]; //
}

export interface IAccountOutstandingBankGuaranteeDataResponse {
  DMBTR: string[];
  ZFBDT: string[];
}

export interface IAccountOutstandingHeaderDataResponse {
  KLIMK: string[];
  DBPAY: string[];
  SANCTIONED_LIMIT: string[];
  DMBTR_SD: string[];
  TOTAL_OUTSTANDING: string[];
  ODI: string[];
  EV_CREDIT: string[];
}

export interface IAccountOutstandingListData {
  date: string;
  category: string;
  overdueDays: number;
  amount: number;
  data: IDataCard[];
}

export interface IPieChartProps {
  label: string;
  value: number;
}

export interface IVgilCreditLimitProps {
  totalCreditLimit: number;
  utilizedCreditLimit: number;
  availableCreditLimit: number;
  pei: number;
}

export interface IDepositDetailsProps {
  data: IDataCard[];
}

export interface IOutstandingData {
  pieChartData: IPieChartProps[];
  totalOutstanding: number;
  maxOverdueDays: number;
}

export interface IAccountStatementItemProps {
  Kunnr: string[];
  Bldat: string[];
  Belnr: string[];
  Blart: string[];
  Xblnr: string[];
  Purpose: string[];
  Shkzg: string[];
  ShkzgD: string[];
  Balance: string[];
  BalType: string[];
  Particular: string[];
}

export interface IAccountStatementOdiProps {
  KUNNR: string[];
  MONTH: string[];
  BELNR: string[];
  BUDAT: string[];
  ZFBDT: string[];
  DMBTR: string[];
  INT_BASAMT: string[];
  FROMDATE: string[];
  TODATE: string[];
  DAYS: string[];
  INTEREST: string[];
  DEBIT: string[];
  CREDIT: string[];
  CR_AMT: string[];
  CR_DATE: string[];
  DOCTYPE: string[];
}

export interface IAccountStatementProps {
  Name: string[];
  Address: string[];
  City: string[];
  Pincode: string[];
  State: string[];
  Gstin: string[];
  Pan: string[];
  Mobile: string[];
  Person: string[];
  Email: string[];
  SecDeposit: string[];
  BankGrntee: string[];
  ClBalance: string[];
  StmtLitems: {item: IAccountStatementItemProps[]}[];
  StmtAnnex: {item: IAccountStatementOdiProps[]}[];
  StmtAnnex1: {item: IAccountStatementOdiProps[]}[];
}

export interface IAccountStatementTransactionProps {
  date: string;
  documentNumber: string;
  documentType: string;
  invoiceNumber: string;
  particulars: string;
  debit: string;
  credit: string;
  balance: string;
}

export interface IAccountStatementCustomerDetails {
  name: string;
  address: string;
  city: string;
  pinCode: string;
  state: string;
  GSTIN: string;
  PAN: string;
  mobile: string;
}

export interface IAccountStatementSummary {
  securityDeposit: string;
  bankGuarantee: string;
  closingBalance: string;
  contact: string;
  email: string;
}

export interface IAccountStatementPeriod {
  startDate: string;
  endDate: string;
}

export interface IAccountStatementData {
  customerDetails: IAccountStatementCustomerDetails;
  accountSummary: IAccountStatementSummary;
  transactions: IAccountStatementTransactionProps[];
  statementPeriod: IAccountStatementPeriod;
  odiChargedData: IAccountOdiChargedData[];
  totalOdi: number;
  odiWaivedData: IAccountOdiWaivedData[];
  totalInterestWaived: number;
}

export interface IAccountOdiChargedData {
  docType: string;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  invoiceAmount: string;
  baseAmount: string;
  from: string;
  to: string;
  days: string;
  interestGST: string;
  debitNoteNo: string;
}

export interface IAccountOdiWaivedData {
  invoiceNo: string;
  debitNoteDate: string;
  debitNoteNo: string;
  debitNoteAmount: string;
  creditNote: string;
  creditNoteAmount: string;
  creditNoteDate: string;
}

export interface IAccountOutstandingTransactionProps {
  date: string;
  documentNumber: string;
  invoiceNumber: string;
  productName: string;
  documentType: string;
  amount: string;
  drCr: string;
  dueDate: string;
  overdueDays: string;
}

export interface IChannelFinanceData {
  totalChannelFinal: string;
  channelFinanceOverdue: string;
  bankName: string;
  utilized: string;
  available: string;
  channelFinanceOutstanding: string;
  maxOutstandingDays: string;
  dueIn0To7Days: string;
  dueIn8To15Days: string;
  dueIn16To29Days: string;
  dueIn30To59Days: string;
  dueAfter60Days: string;
  channelPartnerId: string;
  createdAt: string;
  updatedAt: string;
}
