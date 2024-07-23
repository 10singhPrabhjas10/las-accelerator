import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import DataCard from 'components/dataCard/DataCard';
import {Divider, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import Spacer from 'components/spacer';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {getEachInvoiceDetailsData} from '../Invoice.business';
import {ITransformedEachInvoiceDetails} from '../Invoice.interface';

const ViewInvoiceDetailsScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'ViewInvoiceDetails'>>();
  const {invoiceNo, showDetailsButton} = route.params;
  const [invoiceData, setInvoiceData] =
    useState<ITransformedEachInvoiceDetails>();

  useEffect(() => {
    getEachInvoiceDetailsData(setInvoiceData, invoiceNo);
  }, [invoiceNo]);

  return (
    <Layout headerTitle="Invoice Details">
      <ScrollView
        style={CommonStyles.scrollViewContainer}
        automaticallyAdjustKeyboardInsets={true}>
        <Spacer size={15} />
        <DataCard
          header={invoiceData?.date}
          key={invoiceData?.invoiceNo}
          data={invoiceData?.headerData}
        />
        <Divider style={CommonStyles.horizontalDivider} />
        <Text style={styles.text} variant="labelLarge">
          Invoice Details
        </Text>
        <Spacer size={15} />
        {invoiceData?.data &&
          invoiceData?.data?.length > 0 &&
          invoiceData?.data.map(item => (
            <DataCard data={item.data} key={item.id} />
          ))}
      </ScrollView>
      {showDetailsButton ? (
        <CustomButton
          type={ButtonTypes.contained}
          text="View Order Details"
          onPress={() => {
            navigation.navigate('OrderDetails', {invoiceNo});
          }}
          style={CommonStyles.margin}
        />
      ) : null}
    </Layout>
  );
};
const styles = StyleSheet.create({
  text: {
    color: COLORS.grey2,
  },
});
export default ViewInvoiceDetailsScreen;
