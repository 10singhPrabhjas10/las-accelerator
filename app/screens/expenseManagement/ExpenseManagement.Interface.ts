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
  otherProofType: string | null;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  taxAmount: number;
  lasComments: string;
  status: string;
  expenseType: string;
  allowedAmount: string | null;
  expense_proofs: [
    {
      id: number,
      expenseName: string,
      proofFile: string,
    }
  ];
  createdBy: string | null;
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