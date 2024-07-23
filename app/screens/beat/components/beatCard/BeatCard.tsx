import {View} from 'react-native';
import React from 'react';
import {Card, Divider, Text} from 'react-native-paper';
import LocationPinIcon from '../../../../../assets/icons/locationPin.svg';
import OutgoingCallIcon from '../../../../../assets/icons/outgoingCall.svg';
import {COLORS} from 'theme/colors';
import {
  callNumber,
  formatNumberWithCommas,
  openMaps,
} from 'utils/commonMethods';
import styles from './BeatCard.style';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';

import ArrowRightIcon from '../../../../../assets/icons/storeCheck.svg';
import RowItem from 'components/rowItem/RowItem';
import CommonStyles from 'utils/commonStyle';
import {EMPTY_DATA_DASH} from 'utils/Constants';

interface IBeatCardProps {
  title: string;
  subTitle: string;
  address: string;
  checkIn?: boolean;
  checkInDisabled?: boolean;
  orderCard?: boolean;
  orderTaken?: number;
  orderValue?: number;
  onCheckInPress?: () => void;
  onEditPress?: () => void;
  screenName?: string;
  mobileNumber: string;
  geoLocation: string;
  subActivity?: string | null;
  latitude: number;
  longitude: number;
}

const BeatCard = ({
  title,
  subTitle,
  address,
  checkIn = false,
  checkInDisabled = false,
  orderCard = false,
  orderTaken,
  orderValue = 0,
  screenName,
  mobileNumber,
  geoLocation,
  subActivity,
  latitude,
  longitude,
  onEditPress = () => {},
  onCheckInPress = () => {},
}: IBeatCardProps) => {
  const rightContent = () => {
    return (
      <View style={styles.rightContent}>
        <LocationPinIcon onPress={() => openMaps(latitude, longitude)} />
        <OutgoingCallIcon onPress={() => callNumber(`+91 ${mobileNumber}`)} />
      </View>
    );
  };

  return (
    <Card style={styles.cardContainer} elevation={0}>
      <View style={styles.cardTitleView}>
        <View style={CommonStyles.flexColumn}>
          <Text style={{color: COLORS.grey2}} variant="bodySmall">
            {title}
          </Text>
          <Text style={styles.subTitle} variant="titleMedium">
            {subTitle}
          </Text>
          {subActivity !== null && (
            <Text style={{}} variant="bodySmall">
              {subActivity}
            </Text>
          )}
        </View>
        {rightContent()}
      </View>

      <Divider style={styles.divider} />
      <Card.Content style={styles.cardContent}>
        <LocationPinIcon color={COLORS.black} />
        <View style={styles.addressView}>
          <Text style={styles.text} variant="bodySmall">
            Address
          </Text>
          <View style={styles.addressSubView}>
            <Text
              style={styles.flexWrap}
              numberOfLines={3}
              variant="bodyMedium">
              {address}
            </Text>
          </View>
        </View>
      </Card.Content>
      {orderCard && (
        <View style={styles.orderCard}>
          <Divider style={styles.orderDivider} />
          <RowItem
            showDivider={false}
            keyContent={'Order Taken'}
            value={orderTaken ?? EMPTY_DATA_DASH}
          />
          <Divider style={styles.orderDivider} />
          <RowItem
            showDivider={false}
            keyContent={'Order Value'}
            value={
              orderValue >= 0
                ? `₹ ${formatNumberWithCommas(orderValue)}`
                : EMPTY_DATA_DASH
            }
          />
        </View>
      )}
      {checkIn && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.customButton}>
            <CustomButton
              type={ButtonTypes.outline}
              style={CommonStyles.flexOne}
              text={checkInDisabled ? 'Check-In Completed' : 'Check-In'}
              onPress={onCheckInPress}
              icon={<ArrowRightIcon width={16} height={16} />}
              isDisabled={checkInDisabled}
            />
            <CustomButton
              type={ButtonTypes.outline}
              text={'Edit'}
              onPress={onEditPress}
              icon={<ArrowRightIcon width={16} height={16} />}
              isDisabled={!checkInDisabled ? true : false}
            />
          </View>
        </>
      )}
    </Card>
  );
};

export default BeatCard;
