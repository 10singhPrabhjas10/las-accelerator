import {ReactNode} from 'react';
import {ViewStyle, StyleProp, TextInputProps} from 'react-native';

// Layout
export enum BtnType {
  isContainText = 'Text',
  isContainIcon = 'Icon',
  isContainBoth = 'Both',
}

export interface LayoutPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  hideStatusBar?: boolean;
  isScrollable?: boolean;
  onBackPress?: () => void;
  headerTitle?: string;
}

// MenuItem
export interface MenuItemPropsType {
  label: string;
  rightItem?: ReactNode;
  onPress: () => void;
}

// Card
export interface CardPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Input
export interface InputPropsType extends TextInputProps {
  testID?: string;
  style?: ViewStyle;
  error?: string;
}

export interface ICheckboxProps {
  id: string;
  name: string;
}

export interface IPaginationProps {
  page: number;
  pageSize?: number;
}
