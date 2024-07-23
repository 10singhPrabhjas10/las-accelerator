/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from './Dropdown';
import {ScrollViewListItem} from './ScrollViewListItem';
import {useContext} from 'react';
import {AutocompleteDropdownContext} from './AutocompleteDropdownContext';
import {Text, TextInput} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {
  AutocompleteDropdownProps,
  TAutocompleteDropdownItem,
} from './AutocompleteDropdown.interface';
import {debounce} from 'utils/commonMethods';

export const AutocompleteDropdown = forwardRef(
  (props: AutocompleteDropdownProps, ref) => {
    const inputRef = useRef<any>(null);
    const containerRef = useRef<any>(null);
    const [selectedItem, setSelectedItem] = useState<
      TAutocompleteDropdownItem | undefined
    >();
    const [isOpened, setIsOpened] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [dataSet, setDataSet] = useState(props.dataSet);
    const clearOnFocus = props.clearOnFocus === false ? false : true;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const {
      content,
      setContent,
      activeInputRef,
      direction = props.direction,
      setDirection,
    } = useContext(AutocompleteDropdownContext);

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', e =>
        setKeyboardHeight(e.endCoordinates.height),
      );
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
        setKeyboardHeight(0),
      );
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, [setKeyboardHeight]);

    useLayoutEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [inputRef, ref]);

    /** Set initial value */
    useEffect(() => {
      if (!Array.isArray(dataSet) || selectedItem) {
        // nothing to set or already settled
        return;
      }

      let dataSetItem = dataSet.find(
        el =>
          el.title === props.initialValue ||
          (el.subTitle && el.subTitle === props.initialValue),
      );

      if (dataSetItem) {
        setSelectedItem(dataSetItem);
      }
    }, [dataSet]);

    useEffect(() => {
      if (selectedItem) {
        setSearchText(selectedItem.title ?? '');
      } else {
        setSearchText('');
      }

      if (typeof props.onSelectItem === 'function') {
        props.onSelectItem(selectedItem);
      }
    }, [selectedItem]);

    useEffect(() => {
      if (typeof props.onOpenSuggestionsList === 'function') {
        props.onOpenSuggestionsList(isOpened);
      }
      if (!isOpened && selectedItem && selectedItem.title) {
        setSearchText(selectedItem.title);
      }
    }, [isOpened]);

    const _onSelectItem = useCallback(
      (item: React.SetStateAction<TAutocompleteDropdownItem | undefined>) => {
        setSelectedItem(item);
        inputRef.current?.blur();
        setIsOpened(false);
      },
      [],
    );

    const calculateDirection = useCallback(async () => {
      const [, positionY]: any = await new Promise(resolve =>
        containerRef.current?.measureInWindow((...rect: any) => {
          resolve(rect);
        }),
      );

      const screenHeight = Dimensions.get('window').height;
      setDirection(
        (screenHeight - keyboardHeight) / 2 > positionY ? 'down' : 'up',
      );
      return new Promise<void>(resolve => {
        setTimeout(() => {
          return resolve();
        }, 1);
      });
    }, [keyboardHeight, setDirection]);

    /** methods */
    const close = () => {
      setIsOpened(false);
      setDirection(props.direction);
      setContent(undefined);
    };

    useEffect(() => {
      setDataSet(props.dataSet);
    }, [props.dataSet]);

    useEffect(() => {
      if (!searchText?.length) {
        setDataSet(props.dataSet);
        return;
      }

      if (!Array.isArray(props.dataSet)) {
        return;
      }

      let findWhat = searchText.toLowerCase();
      const newSet = props.dataSet.filter(item => {
        const findTitle = item?.title?.toLowerCase();
        const findSubtitle = item?.subTitle?.toLowerCase();
        return (
          (typeof item.title === 'string' &&
            findTitle?.indexOf(findWhat) !== -1) ||
          findSubtitle?.indexOf(findWhat) !== -1
        );
      });

      setDataSet(newSet);
    }, [searchText, props.dataSet]);

    const renderItem = useCallback(
      ({item}: any) => {
        if (typeof props.renderItem === 'function') {
          const EL = props.renderItem(item, searchText);
          return (
            <TouchableOpacity onPress={() => _onSelectItem(item)}>
              {EL}
            </TouchableOpacity>
          );
        }

        return (
          <ScrollViewListItem
            key={item.id}
            title={item?.title}
            subTitle={item?.subTitle}
            highlight={searchText}
            style={props.suggestionsListTextStyle}
            onPress={() => _onSelectItem(item)}
          />
        );
      },
      [props.renderItem, searchText, props.suggestionsListTextStyle],
    );

    const debouncedEvent = useCallback(
      debounce(text => {
        if (typeof props.onChangeText === 'function') {
          props.onChangeText(text);
        }
      }, 0),
      [props.onChangeText],
    );

    const onChangeText = useCallback(
      (text: string) => {
        setSearchText(text);
        debouncedEvent(text);
      },
      [debouncedEvent],
    );

    const onFocus = useCallback(
      async (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (clearOnFocus) {
          setSearchText('');
        }
        if (typeof props.onFocus === 'function') {
          props.onFocus(e);
        }
        if (props.direction) {
          setDirection(props.direction);
        } else {
          await calculateDirection();
        }

        setTimeout(() => {
          setIsOpened(true);
        }, 0);
      },
      [dataSet, clearOnFocus, props.onFocus],
    );

    const onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (props.closeOnBlur) {
          close();
        }
        if (typeof props.onBlur === 'function') {
          props.onBlur(e);
        }
      },
      [props.closeOnBlur, props.onBlur],
    );

    const onSubmit = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        inputRef.current.blur();
        if (props.closeOnSubmit) {
          close();
        }

        if (typeof props.onSubmit === 'function') {
          props.onSubmit(e);
        }
      },
      [props.closeOnSubmit, props.onSubmit, close],
    );

    useEffect(() => {
      if (!content || props.loading) {
        setIsOpened(false);
      }
    }, [content]);

    useEffect(() => {
      if (dataSet && inputRef.current?.isFocused()) {
        setIsOpened(true);
      }
    }, [dataSet, selectedItem]);

    useEffect(() => {
      if (isOpened && Array.isArray(dataSet)) {
        if (activeInputRef) {
          activeInputRef.current = containerRef.current;
        }

        const isEmptyComponentVisible = searchText.length > 2;

        setContent(
          <Dropdown
            {...{
              ...props,
              direction,
              dataSet,
              renderItem,
              isEmptyComponentVisible,
            }}
          />,
        );
      } else {
        setContent(undefined);
      }
    }, [
      isOpened,
      dataSet,
      props,
      direction,
      renderItem,
      activeInputRef,
      setContent,
    ]);

    const theme = {
      colors: {
        background: props.isDisabled ? COLORS.lightGrey2 : COLORS.white,
        primary: COLORS.blue,
        onSurface: props.isDisabled ? COLORS.grey2 : COLORS.black,
      },
    };

    const errorTheme = {colors: {onSurface: COLORS.red}};

    return (
      <View ref={containerRef} onLayout={_ => {}} style={props.style}>
        {props.titleText && (
          <View style={styles.titleView}>
            <Text variant="bodyMedium">{props.titleText}</Text>
            {props.isRequired && (
              <Text variant="labelMedium" style={styles.requiredText}>
                {' *'}
              </Text>
            )}
          </View>
        )}
        <TextInput
          placeholder={props.placeholder}
          ref={inputRef}
          mode="outlined"
          value={searchText}
          style={styles.textInputView}
          theme={theme}
          onChangeText={onChangeText}
          autoCorrect={false}
          onBlur={onBlur}
          onFocus={onFocus}
          right={props.icon}
          disabled={props.isDisabled}
          onSubmitEditing={onSubmit}
        />
        {props.errorText ? (
          <Text variant="bodyMedium" theme={errorTheme}>
            {props.errorText}
          </Text>
        ) : null}
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textInputView: {
    lineHeight: Platform.OS === 'android' ? 30 : 0,
  },
  requiredText: {color: COLORS.red},
});
