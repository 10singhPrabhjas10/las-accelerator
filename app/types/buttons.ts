import {ReactElement, ReactNode} from 'react';
import {
  PressableProps,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {SvgProps} from 'react-native-svg';
export interface IButtonProps {
  onPress: () => void;
  text: string;
}

export enum ButtonTypes {
  text = 'text',
  outline = 'outlined',
  contained = 'contained',
  elevated = 'elevated',
  containedTonal = 'contained-tonal',
}

export interface IPrimaryButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  buttonType?: keyof typeof ButtonTypes;
  icon?: React.JSX.Element;
  border?: boolean;
  borderColor?: string;
}

export interface IActionButtonProps {
  icon: ReactElement<SvgProps> | ReactNode;
  rightIcon?: ReactElement<SvgProps> | ReactNode;
  title: string;
  subTitle?: string;
  onPress: (title: string) => void;
  pressableProps?: PressableProps;
}

export interface ICustomButtonProps {
  key?: string | number;
  type: ButtonTypes;
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  textCustomTheme?: ThemeProp;
  loading?: boolean;
  textStyle?: TextStyle;
  contentStyle?: ViewStyle;
}

export interface IFilterButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  isDisabled?: boolean;
}
