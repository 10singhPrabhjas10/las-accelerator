import NetworkRequest from 'services/networkRequest';
import {GET, POST} from 'constants/httpConstants';
import {store} from 'store/redux/store';
import {updateSfdcUser} from 'store/redux/userSlice';
import {getDataFromSFDCApi, getSFDCUploadApi} from './methods/misc';
import Config from 'react-native-config';

export interface ISfdcRecords {
  attributes: {
    type: string;
    referenceId: string; //entity id + timestamp
  };
  Title: string; //filename
  PathOnClient: string; //filename.pdf
  FirstPublishLocationId: string; //entity id
  VersionData: string; //base 64
}

export interface ISfdcRequestBody {
  records: ISfdcRecords[];
}

export const authenticateUserWithSFDC = async () => {
  try {
    const result = await NetworkRequest(
      POST,
      Config.SFDC_AUTH_BASE_URL,
      {
        grant_type: Config.SFDC_GRANT_TYPE,
        client_id: Config.SFDC_CLIENT_ID,
        client_secret: Config.SFDC_CLIENT_SECRET,
        username: Config.SFDC_USER_NAME,
        password: Config.SFDC_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    store.dispatch(updateSfdcUser(result.data));
  } catch (error: any) {
    console.error(error);
  }
};

export const getDataFromSFDC = async (entityId: string) => {
  try {
    const sfdcAccessToken = store.getState().user.sfdcUser?.access_token;

    const result = await NetworkRequest(
      GET,
      getDataFromSFDCApi(entityId),
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'skip-auth': 'true',
          Authorization: `Bearer ${sfdcAccessToken}`,
        },
      },
    );

    return result.data;
  } catch (error: any) {
    console.error(error);
  }
};

export const uploadDataToSFDC = async (
  requestBody: ISfdcRequestBody,
  onSuccess: (data: any) => void,
) => {
  try {
    const sfdcAccessToken = store.getState().user?.sfdcUser?.access_token;

    const result = await NetworkRequest(POST, getSFDCUploadApi(), requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'skip-auth': 'true',
        Authorization: `Bearer ${sfdcAccessToken}`,
      },
    });

    onSuccess(result.data);
  } catch (error: any) {
    console.error(error);
  }
};
