import {GST_REGEX, INDIAN_MOBILE_REGEX, PAN_NO_REGEX} from 'utils/Constants';
import * as Yup from 'yup';

export const SecondaryLeadSchema = Yup.object().shape({
  firmName: Yup.string().required('Please Enter Firm Name'),
  gstIn: Yup.string()
    .length(15, 'GST must be 15 letters')
    .matches(GST_REGEX, 'Invalid GST number'),
  panCardNumber: Yup.string()
    .length(10, 'Pan Card must be 10 letters')
    .matches(PAN_NO_REGEX, 'Invalid Pan Card number'),
  mobileNumber: Yup.string()
    .length(10, 'Mobile number must be 10 digit')
    .matches(INDIAN_MOBILE_REGEX, 'Invalid mobile number')
    .required('Please enter mobile number'),
  alternativeMobileNumber: Yup.string()
    .length(10, 'Mobile number must be 10 digit')
    .matches(INDIAN_MOBILE_REGEX, 'Invalid mobile number'),
  ownerName: Yup.string().required('Please enter branch name'),
  emailId: Yup.string().email('Invalid email'),
  pincode: Yup.string()
    .length(6, 'Pin code must be 6 digit')
    .required('Please enter pin code'),
  area: Yup.string().required('Please select area'),
  addressLine1: Yup.string().required('Please enter address'),
  addressLine2: Yup.string().required('Please enter address'),
  landmark: Yup.string().required('Please enter landmark'),
});
