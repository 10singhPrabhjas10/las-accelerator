import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {
  IMappedChannelPartnerReqBody,
  IMappedChannelPartnerResponse,
} from '../Profile.interface';
import {getMappedChannelPartnersData} from '../Profile.business';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {getTranslationLabel} from 'utils/commonMethods';

const MappedChannelPartnerScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [channelPartnerData, setChannelPartnerData] = useState<
    IMappedChannelPartnerResponse[]
  >([]);

  const getMappedChannelData = useCallback(() => {
    const requestBody: IMappedChannelPartnerReqBody = {
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
    };
    getMappedChannelPartnersData(
      requestBody,
      setChannelPartnerData,
      setTotalPages,
    );
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      getMappedChannelData();
    }
  }, [pageNumber]);

  return (
    <Layout
      style={CommonStyles.padding}
      headerTitle={getTranslationLabel('mapped_channel_partner')}>
      {channelPartnerData?.length <= 0 && (
        <EmptyContainer title={getTranslationLabel('no_channel_partner')} />
      )}
      <FlatList
        data={channelPartnerData}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        initialNumToRender={10}
        renderItem={({item, index}) => (
          <DataCard
            key={item?.code + index}
            data={[
              {
                title: getTranslationLabel('primary_cp_name'),
                text: item?.nameOfFirm ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('contact_person'),
                text:
                  [item?.contactPersonFirstName, item?.contactPersonLastName]
                    .filter(Boolean)
                    .join(' ') ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('contact_no'),
                text: item?.contactPersonMobileNo
                  ? `+91 ${item?.contactPersonMobileNo}`
                  : EMPTY_DATA_DASH,
              },
            ]}
            header={`${getTranslationLabel('primary_cp_code')}: ${item?.code}`}
            buttonText={getTranslationLabel('view_mapped_retailer')}
            showViewDetailsButton
            onPressViewLeadDetails={() => {
              navigation.navigate('MappedProfileRetailer', {
                code: item?.channelPartnerId,
              });
            }}
          />
        )}
      />
    </Layout>
  );
};

export default MappedChannelPartnerScreen;
