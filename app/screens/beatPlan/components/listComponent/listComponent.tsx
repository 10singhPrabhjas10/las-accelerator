import React from 'react';
import {View} from 'react-native-animatable';
import {Text} from 'react-native-paper';
import {FlatList, TouchableOpacity} from 'react-native';

import styles from './listComponent.style';
import RightArrow from '@/../assets/icons/arrowRight_black.svg';
import PacketIcon from '@/../assets/icons/packetIcon.svg';
import CardWrapper from '@/components/card/Card';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
import {BeatPlan} from '@/utils/Constants';

function ListComponent() {
  const navigation = useNavigation<RootNavigationProp>();
  const listComponentData = [
    {
      title: 'Place New Order',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {
        navigation.navigate('OrderHome', {from: BeatPlan});
      },
    },
    {
      title: 'Invoices',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {},
    },
    {
      title: 'Collections',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {},
    },
    {
      title: 'Returns & Claims',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {},
    },
    {
      title: 'BTL',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {},
    },
    {
      title: 'Raise an Issue',
      image: <PacketIcon height={40} width={40} />,
      onPress: () => {},
    },
  ];
  return (
    <CardWrapper cardStyle={styles.listitems}>
      <FlatList
        data={listComponentData}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={item.onPress} style={styles.itemContainer}>
            <View style={styles.iconContainer}>{item.image}</View>
            <Text variant="titleSmall" style={styles.itemText}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.rightArrowContainer}>
              <RightArrow height={20} width={20} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </CardWrapper>
  );
}

export default ListComponent;
