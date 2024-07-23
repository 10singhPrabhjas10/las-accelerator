import React, {ReactNode} from 'react';
import Accordion from 'components/accordion/Accordion';
import {Text} from 'react-native-paper';
import SchemeCard from '../schemeCard/SchemeCard';
import DocumentIcon from '../../../../../../../../assets/icons/multipleFile.svg';
import Products from '../../../../../../../../assets/icons/inventoryIcon.svg';

import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

interface ISchemeAccordionProps {
  data: Record<string, any>;
  showFooterButton?: boolean;
  relationId: string;
}

interface ISchemeCardDataProps {
  id: number;
  title: string;
  text: string;
}

interface ISchemeAccordionDataProps {
  categoryId: string;
  secondarySchemeId: string;
  schemeName: string;
  category: string;
  accordionHeader: string | ReactNode;
  accordionCard: ISchemeCardDataProps[];
}

const footerButton = (
  categoryId: string,
  secondarySchemeId: string,
  schemeName: string,
  category: string,
  navigation: any,
  relationId: string,
) => {
  return [
    {
      title: 'View Scheme Details',
      icon: <DocumentIcon />,
      onButtonPress: () => {
        navigation.navigate('SecondarySchemeSlab', {
          secondarySchemeId,
          schemeName,
          category,
          relationId,
        });
      },
    },
    {
      title: 'Eligible Products',
      icon: <Products />,
      onButtonPress: () => {
        navigation.navigate('EligibleProducts', {
          categoryId,
          secondarySchemeId,
          relationId,
        });
      },
    },
  ];
};

const SchemeAccordionList = ({
  data,
  showFooterButton,
  relationId,
}: ISchemeAccordionProps) => {
  const navigation = useNavigation<RootNavigationProp>();

  const translations = useSelector(
    (state: RootState) => state?.localization?.translations,
  );

  return (
    <>
      {data?.map((scheme: ISchemeAccordionDataProps, index: number) => {
        return (
          <Accordion
            title={
              <Text variant="bodySmall" style={styles.accordionTitle}>
                {scheme.accordionHeader}
              </Text>
            }
            isExpanded={false}
            key={index + scheme.secondarySchemeId}>
            <SchemeCard
              data={scheme.accordionCard}
              footerButton={
                showFooterButton
                  ? footerButton(
                      scheme.categoryId,
                      scheme.secondarySchemeId,
                      scheme.schemeName,
                      scheme.category,
                      navigation,
                      relationId,
                    )
                  : []
              }
            />
          </Accordion>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  accordionTitle: {
    color: COLORS.darkYellow,
  },
});

export default SchemeAccordionList;
