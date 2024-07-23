/* eslint-disable react-native/no-inline-styles */
import {View, Dimensions, Share} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Icon, Text} from 'react-native-paper';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import ProductDisplayFilterScreen from 'screens/productsPriceList/productDisplayFilter/ProductDisplayFilter';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import ShareIcon from '../../../../../assets/icons/share.svg';
import {TouchableOpacity} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import EmptyVideo from '../../../../../assets/icons/emptyVideo.svg';
import styles from './ProductVideo.style';
import {
  getProductVideos,
  getYouTubeVideoId,
  transformedData,
} from 'screens/productsPriceList/ProductPrice.business';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import ProductHeader from 'screens/productsPriceList/productHeader/ProductHeader';

const ProductItem = ({
  item,
  togglePlaying,
  playing,
  tabCurrentIndex,
}: IProductVideoScreenProps) => {
  const onShare = async (url: string) => {
    try {
      await Share.share({
        message: url,
      });
    } catch (error: any) {
      console.log('error', error.message);
    }
  };

  const getVideoLink = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <View key={tabCurrentIndex} style={styles.containerStyle}>
      <Text style={styles.labelStyle} variant="labelSmall">
        {item?.label}
      </Text>
      {item?.data?.map(videoCategory => {
        const videoId = getYouTubeVideoId(videoCategory?.link as string);
        return (
          videoCategory?.link && (
            <View key={videoCategory?.id} style={CommonStyles.flexOne}>
              <ProductHeader
                imageUrl={getVideoLink(videoId as string)}
                onImagePress={() => togglePlaying(videoId || '')}
                title={videoCategory?.title ?? ''}
                titleVariant="bodyLarge"
                titleStyle={styles.titleStyle}
                subTitle={videoCategory?.subTitle ?? ''}
                subTitleVariant="bodyLarge"
                subTitleStyle={{color: COLORS.grey2}}
                profileStyle={styles.profileStyle}
                textContainerStyle={styles.textContainerStyle}
                customCardStyle={[
                  styles.customCard,
                  {
                    opacity: playing ? 0.1 : 1,
                  },
                ]}
                rightIcon={
                  <ShareIcon
                    width={22}
                    height={30}
                    color={COLORS.darkOrange}
                    fill={COLORS.darkOrange}
                  />
                }
                rightIconOnPress={() => onShare(videoCategory?.link as string)}
              />
            </View>
          )
        );
      })}
    </View>
  );
};

