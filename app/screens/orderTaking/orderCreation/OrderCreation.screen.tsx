import {View, StyleSheet} from 'react-native';
import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import OrderCard from 'screens/beat/components/orderCard/OrderCard';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {InformationCard} from 'components/infoCard/InformationCard';
import {SnackBarEnum} from 'constants/modalTypes';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {getCategoryDropdownData} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {EMPTY_DATA_DASH, NavigationFrom} from 'utils/Constants';
import {getTargetPerformanceData} from '../OrderTaking.business';
import {
  ICreditLimit,
  ITargetTransformedResponse,
  ReportType,
} from '../OrderTaking.interface';
import {getPrimaryCustomerDetails} from 'screens/primaryCP/PrimaryChannelPartner.business';
import {getFinancialSummaryData} from 'screens/primaryCP/financialInformation/FinancialInformation.business';
import {CURRENT_DATE, DateFormats} from 'constants/dateFormat';
import {
  convertDateToDisplay,
  formatNumber,
  getTranslationLabel,
} from 'utils/commonMethods';

interface ICustomerData {
  isBlocked: boolean;
  data: IDataCard[];
  code: string;
}

const OrderCreationScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'OrderCreation'>>();
  const {navigationFrom, relation} = route.params;
  const isDropdownRequired = navigationFrom !== NavigationFrom?.PRIMARY_CP;

  const [productDivisionData, setProductDivisionData] = useState([]);
  const [ytdDropdownValue, setYtdDropdownValue] = useState('');
  const [mtdDropdownValue, setMtdDropdownValue] = useState('');
  const [mtdData, setMtdData] = useState<ITargetTransformedResponse>();
  const [ytdData, setYtdData] = useState<ITargetTransformedResponse>();
  const [creditLimit, setCreditLimit] = useState<ICreditLimit>({
    availableCreditLimit: 0,
    pei: 0,
    totalCreditLimit: 0,
    utilizedCreditLimit: 0,
  });
  const [customerData, setCustomerData] = useState<ICustomerData>({
    isBlocked: false,
    data: [],
    code: '',
  });

  const channelPartnerId = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state.channelPartner.relationId,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN
      ? relationId
      : channelPartnerId;

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      getCategoryDropdownData(code, setProductDivisionData);
    }
  }, [code, relation]);

  const fetchTargetPerformance = useCallback(
    (categoryId: string, reportType: string, setData: SetStateAction<any>) => {
      getTargetPerformanceData(code, reportType, setData, categoryId);
    },
    [],
  );

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      fetchTargetPerformance(ytdDropdownValue, ReportType.YEARLY, setYtdData);
    }
  }, [ytdDropdownValue, relation]);

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      fetchTargetPerformance(mtdDropdownValue, ReportType.MONTHLY, setMtdData);
    }
  }, [mtdDropdownValue, relation]);

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      getPrimaryCustomerDetails(code, setCustomerData);
    }
  }, [code, relation]);

  useEffect(() => {
    if (
      relation === Relation.PRIMARY_CHANNEL_PARTNER &&
      customerData?.code !== ''
    ) {
      getFinancialSummaryData(
        customerData?.code,
        convertDateToDisplay(CURRENT_DATE, DateFormats.YYYY_MM_DD),
        setCreditLimit,
      );
    }
  }, [relation, customerData?.code]);

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={getTranslationLabel('order_taking_task')}>
      <View style={CommonStyles.flexOne}>
        {relation === Relation.PRIMARY_CHANNEL_PARTNER && (
          <>
            <OrderCard
              dropdownData={productDivisionData}
              data={ytdData}
              title={'target_vs_achievement'}
              leftValue={'ytd_target'}
              rightValue={'achievement'}
              showFooter
              dropdownRequired={isDropdownRequired}
              setDropdownValue={setYtdDropdownValue}
            />
            <OrderCard
              dropdownData={productDivisionData}
              data={mtdData}
              title={'mtd_target_vs_achievement'}
              leftValue={'mtd_target'}
              rightValue={'achievement'}
              showFooter
              dropdownRequired={isDropdownRequired}
              setDropdownValue={setMtdDropdownValue}
            />
            <OrderCard
              title={'credit_limit_details'}
              leftValue={'credit_limit_available'}
              rightValue={'credit_limit_utilized'}
              data={
                [
                  {
                    leftTitle:
                      creditLimit?.availableCreditLimit >= 0
                        ? `₹ ${formatNumber(creditLimit?.availableCreditLimit)}`
                        : EMPTY_DATA_DASH,
                    rightTitle:
                      creditLimit?.utilizedCreditLimit >= 0
                        ? `₹ ${formatNumber(creditLimit?.utilizedCreditLimit)}`
                        : EMPTY_DATA_DASH,
                  },
                ][0]
              }
              showFooter={false}
            />
          </>
        )}
      </View>
      {customerData?.isBlocked && (
        <InformationCard
          type={SnackBarEnum.ERROR}
          description={'customer_block_message'}
        />
      )}
      <CustomButton
        type={ButtonTypes.contained}
        isDisabled={
          relation === Relation.PRIMARY_CHANNEL_PARTNER
            ? customerData?.isBlocked
            : false
        }
        text={'place_order'}
        onPress={() =>
          navigation.navigate('PrimaryOrderCreation', {
            navigationFrom,
            relation,
          })
        }
        style={styles.button}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
});

export default OrderCreationScreen;
