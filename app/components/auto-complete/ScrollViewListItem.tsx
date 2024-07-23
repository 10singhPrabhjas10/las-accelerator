import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

export const ScrollViewListItem = memo(
  ({highlight, title, subTitle, style, onPress}: any) => {
    const titleParts = useMemo(() => {
      let titleHighlighted = '';
      let titleStart = title;
      let titleEnd = '';

      if (
        typeof title === 'string' &&
        title?.length > 0 &&
        highlight?.length > 0
      ) {
        const highlightIn = title?.toLowerCase();
        const highlightWhat = highlight?.toLowerCase();

        const substrIndex = highlightIn?.indexOf(highlightWhat);
        if (substrIndex !== -1) {
          titleStart = title?.slice(0, substrIndex);
          titleHighlighted = title?.slice(
            substrIndex,
            substrIndex + highlight?.length,
          );
          titleEnd = title?.slice(substrIndex + highlight?.length);
        }
      }

      return {titleHighlighted, titleStart, titleEnd};
    }, [title, highlight]);

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text ellipsizeMode="tail">
            <Text numberOfLines={1} style={{...styles.text, ...style}}>
              {titleParts.titleStart}
            </Text>
            <Text
              numberOfLines={1}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{...styles.text, ...style, fontWeight: 'bold'}}>
              {titleParts.titleHighlighted}
            </Text>
            <Text numberOfLines={1} style={{...styles.text, ...style}}>
              {titleParts.titleEnd}
            </Text>
          </Text>
          {subTitle ? <Text>{subTitle}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',

    width: '100%',
  },
  text: {
    color: '#333',
    fontSize: 16,
    flexGrow: 1,
    flexShrink: 0,
  },
});
