import {
  BEAT_PLAN,
  BEAT_PLAN_ITEM,
  AREA_MASTERS,
  CHANNEL_PARTNERS,
  BEAT_PLAN_DETAILS,
  BEAT_PLAN_DEVIATION,
  BEAT_LEADS,
} from 'services/constants';

// Get Area District Dropdown

export const getDistrictAreaDropdown = (
  salesOffice: string,
  pageNumber: number,
  pageSize: number,
  searchQuery?: string,
) => {
  let query = '';
  if (searchQuery !== '' && searchQuery !== undefined) {
    query = `&filters[$or][0][pincode][$containsi]=${searchQuery}&filters[$or][1][district][$containsi]=${searchQuery}`;
    // query = `&filters[district][$containsi]=${searchQuery}`;
  }
  return (
    AREA_MASTERS +
    `?filters[salesOffice][$containsi]=${salesOffice}&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}${query}`
  );
};

//Get Channel Partners

export const getChannelPartners = () => {
  return CHANNEL_PARTNERS;
};

// Get Recurrence and Selected Beat Plan Item

export const getSelectedBeatPlanItem = (
  selectedDate: string,
  relation: string,
) => {
  return (
    BEAT_PLAN_ITEM +
    `?filters[date]=${selectedDate}&filters[relation]=${relation}&page=1&pageSize=100&sort[createdAt]=asc`
  );
};

//Beat Plan Item API(C)

export const createBeatPlanItem = () => {
  return BEAT_PLAN_ITEM;
};

//Create Beat Plan (ON HOLD)

export const createBeatPlan = () => {
  return BEAT_PLAN;
};

//Get Beat Plan Details

export const getBeatPlanDetails = (month: string, year: number) => {
  return BEAT_PLAN_DETAILS + `?filters[month]=${month}&filters[year]=${year}`;
};

//Get Beat Plan item List

export const getBeatPlanItemList = (
  date: string,
  page: number,
  pageSize: number,
) => {
  return (
    BEAT_PLAN_ITEM +
    `?filters[date]=${date}&page=${page}&pageSize=${pageSize}&sort[createdAt]=asc`
  );
};

//Get Beat Pre Conditions

export const getBeatPreConditions = (startDate: string, endDate: string) => {
  return (
    BEAT_PLAN +
    `/pre-conditions?filters[date][$gte]=${startDate}&filters[date][$lte]=${endDate}`
  );
};

//API for the Approval

export const submitBeatStatus = (beatPlanId: string) => {
  return BEAT_PLAN + `/${beatPlanId}`;
};

//API for Beat Deviation

export const submitBeatDeviation = () => {
  return BEAT_PLAN_DEVIATION;
};

//API for Fetch Leads

export const getBeatLeads = (queryString: string) => {
  return BEAT_LEADS + `?filters[status]=Working&${queryString}`;
};
