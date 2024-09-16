import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper'; // Assuming you're using react-native-paper for the Card component
import {COLORS} from '../../theme/colors'; // Adjust import as per your project structure
import {widthToRatio, heightToRatio} from '../../utils/commonMethods';

interface HeaderProps {
  title?: string;
  imageUrl?: string;
  imageUploadHandler?: Function;
  children: ReactNode;
  shouldShowCardView?: boolean;
  isImageEdit?: boolean;
  customParentstyles?: ViewStyle;
  otherSubHeaderContent?: ReactNode | boolean;
}

const SubHeader: React.FC<HeaderProps> = ({
  customParentstyles,
  shouldShowCardView = true,
  otherSubHeaderContent,
  children,
}) => {
  return (
    <View style={[styles.container, customParentstyles]}>
      <View style={styles.headerContainer}>
        {otherSubHeaderContent && otherSubHeaderContent}
      </View>
      {shouldShowCardView ? (
        <Card
          style={[
            styles.card,
            {
              marginTop: otherSubHeaderContent
                ? heightToRatio(-70)
                : heightToRatio(-129),
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
  container: {},
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
  pencilIconContainer: {
    position: 'absolute',
    left: widthToRatio(20),
    bottom: -12,
  },
});

export default SubHeader;
