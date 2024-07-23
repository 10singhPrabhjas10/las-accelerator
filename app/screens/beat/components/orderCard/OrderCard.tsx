import React, {SetStateAction, useState} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

import Spacer from 'components/spacer';
import CardWrapper from 'components/card/Card';
import RowItem from 'components/rowItem/RowItem';

import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import {IOrderCardData} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {DropdownItem} from 'screens/beat/StoreCheckIn/checkIn/CheckIn.interface';
import DropDown from 'components/beatDropdown/Dropdown';
import {getTranslationLabel} from 'utils/commonMethods';

interface OrderCardProps {
  showFooter?: boolean;
  data?: IOrderCardData;
  bottomInfo?: React.ReactNode;
  rightTitleStyle?: TextStyle;
  dropdownRequired?: boolean;
  dropdownData?: DropdownItem[];
  setDropdownValue?: SetStateAction<any>;
  title: string;
  leftValue: string;
  rightValue: string;
}

const OrderCard = ({
  showFooter = true,
  data,
  bottomInfo,
  rightTitleStyle,
  dropdownRequired,
  dropdownData,
  setDropdownValue,
  title,
  leftValue,
  rightValue,
}: OrderCardProps) => {
  const theme = {colors: {onSurface: COLORS.darkGreen2}};
  const [showDropdown, setShowDropdown] = useState(false);
  const [productCategory, setProductCategory] = useState('');

  return (
    <CardWrapper cardStyle={styles.container}>
      <Text style={styles.heading} variant="titleMedium">
        {title}
      </Text>
      {dropdownRequired && (
        <>
          <Spacer size={24} />
          <DropDown
            list={dropdownData ?? []}
            label={getTranslationLabel('product_category')}
            placeholder={getTranslationLabel('select_category')}
            // isDisabled={false}
            isRequired
            value={productCategory}
            visible={showDropdown}
            onChangeDropdownState={() => setShowDropdown(!showDropdown)}
            setValue={data => {
              setProductCategory(data);
              setDropdownValue(data);
            }}
          />
        </>
      )}
      <Spacer size={20} />
      <View style={CommonStyles.flexRow}>
        <View style={styles.rowSubContainer}>
          <Text variant="titleLarge" theme={theme}>
            {data?.leftTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={styles.textCenter}>
            {leftValue}
          </Text>
        </View>
        <Divider style={CommonStyles.verticalDivider} />
        <View style={styles.rowSubContainer}>
          <Text style={rightTitleStyle} variant="titleLarge" theme={theme}>
            {data?.rightTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={styles.textCenter}>
            {rightValue}
          </Text>
        </View>
      </View>
      <Spacer size={10} />
      {showFooter && (
        <>
          <Divider style={CommonStyles.horizontalDivider} />
          <RowItem
            keyContent={getTranslationLabel('last_order_date')}
            value={data?.orderDate ?? ''}
            showDivider={false}
          />
        </>
      )}
      {bottomInfo}
    </CardWrapper>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {padding: 5},
  creditLimitContainer: {alignItems: 'center'},
  rowSubContainer: {flex: 1, alignItems: 'center', paddingHorizontal: 10},
  textCenter: {textAlign: 'center'},
  heading: {textAlign: 'center'},
});
