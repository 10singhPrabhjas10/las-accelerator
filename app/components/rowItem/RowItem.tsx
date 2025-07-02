import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {convertNumberToRupees} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

interface IRowItem {
  keyContent?: string;
  value?: string | number;
  footer?: ReactNode;
  showDivider?: boolean;
  formatValueInRupees?: boolean;
  showExpenseStatusWithColor?: boolean;
}

const RowItem = (props: IRowItem) => {
  const {
    keyContent,
    value,
    footer,
    showDivider = true,
    formatValueInRupees = false,
    showExpenseStatusWithColor = false,
  } = props;
  const valueTheme = {colors: {onSurface: COLORS.grey2}};
  const keyContentTheme = {colors: {onSurface: COLORS.black}};
  const statusColorList = [
    {status: 'Approved', color: COLORS.darkGreen2},
    {status: 'Rejected', color: COLORS.red},
    {status: 'Pending Approval', color: COLORS.lightOrange2},
  ];
  const statusItem = statusColorList.find(item => item.status === value);
  const statusColor = statusItem ? statusItem.color : COLORS.white;

  return (
    <View>
      <View style={styles.listRowItemView}>
        <Text
          style={styles.keyContent}
          theme={keyContentTheme}
          variant="labelLarge">
          {keyContent}
        </Text>
        <View style={styles.listItemStatusRow}>
          {showExpenseStatusWithColor && (
            <View style={[styles.circle, {backgroundColor: statusColor}]} />
          )}
          <Text
            style={[styles.text, keyContent ? styles.rightAligned : null]}
            theme={valueTheme}
            variant="bodyMedium">
            {formatValueInRupees
              ? convertNumberToRupees(Number(value))
              : String(value)}
          </Text>
        </View>
      </View>
      {showDivider && <Divider style={CommonStyles.horizontalDivider} />}
      {footer}
    </View>
  );
};

export default RowItem;

const styles = StyleSheet.create({
  keyContent: {
    marginRight: 30,
  },
  text: {
    // flex: 1,
    textAlign: 'left',
  },
  rightAligned: {
    textAlign: 'right',
  },
  listRowItemView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: COLORS.green
  },
  listItemStatusRow: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
