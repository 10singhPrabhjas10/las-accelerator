import {
  Dimensions,
  Linking,
  PermissionStatus,
  PermissionsAndroid,
  PixelRatio,
  Platform,
  ViewStyle,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import ImagePicker, {Image} from 'react-native-image-crop-picker';

import {INDIAN_MOBILE_REGEX} from './Constants';
import {DateFormats} from 'constants/dateFormat';
import moment from 'moment';
import ReactNativeBlobUtil from 'react-native-blob-util';
import notifee, {AndroidImportance} from '@notifee/react-native';
import Share from 'react-native-share';
import {store} from 'store/redux/store';
import appStringsLocal from './appStringsLocal';

export const callNumber = (phone: string) => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }

  return Linking.openURL(phoneNumber);
};

export const sendMail = () => {
  return Linking.openURL('mailto:info@abc.com');
};

export const secondsToMinutes = (time: number) => {
  return (
    Math.floor(time / 60) + ':' + (time < 10 ? '0' : '') + Math.floor(time % 60)
  );
};

export const getDeviceWidth = (ratio = 1) =>
  Dimensions.get('window').width * ratio;
export const getDeviceHeight = (ratio = 1) =>
  Dimensions.get('window').height * ratio;

export const window = Dimensions.get('window');

export const screenRect = {
  height: window.height,
  width: window.width,
};

export const isIOS = Platform.OS === 'ios';

export const isIPhoneX = () => {
  const iPhoneXFlag = screenRect.height === 375 && screenRect.width === 812;
  const iPhone12Flag = screenRect.height === 844 && screenRect.width === 390;
  return isIOS && (iPhoneXFlag || iPhone12Flag);
};

const scale = screenRect.width / 320;

export const getNormalizeFontSize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const getCameraPermission = async () => {
  try {
    const granted: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');

      return 'granted';
    } else {
      console.log('Camera permission denied');

      return 'Camera permission denied';
    }
  } catch (err) {
    console.warn(err);
    return '';
  }
};

export const isMobileNumberValid = (mobileNumber: string) => {
  return mobileNumber.length === 10 && mobileNumber.match(INDIAN_MOBILE_REGEX);
};
const showEnableLocationAlert = async () => {
  //ask user to open setting manually and allow location service
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    } else if (status === 'denied') {
      const enableLocationServices = await showEnableLocationAlert();
      return enableLocationServices;
    } else {
      return false;
    }
  } else if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<F>): void => {
    const later = () => {
      clearTimeout(timeoutId);
      func(...args);
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
  };
};

export const getLocation = async () => {
  try {
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } else {
      throw new Error('Location permission not granted');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function convertRupeesIntoLakhs(number: number) {
  return Number((number / 100000).toFixed(2));
}

export function convertInLakhsRupees(number: number) {
  if (number < 0) {
    return '-' + `₹${convertRupeesIntoLakhs(Math.abs(number))}L`;
  } else {
    return `₹${convertRupeesIntoLakhs(number)}L`;
  }
}

export function convertNumberToRupees(number: number) {
  if (number < 0) {
    return '-' + `₹${number.toLocaleString()}`;
  } else {
    return `₹${number.toLocaleString()}`;
  }
}

export const convertDateToDisplay = (
  date: string | Date,
  format: string = DateFormats.DD_MM_YYYY,
) => {
  return moment(new Date(date)).format(format);
};

export const formatDate = (dateString: string) => {
  const date = dateString ? moment(dateString) : moment();
  return date.format(DateFormats.Do_MMMM_YYYY);
};

export const reFormatDate = (dateString: string) => {
  const parsedDate = moment(dateString, DateFormats.Do_MMMM_YYYY);
  return parsedDate.format(DateFormats.DD_MM_YYYY_);
};

export const openMaps = (lat: number, lng: number) => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url as string);
};

export const convertBytesToMB = (bytes: number) => {
  return Number((bytes / (1024 * 1024)).toFixed(2)); // Convert bytes to MB with 2 decimal places
};

