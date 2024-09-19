import {COLORS} from '@/theme/colors';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Text} from 'react-native-paper';
import BoldArrowDown from '../../../assets/icons/bold_arrow_down.svg';
import BoldArrowUp from '../../../assets/icons/bold_arrow_up.svg';

interface CountryCode {
  code: string;
  dialCode: string;
}

const countryCodes: CountryCode[] = [
  {code: 'IN', dialCode: '+91'},
  {code: 'US', dialCode: '+1'},
  {code: 'UK', dialCode: '+44'},
  {code: 'CA', dialCode: '+1'},
  {code: 'AU', dialCode: '+61'},
];

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
  setCountryCode: (code: string) => void;
  error: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  setCountryCode,
  error = '',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countryCodes[0],
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCountry = (country: CountryCode) => {
    setCountryCode(country.dialCode);
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.invalidInput : styles.validInput,
        ]}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}>
          <>
            <Text variant="bodyMedium">{selectedCountry.code}</Text>
            <Text variant="bodyMedium">{selectedCountry.dialCode}</Text>
          </>
          {isOpen ? <BoldArrowUp /> : <BoldArrowDown />}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="10 digits"
          keyboardType="phone-pad"
          value={phoneNumber}
          maxLength={10}
          onChangeText={onPhoneNumberChange}
        />
      </View>
      {error && (
        <Text variant="bodyMedium" style={styles.errorText}>
          {error}
        </Text>
      )}
      {isOpen && (
        <FlatList
          data={countryCodes}
          keyExtractor={item => item.code}
          style={styles.dropdown}
          renderItem={({item}) => (
            <View style={styles.dropdownItem}>
              <Text
                onPress={() => selectCountry(item)}
                variant="bodyMedium"
                style={styles.dialCode}>
                {item.code} {item.dialCode}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  errorText: {
    color: COLORS.errorRed,
    marginTop: 5,
  },
  validInput: {
    borderColor: COLORS.dgreen,
  },
  invalidInput: {
    borderColor: COLORS.errorRed,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 100,
    borderRightWidth: 1,
    borderColor: COLORS.dividerGrey,
    justifyContent: 'space-between',
  },
  dropdownArrow: {
    marginLeft: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  dropdown: {
    zIndex: 1,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: 'absolute',
    top: 50, // Adjust depending on dropdown position
    width: 100,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    fontSize: 18,
    marginRight: 10,
  },
  dialCode: {
    fontSize: 16,
  },
});

export default PhoneInput;
