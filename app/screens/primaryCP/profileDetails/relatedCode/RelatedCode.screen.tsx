/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import RelatedCodeFilter from '../components/RelatedCodeFilter';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import FilterButton from 'components/button/FilterButton';
import CustomButton from 'components/button/CustomButton';
import {getRelatedCodeListData} from 'screens/primaryCP/PrimaryChannelPartner.business';
import DataCard from 'components/dataCard/DataCard';

import {callNumber} from 'utils/commonMethods';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';
import CallingIcon from '../../../../../assets/icons/callingIcon.svg';
import {RootNavigationProp} from 'routes/RootNavigation';
import {ID_ALL, PAGE_SIZE} from 'utils/Constants';
import {RootState} from 'store/redux/store';

const RelatedCode = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [relatedCodeData, setRelatedCodeData] = useState<IRelatedCodesData[]>(
    [],
  );
  const [filterData, setFilterData] = useState<IRelatedCodeFilters>({
    productDivision: [],
    relationship: [],
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const callBtnIcon = () => <CallingIcon height={14} width={14} />;

  const getRelatedCodesData = useCallback(
    (appliedFilters: IRelatedCodeFilters) => {
      const requestBody = {
        pagination: {
          page: pageNumber,
          pageSize: PAGE_SIZE.RelatedCodes,
        },
        filters: {
          productDivision: [
            ...appliedFilters.productDivision.filter(item => item !== ID_ALL),
          ],
          relationship: [
            ...appliedFilters.relationship.filter(item => item !== ID_ALL),
          ],
        },
      };
      getRelatedCodeListData(requestBody, setRelatedCodeData, setTotalPages);
      setIsFilterApplied(false);
    },
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getRelatedCodesData(filterData);
    }
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setRelatedCodeData([]);
    setPageNumber(1);
    setIsFilterApplied(true);
  };

  const renderListItem = ({item}: {item: IRelatedCodesData}) => {
    return (
      <DataCard
        data={item.data}
        header={'Customer Code: ' + item.code}
        footer={
          <>
            <Spacer size={20} />
            <CustomButton
              icon={callBtnIcon()}
              type={ButtonTypes.outline}
              text={'Call Contact Person'}
              onPress={() => callNumber(item.phoneNo)}
            />
            <Spacer size={15} />
            <CustomButton
              type={ButtonTypes.outline}
              text={'View Details'}
              onPress={() =>
                navigation.navigate('RelatedCodesCardDetails', {
                  channelPartnerCode: item?.channelPartnerCode,
                })
              }
            />
          </>
        }
      />
    );
  };

  return (
    <Layout headerTitle={'Related Codes'}>
      <FlatList
        data={relatedCodeData}
        renderItem={renderListItem}
        keyExtractor={item => `tile_${item.code}`}
        contentContainerStyle={CommonStyles.padding}
        initialNumToRender={PAGE_SIZE.RelatedCodes}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
            setIsFilterApplied(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(false)}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={
          isLoading ? null : (
            <EmptyContainer title="You do not have any Related Codes" />
          )
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        ref={bottomSheetModalRef}
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter>
        <RelatedCodeFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default RelatedCode;
