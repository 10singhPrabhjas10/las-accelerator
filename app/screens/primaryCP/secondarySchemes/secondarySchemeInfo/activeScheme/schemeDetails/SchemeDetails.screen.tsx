import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native-paper';

import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import {COLORS} from 'theme/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {getSchemeDetailsData} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.business';
import {
  ITransformedSchemeDetails,
  NavigationFrom,
} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.interface';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const SchemeDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'SchemeDetails'>>();
  const {schemeId} = route.params;
  const [schemeData, setSchemeData] = useState<ITransformedSchemeDetails>();

  const fetchSchemeDetails = useCallback((id: string) => {
    getSchemeDetailsData(id, setSchemeData);
  }, []);

  useEffect(() => {
    fetchSchemeDetails(schemeId);
  }, [schemeId]);

  return (
    <Layout
      isScrollable
      headerTitle="Scheme Details"
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DataCard data={schemeData?.data} header={schemeData?.schemeName} />
      </View>
      <Spacer size={20} />
      {schemeData && schemeData?.data?.length <= 0 && (
        <EmptyContainer title="No Scheme Details" />
      )}
      {schemeData && schemeData?.data?.length >= 0 && (
        <>
          <CustomButton
            type={ButtonTypes.outline}
            text="Slab Details"
            onPress={() => {
              navigation.navigate('SlabDetails', {
                schemeId: schemeData?.schemeId ?? '',
              });
            }}
          />
          <Spacer size={15} />
          <CustomButton
            type={ButtonTypes.outline}
            text="Scheme Eligibility"
            onPress={() => {
              navigation.navigate('SchemeEligibility', {
                schemeId: schemeData?.schemeId ?? '',
                categoryId: schemeData?.categoryId ?? '',
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
                navigationFrom: NavigationFrom.SCHEME_INFORMATION,
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
        </>
      )}
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
export default SchemeDetails;
