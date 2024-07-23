// External Dependencies
import React from 'react';
import {useSelector} from 'react-redux';

// Internal Dependencies
import {RootState} from 'store/redux/store';

const useLanguageSelection = (key: string) => {
  const translations = useSelector(
    (state: RootState) => state?.localization?.translations,
  );
  let label = '';
  let startTextLabel = '';
  let highlightTextLabel = '';
  let endTextLabel = '';
  translations.forEach((element: any) => {
    if (element.key === key && element?.dynamicText !== null) {
      startTextLabel = element.label.substring(
        0,
        element.label.indexOf(element?.dynamicText),
      );
      highlightTextLabel = element?.dynamicText;
      endTextLabel = element.label.substring(
        element.label.indexOf(element?.dynamicText) +
          element?.dynamicText?.length,
      );
    } else if (element.key === key) {
      label = element.label;
    }
  });

  return {label, startTextLabel, highlightTextLabel, endTextLabel};
};

export default useLanguageSelection;
