/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {callNumber, sendMail} from 'utils/commonMethods';
import {HELP_SUPPORT_MAIL, HELP_SUPPORT_NUMBER} from 'utils/Constants';
import styles from './ContactFooter.style';
import CallIcon from '../../../assets/icons/callIcon.svg';
import EmailIcon from '../../../assets/icons/emailIcon.svg';
interface IContactFooterProps {
  isModalView?: boolean;
  is0PaddingHorizontal?: boolean;
}

const ContactFooter = ({
  isModalView,
  is0PaddingHorizontal,
}: IContactFooterProps) => {
  const textTheme = {colors: {onSurface: COLORS.darkBlue}};

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isModalView ? 'column' : 'row',
          paddingHorizontal: is0PaddingHorizontal ? 0 : 20,
        },
      ]}>
      <Pressable
        style={[styles.childContainer, {paddingBottom: isModalView ? 20 : 0}]}
        onPress={() => callNumber(HELP_SUPPORT_NUMBER)}>
        <CallIcon height={20} width={20} />
        <Text variant="bodyMedium" theme={textTheme} style={styles.text}>
          {HELP_SUPPORT_NUMBER}
        </Text>
      </Pressable>
      <Pressable style={styles.childContainer} onPress={sendMail}>
        <EmailIcon height={20} width={20} />
        <Text variant="bodyMedium" theme={textTheme} style={styles.text}>
          {HELP_SUPPORT_MAIL}
        </Text>
      </Pressable>
    </View>
  );
};

export default ContactFooter;
