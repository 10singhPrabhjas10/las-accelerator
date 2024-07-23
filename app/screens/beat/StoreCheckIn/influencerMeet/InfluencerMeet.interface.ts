export interface IInfluencerDropdownResponse {
  contactTypeEnum: string[];
  idTypeEnum: string[];
}

export interface ITransformedDropdownResponse {
  contactType: {label: string; value: string}[];
  idType: {label: string; value: string}[];
}

export interface IInfluencer {
  beatplanItemId: string;
  activity: string;
  influencerName: string;
  mobileNumber: string;
  idType: string;
  idNumber: string;
  contactType: string;
}
export interface IInfluencerMeetReqBody {
  data: IInfluencer[];
}

export interface IInfluencerValues {
  influencer: {
    contactType: string;
    idNo: string;
    idType: string;
    influencerName: string;
    mobileNo: string;
  }[];
}

export interface IData {
  beatplanItemId: string;
  activity: string;
  visitPurpose: string;
  employeeMeet?: string;
  comments?: string;
}

export interface IBranchVisitReqBody {
  data: IData[];
}
