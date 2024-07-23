//External dependencies
import React from 'react';
import {View} from 'react-native';
import {Button, Divider, Modal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

//Internal dependencies
import Spacer from 'components/spacer';
import ContactFooter from 'components/contactFooter/ContactFooter';
import {hideModal} from 'store/redux/modalSlice';
import {RootState} from 'store/redux/store';
import {clearUser, updateIsFirstTimeAppLaunch} from 'store/redux/userSlice';

//Styles, Constants and interfaces
import {COLORS} from 'theme/colors';
import WarningSvg from './../../../assets/icons/warning-triangle.svg';
import styles from './OtpAttemptExhaustedModal.style';
import {clearStorage} from 'utils/AppStorage';
import useLanguageSelection from 'hooks/useLanguageSelection';

const OtpAttemptExhaustedModal = () => {
  const modal = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const headerTheme = {colors: {onSurface: COLORS.darkYellow}};
  const getInTouchLabel = useLanguageSelection('get_in_touch').label;

  const handleButtonClick = async () => {
    if (!modal.showContactDetails) {
      dispatch(clearUser());
      await clearStorage();
      dispatch(updateIsFirstTimeAppLaunch(false));
    }
    dispatch(hideModal());
  };

  return (
    <Modal
      visible={modal.isVisible}
      contentContainerStyle={styles.containerStyle}>
      <View style={styles.contentView}>
        <Text variant="titleLarge" theme={headerTheme}>
          {modal?.header}
        </Text>
        <Spacer size={20} />
        <WarningSvg />
        <Spacer size={20} />
        <Text style={styles.titleStyle} variant="bodyMedium">
          {modal?.content}
        </Text>
        {modal.showContactDetails ? (
          <>
            <Divider style={styles.divider1} />
            <Text style={styles.titleStyle} variant="bodyMedium">
              {getInTouchLabel}
            </Text>
            <ContactFooter isModalView={true} />
            <Divider style={styles.divider2} />
          </>
        ) : (
          <Spacer size={30} />
        )}
        <Button
          style={styles.saveCancelBtn}
          mode="contained"
          onPress={handleButtonClick}>
          <Text variant="bodyMedium">{modal.buttonText}</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default OtpAttemptExhaustedModal;
