//External dependencies
import React from 'react';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

//Internal dependencies
import Spacer from 'components/spacer';

//Styles, Constants and interfaces
import {COLORS} from 'theme/colors';
import {ISuccessFailureModalModalComponentProps} from 'types/modal';
import SuccessIcon from './../../assets/icons/success.svg';
import ErrorIcon from './../../assets/icons/warning-circle.svg';

const SuccessFailureModal = ({
  showModal,
  setShowModal,
  icon,
  isSuccess,
  title,
  label: label,
  onPrimaryBtnHandler,
  onSecondaryBtnHandler,
  theme,
  btnType,
  showFooterButtons = true,
  primaryButtonTitle = '',
  secondaryBtnTitle = '',
  headlineStyle,
  children,
  ...customProps
}: ISuccessFailureModalModalComponentProps) => {
  const successIcon = (
    <SuccessIcon height={40} width={40} fill={COLORS.darkGreen2} />
  );
  const errorIcon = (
    <ErrorIcon height={40} width={40} fill={COLORS.darkGreen2} />
  );

  const successTheme = {colors: {onSurface: COLORS.darkGreen2}};
  const defaultErrorTheme = {colors: {onSurface: COLORS.red}};

  return (
    <Portal>
      <Modal
        {...customProps}
        visible={showModal}
        onDismiss={setShowModal}
        contentContainerStyle={styles.containerStyle}>
        <View style={styles.contentView}>
          <Text
            style={headlineStyle}
            theme={isSuccess ? successTheme : theme ?? defaultErrorTheme}
            variant="titleLarge">
            {title}
          </Text>
          <Spacer size={20} />
          {isSuccess ? successIcon : icon ?? errorIcon}
          <Spacer size={20} />
          <Text style={styles.titleStyle} variant={'bodyMedium'}>
            {label}
          </Text>
          <Spacer size={25} />
        </View>

        {showFooterButtons && (
          <View style={styles.saveCancelBtnView}>
            {(btnType === 'both' || btnType === 'cancel') && (
              <Button
                textColor={COLORS.black}
                style={styles.saveCancelBtn}
                theme={{colors: {outline: COLORS.orange}}}
                mode="outlined"
                onPress={() => onPrimaryBtnHandler?.()}>
                <Text variant="bodySmall">{primaryButtonTitle}</Text>
              </Button>
            )}
            {(btnType === 'both' || btnType === 'confirm') && (
              <Button
                textColor={COLORS.black}
                style={styles.saveCancelBtn}
                mode="contained"
                onPress={() => onSecondaryBtnHandler?.()}>
                <Text variant="bodyMedium" style={{color: COLORS.white}}>
                  {secondaryBtnTitle}
                </Text>
              </Button>
            )}
          </View>
        )}
        {children}
      </Modal>
    </Portal>
  );
};

export default React.memo(SuccessFailureModal);

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contentView: {
    alignItems: 'center',
  },
  saveCancelBtn: {
    width: 148,
    height: 40,
    borderRadius: 4,
  },
  saveCancelBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 30,
  },
  bottomContainerStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
});
