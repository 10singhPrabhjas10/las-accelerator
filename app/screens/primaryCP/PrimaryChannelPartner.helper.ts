import moment from 'moment';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
  getTranslationLabel,
} from 'utils/commonMethods';

export const mapApiResponseToGeneralInformation = (data: IGeneralInfo) => {
  return [
    {
      title: 'Name of Firm',
      text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Contact Person',
      text:
        [data?.contactPersonFirstName, data?.contactPersonLastName]
          .filter(Boolean)
          .join(' ') ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Phone No.',
      text: data?.phoneNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Alternate Phone No.',
      text: data?.alternatePhoneNo ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Email-ID',
      text: data?.emailId ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Channel Partner Address',
      text: '',
    },
    {
      title: 'Pin Code',
      text: data?.billingAddress?.postalCode ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Area',
      text: data?.area ?? EMPTY_DATA_DASH,
    },
    {
      title: 'District',
      text: data?.district ?? EMPTY_DATA_DASH,
    },
    {
      title: 'State',
      text: data?.state ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Sales Office',
      text: data?.salesOffice ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Address',
      text:
        [
          data?.billingAddress?.street,
          data?.billingAddress?.city,
          data?.billingAddress?.state,
        ]
          .filter(Boolean)
          .join(', ') || EMPTY_DATA_DASH,
    },
    {
      title: 'Security Deposit',
      text: data?.securityDepositRemark
        ? `₹ ${formatNumberWithCommas(
            parseInt(data?.securityDepositRemark, 10),
          )}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Block Customer',
      text:
        data?.blockCustomer === null
          ? EMPTY_DATA_DASH
          : data?.blockCustomer
          ? 'Yes'
          : 'No',
    },
    data?.blockCustomer && {
      title: 'Customer Block Reason',
      text: data?.customerBlockReason ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Credit Limit by VGIL',
      text: data?.creditLimitByVGIL
        ? `₹ ${formatNumberWithCommas(parseInt(data?.creditLimitByVGIL, 10))}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'No. of Delivery Vehicle',
      text: data?.noOfDeliveryVehicle ?? EMPTY_DATA_DASH,
    },
  ].filter(Boolean);
};

export const mapApiResponseToCustomerDetails = (data: ICustomerDetails) => {
  return {
    isBlocked: data?.blockCustomer,
    code: data?.code,
    data: [
      {
        title: 'Name of Firm',
        text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Contact Person',
        text:
          [data?.contactPersonFirstName, data?.contactPersonLastName]
            .filter(Boolean)
            .join(' ') ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Phone No.',
        text: data?.phoneNo ? `+91 ${data?.phoneNo}` : EMPTY_DATA_DASH,
      },
      {
        title: 'Block Customer',
        text:
          data?.blockCustomer === null
            ? EMPTY_DATA_DASH
            : data?.blockCustomer
            ? 'Yes'
            : 'No',
      },
      data?.blockCustomer !== null && {
        title: 'Customer Block Reason',
        text: data?.customerBlockReason || EMPTY_DATA_DASH,
      },
    ].filter(Boolean),
  };
};

