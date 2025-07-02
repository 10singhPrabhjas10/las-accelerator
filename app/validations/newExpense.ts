import * as Yup from 'yup';

export const travelExpenseValidation = Yup.object().shape({
  fromDate: Yup.string().required('Please select From Date'),
  toDate: Yup.string().required('Please select To Date'),
  calculatedAmount: Yup.string().required('Please enter the Amount'),
  beatStartPoint: Yup.string().required('Please enter the Beat Start Point'),
  beatEndPoint: Yup.string().required('Please enter the Beat End Point'),
  beatDistance: Yup.string().required('Please enter the Actual Beat Distance'),
  modeOfTransport: Yup.string().required('Please enter the Mode Of Transport'),
  // amountExlTax: Yup.string(),
  // otherAmount: Yup.string(),
});
// .test(
//   'amounts-required',
//   'At least one of Amount1, Amount2 must be filled',
//   function (value) {
//     const {amount, amountExlTax} = value;
//     return (
//       amount !== '' || amountExlTax !== ''
//     );
//   },
// );

export const lodgingExpenseValidation = Yup.object().shape({
  lodgingAmount: Yup.string().required('Please enter the Amount'),
  lodgingTaxAmount: Yup.string().required('Please enter the Tax Amount'),
  noOfNight: Yup.string().required('Please enter the No of Night'),
});

export const otherExpenseValidation = Yup.object().shape({
  otherAmount: Yup.string().required('Please enter the Amount'),
  otherTaxAmount: Yup.string().required('Please enter the Tax Amount'),
});
