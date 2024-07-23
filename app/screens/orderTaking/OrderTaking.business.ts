import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {
  getEasyDmsAuthenticationApi,
  getEasyDmsOrderFulfillmentApi,
  getEasyDmsSalesOrderApi,
  getEasyDmsSaveRetailerApi,
} from 'services/methods/easyDms';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  IOrderStatusReqBody,
  IOrderFulfillmentRequestBody,
  ISalesOrderRequestBody,
  ISaveRetailerRequestBody,
  IOrderStatusResponse,
  ISecondaryOrderResponse,
  ITargetPerformanceResponse,
  ITransformedOrderStatus,
} from './OrderTaking.interface';
import {SetStateAction} from 'react';
import {
  getInvoicePdf,
  getOrderStatus,
  getSkuDropdown,
  getStatusFilter,
  getTargetPerformance,
} from 'services/methods/storeCheckIn';
import {
  convertDateToDisplay,
  formatNumber,
  formatNumberWithCommas,
  getTranslationLabel,
} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {mapApiResponseToCheckbox} from 'screens/beat/StoreCheckIn/checkIn/CheckIn.business';
import {generatedHtml} from './orderTask/orderStatus/OrderStatus.helper';
import {createPDF} from 'screens/primaryCP/financialInformation/FinancialInformation.helper';
import {
  getRetailerDealerCodeApi,
  saveRetailerDealerCodeApi,
} from 'services/methods/misc';
import {store} from 'store/redux/store';
import {getRetailerPrimaryCpListApi} from 'services/methods/secondaryChannelPartner';
import {ISeriesDropdownResponse} from 'screens/beat/StoreCheckIn/checkIn/competitiveIntelligence/CompetitiveIntelligence.interface';
import Config from 'react-native-config';


