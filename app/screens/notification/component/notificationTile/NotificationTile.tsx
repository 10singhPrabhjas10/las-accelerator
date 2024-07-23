// External Dependencies
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// Internal Dependencies

// Styles, constants and Interfaces
import styles from './NotificationTile.style';
import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import {INotificationList} from 'screens/notification/notificationList/NotificationList.interface';
import {convertDateToDisplay} from 'utils/commonMethods';
import {RootNavigationProp} from 'routes/RootNavigation';
import {DateFormats} from 'constants/dateFormat';

interface INotificationTileProps {
  props: INotificationList;
}

const NotificationTile = ({props}: INotificationTileProps) => {
  const {icon, title, subTitle, date, message, isRead, id} = props;

  const navigation = useNavigation<RootNavigationProp>();

  const greyTextTheme = {colors: {onSurface: COLORS.grey2}};
  const blackTextTheme = {colors: {onSurface: COLORS.black}};

  return (
    <View style={styles.container} key={id}>
      <View
        style={[
          styles.containerIcon,
          isRead ? styles.disabledIcon : styles.enabledIcon,
        ]}>
        <Image source={{uri: icon}} style={styles.icon} />
      </View>
      <TouchableOpacity
        style={CommonStyles.flexOne}
        onPress={() =>
          navigation.navigate('NotificationDetail', {
            notificationId: id,
          })
        }>
        <View style={styles.heading}>
          <Text
            variant="headlineSmall"
            theme={isRead ? greyTextTheme : blackTextTheme}>
            {title}
          </Text>
          <Text variant="labelSmall" theme={greyTextTheme}>
            {convertDateToDisplay(date, DateFormats.DD_MMM)}
          </Text>
        </View>
        <Text
          variant="labelSmall"
          theme={isRead ? greyTextTheme : blackTextTheme}
          style={styles.subTitle}>
          {subTitle}
        </Text>
        <Text
          variant="labelSmall"
          theme={greyTextTheme}
          numberOfLines={2}
          ellipsizeMode="tail">
          {message}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationTile;
