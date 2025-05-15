import {useState, useEffect} from 'react';
//import {attendanceApi} from '@/api/mockApi/attendance.api';
import {
  DateRange,
  AttendanceDashboardData,
} from '@/modals/tabs/attendance.model';
import {attendanceApi as attendanceApi} from '../api/mockApi/attendance.api';
export const useAttendance = (initialDateRange: DateRange) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);
  const [data, setData] = useState<AttendanceDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttendanceData = async (range: DateRange) => {
    try {
      setLoading(true);
      setError(null);
      const response = await attendanceApi.getAttendenceDashboard(range);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Failed to fetch attendance data'),
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendanceData(dateRange);
  }, [dateRange]);

  return {
    data,
    loading,
    error,
    dateRange,
    setDateRange,
    refetch: () => fetchAttendanceData(dateRange),
  };
};
