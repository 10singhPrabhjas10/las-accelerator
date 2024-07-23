//External Dependencies
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';

// Internal Dependencies
import Layout from 'components/Layout';
import ContactFooter from 'components/contactFooter/ContactFooter';
import {AuthNavigationTypes} from 'routes/AuthNavigator';

// Styles, constants and Interfaces
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import ScreenSubHeader from 'components/headers/ScreenSubHeader';
import {
  getSecondaryTermsConditionsData,
  getTnC,
} from './TermsAndConditions.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const TermsAndConditions = () => {
  const route =
    useRoute<RouteProp<AuthNavigationTypes, 'TermsAndConditions'>>();

  const activeLanguage = useSelector(
    (state: RootState) => state?.localization?.selectedLanguage?.id,
  );
  const [tncData, setTncData] = useState('');
  const [lastUpdatedDate, setLastUpdatedDate] = useState(Date());

  const entityId = route?.params?.entityId || '';

  useEffect(() => {
    if (entityId) {
      getSecondaryTermsConditionsData(entityId, setTncData, setLastUpdatedDate);
    } else {
      getTnC(
        route?.params?.tnc,
        setTncData,
        setLastUpdatedDate,
        activeLanguage,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId, route?.params?.tnc]);

  return (
    <Layout headerTitle={getTranslationLabel('tnc')}>
      <ScrollView>
        <ScreenSubHeader
          title={getTranslationLabel('tnc')}
          subTitle={`${getTranslationLabel(
            'last_updated',
          )} ${convertDateToDisplay(lastUpdatedDate, DateFormats.DD_MMM_YYYY)}`}
        />
        <View style={styles.bodyContainer}>
          <Markdown>{tncData}</Markdown>
        </View>
      </ScrollView>
      <ContactFooter />
    </Layout>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
});
