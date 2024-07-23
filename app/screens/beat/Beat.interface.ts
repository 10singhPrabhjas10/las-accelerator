interface ISelectedDay {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface IDateObject {
  selected: boolean;
  selectedColor: string;
}

export interface IAreaPincodeDropdownData {
  id: number;
  attributes: {
    areaMasterId: string;
    createdAt: string;
    updatedAt: string;
    pincode: string;
    district: string;
    state: string;
    area: string;
    country: string;
    displayName?: string;
    externalId?: string;
    name?: string;
    salesOffice: string;
    zone: string;
  };
}

export interface IAreaMapping {
  value: string;
  label: string;
}

export interface IChannelPartnerRequest {
  area: string[];
  type: string;
}

export interface IChannelPartnersResponse {
  id: number;
  nameOfFirm: string;
  contactPerson: string;
  phoneNo: string;
  alternatePhoneNo: string;
  code: string;
  emailId: string;
  pincode: string;
  area: string;
  district: string;
  state: string;
  salesOffice: string;
  doorNoOrPremises: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  addressLine3: string | null;
  securityDeposit: number | null;
  blockCustomer: boolean;
  customerBlockReason: string | null;
  creditLimitByVGIL: number | null;
  noOfDeliveryVehicle: number | null;
  channelPartnerCode: string;
  dmsStatus: boolean;
  dmsAgreeToUse: boolean;
  dmsLastSyncDate: string | null;
  dmsAccuracy: number | null;
  dmsLockStatus: boolean;
  relationship: string | null;
  address: string | null;
  gstin: string | null;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  retailerId: number | null;
  recordTypeId: number | null;
  lastVisitDate?: string;
  lastOrderDate?: string;
  noOfVisit?: number;
  recurrencePattern?: string;
  channelPartnerId: string;
}

interface IDataCard {
  title: string;
  text: string;
}

export interface IFormatedChannelPartnerData {
  id: string;
  name: string;
  data: IDataCard[];
  code: string;
  isChecked?: boolean;
  relation?: string;
  isFlag?: boolean;
  status?: string;
  beatplanItemId?: string;

  //
  relationShip: string;
  lastVisitDate: string;
  lastOrderDate: string;
  recurrence: string;
  leadId: string;
  noOfVisit: number;
}

export interface IGetBeatPlanItemResponse {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  area: string;
  assignedTo: string;
  beatComplaient: boolean;
  beatplanId: string;
  beatplanItemCode: string | null;
  beatplanItemId: string;
  checkInDate: string | null;
  checkOutDate: string | null;
  createdAt: string;
  creatorId: string;
  date: string;
  email: string;
  geoLocation: string | null;
  id: number;
  isComplaient: boolean;
  mobileNumber: string;
  name: string;
  recurrenceEndDate: string;
  recurrenceOn: string;
  recurrencePattern: string;
  relation: string;
  relationId: string;
  status: string;
  updatedAt: string;
  visitComplaient: boolean;
}

interface IItemReq {
  date: string;
  relationId?: string;
  relation: string;
  recurrencePattern?: string;
  recurrenceOn?: string;
  recurrenceEndDate?: string;
  beatItemPincodes: string[];
  beatItemAreas: string[] | string;
  activity?: string;
  influencerType?: string | null;
  salesOffice?: string;
}

export interface ISubmitBeatPlanItemRequest {
  beatplanId: string;
  relation: string;
  items?: IItemReq[];
  deletedItems?: any[];
}

export interface IGetBeatPlanIdRequest {
  name: string;
  month: string;
  year: string;
}

export interface IOptionData {
  code: string;
  data: IAreaMapping[][]; // Adjust this type according to the actual structure of the 'data' property
  dateString: string[];
  endDate: Date;
  id: number;
  isChecked: boolean;
  isFlag: boolean;
  name: string;
  recurrenceOn: string;
  recurrencePattern: string;
  relation: string;
  beatplanItemId: string;
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

export interface IBeatPlanItemData {
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
  relation: string;
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
  userLongitude: number;
  userLatitude: number;
  leadType: string;

  title?: string;
  subTitle?: string;
  address?: string;
  activity?: IActivityResponse;
  latitude: number;
  longitude: number;
}

export interface IItemBody {
  date: string;
  relationId: string;
  relation: string;
  recurrencePattern?: string;
  recurrenceOn?: string;
  recurrenceEndDate?: string;
  beatItemPincodes: string[];
  beatItemAreas: string[];
}

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
  comment: string;
}

export const Status = {
  DRAFT: 'Draft',
  SENT_FOR_APPROVAL: 'Sent for approval',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export enum BeatRelationType {
  PRIMARY = 'Primary Channel Partner',
  SECONDARY = 'Secondary Channel Partner',
  LEAD = 'Lead',
  ACTIVITY = 'Activity',
}

export interface IActivityData {
  districtPinCode: string;
  activity: string;
  influencer: string;
  area: string;
  salesOffice: string;
}

export interface IAreaData {
  value: string;
  label: string;
}

export interface IBeatPreConditionsData {
  condition: string;
  month: string;
  date: string;
}

export interface IRecurrenceData {
  beatplanId: string;
  month?: string;
  date?: string;
  comment: string;
  deviationType?: string;
}

export interface IDeviationRequestBody {
  data: IRecurrenceData[];
}

export interface ILeadsResponse {
  addressLine1: string;
  addressLine2: string;
  area: string;
  beatplanItemId?: string | null;
  businessName: string;
  categoryId: string;
  city: string;
  contactPersonName: string;
  createdAt: string;
  district: string;
  emailId: string;
  firmName: string | null;
  gstIn: string | null;
  id: number;
  isChecked: boolean;
  landMark: string;
  leadCode: string;
  leadId: string;
  mobileNumber: string;
  panCardNumber: string | null;
  pincode: string;
  publishedAt: string;
  recordType: {
    developerName: string;
    name: string;
  } | null;
  recurrence?: string | null;
  relation?: string | null;
  retailerAlternativeMobileNumber: string;
  retailerId: string;
  retailerMobileNumber: string;
  retailerOwnerName: string;
  salesBranch: string;
  state: string;
  status: string;
  updatedAt: string;
  lastVisitDate: string;
  lastOrderDate: string;
  noOfVisit: number;
}

export enum LeadType {
  CHANNEL = 'Channel',
  CHANNEL_INDIRECT = 'Channel Indirect',
}
