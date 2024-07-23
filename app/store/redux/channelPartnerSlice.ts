import {createSlice} from '@reduxjs/toolkit';

interface IRetailerProfileData {
  id: number;
  code: string;
  nameOfFirm: string;
  contactPerson: string;
  phoneNo: string;
  blockCustomer: string;
  customerBlockReason: string;
  channelPartnerId: string;
  gstin: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  state: string;
  city: string;
  latitude: string;
  longitude: string;
  emailId: string;
  retailerCode: string;
  customerMobile: string;
}

const initialProfileDetails: IRetailerProfileData = {
  id: 0,
  code: '',
  nameOfFirm: '',
  contactPerson: '',
  phoneNo: '',
  blockCustomer: '',
  customerBlockReason: '',
  channelPartnerId: '',
  gstin: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  state: '',
  city: '',
  latitude: '',
  longitude: '',
  emailId: '',
  retailerCode: '',
  customerMobile: '',
};

const initialState = {
  customerCode: '',
  relationId: '',
  retailerCustomerCode: '',
  channelPartnerId: '',
  retailerProfileData: initialProfileDetails,
};

const channelPartnerSlice = createSlice({
  name: 'channelPartner',
  initialState,
  reducers: {
    setCustomerCode: (state, {payload}) => {
      state.customerCode = payload;
    },
    setChannelPartnerId: (state, {payload}) => {
      state.channelPartnerId = payload;
    },
    setRelationId: (state, {payload}) => {
      state.relationId = payload;
    },
    setRetailerCustomerCode: (state, {payload}) => {
      state.retailerCustomerCode = payload;
    },
    setRetailerProfileData: (state, {payload}) => {
      state.retailerProfileData = payload;
    },

    clearChannelPartner: state => {
      state.relationId = '';
      state.retailerCustomerCode = '';
      state.retailerProfileData = initialProfileDetails;
    },
  },
});

export const {
  setCustomerCode,
  setRelationId,
  setRetailerCustomerCode,
  setRetailerProfileData,
  clearChannelPartner,
  setChannelPartnerId,
} = channelPartnerSlice.actions;

export default channelPartnerSlice.reducer;
