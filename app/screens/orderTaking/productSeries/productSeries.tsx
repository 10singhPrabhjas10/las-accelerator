import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Layout from '@/components/Layout';
import ShoppingCartIcon from '../../../../assets/icons/shopping_cart.svg';
import {
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from '../../../utils/commonMethods';
import SearchInputWithCamera from '../../../components/searchInputWithCamera/searchInputWithCamera';
import {COLORS} from '@/theme/colors';
import {Chip, Icon, Text} from 'react-native-paper';
import SeriesCard from '../components/SeriesCard';
import {productSeries} from '../../../utils/dummyData';
import CommonStyles from '@/utils/commonStyle';
import OrderSearch from '@/components/orderSearch';
import CartLogo from '../../../../assets/icons/shopping_cart.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Spacer from '@/components/spacer';
import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import ProductDetailsBottomSheet from '../components/productDetailsBottomSheet/productDetailsBottomSheet';

export interface ISeriesCardProps {
  discount: string;
  name: string;
  sku: string;
  avl: string;
  price: string;
  image: any;
  categories?: number[];
  id: number;
}
type Product = {
  id: number;
  quantity: number;
};

export type ProductList = {
  [key: string]: Product;
};
const ProductSeries = () => {
  const {filters, relatedProducts} = productSeries.data;
  const [selectedFilters, setselectedFilters] = useState<number[]>([]);
  const [productsAdded, setProductsAdded] = useState<ProductList>();
  const [selectedCardITem, setSelectedCardItem] = useState<ISeriesCardProps>({
    discount: '',
    name: '',
    sku: '',
    avl: '',
    price: '10',
    image: '',
    categories: [],
    id: 0,
  });
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();
  const navigation = useNavigation<RootNavigationProp>();
  const sheetRef = useRef<BottomSheetModal>(null);

  const onFilterPress = (id: number) => {
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
  const goToOrderSummary = () => {
    navigation.navigate('OrderSummary');
  };

  const handleAddProduct = (
    existingQuantity: number,
    quantity: number,
    uomValue: string,
    existingUomValue: string,
    id: number,
  ) => {
    setProductsAdded((prev: any) => {
      return {
        ...prev,
        [id]: {quantity, id},
      };
    });
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('product_series')}
      onPressCustomLogo={goToOrderSummary}
      customLogo={() => <CartLogo />}>
      <OrderSearch onChangeImage={setSearchImg} onChangeText={setSearchText} />
      <View style={styles.parent}>
        <Spacer size={16} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {filters?.map(filter => {
            const isSelected = selectedFilters.includes(filter.id);
            return (
              <Chip
                mode="outlined"
                style={[
                  styles.chip,
                  isSelected ? styles.chipSelected : styles.chipNotSelected,
                ]}
                textStyle={{color: COLORS.black1}}
                selectedColor={COLORS.accentGreen}
                onClose={
                  isSelected
                    ? () => {
                        onFilterPress(filter.id);
                      }
                    : undefined
                }
                closeIcon={() =>
                  isSelected ? (
                    <Icon color={COLORS.black1} size={16} source={'close'} />
                  ) : null
                }
                onPress={() => onFilterPress(filter.id)}
                key={filter?.id}>
                {filter?.name}
              </Chip>
            );
          })}
        </ScrollView>

        <View style={styles.headText}>
          <Text variant="headlineSmall" style={styles.titleLable}>
            Aqua Water Heaters
          </Text>
          <Text variant="labelLarge" style={styles.titleLable}>
            {getFilteredList().length} {getTranslationLabel('results')}
          </Text>
        </View>

        <FlatList
          data={getFilteredList()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  // sheetRef.current?.present();
                  // setSelectedCardItem(item);
                }}>
                <SeriesCard
                  title={item.discount}
                  onAddPress={() => {
                    sheetRef.current?.present();
                    setSelectedCardItem(item);
                  }}
                  image={item.image}
                  seriesName={item.name}
                  skuName={item.sku}
                  skuId={item.avl}
                  price={item.price}
                  id={item.id}
                  productsAdded={productsAdded}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <BottomSheetModalComponent
        maxHeight={'80%'}
        minHeight={'75%'}
        ref={sheetRef}>
        <ProductDetailsBottomSheet
          onClose={() => sheetRef.current?.close()}
          onAddToCart={(
            existingQuantity,
            quantity,
            uomValue,
            existingUomValue,
            id,
          ) => {
            handleAddProduct(
              existingQuantity,
              quantity,
              uomValue,
              existingUomValue,
              id,
            );
          }} //use this to get quantity and UOM
          selectedCardItem={selectedCardITem}
          productsAdded={productsAdded}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default ProductSeries;

const styles = StyleSheet.create({
  containerStyles: {
    padding: 10,
    backgroundColor: COLORS.dDarkGreen,
    height: heightToRatio(88),
  },
  scrollView: {
    maxHeight: widthToRatio(50),
    height: widthToRatio(50),
  },
  parent: {
    paddingHorizontal: 10,
  },
  rowView: {
    flexDirection: 'row',
  },
  headText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: heightToRatio(10),
    paddingHorizontal: 10,
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
  chip: {
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: heightToRatio(40),
  },
  chipSelected: {
    borderColor: COLORS.dgreen,
    borderWidth: 3,
    height: 62,
  },
  chipNotSelected: {
    borderColor: COLORS.dividerGrey,
  },
  selectedchipsContiner: {
    borderColor: COLORS.dgreen,
    backgroundColor: COLORS.accentGreen,
    paddingRight: 8,
    height: 5,
  },
  crossIcon: {
    paddingLeft: 4,
    top: 2,
  },
});
