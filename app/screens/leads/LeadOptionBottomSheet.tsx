import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {COLORS} from '@/theme/colors';
import AddAccount from './../../../assets/icons/addAccount.svg';
import SePicIcon from '../../../assets/icons/imageCapture.svg';

interface LeadOptionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onAddNewLead: () => void;
  onViewLeads: () => void;
}

const LeadOptionBottomSheet: React.FC<LeadOptionBottomSheetProps> = ({
  visible,
  onClose,
  onAddNewLead,
  onViewLeads,
}) => {
  const bottomSheetRef = useRef<any>(null);

  React.useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  // Call onClose after the sheet is closed
  const handleSheetChange = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  return (
    <BottomSheetModalComponent
      ref={bottomSheetRef}
      minHeight={'35%'}
      maxHeight={'35%'}
      title="Select Option"
      onChange={handleSheetChange}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select Option</Text>
        <Text style={styles.subtitle}>Select lead option to proceed</Text>
        <View style={styles.subContentContainer}>
          <TouchableOpacity style={styles.button} onPress={onAddNewLead}>
            <AddAccount />
            <Text style={styles.buttonText}>Add New Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onViewLeads}>
            <SePicIcon />
            <Text style={styles.buttonText}>View Added Leads</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModalComponent>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  subContentContainer: {
    flex: 1,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
  },
  button: {
    height: 94,
    width: 152,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 5,
    position: 'relative',
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: '500',
  },
});

export default LeadOptionBottomSheet;
