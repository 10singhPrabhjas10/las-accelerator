export enum SchemeStatus {
  ACTIVE = 'Scheme active',
  END_DATE_COMPLETED = 'End date completed',
  AGGREGATION_CONFIRMED = 'Aggregation confirmed scheme',
}

export enum NavigationFrom {
  SCHEME_INFORMATION = 'Scheme Information',
  SCHEME_PERFORMANCE = 'Scheme Performance',
}

export interface ISecondarySchemeReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    schemeStatus: string;
    customDate?: {
      fromDate: string;
      toDate: string;
    };
    schemeNameIds?: string[];
    categoryIds?: string[];
  };
}

export interface ISecondarySchemeResponse {
  endDate: string;
  id: number;
  name: string;
  schemeDescription: string;
  schemeType: string;
  secondarySchemeId: string;
  targetActivationDate: string;
}

export interface ISecondarySchemeTransformed {
  schemeName: string;
  id: string;
  schemeId: string;
  data: [{title: string; text: string}];
}

export interface ISchemeDetailsResponse {
  beneficiaryType: string;
  categoryId: string;
  endDate: string;
  id: number;
  name: string;
  schemeDescription: string;
  schemeType: string;
  secondarySchemeId: string;
  slabNumber: string;
  targetActivationDate: string;
  categoryName: string;
}

export interface ITransformedSchemeDetails {
  schemeName: string;
  id: string;
  schemeId: string;
  categoryId: string;
  data: [{title: string; text: string}];
}

export interface ISchemeSlabDetailsResponse {
  description: string;
  rewardType: string;
  slabThresholdFrom: number;
  slabThresholdTo: number;
}

export interface ITransformedSlabDetails {
  id: number;
  data: [{title: string; text: string}];
}

export interface IRetailerSearchResponse {
  channelPartnerId: string;
  customerMobile: string;
  nameOfFirm: string;
}

export interface IRetailerDetailsResponse {
  address: string;
  contactPerson: string;
  customerMobile: string;
  nameOfFirm: string;
  retailerCode: string;
}

export interface ITransformedRetailer {
  header: string;
  data: [{title: string; text: string}];
}

interface ISlabDetails {
  schemeId: string;
  slabFrom: number;
  slabNumber: number;
  slabTo: number;
  rewardDetails: string;
  noOfRetailers: number;
  qualifiedInvoices: number;
  rewardType: string;
  rewardUnit: number;
  salesValue: number;
  salesVolume: number;
  scheme: string;
  rewardValue: number;
}
export interface ISchemeRewardsResponse {
  rewards: {
    FOC: number;
    Gold: number;
    'Abs. discount': number;
    Tour: number;
    Gift: number;
  };
  slabDetails: ISlabDetails[];
}

export interface IRewardQualification {
  description: string;
  noOfRetailers: number;
  qualifiedInvoices: number;
  rewardType: string;
  rewardUnit: number;
  salesValue: number;
  salesVolume: number;
  scheme: string;
  schemeRewardValue: number;
  slabThresholdFrom: number;
  slabThresholdTo: number;
}

export interface ITransformedRewards {
  rewards: {
    foc: string;
    gold: string;
    creditNotes: string;
    tour: string;
    gift: string;
  };
  slabDetails: {
    header: string;
    schemeId: string;
    slabFrom: number;
    slabTo: number;
    data: [{title: string; text: string}];
    isChecked: boolean;
  }[];
}

export interface ITransformedQualification {
  schemeId: string;
  slabFrom: number;
  slabTo: number;
  data: [{title: string; text: string}];
}

export interface IRetailerEligibilityPerformance {
  currentSlabNumber: string;
  description: string;
  exceptionSlabNumber: number;
  nameOfFirm: string;
  retailerCode: string;
  rewardType: string;
  rewardUnit: number;
  salesValue: number;
  salesVolume: number;
  schemeExceptions: string;
  schemeRewardValue: number;
}
