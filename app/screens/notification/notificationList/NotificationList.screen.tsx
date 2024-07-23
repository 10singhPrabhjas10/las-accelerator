/* eslint-disable react-hooks/exhaustive-deps */
// External Dependencies
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Chip, Divider} from 'react-native-paper';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// Internal Dependencies
import Layout from 'components/Layout';
import NotificationTile from '../component/notificationTile/NotificationTile';
import NotificationFilter from '../component/notificationFilter/NotificationFilter';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {RootState} from 'store/redux/store';
import {getNotificationList} from './NotificationList.business';

// Styles, constants and Interfaces
import FilterIcon from '../../../../assets/icons/filter.svg';
import {
  IFilterChip,
  IFiltersRequest,
  INotificationList,
} from './NotificationList.interface';
import ChatBubble from '../../../../assets/icons/chatBubble.svg';
import CommonStyles from 'utils/commonStyle';
import {RootNavigationProp} from 'routes/RootNavigation';
import useLanguageSelection from 'hooks/useLanguageSelection';
import {COLORS} from 'theme/colors';
import {updateTabIndex} from 'store/redux/modalSlice';

const SeparatorComponent = () => <Divider />;

const NotificationList = () => {
  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const [notificationList, setNotificationList] = useState<INotificationList[]>(
    [],
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [filter, setFilter] = useState<IFiltersRequest>({
    date: null,
    isOpened: null,
    notificationType: [],
  });
  const [filterChip, setFilterChip] = useState<IFilterChip[]>([
    {
      key: 'all',
      title: useLanguageSelection('all').label,
      isSelected: true,
    },
    {
      key: 'read',
      title: useLanguageSelection('read').label,
      isOpened: true,
      isSelected: false,
    },
    {
      key: 'unread',
      title: useLanguageSelection('unread').label,
      isOpened: false,
      isSelected: false,
    },
  ]);
  const [notificationStatus, setNotificationStatus] = useState<boolean>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<RootNavigationProp>();

  const translations = useSelector(
    (state: RootState) => state?.localization?.translations,
  );

  const getTitles = (key: string) => {
    let label = '';
    translations?.forEach((element: any) => {
      if (element.key === key) {
        label = element?.label;
      }
    });
    return label;
  };

  const handleChipData = (key: string, isOpened?: boolean) => {
    setNotificationList([]);
    setIsFilterApplied(true);
    setFilterChip(prevFilterChip =>
      prevFilterChip.map(chip => {
        return {...chip, isSelected: chip.key === key};
      }),
    );
    setNotificationStatus(isOpened);
  };

  const getNotification = useCallback(() => {
    const requestBody = {
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
      filters: {
        ...filter,
        isOpened: notificationStatus ?? null,
      },
    };
    getNotificationList(setNotificationList, setPageCount, requestBody);
    setIsFilterApplied(false);
  }, [notificationList, filter]);

  const handleApplyFilters = () => {
    setNotificationList([]);
    setPageNumber(1);
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
  };
  useEffect(() => {
    if (pageNumber <= pageCount && isFilterApplied) {
      getNotification();
    }
  }, [notificationStatus, pageNumber, isFilterApplied]);

  const dispatch = useDispatch();

  return (
    <Layout
      headerTitle={useLanguageSelection('notifications').label}
      onBackPress={() => {
        dispatch(updateTabIndex(0));
        navigation.navigate('TabNavigator');
      }}
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <View style={styles.chipContainer}>
          {filterChip?.map(chipData => {
            return (
              <Chip
                key={chipData.key}
                mode="outlined"
                selected={chipData.isSelected}
                style={chipData.isSelected && styles.selectedChip}
                textStyle={styles.chipText}
                showSelectedCheck={false}
                onPress={() => handleChipData(chipData.key, chipData.isOpened)}>
                {chipData.title}
              </Chip>
            );
          })}
          <TouchableOpacity
            style={styles.filterIcon}
            activeOpacity={0.5}
            onPress={() => bottomSheetModalRef.current?.present()}>
            <FilterIcon height={20} width={20} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notificationList}
          renderItem={({item}) => (
            <NotificationTile key={item.id} props={item} />
          )}
          initialNumToRender={10}
          onEndReached={() => {
            if (!onEndReached) {
              setPageNumber(prev => prev + 1);
              setOnEndReached(true);
            }
          }}
          onMomentumScrollBegin={() => setOnEndReached(false)}
          onEndReachedThreshold={0.7}
          contentContainerStyle={CommonStyles.flexGrow}
          ListEmptyComponent={
            isLoading ? null : (
              <View style={[CommonStyles.flexOne, CommonStyles.center]}>
                <EmptyContainer
                  title={getTitles('no_notifications')}
                  icon={<ChatBubble />}
                />
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={SeparatorComponent}
        />
      </View>
      <BottomSheetModalComponent
        maxHeight={'77%'}
        minHeight={'77%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <NotificationFilter
          filterData={filter}
          setFilterData={setFilter}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  chipContainer: {flexDirection: 'row', gap: 10},
  selectedChip: {backgroundColor: COLORS.lightYellow},
  filterIcon: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    margin: 2,
  },
  chipText: {color: COLORS.black},
});
