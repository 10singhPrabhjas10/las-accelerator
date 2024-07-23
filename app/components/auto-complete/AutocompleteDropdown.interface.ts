import React, {ReactNode} from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  TextInput,
  ViewStyle,
} from 'react-native';

export type TAutocompleteDropdownItem = {
  id: string | number;
  title: string | null;
  subTitle?: string | null;
};

export interface AutocompleteDropdownProps {
  dataSet: TAutocompleteDropdownItem[] | [];
  suggestionsListMaxHeight?: number;
  initialValue?: string | TAutocompleteDropdownItem;
  loading?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  closeOnBlur?: boolean;
  closeOnSubmit?: boolean;
  clearOnFocus?: boolean;
  direction?: 'down' | 'up';
  onChangeText?: (text: string) => void;
  onSelectItem?: (item: TAutocompleteDropdownItem | undefined) => void;
  renderItem?: (
    item: TAutocompleteDropdownItem,
    searchText: string,
  ) => React.ReactElement;
  onOpenSuggestionsList?: (isOpened: boolean) => void;
  onSubmit?: TextInputProps['onSubmitEditing'];
  onBlur?: TextInputProps['onBlur'];
  onFocus?: TextInputProps['onFocus'];
  suggestionsListTextStyle?: StyleProp<TextStyle>;
  errorText?: string;
  titleText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  ref?: React.LegacyRef<TextInput> | undefined;
  style?: ViewStyle;
}
