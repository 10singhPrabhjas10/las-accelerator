import {
  getInvoiceDetails,
  getEachInvoiceDetails,
} from 'services/methods/secondaryChannelPartner';
import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {
  IEachInvoiceDetails,
  IInvoiceDetailsReqBody,
  IInvoiceDetailsResponse,
} from './Invoice.interface';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
} from 'utils/commonMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {DateFormats} from 'constants/dateFormat';

//API to get Invoice Details
const transformInvoiceDetails = (data: IInvoiceDetailsResponse[]) => {
  return data?.map((item, index) => ({
    id: index,
    date: item?.invoice_date
      ? convertDateToDisplay(item?.invoice_date, DateFormats.DD_MM_YYYY)
      : EMPTY_DATA_DASH,
    invoiceNo: item?.invoice_no,
    data: [
      {
        title: 'Invoice No.',
        text: item?.invoice_no ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Invoice Value',
        text: item?.invoice_value
          ? `₹ ${formatNumberWithCommas(item?.invoice_value)}/-`
          : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getInvoiceDetailsData = async (
  setInvoiceData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  body: IInvoiceDetailsReqBody,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getInvoiceDetails(), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;

      const finalFormattedData = transformInvoiceDetails(data);
      setInvoiceData((prev: IInvoiceDetailsResponse[]) => [
        ...prev,
        ...finalFormattedData,
      ]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const transformEachInvoice = (data: IEachInvoiceDetails) => {
  return {
    invoiceNo: data?.invoiceNo,
    date: data?.invoiceDate
      ? convertDateToDisplay(data?.invoiceDate, DateFormats.DD_MM_YYYY)
      : EMPTY_DATA_DASH,
    headerData: [
      {
        title: 'Invoice No.',
        text: data?.invoiceNo ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Invoice Value',
        text: data?.invoiceValue
          ? `₹ ${formatNumberWithCommas(data?.invoiceValue)}/-`
          : EMPTY_DATA_DASH,
      },
    ],
    data: data.data.map(subItem => ({
      id: subItem.skuProductId,
      data: [
        {
          title: 'SKU Description',
          text: subItem?.skuProductName ?? EMPTY_DATA_DASH,
        },
        {
          title: 'Invoice Quantity',
          text: subItem?.invoiceQuantity ?? EMPTY_DATA_DASH,
        },
        {
          title: 'Total Price',
          text: subItem?.totalAmount
            ? `₹ ${formatNumberWithCommas(
                parseInt(subItem?.totalAmount, 10),
              )}/-`
            : EMPTY_DATA_DASH,
        },
        {
          title: 'Discount',
          text: subItem?.discount ? `${subItem?.discount}%` : EMPTY_DATA_DASH,
        },
        {
          title: 'Tax',
          text: subItem?.tax
            ? `₹ ${formatNumberWithCommas(subItem?.tax)}/-`
            : EMPTY_DATA_DASH,
        },
        {
          title: 'Net Amount',
          text: subItem?.netAmount
            ? `₹ ${formatNumberWithCommas(subItem?.netAmount)}/-`
            : EMPTY_DATA_DASH,
        },
      ],
    })),
  };
};

export const getEachInvoiceDetailsData = async (
  setInvoiceData: SetStateAction<any>,
  invoiceNo: string,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getEachInvoiceDetails(invoiceNo));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormattedData = transformEachInvoice(data?.[0]);
      setInvoiceData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
