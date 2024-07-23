import {createSlice} from '@reduxjs/toolkit';
import {ILocalizationState, ISelectedLanguageState} from 'types/redux';
import {LANGUAGES} from 'utils/Constants';

const initialSelectedLanguage: ISelectedLanguageState = LANGUAGES[0];

const initialState: ILocalizationState = {
  translations: [],
  selectedLanguage: initialSelectedLanguage,
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.translations = action.payload.selectedLanguageTranslation;
      state.selectedLanguage = action.payload.language;
    },
  },
});

export const {setCurrentLanguage} = localizationSlice.actions;

export default localizationSlice.reducer;
