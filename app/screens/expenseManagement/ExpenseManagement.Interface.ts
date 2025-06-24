export interface IExpenseMgmtCityRate {
  cityCategory: string;
  localTravelRate: number;
  outstationTravelRate: number;
  lodgingExpenseRate: number;
  otherExpenseRate: number;
  ownVehicleRatePerKm: number;
}

export interface ISearchCityData {
  id: number;
  attributes: {
    category: string;
    Location: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IExpenseProof {
  id: number;
  expenseName: string;
  proofFile: string;
}

export interface IExpenseData {
  id: number;
  lasUserId: string;
  fromDate: string;
  toDate: string;
  beatStartPoint: string;
  beatEndPoint: string;
  actualBeatDistance: number;
  modeOfTransport: string;
  proofType: string;
  noOfNight: string;
  city: string;
  cityCategory: string | null;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  calculatedAmount: any;
  lodgingTaxAmount: number;
  otherTaxAmount: number;
  lodgingComments: string | null;
  otherComments: string | null;
  status: string;
  expenseType: string;
  allowedAmount: string | null;
  createdBy: string | null;
  files: string[];
  travelProofType: string | null;
  lodgingProofType: string | null;
  otherProofType: string | null;
  travelProofComments: string | null;
  lodgingProofComments: string | null;
  otherProofComments: string | null;
  expense_proofs: IExpenseProof[];
}

export interface IExpenseFilterRequestBody {
  filters: {
    requestDate?: {
      $gte: string;
      $lte: string;
    };
    status?: string[];
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}

export enum ModeOfTransport {
  OWN_VEHICLE = 'Own Vehicle',
  LOCAL_TRAVEL = 'Local Travel',
  OUTSTATION_TRAVEL = 'Outstation Travel',
}

export interface IExpenseFormState {
  id: number | null;
  fromDate: string | null;
  toDate: string | null;
  beatStartPoint: string | null;
  beatEndPoint: string | null;
  beatDistance: string | null;
  modeOfTransport: string | null;
  lodgingAmount: string | null;
  lodgingTaxAmount: string | null;
  otherAmount: string | null;
  otherTaxAmount: string | null;
  noOfNight: string | null;
  city: string | null;
  cityCategory: string | number | null;
  calculatedAmount: string | null;
  lodgingComments: string | null;
  otherComments: string | null;
  files: string[];
  travelProofType: string | null;
  lodgingProofType: string | null;
  otherProofType: string | null;
  travelProofComments: string | null;
  lodgingProofComments: string | null;
  otherProofComments: string | null;
  expense_proofs: IExpenseProof[];
}
