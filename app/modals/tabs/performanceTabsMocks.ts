import {PerformanceDashboardApiResponse} from './performanceTabs.model';

export const mockPerformanceDahsboardResponse: PerformanceDashboardApiResponse =
  {
    success: true,
    data: {
      attendenceTabData: {
        attendanceOverview: {
          months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
          workDays: [29, 30, 29, 30, 31, 29],
          presentDays: [24, 27, 26, 27, 29, 25],
          highlightMonth: 'Feb',
          currentMonth: 'Feb 2024',
        },
      },
      commonTabData: {
        retailersChart: {
          title: 'Retailers',
          value: 248,
          sections: [
            {percent: 62, color: '#276749', label: 'New', bold: true},
            {percent: 15, color: '#81E6D9', label: 'Returning'},
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
        metricData: {
          productivity: 88,
          beatAdherence: 128,
          retailerCoverage: 75,
          maxBeatAdherence: 200,
        },
      },
      productRetailerTabData: {
        retailerOverview: {
          targetData: [470, 490, 550, 610, 550, 450],
          coveredData: [550, 480, 430, 479, 480, 300],
          months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
          currentValue: '479',
          percentChange: '+2.%',
          defaultSelectedIndex: 4,
        },
      },
      salesPerformanceTabData: {
        sales: {
          months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
          salesGoals: [53, 57, 66, 60, 64, 55],
          achieved: [56, 62, 52, 41, 50, 47],
          title: 'Sales Statistics',
          date: 'Feb 2024',
        },
        topProductsSold: {
          metrics: [
            {
              percent: 20,
              label: 'Returns',
              color: '#E9A23B',
              bgColor: '#F8EDD8',
            },
            {
              percent: 10,
              label: 'Claims',
              color: '#D93E3E',
              bgColor: '#F9E5E5',
            },
          ],
        },
        topProductsList: {
          products: [
            {
              id: '1',
              name: 'Power Distribution Products',
              amount: '₹3.4 Lacs',
              change: '+2.5%',
              changeType: 'up',
            },
            {
              id: '2',
              name: 'Energy Management Products',
              amount: '₹1.8 Lacs',
              change: '+3.2%',
              changeType: 'up',
            },
            {
              id: '3',
              name: 'Switches & Accessories',
              amount: '₹1.2 Lacs',
              change: '-1.5%',
              changeType: 'down',
            },
          ],
          title: 'Top Products Sold',
          date: 'Feb 2024',
        },
        effectiveCoverage: {
          total: 200,
          uniqueBill: 130,
          zeroBill: 70,
          title: 'Effective Coverage',
          date: 'Feb 2024',
        },
      },
    },
  };
