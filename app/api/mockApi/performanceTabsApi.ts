import {
  DateRange,
  PerformanceDashboardApiResponse,
} from '../../modals/tabs/performanceTabs.model';
import {
  mockPerformanceDahsboardResponse,
  mockPerformanceDashboardResponseDay,
  mockPerformanceDashboardResponseWeek,
} from '../../modals/tabs/performanceTabsMocks';

export const PerformanceTabsApi = {
  /**
   * Fetch performance dashboard data based on date range
   */
  getPerformanceDashboardData: async (
    dateRange: DateRange,
  ): Promise<PerformanceDashboardApiResponse> => {
    // Helper to check if the range is for today, week, or month
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    const isToday = (range: DateRange) => {
      if (!range.startDate || !range.endDate) return false;
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      const now = new Date();
      return isSameDay(start, now) && isSameDay(end, now);
    };
    const isWeek = (range: DateRange) => {
      if (!range.startDate || !range.endDate) return false;
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 6);
      return isSameDay(start, weekAgo) && isSameDay(end, now);
    };
    // Add similar logic for month if you have a month mock
    if (isToday(dateRange)) {
      return mockPerformanceDashboardResponseDay;
    }
    if (
      typeof mockPerformanceDashboardResponseWeek !== 'undefined' &&
      isWeek(dateRange)
    ) {
      return mockPerformanceDashboardResponseWeek;
    }
    return mockPerformanceDahsboardResponse;
  },
};
