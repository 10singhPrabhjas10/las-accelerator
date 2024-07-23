import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import {COLORS} from 'theme/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {
  ITransformedSchemeDetails,
  NavigationFrom,
} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.interface';
import {getSchemeDetailsData} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.business';

const PerfSchemeDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'PerfSchemeDetails'>>();
  const {schemeId} = route.params;
  const [schemeData, setSchemeData] = useState<ITransformedSchemeDetails>();

  const fetchSchemeDetails = useCallback((id: string) => {
    getSchemeDetailsData(id, setSchemeData);
  }, []);

  useEffect(() => {
    fetchSchemeDetails(schemeId);
  }, [schemeId]);

  return (
    <Layout headerTitle="Scheme Details" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DataCard data={schemeData?.data} header={schemeData?.schemeName} />
      </View>
      <CustomButton
        type={ButtonTypes.outline}
        text="Rewards & Qualification"
        onPress={() => {
          navigation.navigate('RewardsQualification', {
            schemeId: schemeData?.schemeId ?? '',
          });
        }}
      />
      <Spacer size={15} />
      <CustomButton
        type={ButtonTypes.outline}
        text="Retailer Eligibility"
        onPress={() => {
          navigation.navigate('RetailerEligibility', {
            schemeId: schemeData?.schemeId ?? '',
            navigationFrom: NavigationFrom.SCHEME_PERFORMANCE,
          });
        }}
      />
      <Spacer size={20} />
      <TouchableOpacity
        style={styles.textView}
        onPress={() => {
          navigation.navigate('TermsAndConditions', {
            tnc: 'schemeSlab',
            entityId: schemeData?.schemeId,
          });
        }}>
        <Text style={styles.text} variant="bodyMedium">
          Terms & Conditions
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  textView: {alignSelf: 'center'},
});

export default PerfSchemeDetails;
