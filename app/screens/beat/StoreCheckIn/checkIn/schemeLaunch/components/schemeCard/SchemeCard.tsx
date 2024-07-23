// External Dependencies
import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

// Styles, constants and Interfaces
import styles from './SchemeCard.style';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {ISchemeCardProps} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import RowItem from 'components/rowItem/RowItem';

const SchemeCard = ({data, footerButton, key}: ISchemeCardProps) => {
  return (
    <Card style={[styles.container]}>
      <Card.Content style={styles.cardContent} key={key}>
        {data?.map((content, index) => {
          return (
            <RowItem
              key={index + content.id}
              keyContent={content.title}
              value={content.text}
              showDivider={data.length - 1 !== index}
            />
          );
        })}
      </Card.Content>
      {footerButton && (
        <Card.Actions>
          <View style={styles.contentFooter}>
            {footerButton?.map((btn, index) => (
              <CustomButton
                key={index + btn?.title}
                type={ButtonTypes.outline}
                text={btn.title}
                onPress={btn.onButtonPress}
                icon={btn.icon}
              />
            ))}
          </View>
        </Card.Actions>
      )}
    </Card>
  );
};

export default SchemeCard;
