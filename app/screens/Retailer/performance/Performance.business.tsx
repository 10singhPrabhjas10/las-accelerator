import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {formatNumberWithCommas} from 'utils/commonMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  getRetailerPerformance,
  downloadRetailerReport,
} from 'services/methods/secondaryChannelPartner';
import {
  IDownloadRetailerReportReqBody,
  IRetailerPerfResponse,
  IRetailerPerformanceReqBody,
} from './Performance.interface';
import moment from 'moment';
import {generatedPerformanceHtml} from './Performance.helper';
import {createPDF} from 'screens/primaryCP/financialInformation/FinancialInformation.helper';

//API to get Retailer Performance Details
const transformRetailerPerformance = (data: IRetailerPerfResponse[]) => {
  const previousYearShort = moment().subtract(1, 'year').format('YY');
  const currentYearShort = moment().format('YY');
  return data?.map((item, index) => ({
    categoryName: item?.categoryName,
    id: index,
    data: [
      {
        title: `YTD Sales (FY ${currentYearShort})`,
        text:
          item?.salesValueYtd === null
            ? EMPTY_DATA_DASH
            : item?.salesValueYtd >= 0
            ? `₹ ${formatNumberWithCommas(item?.salesValueYtd ?? 0)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: `MTD Sales (FY ${currentYearShort})`,
        text:
          item?.salesValueMtd === null
            ? EMPTY_DATA_DASH
            : item?.salesValueMtd >= 0
            ? `₹ ${formatNumberWithCommas(item?.salesValueMtd)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: 'Average MOV',
        text:
          item?.avgMoV === null
            ? EMPTY_DATA_DASH
            : item?.avgMoV >= 0
            ? `₹ ${formatNumberWithCommas(item?.avgMoV)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: `PY(FY ${previousYearShort}) YTD Sales`,
        text:
          item?.salesValuePfy === null
            ? EMPTY_DATA_DASH
            : item?.salesValuePfy >= 0
            ? `₹ ${formatNumberWithCommas(item?.salesValuePfy ?? 0)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: 'MoM Growth',
        text:
          item?.mom === null
            ? EMPTY_DATA_DASH
            : item?.mom > 0
            ? `${item?.mom} %`
            : EMPTY_DATA_DASH,
      },
      {
        title: 'QoQ Growth',
        text:
          item?.qoq === null
            ? EMPTY_DATA_DASH
            : item?.qoq > 0
            ? `${item?.qoq} %`
            : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getRetailerPerformanceData = async (
  setRetailerData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  body: IRetailerPerformanceReqBody,
  channelPartnerId: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      getRetailerPerformance(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;

      const finalFormattedData = transformRetailerPerformance(data);
      setRetailerData((prev: IRetailerPerfResponse[]) => [
        ...prev,
        ...finalFormattedData,
      ]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const downloadRetailerSalesData = async (
  requestBody: IDownloadRetailerReportReqBody,
  startDate: string,
  endDate: string,
  chanelPartnerId: string,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      downloadRetailerReport(chanelPartnerId),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data} = response?.data;
      const html = generatedPerformanceHtml(data, startDate, endDate);
      createPDF(html);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};
