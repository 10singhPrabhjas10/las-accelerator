import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import Accordion from 'components/accordion/Accordion';
import DataCard from 'components/dataCard/DataCard';
import ActionButton from 'components/button/ActionButton';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import ClipboardIcon from './../../../../../assets/icons/clipboardIcon.svg';
import {View} from 'react-native';
import {
  getOrderInvoiceEpodData,
  getOrderInvoiceSummaryData,
} from '../OrderManagement.business';

const InvoiceDetailsViewDetails = () => {
  const [invoiceSummaryData, setInvoiceSummaryData] =
    useState<IOrderInvoiceSummaryData>();
  const [ePodData, setEpodData] = useState<IOrderInvoiceSummaryData>();

  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'InvoiceDetailsViewDetails'>>();
  const invoiceNo = route?.params?.invoiceNo ?? '';

  useEffect(() => {
    getOrderInvoiceSummaryData(invoiceNo, setInvoiceSummaryData, false);
    getOrderInvoiceEpodData(invoiceNo, setEpodData);
  }, [invoiceNo]);

  return (
    <Layout
      headerTitle="Invoice Details"
      isScrollable
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <Accordion title="Invoice Summary">
          <DataCard
            data={invoiceSummaryData?.data}
            header={invoiceSummaryData?.date}
          />
        </Accordion>
        <Accordion title="ePOD Details">
          <DataCard data={ePodData?.data} header={ePodData?.date} />
        </Accordion>
      </View>
      <ActionButton
        title="Line Item"
        onPress={() =>
          navigation.navigate('OrderLineItem', {
            orderNo: invoiceNo,
            fromOrderDetails: false,
          })
        }
        icon={<ClipboardIcon />}
      />
    </Layout>
  );
};

export default InvoiceDetailsViewDetails;
