import {StyleSheet, View} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import CardWrapper from 'components/card/Card';
import {Divider, Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';
import {COLORS} from 'theme/colors';
import DropDown from 'components/dropdown/Dropdown';
import {DropdownItem} from 'screens/beat/StoreCheckIn/checkIn/CheckIn.interface';
import {getTranslationLabel} from 'utils/commonMethods';

interface ISalesCardProps {
  title: string;
  leftValue?: string;
  rightValue: string;
  data: {leftTitle?: string; rightTitle?: string; thirdTitle?: string};
  productDropdownRequired?: boolean;
  productDropdownData?: DropdownItem[];
  channelDropdownData?: DropdownItem[];
  setDropdownValue?: SetStateAction<any>;
  setChannelDropdownValue?: SetStateAction<any>;
  channelDropdownRequired?: boolean;
  leftCardRequired?: boolean;
  thirdCardRequired?: boolean;
  thirdValue?: string;
}

const SalesCard = ({
  title,
  leftValue,
  rightValue,
  data,
  productDropdownRequired,
  productDropdownData,
  channelDropdownData,
  setDropdownValue,
  channelDropdownRequired,
  setChannelDropdownValue,
  thirdValue,
  leftCardRequired = true,
  thirdCardRequired = false,
}: ISalesCardProps) => {
  const theme = {colors: {onSurface: COLORS.darkGreen2}};
  const [showDropdown, setShowDropdown] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [channelPartner, setChannelPartner] = useState('');
  return (
    <CardWrapper cardStyle={styles.container}>
      <Text style={CommonStyles.textAlignCenter} variant="titleMedium">
        {title}
      </Text>
      {productDropdownRequired && (
        <>
          <Spacer size={20} />
          <DropDown
            list={productDropdownData ?? []}
            label={'product_category'}
            placeholder={'select_category'}
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
      {channelDropdownRequired && (
        <>
          <Spacer size={20} />
          <DropDown
            list={channelDropdownData ?? []}
            label={'Channel Partner'}
            placeholder={'Select Partner'}
            isRequired
            value={channelPartner}
            visible={showChannelDropdown}
            onChangeDropdownState={() =>
              setShowChannelDropdown(!showChannelDropdown)
            }
            setValue={data => {
              setChannelPartner(data);
              setChannelDropdownValue(data);
            }}
          />
        </>
      )}
      <Spacer size={20} />
      <View style={CommonStyles.flexRow}>
        {leftCardRequired && (
          <>
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
          </>
        )}
        <View style={styles.rowSubContainer}>
          <Text variant="titleLarge" theme={theme}>
            {data?.rightTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={styles.textCenter}>
            {rightValue}
          </Text>
        </View>
        {thirdCardRequired && (
          <>
            <Divider style={CommonStyles.verticalDivider} />
            <View style={styles.rowSubContainer}>
              <Text variant="titleLarge" theme={theme}>
                {data?.thirdTitle}
              </Text>
              <Spacer size={5} />
              <Text variant="bodySmall" style={styles.textCenter}>
                {thirdValue}
              </Text>
            </View>
          </>
        )}
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {padding: 5},
  rowSubContainer: {flex: 1, alignItems: 'center', paddingHorizontal: 10},
  textCenter: {textAlign: 'center'},
  heading: {textAlign: 'center'},
});

export default SalesCard;
