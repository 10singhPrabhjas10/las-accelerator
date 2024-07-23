import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ReactNode} from 'react';
import {Card, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {SnackBarEnum} from 'constants/modalTypes';
import InfoIcon from './../../../assets/icons/infoIcon.svg';

interface InformationCardProp {
  type: SnackBarEnum;
  icon?: ReactNode;
  description: string;
}

export const InformationCard = ({
  type,
  icon,
  description,
}: InformationCardProp) => {
  const primaryColor =
    type === SnackBarEnum.INFO
      ? COLORS.darkBlue
      : type === SnackBarEnum.ERROR
      ? COLORS.darkRed
      : COLORS.darkGreen;

  const backgroundColor =
    type === SnackBarEnum.INFO
      ? COLORS.lightBlue
      : type === SnackBarEnum.ERROR
      ? COLORS.semanticRed
      : COLORS.lightGreen;

  const theme = {colors: {onSurface: primaryColor}};

  return (
    <Card style={[styles.bottomCard, {backgroundColor: backgroundColor}]}>
      <Card.Content>
        <View style={styles.requestCard}>
          {icon ?? <InfoIcon height={20} width={20} fill={primaryColor} />}
          <Text
            style={styles.raiseTicketText}
            theme={theme}
            variant="bodyMedium">
            {description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomCard: {
    borderRadius: 4,
    shadowOpacity: 0,
    textShadowRadius: 0,
    shadowRadius: 0,
  },
  raiseTicketText: {
    marginHorizontal: 12,
  },
});
