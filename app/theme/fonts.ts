import {heightToRatio} from '@/utils/commonMethods';
import {MD3Typescale} from 'react-native-paper/lib/typescript/types';

export const fontConfig: Partial<MD3Typescale> = {
  // Heading 1 : Component Heading
  headlineLarge: {
    fontFamily: 'OpenSans-Medium',
    fontSize: heightToRatio(32),
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: heightToRatio(40),
  },
  // Heading 2 : Section Heading
  headlineMedium: {
    fontFamily: 'OpenSans-Medium',
    fontSize: heightToRatio(28),
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: heightToRatio(36),
  },
  // Heading 3 : Page Heading
  headlineSmall: {
    fontFamily: 'OpenSans-Medium',
    fontSize: heightToRatio(24),
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: heightToRatio(32),
  },

  // Body Regular : Body copy
  bodySmall: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(12),
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: heightToRatio(16),
  },
  // Body Medium : Body copy, Buttons
  bodyMedium: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(14),
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: heightToRatio(20),
  },
  // Body Bold : Body copy for highlighting, etc
  bodyLarge: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(16),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: heightToRatio(24),
  },

  // Caption 1 : Error Messages, Captions, Information text, etc.
  labelMedium: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(12),
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: heightToRatio(16),
  },
  // Caption 2 : In special cases.
  labelSmall: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(11),
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: heightToRatio(16),
  },
  // Caption 3 : Error Messages, Captions, Information text, etc.
  labelLarge: {
    fontFamily: 'OpenSans-Medium',
    fontSize: heightToRatio(14),
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: heightToRatio(20),
  },
  default: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    letterSpacing: 0,
  },

  titleSmall: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(14),
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: heightToRatio(20),
  },
  titleMedium: {
    fontFamily: 'OpenSans-Medium',
    fontSize: heightToRatio(16),
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: heightToRatio(24),
  },
  titleLarge: {
    fontFamily: 'OpenSans-Regular',
    fontSize: heightToRatio(22),
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: heightToRatio(28),
  },
};
