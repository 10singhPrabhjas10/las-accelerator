import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {COLORS} from 'theme/colors';
import {getTranslationLabel} from 'utils/commonMethods';

interface IBottomSheetFooterProps {
  handleClearFilters: () => void;
  handleApplyFilters: () => void;
  isFilterButtonDisabled: boolean;
  isApplyButtonDisabled?: boolean;
  hideClearButton?: boolean;
}

const BottomSheetFooter = ({
  handleApplyFilters,
  handleClearFilters,
  isApplyButtonDisabled,
  isFilterButtonDisabled,
  hideClearButton = false,
}: IBottomSheetFooterProps) => {
  return (
    <View style={styles.buttonContainer}>
      {hideClearButton ? null : (
        <CustomButton
          type={ButtonTypes.outline}
          text={getTranslationLabel('clear')}
          onPress={handleClearFilters}
          style={styles.container}
          isDisabled={isFilterButtonDisabled}
        />
      )}
      <CustomButton
        type={ButtonTypes.contained}
        text={getTranslationLabel('apply')}
        onPress={() => {
          handleApplyFilters();
        }}
        isDisabled={isApplyButtonDisabled}
        style={styles.container}
      />
    </View>
  );
};

export default BottomSheetFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 30,
  },
  filterTitleText: {paddingVertical: 15},
  divider: {backgroundColor: COLORS.grey, marginBottom: 10},
});
