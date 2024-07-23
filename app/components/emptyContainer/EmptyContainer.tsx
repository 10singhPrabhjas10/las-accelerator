import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import Spacer from '../spacer';

import NoDataIcon from '../../../assets/icons/noData.svg';
import {COLORS} from 'theme/colors';
import {getDeviceHeight} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

interface IEmptyContainerProps {
  title: string;
  icon?: ReactNode;
}

const EmptyContainer = ({icon, title = 'Not Found'}: IEmptyContainerProps) => {
  return (
    <View style={styles.content}>
      {icon ?? <NoDataIcon height={120} width={120} />}
      <Spacer size={30} />
      <Text
        theme={{colors: {onSurface: COLORS.grey2}}}
        variant="bodyMedium"
        style={CommonStyles.textAlignCenter}>
        {title}
      </Text>
    </View>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getDeviceHeight(0.2),
  },
});
