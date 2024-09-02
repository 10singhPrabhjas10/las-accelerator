import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {IScreenHeaderProps} from 'types/headers';
import {COLORS} from 'theme/colors';
import LogoSvg from '../../../assets/images/logo.svg';

const ScreenHeader = ({
  showScreenName = true,
  onBackPress,
  header,
  headerStyle,
}: IScreenHeaderProps) => {
  return (
    <View style={[styles.container, headerStyle]}>
      {showScreenName ? (
        <>
          <IconButton
            icon="chevron-left"
            size={30}
            onPress={onBackPress}
            iconColor={COLORS.white}
          />
          <Text variant="bodyLarge" style={styles.header}>
            {header}
          </Text>
        </>
      ) : (
        <View style={styles.header} />
      )}
      <View style={styles.logoContainer}>
        <LogoSvg />
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 16,
    backgroundColor: COLORS.dDarkGreen,
    borderBottomColor: COLORS.grey3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    paddingVertical: 10,
  },
  header: {
    flex: 1,
    color: COLORS.white,
  },
  logoContainer: {
    // marginTop: 11,
    marginRight: 24,
  },
});
