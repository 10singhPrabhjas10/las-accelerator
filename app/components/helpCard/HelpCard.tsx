import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import SupprtAgent from '../../../assets/icons/support_agent.svg';
import {getTranslationLabel} from '@/utils/commonMethods';
import styles from './HelpCard.styles.ts';
import CommonStyles from '@/utils/commonStyle.ts';
import Accordion from '../accordion/Accordion.tsx';
import Spacer from '../spacer/index.tsx';
import {COLORS} from '@/theme/colors.ts';
import {DummyMail, DummyMobile} from '@/utils/Constants.ts';
import {fontConfig} from '@/theme/fonts.ts';
const HelpCard = () => {
  const renderLeftComponent = () => (
    <View style={styles.Icon}>
      <SupprtAgent width={32} height={32} />
    </View>
  );

  return (
    <Accordion
      leftComponent={renderLeftComponent}
      titleStyle={fontConfig.titleMedium}
      title="Help">
      <View style={styles.dropDownContent}>
        <Text variant="bodyMedium">
          {getTranslationLabel('not_a_registered_partner_yet')}
        </Text>
        <View style={styles.margin} />
        <Text variant="bodyMedium">
          {getTranslationLabel('phone')}{' '}
          <Text variant="bodyMedium" style={styles.greenText}>
            {DummyMobile}
          </Text>{' '}
        </Text>
        <View style={CommonStyles.padding5} />
        <Text variant="bodyMedium">
          {getTranslationLabel('email')}{' '}
          <Text variant="bodyMedium" style={styles.greenText}>
            {DummyMail}
          </Text>{' '}
        </Text>
      </View>
      <Spacer size={10} />
    </Accordion>

    // <CardWrapper>
    //   <View style={styles.parent}>
    //     <View style={styles.Icon}>
    //       <SupprtAgent width={32} height={32} />
    //     </View>
    //     <View style={styles.content}>
    //       <Text variant="titleLarge">{getTranslationLabel('help')}</Text>
    //     </View>
    //     <TouchableOpacity
    //       style={styles.Icon}
    //       onPress={() => {
    //         setOpenHelp(!openHelp);
    //       }}>
    //       {!openHelp ? (
    //         <ArrowDown width={32} height={32} />
    //       ) : (
    //         <ArrowUp width={32} height={32} />
    //       )}
    //     </TouchableOpacity>
    //   </View>
    //   {openHelp && (
    //     <View style={styles.dropDownContent}>
    //       <Text variant="titleMedium">
    //         {getTranslationLabel('not_a_registered_partner_yet')}
    //       </Text>
    //       <View style={styles.margin} />
    //       <Text variant="titleMedium">
    //         {getTranslationLabel('phone')}{' '}
    //         <Text variant="titleMedium" style={styles.greenText}>
    //           +91 9876567890
    //         </Text>{' '}
    //       </Text>
    //       <View style={CommonStyles.padding5} />
    //       <Text variant="titleMedium">
    //         {getTranslationLabel('email')}{' '}
    //         <Text variant="titleMedium" style={styles.greenText}>
    //           info@deloitte.com
    //         </Text>{' '}
    //       </Text>
    //     </View>
    //   )}
    // </CardWrapper>
  );
};

export default HelpCard;
