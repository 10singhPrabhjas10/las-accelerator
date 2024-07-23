import {View, FlatList, StyleSheet} from 'react-native';
import React, {SetStateAction} from 'react';
import BeatCard from 'screens/beat/components/beatCard/BeatCard';
import {IStoreBeatPlanItem, StoreTab} from '../../StoreCheckIn.interface';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

interface IStoreCardProps {
  checkIn?: boolean;
  orderCard?: boolean;
  screenName?: string;
  date: string;
  data: IStoreBeatPlanItem[];
  setPageNumber: SetStateAction<any>;
  setOnEndReached: SetStateAction<any>;
  onEndReached: boolean;
  onCheckInPress: (item: IStoreBeatPlanItem) => void;
  onEditPress: (item: IStoreBeatPlanItem) => void;
}

const StoreCard = ({
  checkIn,
  screenName,
  data,
  setOnEndReached,
  setPageNumber,
  onEndReached,
  onCheckInPress,
  onEditPress,
  orderCard,
}: IStoreCardProps) => {
  const renderPlanCard = ({item}: {item: IStoreBeatPlanItem}) => {
    return (
      <BeatCard
        title={item?.title ?? ''}
        subTitle={item?.subTitle ?? ''}
        address={item?.address ?? ''}
        checkIn={checkIn}
        checkInDisabled={
          screenName === StoreTab.COMPLETED
            ? true
            : item?.checkInDate === null || item?.checkInDate === ''
            ? false
            : true
        }
        subActivity={item?.subActivity ?? null}
        orderCard={orderCard}
        orderTaken={item?.orderTaken}
        orderValue={item?.orderValue}
        screenName={screenName}
        geoLocation={item?.geoLocation ?? ''}
        onCheckInPress={() => {
          onCheckInPress(item);
        }}
        onEditPress={() => {
          onEditPress(item);
        }}
        mobileNumber={item?.mobileNumber}
        latitude={item?.userLatitude}
        longitude={item?.userLongitude}
      />
    );
  };

  return (
    <View style={styles.storeCardView}>
      {data?.length <= 0 && <EmptyContainer title="No Activity Found." />}
      <FlatList
        style={styles.flatListStyle}
        data={data}
        renderItem={renderPlanCard}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        initialNumToRender={10}
        onEndReached={() => {
          if (onEndReached) {
            setPageNumber((prev: number) => prev + 1);
            setOnEndReached(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(true)}
        onMomentumScrollEnd={() => setOnEndReached(false)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  flatListStyle: {marginBottom: 10},
  storeCardView: {
    marginHorizontal: 20,
    flex: 1,
  },
});
