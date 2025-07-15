import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import AddedLeadsFilter from './AddedLeadsFilter';

import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {getTranslationLabel} from 'utils/commonMethods';
import {COLORS} from '@/theme/colors';
import FilterButton from '@/components/button/FilterButton';
import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useAppSelector} from '../../../store/redux/store';

interface IFilterData {
  leadTypeFilter: string[];
  categoryFilter: string[];
}
const ViewAddedLeadsScreen = () => {
  const [filterData, setFilterData] = useState<IFilterData>({
    leadTypeFilter: [],
    categoryFilter: [],
  });

  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const leads = useAppSelector(state => state.newAddLead.leads);

  // Transform leads for DataCard
  const leadsData = leads.map(lead => [
    {title: 'Lead Name', text: lead.contactPersonName},
    {title: 'Lead Email-ID', text: lead.emailId},
    {title: 'Leads Mobile No.', text: lead.mobileNumber},
    {title: 'Category', text: lead.categoryId},
    {title: 'Lead Type', text: lead.leadType},
    {title: 'Pin Code', text: lead.pincode},
  ]);

  return (
    <Layout headerTitle={getTranslationLabel('view_added_leads')}>
      <FlatList
        data={leadsData}
        keyExtractor={(_, idx) => idx.toString()}
        style={CommonStyles.flatListMargin}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        ref={flatListRef}
        renderItem={({item, index}) => (
          <DataCard
            data={item}
            showViewDetailsButton
            buttonText="View Lead Details"
            detailsStyle={{borderColor: COLORS.dgreen}}
            detailTextStyle={{color: COLORS.dgreen}}
            onPressViewLeadDetails={() =>
              navigation.navigate('NewAddLeadScreen', { lead: leads[index] })
            }
            isExpandableButtonVisible={true}
          />
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        ref={bottomSheetModalRef}>
        <AddedLeadsFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default ViewAddedLeadsScreen;
