import React from 'react';
import {useNavigation} from '@react-navigation/native';

import ActionButton from 'components/button/ActionButton';
import Layout from 'components/Layout';

import CloseBookIcon from './../../../../assets/icons/closeBookIcon.svg';
import ClipboardIcon from './../../../../assets/icons/clipboardIcon.svg';
import BackIcon from './../../../../assets/icons/backIcon.svg';
import ReplacementIcon from './../../../../assets/icons/replacementIcon.svg';
import CommonStyles from 'utils/commonStyle';
import {RootNavigationProp} from 'routes/RootNavigation';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';

const OrderManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const userData = useSelector((state: RootState) => state?.user?.user);
  const lasType = userData?.lasType;

  const historyIcon = () => <CloseBookIcon />;
  const outstandingIcon = () => <ClipboardIcon />;
  const backIcon = () => <BackIcon />;
  const replacementIcon = () => <ReplacementIcon />;

  return (
    <Layout headerTitle="Order Management" style={CommonStyles.padding}>
      <ActionButton
        title="Order History"
        onPress={() => navigation.navigate('OrderHistory')}
        icon={historyIcon()}
      />
      <ActionButton
        title="Invoice Details"
        onPress={() =>
          navigation.navigate('InvoiceDetails', {
            fromOrderDetails: false,
            orderNo: '',
          })
        }
        icon={outstandingIcon()}
      />
      {lasType === LasType.TE && (
        <>
          <ActionButton
            title="Returns"
            onPress={() => navigation.navigate('OrderReturns')}
            icon={backIcon()}
          />

          <ActionButton
            title="Replacement"
            onPress={() => navigation.navigate('OrderReplacement')}
            icon={replacementIcon()}
          />
        </>
      )}
    </Layout>
  );
};

export default OrderManagement;