export const mapApiResponseToKeyContacts = (data: IKeyContact[]) => {
  return data.map(item => ({
    name: item.name,
    data: [
      {title: 'Designation', text: item.designation ?? EMPTY_DATA_DASH},
      {title: 'Date of Birth', text: item.dateOfBirth ?? EMPTY_DATA_DASH},
      {title: 'Aadhaar Card No.', text: item.aadharCardNo ?? EMPTY_DATA_DASH},
      {title: 'PAN Card No.', text: item.panCardNo ?? EMPTY_DATA_DASH},
      {
        title: 'Relationship to Owner',
        text: item.relationshipToOwner ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Phone No.',
        text: item.phoneNo ? `+91 ${item?.phoneNo}` : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const mapApiResponseToShippingList = (data: IShippingList[]) => {
  return data.map(item => ({
    addressType: item.addressType,
    customerAddressCode: item.customerAddressCode,
    customerAddressId: item?.customerAddressId,
    address: [item.street, item.city, item.district, item.country]
      .filter(Boolean)
      .join(', '),
  }));
};

export const mapApiResponseToShippingDetails = (data: IShippingInformation) => {
  return {
    addressType: data.addressType,
    data: [
      {
        title: 'Door No./Premises',
        text: data?.doorNoOrPremises ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Address',
        text:
          [data?.street, data?.city, data?.state]
            ?.filter(Boolean)
            ?.join(' ,') || EMPTY_DATA_DASH,
      },
      {
        title: 'District',
        text: data?.district ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Pin Code',
        text: data?.pincode ?? EMPTY_DATA_DASH,
      },
      {
        title: 'State',
        text: data?.state ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Country',
        text: data?.country ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Size of Warehouse (sq. ft.)',
        text: data?.sizeOfWarehouse
          ? `${data?.sizeOfWarehouse} sq. ft`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Ownership Type',
        text: data?.ownershipType ?? EMPTY_DATA_DASH,
      },
    ],
  };
};

export const mapApiResponseToRelatedCodes = (data: IRelatedCodesDetails) => {
  return {
    code: data.code,
    phoneNo: data.phoneNo,
    data: [
      {
        title: 'Relationship',
        text: data?.relationship ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Name',
        text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Contact Person',
        text:
          [data?.contactPersonFirstName, data?.contactPersonLastName]
            ?.filter(Boolean)
            ?.join(' ') || EMPTY_DATA_DASH,
      },
      {
        title: 'Address',
        text: data?.address ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Contact No.',
        text: data?.phoneNo ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Email-ID',
        text: data?.emailId ?? EMPTY_DATA_DASH,
      },
      {
        title: 'GSTIN',
        text: data?.gstin ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Office',
        text: data?.salesOffice ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Product Division',
        text: data?.productDivison?.join(', ') ?? EMPTY_DATA_DASH,
      },
    ],
  };
};

export const mapApiResponseToRelatedCodeList = (data: IRelatedCodes[]) => {
  return data.map(item => ({
    code: item?.code,
    phoneNo: item?.phoneNo,
    channelPartnerCode: item?.channelPartnerId,
    data: [
      {
        title: 'Relationship',
        text: item?.relationship ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Name',
        text: item?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Contact Person',
        text:
          [item?.contactPersonFirstName, item?.contactPersonLastName]
            ?.filter(Boolean)
            ?.join(' ') || EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const mapApiResponseToCheckbox = (data: IProductDivision[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item =>
    result.push({id: item?.categoryId, name: item?.categoryName}),
  );
  return result;
};

export const mapApiResponseToSearch = (data: IResPrimaryPartner[]) => {
  return data.map(item => ({
    title: item.nameOfFirm,
    subTitle: item.code,
    channelPartnerId: item.channelPartnerId,
    code: item.code,
  }));
};

export const mapApiResponseToDmsInformation = (data: IDmsInformation) => {
  return [
    {
      title: 'DMS Status',
      text: data.dmsStatus ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Agree to Use',
      text: data.dmsAgreeToUse ? 'Yes' : 'No' ?? EMPTY_DATA_DASH,
    },
    {
      title: 'DMS Last Sync Date',
      text: data.dmsLastSyncDate
        ? convertDateToDisplay(data.dmsLastSyncDate)
        : EMPTY_DATA_DASH,
    },
    {
      title: 'DMS Lock Status',
      text: data.dmsLockStatus ? 'Active' : 'Inactive' ?? EMPTY_DATA_DASH,
    },
  ];
};

export const mapApiResponseToSecondarySales = (
  data: ISecondarySalesResponse[],
) => {
  return data.map(item => ({
    channelPartnerId: item?.channelPartnerId,
    data: [
      {
        title: 'Retailer Name',
        text: item?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Total Sales',
        text: item?.totalSales
          ? `₹ ${formatNumberWithCommas(parseInt(item?.totalSales, 10))}`
          : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const mapApiResponseToSecondarySalesPerformance = (
  data: ISecondarySalesPerformanceResponse,
) => {
  const result = [
    {
      title: 'Retailer Name',
      text: data?.nameOfFirm || EMPTY_DATA_DASH,
    },
    {
      title: 'Total Sales',
      text: data?.totalSales
        ? `₹ ${formatNumberWithCommas(parseInt(data?.totalSales, 10))}`
        : EMPTY_DATA_DASH,
    },
  ];
  data?.categories?.length > 0
    ? data?.categories.map(item =>
        result.push({
          title: item?.categoryName || EMPTY_DATA_DASH,
          text: item?.sales
            ? `₹ ${formatNumberWithCommas(parseInt(item?.sales, 10))}`
            : EMPTY_DATA_DASH,
        }),
      )
    : null;
  return result;
};

export const mapApiResponseToSecondarySalesRetailerSearch = (
  data: IResPrimaryPartner[],
) => {
  return data.map(item => ({
    title: item.nameOfFirm,
    subTitle: item.channelPartnerId,
  }));
};

export const mapApiResponseToPrimarySales = (data: IPrimarySalesResponse[]) => {
  const currentYearShort = moment().format('YY');
  return data.map(item => ({
    categoryName: item?.category || EMPTY_DATA_DASH,
    customerTargetId: item?.customer_target_id || EMPTY_DATA_DASH,
    categoryId: item?.category_id,
    data: [
      {
        title: `${getTranslationLabel('target')} (FY ${currentYearShort})`,
        text: item?.fy_target
          ? `₹ ${formatNumberWithCommas(parseInt(item?.fy_target, 10))}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: `${getTranslationLabel('ytd_sales')} (FY ${currentYearShort})`,
        text: item?.total_achievement
          ? `₹ ${formatNumberWithCommas(
              parseInt(item?.total_achievement, 10),
            )}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: `${getTranslationLabel('ytd _target')} (FY ${currentYearShort})`,
        text:
          parseInt(item?.total_target) >= 0
            ? `₹ ${formatNumberWithCommas(parseInt(item?.total_target, 10))}/-`
            : EMPTY_DATA_DASH,
      },
    ],
    salesData: item,
  }));
};
