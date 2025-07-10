import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LeadData {
  contactPersonName: string;
  emailId: string;
  mobileNumber: string;
  categoryId: string;
  subCategoryId: string;
  leadType: string;
  pincode: string;
  district: string;
  salesOffice: string;
  state: string;
  zone: string;
  country: string;
}

interface NewAddLeadState {
  leads: LeadData[];
}

const initialState: NewAddLeadState = {
  leads: [],
};

const newAddLeadSlice = createSlice({
  name: 'newAddLead',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<LeadData>) => {
      state.leads.unshift(action.payload); // Add new lead to the top
    },
    clearLeads: (state) => {
      state.leads = [];
    },
  },
});

export const {addLead, clearLeads} = newAddLeadSlice.actions;
export default newAddLeadSlice.reducer;
