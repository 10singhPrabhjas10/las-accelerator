import {StyleSheet, View,Image} from 'react-native';
import React from 'react';
import {Divider, Text} from 'react-native-paper';

import CustomButton from 'components/button/CustomButton';
import Spacer from 'components/spacer';
import FileCard from 'components/fileCard/FileCard';

import {ButtonTypes} from 'types/buttons';
import {COLORS} from 'theme/colors';
import PictureIcon from './../../../../../../assets/icons/pictureIcon.svg';
import {formatBytes} from 'utils/commonMethods';
import moment from 'moment';
import DeleteIcon from '../../../../../../assets/icons/delete.svg';
import {DateFormats} from 'constants/dateFormat';

export interface IPhotoProps {
  uri: string;
  width: number;
  height: number;
  mime: string;
  name: string | undefined;
  size: number;
  date: string | undefined;
  title?: string;
}

interface IImageUploadProps {
  imageData: IPhotoProps[] | null;
  openBottomSheet: () => void;
  rightIcon?: boolean;
  onRightIconPress?: (index :number) => void;
}

const HelperComponent = () => {
  const textTheme = {colors: {onSurface: COLORS.blue}};
  return (
    <View style={styles.helperContainer}>
      <Text variant="labelSmall" theme={textTheme}>
        {'\u2022'} Acceptable file type: JPEG (or JPG), PNG
      </Text>
      <Text variant="labelSmall" theme={textTheme}>
        {'\u2022'} Maximum file size: 2MB
      </Text>
    </View>
  );
};

const ImageUpload = ({
  imageData,
  openBottomSheet,
  rightIcon = false,
  onRightIconPress,
}: IImageUploadProps) => {
  function getTodaysDate() {
    return moment().format(DateFormats.DD_MMM_YY_2);
  }

  return (
    <View>
      <Spacer size={10} />
      <CustomButton
        text="Upload"
        isDisabled={imageData?.length !== 0}
        type={ButtonTypes.contained}
        onPress={openBottomSheet}
      />
      {imageData?.length !== 0 ? (
        imageData?.map((img,index) => {
          return (
            <FileCard
              leftIcon={<Image source={{ uri: img?.uri }} style={styles.image}/>}
              fileName={img?.name ?? img?.title ?? 'Product Image.jpg'}
              fileSize={formatBytes(img?.size)}
              fileDate={getTodaysDate()}
              key={img?.uri}
              rightIcon={
                rightIcon && (
                  <DeleteIcon
                    fill={COLORS.red2}
                    height={24}
                    width={24}
                    onPress={()=>onRightIconPress(index)}
                  />
                )
              }
            />
          );
        })
      ) : (
        <HelperComponent />
      )}
      <Spacer size={5} />
      <Divider />
      <Spacer size={10} />
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  helperContainer: {padding: 10},
  image: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: COLORS.semanticRed,
    borderRadius: 3,
  },
});
