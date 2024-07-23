/* eslint-disable react/no-unstable-nested-components */
import React, {memo} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {getTranslationLabel} from 'utils/commonMethods';

export const Dropdown = memo(
  ({dataSet, renderItem, isEmptyComponentVisible, ...props}: any) => {
    const borderWidth = dataSet.length > 0 ? 1 : 0;
    return (
      <View
        style={{
          ...styles.listContainer,
          ...props.suggestionsListContainerStyle,
          borderWidth: borderWidth,
        }}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={dataSet}
          style={styles.flatlistStyle}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() =>
            isEmptyComponentVisible && (
              <Text style={styles.noResultText}>
                {getTranslationLabel('no_result')}
              </Text>
            )
          }
          {...props.flatListProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  noResultText: {padding: 20, textAlignVertical: 'center'},
  listContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    zIndex: 9,
    borderRadius: 5,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    borderColor: COLORS.blue,
    borderWidth: 1,
    shadowOpacity: 0.3,
    shadowRadius: 15.46,

    elevation: 20,
  },
  flatlistStyle: {maxHeight: 200},
});
