import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../theme/colors'; // Adjust import as per your project structure
import {widthToRatio, heightToRatio} from '../../utils/commonMethods';
import PencilIcon from '@/../assets/icons/pencil.svg';
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
  console.log(title);
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
                style={{
                  height: heightToRatio(50),
                  width: heightToRatio(50),
                  borderRadius: heightToRatio(25),
                }}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.avatarText}>{initials()}</Text>
            )}
          </View>
          <View style={styles.pencilIconContainer}>
            <PencilIcon height={heightToRatio(40)} width={heightToRatio(40)} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={CommonStyles.flexRow}>
          <View style={styles.avatar}>
            {imageUrl ? (
              <Image
                source={{uri: imageUrl}}
                style={{
                  height: heightToRatio(40),
                  width: heightToRatio(40),
                  borderRadius: heightToRatio(20),
                }}
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
    height: heightToRatio(50),
    width: heightToRatio(50),
    borderRadius: heightToRatio(25),
    backgroundColor: COLORS.neutralLight,
    alignItems: 'center',
    justifyContent: 'center',
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
    left: widthToRatio(24),
    bottom: -18,
  },
});

export default ProfileSubHeader;
