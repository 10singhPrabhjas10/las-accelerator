import CustomButton from '@/components/button/CustomButton';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import SchemesIcon from '../../../../../assets/icons/schemesIcon.svg';
import DisabledSchemesIcon from '../../../../../assets/icons/disabledScheme.svg';
import {COLORS} from '@/theme/colors';
import {ButtonTypes} from '@/types/buttons';
import {IScheme} from './AdditionalSchemes';

interface ISchemesProps {
  offerTitle: string;
  offerReason: string;
  offerDescription: string;
  onSelectSchemes: () => void;
  selectedScheme: IScheme | undefined;
  schemeId: number | string;
  isSchemeDisabled?: boolean;
}

const Schemes = ({
  offerTitle,
  offerReason,
  offerDescription,
  onSelectSchemes,
  selectedScheme,
  schemeId,
  isSchemeDisabled = false,
}: ISchemesProps) => {
  const isSelected = selectedScheme?.id === schemeId;
  const [schemesAdded, setSchemesAdded] = useState(isSelected);

  useEffect(() => {
    setSchemesAdded(isSelected);
  }, [isSelected]);

  return (
    <View style={styles.schemeView}>
      <View style={styles.schemeContent}>
        {isSchemeDisabled ? <DisabledSchemesIcon /> : <SchemesIcon />}
        <View style={styles.descriptionView}>
          <Text style={{color: COLORS.greyText}}>{offerTitle}</Text>
          <Text
            style={{color: isSchemeDisabled ? COLORS.greyText : COLORS.black}}
            variant="titleMedium">
            {offerReason}
          </Text>
          <Text
            style={{
              color: COLORS.greyText,
            }}
            variant="labelMedium">
            {offerDescription}
          </Text>
        </View>
      </View>
      <CustomButton
        text={schemesAdded ? 'Added' : 'Add'}
        textStyle={{color: COLORS.dgreen}}
        type={ButtonTypes.outline}
        isDisabled={schemesAdded || isSchemeDisabled}
        onPress={() => {
          setSchemesAdded(prev => !prev);
          onSelectSchemes();
        }}
      />
    </View>
  );
};

export default Schemes;

const styles = StyleSheet.create({
  schemeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  schemeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionView: {
    marginLeft: 10,
    minWidth: 220,
    maxWidth: 240,
  },
});
