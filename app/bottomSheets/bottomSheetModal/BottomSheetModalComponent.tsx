//External Dependencies
import {View} from 'react-native';
import React, {
  ReactNode,
  forwardRef,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
} from 'react';
import {Text} from 'react-native-paper';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

// Styles, constants and Interfaces
import styles from './BottomSheetModalComponent.style';
import CommonStyles from 'utils/commonStyle';
import CloseIcon from '../../../assets/icons/closeIcon.svg';
import {getTranslationLabel} from 'utils/commonMethods';

interface IBottomSheetModalComponentProps {
  children: ReactNode;
  minHeight?: string | number;
  maxHeight?: string | number;
  isFilter?: boolean;
}

const BottomSheetModalComponent = forwardRef<
  BottomSheetModal,
  IBottomSheetModalComponentProps
>((props, ref) => {
  const {
    children,
    minHeight = '25%',
    maxHeight = '25%',
    isFilter = false,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    () => [minHeight, maxHeight],
    [maxHeight, minHeight],
  );

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        style={CommonStyles.overlay}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    close: () => bottomSheetModalRef.current?.close(),
    expand: () => bottomSheetModalRef.current?.expand(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
    snapToIndex: (index: number) =>
      bottomSheetModalRef.current?.snapToIndex(index),
    snapToPosition: (position: number | string) =>
      bottomSheetModalRef.current?.snapToPosition(position),
    collapse: () => bottomSheetModalRef.current?.collapse(),
    forceClose: () => bottomSheetModalRef.current?.forceClose(),
  }));

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={!isFilter}>
        {isFilter && (
          <View style={styles.headerContainer}>
            <Text variant="titleLarge">{'filters  '}</Text>
            <CloseIcon
              height={20}
              width={20}
              onPress={() => bottomSheetModalRef.current?.close()}
            />
          </View>
        )}
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
export default BottomSheetModalComponent;
