import React, {useState} from 'react';
import Layout from 'components/Layout';
import OrderReturnProgress from '../components/OrderReturnProgress';
import RequestInitiation from '../components/RequestInitiation';
import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';
import SkuDetails from '../components/SkuDetails';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

const OrderReturns = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [requestData, setRequestData] = useState<IPrevData>({
    customerCode: '',
    salesOffice: '',
    productCategory: '',
    reasonForReturn: '',
    comments: '',
    serialisedProducts: false,
  });

  const navigation = useNavigation<RootNavigationProp>();

  const onRequestInitiationSubmit = (prevData: IPrevData) => {
    setRequestData(prevData);
    setActiveIndex(2);
  };

  const onSkuDetailsSubmit = () => {
    setShowSuccessModal(true);
  };

  return (
    <Layout headerTitle="Returns" isScrollable style={CommonStyles.padding}>
      <OrderReturnProgress activeIndex={activeIndex} />
      <Spacer size={15} />
      {activeIndex === 1 ? (
        <RequestInitiation onSubmit={onRequestInitiationSubmit} />
      ) : activeIndex === 2 ? (
        <SkuDetails onSubmit={onSkuDetailsSubmit} prevData={requestData} />
      ) : null}
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title="Submitted"
        label="You have successfully submitted Return request."
        btnType="confirm"
        secondaryBtnTitle="Dismiss"
        isSuccess
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          // navigation.navigate('ReturnReplacementInformation', {isReturn: true});
          navigation.navigate('OrderManagement');
        }}
      />
    </Layout>
  );
};

export default OrderReturns;
