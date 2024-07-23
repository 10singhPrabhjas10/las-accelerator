//External dependencies
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

//Internal dependencies
import LanguageSelection from 'screens/selectLanguage/LanguageSelection';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import {
  updateIsAuthenticated,
  updateIsFirstTimeAppLaunch,
} from 'store/redux/userSlice';
import OnboardingScreens from 'screens/onboarding/Onboarding.screen';
import OtpAttemptExhaustedModal from 'modals/OtpAttemptExhaustedModal/OtpAttemptExhaustedModal';

//Styles, Constants and interfaces
import GeneralInformation from 'screens/primaryCP/profileDetails/generalInformation/GeneralInformation.screen';
import ShippingInfo from 'screens/primaryCP/profileDetails/shippingInfo/ShippingInformation.screen';
import RelatedCodesCardDetails from 'screens/primaryCP/profileDetails/relatedCodesCardDetails/RelatedCodesCardDetails.screen';
import ProfileDetails from 'screens/primaryCP/profileDetails/ProfileDetails.screen';
import RelatedCode from 'screens/primaryCP/profileDetails/relatedCode/RelatedCode.screen';
import DmsInformation from 'screens/primaryCP/profileDetails/dmsInformation/DmsInformation';
import FinancialInformation from 'screens/primaryCP/financialInformation/FinancialInformation.screen';
import FinancialSummary from 'screens/primaryCP/financialInformation/financialSummary/FinancialSummary.screen';
import KeyContacts from 'screens/primaryCP/profileDetails/keyContact/KeyContacts.screen';
import ShippingDetails from 'screens/primaryCP/profileDetails/shippingDetail/ShippingDetails.screen';
import PrimaryPartnerSearch from 'screens/primaryCP/primaryPartnerSearch/PrimaryPartnerSearch.screen';
import AccountOutstanding from 'screens/primaryCP/financialInformation/accountOutstanding/AccountOutstanding.screen';
import AccountStatement from 'screens/primaryCP/financialInformation/accountStatement/AccountStatement.screen';
import BeatScreen from 'screens/beat/Beat.screen';
import BeatPlanScreen from 'screens/beat/PlanModule/beatPlan/BeatPlan.screen';
import AddBeatscreen from 'screens/beat/PlanModule/beatPlan/addBeat/AddBeat.screen';
import ModifyBeatScreen from 'screens/beat/PlanModule/beatPlan/modifyBeat/ModifyBeat.screen';
import AddNewStoreScreen from 'screens/beat/PlanModule/addNewStore/AddNewStore.screen';
import OptionScreen from 'screens/beat/PlanModule/optionScreen/OptionScreen.screen';
import AddActivityScreen from 'screens/beat/PlanModule/addActivity/AddActivity.screen';
import MyBeatPlanScreen from 'screens/beat/PlanModule/beatPlan/myBeat/MyBeatPlan.screen';
import OrderManagement from 'screens/primaryCP/orderManagement/OrderManagement.screen';
import ProductsMapping from 'screens/primaryCP/productMapping/ProductMapping.screen';
import Loader from 'components/loader/Loader';
import {RootState, useAppSelector} from 'store/redux/store';
import OrderHistory from 'screens/primaryCP/orderManagement/orderHistory/OrderHistory.screen';
import OrderHistoryDetails from 'screens/primaryCP/orderManagement/orderHistoryDetails/OrderHistoryDetails.screen';
import InvoiceDetails from 'screens/primaryCP/orderManagement/invoiceDetails/InvoiceDetails.screen';
import InvoiceDetailsViewDetails from 'screens/primaryCP/orderManagement/invoiceDetailsViewDetails/InvoiceDetailsViewDetails.screen';
import OrderReplacement from 'screens/primaryCP/orderManagement/replacement/OrderReplacement.screen';
import OrderReturns from 'screens/primaryCP/orderManagement/orderReturns/OrderReturns.screen';
import OrderLineItem from 'screens/primaryCP/orderManagement/lineItem/OrderLineItem.screen';
import SnackBar from 'components/snackbar/SnackBar';
import PrimaryChannelPartner from 'screens/primaryCP/PrimaryChannelPartner.screen';
import {getStorageData} from 'utils/AppStorage';
import StoreCheckInScreen from 'screens/beat/StoreCheckIn/StoreCheckIn.screen';
import storeTabScreen from 'screens/beat/StoreCheckIn/storeTab/StoreTab.screen';
import CheckInScreen from 'screens/beat/StoreCheckIn/checkIn/CheckIn.screen';
import PrimaryOrderCreationScreen from 'screens/orderTaking/orderCreation/primaryOrderCreation/PrimaryOrderCreation.screen';
import CollectionTaskScreen from 'screens/beat/StoreCheckIn/checkIn/collectionTask/CollectionTask.screen';
import BalanceConfirmationScreen from 'screens/beat/StoreCheckIn/checkIn/balanceConfirmation/BalanceConfirmation.screen';
import EPODScreen from 'screens/beat/StoreCheckIn/checkIn/epod/EPOD.screen';
import CompetitiveIntelligenceScreen from 'screens/beat/StoreCheckIn/checkIn/competitiveIntelligence/CompetitiveIntelligence.screen';
import BTLScreen from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.screen';
import BtlPlanningScreen from 'screens/beat/StoreCheckIn/checkIn/btl/btlPlanning/BtlPlanning.screen';
import BTLActivationScreen from 'screens/beat/StoreCheckIn/checkIn/btl/btlActivation/BTLActivation.screen';
import BTLActivationCardScreen from 'screens/beat/StoreCheckIn/checkIn/btl/btlActivation/BTLActivationCard.screen';
import {IStoreBeatPlanItem} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import GrievanceRedressalScreen from 'screens/beat/StoreCheckIn/checkIn/grievanceRedressal/GrievanceRedressal.screen';
import InventoryCheckScreen from 'screens/beat/StoreCheckIn/checkIn/inventoryCheck/InventoryCheck.screen';
import InventoryCardScreen from 'screens/beat/StoreCheckIn/checkIn/inventoryCheck/InventoryCard.screen';
import InfluencerMeetScreen from 'screens/beat/StoreCheckIn/influencerMeet/InfluencerMeet.screen';
import TrainingScreen from 'screens/beat/StoreCheckIn/checkIn/training/Training.screen';
import DmsDataScreen from 'screens/beat/StoreCheckIn/checkIn/dmsDataHygiene/DmsData.screen';
import LeadManagement from 'screens/leadManagement/LeadManagement.screen';
import PrimaryLeadCreation from 'screens/leadManagement/primaryLeadCreation/PrimaryLeadCreation.screen';
import SecondaryLeadCreation from 'screens/leadManagement/secondaryLeadCreation/SecondaryLeadCreation.screen';
import MappedRetailer from 'screens/primaryCP/mappedRetailer/MappedRetailer.screen';
import PSchemeLaunchScreen from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/primaryScheme/PSchemeLaunch.screen';
import SSchemeLaunchScreen from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/secondaryScheme/SSchemeLaunch.screen';
import SecondarySchemeSlab from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/secondarySchemeSlab/SecondarySchemeSlab.screen';
import EligibleProducts from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/eligibleProducts/EligibleProducts.screen';
import SkuProductList from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/skuProductList/SkuProductList.screen';
import SecondaryGrivanceScreen from 'screens/beat/StoreCheckIn/checkIn/secondaryGrivanceRedressal/SecondaryGrivance.screen';
import RaiseTicket from 'screens/beat/StoreCheckIn/checkIn/secondaryGrivanceRedressal/raiseTicket/RaiseTicket.screen';
import TicketHistory from 'screens/beat/StoreCheckIn/checkIn/secondaryGrivanceRedressal/ticketHistory/TicketHistory.screen';
import InvoiceDetailsMoreDetails from 'screens/primaryCP/orderManagement/invoiceDetailsMoreDetails/InvoiceDetailsMoreDetails.screen';
import {GeolocationResponse} from '@react-native-community/geolocation';
import {ITransformedBTLData} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.interface';
import ReturnReplacementInformation from 'screens/primaryCP/orderManagement/returnReplacementInformation/ReturnReplacementInformation.screen';
import MappedChannelPartnerScreen from 'screens/profile/mappedPartner/MappedChannelPartner.screen';
import MappedRetailerScreen from 'screens/profile/mappedRetailer/MappedRetailer.screen';
import RetailerPartnerSearchScreen from 'screens/Retailer/retailerPartnerSearch/RetailerPartnerSearch.screen';
import SecondaryChannelPartnerScreen from 'screens/Retailer/SecondaryChannelPartner.screen';
import CustomerSePicScreen from 'screens/Retailer/customerSePic/CustomerSePic.screen';
import TermsAndConditions from 'screens/termsAndConditions/TermsAndConditions.screen';
import {AttendanceLandingScreen} from 'screens/attendance/attendance-landing/landing.screen';
import {CheckInCheckOutScreen} from 'screens/attendance/attendance-checkin-checkout/checkinout.screen';
import {AttendanceLeavesScreen} from 'screens/attendance/attendance-leaves/leaves.screen';
import {AttendanceRegularisationScreen} from 'screens/attendance/attendance-regularisation/regularisation.screen';
import OrderTaskScreen from 'screens/orderTaking/orderTask/OrderTask.screen';
import OrderCreationScreen from 'screens/orderTaking/orderCreation/OrderCreation.screen';
import OrderStatusScreen from 'screens/orderTaking/orderTask/orderStatus/OrderStatus.screen';
import ProfileDetailsScreen from 'screens/Retailer/profileDetails/ProfileDetails.screen';
import SecondarySchemesScreen from 'screens/Retailer/secondarySchemes/SecondarySchemes.screen';
import PrimaryCustomerSePic from 'screens/primaryCP/primaryCustomerSePic/PrimaryCustomerSePic.screen';
import EditProfileScreen from 'screens/Retailer/profileDetails/EditProfile.screen';
import SchemePerformanceScreen from 'screens/Retailer/secondarySchemes/schemePerformance/SchemePerformance.screen';
import SchemesCategory from 'screens/Retailer/secondarySchemes/SchemesCategory.screen';
import ViewRewardsScreen from 'screens/Retailer/secondarySchemes/viewRewards/ViewRewards.screen';
import ExpenseManagement from 'screens/expenseManagement/ExpenseManagement.screen';
import NewExpense from 'screens/expenseManagement/newExpense/NewExpense.screen';
import ExistingExpense from 'screens/expenseManagement/existingExpense/ExistingExpense.screen';
import InvoiceDetailsScreen from 'screens/Retailer/invoiceDetails/InvoiceDetails.screen';
import ViewInvoiceDetailsScreen from 'screens/Retailer/invoiceDetails/viewInvoiceDetails/ViewInvoiceDetails.screen';
import OrderDetailsScreen from 'screens/Retailer/invoiceDetails/orderDetails/OrderDetails.screen';
import PrimaryCPSecondarySchemes from 'screens/primaryCP/secondarySchemes/SecondarySchemes.screen';
import SecondarySchemeInfo from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/SecondarySchemeInfo.screen';
import ActiveScheme from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/activeScheme/ActiveScheme.screen';
import SchemeDetails from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/activeScheme/schemeDetails/SchemeDetails.screen';
import SlabDetails from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/activeScheme/slabDetails/SlabDetails.screen';
import SchemeEligibility from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/activeScheme/schemeEligibility/SchemeEligibility.screen';
import SkuDetails from 'screens/primaryCP/secondarySchemes/secondarySchemeInfo/activeScheme/schemeEligibility/skuDetails/SkuDetails.screen';
import RetailerEligibility from 'screens/primaryCP/secondarySchemes/components/retailerEligibility/RetailerEligibility.screen';
import SecondarySchemePerf from 'screens/primaryCP/secondarySchemes/secondarySchemePerformance/SecondarySchemePerf.screen';
import PerformanceActiveScheme from 'screens/primaryCP/secondarySchemes/secondarySchemePerformance/performanceActiveScheme/PerformanceActiveScheme.screen';
import PerfSchemeDetails from 'screens/primaryCP/secondarySchemes/secondarySchemePerformance/performanceActiveScheme/perfSchemeDetails/PerfSchemeDetails.screen';
import RewardsQualification from 'screens/primaryCP/secondarySchemes/secondarySchemePerformance/performanceActiveScheme/rewardsQualification/RewardsQualification.screen';
import SecondaryOrderStatus from 'screens/orderTaking/orderTask/orderStatus/SecondaryOrderStatus.screen';
import SelfManagement from 'screens/selfManagement/SelfManagement.screen';
import ExitProcess from 'screens/selfManagement/ExitProcess.screen';
import RetailerOrderHistory from 'screens/Retailer/orderHistory/RetailerOrderHistory.screen';
import RetailerOrderDetails from 'screens/Retailer/orderHistory/orderDetails/RetailerOrderDetails.screen';
import {IRetailerOrderHistoryData} from 'screens/Retailer/orderHistory/RetailerOrderHistory.interface';
import PerformanceManagement from 'screens/performanceManagement/PerformanceManagement.screen';
import SalesPerformance from 'screens/performanceManagement/salesPerformance/SalesPerformance.screen';
import CompliancePerformance from 'screens/performanceManagement/compliancePerformance/CompliancePerformance.screen';
import ProductPriceList from 'screens/productsPriceList/ProductPriceList.screen';
import ProductDisplay from 'screens/productsPriceList/productDisplay/ProductDisplay.screen';
import PriceListScreen from 'screens/productsPriceList/priceList/PriceList.screen';
import WebViewScreen from 'screens/productsPriceList/webView/WebView.screen';
import ProductCategoryDisplay from 'screens/productsPriceList/categoryDisplay/CategoryDisplay.screen';
import OrderTaking from 'screens/orderTaking/OrderTaking.screen';
import PrimarySecondarySales from 'screens/primaryCP/secondarySales/SecondarySales.screen';
import SecondarySalesPerformance from 'screens/primaryCP/secondarySalesPerformance/SecondarySalesPerformance.screen';
import {SECONDARY_SALES_TYPE} from 'utils/Constants';
import NotificationDetail from 'screens/notification/notificationDetail/NotificationDetail.screen';
import Performance from 'screens/Retailer/performance/Performance.screen';
import PrimarySales from 'screens/primaryCP/primarySales/PrimarySales.screen';
import PrimarySalesPerformance from 'screens/primaryCP/primarySales/primarySalesPerformance/PrimarySalesPerformance.screen';
import VolumeTarget from 'screens/primaryCP/primarySales/volumeTarget/VolumeTarget.screen';

