import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import {Divider, Icon, Text} from 'react-native-paper';
import {COLORS} from '@/theme/colors';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import {additionalSchemes} from '@/utils/dummyData';
import CommonStyles from '@/utils/commonStyle';
import Spacer from '@/components/spacer';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Schemes from './Schemes';

export interface IScheme {
  id: number;
  title: string;
  reason: string;
  description: string;
}

const AdditionalSchemes = ({
  onApplySchemes,
  onClose,
}: {
  onApplySchemes: SetStateAction<any>;
  onClose: () => void;
}) => {
  const [selectedScheme, setSelectedScheme] = useState<IScheme>();
  console.log(!!selectedScheme);

  return (
    <>
      <View style={styles.mainView}>
        <Text variant="bodyLarge" style={styles.additionalText}>
          Additional Schemes
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Icon color={COLORS.grey6} source={'close'} size={20} />
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <Spacer size={16} />

        {additionalSchemes?.map(scheme => {
          return (
            <>
              <Schemes
                key={scheme.id}
                offerTitle={scheme.title}
                offerReason={scheme.reason}
                offerDescription={scheme.description}
                onSelectSchemes={() => {
                  setSelectedScheme(scheme);
                }}
                selectedScheme={selectedScheme}
                schemeId={scheme.id}
                isSchemeDisabled={selectedScheme?.id === scheme.id}
              />
              <Divider
                style={[CommonStyles.horizontalDivider, styles.divider]}
              />
            </>
          );
        })}
      </BottomSheetScrollView>
      <CustomButton
        text="Apply"
        onPress={() => {
          onApplySchemes(selectedScheme);
        }}
        type={ButtonTypes.contained}
        isDisabled={!selectedScheme}
        style={{marginHorizontal: 20, marginBottom: 20}}
      />
    </>
  );
};

export default AdditionalSchemes;

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  divider: {width: '90%', alignSelf: 'center'},
  additionalText: {fontWeight: '700'},
});
