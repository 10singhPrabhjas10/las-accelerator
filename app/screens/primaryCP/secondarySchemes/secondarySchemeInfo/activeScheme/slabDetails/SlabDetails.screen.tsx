import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {getSchemeSlabDetailsData} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.business';
import {ITransformedSlabDetails} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.interface';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const SlabDetails = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'SlabDetails'>>();
  const {schemeId} = route.params;
  const [slabDetails, setSlabDetails] = useState<ITransformedSlabDetails[]>([]);

  const fetchSchemeSlabDetails = useCallback((id: string) => {
    getSchemeSlabDetailsData(id, setSlabDetails);
  }, []);

  useEffect(() => {
    fetchSchemeSlabDetails(schemeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemeId]);

  const renderEmptyComponent = () => <EmptyContainer title="No Slab Details" />;

  return (
    <Layout headerTitle="Slab Details" style={CommonStyles.padding}>
      <FlatList
        data={slabDetails}
        renderItem={({item}) => <DataCard data={item?.data} key={item?.id} />}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default SlabDetails;
