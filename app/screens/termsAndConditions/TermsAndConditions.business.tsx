//API to get TnC for specific scheme in view details
import {GET, HttpStatusCode} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import Config from 'react-native-config';
import {getTermsAndConditionAPi} from 'services/methods/misc';
import {getTncData} from 'services/methods/storeCheckIn';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

export const getTnC = (
  tnCScreen: string,
  setTnC: SetStateAction<any>,
  setLastUpdatedDate: SetStateAction<any>,
  activeLanguage: string,
) => {
  setReduxLoading(true);
  NetworkRequest(
    GET,
    getTermsAndConditionAPi(tnCScreen, activeLanguage),
    {},
    {
      headers: {
        'skip-token': 'true',
        Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
      },
    },
  )
    .then(result => {
      if (
        result.status === HttpStatusCode.OK &&
        result?.data?.data.length > 0
      ) {
        const {content, updatedAt} = result?.data?.data?.[0]?.attributes;
        setTnC(content);
        setLastUpdatedDate(updatedAt);
      }
    })
    .catch(err => {
      handleApiError(err?.message);
    })
    .finally(() => setReduxLoading(false));
};

export const getSecondaryTermsConditionsData = async (
  schemeId: string,
  setTncData: SetStateAction<any>,
  setLastUpdatedDate: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getTncData(schemeId));
    if (result.status === HttpStatusCode.OK && result?.data) {
      setTncData(result.data.html);
      setLastUpdatedDate(result.data.lastUpdatedDate);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
