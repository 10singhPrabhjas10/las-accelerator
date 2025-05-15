import {mockAttendanceResponse} from './attendenceMocks';
import {DateRange, AttendanceApiResponse} from './attendance.model';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAttendanceApi = {
  getAttendanceDashboard: async (
    _dateRange: DateRange,
  ): Promise<AttendanceApiResponse> => {
    await delay(800);
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch attendance data');
    }
    return mockAttendanceResponse;
  },
};