export const formatBytes = (a: number, b = 2) => {
  if (!+a) {
    return '0 Bytes';
  }
  const c = b < 0 ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][d]
  }`;
};

export const formatUnixTimestamp = (timestamp: string) => {
  const timestampNumber = parseInt(timestamp, 10);
  return moment.unix(timestampNumber).format("DD MMM 'YY");
};

export const formatNumberWithCommas = (data: number) => {
  return data.toLocaleString('en-IN');
};

export const openDownloadedFile = (filePath: string) => {
  //TODO: Android working, iOS has bug
  if (Platform.OS === 'android') {
    ReactNativeBlobUtil.android.actionViewIntent(filePath, 'application/pdf');
  }
  if (Platform.OS === 'ios') {
    ReactNativeBlobUtil.ios.openDocument(filePath);
  }
};

export const shareFile = async (fileName: string, filePath: string) => {
  await Share.open({
    title: fileName,
    url: `file://${filePath}`,
    message: fileName,
    type: 'application/pdf',
  });
};

export const downloadPdf = async (
  data: {title: string; versionData: any},
  channelId?: string,
  isShare?: boolean,
) => {
  const docPath = ReactNativeBlobUtil.fs.dirs;

  const directory = isIOS ? docPath.DocumentDir : docPath.DownloadDir;

  const fileName = `${data.title}.pdf`;
  const filePath = `${directory}/${fileName}`;

  const isExist = await ReactNativeBlobUtil.fs.exists(filePath);

  if (isExist) {
    if (isShare) {
      shareFile(fileName, filePath);
    } else {
      openDownloadedFile(filePath);
    }
  } else {
    ReactNativeBlobUtil.fs
      .createFile(filePath, data?.versionData, 'base64')
      .then(async () => {
        await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: fileName,
            parentFolder: '',
            mimeType: 'application/pdf',
          },
          'Download',
          filePath,
        );
        if (isShare) {
          shareFile(fileName, filePath);
        } else {
          openDownloadedFile(filePath);
          const channelId = await notifee.createChannel({
            id: 'important',
            name: 'Important Notifications',
            importance: AndroidImportance.HIGH,
          });

          notifee.displayNotification({
            title: 'Download Successful!',
            body: '',
            android: {
              channelId,
              importance: AndroidImportance.HIGH,
            },
          });
        }
      })
      .catch(error => console.error('Error downloading PDF:', error));
  }
};

export const downloadPdfWithUrl = async (
  data: {title: string; url: any},
  isShare?: boolean,
) => {
  const docPath = ReactNativeBlobUtil.fs.dirs;
  const directory = isIOS ? docPath.DocumentDir : docPath.DownloadDir;
  const fileName = data.title;
  const filePath = `${directory}/${data?.title}`;

  const isExist = await ReactNativeBlobUtil.fs.exists(filePath);
  if (isExist) {
    if (isShare) {
      shareFile(fileName, filePath);
    } else {
      openDownloadedFile(filePath);
    }
  } else {
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: filePath,
    })
      .fetch('GET', data?.url)
      .then(async () => {
        const channelId = await notifee.createChannel({
          id: 'important',
          name: 'Important Notifications',
          importance: AndroidImportance.HIGH,
        });
        if (isShare) {
          shareFile(fileName, filePath);
        } else {
          openDownloadedFile(filePath);
          const channelId = await notifee.createChannel({
            id: 'important',
            name: 'Important Notifications',
            importance: AndroidImportance.HIGH,
          });

          notifee.displayNotification({
            title: 'Download Successful!',
            body: '',
            android: {
              channelId,
              importance: AndroidImportance.HIGH,
            },
          });
        }
      })
      .catch(error => console.log(error));
  }
};

