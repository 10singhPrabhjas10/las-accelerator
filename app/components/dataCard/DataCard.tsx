import React, {ReactNode, useState} from 'react';
import {Button, Text} from 'react-native-paper';

import CustomButton from 'components/button/CustomButton';
import RowItem from 'components/rowItem/RowItem';
import CardWrapper from 'components/card/Card';
import Spacer from 'components/spacer';

import styles from './DataCard.style';
import {ButtonTypes} from 'types/buttons';
import ArrowUp from '../../../assets/icons/arrowUp.svg';
import ArrowDown from '../../../assets/icons/arrowDown.svg';
import {COLORS} from 'theme/colors';
import {TextStyle} from 'react-native';
import {getTranslationLabel} from 'utils/commonMethods';

export interface IRowDataProps {
  title: string;
  text: string | number;
  formatValueInRupees?: boolean;
  showStatusColor?: boolean;
}

interface IDataCardInterface {
  data?: IRowDataProps[];
  showViewDetailsButton?: boolean;
  header?: string;
  buttonIcon?: ReactNode;
  buttonText?: string;
  onPressViewLeadDetails?: () => void;
  isExpandableButtonVisible?: boolean;
  rows?: number;
  body?: ReactNode;
  footer?: ReactNode;
  headerStyle?: TextStyle;
  buttonDisabled?: boolean;
}

const DataCard = ({
  data,
  showViewDetailsButton = false,
  header = '',
  buttonIcon = null,
  buttonText,
  onPressViewLeadDetails = () => {},
  isExpandableButtonVisible = false,
  rows = 3,
  body,
  headerStyle,
  footer,
  buttonDisabled,
}: IDataCardInterface) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const showViewMoreButton =
    isExpandableButtonVisible && data && data.length > rows;
  const conditionalData =
    isExpandableButtonVisible && data && !expanded ? data.slice(0, rows) : data;

  const handleExpand = () => {
    setExpanded(prev => !prev);
  };

  const expandableIcon = () => (expanded ? <ArrowUp /> : <ArrowDown />);

  return (
    <CardWrapper>
      {header ? (
        <Text variant="labelLarge" style={[styles.header, headerStyle]}>
          {header}
        </Text>
      ) : null}
      {body}
      {conditionalData &&
        conditionalData.map((content: IRowDataProps, index: number) => (
          <RowItem
            key={content.title}
            keyContent={content.title}
            value={content.text}
            showDivider={index !== conditionalData.length - 1}
            formatValueInRupees={content?.formatValueInRupees ?? false}
            showExpenseStatusWithColor={content?.showStatusColor ?? false}
          />
        ))}
      {showViewDetailsButton && (
        <>
          <Spacer size={20} />
          <CustomButton
            type={ButtonTypes.outline}
            text={buttonText || getTranslationLabel('view_details')}
            icon={buttonIcon}
            onPress={onPressViewLeadDetails}
            isDisabled={buttonDisabled}
            style={styles.buttonStyle}
          />
        </>
      )}
      {showViewMoreButton ? (
        <Button
          mode="text"
          textColor={COLORS.darkOrange}
          onPress={handleExpand}
          contentStyle={styles.buttonContentStyle}
          icon={expandableIcon}>
          <Text
            theme={{colors: {onSurface: COLORS.darkOrange}}}
            variant="bodyMedium">
            {getTranslationLabel(expanded ? 'view_less' : 'view_more')}
          </Text>
        </Button>
      ) : null}
      {footer}
    </CardWrapper>
  );
};

export default DataCard;
