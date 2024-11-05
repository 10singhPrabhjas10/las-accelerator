//External dependencies
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Button, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Config from 'react-native-config';

//Internal dependencies
import Layout from 'components/Layout';
import ScreenHeader from 'components/headers/ScreenHeader';
import NetworkRequest from 'services/networkRequest';
import {updateIsFirstTimeAppLaunch} from 'store/redux/userSlice';

//Styles, Constants and interfaces
import {
  getDeviceHeight,
  getDeviceWidth,
  getTranslationLabel,
} from 'utils/commonMethods';
import styles from './Onboarding.style';
import {GET} from 'constants/httpConstants';
import {MARKETINGS} from 'services/constants';
import {handleApiError} from 'utils/CommonReduxMethods';
import dummyServerData from 'utils/dummyServerData';
import OnboardingLogo from '../../../assets/icons/onBoardingIcon.svg';
import SubHeader from '@/components/subHeader/subHeader';
import {COLORS} from '@/theme/colors';
import CommonStyles from '@/utils/commonStyle';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from '@/routes/RootNavigation';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

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

  const navigation = useNavigation<RootNavigationProp>();
  const carouselRef = useRef<Carousel<IOnboardingData>>(null);

  const dispatch = useDispatch();

  const backLabel = getTranslationLabel('back');
  const proceedLabel = getTranslationLabel('proceed');
  const nextLabel = getTranslationLabel('next');
  const buttonTheme = {
    roundness: 1,
    colors: {
      onSurface: COLORS.white,
    },
  };
  const rightButtonName =
    activeIndex === dotsData.length - 1 ? proceedLabel : nextLabel;

  const getOnboardingData = async () => {
    try {
      // const result = await NetworkRequest(
      //   GET,
      //   MARKETINGS,
      //   {},
      //   {
      //     headers: {
      //       'skip-token': 'true',
      //       Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
      //     },
      //   },
      // );

      //setOnboardingData(result?.data?.data);
      //const dotsArray = Array.from(Array(result?.data?.data?.length).keys());

      const result: IOnboardingData[] = dummyServerData.marketing.data.data;
      setOnboardingData(result);
      const dotsArray = Array.from(Array(result.length).keys());

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

  //------old code-------
  // return (
  //   <Layout>
  //     <SubHeader showLogo={true} shouldShowCardView={false}>
  //       <View
  //         style={{
  //           height: getDeviceHeight(0.5),
  //           backgroundColor: '#002E33',
  //           alignItems: 'center',
  //         }}>
  //         <OnboardingLogo />
  //       </View>
  //       <View style={{backgroundColor: '#EEF7F9', flex: 1}}>
  //         <View style={CommonStyles.padding16}>
  //           <Text variant="headlineSmall">Welcome!</Text>
  //           <Text variant="bodySmall" style={CommonStyles.marginVertical10}>
  //             Manage all your daily Sales Operations at{'\n'} one place{' '}
  //           </Text>
  //         </View>
  //       </View>

  //       {/*
  //       <Carousel
  //         ref={carouselRef}
  //         data={onboardingData}
  //         sliderWidth={getDeviceWidth()}
  //         itemWidth={getDeviceWidth()}
  //         renderItem={({item, index}) => {
  //           const data = item?.attributes;
  //           return (
  //             <View style={styles.container} key={index}>
  //               <Image source={{uri: data.media}} style={styles.image} />
  //               <Text style={styles.textDescription} variant="bodyMedium">
  //                 {data.description}
  //               </Text>
  //             </View>
  //           );
  //         }}
  //         onSnapToItem={index => setActiveIndex(index)}
  //       /> */}
  //     </SubHeader>
  //     {/* <View style={styles.footerContainer}>
  //       {activeIndex === 0 ? (
  //         <View style={styles.emptyView} />
  //       ) : (
  //         <Text
  //           variant="bodySmall"
  //           onPress={handleLeftButton}
  //           style={styles.buttonTextStyle}>
  //           {backLabel}
  //         </Text>
  //       )}
  //       <View style={styles.dotsContainer}>
  //         {dotsData?.length > 1
  //           ? dotsData.map(item => {
  //               const isActive = activeIndex === item;
  //               return (
  //                 <View
  //                   key={item}
  //                   style={isActive ? styles.activeDot : styles.inActiveDot}
  //                 />
  //               );
  //             })
  //           : null}
  //       </View>

  //       <Text
  //         variant="bodySmall"
  //         onPress={handleRightButton}
  //         style={styles.buttonTextStyle}>
  //         {rightButtonName}
  //       </Text>
  //     </View> */}
  //   </Layout>
  // );

  //------new UI code------
  return (
    <Layout>
      <ScreenHeader showScreenName={false} />
      <OnboardingLogo
        width={'100%'}
        height={'69%'}
        style={{backgroundColor: COLORS.dDarkGreen}}
      />
      <View style={styles.contentView}>
        <View style={CommonStyles.padding16}>
          <Text variant="headlineSmall">
            {getTranslationLabel('welcome')}
            {'!'}
          </Text>
          <Text
            variant="bodySmall"
            style={[CommonStyles.marginVertical10, {color: COLORS.grey}]}>
            {getTranslationLabel('onboardingDescription')}
          </Text>
        </View>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        style={styles.button}
        text={getTranslationLabel('letsBegin')}
        // loading={isLoading}
        onPress={() => {
          navigation.navigate('lSelection');
          // dispatch(updateIsFirstTimeAppLaunch(false));
        }}
      />
    </Layout>
  );
};

export default OnboardingScreens;
