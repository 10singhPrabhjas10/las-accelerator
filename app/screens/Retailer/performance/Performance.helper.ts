import {DateFormats} from 'constants/dateFormat';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
} from 'utils/commonMethods';
import {IDownloadReportResponse} from './Performance.interface';

export const generatedPerformanceHtml = (
  data: IDownloadReportResponse,
  startDate: string,
  endDate: string,
) => {
  const fromDate = startDate
    ? convertDateToDisplay(startDate, DateFormats.Do_MMMM)
    : EMPTY_DATA_DASH;
  const toDate = endDate
    ? convertDateToDisplay(endDate, DateFormats.Do_MMMM)
    : EMPTY_DATA_DASH;
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Report</title>
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

        .heading-left label{
            font-weight: bold;
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

    </style>
</head>

<body>
    <div class="invoice-container">
        <header>
            <div class="heading-left" style="display: flex; flex-direction: column; gap: 4px;">
                <div>
                    <label for="">Date: </label>
                    <span>${fromDate} - ${toDate}</span>
                </div>
                <div>
                    <label for="">Customer Name: </label>
                    <span>${data?.customerName ?? EMPTY_DATA_DASH}</span>
                </div>
                <div>
                    <label for="">Customer Code: </label>
                    <span>${data?.customerCode ?? EMPTY_DATA_DASH}</span>
                </div>
             </div>   
        </header>
        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Product Division</th>
                    <th>Material Group</th>
                    <th>SKU Description</th>
                    <th>Material Code</th>
                    <th>Paid Qty</th>
                    <th>FOC Qty</th>
                    <th>Invoice Amount</th>
                </tr>
            </thead>
            <tbody>
                ${data?.salesData
                  ?.map((item, index) => {
                    return `
                        <tr>
                        <td>${index}</td>
                        <td>${
                          item?.productCategoryDescription ?? EMPTY_DATA_DASH
                        }</td>
                        <td>${
                          item?.productSubcategoryDescription ?? EMPTY_DATA_DASH
                        }</td>
                        <td>${
                          item?.productSkuDescription ?? EMPTY_DATA_DASH
                        }</td>
                        <td>${item?.productSkuCode ?? EMPTY_DATA_DASH}</td>
                        <td>${item?.paidQuantity ?? EMPTY_DATA_DASH}</td>
                        <td>${item?.focQuantity ?? EMPTY_DATA_DASH}</td>
                        <td>${
                          item?.netAmount
                            ? `₹ ${formatNumberWithCommas(item?.netAmount)}`
                            : EMPTY_DATA_DASH
                        }</td>
                    </tr>
                    `;
                  })
                  .join('')}
            </tbody>
        </table>
    </div>
</body>

</html>
    `;
};
