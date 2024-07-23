import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import AddProductCard from 'screens/beat/components/addProductCard/AddProductCard';
import DropDown from 'components/dropdown/Dropdown';
import {Divider} from 'react-native-paper';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  IPrimaryOrderProps,
  Relation,
} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import Spacer from 'components/spacer';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {getCategoryDropdownData} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import moment from 'moment';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {
  IItems,
  IPrimaryOrderRequestBody,
  ISalesOrderItem,
  ISalesOrderRequestBody,
} from 'screens/orderTaking/OrderTaking.interface';
import {
  getEasyDmsSalesOrderData,
  getRetailerData,
  getRetailerPrimaryCpListData,
} from 'screens/orderTaking/OrderTaking.business';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationFrom} from 'utils/Constants';
import {
  getAddressData,
  getSecondaryCPAddressData,
  getSecondaryCategoryDropdownData,
  submitPrimaryOrder,
} from './PrimaryOrderCreation.business';
import Geolocation from '@react-native-community/geolocation';
import {handleApiError} from 'utils/CommonReduxMethods';
import {getLeadsAddress} from 'screens/beat/StoreCheckIn/checkIn/CheckIn.business';
import {getChannelPartnersData} from 'screens/performanceManagement/PerformanceMgmt.business';
import {getSecondaryCustomerDetails} from 'screens/Retailer/Retailer.business';

const PrimaryOrderCreationScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'PrimaryOrderCreation'>>();
  const {navigationFrom, relation} = route.params;
  const {
    customerCode: channelPartnerId,
    retailerCustomerCode,
    relationId,
  } = useSelector((state: RootState) => state.channelPartner);

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN
      ? relationId
      : navigationFrom === NavigationFrom.SECONDARY_CP
      ? retailerCustomerCode
      : channelPartnerId;
  const isPrimaryCP = relation === Relation.PRIMARY_CHANNEL_PARTNER;
  const isSecondaryLead = relation === Relation.SECONDARY_LEAD;

  const [productDivision, setProductDivision] = useState('');
  const [address, setAddress] = useState('');
  const [primaryPartner, setPrimaryPartner] = useState('');
  const [dealerCode, setDealerCode] = useState('');

  const [skuIndex, setSkuIndex] = useState(1);

  const [orderData, setOrderData] = useState<IPrimaryOrderProps[]>([]);
  const [productDivisionData, setProductDivisionData] = useState([]);
  const [categoryData, setSecondaryCategoryData] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [primaryPartnerData, setPrimaryPartnerData] = useState([]);

  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isSecondaryLead) {
      getChannelPartnersData(setPrimaryPartnerData); // to get Primary CP of sec lead
      getLeadsAddress(code, setAddressList, undefined);
    } else if (!isPrimaryCP) {
      getRetailerPrimaryCpListData(setPrimaryPartnerData, code);
      getSecondaryCategoryDropdownData(code, setSecondaryCategoryData);
      getSecondaryCPAddressData(code, setAddressList);
    } else if (isPrimaryCP) {
      getCategoryDropdownData(code, setProductDivisionData);
      getAddressData(code, setAddressList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (isSecondaryLead && primaryPartner !== '') {
      getCategoryDropdownData(primaryPartner, setSecondaryCategoryData);
    }
  }, [isSecondaryLead, primaryPartner]);

  useEffect(() => {
    if (primaryPartner) {
      getRetailerData(primaryPartner, setDealerCode);
    }
  }, [primaryPartner]);

  useEffect(() => {
    if (navigationFrom === NavigationFrom.STORE_CHECKIN && !isPrimaryCP) {
      getSecondaryCustomerDetails(code, undefined);
    }
  }, [navigationFrom, isPrimaryCP]);

  const handleRemoveForm = (formIndex: number) => {
    setOrderData(orderData.filter((_, index) => index !== formIndex));
    setSkuIndex(prevIndex => Math.max(1, prevIndex - 1));
  };

  const getOrderNumber = () => {
    const date = moment().format('DDMMYY');
    const timestamp = moment().valueOf().toString();
    return date + timestamp;
  };

  const handleOnSubmitData = () => {
    if (isPrimaryCP) {
      const itemList: IItems[] = [];
      orderData?.map(item => {
        itemList.push({
          sku: item?.sku,
          quantity: parseInt(item?.quantity, 10),
          uom: item?.uom,
          skuProductId: item?.sku,
        });
      });
      const requestBody: IPrimaryOrderRequestBody = {
        categoryId: productDivision,
        channelPartnerId: code,
        customerAddressId: address,
        items: itemList,
      };
      submitPrimaryOrder(requestBody, () => setShowSuccessModal(true));
    } else {
      Geolocation.getCurrentPosition(
        (response: any) => {
          const requestBody: ISalesOrderRequestBody = {
            ordernumber: getOrderNumber(),
            orderdate: convertDateToDisplay(Date(), DateFormats.DD_MMM_YYYY),
            employeename: '',
            distributorcode:
              primaryPartner.length > 6
                ? primaryPartner.slice(-6)
                : primaryPartner,
            dealercode: dealerCode,
            beatname: '',
            latitude: String(response.coords.latitude),
            longitude: String(response.coords.longitude),
            itemlist: [],
          };

          const itemlist: ISalesOrderItem[] = [];
          orderData.map(item => {
            itemlist.push({
              itemcode: item.materialCode,
              quantity: item.quantity,
              rate: item.price,
              discountamount: '0',
              orderunit: item.uom,
            });
          });

          requestBody.itemlist = itemlist;

          getEasyDmsSalesOrderData(requestBody, () =>
            setShowSuccessModal(true),
          );
        },
        (error: any) => {
          handleApiError(error?.message);
        },
        {
          enableHighAccuracy: true,
        },
      );
    }
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={
        isPrimaryCP
          ? getTranslationLabel('primary_order_creation')
          : getTranslationLabel('secondary_order_creation')
      }>
      {isPrimaryCP ? (
        <DropDown
          list={productDivisionData}
          label={getTranslationLabel('product_division')}
          placeholder={getTranslationLabel('select_prod_division')}
          isRequired={true}
          value={productDivision}
          visible={showProductDropdown}
          onChangeDropdownState={() => {
            setShowProductDropdown(!showProductDropdown);
            setOrderData([]);
          }}
          setValue={data => {
            setProductDivision(data);
          }}
        />
      ) : (
        <DropDown
          list={primaryPartnerData}
          label={getTranslationLabel('primary_channel_partner')}
          placeholder={getTranslationLabel('select_chann_partner')}
          isRequired={true}
          value={primaryPartner}
          visible={showPartnerDropdown}
          onChangeDropdownState={() =>
            setShowPartnerDropdown(!showPartnerDropdown)
          }
          setValue={data => {
            setPrimaryPartner(data);
          }}
        />
      )}

      <Divider style={CommonStyles.horizontalDivider} />
      {[...Array(skuIndex)].map((_, index) => {
        return (
          <AddProductCard
            isPrimaryOrder={isPrimaryCP}
            setSkuIndex={setSkuIndex}
            skuIndex={skuIndex}
            relation={relation}
            productDivisionData={categoryData}
            productDivision={productDivision}
            isSubmitDisabled={isSubmitDisabled}
            productDropdownChange={showProductDropdown}
            showSubmitButton={() => setIsSubmitDisabled(false)}
            onSubmit={data => {
              const newDataIndex = orderData.findIndex(item => item === data);
              if (newDataIndex === -1) {
                setOrderData(prevOrderData => [...prevOrderData, data]);
              } else {
                setOrderData(prevOrderData => {
                  const updatedOrderData = [...prevOrderData];
                  updatedOrderData[newDataIndex] = data;
                  return updatedOrderData;
                });
              }
            }}
            enableRemoveBtn={index !== 0}
            isLastIndex={skuIndex === index + 1}
            onRemove={() => handleRemoveForm(index)}
          />
        );
      })}
      <DropDown
        list={addressList}
        label={getTranslationLabel('ship_to_address')}
        placeholder={getTranslationLabel('select_address')}
        isRequired={true}
        value={address}
        visible={showAddressDropdown}
        onChangeDropdownState={() =>
          setShowAddressDropdown(!showAddressDropdown)
        }
        setValue={data => {
          setAddress(data);
        }}
      />
      <Spacer size={24} />
      <CustomButton
        type={ButtonTypes.contained}
        text={getTranslationLabel('submit')}
        isDisabled={
          (isPrimaryCP ? isSubmitDisabled : !primaryPartner) ||
          (isPrimaryCP && productDivision === '') ||
          address === ''
        }
        onPress={() => handleOnSubmitData()}
      />
      <SuccessFailureModal
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title={getTranslationLabel('order_created')}
        label={getTranslationLabel('order_creation_success_msg')}
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => {
          navigation.navigate('OrderTask', {relation, navigationFrom});
        }}
      />
    </Layout>
  );
};

export default PrimaryOrderCreationScreen;
