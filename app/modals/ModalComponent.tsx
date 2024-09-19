import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {IModalComponentProps} from 'types/modal';
import {COLORS} from 'theme/colors';
import {StyleSheet} from 'react-native';
import {heightToRatio, widthToRatio} from '../utils/commonMethods';

const ModalComponent = ({
  showModal,
  setShowModal = () => {},
  children,
  ...customProps
}: IModalComponentProps) => {
  return (
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={setShowModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.background}
        {...customProps}>
        {children}
      </Modal>
    </Portal>
  );
};

export default React.memo(ModalComponent);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 5,
  },
  background: {backgroundColor: COLORS.portalBackground},
});
