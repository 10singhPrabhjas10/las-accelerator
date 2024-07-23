/* eslint-disable @typescript-eslint/no-unused-vars */
interface IRowDataProps {
  title: string;
  text: string;
}

interface ISchemesData {
  schemeList: {schemeName: string; schemeCode: string; data: IRowDataProps[]}[];
  dashboard: {
    foc: number;
    gift: number;
    gold: number;
    tour: number;
    creditNotes: number;
    other: number;
  };
}

interface IRishtaPointsFilterData {
  categories: string[];
  subCategories: string[];
}

interface IRishtaPointsFilters {
  filterData: IRishtaPointsFilterData;
  setFilterData: (data: IRishtaPointsFilterData) => void;
  onApplyFilter: () => void;
}

interface ISchemeRewardResponse {
  distributorName: string;
  currentSlab: string;
  status: string;
  currentProgress: string;
  rewardValue: string;
  nextRewardObj: {
    nextRewardDiff: string;
    nextRewardValue: string;
  };
}

interface IResSecondaryPartner {
  nameOfFirm: string;
  code: string;
  channelPartnerId: string;
  retailerCode?: string;
}

interface ILiveLocationReqBody {
  latitude: string;
  longitude: string;
}

interface ISchemeCategories {
  categoryName: string;
  categoryId: string;
  logo: string;
}

interface ISchemesResponse {
  schemeName: string;
  schemeCode: string;
  schemeType: string;
  schemeStartDate: string;
  schemeEndDate: string;
}

interface ISecondarySchemesPerformance {
  startDate: string;
  endDate: string;
}

interface ISecondarySchemesPerformanceFilters {
  filterData: ISecondarySchemesPerformance;
  setFilterData: (data: ISecondarySchemesPerformance) => void;
  onApplyFilter: () => void;
}
