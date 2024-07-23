import {ViewStyle} from 'react-native';

export interface IScreenHeaderProps {
  showScreenName?: boolean;
  onBackPress?: () => void;
  header?: string;
  headerStyle?: ViewStyle;
  customStyle?: ViewStyle;
}

export interface IScreenSubHeaderProps {
  title: string;
  subTitle: string;
}
