import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {getTranslationLabel} from '@/utils/commonMethods';
import {COLORS} from '@/theme/colors';

const LeadDetailsCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.card, expanded && {height: undefined}]}>
      <Text style={styles.label}>Lead Name</Text>
      <Text style={styles.value}>Vijay Kumar</Text>
      <Text style={styles.label}>Lead Email-ID</Text>
      <Text style={styles.value}>vijayk@gmail.com</Text>
      <Text style={styles.label}>Leads Mobile No.</Text>
      <Text style={styles.value}>+91 9869474566</Text>
      <Text style={styles.label}>Category</Text>
      <Text style={styles.value}>Category Name</Text>
      <Text style={styles.label}>Lead Type</Text>
      <Text style={styles.value}>Consumer</Text>
      <Text style={styles.label}>Pin Code</Text>
      <Text style={styles.value}>SKU Name</Text>
      <CustomButton
        type={ButtonTypes.outline}
        onPress={() => {}}
        text={getTranslationLabel('view_lead_details')}
        textStyle={{color: COLORS.dgreen}}
        style={{borderColor: COLORS.dgreen}}
      />
      <CustomButton
        type={ButtonTypes.text}
        onPress={() => setExpanded(!expanded)}
        text={getTranslationLabel('view_more')}
        textStyle={{color: COLORS.opalgreen}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 440,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    elevation: 2,
    position: 'relative',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  value: {
    color: '#444',
    marginBottom: 4,
    fontSize: 16,
  },
  toggleText: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LeadDetailsCard;
