import CardWrapper from '@/components/card/Card';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import PacketIcon from '../../../../../assets/icons/packetIcon.svg';
interface IQuickLink {
  text: string;
  onPress: () => void;
}
const QuickLinkCard: React.FC<IQuickLink> = ({
  text = 'Beat Plan',
  onPress = () => {},
}) => {
  return (
    <CardWrapper onItemPress={onPress} cardStyle={style.container}>
      <PacketIcon />
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
