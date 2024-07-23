// External Dependencies
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

// Internal Dependencies
import Layout from 'components/Layout';
import CustomButton from 'components/button/CustomButton';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';

// Styles, constants and Interfaces
import styles from './SecondarySchemeSlab.style';
import {COLORS} from 'theme/colors';
import DownloadIcon from '../../../../../../../assets/icons/downloadIcon.svg';
import {ButtonTypes} from 'types/buttons';
import {ISecondarySchemeSlab} from './SecondarySchemeSlab.interface';
import {requestStoragePermission} from 'utils/Permissions';
import SchemeAccordionList from '../components/schemeAccordionList/SchemeAccordionList';
import CommonStyles from 'utils/commonStyle';
import {
  getDownloadSecondarySchemeSlabDetails,
  getSchemeSlabList,
} from '../SchemeLaunch.business';

const SecondarySchemeSlab = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'SecondarySchemeSlab'>>();

  const [slabList, setSlabList] = useState<ISecondarySchemeSlab[]>([]);

  useEffect(() => {
    getSchemeSlabList(
      route?.params?.relationId,
      route?.params?.secondarySchemeId,
      setSlabList,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={CommonStyles.padding} headerTitle="Secondary Scheme Details">
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bodyContainerWithData}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.cardContainer}>
            <Text>
              {' '}
              <Text variant="labelLarge">{route?.params?.category}: </Text>
              <Text variant="labelLarge" style={styles.subHeading}>
                {route?.params?.schemeName}
              </Text>
            </Text>
            {slabList?.map((data, index) => (
              <SchemeAccordionList
                relationId={route?.params?.relationId}
                data={[data]}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
        <CustomButton
          type={ButtonTypes.contained}
          icon={<DownloadIcon />}
          style={styles.button}
          onPress={async () => {
            await requestStoragePermission();
            getDownloadSecondarySchemeSlabDetails(
              route?.params?.secondarySchemeId,
            );
          }}
          text="Download Scheme"
        />
        <CustomButton
          type={ButtonTypes.text}
          textStyle={styles.buttonTextStyle}
          onPress={() => {
            navigation.navigate('TermsAndConditions', {
              tnc: 'schemeSlab',
              entityId: route?.params?.secondarySchemeId,
            });
          }}
          text={'Terms & Conditions'}
          textCustomTheme={{colors: {onSurface: COLORS.darkBlue}}}
        />
      </View>
    </Layout>
  );
};

export default SecondarySchemeSlab;
