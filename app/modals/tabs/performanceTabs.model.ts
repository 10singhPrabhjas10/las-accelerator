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

export interface PerformanceDashboardData {
  attendenceTabData: AttendanceTabData;
  commonTabData: CommonTabData;
  productRetailerTabData: ProductivityTabData;
  salesPerformanceTabData: SalesPerformanceTabData;
}

export interface PerformanceDashboardApiResponse {
  success: boolean;
  data: PerformanceDashboardData;
}

export interface AttendanceTabData {
  attendanceOverview: AttendanceOverviewData;
}
export interface CommonTabData {
  retailersChart: DonutChartData;
  ordersChart: DonutChartData;
  retailers: RetailersData[];
  metricData: MetricsData;
}

/** Productivity Tab Data */

interface RetailerOverview {
  targetData: number[];
  coveredData: number[];
  months: string[];
  currentValue: string;
  percentChange: string;
  defaultSelectedIndex: number;
}
export interface ProductivityTabData {
  retailerOverview: RetailerOverview;
}

/** Sales Tabs */

interface SalesStaticsData {
  months: string[];
  salesGoals: number[];
  achieved: number[];
  title: string;
  date: string;
}
interface TopProductsSoldData {
  metrics: {
    percent: number;
    label: string;
    color: string;
    bgColor: string;
  }[];
}

interface TopProductsListData {
  products: {
    id: string;
    name: string;
    amount: string;
    change: string;
    changeType: 'up' | 'down';
  }[];
  title: string;
  date: string;
}
interface EffectiveCoverageData {
  total: number;
  uniqueBill: number;
  zeroBill: number;
  title: string;
  date: string;
}
export interface SalesPerformanceTabData {
  sales: SalesStaticsData;
  topProductsSold: TopProductsSoldData;
  topProductsList: TopProductsListData;
  effectiveCoverage: EffectiveCoverageData;
}
