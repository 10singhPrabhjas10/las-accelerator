import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import CardWrapper from 'components/card/Card';
import {COLORS} from 'theme/colors';
import Spacer from 'components/spacer';
import CustomPieChart from 'components/pieChart/CustomPieChart';
import OrderCard from 'screens/beat/components/orderCard/OrderCard';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import ModalComponent from 'modals/ModalComponent';
import CollectionModal from './CollectionModal';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/core';
import {RootNavigationProp} from 'routes/RootNavigation';
import {
  getChannelFinancesData,
  getCollectionAmountData,
  getVigilOutstandingData,
  submitLasPaymentData,
} from './CollectionTask.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {
  CollectionType,
  IChannelFinanceResponse,
  IPaymentCollectionReqBody,
  ITransformedCollectionAmount,
  IVigilResponse,
} from './CollectionTask.interface';
import {convertDateToDisplay, convertInLakhsRupees} from 'utils/commonMethods';
import {getSurveyResponses} from '../CheckIn.business';
import {ISurveyResponse} from '../CheckIn.interface';
import {DateFormats} from 'constants/dateFormat';

const CollectionTaskScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [showModal, setShowModal] = useState(false);
  const [collectionAmount, setCollectionAmount] =
    useState<ITransformedCollectionAmount>();
  const [vigilData, setVigilData] = useState<IVigilResponse>();
  const [channelFinanceData, setChannelFinanceData] =
    useState<IChannelFinanceResponse>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [channelFinanceCustomer, setChannelFinanceCustomer] =
    useState<ISurveyResponse>();
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  useEffect(() => {
    getCollectionAmountData(relationId, setCollectionAmount);
    getVigilOutstandingData(relationId, setVigilData);
    getChannelFinancesData(relationId, setChannelFinanceData);
    getSurveyResponses(relationId, setChannelFinanceCustomer);
  }, [relationId]);

  const vigilChartData = [
    {value: vigilData?.sapAge30 ?? 0, label: '0-30 days'},
    {value: vigilData?.sapAge60 ?? 0, label: '31-60 days'},
    {value: vigilData?.sapAge90 ?? 0, label: '61-90 days'},
    {value: vigilData?.sapAge120 ?? 0, label: '>90 days'},
  ];

  const financeChartData = [
    {
      value: Number(channelFinanceData?.attributes?.dueIn16To29Days ?? 0),
      label: '0-30 days',
    },
    {
      value: Number(channelFinanceData?.attributes?.dueIn30To59Days ?? 0),
      label: '31-60 days',
    },
    {
      value: Number(channelFinanceData?.attributes?.dueAfter60Days ?? 0),
      label: '>60 days',
    },
  ];

  const calculateChannelFinanceValue = (data: IChannelFinanceResponse) => {
    const {dueIn16To29Days, dueIn30To59Days, dueAfter60Days} = data?.attributes;
    const totalAmount =
      parseInt(dueIn16To29Days, 10) +
      parseInt(dueIn30To59Days, 10) +
      parseInt(dueAfter60Days, 10);
    return convertInLakhsRupees(totalAmount);
  };

  const calculateVigilValue = (data: IVigilResponse) => {
    const {sapAge30, sapAge60, sapAge90, sapAge120} = data;
    const totalAmount = sapAge30 + sapAge60 + sapAge90 + sapAge120;
    return convertInLakhsRupees(totalAmount);
  };

  const VigilOutstandingGraph = (
    <CardWrapper>
      <Text variant="titleMedium" style={style.textCenter}>
        VGIL Outstanding
      </Text>
      <Text variant="bodySmall" style={style.textCenterGrey}>
        Total: {vigilData && calculateVigilValue(vigilData)}
      </Text>
      <Spacer size={15} />
      <CustomPieChart
        legendColumnStyle={style.legendStyle}
        data={vigilChartData}
      />
    </CardWrapper>
  );

  const ChannelFinanceGraph = (
    <CardWrapper>
      <Text variant="titleMedium" style={style.textCenter}>
        Channel Finance Outstanding
      </Text>
      <Text variant="bodySmall" style={style.textCenterGrey}>
        Total:
        {channelFinanceData && calculateChannelFinanceValue(channelFinanceData)}
      </Text>
      <Spacer size={15} />
      <CustomPieChart
        legendColumnStyle={style.legendStyle}
        data={financeChartData}
        skipNumberFormat
      />
    </CardWrapper>
  );

  const handleSubmit = (
    vPayment: string,
    vDate: string,
    cPayment: string,
    cDate: string,
  ) => {
    const requestBody: IPaymentCollectionReqBody = {
      data: [
        {
          channelPartnerId: relationId,
          collectionPaymentDate: convertDateToDisplay(
            vDate,
            DateFormats.YYYY_MM_DD,
          ),
          collectionType: CollectionType.VGIL,
          collectionPaymentValue: parseInt(vPayment, 10),
        },
      ],
    };
    if (cPayment) {
      requestBody.data.push({
        channelPartnerId: relationId,
        collectionType: CollectionType.CHANNEL_FINANCE,
        collectionPaymentValue: parseInt(cPayment, 10),
        collectionPaymentDate: convertDateToDisplay(
          cDate,
          DateFormats.YYYY_MM_DD,
        ),
      });
    }
    submitLasPaymentData(requestBody, () => {
      setShowSuccessModal(true);
    });
  };

  return (
    <Layout style={CommonStyles.padding} headerTitle="Collection Task">
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}>
        <OrderCard
          data={collectionAmount}
          leftValue="Current Outstanding"
          rightValue="Current Overdue"
          title="Collection"
          showFooter={false}
        />
        {VigilOutstandingGraph}
        {ChannelFinanceGraph}
      </ScrollView>
      <CustomButton
        type={ButtonTypes.contained}
        text="Collection information"
        onPress={() => {
          setShowModal(true);
        }}
      />
      <ModalComponent showModal={showModal}>
        <CollectionModal
          setShowSuccessModal={setShowSuccessModal}
          setShowModal={setShowModal}
          isChannelFinanceCustomer={
            channelFinanceCustomer?.channelPartner?.channelFinanceCustomer
          }
          onSubmit={(vigilPayment, vigilDate, channelPayment, channelDate) =>
            handleSubmit(vigilPayment, vigilDate, channelPayment, channelDate)
          }
        />
      </ModalComponent>
      <SuccessFailureModal
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title="Updated"
        label="You have successfully updated Collection Information"
        secondaryBtnTitle="Dismiss"
        onSecondaryBtnHandler={() => {
          navigation.goBack();
        }}
        headlineStyle={style.headlineStyle}
      />
    </Layout>
  );
};

const style = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  textCenterGrey: {textAlign: 'center', color: COLORS.grey2},
  legendStyle: {
    width: '25%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  headlineStyle: {color: COLORS.darkGreen2},
});
export default CollectionTaskScreen;
