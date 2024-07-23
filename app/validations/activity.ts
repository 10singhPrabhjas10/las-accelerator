import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {
  IFSC_REGEX,
  AADHAR_REGEX,
  INDIAN_MOBILE_REGEX,
  PAN_NO_REGEX,
} from 'utils/Constants';
import * as Yup from 'yup';

export const ActivitySchema = Yup.object().shape({
  activity: Yup.string().required('Please select activity type'),
  districtPinCode: Yup.string().required('Please select District & Pin-Code'),
  area: Yup.string().required('Please select Area'),
});

export const validateForm = (values: any) => {
  const errors: Partial<any> = {};

  if (values.activity === 'Influencer meet') {
    if (!values.influencer) {
      errors.influencer = 'Please select Influencer Type';
    }

    if (!values.area) {
      errors.area = 'Please select area type';
    }
  }

  return errors;
};

export const PrimaryOrderSchema = (relation: string | undefined) => {
  return Yup.object().shape({
    sku: Yup.string().required('Please select SKU type'),
    quantity: Yup.string().required('Please enter Quantity'),
    uom: Yup.string().required('Please select UOM'),
    price:
      relation !== Relation.PRIMARY_CHANNEL_PARTNER
        ? Yup.number()
            .required('Price is required')
            .min(0, 'Price must be a positive number')
        : Yup.number().notRequired(),
  });
};

export const SecondaryOrderSchema = Yup.object().shape({
  productDivision: Yup.string().required('Please select Product Division'),
  sku: Yup.string().required('Please select SKU type'),
  quantity: Yup.string().required('Please select Quantity'),
  uom: Yup.string().required('Please select UOM'),
});

export const CompetitiveSchema = Yup.object().shape({
  competitorName: Yup.string().required('Please select Competitor Name'),
  productDivision: Yup.string().required('Please select Product Division'),
  series: Yup.string().required('Please select Series'),
  skuName: Yup.string().required('Please enter SKU Name'),
  remarks: Yup.string().required('Please enter Remarks'),
  mop: Yup.string().required('Please enter Mop'),
  distributorSellingPrice: Yup.string().required(
    'Please enter Distributor Selling Price',
  ),
  retailerSellingPrice: Yup.string().required(
    'Please enter Retailer Selling Price',
  ),
  btlType: Yup.string().required('Please enter BTL Type'),
});

export const BtlPlanSchema = Yup.object().shape({
  btlType: Yup.string().required('Please select BTL Type'),
  comments: Yup.string().required('Please enter Comments'),
});

export const InfluencerSchema = Yup.object().shape({
  influencer: Yup.array().of(
    Yup.object().shape({
      influencerName: Yup.string().required('Please Enter Influencer Name'),
      mobileNo: Yup.string()
        .length(10, 'Mobile number must be 10 digit')
        .matches(INDIAN_MOBILE_REGEX, 'Invalid mobile number'),
      idType: Yup.string().required('Please select Id Type'),
      idNo: Yup.string().required('Please enter Valid ID'),
      contactType: Yup.string().required('Please select Contact Type'),
    }),
  ),
}) as Yup.ObjectSchema<any>;

export const validateInfluencerForm = (values: any) => {
  const errors: Partial<any> = {};
  if (values.idType === 'PAN') {
    if (!values.idNo) {
      errors.idNo = 'Please enter PAN card number';
    } else if (!PAN_NO_REGEX.test(values.idNo)) {
      errors.idNo = 'Invalid PAN card number';
    }
  }
  return errors;
};

export const bankAndKycValidation = Yup.object().shape({
  aadharNumber: Yup.string()
    .trim()
    .length(12, 'Aadhar number must be 12 digits long')
    .test('is-valid-aadhaar', 'Please enter valid aadhar card no.', value =>
      AADHAR_REGEX.test(value ? value : ''),
    ),

  ifscCode: Yup.string()
    .trim()
    .matches(IFSC_REGEX, 'Please enter valid IFSC code.'),
});

export const personalDetailsValidation = Yup.object().shape({
  emailId: Yup.string().email('Invalid email address'),
});

export const validatePGrievanceForm = (values: any) => {
  const errors: Partial<any> = {};

  if (values.grievanceSubCategory === 'Existing siebel request') {
    if (values.mobileNo === '') {
      errors.mobileNo = 'Enter mobile No.';
    } else if (!INDIAN_MOBILE_REGEX.test(values?.mobileNo)) {
      errors.mobileNo = 'Please Enter valid mobile No.';
    }
  }
  return errors;
};

export const GrievanceValidationSchema = Yup.object().shape({
  grievanceCategory: Yup.string().required('Grievance category is required'),
  grievanceSubCategory: Yup.string().test({
    test: function (value) {
      const {grievanceCategory} = this.parent;
      return grievanceCategory !== 'Others' ? !!value : true;
    },
    message: 'Grievance sub-category is required',
  }),
  productCategory: Yup.string().test({
    test: function (value) {
      const {grievanceCategory} = this.parent;
      return grievanceCategory === 'Product Related' ||
        grievanceCategory === 'Channel Related'
        ? !!value
        : true;
    },
    message: 'Product category is required',
  }),
  shipmentNo: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'Channel Related' &&
        grievanceSubCategory === 'Supply Chain Management'
        ? !!value
        : true;
    },
    message: 'Shipment No. is required',
  }),
  orderNo: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'Product Related' &&
        grievanceSubCategory === 'Order issue'
        ? !!value
        : true;
    },
    message: 'Order No. is required',
  }),
  srNo: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'Product Related' &&
        grievanceSubCategory === 'Existing Siebel Request'
        ? !!value
        : true;
    },
    message: 'Siebel No. is required',
  }),
  invoiceNo: Yup.string().test({
    test: function (value) {
      const {grievanceSubCategory} = this.parent;
      return grievanceSubCategory && grievanceSubCategory.includes('Invoice')
        ? !!value
        : true;
    },
    message: 'Invoice/CN/DN No. is required',
  }),
  comments: Yup.string().required('Comments are required'),
  startDate: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'Commerical' &&
        grievanceSubCategory === 'Account statement'
        ? !!value
        : true;
    },
    message: 'Start Date is required',
  }),
  endDate: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'Commerical' &&
        grievanceSubCategory === 'Account statement'
        ? !!value
        : true;
    },
    message: 'End Date is required',
  }),
  typeLockRemoval: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'DMS related' &&
        grievanceSubCategory === 'DMS lock removal request'
        ? !!value
        : true;
    },
    message: 'Type of Lock Removal is required',
  }),
  reasonLockRemoval: Yup.string().test({
    test: function (value) {
      const {grievanceCategory, grievanceSubCategory} = this.parent;
      return grievanceCategory === 'DMS related' &&
        grievanceSubCategory === 'DMS lock removal request'
        ? !!value
        : true;
    },
    message: 'Reason For Lock Removal is required',
  }),
});

export const RaiseTicketSchema = Yup.object().shape({
  supportType: Yup.string().required('Please select support type'),
  subType: Yup.string().required('Please select sub type'),
  productCategory: Yup.string(),
  comments: Yup.string().required(),
});

export const validateRaiseTicketForm = (values: any) => {
  const errors: Partial<any> = {};

  if (values.supportType === 'Product Related') {
    if (
      values.subType === 'Product Feedback' ||
      values.subType === 'Add product category'
    )
      if (!values.productCategory) {
        errors.productCategory = 'Please select product category';
      }
  }

  return errors;
};
