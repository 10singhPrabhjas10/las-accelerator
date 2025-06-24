import React from 'react';
import {Modal, Portal, Text, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import SuccessIcon from './../../assets/icons/success.svg';
import {COLORS} from 'theme/colors';

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: React.ReactNode;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onDismiss,
  title = 'Submitted',
  message = 'You have successfully submitted your expenses.',
  buttonText = 'Dismiss',
  onButtonPress,
  icon,
}) => {
  const handlePress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.iconWrapper}>
            {icon ?? (
              <SuccessIcon width={40} height={40} fill={COLORS.darkGreen2} />
            )}
          </View>

          <Text style={styles.message}>{message}</Text>

          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.button}
            labelStyle={styles.buttonText}
            buttonColor={COLORS.dgreen}>
            {buttonText}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 20,
    width: 319,
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  iconWrapper: {
    marginVertical: 20,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000104',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: 198,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
