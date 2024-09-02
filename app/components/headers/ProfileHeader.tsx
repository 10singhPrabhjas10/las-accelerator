import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS} from 'theme/colors';
import {Card, Text} from 'react-native-paper';
import UserIcon from '../../../assets/icons/user.svg';
import EditIcon from '../../../assets/icons/edit.svg';

interface IProfileHeader {
  personIconSize?: number;
  cardContainerStyle?: ViewStyle;
  header?: string;
  title?: string;
  stylesDescriptionView?: ViewStyle;
  subTitle?: string;
  children?: ReactNode;
  imageUri?: object | undefined | any;
  isEdit?: boolean;
  onEditIconPress?: () => void;
  customProfileViewStyle?: ViewStyle;
  customCardStyle?: ViewStyle;
  rightIcon?: ReactNode;
  rightIconOnPress?: () => void;
}

const ProfileHeader = ({
  personIconSize = 35,
  cardContainerStyle,
  header = '',
  title = '',
  subTitle = '',
  isEdit = false,
  imageUri,
  onEditIconPress,
  children = <></>,
  customProfileViewStyle,
  stylesDescriptionView: stylesDescriptionView,
  customCardStyle,
  rightIcon,
  rightIconOnPress,
}: IProfileHeader) => {
  return (
    <Card style={[styles.cardBackground, customCardStyle]}>
      <Card.Content>
        <View style={[styles.container, cardContainerStyle]}>
          <View style={[styles.userIcon, customProfileViewStyle]}>
            {imageUri?.uri ? (
              <Image style={styles.profileView} source={imageUri} />
            ) : (
              <View style={styles.profileIcon}>
                <UserIcon height={personIconSize} width={personIconSize} />
              </View>
            )}
            {isEdit && (
              <TouchableOpacity
                style={styles.editIcon}
                onPress={onEditIconPress}>
                <EditIcon />
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.cardRightContainer, stylesDescriptionView]}>
            <View style={styles.textContainer}>
              {header && <Text variant="headlineSmall">{header}</Text>}
              {title && <Text variant="bodyMedium">{title}</Text>}
              {subTitle && <Text variant="bodySmall">{subTitle}</Text>}
            </View>
            {rightIcon ? (
              <TouchableOpacity onPress={rightIconOnPress}>
                {rightIcon}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
        {children}
      </Card.Content>
    </Card>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: COLORS.white,
    borderRadius: 0,
    shadowColor: COLORS.white,
  },
  editIcon: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.backgroundDgreen,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.white,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.lightGrey2,
    borderRadius: 80,
  },
  profileIcon: {
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    backgroundColor: COLORS.lightGrey2,
    borderRadius: 80,
    borderColor: COLORS.lightGrey,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  cardRightContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
});
