import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import Notification_Img from '@/../assets/icons/notificationIcon.svg';

interface NotificationIconWithDotProps {
  hasNotifications: boolean;
  color: string;
}

const NotificationIconWithDot = ({
  hasNotifications,
  color,
}: NotificationIconWithDotProps) => (
  <View>
    <Notification_Img color={color} />
    {hasNotifications && <View style={styles.notificationDot} />}
  </View>
);

export default NotificationIconWithDot;