export type RootNavigationTypes = {
  OnboardingScreens: undefined;
  TabNavigator: undefined;
  EditProfile: undefined;
  AddSecondaryUser: undefined;
  SecondaryUserList: undefined;
  SecondaryScheme: undefined;
  SchemeOfferList: undefined;
  lSelection: {navigateTo?: string};
  TermsAndConditions: {tnc: string; entityId?: string};
  AuthNavigator: undefined;
  AccountManagement: undefined;
  MappedChannelPartner: undefined;
  MappedProfileRetailer: {code: string};
  //Profile Details
  ProfileDetails: undefined;
  PrimaryChannelPartner: undefined;
  PrimaryPartnerSearch: {fromOrderTaking?: boolean};
  PrimaryCPGeneralInfo: undefined;
  KeyContacts: undefined;
  DmsInformation: undefined;
  ShippingInfo: undefined;
  RelatedCode: undefined;
  RelatedCodesCardDetails: {channelPartnerCode: string};
  ShippingDetails: {customerAddressCode: string};
  //Product Mapping
  ProductsMapping: undefined;
  //Financial Information
  FinancialInformation: undefined;
  FinancialSummary: undefined;
  AccountOutstanding: undefined;
  AccountDetails: {navigationFrom: string};
  AccountStatement: undefined;

  PrimaryCustomerSePic: undefined;

  //Primary CP Secondary Schemes
  PrimaryCPSecondarySchemes: undefined;
  SecondarySchemeInfo: undefined;
  ActiveScheme: {navigationFrom: string};
  SchemeDetails: {schemeId: string};
  SlabDetails: {schemeId: string};
  SchemeEligibility: {schemeId: string; categoryId: string};
  SkuDetails: {
    secondarySchemeId: string;
    categoryId: string;
    subCategoryId: string;
    series: string;
  };
  RetailerEligibility: {schemeId: string; navigationFrom: string};
  PrimarySecondarySales: undefined;
  SecondarySalesPerformance: {
    salesType: SECONDARY_SALES_TYPE;
    retailerChannelPartnerId: string;
  };

  //Secondary Scheme Performance
  SecondarySchemePerf: undefined;
  PerformanceActiveScheme: {navigationFrom: string};
  PerfSchemeDetails: {schemeId: string};
  RewardsQualification: {schemeId: string};

  //Beat
  Beat: undefined;
  BeatPlan: undefined;
  AddBeat: undefined;
  ModifyBeat: {
    data: any;
    date: string;
    beatPlanId: string;
    status: string;
    name: string;
  };
  AddNewStore: {
    navigationFrom: string;
    date: string;
    beatPlanId: string;
    status: string;
    name: string;
    refreshData?: () => void;
  };
  OptionScreen: {
    navigationFrom: string;
    date: string;
    fromStoreCheckIn?: boolean;
    beatPlanId: string;
    status: string;
  };
  AddActivity: {date: string; beatPlanId: string};
  MyBeatPlan: undefined;
  StoreCheckIn: undefined;
  StoreTab: {
    date: string;
    beatPlanId: string;
    status: string;
    name: string;
    location: GeolocationResponse;
  };
  CheckIn: {item: IStoreBeatPlanItem; date: string; refreshData: () => void};
  OrderTaking: undefined;
  OrderTask: {
    relation?: string;
    navigationFrom: string;
  };
  OrderCreation: {navigationFrom: string; relation: string | undefined};
  OrderStatus: {navigationFrom: string; relation: string | undefined};
  SecondaryOrderStatus: undefined;
  PrimaryOrderCreation: {navigationFrom: string; relation: string | undefined};
  SecondaryOrderCreation: undefined;
  CollectionTask: undefined;
  BalanceConfirmation: {beatPlanItemId: string};
  Epod: undefined;
  CompetitiveIntelligence: {relation: string | undefined};
  BTL: {navigationFrom: string; relation: string | undefined};
  BtlPlanning: {navigationFrom: string; relation: string | undefined};
  BtlActivation: undefined;
  BtlActivationCard: {btlData: ITransformedBTLData; refreshData: () => void};
  GrievanceRedressal: {navigationFrom: string};
  InventoryCheck: undefined;
  InventoryCard: {category: string; subCategory: string};
  InfluencerMeet: {beatPlanItemId: string; date: string};
  Training: {navigationFrom: string; date: string; beatPlanItemId: string};
  DmsData: undefined;
  PSchemeLaunch: {navigationFrom: string};
  SSchemeLaunch: {navigationFrom: string};
  SecondarySchemeSlab: {
    secondarySchemeId: string;
    schemeName: string;
    category: string;
    relationId: string;
  };
  EligibleProducts: {
    categoryId: string;
    secondarySchemeId: string;
    relationId: string;
  };
  SkuProductList: {
    secondarySchemeId: string;
    categoryId: string;
    subCategoryId: string;
    series: string;
    relationId: string;
  };
  SecondaryGrivance: {navigationFrom: string};
  RaiseTicket: {navigationFrom: string};
  TicketHistory: {navigationFrom: string};
  RetailerOrderHistory: undefined;
  RetailerOrderDetails: {orderData: IRetailerOrderHistoryData};

  // Order Management
  OrderManagement: undefined;
  OrderHistory: undefined;
  OrderHistoryDetails: {orderNo: string};
  InvoiceDetails: {
    fromOrderDetails: boolean;
    orderNo: string;
  };
  InvoiceDetailsViewDetails: {invoiceNo: string};
  InvoiceDetailsMoreDetails: {invoiceNo: string};
  OrderReplacement: undefined;
  OrderReturns: undefined;
  OrderLineItem: {orderNo: string; fromOrderDetails: boolean};
  ReturnReplacementInformation: {isReturn: boolean};
  //Lead Management
  LeadManagement: undefined;
  PrimaryLeadCreation: undefined;
  SecondaryLeadCreation: undefined;
  //Mapped Retailer
  MappedRetailer: undefined;
  //Secondary CP
  RetailerPartnerSearch: {fromOrderTaking?: boolean};
  SecondaryChannelPartner: undefined;
  CustomerSePic: {retailerCode: string};
  SecondaryProfileDetails: undefined;
  SecondarySchemes: undefined;
  SecondaryEditProfile: {navigationFrom: string};
  SchemePerformance: {categoryName: string};
  SchemesCategory: undefined;
  ViewRewards: {schemeCode: string; categoryName: string};
  InvoiceDetailsSecondary: {retailerCode: string};
  ViewInvoiceDetails: {invoiceNo: string; showDetailsButton: boolean};
  OrderDetails: {invoiceNo: string};
  //Expense Management
  ExpenseManagement: undefined;
  NewExpense: {selectedExpenseToBeModified: any};
  ExistingExpense: undefined;
  //Self Management
  SelfManagement: undefined;
  ExitProcess: undefined;
  //Attendance
  AttendanceLanding: undefined;
  CheckInCheckOut: undefined;
  AttendanceLeaves: undefined;
  AttendanceRegularisation: undefined;

  //PerformanceManagement
  PerformanceManagement: undefined;
  SalesPerformance: undefined;
  CompliancePerformance: undefined;
  //Product & Price List
  ProductPriceList: undefined;
  ProductCategoryDisplay: {navigateTo: string};
  ProductDisplay: {productId: string};
  PriceList: {productId: string};
  WebView: undefined;
  //Notification
  NotificationDetail: {notificationId: string};
  //Retailer Performance
  Performance: undefined;
  //Primary Sales
  PrimarySales: undefined;
  PrimarySalesPerformance: {
    salesData: IPrimarySalesResponse;
    customerTargetId: string;
    categoryId: string;
  };
  VolumeTarget: {categoryId: string; categoryName: string};
};

