import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper'; // Assuming you're using react-native-paper for the Card component
import {COLORS} from '../../theme/colors'; // Adjust import as per your project structure
import {
  widthToRatio,
  heightToRatio,
  getDeviceHeight,
} from '../../utils/commonMethods';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  children: ReactNode;
  shouldShowCardView?: boolean;
  customParentstyles?: ViewStyle;
}

const SubHeader: React.FC<HeaderProps> = ({
  showLogo = true,
  title,
  customParentstyles,
  shouldShowCardView = true,
  children,
}) => {
  const initials = (): string => {
    if (title) {
      return title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    }
    return '';
  };
  return (
    <View style={[styles.container, customParentstyles]}>
      <View style={styles.headerContainer} />
      {title && (
        <View style={styles.titleContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials()}</Text>
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      )}
      {shouldShowCardView ? (
        <Card
          style={[
            styles.card,
            {
              top: title || showLogo ? heightToRatio(75) : heightToRatio(6),
            },
          ]}>
          {children}
        </Card>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: getDeviceHeight(0.3),
    backgroundColor: COLORS.dDarkGreen,
  },

  titleContainer: {
    marginLeft: widthToRatio(24),
    flexDirection: 'row',
    marginTop: heightToRatio(6),
  },
  avatar: {
    height: heightToRatio(40),
    width: heightToRatio(40),
    borderRadius: heightToRatio(20),
    backgroundColor: COLORS.neutralLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#000',
  },
  titleTextContainer: {
    flexDirection: 'column',
    marginLeft: widthToRatio(16),
  },
  welcomeText: {
    fontWeight: '400',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(21),
    color: COLORS.neutralLight,
  },
  titleText: {
    fontWeight: '500',
    fontSize: heightToRatio(16),
    lineHeight: heightToRatio(20),
    color: COLORS.neutralLight,
  },
  card: {
    flex: 1,
    width: widthToRatio(312),
    left: widthToRatio(24),
    right: widthToRatio(24),
    paddingHorizontal: widthToRatio(16),
    paddingVertical: heightToRatio(16),
    position: 'absolute',
    backgroundColor: COLORS.white,
    top: 0,
    zIndex: 1,
  },
  cardText: {
    color: COLORS.neutralLight,
  },
});

export default SubHeader;
