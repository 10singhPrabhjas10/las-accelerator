import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Layout from 'components/Layout';
import CustomButton from 'components/button/CustomButton';
import DataCard from 'components/dataCard/DataCard';
import Spacer from 'components/spacer';
import React from 'react';
import {ScrollView} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {GREY_TEXT_THEME} from 'theme/theme';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';

const RetailerOrderDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const route =
    useRoute<RouteProp<RootNavigationTypes, 'RetailerOrderDetails'>>();
  const orderData = route.params.orderData;

  return (
    <Layout headerTitle="Order Details">
      <ScrollView
        style={CommonStyles.scrollViewContainer}
        automaticallyAdjustKeyboardInsets={true}>
        <Spacer size={15} />
        <DataCard header={orderData?.date} data={orderData?.headerData} />
        <Divider style={CommonStyles.horizontalDivider} />
        <Text variant="bodyMedium" theme={GREY_TEXT_THEME}>
          Order Details
        </Text>
        <Spacer size={10} />
        {orderData?.orderData?.length > 0 &&
          orderData?.orderData.map(item => <DataCard data={item} />)}
      </ScrollView>
      <CustomButton
        text="View Invoice Details"
        type={ButtonTypes.contained}
        onPress={() =>
          navigation.navigate('ViewInvoiceDetails', {
            invoiceNo: orderData?.invoiceNo,
            showDetailsButton: false,
          })
        }
        isDisabled={!orderData?.invoiceNo}
        style={CommonStyles.margin}
      />
    </Layout>
  );
};

export default RetailerOrderDetails;
