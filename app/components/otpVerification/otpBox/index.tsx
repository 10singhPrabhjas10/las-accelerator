import {COLORS} from '@/theme/colors';
import {getTranslationLabel, heightToRatio} from '@/utils/commonMethods';
import React, {useEffect, useRef} from 'react';
import {useState, type RefObject} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

interface OTPInputProps {
  otp: string;
  setOtp: Function;
}

interface OTPInputConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  errorColor: string;
  focusColor: string;
}
const defaultConfig: OTPInputConfig = {
  backgroundColor: '#00000000', //transparent
  textColor: COLORS.black1,
  borderColor: COLORS.dividerGrey,
  errorColor: COLORS.red,
  focusColor: COLORS.dgreen,
};
export function OTPInput({otp, setOtp = () => {}}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''));
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const [errorMessages, setErrorMessages] = useState<string[] | null>();
  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split('');
      setCodes(newCodes);
      refs[5]!.current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);
    setOtp(newCodes.join(''));
    if (text !== '' && index < 5) {
      refs[index + 1]!.current?.focus();
    }
  };
  useEffect(() => {}, [codes]);
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };
  const handleBlur = () => setFocusedIndex(null);

  return (
    <>
      <View style={styles.container}>
        {codes.map((code, index) => (
          <TextInput
            key={index}
            autoComplete="one-time-code"
            enterKeyHint="next"
            style={[
              styles.input,
              errorMessages && styles.errorInput,
              focusedIndex === index && styles.focusedInput,
            ]}
            inputMode="numeric"
            onChangeText={text => onChangeCode(text, index)}
            value={code}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            maxLength={index === 0 ? codes.length : 1}
            ref={refs[index]}
            onKeyPress={({nativeEvent: {key}}) => {
              if (key === 'Backspace' && index > 0) {
                onChangeCode('', index - 1);
                refs[index - 1]!.current!.focus();
              }
            }}
          />
        ))}
      </View>
      {errorMessages && (
        <Text variant="bodySmall" style={styles.error}>
          {getTranslationLabel('invlid_otp_please_try_again')}
        </Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  error: {
    color: COLORS.red,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    height: heightToRatio(48),
    width: heightToRatio(40),
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: defaultConfig.backgroundColor,
    color: defaultConfig.textColor,
    borderColor: defaultConfig.borderColor,
    borderWidth: 2,
  },
  errorInput: {
    borderColor: defaultConfig.errorColor,
    color: defaultConfig.errorColor,
  },
  focusedInput: {
    borderColor: defaultConfig.focusColor,
  },
});
