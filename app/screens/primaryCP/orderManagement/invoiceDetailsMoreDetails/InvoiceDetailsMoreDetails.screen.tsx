import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Layout from 'components/Layout';
import CustomButton from 'components/button/CustomButton';
import DataCard from 'components/dataCard/DataCard';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';
import {getOrderInvoiceSummaryData} from '../OrderManagement.business';
import ScriptIcon from './../../../../../assets/icons/scriptIcon.svg';

const InvoiceDetailsMoreDetails = () => {
  const [invoiceSummaryData, setInvoiceSummaryData] =
    useState<IOrderInvoiceSummaryData>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'InvoiceDetailsMoreDetails'>>();
  const invoiceNo = route?.params?.invoiceNo ?? '';

  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    getOrderInvoiceSummaryData(invoiceNo, setInvoiceSummaryData, true);
  }, [invoiceNo]);

  return (
    <Layout headerTitle="Invoice Details" style={CommonStyles.padding}>
      <ScrollView
        style={CommonStyles.flexOne}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}>
        <DataCard data={invoiceSummaryData?.data} />
      </ScrollView>
      <CustomButton
        text="View More Details"
        onPress={() =>
          navigation.navigate('InvoiceDetailsViewDetails', {invoiceNo})
        }
        type={ButtonTypes.contained}
        style={CommonStyles.marginTop}
        icon={<ScriptIcon />}
      />
    </Layout>
  );
};

export default InvoiceDetailsMoreDetails;
