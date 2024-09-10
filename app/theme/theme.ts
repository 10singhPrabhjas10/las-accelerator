//External dependencies
import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper';

//Styles, Constants and interfaces
import {COLORS} from './colors';
import {fontConfig} from './fonts';

// Types
interface spacingType {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
}

// Spacing:- Common margins and paddings
const spacing: spacingType = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
};

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: COLORS.yellow,
    primary: COLORS.dgreen,
    onPrimary: COLORS.black,
    primaryContainer: COLORS.backgroundDgreen,
    onPrimaryContainer: COLORS.dDarkGreen,
    secondary: COLORS.orange,
    onSecondary: COLORS.black,
    secondaryContainer: COLORS.lightOrange,
    onSecondaryContainer: COLORS.darkOrange,
    tertiary: COLORS.black,
    onTertiary: COLORS.white,
    //onTertiaryContainer: ,
    //tertiaryContainer:,
    error: COLORS.red,
    onError: COLORS.red,
    errorContainer: COLORS.lightRed,
    onErrorContainer: COLORS.darkRed,
    background: COLORS.backgroundYellow,
    // onBackground:
    surface: COLORS.white,
    onSurface: COLORS.black,
    surfaceVariant: COLORS.lightGrey2,
    onSurfaceVariant: COLORS.grey2,
    outline: COLORS.grey3,
    backdrop: COLORS.backdrop,
  },
  fonts: configureFonts({config: fontConfig}),
};

const GREEN_TEXT_THEME = {colors: {onSurface: COLORS.darkGreen2}};
const GREY_TEXT_THEME = {colors: {onSurface: COLORS.grey2}};

export {spacing, theme, COLORS, GREEN_TEXT_THEME, GREY_TEXT_THEME};
