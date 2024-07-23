import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import SuccessTickSvg from './../../../assets/icons/success-tick.svg';
import WarningSvg from './../../../assets/icons/warning-circle.svg';
import {COLORS} from 'theme/colors';
import {RootState} from 'store/redux/store';
import {SnackBarEnum} from 'constants/modalTypes';
import {hideSnackbar} from 'store/redux/snackbarSlice';

const SnackBar = () => {
  const {isVisible, text, type} = useSelector(
    (state: RootState) => state.snackbar,
  );
  const dispatch = useDispatch();

  const isSuccess = type === SnackBarEnum.SUCCESS;

  return (
    <Snackbar
      theme={{
        colors: {
          inverseSurface: isSuccess ? COLORS.lightGreen : COLORS.semanticRed,
        },
      }}
      style={[
        styles.snackbarView,
        {borderColor: isSuccess ? COLORS.darkGreen : COLORS.darkRed},
      ]}
      duration={2000}
      visible={isVisible}
      onDismiss={() => dispatch(hideSnackbar())}>
      <View style={styles.content}>
        {isSuccess ? (
          <SuccessTickSvg />
        ) : (
          <WarningSvg color={COLORS.black} width={20} height={20} />
        )}
        <Text
          variant="bodyMedium"
          style={[
            styles.text,
            {
              color: isSuccess ? COLORS.darkGreen : COLORS.black,
            },
          ]}>
          {text}
        </Text>
      </View>
    </Snackbar>
  );
};

export default SnackBar;

const styles = StyleSheet.create({
  snackbarView: {
    marginBottom: 20,
    zIndex: 1,
    borderWidth: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
});
