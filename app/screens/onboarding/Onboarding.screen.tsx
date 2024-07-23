//External dependencies
import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Config from 'react-native-config';

//Internal dependencies
import Layout from 'components/Layout';
import ScreenHeader from 'components/headers/ScreenHeader';
import NetworkRequest from 'services/networkRequest';
import {updateIsFirstTimeAppLaunch} from 'store/redux/userSlice';

//Styles, Constants and interfaces
import {getDeviceWidth, getTranslationLabel} from 'utils/commonMethods';
import styles from './Onboarding.style';
import {GET} from 'constants/httpConstants';
import {MARKETINGS} from 'services/constants';
import {handleApiError} from 'utils/CommonReduxMethods';

interface IOnboardingData {
  id: string;
  attributes: {
    media: string;
    description: string;
  };
}

const OnboardingScreens = () => {
  const [onboardingData, setOnboardingData] = useState<IOnboardingData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsData, setDotsData] = useState<number[]>([]);

  const carouselRef = useRef<Carousel<IOnboardingData>>(null);

  const dispatch = useDispatch();

  const backLabel = getTranslationLabel('back');
  const proceedLabel = getTranslationLabel('proceed');
  const nextLabel = getTranslationLabel('next');

  const rightButtonName =
    activeIndex === dotsData.length - 1 ? proceedLabel : nextLabel;

  const getOnboardingData = async () => {
    try {
      const result = await NetworkRequest(
        GET,
        MARKETINGS,
        {},
        {
          headers: {
            'skip-token': 'true',
            Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
          },
        },
      );

      setOnboardingData(result?.data?.data);

      const dotsArray = Array.from(Array(result?.data?.data?.length).keys());
      setDotsData(dotsArray);
    } catch (error: any) {
      handleApiError(error?.message);
    }
  };

  useEffect(() => {
    getOnboardingData();
  }, []);

  const handleLeftButton = () => {
    if (activeIndex > 0) {
      carouselRef?.current && carouselRef?.current?.snapToItem(activeIndex - 1);
    }
  };

  const handleRightButton = () => {
    if (activeIndex === dotsData.length - 1) {
      dispatch(updateIsFirstTimeAppLaunch(false));
    } else {
      carouselRef?.current && carouselRef?.current?.snapToItem(activeIndex + 1);
    }
  };

  return (
    <Layout>
      <ScreenHeader showScreenName={false} />
      <Carousel
        ref={carouselRef}
        data={onboardingData}
        sliderWidth={getDeviceWidth()}
        itemWidth={getDeviceWidth()}
        renderItem={({item, index}) => {
          const data = item?.attributes;
          return (
            <View style={styles.container} key={index}>
              <Image source={{uri: data.media}} style={styles.image} />
              <Text style={styles.textDescription} variant="bodyMedium">
                {data.description}
              </Text>
            </View>
          );
        }}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <View style={styles.footerContainer}>
        {activeIndex === 0 ? (
          <View style={styles.emptyView} />
        ) : (
          <Text variant="bodySmall" onPress={handleLeftButton}>
            {backLabel}
          </Text>
        )}
        <View style={styles.dotsContainer}>
          {dotsData?.length > 1
            ? dotsData.map(item => {
                const isActive = activeIndex === item;
                return (
                  <View
                    key={item}
                    style={isActive ? styles.activeDot : styles.inActiveDot}
                  />
                );
              })
            : null}
        </View>

        <Text variant="bodySmall" onPress={handleRightButton}>
          {rightButtonName}
        </Text>
      </View>
    </Layout>
  );
};

export default OnboardingScreens;
