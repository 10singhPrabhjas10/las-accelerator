import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c3237',
    padding: 16,
  },
  mainContainer: {
    flex: 1,
  },
  containerSales: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E6EDEE',
  },
  header: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  viewAll: {
    color: 'green',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 16,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  increase: {
    color: 'green',
    fontSize: 14,
    fontWeight: '500',
  },
  decrease: {
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },

  periodText: {
    color: 'white',
  },
  activePeriodText: {
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2c4248',
    borderRadius: 8,
    borderStartColor: 'red',
    padding: 16,
    width: '48%',
    marginBottom: 16,
  },
  changeContainer: {
    alignItems: 'flex-start',
  },
  changeText: {
    fontSize: 12,
  },
  positive: {
    color: '#4caf50',
  },
  negative: {
    color: '#f44336',
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  title: {
    color: 'white',
    fontSize: 12,
  },

  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardSales: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    height: 250,
  },
  salesGoal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  productList: {
    // Styles for product list
  },
  totalRetailers: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  retailerStats: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  dotView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  tabContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  positiveContainer: {
    backgroundColor: 'rgba(75, 181, 67, 0.15)',
  },
  negativeContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },
  arrow: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  positiveCircle: {
    backgroundColor: 'rgba(75, 181, 67, 0.15)',
  },
  negativeCircle: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },

  cardMainContent: {
    flex: 1,
  },
  arrowContainerAlt: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  altArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
