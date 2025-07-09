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
  style?: object;
  leftButtonStyle?: object;
  rightButtonStyle?: object;
  leftTextStyle?: object;
  rightTextStyle?: object;
}

const BottomSheetFooter = ({
  handleApplyFilters,
  handleClearFilters,
  isApplyButtonDisabled,
  isFilterButtonDisabled,
  hideClearButton = false,
  style,
  leftButtonStyle,
  rightButtonStyle,
  leftTextStyle,
  rightTextStyle,
}: IBottomSheetFooterProps) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      {hideClearButton ? null : (
        <CustomButton
          type={ButtonTypes.outline}
          text={getTranslationLabel('clear')}
          onPress={handleClearFilters}
          style={[styles.container, leftButtonStyle]}
          isDisabled={isFilterButtonDisabled}
          textStyle={leftTextStyle}
        />
      )}
      <CustomButton
        type={ButtonTypes.contained}
        text={getTranslationLabel('apply')}
        onPress={() => {
          handleApplyFilters();
        }}
        style={[styles.container, rightButtonStyle]}
        isDisabled={isApplyButtonDisabled}
        textStyle={rightTextStyle}
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
