import {ReactNode} from 'react';
import {Animated, TextStyle} from 'react-native';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

export interface IModalComponentProps {
  showModal: boolean;
  setShowModal?: () => void;
  children: ReactNode;
  isBottom?: boolean;
}

export interface ISlideUpComponentProps {
  modalHeight: Animated.AnimatedInterpolation<string | number>;
  children: ReactNode;
}

export interface ISuccessFailureModalModalComponentProps {
  showModal: boolean;
  children?: ReactNode;
  setShowModal?: () => void;
  icon?: ReactNode;
  isSuccess?: boolean;
  showFooterButtons?: boolean;
  title: string;
  label: string;
  primaryButtonTitle?: string;
  secondaryBtnTitle?: string;
  onPrimaryBtnHandler?: () => void;
  onSecondaryBtnHandler?: () => void;
  theme?: any;
  btnType: 'cancel' | 'confirm' | 'both';
  headlineStyle?: TextStyle;
}
