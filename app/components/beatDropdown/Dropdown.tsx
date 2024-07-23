/* eslint-disable react-native/no-inline-styles */
import {FlatList, ScrollView, TextStyle, View, ViewStyle} from 'react-native';
import {
  Checkbox,
  Divider,
  Icon,
  Menu,
  Text,
  TextInput,
  TextInputProps,
  TouchableRipple,
} from 'react-native-paper';
import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
  ReactNode,
  Ref,
} from 'react';
import {COLORS} from 'theme/colors';
import styles from './Dropdown.style';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';

interface IDropdownProps {
  visible: boolean;
  multiSelect?: boolean;
  onChangeDropdownState: () => void;
  value: any;
  setValue: (_value: any) => void;
  setData?: (item: any) => void;
  label: string;
  placeholder?: string | undefined;
  mode?: 'outlined' | 'flat' | undefined;
  inputProps?: TextInputProps;
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  theme?: ThemeProp;
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  isDisabled?: boolean;
  isRequired?: boolean;
  error?: string;
  labelRequired?: boolean;
  updateDisplayValue?: (item: string) => string;
  onScrollEnd?: (text: string) => void;
  isSearchRequired?: boolean;
  handleDistrictSearch?: (value: string) => void;
}

const DropDown = forwardRef((props: IDropdownProps, ref: Ref<View>) => {
  const {
    multiSelect = false,
    visible,
    onChangeDropdownState,
    value,
    setValue,
    mode = 'outlined',
    label,
    placeholder,
    inputProps,
    list,
    dropDownContainerMaxHeight,
    dropDownContainerHeight,
    theme,
    dropDownStyle = styles.dropdown,
    dropDownItemSelectedTextStyle = styles.dropDownItemSelectedTextStyle,
    dropDownItemSelectedStyle = styles.dropDownItemSelectedStyle,
    dropDownItemStyle = styles.dropDownItemStyle,
    dropDownItemTextStyle = styles.dropDownItemTextStyle,
    isDisabled,
    isRequired,
    error,
    labelRequired = false,
    setData = () => {},
    updateDisplayValue,
    onScrollEnd = () => {},
    isSearchRequired = false,
    handleDistrictSearch = () => {},
  } = props;

  const [displayValue, setDisplayValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [iconInverted, setIconInverted] = useState(false);
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!value) {
      setDisplayValue(value ?? '');
    }
  }, [value]);

  useEffect(() => {
    if (multiSelect) {
      const _labels = list
        .filter(_ => value.indexOf(_.value) !== -1)
        .map(_ => _.label)
        .join(', ');
      setDisplayValue(_labels);
    } else {
      const _label = list.find(_ => _.value === value)?.label;
      if (_label) {
        setDisplayValue(_label);
      }
    }
  }, [list, multiSelect, value]);

  const isActive = useCallback(
    (currentValue: string | number) => {
      if (multiSelect) {
        // For multi-select, check if the value is included in the selected values
        return value.split(',').includes(String(currentValue));
      } else {
        // For single-select, directly compare the value with the selected value
        return value === currentValue;
      }
    },
    [multiSelect, value],
  );

  const setActive = useCallback(
    (currentValue: string | number) => {
      if (multiSelect) {
        // Split the current values
        const values = value ? value.split(',') : [];

        // Check if the current value is already selected
        const valueIndex = values.indexOf(String(currentValue));

        if (valueIndex === -1) {
          // If not selected, add it to the values
          setValue([...values, currentValue].join(','));
        } else {
          // If already selected, remove it from the values
          values.splice(valueIndex, 1);
          setValue(values.join(','));
        }
      } else {
        // For single-select, toggle the value
        setValue(value === currentValue ? '' : currentValue);
      }
    },
    [multiSelect, setValue, value],
  );

  return (
    <View>
      <View style={styles.titleView}>
        <Text variant="bodyMedium">{label}</Text>
        {isRequired && (
          <Text variant="labelMedium" style={styles.requiredText}>
            {'*'}
          </Text>
        )}
      </View>
      <Spacer size={5} />
      <Menu
        visible={visible}
        onDismiss={() => {
          onChangeDropdownState();
          setIconInverted(!iconInverted);
        }}
        theme={theme}
        contentStyle={styles.menuContentStyle}
        anchor={
          <TouchableRipple
            ref={ref}
            onPress={() => {
              onChangeDropdownState();
              setIconInverted(!iconInverted);
            }}
            disabled={isDisabled}
            onLayout={event => {
              setInputLayout(event.nativeEvent.layout);
            }}>
            <View pointerEvents={'none'}>
              {multiSelect ? (
                <View
                  style={[
                    styles.multiSelectView,
                    {
                      backgroundColor: isDisabled
                        ? COLORS.lightGrey2
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={styles.multiSelectPlaceholder}
                    variant="bodyLarge">
                    {displayValue?.length === 0 ? placeholder : ''}
                  </Text>
                  {value?.split(',').map((item: string, index: string) => {
                    return (
                      <View style={styles.multiBorderView} key={index}>
                        {displayValue?.length !== 0 && (
                          <View style={styles.placeholderBorderBox}>
                            <Text variant="bodyMedium">{item}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                  <View style={styles.iconView}>
                    <Icon
                      source={!iconInverted ? 'chevron-down' : 'chevron-up'}
                      size={25}
                      color={COLORS.grey2}
                    />
                  </View>
                </View>
              ) : (
                <TextInput
                  {...inputProps}
                  value={displayValue}
                  mode={mode}
                  disabled={isDisabled}
                  placeholder={placeholder}
                  pointerEvents={'none'}
                  theme={theme}
                  right={
                    <TextInput.Icon
                      icon={visible ? 'chevron-up' : 'chevron-down'}
                    />
                  }
                  style={{
                    backgroundColor: isDisabled
                      ? COLORS.lightGrey2
                      : 'transparent',
                  }}
                  error={error && error?.length > 0 ? true : false}
                />
              )}
            </View>
          </TouchableRipple>
        }
        style={{
          ...dropDownStyle,
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        }}>
        <FlatList
          data={list}
          onEndReached={() => {
            onScrollEnd?.(searchText);
          }}
          keyboardShouldPersistTaps={'always'}
          initialNumToRender={25}
          ListHeaderComponent={
            <View>
              {isSearchRequired && (
                <PrimaryTextInput
                  placeHolder={'Search district or pin-code'}
                  onChangeText={value => {
                    handleDistrictSearch(value);
                    setSearchText(value);
                  }}
                  value={searchText}
                />
              )}
            </View>
          }
          onEndReachedThreshold={0.5}
          scrollEventThrottle={16}
          style={{
            ...(dropDownContainerHeight
              ? {
                  height: dropDownContainerHeight,
                }
              : {
                  maxHeight: dropDownContainerMaxHeight || 200,
                }),
            backgroundColor: COLORS.white,
          }}
          renderItem={({item, index}) => {
            const titleValue = multiSelect
              ? item?.value
              : item.custom || item.label;

            const newCurrValue = updateDisplayValue
              ? updateDisplayValue(titleValue as string)
              : titleValue;

            return (
              <View>
                <Fragment key={item.value}>
                  <TouchableRipple
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: isActive(item.value)
                        ? COLORS.lightYellow
                        : COLORS.white,
                    }}
                    onPress={() => {
                      setActive(item.value);
                      setData(item);

                      if (onChangeDropdownState) {
                        onChangeDropdownState();
                      }
                      setIconInverted(!iconInverted);
                    }}>
                    <View style={styles.reverseCheckBoxStyle}>
                      {labelRequired && (
                        <Text style={{marginRight: 16}}>{item?.label}</Text>
                      )}
                      <Menu.Item
                        titleStyle={{
                          ...(isActive(item.value)
                            ? dropDownItemSelectedTextStyle
                            : dropDownItemTextStyle),
                        }}
                        title={newCurrValue}
                        style={{
                          flex: 1,
                          maxWidth: inputLayout?.width,
                          ...(isActive(item.value)
                            ? dropDownItemSelectedStyle
                            : dropDownItemStyle),
                        }}
                      />
                      {multiSelect && (
                        <Checkbox.Android
                          theme={{
                            colors: {
                              background: COLORS.lightGrey2,
                            },
                          }}
                          status={
                            isActive(item.value) ? 'checked' : 'unchecked'
                          }
                          onPress={() => {
                            setActive(item.value);
                            setData(item);
                          }}
                        />
                      )}
                    </View>
                  </TouchableRipple>
                  <Divider />
                </Fragment>
              </View>
            );
          }}
        />
      </Menu>
      {error ? (
        <Text variant="bodyMedium" style={styles.requiredText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
});
export default DropDown;
