import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import React, {RefObject} from 'react';
import {Modal, View, StyleSheet, StatusBar} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';

type Props = {
  visible: boolean;
  imageUri: string;
  cropViewRef: RefObject<CropView>;
  onDone: () => void;
  onCancel: () => void;
  onImageCrop: (uri: string) => void;
};

const ImageCropperModal = ({
  visible,
  imageUri,
  cropViewRef,
  onDone,
  onCancel,
  onImageCrop,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      presentationStyle="overFullScreen">
      <StatusBar hidden />
      <View style={styles.container}>
        <CropView
          sourceUrl={imageUri}
          style={styles.cropView}
          ref={cropViewRef}
          onImageCrop={res => onImageCrop(res.uri)}
          keepAspectRatio
          aspectRatio={{width: 1, height: 1}}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Cancel"
            onPress={onCancel}
            type={ButtonTypes.text}
          />
          <CustomButton
            text="Rotate"
            onPress={() => cropViewRef.current?.rotateImage(true)}
            type={ButtonTypes.text}
          />
          <CustomButton text="Done" onPress={onDone} type={ButtonTypes.text} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cropView: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ImageCropperModal;
