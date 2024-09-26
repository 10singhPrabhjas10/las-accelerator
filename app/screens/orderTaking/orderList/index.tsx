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
        columnWrapperStyle={styles.coloumnWrapperStyle}
        numColumns={numColumns} // Set the number of columns dynamically
        renderItem={({item}) => (
          <TouchableOpacity onPress={onPressListItem}>
            <ListItem
              customContainerStyle={{
                alignItems: 'center',
                marginHorizontal: 10,
                width: isGrid ? getDeviceWidth(0.35) : getDeviceWidth(0.3), // Adjust width for grid layout
                marginBottom: 20, // Add space between rows
              }}
              title1={item.name}
              title2={item.price ?? ''}
              image={item.image}
            />
          </TouchableOpacity>
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
  coloumnWrapperStyle: {
    paddingHorizontal: widthToRatio(6),
    paddingBottom: 10,
  },
  headText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: heightToRatio(10),
    marginHorizontal: widthToRatio(14),
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
