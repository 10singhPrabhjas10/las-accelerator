import React from 'react';
import {View} from 'react-native';

interface ISpacerProp {
  horizontal?: number;
  size: number;
}

const Spacer = ({horizontal = 5, size = 5}: ISpacerProp) => {
  const defaultValue = 'auto';

  return (
    <View
      style={{
        width: horizontal === 1 ? size : defaultValue,
        height: !(horizontal === 1) ? size : defaultValue,
      }}
    />
  );
};

export default Spacer;
