import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '@/theme/colors';
import ListItem from '@/components/listItem/ListItem';
import {
  getDeviceWidth,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import CategoriesCard from '@/components/categoriesCard/categoriesCard';
interface IOrderList {
  data: any;
  title: string;
  isListhorizontal?: boolean;
  isGrid?: boolean;
  onPressListItem: () => null;
}
const OrderList = ({
  data,
  title,
  isListhorizontal = false,
  isGrid = false, // New prop to handle grid layout
  onPressListItem,
}: IOrderList) => {
  const numColumns = isGrid ? 2 : 1; // Set number of columns for grid layout

  return (
    <View>
      <View style={styles.headText}>
        <Text variant="headlineMedium" style={styles.titleLable}>
          {title}
        </Text>
        <Text variant="labelLarge" style={styles.titleLable}>
          {data.length} results
        </Text>
      </View>
      <FlatList
        data={data}
        horizontal={isListhorizontal}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns} // Set the number of columns dynamically
        renderItem={({item}) => (
          <View style={styles.coloumnStyle}>
            <CategoriesCard
              title={item.name}
              imagePath={item.image}
              onPress={onPressListItem}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        key={isGrid ? 'grid' : 'list'} // Force re-render when numColumns changes
        contentContainerStyle={isGrid && styles.gridContainer} // Add container style for grid layout
      />
    </View>
  );
};
export const styles = StyleSheet.create({
  coloumnStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.lightGreenBackground,
    marginVertical: 10,
    paddingBottom: 10,
  },
  headText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: heightToRatio(10),
    marginHorizontal: 10,
  },
  titleLable: {
    alignSelf: 'center',
  },
  titleResults: {
    color: COLORS.greyText,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGreenBackground,
  },
  gridContainer: {},
});
export default OrderList;
