import React, {useState} from 'react';
import CardWrapper from '../card/Card';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import ArrowUp from '../../../assets/icons/arrowUp.svg';
import ArrowDown from '../../../assets/icons/arrowDown.svg';
import {getTranslationLabel} from '@/utils/commonMethods';
import styles from './HelpCard.styles.ts';
import SupprtAgent from '../../../assets/icons/support_agent.svg';
const HelpCard = () => {
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  return (
    <CardWrapper>
      <View style={styles.parent}>
        <View style={styles.Icon}>
          <SupprtAgent />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge">{getTranslationLabel('help')}</Text>
        </View>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => {
            setOpenHelp(!openHelp);
          }}>
          {!openHelp ? <ArrowDown /> : <ArrowUp />}
        </TouchableOpacity>
      </View>
      {openHelp && (
        <View style={styles.dropDownContent}>
          <Text variant="titleMedium">
            {getTranslationLabel('not_a_registered_partner_yet')}
          </Text>
          <View style={styles.margin} />
          <Text variant="titleMedium">
            {getTranslationLabel('phone')}{' '}
            <Text variant="titleMedium" style={styles.greenText}>
              +91 9876567890
            </Text>{' '}
          </Text>
          <Text variant="titleMedium">
            {getTranslationLabel('email')}{' '}
            <Text variant="titleMedium" style={styles.greenText}>
              info@deloitte.com
            </Text>{' '}
          </Text>
        </View>
      )}
    </CardWrapper>
  );
};

export default HelpCard;
