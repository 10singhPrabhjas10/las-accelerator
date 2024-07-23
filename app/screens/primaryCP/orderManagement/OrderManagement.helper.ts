import {DateFormats} from 'constants/dateFormat';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
} from 'utils/commonMethods';

export const mapApiResponseToOrderHistoryList = (
  data: IOrderHistoryListData[],
) => {
  return data.map(item => ({
    date: item?.orderDate
      ? convertDateToDisplay(item.orderDate)
      : EMPTY_DATA_DASH,
    orderNo: item.orderNo,
    orderId: item?.orderId,
    orderCode: item?.orderCode,
    data: [
      {title: 'Order No.', text: item?.orderNo ?? EMPTY_DATA_DASH},
      {
        title: 'Product Division',
        text: item?.category ?? EMPTY_DATA_DASH,
      },
      {title: 'Status', text: item?.status ?? EMPTY_DATA_DASH},
    ],
  }));
};

export const mapApiResponseToOrderHistoryDetails = (
  data: IOrderHistoryDetailsData,
) => ({
  date: data?.orderDate
    ? convertDateToDisplay(data.orderDate)
    : EMPTY_DATA_DASH,
  orderNo: data?.orderNo,
  orderCode: data?.orderCode,
  data: [
    {title: 'Order No.', text: data?.orderNo ?? EMPTY_DATA_DASH},
    {
      title: 'Product Division',
      text: data?.categoryName ?? EMPTY_DATA_DASH,
    },
    {title: 'Sales Employee', text: data?.salesEmployee ?? EMPTY_DATA_DASH},
    {title: 'Status', text: data?.status ?? EMPTY_DATA_DASH},
    {title: 'P.O. No.', text: data?.poNo ?? EMPTY_DATA_DASH},
    {title: 'SAP Order No.', text: data?.sapOrderNo ?? EMPTY_DATA_DASH},
    {title: 'SFDC Order No.', text: data?.sfdcOrderNo ?? EMPTY_DATA_DASH},
    {
      title: 'Net Value',
      text: data?.netValue ? '₹' + data?.netValue : EMPTY_DATA_DASH,
    },
    {
      title: 'Gross Value',
      text: data?.grossValue ? '₹' + data?.grossValue : EMPTY_DATA_DASH,
    },
    {
      title: 'Shipping Address',
      text: data?.shippingAddress
        ? Object.values(data?.shippingAddress).join('\n')
        : EMPTY_DATA_DASH,
    },
  ],
});

export const mapApiProductDivisionResponseToCheckbox = (
  data: IProductDivisionFilter[],
) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => result.push({id: item.categoryId, name: item.categoryName}));
  return result;
};

export const mapApiProductDivisionResponseToDropdown = (
  data: IProductDivisionFilter[],
) => {
  return data.map(item => ({value: item.categoryId, label: item.categoryName}));
};

export const mapApiResponseToDropdown = (data: string[]) => {
  return data.map(item => ({value: item, label: item}));
};

export const mapSkuApiResponseToAutoComplete = (data: ISearchSkuData[]) => {
  return data.map(item => ({
    id: item.skuProduct,
    title: item.skuProductName,
    materialCode: item?.materialCode,
    uom: item?.uom,
  }));
};

