export interface IPrimarySalesResponse {
  acheivedValue: number;
  target: number;
}

export interface ITransformedSalesResponse {
  leftTitle: string;
  rightTitle: string;
}

export interface IChannelDropdownResponse {
  nameOfFirm: string;
  code: string;
  channelPartnerId: string;
}

export interface IDropdownItem {
  value: string;
  label: string;
}

export enum LasType {
  RE = 'RE',
  TE = 'TE',
}

export enum ReportType {
  MONTHLY = 'Monthly',
  DAILY = 'Daily',
}

export enum Reports {
  BEAT_COMPLIANCE = 'beatPlanCompliance',
  VISIT_COMPLIANCE = 'visitPlanCompliance',
  UTILIZATION_COMPLIANCE = 'utilizationCompliance',
  ATTENDANCE_COMPLIANCE = 'attendanceCompliance',
}
export interface IComplianceReqBody {
  reportType: ReportType;
  reports: Reports[];
}

export interface IComplianceResponse {
  beatPlanCompliance: {
    planned: number;
    completed: number;
    percentage: string;
  };
  visitPlanCompliance: {
    target: number;
    actual: number;
    percentage: string;
  };
  utilizationCompliance: {
    loggedInHours: string;
    expectedHours: string;
    percentage: string;
  };
  attendanceCompliance: {
    workingDays: number;
    loggedInDays: string;
    percentage: string;
  };
}
