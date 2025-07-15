import * as Yup from 'yup';

export const NewAddLeadSchema = Yup.object().shape({
  leadName: Yup.string().required('Please enter lead name'),
  leadEmail: Yup.string().required('Please enter email'),
  leadMobile: Yup.string().required('Please enter lead mobile number'),
  categoryName: Yup.string().required('Please select lead product category'),
  pinCode: Yup.string().required('Please enter pin code'),
  subCategoryName: Yup.string().required('Please select sub category'),
  leadType: Yup.string().required('Please select lead type'),
});
