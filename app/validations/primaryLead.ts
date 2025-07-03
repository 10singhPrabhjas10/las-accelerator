import {GST_REGEX, INDIAN_MOBILE_REGEX} from 'utils/Constants';
import * as Yup from 'yup';

export const PrimaryLeadSchema = Yup.object().shape({
  contactPersonName: Yup.string().required('Please enter contact person name'),
  businessName: Yup.string().required('Please enter business name'),
  emailId: Yup.string().email('Invalid email'),
  mobileNumber: Yup.string()
    .length(10, 'Mobile number must be 10 digit')
    .matches(INDIAN_MOBILE_REGEX, 'Invalid mobile number')
    .required('Please enter lead mobile number'),
  // gstIn: Yup.string()
  //   .length(15, 'GST must be 15 letters')
  //   .matches(GST_REGEX, 'Invalid GST number'),
  categoryId: Yup.string().required('Please select lead product category'),
  pincode: Yup.string()
    .length(6, 'Pin code must be 6 digit')
    .required('Please enter pin code'),
});
