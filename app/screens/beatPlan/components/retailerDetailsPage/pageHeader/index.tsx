import React from 'react';
import {Text} from 'react-native-paper';
import {View, Image, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {COLORS} from '@/theme/colors';
import Card from '@/components/card/Card';
import UserImg from '@/../assets/icons/user.svg';
import HeaderVector from '@/../assets/icons/retailerDetails_headerVector.svg';
import DotsThreeVerticleImg from '@/../assets/icons/DotsThreeVertical.svg';

interface RetailerDetailsPageHeaderProps {
  status: 'active' | 'inactive';
  image: string | null;
  name: string;
  retailerId: string;
}

const CurrentUserStatus = ({status}: {status: 'active' | 'inactive'}) => {
  const UserStatusText = status === 'inactive' ? 'Inactive' : 'Active';
  const userStatusTextColor = status === 'inactive' ? COLORS.red : COLORS.green;
  return (
    <View style={styles.userStatusContainer}>
      <Text
        variant="labelMedium"
        style={[styles.userStatusText, {color: userStatusTextColor}]}>
        {UserStatusText}
      </Text>
    </View>
  );
};

function RetailerDetailsPageHeader({
  status,
  image,
  name,
  retailerId,
}: RetailerDetailsPageHeaderProps) {
  return (
    <View style={styles.userInfoContainer}>
      <HeaderVector style={styles.headerVector} />
      <Card cardStyle={styles.userInfoCard}>
        <CurrentUserStatus status={status} />
        <View style={styles.userInfoContents}>
          <View style={styles.userImageContainer}>
            {image ? (
              <Image
                style={styles.userImage}
                source={typeof image === 'string' ? {uri: image} : image}
              />
            ) : (
              <UserImg width={32} height={32} />
            )}
          </View>
          <View style={styles.userTextContainer}>
            <Text variant="titleMedium" style={styles.userTextHeading}>
              {name}
            </Text>
            <Text variant="labelLarge" style={styles.userTextSubHeading}>
              Retailer Id: {retailerId}
            </Text>
          </View>
          <TouchableOpacity style={styles.dotThreeVerticle} onPress={() => {}}>
            <DotsThreeVerticleImg />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export default RetailerDetailsPageHeader;
