import React from 'react';

import {ButtonTypes, IFilterButtonProps} from 'types/buttons';
import FilterIcon from '../../../assets/icons/filter.svg';
import CustomButton from './CustomButton';
import {getTranslationLabel} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

const FilterButton = ({
  onPress,
  style,
  isDisabled = false,
}: IFilterButtonProps) => {
  return (
    <CustomButton
      style={[CommonStyles.margin, style]}
      type={ButtonTypes.contained}
      icon={<FilterIcon />}
      text={getTranslationLabel('filter')}
      onPress={onPress}
      isDisabled={isDisabled}
    />
  );
};

export default FilterButton;
