import {IInvoiceData} from 'screens/orderTaking/OrderTaking.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {numberToWords} from 'utils/commonMethods';

export const generatedHtml = (data: IInvoiceData) => {
  const logo = data?.invoiceSetting?.logoForInvoice;
  let totalAmount = data?.invoiceLineItems?.reduce(
    (sum, item) => sum + item.invoiceAmount,
    0,
  );
  // Calculate CGST and SGST at 9% each
  let cgst = totalAmount * 0.09;
  let sgst = totalAmount * 0.09;

  // Calculate the grand total
  let grandTotal = totalAmount + cgst + sgst;
  const amountInWords = numberToWords(grandTotal);
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              margin: 0;
              padding: 0;
              page-break-after: always;
          }
  
          .invoice-container {
              width: 800px;
              margin: auto;
              padding: 20px;
              border: 1px solid #000;
              box-sizing: border-box;
          }
  
          header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #000;
              padding-bottom: 10px;
          }
  
          .header-left h1 {
              font-size: 20px;
              margin: 0;
              font-weight: bold;
          }
  
          .header-left p {
              margin: 2px 0;
              font-size: 10px;
          }
  
          .header-right img {
              height: 50px;
          }
  
          .tax-invoice {
              text-align: center;
              margin: 10px 0;
              border-bottom: 1px solid #000;
              padding: 5px 0;
          }
  
          .tax-invoice h2 {
              margin: 0;
              font-size: 18px;
              font-weight: bold;
          }
  
          .invoice-details {
              display: flex;
              justify-content: space-between;
              padding-bottom: 10px 0;
          }
  
          .invoice-details .left {
              width: 45%;
              text-align: left;
          }
  
          .invoice-details .left .left-div p {
              font-weight: bold;
          }
  
          .invoice-details .right {
              width: 45%;
              text-align: left;
          }
  
          .details {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
          }
  
          .document {
              gap: 5px;
          }
  
          .document div {
              display: flex;
              justify-content: space-between;
          }
  
          .document div label {
              font-weight: bold;
          }
  
  
          .details-left {
              width: 35%;
          }
          .details-right {
              width: 35%;
          }
  
          .details-left h3,
          .details-right h3 {
              margin: 0 0 5px 0;
              font-size: 14px;
          }
  
          .details-left p,
          .details-right p {
              margin: 2px 0;
          }
  
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
          }
  
          table th,
          table td {
              border: 1px solid #000;
              padding: 5px;
              text-align: left;
              font-size: 10px;
          }
  
          table th {
              background-color: #f2f2f2;
              font-weight: bold;
          }
  
          .footer {
              display: flex;
              justify-content: space-between;
              padding-top: 10px;
              border-top: 1px solid #000;
          }
  
          .footer div {
              text-align: center;
              width: 30%;
              font-size: 10px;
          }
  
          .footer-note {
              text-align: center;
              margin-top: 20px;
              font-size: 10px;
          }
      </style>
  </head>
  
  <body>
      <div class="invoice-container">
          <header>
              <div class="header-left">
                  <h1>${
                    data?.invoiceSetting?.titleForInvoice ?? EMPTY_DATA_DASH
                  }</h1>
                  <p>${
                    data?.invoiceSetting?.addressForInvoice ?? EMPTY_DATA_DASH
                  }</p>
                  <p>${
                    data?.invoiceSetting?.officeAddressForInvoice ??
                    EMPTY_DATA_DASH
                  }</p>
              </div>
              <div class="header-right">
                  <img src="${logo}" alt="Logo">
              </div>
          </header>
          <div class="tax-invoice">
              <h2>TAX INVOICE</h2>
              <div class="invoice-details">
                  <div class="left" style="display: flex; flex-direction: column; gap: 4px;">
                      <div>
                          <label for="">IRN:</label>
                          <span></span>
                      </div>
                      <div>
                          <label for="">Ack No:</label>
                          <span></span>
                      </div>
                      <div>
                          <label for="">Ack Date:</label>
                          <span></span>
                      </div>
                      <div>
                          <label for="">Ack Time:</label>
                          <span></span>
                      </div>
                  </div>
              </div>
          </div>
          <section class="details">
              <div class="details-left">
                  <h3>Document Details</h3>
                  <div class="document" style="display: flex; flex-direction: column;">
                      <div>
                          <label for="">Document No. : </label>
                          <span>${
                            data?.details?.sapInvoiceNo ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">Document Date. : </label>
                          <span>${
                            data?.details?.invoiceDate ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">SAP Doc No :</label>
                          <span>${
                            data?.details?.sapInvoiceNo ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">CIN:</label>
                          <span>${data?.details?.cin ?? EMPTY_DATA_DASH}</span>
                      </div>
                      <div>
                          <label for="">GSTIN:</label>
                          <span>${
                            data?.details?.gstIn ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">PAN:</label>
                          <span>${
                            data?.details?.panNumber ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">Place of Supply:</label>
                          <span>${
                            data?.billingDetails?.billingAddress?.state ??
                            EMPTY_DATA_DASH
                          }</span>
                      </div>
                  </div>
              </div>
              <div class="details-right">
                  <h3>Details of Receiver (Bill to)</h3>
                  <p>Abhishek Electricals</p>
                  <p>${data?.billingDetails?.billingAddress?.city}, ${
    data?.billingDetails?.billingAddress?.street
  } - ${data?.billingDetails?.billingAddress?.postalCode}, ${
    data?.billingDetails?.billingAddress?.state
  }, ${data?.billingDetails?.billingAddress?.country}</p>
                  <div style="display: flex; flex-direction: column; margin-top: 10px;">
                      <div>
                          <label for="">Phone:</label>
                          <span>${
                            data?.billingDetails?.phone ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">Mobile:</label>
                          <span>${
                            data?.billingDetails?.mobile ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">State Code:</label>
                          <span>${
                            data?.billingDetails?.billingStateCode ??
                            EMPTY_DATA_DASH
                          }</span>
                      </div>
                      <div>
                          <label for="">GSTIN:</label>
                          <span>${
                            data?.billingDetails?.gstIn ?? EMPTY_DATA_DASH
                          }</span>
                      </div>
                  </div>
              </div>
          </section>
          <table>
              <thead>
                  <tr>
                      <th>S.No</th>
                      <th>Description of Goods / Services</th>
                      <th>Qty</th>
                      <th>UOM</th>
                      <th>Taxable Amount</th>
                  </tr>
              </thead>
              <tbody>
              ${data.invoiceLineItems
                .map((item, index) => {
                  return `
                  <tr>
                <td>${index}</td>
                <td>${item?.skuName ?? EMPTY_DATA_DASH}</td>
                <td>${item?.quantity ?? EMPTY_DATA_DASH}</td>
                <td>${item?.uom ?? EMPTY_DATA_DASH}</td>
                <td>${item?.invoiceAmount ?? EMPTY_DATA_DASH}</td>
            </tr>`;
                })
                .join('')}
  
              </tbody>
          </table>
              
          <table>
              <thead>
                  <tr>
                      <th></th>
                      <th>Total Amount</th>
                      <th>${totalAmount}</th>
                  </tr>
                  <tr>
                      <th></th>
                      <th>Total Value</th>
                      <th>${data?.totalInvoiceAmount}</th>
                  </tr>
              </thead>
          </table>
          
          <div style="display: flex; flex-direction: column; row-gap: 5px; margin-bottom: 10px;">
              <div>
                  <label>Amount in Words:</label>
                  <span>${amountInWords}</span>
              </div>
          </div>
  
          <footer class="footer">
              <div class="footer-left">
                  <h2>Prepared By</h2>
              </div>
              <div class="footer-center">
                  <h2>Reviewed By</h2>
              </div>
              <div class="footer-right">
                  <h2> Industries Limited,</h2>
              </div>
          </footer>
          <div>
              <h3 style="text-align: right;">Authorised Signatory</h3>
          </div>
          <div class="footer-note">
              <h4>${data?.invoiceSetting?.queryTextForInvoice}</h4>
              <p>Regd.Off.Address: ${
                data?.invoiceSetting?.registeredOfficeAddress
              }</p>
              <p>Telephone: ${data?.invoiceSetting?.telephone}, Fax: ${
    data?.invoiceSetting?.fax
  }, e-mail: ${data?.invoiceSetting?.email}, website: ${
    data?.invoiceSetting?.website
  }</p>
          </div>
      </div>
  </body>
  
  </html>
    `;
};