export const mapApiResponseToOrderHistoryLineItems = (
  data: IOrderLineItemsProps[],
  fromOrderDetails: boolean,
) => {
  return data.map(item => ({
    data: [
      {title: 'Material Group', text: item?.materialGroup ?? EMPTY_DATA_DASH},
      {
        title: 'SKU',
        text: item?.skuProductName ?? EMPTY_DATA_DASH,
      },
      {title: 'Material Code', text: item?.materialCode ?? EMPTY_DATA_DASH},
      {
        title: 'Price Per Item',
        text: item?.pricePerItem
          ? `₹ ${formatNumberWithCommas(parseInt(item?.pricePerItem, 10))}`
          : EMPTY_DATA_DASH,
      },
      {title: 'Quantity', text: item?.quantity ?? EMPTY_DATA_DASH},
      {title: 'Item Category', text: item?.itemCategory ?? EMPTY_DATA_DASH},
      !fromOrderDetails && {
        title: 'Invoice Line Amount',
        text:
          item?.invoiceLineAmount >= 0
            ? `₹ ${formatNumberWithCommas(item?.invoiceLineAmount)}`
            : EMPTY_DATA_DASH,
      },
      !fromOrderDetails && {
        title: 'Tax Amount',
        text:
          item?.taxAmount >= 0
            ? `₹ ${formatNumberWithCommas(item?.taxAmount)}`
            : EMPTY_DATA_DASH,
      },
      !fromOrderDetails && {
        title: 'Total Line Amount',
        text:
          item?.invoiceLineAmount >= 0 && item?.taxAmount >= 0
            ? `₹ ${formatNumberWithCommas(
                item?.invoiceLineAmount + item?.taxAmount,
              )}`
            : EMPTY_DATA_DASH,
      },
      {
        title: 'Storage Location',
        text: item?.storageLocation ?? EMPTY_DATA_DASH,
      },
      {title: 'Warehouse', text: item?.warehouse ?? EMPTY_DATA_DASH},
    ].filter(Boolean),
  }));
};

export const mapApiResponseToInvoiceDetails = (
  data: IOrderInvoiceDetails[],
  isOrderInvoice: boolean,
) => {
  return data.map(item => ({
    date: isOrderInvoice
      ? item?.orderDate
        ? convertDateToDisplay(item.orderDate)
        : EMPTY_DATA_DASH
      : item?.invoiceDate
      ? convertDateToDisplay(item.invoiceDate)
      : EMPTY_DATA_DASH,
    invoiceNo: item?.invoiceNo,
    invoiceId: item?.invoiceId,
    data: [
      {title: 'Invoice No.', text: item?.invoiceNo ?? EMPTY_DATA_DASH},
      {
        title: 'Invoice Value',
        text: item?.invoiceValue
          ? `₹ ${formatNumberWithCommas(parseInt(item?.invoiceValue, 10))}`
          : EMPTY_DATA_DASH,
      },
      {title: 'ePOD Status', text: item?.podReceived ?? EMPTY_DATA_DASH},
    ].filter(Boolean),
  }));
};

export const mapApiResponseToOrderInvoiceSummary = (
  data: IOrderInvoiceSummaryDetails,
) => ({
  date: data?.invoiceDate
    ? convertDateToDisplay(data.invoiceDate)
    : EMPTY_DATA_DASH,
  data: [
    {
      title: 'Invoice No.',
      text: data?.invoiceNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'SAP Order No.',
      text: data?.sapOrderNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Customer Name',
      text: data?.customerName ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Customer Code',
      text: data?.customerCode ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Customer Group',
      text: data?.customerGroup ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Sales Employee',
      text: data?.salesEmployee ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Sales Office',
      text: data?.salesOffice ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Billing Type',
      text: data?.billingType ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Product Division',
      text: data?.productDivision ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Net Invoice Amount',
      text: data?.netInvoiceAmount
        ? `₹ ${formatNumberWithCommas(parseInt(data?.netInvoiceAmount, 10))}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Tax Amount',
      text: data?.taxAmount
        ? `₹ ${formatNumberWithCommas(parseInt(data?.taxAmount, 10))}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Grand Total (incl. tax)',
      text: data?.grandTotal
        ? `₹ ${formatNumberWithCommas(parseInt(data?.grandTotal, 10))}`
        : EMPTY_DATA_DASH,
    },
  ],
});

