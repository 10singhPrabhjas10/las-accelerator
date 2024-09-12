import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper'; // Assuming you're using react-native-paper for the Card component
import {COLORS} from '../../theme/colors'; // Adjust import as per your project structure
import {widthToRatio, heightToRatio} from '../../utils/commonMethods';

interface HeaderProps {
  title?: string;
  children: ReactNode;
  shouldShowCardView?: boolean;
  customParentstyles?: ViewStyle;
}

const SubHeader: React.FC<HeaderProps> = ({
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
      <View style={styles.headerContainer}>
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
      </View>
      {shouldShowCardView ? (
        <Card
          style={[
            styles.card,
            {
              marginTop: title ? heightToRatio(-70) : heightToRatio(-129),
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
    // flex: 1,
  },
  headerContainer: {
    height: heightToRatio(145),
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
    width: widthToRatio(312),
    alignSelf: 'center',
    paddingHorizontal: widthToRatio(16),
    paddingVertical: heightToRatio(16),
    backgroundColor: COLORS.white,
  },
  cardText: {
    color: COLORS.neutralLight,
  },
});

export default SubHeader;
