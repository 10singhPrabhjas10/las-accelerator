import {useState, useEffect} from 'react';
//import {performanceDashboardApi} from '@/api/mockApi/performanceTabs.api';
import {
  DateRange,
  PerformanceDashboardData,
} from '@/modals/tabs/performanceTabs.model';
import {PerformanceTabsApi as performanceApi} from '../api/mockApi/performanceTabsApi';
export const useAttendance = (initialDateRange: DateRange) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);
  const [data, setData] = useState<PerformanceDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPerformanceTabsData = async (range: DateRange) => {
    try {
      setLoading(true);
      setError(null);
      const response = await performanceApi.getPerformanceDashboardData(range);
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
    fetchPerformanceTabsData(dateRange);
  }, [dateRange]);

  return {
    data,
    loading,
    error,
    dateRange,
    setDateRange,
    refetch: () => fetchPerformanceTabsData(dateRange),
  };
};