export const mapApiResponseToOrderInvoiceMoreDetails = (
  data: IOrderInvoiceSummaryDetails,
) => ({
  data: [
    {
      title: 'Invoice No.',
      text: data?.invoiceNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Invoice Date',
      text: data?.invoiceDate
        ? convertDateToDisplay(data.invoiceDate)
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Invoice Value',
      text: data?.invoiceValue
        ? `₹ ${formatNumberWithCommas(parseInt(data?.invoiceValue, 10))}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'ePOD Status',
      text: data?.podReceived ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Customer Name',
      text: data?.customerName ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Customer Code',
      text: data?.customerCode ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Sales Office',
      text: data?.salesOffice ?? EMPTY_DATA_DASH,
    },
  ],
});

export const mapApiResponseToOrderEpodDetails = (data: IEpodDetails) => ({
  date: data?.lrDate
    ? convertDateToDisplay(data.lrDate, DateFormats.DD_MM_YYYY_HH_MM_A)
    : EMPTY_DATA_DASH,
  data: [
    {
      title: 'e-POD',
      text: data?.epod ?? EMPTY_DATA_DASH,
    },
    {
      title: 'e-POD Remarks',
      text: data?.epodRemarks ?? EMPTY_DATA_DASH,
    },
    {
      title: 'e-POD Signed',
      text: data?.epodSigned ?? EMPTY_DATA_DASH,
    },
    {
      title: 'LR No.',
      text: data?.lrNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Name of Transport',
      text: data?.nameOfTransport ?? EMPTY_DATA_DASH,
    },
    {
      title: 'LR Date',
      text: data?.lrDate ? convertDateToDisplay(data.lrDate) : EMPTY_DATA_DASH,
    },
    {
      title: 'Location',
      text: data?.location ?? EMPTY_DATA_DASH,
    },
  ],
});

export const mapApiResponseToInvoiceSelection = (
  data: IInvoiceSelectionResponse[],
) => {
  return data.map(item => ({
    invoiceNo: item.invoiceNo,
    data: [
      {
        title: 'Invoice Date',
        text: item?.invoiceDate
          ? convertDateToDisplay(item?.invoiceDate)
          : EMPTY_DATA_DASH,
      },
      {
        title: 'SKU',
        text: item?.sku ?? EMPTY_DATA_DASH,
      },
      {
        title: 'SKU Code',
        text: item?.skuCode ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Quantity',
        text: item?.quantity ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Plant Code',
        text: item?.plantCode ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Unit Price',
        text: item?.unitPrice ? '₹' + item?.unitPrice : EMPTY_DATA_DASH,
      },
      {
        title: 'Amount',
        text: item?.amount ?? EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const mapApiResponseToReplacementInformation = (
  data: IReplacementInformation,
) => {
  return {
    data: [
      {
        title: 'Request Type',
        text: data?.requestType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Status',
        text: data?.status ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sub Status',
        text: data?.subStatus ?? EMPTY_DATA_DASH,
      },
      {
        title: 'RL SCM Status',
        text: data?.rlScmStatus ?? EMPTY_DATA_DASH,
      },
      {
        title: 'SFDC SR No',
        text: data?.sfdcSrNo ?? EMPTY_DATA_DASH,
      },
      {
        title: 'CRM SR No',
        text: data?.crmSrNo ?? EMPTY_DATA_DASH,
      },
    ],
  };
};

export const mapApiResponseToReturnInformation = (data: IReturnInformation) => {
  return {
    data: [
      {
        title: 'CRM SR No',
        text: data?.crmSrNo ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Status',
        text: data?.status ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sub Status',
        text: data?.subStatus ?? EMPTY_DATA_DASH,
      },
      {
        title: 'RL SCM Status',
        text: data?.rlScmStatus ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reason for Return',
        text: data?.reasonForReturn ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Total Amount',
        text: data?.totalAmount
          ? `₹ ${formatNumberWithCommas(parseInt(data?.totalAmount, 10))}`
          : EMPTY_DATA_DASH,
      },
    ],
  };
};
