import CardWrapper from '@/components/card/Card';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

function PerformanceCard() {
  return (
    <CardWrapper
      cardStyle={{width: '90%', alignSelf: 'center', paddingHorizontal: '5%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Your Performance- FY 2024</Text>
        <Text>{'>'}</Text>
      </View>
    </CardWrapper>
  );
}
export default PerformanceCard;