export const saveRetailerDealerCode = async (
  retailerCode: string,
  dealerCode: string,
) => {
  setReduxLoading(true);

  try {
    await NetworkRequest(POST, saveRetailerDealerCodeApi(), {
      data: {
        retailerCode,
        dealerCode,
      },
    });
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getEasyDmsSaveRetailerData = async (
  requestBody: ISaveRetailerRequestBody,
  retailerCode: string,
  setDealerCode: SetStateAction<any>,
) => {
  try {
    const token = await authenticateEasyDmsUser();

    if (token) {
      const result = await NetworkRequest(
        POST,
        getEasyDmsSaveRetailerApi(),
        requestBody,
        {
          headers: {
            'skip-auth': 'true',
            token,
          },
        },
      );

      if (result.data.status) {
        setDealerCode(result.data.mastercode);
        saveRetailerDealerCode(retailerCode, result.data.mastercode);
      } else {
        handleApiError(result.data.message);
      }
    }
  } catch (error: any) {
    handleApiError(error.message);
  }
};

export const getEasyDmsSalesOrderData = async (
  requestBody: ISalesOrderRequestBody,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  try {
    const token = await authenticateEasyDmsUser();

    if (token) {
      const result = await NetworkRequest(
        POST,
        getEasyDmsSalesOrderApi(),
        requestBody,
        {
          headers: {
            'skip-auth': 'true',
            token,
          },
        },
      );

      if (result?.data?.status) {
        onSuccess();
      } else {
        handleApiError(result?.data?.message);
      }
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Order status
const transformPrimaryOrderStatus = (data: IOrderStatusResponse[]) => {
  return data?.map(item => ({
    id: item?.id,
    name: item?.contantPerson ?? EMPTY_DATA_DASH,
    invoiceNo: item?.invoiceNo,
    data: [
      {
        title: getTranslationLabel('order_no'),
        text: item?.orderNo ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('category_name'),
        text: item?.categoryName ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('order_date'),
        text: item?.orderDate
          ? convertDateToDisplay(item?.orderDate, DateFormats.Do_MMM_YYYY)
          : EMPTY_DATA_DASH,
      },
      // {
      //   title: 'Order Value',
      //   text: item?.netValue ?? EMPTY_DATA_DASH,
      // },
      {
        title: getTranslationLabel('order_status'),
        text: item?.status ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('invoice_amt'),
        text: item?.invoiceAmount
          ? `₹ ${formatNumberWithCommas(item?.invoiceAmount)}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('transport_name'),
        text: item?.transportName ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('contact_person'),
        text: item?.contantPerson ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('contact_number'),
        text: item?.contactNumber
          ? `+91 ${item?.contactNumber}`
          : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('vehicle_no'),
        text: item?.vechileNumber ?? EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getPrimaryOrderStatusData = async (
  body: IOrderStatusReqBody,
  setOrderStatusData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getOrderStatus(), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        pagination: {pageCount},
      } = result?.data;
      const finalFormattedData = transformPrimaryOrderStatus(data);
      setOrderStatusData((prev: any) => [...prev, ...finalFormattedData]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.data?.errorMessage);
  } finally {
    setReduxLoading(false);
  }
};

const getInvoiceStatus = (dispatchstatus: string) => {
  if (dispatchstatus === 'Pending') {
    return 'Invoice Pending';
  }
  if (dispatchstatus === 'Partial') {
    return 'Partially Complete';
  }

  if (dispatchstatus === 'Complete') {
    return 'Complete';
  }
  return dispatchstatus;
};

const mapApiResponseToSecondaryOrders = (data: ISecondaryOrderResponse[]) => {
  return data?.map(item => {
    const invoiceAmount = item.itemlist.reduce((acc, curr) => {
      return acc + curr.dispatchqty * curr.rate;
    }, 0);

    const orderValue = item.itemlist.reduce((acc, curr) => {
      return acc + curr.qty * curr.rate;
    }, 0);

    const orderStatus = ['Pending', 'Partial', 'Complete'].includes(
      item?.dispatchstatus,
    )
      ? getTranslationLabel('order_placed')
      : item?.dispatchstatus;

    return {
      id: item?.sono,
      data: [
        {
          title: getTranslationLabel('order_no'),
          text: item?.sono || EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('order_date'),
          text: item?.sodate || EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('order_value'),
          text: `₹ ${formatNumberWithCommas(orderValue)}/-`,
        },
        {
          title: getTranslationLabel('order_status'),
          text: item?.dispatchstatus ? orderStatus : EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('invoice_status'),
          text: item?.dispatchstatus
            ? getInvoiceStatus(item?.dispatchstatus)
            : EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('invoice_amt'),
          text: `₹ ${formatNumberWithCommas(invoiceAmount)}/-`,
        },
        {
          title: getTranslationLabel('invoice_no'),
          text: item?.invoiceno || EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('invoice_date'),
          text: item?.invoicedate || EMPTY_DATA_DASH,
        },
      ],
    };
  });
};

const mapApiResponseToOrderHistory = (data: ISecondaryOrderResponse[]) => {
  return data?.map(item => {
    const orderValue = item.itemlist.reduce((acc, curr) => {
      return acc + curr.qty * curr.rate;
    }, 0);

    const orderStatus = ['Pending', 'Partial', 'Complete'].includes(
      item?.dispatchstatus,
    )
      ? getTranslationLabel('order_placed')
      : item?.dispatchstatus;

    return {
      id: item?.sono,
      date: item?.sodate || EMPTY_DATA_DASH,
      invoiceNo: item.invoiceno,
      headerData: [
        {
          title: getTranslationLabel('order_no'),
          text: item?.sono || EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('order_value'),
          text: `₹ ${formatNumberWithCommas(orderValue)}/-`,
        },
        {
          title: getTranslationLabel('order_status'),
          text: item?.dispatchstatus ? orderStatus : EMPTY_DATA_DASH,
        },
      ],
      orderData:
        item?.itemlist?.length > 0
          ? item?.itemlist.map(subItem => {
              return [
                {
                  title: getTranslationLabel('sku_description'),
                  text: subItem?.itemcode || EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('order_qty'),
                  text: subItem?.qty || EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('price'),
                  text:
                    `₹ ${formatNumberWithCommas(subItem?.rate)}/-` ||
                    EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('total_price_excl'),
                  text:
                    `₹ ${formatNumberWithCommas(
                      subItem?.qty * subItem?.rate,
                    )}/-` || EMPTY_DATA_DASH,
                },
              ];
            })
          : [],
    };
  });
};

export const getEasyDmsOrderStatusData = async (
  requestBody: IOrderFulfillmentRequestBody,
  setOrderData: SetStateAction<any>,
  isOrderHistory?: boolean,
) => {
  setReduxLoading(true);
  try {
    const token = await authenticateEasyDmsUser();

    if (token) {
      const result = await NetworkRequest(
        POST,
        getEasyDmsOrderFulfillmentApi(),
        requestBody,
        {
          headers: {
            'skip-auth': 'true',
            token,
          },
        },
      );

      if (result?.data?.status) {
        const updatedData = isOrderHistory
          ? mapApiResponseToOrderHistory(result.data.data)
          : mapApiResponseToSecondaryOrders(result.data.data);
        setOrderData((prev: ITransformedOrderStatus[]) => [
          ...prev,
          ...updatedData,
        ]);
      } else {
        handleApiError(result?.data?.message);
      }
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch Status filter in Order status
export const getStatusFilterData = async (
  setStatusData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getStatusFilter());

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {status} = result?.data;
      const finalFormattedData = mapApiResponseToCheckbox(status);
      setStatusData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getRetailerData = async (
  distributorcode: string,
  setDealerCode: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const retailerProfileData =
      store.getState().channelPartner.retailerProfileData;
    const result = await NetworkRequest(
      GET,
      getRetailerDealerCodeApi(retailerProfileData.retailerCode),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      if (result.data?.data?.dealerCode) {
        setDealerCode(result.data?.data?.dealerCode);
      } else {
        const requestBody = {
          distributorcode:
            distributorcode.length > 6
              ? distributorcode.slice(-6)
              : distributorcode,
          retailercode: retailerProfileData.retailerCode,
          name: retailerProfileData.nameOfFirm,
          address1: retailerProfileData.addressLine1,
          address2: retailerProfileData.addressLine2,
          zone: '',
          cityname: retailerProfileData.city,
          statename: retailerProfileData.state,
          pincode: retailerProfileData.pincode,
          latitude: retailerProfileData.latitude,
          longitude: retailerProfileData.longitude,
          software: 'Taly',
          version: '4.8',
          email: retailerProfileData.emailId,
          mobilenumber:
            retailerProfileData.phoneNo || retailerProfileData?.customerMobile,
          gstin: retailerProfileData.gstin,
          isclosed: 'false',
          contactperson: retailerProfileData.contactPerson,
        };
        getEasyDmsSaveRetailerData(
          requestBody,
          retailerProfileData.retailerCode,
          setDealerCode,
        );
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const mapApiResponseToDropdown = (data: any[]) => {
  return data.map(item => ({
    label: item.nameOfFirm,
    value: item.code,
  }));
};

export const getRetailerPrimaryCpListData = async (
  setPrimaryPartnerData: SetStateAction<any>,
  code: string,
) => {
  setReduxLoading(true);

  try {
    const response = await NetworkRequest(
      GET,
      getRetailerPrimaryCpListApi(code),
    );

    if (response?.status === HttpStatusCode.OK && response?.data) {
      const updatedData = mapApiResponseToDropdown(response?.data.data);
      setPrimaryPartnerData(updatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const formatSkuDropdown = (data: ISeriesDropdownResponse[]) => {
  const transformedSkuCategory = data?.map(item => ({
    value: item?.attributes?.skuProduct,
    label: item?.attributes?.skuProductName,
    uom: item?.attributes?.uom,
    materialCode: item?.attributes?.materialCode,
  }));
  return transformedSkuCategory;
};

export const getSkuDropdownData = async (
  categoryId: string,
  subCategoryId: string,
  seriesId: string,
  setSkuDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setTotalPages: SetStateAction<any>,
  setSkuPageNo: SetStateAction<any>,
  extraQuery?: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSkuDropdown(
        categoryId,
        subCategoryId,
        seriesId,
        pageNumber,
        pageSize,
        extraQuery || '',
      ),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;
      const formattedData = formatSkuDropdown(data);

      setSkuDropdownData((prev: any) => [...prev, ...formattedData]);
      setTotalPages(pageCount || 1);
      setSkuPageNo(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch Target and Performances
export const transformTarget = (data: ITargetPerformanceResponse) => {
  return [
    {
      leftTitle:
        data?.target >= 0 ? `₹ ${formatNumber(data.target)}` : EMPTY_DATA_DASH,
      rightTitle:
        data?.achievedValue >= 0
          ? `₹ ${formatNumber(data.achievedValue)}`
          : EMPTY_DATA_DASH,
      orderDate: data?.lastOrderDate
        ? convertDateToDisplay(data?.lastOrderDate, DateFormats.DD_MM_YYYY)
        : EMPTY_DATA_DASH,
    },
  ];
};

export const getTargetPerformanceData = async (
  channelPartnerId: string,
  reportType: string,
  setTargetData: SetStateAction<any>,
  categoryId?: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getTargetPerformance(channelPartnerId, reportType, categoryId),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformTarget(data);
      setTargetData(finalFormatedData?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to download invoice Pdf
export const getInvoicePdfData = async (invoiceNo: string) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getInvoicePdf(invoiceNo));

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const html = generatedHtml(data);
      createPDF(html);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
