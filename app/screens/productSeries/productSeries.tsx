import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '@/components/Layout';
import ShoppingCartIcon from '../../../assets/icons/shopping_cart.svg';
import {getTranslationLabel, heightToRatio} from '../../utils/commonMethods';
import SearchInputWithCamera from '../../components/searchInputWithCamera/searchInputWithCamera';
import {COLORS} from '@/theme/colors';
import {Text} from 'react-native-paper';
import SeriesCard from '../orderTaking/components/SeriesCard';
import Cross from '../../../assets/icons/cross.svg';
import {productSeries} from '../../utils/dummyData';

const ProductSeries = () => {
  const {filters, relatedProducts} = productSeries.data;
  const [selectedFilters, setselectedFilters] = useState([]);
  const onFilterPress = (id: Number) => {
    if (selectedFilters.includes(id)) {
      setselectedFilters(selectedFilters.filter(num => num !== id));
    } else {
      setselectedFilters([...selectedFilters, id]);
    }
  };
  const getFilteredList = () => {
    if (selectedFilters.length == 0) {
      return relatedProducts;
    }
    return relatedProducts.filter(product =>
      product.categories.some(category => selectedFilters.includes(category)),
    );
  };
  return (
    <Layout
      headerTitle={getTranslationLabel('product_series')}
      onPressCustomLogo={() => {
        console.log('log');
        return false;
      }}
      customLogo={() => <ShoppingCartIcon />}>
      <SearchInputWithCamera continerStyles={styles.continerStyles} />
      <View style={styles.headText}>
        <Text variant="headlineMedium" style={styles.titleLable}>
          Aqua Water Heaters
        </Text>
        <Text variant="labelLarge" style={styles.titleLable}>
          {getFilteredList().length} results
        </Text>
      </View>
      <FlatList
        data={filters}
        horizontal={true}
        renderItem={({item}) => {
          const isSelected = selectedFilters.includes(item.id);
          console.log(isSelected, selectedFilters);

          return (
            <TouchableOpacity
              style={[
                styles.chipsContiner,
                isSelected ? styles.selectedchipsContiner : {},
              ]}
              onPress={() => onFilterPress(item.id)}>
              <Text>{item.name}</Text>
              {isSelected && (
                <View style={styles.crossIcon}>
                  <Cross />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        data={getFilteredList()}
        renderItem={({item}) => {
          return (
            <SeriesCard
              title={item.discount}
              onAddPress={() => {}}
              image={<Image source={item.image} style={{width: 50}} />}
              seriesName={item.name}
              skuName={item.avl}
              skuId={item.avl}
            />
          );
        }}
      />
    </Layout>
  );
};

export default ProductSeries;

const styles = StyleSheet.create({
  continerStyles: {
    padding: heightToRatio(24),
    backgroundColor: COLORS.dDarkGreen,
  },
  rowView: {
    flexDirection: 'row',
  },
  headText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: heightToRatio(10),
    paddingHorizontal: 24,
  },
  titleLable: {
    alignSelf: 'center',
  },
  chipsContiner: {
    flexWrap: 'wrap',
    height: heightToRatio(32),
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: COLORS.dividerGrey,
    borderWidth: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedchipsContiner: {
    borderColor: COLORS.dgreen,
    backgroundColor: COLORS.accentGreen,
    paddingRight: 8,
    height: heightToRatio(31),
  },
  crossIcon: {
    paddingLeft: 4,
    top: 2,
  },
});
