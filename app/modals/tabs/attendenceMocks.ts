import {AttendanceApiResponse} from '../../modals/tabs/attendance.model';

export const mockAttendanceResponse: AttendanceApiResponse = {
  success: true,
  data: {
    attendanceOverview: {
      months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      workDays: [29, 30, 29, 30, 31, 29],
      presentDays: [24, 27, 26, 27, 29, 25],
      highlightMonth: 'Feb',
      currentMonth: 'Feb 2024',
    },
    metrics: {
      productivity: 88,
      beatAdherence: 128,
      retailerCoverage: 75,
      maxBeatAdherence: 200,
    },
    retailers: [
      {
        id: '00222',
        name: 'Lakshmi Traders',
        initials: 'LT',
        email: 'example@example.com',
        avatar: '',
      },
      {
        id: '00223',
        name: 'HG Wells Electrical Ltd',
        initials: 'HG',
        email: 'example@example.com',
        avatar: null,
      },
      {
        id: '00224',
        name: 'ZMT Traders Ltd',
        initials: 'ZT',
        email: 'example@example.com',
        avatar: null,
      },
    ],
    retailersChart: {
      title: 'Retailers',
      value: 248,
      sections: [
        {percent: 62, color: '#276749', label: 'New', bold: true},
        {percent: 13, color: '#81E6D9', label: 'Returning'},
        {percent: 23, color: '#4299E1', label: 'Inactive'},
      ],
    },
    ordersChart: {
      title: 'Orders',
      value: 6874,
      sections: [
        {
          percent: 40,
          color: '#276749',
          label: 'Unique Retailers Billed',
          bold: true,
        },
        {
          percent: 60,
          color: '#81E6D9',
          label: 'Unique Retailers Order Placed',
        },
      ],
    },
  },
};
