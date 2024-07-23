import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';

import {RootNavigationTypes} from 'routes/RootNavigation';
import Layout from 'components/Layout';
import {getNotificationDetail} from './NotificationDetail.business';

import styles from './NotificationDetail.style';
import {COLORS} from 'theme/colors';
import EllipseDot from '../../../../assets/icons/ellipseDot.svg';
import {INotificationDetail} from './NotificationDetail.interface';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

const NotificationDetail = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'NotificationDetail'>>();

  const [notificationDetail, setNotificationDetail] =
    useState<INotificationDetail>({
      title: '',
      subTitle: '',
      message: '',
      date: '',
    });

  const footerTextTheme = {colors: {onSurface: COLORS.grey2}};

  useEffect(() => {
    getNotificationDetail(route.params.notificationId, setNotificationDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout headerTitle={'Notification Details'}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeadingSection}>
              <Text variant="titleSmall">{notificationDetail.title}</Text>
              <Text variant="labelSmall">{notificationDetail.subTitle}</Text>
            </View>
            <Text variant="labelSmall">{notificationDetail.message}</Text>
          </Card.Content>
        </Card>
        <View style={styles.containerFooter}>
          <Text variant="labelSmall" theme={footerTextTheme}>
            {convertDateToDisplay(
              notificationDetail.date,
              DateFormats.DD_MMM_YY,
            )}
          </Text>
          <EllipseDot fill={COLORS.grey2} />
          <Text variant="labelSmall" theme={footerTextTheme}>
            {convertDateToDisplay(notificationDetail.date, DateFormats.H_MM_A)}
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default NotificationDetail;
