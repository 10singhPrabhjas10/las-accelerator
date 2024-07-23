/* eslint-disable @typescript-eslint/no-unused-vars */
interface IPrimaryLeadData {
  contactPersonName: string;
  businessName: string;
  mobileNumber: string;
  emailId: string | null;
  gstIn: string;
  categoryId: string;
  pincode: string;
}

interface ISecondaryLeadData {
  firmName: string;
  gstIn: string;
  panCardNumber: string;
  mobileNumber: string;
  alternativeMobileNumber: string;
  ownerName: string;
  emailId: string;
  pincode: string;
  area: string;
  district: string;
  state: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
}

interface ISecondaryLeadRequestBody {
  firmName: string;
  gstIn?: string;
  panCardNumber?: string;
  retailerMobileNumber: string;
  retailerAlternativeMobileNumber?: string;
  retailerOwnerName: string;
  emailId: string | null;
  pincode: string;
  area: string;
  district?: string;
  state?: string;
  addressLine1: string;
  addressLine2: string;
  landMark: string;
}

interface IAreaResponse {
  id: number;
  attributes: {
    areaMasterId: string;
    pincode: string;
    district: string;
    state: string;
    area: string;
    country: string;
    displayName: string;
    externalId: string | null;
    name: string;
    salesOffice: string;
    zone: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ICategoryDropdown {
  categoryId: string;
  categoryName: string;
}
