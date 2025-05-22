import apiClient from '../../services/apiClient';
import {
  DateRange,
  PerformanceDashboardApiResponse,
} from '../../modals/tabs/performanceTabs.model';
import {mockPerformanceDahsboardResponse} from '../../modals/tabs/performanceTabsMocks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PerformanceTabsApi = {
  /**
   * Fetch performance dashboard data based on date range
   */

  getPerformanceDashboardData: async (
    dateRange: DateRange,
  ): Promise<PerformanceDashboardApiResponse> => {
    //delay(800);
    return mockPerformanceDahsboardResponse;
    /**
     * Replace with Real api integration
     */
    // const {startDate, endDate} = dateRange;
    // const startDateStr = startDate.toISOString().split('T')[0];
    // const endDateStr = endDate.toISOString().split('T')[0];
    // const response = await apiClient.get<AttendanceApiResponse>(
    //   '/attendance/dashboard',
    //   {
    //     params: {startDate: startDateStr, endDate: endDateStr},
    //   },
    // );

    // return response.data;
  },
};
