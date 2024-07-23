import CustomButton from 'components/button/CustomButton';
import {IRowDataProps} from 'components/dataCard/DataCard';
import RowItem from 'components/rowItem/RowItem';
import Spacer from 'components/spacer';
import React, {ReactNode, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Checkbox, Divider, Icon, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {ButtonTypes} from 'types/buttons';
import {getTranslationLabel} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

const AccordionDataCard = ({
  name,
  data,
  onClickCheckbox,
  item,
  checkedData = false,
  footer = false,
  icon,
  setShowModal,
  checkboxDisabled,
}: {
  name: string;
  data: any;
  onClickCheckbox: (data: any) => void;
  item?: any;
  checkedData?: boolean;
  footer?: boolean;
  icon?: ReactNode;
  setShowModal?: SetStateAction<any>;
  checkboxDisabled?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(item?.isChecked);
  }, [item?.isChecked]);

  const handlePress = () => setExpanded(!expanded);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.accordionHeader}>
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
            onClickCheckbox(item);
          }}
          disabled={checkboxDisabled}
        />
        <Text style={styles.accordionText} variant="titleMedium">
          {name}
        </Text>
        <View style={styles.icon}>
          <Icon
            source={!expanded ? 'chevron-down' : 'chevron-up'}
            size={25}
            color={COLORS.grey2}
          />
        </View>
      </View>
      {expanded && (
        <Divider style={[CommonStyles.horizontalDivider, styles.divider]} />
      )}
      {expanded &&
        data?.map((content: IRowDataProps, index: number) => (
          <RowItem
            keyContent={content.title}
            value={content.text}
            showDivider={index !== data?.length - 1}
          />
        ))}
      {expanded && footer && (
        <>
          <Spacer size={20} />
          <CustomButton
            type={ButtonTypes.outline}
            text={getTranslationLabel('add_recurrence')}
            icon={icon}
            onPress={() => {
              setShowModal(true, item);
            }}
            isDisabled={item?.isChecked || checkedData || !checked}
          />
        </>
      )}
      {expanded && <Spacer size={10} />}
    </TouchableOpacity>
  );
};

export default AccordionDataCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderColor: COLORS.lightGrey,
    margin: 3,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  accordionText: {
    color: COLORS.darkOrange,
    paddingLeft: 10,
    width: '78%',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'flex-end',
    flex: 1,
  },
  divider: {marginVertical: 12},
});
