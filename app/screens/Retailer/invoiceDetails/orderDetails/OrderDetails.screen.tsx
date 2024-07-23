import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {Divider, Text} from 'react-native-paper';
import Spacer from 'components/spacer';
import {COLORS} from 'theme/colors';

const OrderDetailsScreen = () => {
  return (
    <Layout headerTitle="Order Details" style={CommonStyles.padding}>
      <DataCard data={[]} />
      <Divider style={CommonStyles.horizontalDivider} />
      <Spacer size={15} />
      <Text style={styles.text} variant="labelLarge">
        Order Details
      </Text>
      <Spacer size={15} />
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <DataCard data={[]} />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.grey2,
  },
});

export default OrderDetailsScreen;
