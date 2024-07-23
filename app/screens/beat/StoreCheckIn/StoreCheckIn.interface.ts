import {SetStateAction} from 'react';

export interface IPrimaryOrderProps {
  subCategory: string;
  series: string;
  sku: string;
  quantity: string;
  uom: string;
  price: string;
  materialCode: string;
}

export interface IFilterData {
  dateFilter: string[] | Date[];
  statusFilters: string[];
}

export interface IOrderFilterProps {
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
  onApplyFilter: () => void;
  relation?: string;
}

export interface ISecondaryOrderFilterData {
  startDate: string;
  endDate: string;
}

export interface ISecondaryOrderFilterProps {
  filterData: ISecondaryOrderFilterData;
  setFilterData: (data: ISecondaryOrderFilterData) => void;
  onApplyFilter: () => void;
}

export interface IBalanceModalProps {
  setShowModal: SetStateAction<any>;
  setShowSuccessModal: SetStateAction<any>;
  headerTitle: string;
  dateLabel: string;
  onSubmit: (date: string) => void;
}

export interface ICollectionModalProps {
  isChannelFinanceCustomer?: boolean;
  setShowModal: SetStateAction<any>;
  setShowSuccessModal: SetStateAction<any>;
  onSubmit: (
    vigilPayment: string,
    vigilDate: string,
    channelDate: string,
    channelPayment: string,
  ) => void;
}

export interface IOrderCardData {
  name?: string;
  leftTitle?: string;
  leftValue?: string;
  rightTitle?: string;
  rightValue?: string;
  orderDate?: string;
}

export interface IDataItem {
  title: string;
  text: string;
}

export interface IBTLActivationCardProps {
  id: string;
  btlNo: string;
  data: IDataItem[];
}

export interface Influencer {
  influencerName: string;
  mobileNo: string;
  idType: string;
  idNo: string;
  contactType: string;
}

export interface FormValues {
  influencer: Influencer[];
}

export interface IPersonalDetails {
  retailerName: string;
  mobileNo: string;
  emailId: string;
  alternateMobileNo: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  marriageAnniversary: string;
}

export interface IInventoryCheckData {
  accSubHeader: string;
  data: {
    seriesName: string;
    skuName: string;
    qty: number;
  }[];
}

type SubCategoryData = {
  id: number;
  contentDocumentId: string;
  title: string;
  uploadedAt: string;
};

type SubCategory = {
  subCategoryId: string;
  subCategoryName: string;
  data: SubCategoryData[];
};

export type IPrimarySchemeData = SubCategory[];

type DataItem = {
  id: string;
  link?: string;
  subTitle: string;
  title: string;
};

export interface ISchemeItemData {
  categoryId: string;
  data: DataItem[];
  label: string;
}

export interface IPSchemeFilterProps {
  filterData: string[];
  setFilterData: (data: string[]) => void;
  onApplyFilter: () => void;
}

export interface IAccordionCardItem {
  id: number;
  text: string;
  title: string;
}

export interface IAccordion {
  accordionCard: IAccordionCardItem[];
  accordionHeader: string;
  category: string;
  categoryId: string;
  schemeName: string;
  secondarySchemeId: string;
}

export interface ISecondaryScheme {
  data: IAccordion[];
  header: string;
}

export interface ISchemeCardFooterBtnProps {
  title: string;
  onButtonPress: () => void;
  icon?: React.ReactNode;
}

export interface ISchemeAccordionProps {
  data: Record<string, any>;
  footerButton?: ISchemeCardFooterBtnProps[];
}

export interface ISchemeAccordionDataProps {
  accordionHeader: string;
  accordionCard: IAccordionCardItem[];
}

export interface ISchemeCardProps {
  data: IAccordionCardItem[];
  footerButton?: ISchemeCardFooterBtnProps[];
  key?: number;
}

export interface ISecondaryFilterData {
  schemeStatus: string;
  date: string[] | Date[];
  category: string[];
  schemeName: string[];
  schemeType: string[];
}

export interface ISecondarySchemeProps {
  filterData: ISecondaryFilterData;
  setFilterData: (data: ISecondaryFilterData) => void;
  onApplyFilter: () => void;
  relationId: string;
}

export interface IRaiseTicketDropdown {
  supportType: string[];
  subType: {
    [key: string]: string[];
  };
  productCategory: string[];
  status: string[];
  dateFilter: string[];
}

export enum TICKET {
  OPEN_TICKET = 'OPEN_TICKET',
  CLOSED_TICKET = 'CLOSED_TICKET',
}

export interface ITicketFilterData {
  requestFilter: string[];
  statusFilter: string[];
  dateFilter: string[] | Date[];
  dropdownType: string;
}

//
export interface IBeatPlanIdData {
  id: number;
  name: string;
  month: string;
  year: string;
  utilization: null;
  status: string;
  visitCompletePercentage: null;
  createdAt: string;
  updatedAt: string;
  district: string[];
  area: string[];
  beatplanId: string;
  beatplanCode: string | null;
  userId: string;
}

export enum StoreTab {
  SCHEDULE = 'Schedule',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  ORDER_DETAILS = 'Order Details',
}

interface IActivityResponse {
  activity: string;
  beatplanActivityId: string;
  createdAt: string;
  id: number;
  influencerType: string;
  salesOffice: string;
  updatedAt: string;
}

export interface IStoreBeatPlanItem {
  id: number;
  beatplanItemCode: string | null;
  createdAt: string;
  updatedAt: string;
  date: string;
  beatComplaient: boolean;
  visitComplaient: boolean;
  isComplaient: boolean;
  status: string;
  recurrencePattern: string;
  recurrenceOn: string;
  recurrenceEndDate: string;
  checkInDate: string;
  checkOutDate: string | null;
  relationId: string;
  relation: string | Relation;
  beatplanItemId: string;
  beatplanId: string;
  assignedTo: string;
  name: string;
  email: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  area: string;
  geoLocation: string | null;
  creatorId: string;
  relationship: string;
  firmName: string;
  userLatitude: number;
  userLongitude: number;
  orderTaken: number;
  orderValue: number;
  title?: string;
  subTitle?: string;
  address?: string;
  activity?: IActivityResponse;
  subActivity?: string;
  beatPlanItemId: string;
  leadType: string;
}

export enum Relation {
  PRIMARY_CHANNEL_PARTNER = 'Primary Channel Partner',
  SECONDARY_CHANNEL_PARTNER = 'Secondary Channel Partner',
  LEAD = 'Lead',
  ACTIVITY = 'Activity',
  PRIMARY_LEAD = 'Channel',
  SECONDARY_LEAD = 'Channel Indirect',
}

export interface ICheckInRequestBody {
  checkInDate: string;
  userLatitude: number;
  userLongitude: number;
}

export interface ICheckOutRequestBody {
  checkOutDate: string;
}

interface ICoordinates {
  speed: number;
  heading: number;
  altitude: number;
  accuracy: number;
  longitude: number;
  latitude: number;
}

interface IExtras {
  meanCn0: number;
  maxCn0: number;
  satellites: number;
}

export interface ILocationValues {
  mocked: boolean;
  timestamp: number;
  extras: IExtras;
  coords: ICoordinates;
}
