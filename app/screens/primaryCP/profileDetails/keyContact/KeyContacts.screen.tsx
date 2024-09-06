import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard} from 'react-native';

import Layout from 'components/Layout';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {getKeyContactsDetails} from 'screens/primaryCP/PrimaryChannelPartner.business';
import DataCard from 'components/dataCard/DataCard';

import CommonStyles from 'utils/commonStyle';

const KeyContacts = () => {
  const [keyContactDetails, setKeyContactDetails] = useState<
    IKeyContactResponse[]
  >([
    {
      name: 'avc',
      data: [{title: 'dsfsdf', text: '2000', formatValueInRupees: true}],
    },
  ]);

  useEffect(() => {
    getKeyContactsDetails(setKeyContactDetails);
  }, []);

  const renderEmptyComponent = () => (
    <EmptyContainer title="You do not have any key Contacts" />
  );

  return (
    <Layout
      isScrollable
      headerTitle="Key Contacts"
      style={CommonStyles.padding}>
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        onScrollBeginDrag={Keyboard.dismiss}
        data={keyContactDetails}
        renderItem={({item}) => (
          <DataCard data={item.data} header={item.name} />
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </Layout>
  );
};

export default KeyContacts;