export function formatNumber(number: number) {
  if (number >= 10000000) {
    // 1 Crore or more
    return (number / 10000000).toFixed(1) + 'Cr';
  } else if (number >= 100000) {
    // 1 Lakh or more
    return (number / 100000).toFixed(1) + 'L';
  } else if (number >= 1000) {
    // 1 Thousand or more
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}

export function numberToWords(num: number): string {
  const singleDigits: string[] = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens: string[] = [
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens: string[] = [
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  function convertToWords(n: number): string {
    if (n < 10) {
      return singleDigits[n];
    }
    if (n < 20) {
      return teens[n - 11];
    }
    if (n < 100) {
      return (
        tens[Math.floor(n / 10) - 1] +
        (n % 10 === 0 ? '' : ' ' + singleDigits[n % 10])
      );
    }
    if (n < 1000) {
      return (
        singleDigits[Math.floor(n / 100)] +
        ' hundred' +
        (n % 100 === 0 ? '' : ' and ' + convertToWords(n % 100))
      );
    }

    if (n < 100000) {
      return (
        convertToWords(Math.floor(n / 1000)) +
        ' thousand' +
        (n % 1000 === 0 ? '' : ' ' + convertToWords(n % 1000))
      );
    }
    if (n < 10000000) {
      return (
        convertToWords(Math.floor(n / 100000)) +
        ' lakh' +
        (n % 100000 === 0 ? '' : ' ' + convertToWords(n % 100000))
      );
    }
    return (
      convertToWords(Math.floor(n / 10000000)) +
      ' crore' +
      (n % 10000000 === 0 ? '' : ' ' + convertToWords(n % 10000000))
    );
  }

  function convertFractionToWords(n: number): string {
    return n < 10 ? singleDigits[n] : convertToWords(n);
  }

  let integerPart: number = Math.floor(num);
  let fractionalPart: number = Math.round((num - integerPart) * 100);

  let integerPartInWords: string = convertToWords(integerPart);
  let fractionalPartInWords: string =
    fractionalPart > 0
      ? ' and ' + convertFractionToWords(fractionalPart) + ' paise'
      : '';

  return (integerPartInWords + fractionalPartInWords).toUpperCase();
}

export const getNotificationFilterDateDropDown = () => {
  const currentDate = new Date();
  let yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  let sevenDaysBack = new Date(currentDate);
  sevenDaysBack.setDate(currentDate.getDate() - 6);
  return [
    {
      value: 'today',
      label: `Today (${convertDateToDisplay(
        currentDate.toString(),
        DateFormats.DD_MMM_YY,
      )})`,
    },
    {
      value: 'yesterday',
      label: `Yesterday (${convertDateToDisplay(
        yesterday.toString(),
        DateFormats.DD_MMM_YY,
      )})`,
    },
    {
      value: 'last week',
      label: `Last Week (${convertDateToDisplay(
        sevenDaysBack.toString(),
        DateFormats.DD_MMM_YY,
      )} - ${convertDateToDisplay(
        currentDate.toString(),
        DateFormats.DD_MMM_YY,
      )})`,
    },
    {
      value: 'Custom Range',
      label: 'Custom Range',
    },
  ];
};

export const getTranslationLabel = (key: string) => {
  const translations = store.getState().localization.translations;
  // const translations = appStringsLocal.hi;
  const translation = translations?.find((element: any) => element.key === key);
  return translation?.label || '';
};

export const getTranslationDynamicLabel = (key: string) => {
  const translations = store.getState().localization.translations;
  const translation = translations?.find((element: any) => element.key === key);

  return {
    label: translation?.label || '',
    startTextLabel:
      translation?.label.substring(
        0,
        translation.label.indexOf(translation?.dynamicText),
      ) || '',
    highlightTextLabel: translation?.dynamicText || '',
    endTextLabel:
      translation?.label?.substring(
        translation.label.indexOf(translation?.dynamicText) +
          translation?.dynamicText?.length,
      ) || '',
  };
};

export const currentYearShort = moment().format('YY');
export const currentMonthShort = moment().format('MMM');

export const widthToRatio = (pixel: number): number => {
  const {width: screenWidth} = Dimensions.get('window');
  const ratio = screenWidth / 360;
  return ratio * pixel;
};
export const heightToRatio = (pixel: number): number => {
  const {height: screenHeight} = Dimensions.get('window');
  const ratio = screenHeight / 800;
  return ratio * pixel;
};

export const pickFromCamera = (isCropImage: boolean) => {
  ImagePicker.openCamera({
    width: 300,
    mediaType: 'photo',
    height: 300,
    cropping: isCropImage,
    includeBase64: true,
    compressImageQuality: 0.7,
    includeExif: true,
  })
    .then((image: Image) => {
      console.log('imageCamera', image);
      return image;
    })
    .catch(e => console.log(e));
};

export const pickFromGallery = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    multiple: false,
    cropping: true,
    includeBase64: true,
    compressImageQuality: 0.7,
    includeExif: true,
  })
    .then((image: Image) => {
      return image;
    })
    .catch(e => console.log(e));
};
