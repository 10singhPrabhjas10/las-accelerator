import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {commonStyles} from '../styles/commonStyles';
import { de } from 'react-native-paper-dates';

const Feather = Icon as any;

type Product = {
  id: string;
  name: string;
  amount: string;
  change: string;
  changeType: 'up' | 'down';
};

interface TopProductsListProps {
  products: Product[];
  title?: string;
  date?: string;
  onViewAll?: () => void;
}

const ProductItem = ({item}: {item: Product}) => (
  <View style={styles.productRow}>
    <View style={styles.iconCircle}>
      <Feather name="box" size={28} color="#2D4A53" />
    </View>
    <View style={{flex: 1}}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productAmount}>{item.amount}</Text>
    </View>
    <View style={styles.changeContainer}>
      <Feather
        name={item.changeType === 'up' ? 'arrow-up' : 'arrow-down'}
        size={18}
        color={item.changeType === 'up' ? '#598217' : '#E32413'}
      />
      <Text
        style={[
          styles.changeText,
          {color: item.changeType === 'up' ? '#598217' : '#E32413'},
        ]}>
        {item.change}
      </Text>
    </View>
  </View>
);

const TopProductsListItem: React.FC<TopProductsListProps> = ({
  products,
  title = 'Top Products Sold',
  date = 'Feb 2024',
  onViewAll,
}) => {
  return (
    <View style={[commonStyles.card]}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={ProductItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.viewAllBtn} onPress={onViewAll}>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222426',
  },
  dateBadge: {
    backgroundColor: '#E6EDEE',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  dateText: {
    color: '#004F59',
    fontWeight: '400',
    fontSize: 15,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEEEEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  productName: {
    fontSize: 17,
    fontWeight: '400',
    color: '#222426',
  },
  productAmount: {
    fontSize: 15,
    color: '#222426',
    marginTop: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
    justifyContent: 'flex-end',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 4,
  },
  separator: {
    height: 2,
    backgroundColor: '#EEEEEF',
    //marginLeft: 64,
  },
  viewAllBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllText: {
    color: '#25890D',
    fontWeight: '400',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default TopProductsListItem;