const ProductVideoScreen = ({tabCurrentIndex}: IProductDisplayProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'ProductDisplay'>>();
  const productId = route.params.productId;

  const [playing, setPlaying] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>('');

  const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>([]);
  const [skuFilterValue, setSkuFilterValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<string[]>([]);
  const [dropDownValue, setDropdownValue] = useState<string>('');
  const [contentFilterValue, setContentFilterValue] = useState<string[]>([]);
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const flatListRef = useRef<FlatList<any>>(null);

  const getVideos = useCallback(
    (
      categoryID: string,
      categoryFilter: string[],
      skuFilter: string[],
      typeFilter: string[],
      dateFilter: string[],
    ) => {
      const requestBody: IVideoRequestBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          categoryId: categoryID,
        },
      };

      if (categoryFilter?.length > 0) {
        requestBody.filters.subCategoryId = categoryFilter;
      }
      if (typeFilter?.length > 0) {
        requestBody.filters.documentType = {
          $containsi: typeFilter,
        };
      }
      if (skuFilter?.length > 0) {
        requestBody.filters.skuProduct = {
          $containsi: skuFilter,
        };
      }

      if (dateFilter?.length > 0) {
        requestBody.filters.youtubeCreatedAt = {
          $gte: convertDateToDisplay(dateFilter[0], DateFormats.YYYY_MM_DD),
          $lte: convertDateToDisplay(dateFilter[1], DateFormats.YYYY_MM_DD),
        };
      }

      getProductVideos(
        requestBody,
        videos,
        setVideos,
        setCategoryFilterValue,
        setSkuFilterValue,
        setContentFilterValue,
        setDateValue,
        setTotalPages,
      );
      setIsFilterApplied(false);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied && tabCurrentIndex === 1) {
      getVideos(
        productId,
        categoryFilterValue,
        skuFilterValue,
        contentFilterValue,
        dateValue,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied, productId, tabCurrentIndex]);

  const handleApplyFilters = (
    subCategoryFilter: string[],
    skuFilter: string[],
    dateFilter: string[],
    dateFilterValue?: string,
    contentFilter?: string[],
  ) => {
    bottomSheetModalRef.current?.dismiss();
    setCategoryFilterValue(subCategoryFilter);
    setSkuFilterValue(skuFilter);
    setDateValue(dateFilter);
    dateFilterValue && setDropdownValue(dateFilterValue);
    contentFilter && setContentFilterValue(contentFilter);
    setVideos([]);
    scrollToTop();
    setIsFilterApplied(true);
  };

  const removeFilters = () => {
    setCategoryFilterValue([]);
    setSkuFilterValue([]);
    setDateValue([]);
    setDropdownValue('');
    setContentFilterValue([]);
    setTotalPages(1);
    setPageNumber(1);
    setDropdownValue('');
  };

  useEffect(() => {
    if (!isFilterApplied) {
      setIsFilterApplied(true);
    }
    setVideos([]);
    removeFilters();

    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabCurrentIndex]);

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  const togglePlaying = useCallback((videoId: string) => {
    setPlaying(prev => !prev);
    setSelectedVideoId(videoId);
  }, []);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);
  const closeVideoPlayer = () => {
    setPlaying(false);
    setSelectedVideoId(null);
  };

  const renderCustomPlayerControls = () => {
    return (
      <TouchableOpacity
        onPress={closeVideoPlayer}
        style={styles.closeButtonPlayer}>
        <Icon source="close" color={COLORS.white} size={30} />
      </TouchableOpacity>
    );
  };

  const renderVideoPlayer = () => {
    if (playing && selectedVideoId) {
      return (
        <View style={styles.playerView}>
          <YoutubePlayer
            height={Dimensions.get('window').height}
            width={Dimensions.get('window').width}
            play={playing}
            videoId={selectedVideoId}
            onChangeState={onStateChange}
          />
          {renderCustomPlayerControls()}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={CommonStyles.flexOne}>
      <FlatList
        data={transformedData(videos)}
        keyExtractor={(item, index) => `${item?.data[index]?.id}-${index}`}
        renderItem={({item, index}) => (
          <ProductItem
            item={item}
            togglePlaying={togglePlaying}
            playing={playing}
            key={`${item?.data[index]?.id}-${index}`}
            tabCurrentIndex={item?.data[index]?.id}
          />
        )}
        initialNumToRender={10}
        style={CommonStyles.flexOne}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }}
        onEndReachedThreshold={0.5}
        ref={flatListRef}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <EmptyContainer
            title={getTranslationLabel('no_product_display')}
            icon={
              <EmptyVideo width={110} height={110} color={COLORS.lightblue} />
            }
          />
        }
      />
      {renderVideoPlayer()}
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'80%'}
        minHeight={'80%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <ProductDisplayFilterScreen
          subCategoryFilter={categoryFilterValue}
          skuFilter={skuFilterValue}
          dropDownType={dropDownValue}
          date={dateValue}
          typeFilter={contentFilterValue}
          categoryID={productId}
          isDocumentScreen={false}
          onApplyFilter={(
            subCategoryFilter: string[],
            skuFilter: string[],
            dateFilter: string[],
            dateFilterValue?: string,
            contentFilter?: string[],
          ) => {
            setPageNumber(1);
            setTotalPages(1);
            handleApplyFilters(
              subCategoryFilter,
              skuFilter,
              dateFilter,
              dateFilterValue,
              contentFilter,
            );
          }}
          onClearFilter={() => {
            handleApplyFilters([], [], [], '', []);
            setPageNumber(1);
            setTotalPages(1);
            setDropdownValue('');
          }}
        />
      </BottomSheetModalComponent>
    </View>
  );
};

export default ProductVideoScreen;
