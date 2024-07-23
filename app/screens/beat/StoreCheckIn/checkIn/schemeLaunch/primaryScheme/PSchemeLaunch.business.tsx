import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  getPrimarySchemePdfData,
  getPrimarySchemes,
} from 'services/methods/storeCheckIn';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  IPrimarySchemeReqBody,
  IPrimarySchemeResponse,
} from './PSchemeLaunch.interface';
import {convertDateToDisplay, downloadPdf} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {store} from 'store/redux/store';

//API to fetch Primary Schemes
const transformPrimarySchemes = (data: IPrimarySchemeResponse[]) => {
  return data?.map(item => ({
    title: item?.documentName ?? EMPTY_DATA_DASH,
    subTitle: item?.createdDate
      ? convertDateToDisplay(item?.createdDate, DateFormats.DD_MMM_YY_2)
      : EMPTY_DATA_DASH,
    id: item?.id,
    documentId: item?.documentId,
  }));
};

export const getPrimarySchemesData = async (
  body: IPrimarySchemeReqBody,
  setPrimarySchemeData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getPrimarySchemes(), body);
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      const finalFormattedData = transformPrimarySchemes(data);

      setPrimarySchemeData((prev: IPrimarySchemeResponse[]) => [
        ...prev,
        ...finalFormattedData,
      ]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to download PDF
export const downloadPdfData = async (
  documentId: string,
  isShare: boolean,
  fileName: string,
) => {
  setReduxLoading(true);

  try {
    const sfdcAccessToken = store.getState().user.sfdcUser?.access_token;
    const result = await NetworkRequest(
      GET,
      getPrimarySchemePdfData(documentId),
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'skip-auth': 'true',
          Authorization: `Bearer ${sfdcAccessToken}`,
        },
      },
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      await downloadPdf(
        {
          title: fileName,
          versionData: result?.data?.base64Body,
        },
        '',
        isShare,
      );
    }
  } catch (error: any) {
    console.log('error', error?.data?.[0]?.message);
  } finally {
    setReduxLoading(false);
  }
};
