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

// MOCK: DAY
export const mockPerformanceDashboardResponseDay: PerformanceDashboardApiResponse =
  {
    success: true,
    data: {
      attendenceTabData: {
        attendanceOverview: {
          months: ['Today'],
          workDays: [1],
          presentDays: [1],
          highlightMonth: 'Today',
          currentMonth: '30 May 2025',
        },
      },
      commonTabData: {
        retailersChart: {
          title: 'Retailers',
          value: 12,
          sections: [
            {percent: 70, color: '#276749', label: 'New', bold: true},
            {percent: 30, color: '#81E6D9', label: 'Returning'},
          ],
        },
        ordersChart: {
          title: 'Orders',
          value: 22,
          sections: [
            {
              percent: 60,
              color: '#276749',
              label: 'Unique Retailers Billed',
              bold: true,
            },
            {
              percent: 40,
              color: '#81E6D9',
              label: 'Unique Retailers Order Placed',
            },
          ],
        },
        retailers: [
          {
            id: 'd1',
            name: 'Retailer Day',
            initials: 'RD',
            email: 'day@example.com',
            avatar: '',
          },
        ],
        metricData: {
          productivity: 95,
          beatAdherence: 110,
          retailerCoverage: 85,
          maxBeatAdherence: 120,
        },
      },
      productRetailerTabData: {
        retailerOverview: {
          targetData: [10, 12],
          coveredData: [9, 11],
          months: ['Today', 'Today'],
          currentValue: '11',
          percentChange: '+1%',
          defaultSelectedIndex: 1,
        },
      },
      salesPerformanceTabData: {
        sales: {
          months: ['Today'],
          salesGoals: [12],
          achieved: [11],
          title: "Today's Sales",
          date: '30 May 2025',
        },
        topProductsSold: {
          metrics: [
            {
              percent: 3,
              label: 'Returns',
              color: '#E9A23B',
              bgColor: '#F8EDD8',
            },
          ],
        },
        topProductsList: {
          products: [
            {
              id: '1',
              name: 'LED Bulbs',
              amount: '₹6K',
              change: '+1.1%',
              changeType: 'up',
            },
          ],
          title: "Today's Products",
          date: '30 May 2025',
        },
        effectiveCoverage: {
          total: 12,
          uniqueBill: 8,
          zeroBill: 4,
          title: "Today's Coverage",
          date: '30 May 2025',
        },
      },
    },
  };

// MOCK: WEEK
export const mockPerformanceDashboardResponseWeek: PerformanceDashboardApiResponse =
  {
    success: true,
    data: {
      attendenceTabData: {
        attendanceOverview: {
          months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          workDays: [5, 5, 5, 5, 5, 5, 5],
          presentDays: [4, 5, 4, 5, 4, 5, 4],
          highlightMonth: 'Sun',
          currentMonth: 'Week 5',
        },
      },
      commonTabData: {
        retailersChart: {
          title: 'Retailers',
          value: 70,
          sections: [
            {percent: 55, color: '#276749', label: 'New', bold: true},
            {percent: 45, color: '#81E6D9', label: 'Returning'},
          ],
        },
        ordersChart: {
          title: 'Orders',
          value: 700,
          sections: [
            {
              percent: 45,
              color: '#276749',
              label: 'Unique Retailers Billed',
              bold: true,
            },
            {
              percent: 55,
              color: '#81E6D9',
              label: 'Unique Retailers Order Placed',
            },
          ],
        },
        retailers: [
          {
            id: 'w1',
            name: 'Retailer W1',
            initials: 'RW',
            email: 'w1@example.com',
            avatar: '',
          },
          {
            id: 'w2',
            name: 'Retailer W2',
            initials: 'RW',
            email: 'w2@example.com',
            avatar: '',
          },
        ],
        metricData: {
          productivity: 87,
          beatAdherence: 120,
          retailerCoverage: 78,
          maxBeatAdherence: 140,
        },
      },
      productRetailerTabData: {
        retailerOverview: {
          targetData: [15, 16, 17, 18, 19, 20, 21],
          coveredData: [14, 15, 16, 17, 18, 19, 20],
          months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          currentValue: '20',
          percentChange: '+2%',
          defaultSelectedIndex: 6,
        },
      },
      salesPerformanceTabData: {
        sales: {
          months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          salesGoals: [10, 11, 12, 13, 12, 11, 10],
          achieved: [9, 12, 11, 12, 10, 9, 8],
          title: 'Weekly Sales',
          date: 'Week 5',
        },
        topProductsSold: {
          metrics: [
            {
              percent: 4,
              label: 'Returns',
              color: '#E9A23B',
              bgColor: '#F8EDD8',
            },
            {
              percent: 2,
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
              name: 'Sockets',
              amount: '₹25K',
              change: '+1.5%',
              changeType: 'up',
            },
            {
              id: '2',
              name: 'Cables',
              amount: '₹18K',
              change: '-0.7%',
              changeType: 'down',
            },
          ],
          title: 'Top Weekly Products',
          date: 'Week 5',
        },
        effectiveCoverage: {
          total: 60,
          uniqueBill: 40,
          zeroBill: 20,
          title: 'Weekly Coverage',
          date: 'Week 5',
        },
      },
    },
  };
