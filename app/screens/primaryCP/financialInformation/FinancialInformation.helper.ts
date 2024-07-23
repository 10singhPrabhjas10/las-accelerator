import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  IAccountOdiChargedData,
  IAccountOdiWaivedData,
  IAccountOutstandingTransactionProps,
  IAccountStatementCustomerDetails,
  IAccountStatementData,
  IAccountStatementPeriod,
  IAccountStatementSummary,
  IAccountStatementTransactionProps,
} from './FinancialInformation.interface';
import {store} from 'store/redux/store';

const pdfHeader = (data: IAccountStatementPeriod) => {
  return `
    <header>
      <div class='statementTitle'>
          <h3>STATEMENT OF ACCOUNT</h3>
          <h3>For the Period : ${data.startDate} TO ${data.endDate}</h3>
      </div>
      <h4>ABC INDUSTRIES LIMITED</h4>
      <p>Regd.Office-</p>
      <p>CIN: </p>
      <p>Website: www.abc.in , T: +91 00000</p>
    </header>`;
};

const pdfCustomerInformation = (data: IAccountStatementCustomerDetails) => {
  const customerCode = store.getState().channelPartner.channelPartnerId;

  return `
    <section style="display: flex; flex-direction: row; justify-content: space-between;">
      <div style="flex: 1 1 0;">
        <h4>Customer: ${data.name} (${customerCode})</h4>
        <p>${data.address}</p>
      </div>
      <div style="flex: 1 1 0;">
        <table style="table-layout: fixed; border: none;">
          <colgroup>
            <col style="width: 35px;">
            <col style="width: 80px;">
            <col style="width: 40px;">
            <col style="width: 120px;">
          </colgroup>
          <tr style="border: none;">
            <td style="padding: 0; border: none;">City</td>
            <td style="padding: 0; border: none;">: ${data.city}</td>
            <td style="padding: 0; border: none;">GSTIN</td>
            <td style="padding: 0; border: none;">: ${data.GSTIN}</td>
          </tr>
          <tr style="border: none;">
            <td style="padding: 0; border: none;">PIN</td>
            <td style="padding: 0; border: none;">: ${data.pinCode}</td>
            <td style="padding: 0; border: none;">PAN</td>
            <td style="padding: 0; border: none;">: ${data.PAN}</td>
          </tr>
          <tr style="border: none;">
            <td style="padding: 0; border: none;">State</td>
            <td style="padding: 0; border: none;">: ${data.state}</td>
            <td style="padding: 0; border: none;">Mobile</td>
            <td style="padding: 0; border: none;">: ${data.mobile}</td>
          </tr>
        </table>
      </div>
    </section>`;
};

const pdfAccountSummary = (data: IAccountStatementSummary, endDate: string) => {
  return `
    <section style="display: flex; flex-direction: row; justify-content: space-between;">
      <div style="flex: 1 1 0;">
        <p>Security Deposit: ${data.securityDeposit}</p>
        <p>Bank Guarantee: ${data.bankGuarantee}</p>
        <p>Closing Balance: ${data.closingBalance} (as on ${endDate})</p>
      </div>
      <div style="flex: 1 1 0;">
        <table style="table-layout: fixed; border: none;">
          <colgroup>
            <col style="width: 50px;">
            <col style="width: 200px;">
            <col style="width: 20px;">
            <col style="width: 20px;">
          </colgroup>
          <tr style="border: none;">
            <td style="padding: 0; border: none;">Contact</td>
            <td style="padding: 0; border: none;">: ${data.contact}</td>
            <td style="padding: 0; border: none;"></td>
            <td style="padding: 0; border: none;"></td>
          </tr>
          <tr style="border: none;">
            <td style="padding: 0; border: none;">Email</td>
            <td style="padding: 0; border: none;">: ${data.email}</td>
            <td style="padding: 0; border: none;"></td>
            <td style="padding: 0; border: none;"></td>
          </tr>
        </table>
      </div>
    </section>`;
};

const pdfAccountStatementTransactions = (
  data: IAccountStatementTransactionProps[],
  customerName: string,
  closingBalance: string,
) => {
  return `
    <h3>Customer: ${customerName}</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Document Number</th>
          <th>Document Type</th>
          <th>Invoice Number</th>
          <th>Particulars</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            item => `
          <tr>
            <td>${item.date}</td>
            <td>${item.documentNumber}</td>
            <td>${item.documentType}</td>
            <td>${item.invoiceNumber}</td>
            <td>${item.particulars}</td>
            <td>${item.debit}</td>
            <td>${item.credit}</td>
            <td>${item.balance} Dr.</td>
          </tr>
        `,
          )
          .join('')}
        <tr>
          <td colspan="7"><h5>Closing Balance</h5></td>
          <td><h5>${closingBalance}</h5></td>
        </tr> 
      </tbody>
    </table>
  `;
};