export type RootNavigationProp = NativeStackNavigationProp<RootNavigationTypes>;
const RootStack = createNativeStackNavigator();

export default function RootNavigation() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const isFirstTimeAppLaunch = useSelector(
    (state: RootState) => state.user.isFirstTimeAppLaunch,
  );

  const dispatch = useDispatch();
  const isLoading = useAppSelector((state: RootState) => state.modal.isLoading);

  useEffect(() => {
    async function checkIsLoggedIn() {
      try {
        let accessToken = await getStorageData('ACCESS_TOKEN');
        if (accessToken) {
          dispatch(updateIsAuthenticated(true));
        }
        const result = await getStorageData('IS_FIRST_TIME_APP_LAUNCH');
        if ((result === null || result === undefined) && !isAuthenticated) {
          dispatch(updateIsFirstTimeAppLaunch(true));
        } else {
          dispatch(updateIsFirstTimeAppLaunch(false));
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NotificationStack = (
    <>
      <RootStack.Screen
        name={'NotificationDetail'}
        component={NotificationDetail}
      />
    </>
  );

  const PerformanceManagementStack = (
    <>
      <RootStack.Screen
        name="PerformanceManagement"
        component={PerformanceManagement}
      />
      <RootStack.Screen name="SalesPerformance" component={SalesPerformance} />
      <RootStack.Screen
        name="CompliancePerformance"
        component={CompliancePerformance}
      />
    </>
  );

  const SecondaryChannelPartnerStack = (
    <>
      <RootStack.Screen
        name={'RetailerPartnerSearch'}
        component={RetailerPartnerSearchScreen}
      />
      <RootStack.Screen
        name={'SecondaryChannelPartner'}
        component={SecondaryChannelPartnerScreen}
      />
      <RootStack.Screen name="CustomerSePic" component={CustomerSePicScreen} />
      <RootStack.Screen
        name="SecondaryProfileDetails"
        component={ProfileDetailsScreen}
      />
      <RootStack.Screen
        name="SecondarySchemes"
        component={SecondarySchemesScreen}
      />
      <RootStack.Screen
        name="SecondaryEditProfile"
        component={EditProfileScreen}
      />
      <RootStack.Screen
        name="SchemePerformance"
        component={SchemePerformanceScreen}
      />
      <RootStack.Screen name="SchemesCategory" component={SchemesCategory} />
      <RootStack.Screen name="ViewRewards" component={ViewRewardsScreen} />
      {/* Invoice Details */}
      <RootStack.Screen
        name="InvoiceDetailsSecondary"
        component={InvoiceDetailsScreen}
      />
      <RootStack.Screen
        name="ViewInvoiceDetails"
        component={ViewInvoiceDetailsScreen}
      />
      <RootStack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <RootStack.Screen
        name="RetailerOrderHistory"
        component={RetailerOrderHistory}
      />
      <RootStack.Screen
        name="RetailerOrderDetails"
        component={RetailerOrderDetails}
      />
      {/* Retailer Performance */}
      <RootStack.Screen name="Performance" component={Performance} />
    </>
  );

  const ProductPriceListStack = (
    <>
      <RootStack.Screen name="ProductPriceList" component={ProductPriceList} />
      <RootStack.Screen
        name="ProductCategoryDisplay"
        component={ProductCategoryDisplay}
      />
      <RootStack.Screen name="ProductDisplay" component={ProductDisplay} />
      <RootStack.Screen name="PriceList" component={PriceListScreen} />
      <RootStack.Screen name="WebView" component={WebViewScreen} />
    </>
  );

  const BeatMappingStack = (
    <>
      {/* Beat Plan */}
      <RootStack.Screen name={'BeatPlan'} component={BeatPlanScreen} />
      <RootStack.Screen name={'Beat'} component={BeatScreen} />
      <RootStack.Screen name={'AddBeat'} component={AddBeatscreen} />
      <RootStack.Screen name={'ModifyBeat'} component={ModifyBeatScreen} />
      <RootStack.Screen name={'AddNewStore'} component={AddNewStoreScreen} />
      <RootStack.Screen name={'OptionScreen'} component={OptionScreen} />
      <RootStack.Screen name={'AddActivity'} component={AddActivityScreen} />
      <RootStack.Screen name={'MyBeatPlan'} component={MyBeatPlanScreen} />
      {/* Store Check In */}
      <RootStack.Screen name={'StoreCheckIn'} component={StoreCheckInScreen} />
      <RootStack.Screen name={'StoreTab'} component={storeTabScreen} />
      <RootStack.Screen name={'CheckIn'} component={CheckInScreen} />
      <RootStack.Screen
        name={'CollectionTask'}
        component={CollectionTaskScreen}
      />
      <RootStack.Screen
        name={'BalanceConfirmation'}
        component={BalanceConfirmationScreen}
      />
      <RootStack.Screen name={'Epod'} component={EPODScreen} />
      <RootStack.Screen
        name={'CompetitiveIntelligence'}
        component={CompetitiveIntelligenceScreen}
      />
      <RootStack.Screen name={'BTL'} component={BTLScreen} />
      <RootStack.Screen name={'BtlPlanning'} component={BtlPlanningScreen} />
      <RootStack.Screen
        name={'BtlActivation'}
        component={BTLActivationScreen}
      />
      <RootStack.Screen
        name={'BtlActivationCard'}
        component={BTLActivationCardScreen}
      />
      <RootStack.Screen
        name={'GrievanceRedressal'}
        component={GrievanceRedressalScreen}
      />
      <RootStack.Screen
        name={'InventoryCheck'}
        component={InventoryCheckScreen}
      />
      <RootStack.Screen
        name={'InventoryCard'}
        component={InventoryCardScreen}
      />
      <RootStack.Screen
        name={'InfluencerMeet'}
        component={InfluencerMeetScreen}
      />
      <RootStack.Screen name={'Training'} component={TrainingScreen} />
      <RootStack.Screen name={'DmsData'} component={DmsDataScreen} />
      <RootStack.Screen
        name={'PSchemeLaunch'}
        component={PSchemeLaunchScreen}
      />
      <RootStack.Screen
        name={'SSchemeLaunch'}
        component={SSchemeLaunchScreen}
      />
      <RootStack.Screen
        name="SecondarySchemeSlab"
        component={SecondarySchemeSlab}
      />
      <RootStack.Screen name="EligibleProducts" component={EligibleProducts} />
      <RootStack.Screen name="SkuProductList" component={SkuProductList} />
      <RootStack.Screen
        name={'SecondaryGrivance'}
        component={SecondaryGrivanceScreen}
      />
      <RootStack.Screen name="RaiseTicket" component={RaiseTicket} />
      <RootStack.Screen name="TicketHistory" component={TicketHistory} />
    </>
  );

  const OrderTakingStack = (
    <>
      <RootStack.Screen name={'OrderTaking'} component={OrderTaking} />
      <RootStack.Screen name={'OrderTask'} component={OrderTaskScreen} />
      <RootStack.Screen
        name={'OrderCreation'}
        component={OrderCreationScreen}
      />
      <RootStack.Screen name={'OrderStatus'} component={OrderStatusScreen} />
      <RootStack.Screen
        name={'SecondaryOrderStatus'}
        component={SecondaryOrderStatus}
      />
      <RootStack.Screen
        name={'PrimaryOrderCreation'}
        component={PrimaryOrderCreationScreen}
      />
    </>
  );

  const PrimaryChannelPartnerStack = (
    <>
      <RootStack.Screen
        name={'PrimaryPartnerSearch'}
        component={PrimaryPartnerSearch}
      />
      <RootStack.Screen
        name="PrimaryChannelPartner"
        component={PrimaryChannelPartner}
      />
      <RootStack.Screen name={'ProfileDetails'} component={ProfileDetails} />
      <RootStack.Screen
        name={'PrimaryCPGeneralInfo'}
        component={GeneralInformation}
      />
      <RootStack.Screen name={'KeyContacts'} component={KeyContacts} />
      <RootStack.Screen name={'DmsInformation'} component={DmsInformation} />
      <RootStack.Screen name={'ShippingDetails'} component={ShippingDetails} />
      <RootStack.Screen name={'RelatedCode'} component={RelatedCode} />
      <RootStack.Screen
        name={'RelatedCodesCardDetails'}
        component={RelatedCodesCardDetails}
      />
      <RootStack.Screen
        name={'PrimaryCPSecondarySchemes'}
        component={PrimaryCPSecondarySchemes}
      />
      {/* Secondary Scheme Info */}
      <RootStack.Screen
        name={'SecondarySchemeInfo'}
        component={SecondarySchemeInfo}
      />
      <RootStack.Screen name={'ActiveScheme'} component={ActiveScheme} />
      <RootStack.Screen name={'SchemeDetails'} component={SchemeDetails} />
      <RootStack.Screen name={'SlabDetails'} component={SlabDetails} />
      <RootStack.Screen
        name={'SchemeEligibility'}
        component={SchemeEligibility}
      />
      <RootStack.Screen name={'SkuDetails'} component={SkuDetails} />
      <RootStack.Screen
        name={'RetailerEligibility'}
        component={RetailerEligibility}
      />
      {/* Secondary Scheme Performance */}
      <RootStack.Screen
        name={'SecondarySchemePerf'}
        component={SecondarySchemePerf}
      />
      <RootStack.Screen
        name={'PerformanceActiveScheme'}
        component={PerformanceActiveScheme}
      />
      <RootStack.Screen
        name={'PerfSchemeDetails'}
        component={PerfSchemeDetails}
      />
      <RootStack.Screen
        name={'RewardsQualification'}
        component={RewardsQualification}
      />
    </>
  );

  const ProductMappingStack = (
    <>
      <RootStack.Screen name={'ProductsMapping'} component={ProductsMapping} />
    </>
  );

  const FinancialInformationStack = (
    <>
      <RootStack.Screen
        name={'FinancialInformation'}
        component={FinancialInformation}
      />
      <RootStack.Screen
        name={'FinancialSummary'}
        component={FinancialSummary}
      />
      <RootStack.Screen
        name={'AccountOutstanding'}
        component={AccountOutstanding}
      />
      <RootStack.Screen
        name={'AccountStatement'}
        component={AccountStatement}
      />
    </>
  );

  const OrderManagementStack = (
    <>
      <RootStack.Screen name={'OrderManagement'} component={OrderManagement} />
      <RootStack.Screen name={'OrderHistory'} component={OrderHistory} />
      <RootStack.Screen
        name={'OrderHistoryDetails'}
        component={OrderHistoryDetails}
      />
      <RootStack.Screen
        name={'InvoiceDetails'}
        component={InvoiceDetails}
        initialParams={{fromOrderDetails: false}}
      />
      <RootStack.Screen
        name={'InvoiceDetailsViewDetails'}
        component={InvoiceDetailsViewDetails}
      />
      <RootStack.Screen
        name={'InvoiceDetailsMoreDetails'}
        component={InvoiceDetailsMoreDetails}
      />
      <RootStack.Screen
        name={'OrderReplacement'}
        component={OrderReplacement}
      />
      <RootStack.Screen name={'OrderReturns'} component={OrderReturns} />
      <RootStack.Screen name={'OrderLineItem'} component={OrderLineItem} />
      <RootStack.Screen
        name={'ReturnReplacementInformation'}
        component={ReturnReplacementInformation}
      />
    </>
  );

  const LeadManagementStack = (
    <>
      <RootStack.Screen name={'LeadManagement'} component={LeadManagement} />
      <RootStack.Screen
        name={'PrimaryLeadCreation'}
        component={PrimaryLeadCreation}
      />
      <RootStack.Screen
        name={'SecondaryLeadCreation'}
        component={SecondaryLeadCreation}
      />
    </>
  );

  const ExpenseManagementStack = (
    <>
      <RootStack.Screen
        name={'ExpenseManagement'}
        component={ExpenseManagement}
      />
      <RootStack.Screen name={'NewExpense'} component={NewExpense} />
      <RootStack.Screen name={'ExistingExpense'} component={ExistingExpense} />
    </>
  );

  const SelfManagementStack = (
    <>
      <RootStack.Screen name={'SelfManagement'} component={SelfManagement} />
      <RootStack.Screen name={'ExitProcess'} component={ExitProcess} />
    </>
  );

  const AttendanceManagementStack = (
    <>
      <RootStack.Screen
        name="AttendanceLanding"
        component={AttendanceLandingScreen}
      />
      <RootStack.Screen
        name="CheckInCheckOut"
        component={CheckInCheckOutScreen}
      />
      <RootStack.Screen
        name="AttendanceLeaves"
        component={AttendanceLeavesScreen}
      />
      <RootStack.Screen
        name="AttendanceRegularisation"
        component={AttendanceRegularisationScreen}
      />
    </>
  );

  const SecondarySalesStack = (
    <>
      <RootStack.Screen
        name={'PrimarySecondarySales'}
        component={PrimarySecondarySales}
      />
      <RootStack.Screen
        name={'SecondarySalesPerformance'}
        component={SecondarySalesPerformance}
      />
    </>
  );

  const PrimarySalesStack = (
    <>
      <RootStack.Screen name={'PrimarySales'} component={PrimarySales} />
      <RootStack.Screen
        name={'PrimarySalesPerformance'}
        component={PrimarySalesPerformance}
      />
      <RootStack.Screen name={'VolumeTarget'} component={VolumeTarget} />
    </>
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isFirstTimeAppLaunch ? (
          <>
            <RootStack.Screen
              name={'lSelection'}
              component={LanguageSelection}
            />
            <RootStack.Screen
              name="OnboardingScreens"
              component={OnboardingScreens}
            />
          </>
        ) : isAuthenticated ? (
          <>
            <RootStack.Screen name="TabNavigator" component={TabNavigator} />
            <RootStack.Screen
              name={'lSelection'}
              component={LanguageSelection}
            />
            <RootStack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <RootStack.Screen name={'ShippingInfo'} component={ShippingInfo} />
            <RootStack.Screen
              name={'MappedChannelPartner'}
              component={MappedChannelPartnerScreen}
            />
            <RootStack.Screen
              name="MappedProfileRetailer"
              component={MappedRetailerScreen}
            />
            <RootStack.Screen
              name={'PrimaryCustomerSePic'}
              component={PrimaryCustomerSePic}
            />
            {PrimaryChannelPartnerStack}
            {SecondaryChannelPartnerStack}
            {ProductMappingStack}
            {FinancialInformationStack}
            {OrderManagementStack}
            <RootStack.Screen
              name="MappedRetailer"
              component={MappedRetailer}
            />
            {BeatMappingStack}
            {LeadManagementStack}
            {AttendanceManagementStack}
            {OrderTakingStack}
            {ExpenseManagementStack}
            {SelfManagementStack}
            {PerformanceManagementStack}
            {ProductPriceListStack}
            {SecondarySalesStack}
            {NotificationStack}
            {PrimarySalesStack}
          </>
        ) : (
          <>
            <RootStack.Screen
              name={'AuthNavigator'}
              component={AuthNavigator}
            />
          </>
        )}
      </RootStack.Navigator>
      {isLoading && <Loader />}
      <SnackBar />
      <OtpAttemptExhaustedModal />
    </NavigationContainer>
  );
}
