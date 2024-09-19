import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../theme/colors'; // Adjust import as per your project structure
import {widthToRatio, heightToRatio} from '../../utils/commonMethods';
import PencilIcon from '@/../assets/icons/pencilGray.svg';
import CommonStyles from '../../utils/commonStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HeaderProps {
  title?: string;
  imageUrl?: string;
  imageUploadHandler?: any;
  children?: ReactNode;
  isImageEdit?: boolean;
}

const ProfileSubHeader: React.FC<HeaderProps> = ({
  title,
  imageUrl,
  isImageEdit,
  imageUploadHandler,
  children,
}) => {
  const initials = (): string => {
    if (title) {
      return title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    }
    return '';
  };
  console.log(imageUrl);
  return (
    <View style={styles.container}>
      {isImageEdit ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={CommonStyles.flexRow}
          onPress={imageUploadHandler}>
          <View style={styles.avatar}>
            {imageUrl ? (
              <Image
                source={{uri: imageUrl}}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.avatarText}>{initials()}</Text>
            )}
          </View>
          <View style={styles.pencilIconContainer}>
            <PencilIcon height={heightToRatio(15)} width={heightToRatio(15)} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={CommonStyles.flexRow}>
          <View style={styles.avatar}>
            {imageUrl ? (
              <Image
                source={{uri: imageUrl}}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.avatarText}>{initials()}</Text>
            )}
          </View>
        </View>
      )}
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: widthToRatio(24),
    marginTop: heightToRatio(6),
    flexDirection: 'row',
  },

  childrenContainer: {
    marginLeft: widthToRatio(24),
    flexDirection: 'row',
  },
  avatar: {
    height: heightToRatio(56),
    width: heightToRatio(56),
    borderRadius: heightToRatio(28),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: heightToRatio(56),
    width: heightToRatio(56),
    borderRadius: heightToRatio(28),
  },
  avatarText: {
    color: '#000',
  },
  titleTextContainer: {
    flexDirection: 'column',
    marginLeft: widthToRatio(16),
  },
  pencilIconContainer: {
    position: 'absolute',
    height: heightToRatio(24),
    width: heightToRatio(24),
    borderRadius: heightToRatio(12),
    backgroundColor: COLORS.neutralLight,
    // left: widthToRatio(24),
    right: -10,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileSubHeader;
