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

import styles from './cardCommon.style';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

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
}

const CardCommon = ({
  infoContainer,
  name,
  address,
  distance,
  time,
  number,
  detailsContainer,
  customStyle = {},
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
          <CustomButton
            type={ButtonTypes.outline}
            text="Check In"
            style={styles.checkInButton}
            textStyle={styles.checkInButtonText}
            onPress={() => {}}
          />
        </View>
      </View>
    </CardWrapper>
  );
};

export default CardCommon;
