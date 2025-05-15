import apiClient from '../../services/apiClient';
import {
  DateRange,
  AttendanceApiResponse,
} from '../../modals/tabs/attendance.model';
import {mockAttendanceResponse} from '../../modals/tabs/attendenceMocks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const attendanceApi = {
  /**
   * Fetch attendance dashboard data based on date range
   */

  getAttendenceDashboard: async (
    dateRange: DateRange,
  ): Promise<AttendanceApiResponse> => {
    delay(800);
    return mockAttendanceResponse;
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

  /**
   * Fetch retailers data
   */

  getRetailers: async (dateRange: DateRange, limit = 10): Promise<any> => {
    await delay(600);
    return {
      success: true,
      data: mockAttendanceResponse.data.retailers.slice(0, limit)
    };
    // const {startDate, endDate} = dateRange;
    // const startDateStr = startDate.toISOString().split('T')[0];
    // const endDateStr = endDate.toISOString().split('T')[0];

    // const response = await apiClient.get('/retailers', {
    //   params: {
    //     startDate: startDateStr,
    //     endDate: endDateStr,
    //     limit,
    //   },
    // });

    // return response.data;
  },
};

