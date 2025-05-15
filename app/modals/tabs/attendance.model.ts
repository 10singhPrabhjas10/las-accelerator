export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface AttendanceOverviewData {
  months: string[];
  workDays: number[];
  presentDays: number[];
  highlightMonth: string;
  currentMonth: string;
}

export interface MetricsData {
  productivity: number;
  beatAdherence: number;
  retailerCoverage: number;
  maxBeatAdherence: number;
}

export interface RetailersData {
  id: string;
  name: string;
  initials: string;
  email: string;
  avatar: string | null;
}

export interface DonutChartData {
  title: string;
  value: number;
  sections: {
    percent: number;
    color: string;
    label: string;
    bold?: boolean;
  }[];
}

export interface AttendanceDashboardData {
  attendanceOverview: AttendanceOverviewData;
  metrics: MetricsData;
  retailers: RetailersData[];
  retailersChart: DonutChartData;
  ordersChart: DonutChartData;
}

export interface AttendanceApiResponse {
  success: boolean;
  data: AttendanceDashboardData;
}
