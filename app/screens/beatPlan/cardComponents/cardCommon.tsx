import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import CardWrapper from 'components/card/Card';
import {COLORS} from '@/theme/colors';

import styles from './cardCommon.style';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import PendingImg from '@/../assets/icons/beatPlan_pending_img.svg';
import CompletedImg from '@/../assets/icons/beatPlan_check_circle.svg'
import PhoneImg from '@/../assets/icons/phoneGreenImg.svg';
import CommonStyles from '@/utils/commonStyle';
import {callNumber} from '@/utils/commonMethods';

interface CardCommonProps {
  infoContainer: JSX.Element;
  name: string;
  address: string;
  distance: string;
  time: string;
  detailsContainer: JSX.Element;
  number: string;
  customStyle?: StyleProp<ViewStyle>;
  status: string;
}

const CurrentStatus = ({ status }) => { 
  const StatusImage = status === 'pending' ? <PendingImg /> : <CompletedImg />;
  const StatusText = status === 'pending' ? 'Pending' : 'Completed';
  const statusTextColor = status === 'pending' ? COLORS.orange : COLORS.green;
  return ( 
  <View style={styles.statusContainer}>
    {StatusImage}
    <Text style={[styles.statusText, {color: statusTextColor}]}>{StatusText}</Text> 
  </View> 
  ); 
};

const CardCommon = ({
  infoContainer,
  name,
  address,
  distance,
  time,
  number,
  detailsContainer,
  customStyle = {},
  status,
}: CardCommonProps) => {
  return (
    <CardWrapper cardStyle={customStyle}>
      <View>
        <View style={styles.infoContainer}>
          <View style={CommonStyles.flexRow}>
            {infoContainer}
            <View style={styles.infoTextContainer}>
              <Text variant="titleMedium" style={styles.nameText}>
                {name}
              </Text>
              <Text variant="labelLarge" style={styles.addressText}>
                {address}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.phoneimageContainer}
            onPress={() => {
              callNumber(number);
            }}>
            <PhoneImg />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          {detailsContainer} 
          <CurrentStatus status={status} /> 
        </View>
        {/* <CustomButton
            type={ButtonTypes.outline}
            text="Check In"
            style={styles.checkInButton}
            textStyle={styles.checkInButtonText}
            onPress={() => {}}
          /> */}
      </View>
    </CardWrapper>
  );
};

export default CardCommon;