const pdfOdiCharged = (
  odiChargedData: IAccountOdiChargedData[],
  totalOdi: number,
  customerName: string,
  statementPeriod: IAccountStatementPeriod,
) => {
  return `
    <div style="page-break-before: always;">
      <h3>Customer: ${customerName}</h3>
      <h4>Annexure 1 - ODI Charged</h4>
      <br />
      <table>
        <thead>
          <tr>
            <th>Doc. Type</th>
            <th>Invoice No</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Invoice Amount</th>
            <th>Base Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Interest+GST</th>
            <th>Debit Note no</th>
          </tr>
        </thead>
        <tbody>
          ${odiChargedData
            .map(
              item => `
            <tr>
              <td>${item.docType}</td>
              <td>${item.invoiceNo}</td>
              <td>${item.invoiceDate}</td>
              <td>${item.dueDate}</td>
              <td>${item.invoiceAmount}</td>
              <td>${item.baseAmount}</td>
              <td>${item.from}</td>
              <td>${item.to}</td>
              <td>${item.days}</td>
              <td>${item.interestGST}</td>
              <td>${item.debitNoteNo}</td>
            </tr>
          `,
            )
            .join('')}
          <tr>
            <td colspan="10"><h5>ODI for the period ${
              statementPeriod.startDate
            } TO ${statementPeriod.endDate}</h5></td>
            <td><h5>${totalOdi} Dr.</h5></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

const pdfOdiWaived = (
  data: IAccountOdiWaivedData[],
  customerName: string,
  statementPeriod: IAccountStatementPeriod,
  totalInterestWaived: number,
) => {
  return `
    <div style="page-break-before: always;">
      <h3>Customer: ${customerName}</h3>
      <h4>Annexure 2 - ODI Waived</h4>
      <br />
      <table>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Debit Note Date</th>
            <th>Debit Note No</th>
            <th>Debit Note Amount</th>
            <th>Credit Note</th>
            <th>Credit Note Amount</th>
            <th>Credit Note Date</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              item => `
            <tr>
              <td>${item.invoiceNo}</td>
              <td>${item.debitNoteDate}</td>
              <td>${item.debitNoteNo}</td>
              <td>${item.debitNoteAmount}</td>
              <td>${item.creditNote}</td>
              <td>${item.creditNoteAmount}</td>
              <td>${item.creditNoteDate}</td>
            </tr>
          `,
            )
            .join('')}
          <tr>
            <td colspan="6"><h5>Total Interest Waived in ${
              statementPeriod.startDate
            } TO ${statementPeriod.endDate}</h5></td>
            <td><h5>${totalInterestWaived}</h5></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

const pdfFooter = (
  customerDetails: IAccountStatementCustomerDetails,
  statementPeriod: IAccountStatementPeriod,
  closingBalance: string,
  email: string,
) => {
  return `
    <footer style="page-break-before: always">
      <h5 style="margin: 0; padding: 0;"> INDUSTRIES LIMITED</h5>
      <small style="margin: 0; padding: 0;">Branch Address: </small>
      <br /><small style="margin: 0; padding: 0;">Email: abc@info.in</small>
      <br /><small style="margin: 0; padding: 0;">Mobile: </small>
      <br />
      <br />
      <h5 style="margin: 0; padding: 0;">Customer: ${customerDetails.name}</h5>
      <h5 style="margin: 0; padding: 0;">Dear Channel Partner:</h5>
      <br />
      <small>Please find enclosed the detailed Statement of Account for the period ${
        statementPeriod.startDate
      } to ${
    statementPeriod.endDate
  }. You are requested to revert with the Channel Partner Confirmation Form as below.</small>
      <br />
      <small>In case we do not receive a reply to this request within 15 days, we shall consider the balance sent by us as correct and accepted by you.</small>
      <br />
      <br />
      <small>Regards,</small>
      <br />
      <small> Industries Limited</small>
      <br/><h5>CHANNEL PARTNER BALANCE CONFIRMATION FORM: (Tick ONLY one as applicable)</h5>
      <small>[      ] We are in agreement with the Debit of INR ${closingBalance} Dr. as on ${
    statementPeriod.endDate
  } as appearing in the books of Industries Limited. We have no claims against your company as on ${
    statementPeriod.endDate
  }.</small>
      <br/>
      <br />
      <small>[      ] We are not in agreement with the balance mentioned above as appearing in the books of Industries Limited. <br /> As per our books and records the balance is INR............................................................................ Our accounts statement is attached here with for reconciliation.</small>
      <br/>
      <br />
      <br />
      <br />
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div style="flex-grow: 1;">
          <small>Date:</small>
        </div>
        <div style="display: flex; flex-direction: column; flex-grow: 1;">
          <small>Authorised Signatory</small>
          <small>Name:</small>
          <small>Designation:</small>
        </div>
        <div style="flex-grow: 1;">
          <small>Shop Stamp</small>
        </div>
      </div>
      <h5>CUSTOMER INFORMATION: Kindly let us know in case of any update in the same along with supporting documents of the change.</h5>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Customer Information (as per VGIL records)</th>
            <th>Changes, if any</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><h5>Customer Address:</h5></td>
            <td>${
              customerDetails.address +
              ' ' +
              customerDetails.city +
              ' ' +
              customerDetails.state +
              ' ' +
              customerDetails.pinCode
            }</td>
            <td></td>
          </tr>
          <tr>
            <td><h5>Mobile Number:</h5></td>
            <td>${customerDetails.mobile}</td>
            <td></td>
          </tr>
          <tr>
            <td><h5>Email:</h5></td>
            <td>${email}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <br/>
      <small> * Please provide GST Certificate/ Shops & Establishment Certificate /Trade License supporting the same.</small>
    </footer>
  `;
};

