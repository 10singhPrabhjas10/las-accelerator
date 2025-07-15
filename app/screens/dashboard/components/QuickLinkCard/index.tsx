import CardWrapper from '@/components/card/Card';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import PacketIcon from '../../../../../assets/icons/packetIcon.svg';
interface IQuickLink {
  text: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}
const QuickLinkCard: React.FC<IQuickLink> = ({
  text = 'Beat Plan',
  onPress = () => {},
  customStyle = {},
  icon,
}) => {
  return (
    <CardWrapper
      onItemPress={onPress}
      cardStyle={[style.container, customStyle]}>
      <View style={{justifyContent: 'center'}}>
        {icon ? icon : <PacketIcon />}
      </View>
      <Text variant="labelMedium">{text}</Text>
    </CardWrapper>
  );
};
const style = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
  },
});
export default QuickLinkCard;
