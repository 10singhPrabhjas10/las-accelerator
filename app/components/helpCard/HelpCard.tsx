import React, {useState} from 'react';
import CardWrapper from '../card/Card';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import ArrowUp from '../../../assets/icons/bold_arrow_up.svg';
import ArrowDown from '../../../assets/icons/bold_arrow_down.svg';
import {getTranslationLabel} from '@/utils/commonMethods';
import styles from './HelpCard.styles.ts';
import SupprtAgent from '../../../assets/icons/support_agent.svg';
import CommonStyles from '@/utils/commonStyle.ts';
const HelpCard = () => {
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  return (
    <CardWrapper>
      <View style={styles.parent}>
        <View style={styles.Icon}>
          <SupprtAgent width={32} height={32} />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge">{getTranslationLabel('help')}</Text>
        </View>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => {
            setOpenHelp(!openHelp);
          }}>
          {!openHelp ? (
            <ArrowDown width={32} height={32} />
          ) : (
            <ArrowUp width={32} height={32} />
          )}
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
          <View style={CommonStyles.padding5} />
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