export const generateAccountStatementPdf = (data: IAccountStatementData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <style>
    @page {
        size: A4;
        margin: 1cm;
        @top {
            content: "";
            font-size: 18px; 
        }
        @bottom-right {
            content: counter(page);
            text-align: right; 
        }
    }
    table {
        width: 100%;
        border-collapse: collapse;
        page-break-inside: auto;
    }
    th, td {
        border: 1px solid black;
        padding: 4px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
        text-align: center;
    }
    .statementTitle{
        display: flex;
        flex-direction: column;  
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom:100px;
    }
    h1, h2, h3, h4, p {
        margin:0;
    }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statement of Account</title>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <div class="container">
    ${pdfHeader(data.statementPeriod)}
    <br />
    ${pdfCustomerInformation(data.customerDetails)}
    ${pdfAccountSummary(data.accountSummary, data.statementPeriod.endDate)}
    <br />
    ${pdfAccountStatementTransactions(
      data.transactions,
      data.customerDetails.name,
      data?.accountSummary?.closingBalance,
    )}
    ${
      data.odiChargedData.length > 0
        ? pdfOdiCharged(
            data.odiChargedData,
            data.totalOdi,
            data.customerDetails.name,
            data.statementPeriod,
          )
        : ''
    }
    ${
      data.odiWaivedData.length > 0
        ? pdfOdiWaived(
            data.odiWaivedData,
            data.customerDetails.name,
            data.statementPeriod,
            data.totalInterestWaived,
          )
        : ''
    }
    </div>
    ${pdfFooter(
      data.customerDetails,
      data.statementPeriod,
      data.accountSummary.closingBalance,
      data.accountSummary.email,
    )}
    </div>
    </body>
    </html>
`;
};

const pdfAccountOutstandingTransactions = (
  data: IAccountOutstandingTransactionProps[],
) => {
  return `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Document Number</th>
          <th>Invoice Number</th>
          <th>Product Name</th>
          <th>Document Type</th>
          <th>Amount(INR)</th>
          <th>Dr/Cr</th>
          <th>Due Date</th>
          <th>Days OverDue</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            item => `
          <tr>
            <td>${item.date}</td>
            <td>${item.documentNumber}</td>
            <td>${item.invoiceNumber}</td>
            <td>${item.productName}</td>
            <td>${item.documentType}</td>
            <td>${item.amount}</td>
            <td>${item.drCr}</td>
            <td>${item.dueDate}</td>
            <td>${item.overdueDays}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  `;
};

export const generateAccountOutstandingPdf = (
  data: IAccountOutstandingTransactionProps[],
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <style>
    @page {
        size: A4;
        margin: 1cm;
        @top {
            content: "";
            font-size: 18px; 
        }
        @bottom-right {
            content: counter(page);
            text-align: right; 
        }
    }
    table {
        width: 100%;
        border-collapse: collapse;
        page-break-inside: auto;
    }
    th, td {
        border: 1px solid black;
        padding: 4px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
        text-align: center;
    }
    .statementTitle{
        display: flex;
        flex-direction: column;  
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom:100px;
    }
    h1, h2, h3, h4, p {
        margin:0;
    }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Outstanding</title>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <div class="container">
    ${pdfAccountOutstandingTransactions(data)}
    </div>
    </body>
    </html>
`;
};

export const createPDF = async (html: any) => {
  const fileName = 'abc' + Date.now();
  try {
    let options = {
      html,
      fileName: fileName,
      directory: 'Documents',
      paddingLeft: 0,
      paddingRight: 0,
    };

    let file = await RNHTMLtoPDF.convert(options);
    if (file?.filePath) {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: '',
          mimeType: 'application/pdf',
        },
        'Download',
        file.filePath,
      );
      openFile(file.filePath);
    }
  } catch (err) {
    console.log('error is--', err);
  }
};

const openFile = (filePath: string) => {
  if (Platform.OS === 'android') {
    ReactNativeBlobUtil.android.actionViewIntent(filePath, 'application/pdf');
  }
  if (Platform.OS === 'ios') {
    ReactNativeBlobUtil.ios.previewDocument(filePath);
  }
};
