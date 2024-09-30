import {ViewStyle} from 'react-native';

export interface IScreenHeaderProps {
  showScreenName?: boolean;
  onBackPress?: () => void;
  header?: string;
  headerStyle?: ViewStyle;
  customStyle?: ViewStyle;
  customLogo?: () => JSX.Element | null;
  onPressLogo?: () => void;
}

export interface IScreenSubHeaderProps {
  title: string;
  subTitle: string;
}
