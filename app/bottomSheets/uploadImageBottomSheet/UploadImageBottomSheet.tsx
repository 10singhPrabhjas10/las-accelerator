import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {Alert, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ImagePicker, {Image, ImageOrVideo} from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';

import styles from './UploadImageBottomSheet.style';
import {COLORS} from 'theme/colors';
import CameraIcon from './../../../assets/icons/camera.svg';
import GalleryIcon from './../../../assets/icons/gallery.svg';
import DeleteIcon from './../../../assets/icons/deleteFile.svg';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  convertBytesToMB,
  getCameraPermission,
  getTranslationLabel,
} from 'utils/commonMethods';
import {showSnackbar} from 'store/redux/snackbarSlice';
import {SnackBarEnum} from 'constants/modalTypes';
import {requestCameraPermission} from 'utils/Permissions';
import {IPhotoProps} from 'screens/beat/StoreCheckIn/components/imageUpload/ImageUpload';

interface IOptionsBottomSheetProps {
  visible: boolean;
  setPhoto: Dispatch<SetStateAction<IPhotoProps | null>>;
  onDismiss: () => void;
  showDeleteOption?: boolean;
  showGalleryOption?: boolean;
}

const UploadImageBottomSheet = ({
  visible,
  onDismiss,
  setPhoto,
  showDeleteOption = false,
  showGalleryOption = false,
}: IOptionsBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  const snapPoints = useMemo(() => ['35%', '35%'], []);

  useEffect(() => {
    visible && bottomSheetModalRef.current?.present();
    onDismiss();
    requestCameraPermission();
  }, [onDismiss, visible]);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={CommonStyles.overlay}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const uploadFromCamera = async () => {
    pickFromCamera(false);
  };

  const uploadFromGallery = async () => {
    pickFromGallery();
  };

  const setPhotoData = (image: Image) => {
    if (convertBytesToMB(image.size) < 2) {
      setPhoto({
        uri: `data:${image.mime};base64,` + image.data,
        width: image.width,
        height: image.height,
        mime: image.mime,
        name: image.filename,
        size: image.size,
        date: image.creationDate ?? image?.modificationDate,
      });
    } else {
      dispatch(
        showSnackbar({
          isVisible: true,
          text: getTranslationLabel('image_upload_size'),
          type: SnackBarEnum.ERROR,
        }),
      );
    }
  };

  // const pickFromCamera = (isCropImage: boolean) => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     mediaType: 'photo',
  //     height: 300,
  //     cropping: isCropImage,
  //     includeBase64: true,
  //     compressImageQuality: 0.7,
  //     includeExif: true,
  //   })
  //     .then((image: Image) => {
  //       setPhotoData(image);
  //     })
  //     .catch(e => console.log(e))
  //     .finally(() => bottomSheetModalRef.current?.close());
  // };

  type CameraOptions = {
    width?: number;
    height?: number;
    mediaType: MediaType;
    cropping?: boolean;
    includeBase64?: boolean;
    compressImageQuality?: number;
    includeExif?: boolean;
  };

  const pickFromCamera = async (isCropImage: boolean): Promise<void> => {
    const options: CameraOptions = {
      width: 300,
      height: 300,
      mediaType: 'photo',
      cropping: isCropImage,
      includeBase64: true,
      compressImageQuality: 0.7,
      includeExif: true,
    };

    try {
      const permissionResult = await getCameraPermission();
      if (permissionResult === 'granted') {
        const image = await ImagePicker.openCamera({
          ...options,
          useFrontCamera: true,
          freeStyleCropEnabled: false,
        });

        setPhotoData(image);
      } else {
        Alert.alert(permissionResult);
      }
    } catch (err) {
      console.error('Error taking selfie:', err);
    } finally {
      bottomSheetModalRef.current?.close();
    }
  };

  const pickFromGallery = () => {
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
        setPhotoData(image);
      })
      .catch(e => console.log(e))
      .finally(() => bottomSheetModalRef.current?.close());
  };

  const removeFile = () => {
    setPhoto(null);
    bottomSheetModalRef.current?.close();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        enablePanDownToClose
        onDismiss={() => bottomSheetModalRef.current?.close()}
        snapPoints={snapPoints}>
        <View style={styles.container}>
          <View style={styles.bottomSheetCard}>
            <Card style={styles.cardBackground} onPress={uploadFromCamera}>
              <Card.Content style={styles.cardContent}>
                <CameraIcon />
                <Text variant="bodyMedium" style={styles.cardItemText}>
                  {getTranslationLabel('camera')}
                </Text>
              </Card.Content>
            </Card>
            {!showGalleryOption && (
              <Card style={styles.cardBackground} onPress={uploadFromGallery}>
                <Card.Content style={styles.cardContent}>
                  <GalleryIcon />
                  <Text variant="bodyMedium" style={styles.cardItemText}>
                    {getTranslationLabel('gallery')}
                  </Text>
                </Card.Content>
              </Card>
            )}
            {showDeleteOption ? (
              <Card style={styles.cardBackground} onPress={removeFile}>
                <Card.Content style={styles.cardContent}>
                  <DeleteIcon fill={COLORS.darkOrange2} />
                  <Text variant="bodyMedium" style={styles.cardItemText}>
                    {getTranslationLabel('delete')}
                  </Text>
                </Card.Content>
              </Card>
            ) : null}
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default UploadImageBottomSheet;
