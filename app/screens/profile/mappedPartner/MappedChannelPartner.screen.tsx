import {FlatList} from 'react-native';
import React, {useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {IMappedChannelPartnerResponse} from '../Profile.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {getTranslationLabel} from 'utils/commonMethods';
import ScreenHeader from '@/components/headers/ScreenHeader';
import SubHeader from '@/components/subHeader/subHeader';
import Spacer from '@/components/spacer';
import {Text} from 'react-native-paper';

const MappedChannelPartnerScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [channelPartnerData, setChannelPartnerData] = useState<
    IMappedChannelPartnerResponse[]
  >([
    {
      contactPerson: 'sdfsdf',
      contactPersonMobileNo: 90889890,
      nameOfFirm: 'fsdfdsf',
      channelPartnerId: 'f4234234',
      code: '78459',
      contactPersonFirstName: 'Vinod',
      contactPersonLastName: 'Rai',
    },
  ]);

  // const getMappedChannelData = useCallback(() => {
  //   const requestBody: IMappedChannelPartnerReqBody = {
  //     pagination: {
  //       page: pageNumber,
  //       pageSize: 10,
  //     },
  //   };
  //   getMappedChannelPartnersData(
  //     requestBody,
  //     setChannelPartnerData,
  //     setTotalPages,
  //   );
  // }, [pageNumber]);

  return (
    <Layout headerTitle="Mapped Channel Partner" isScrollable>
      {channelPartnerData?.length <= 0 && (
        <EmptyContainer title={getTranslationLabel('no_channel_partner')} />
      )}
      <SubHeader>
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
              shouldShowCardWrapper={false}
              key={item?.code + index}
              data={[
                {
                  title: getTranslationLabel('cp_code'),
                  text: item?.code ?? EMPTY_DATA_DASH,
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
              showViewDetailsButton={false}
            />
          )}
        />
      </SubHeader>
    </Layout>
  );
};

export default MappedChannelPartnerScreen;
