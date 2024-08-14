import NetworkRequest from 'services/networkRequest';
import {store} from 'store/redux/store';
import {ILanguage} from './LanguageSelection';

import {GET, HttpStatusCode} from 'constants/httpConstants';
import {getLocalizationApi} from 'services/methods/localization';
import {setCurrentLanguage} from 'store/redux/localizationSlice';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import Config from 'react-native-config';

export const handleLanguageChange = async (
  selectedLanguage: ILanguage,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  onSuccess();
  return;
  // NetworkRequest(
  //   GET,
  //   getLocalizationApi(selectedLanguage.id),
  //   {},
  //   {
  //     headers: {Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`},
  //   },
  // )
  //   .then(result => {
  //     if (result.status === HttpStatusCode.OK) {
  //       store.dispatch(
  //         setCurrentLanguage({
  //           selectedLanguageTranslation: result?.data,
  //           language: selectedLanguage,
  //         }),
  //       );
  //       onSuccess();
  //     }
  //   })
  //   .catch(error => {
  //     handleApiError(error?.message);
  //   })
  //   .finally(() => {
  //     setReduxLoading(false);
  //   });
};
