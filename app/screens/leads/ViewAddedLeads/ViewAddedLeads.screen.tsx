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

  // Sample data for multiple leads
  const leadsData = [
    [
      {title: 'Lead Name', text: 'Vijay Kumar'},
      {title: 'Lead Email-ID', text: 'vijayk@gmail.com'},
      {title: 'Leads Mobile No.', text: '+91 9869474566'},
      {title: 'Category', text: 'Water Heaters'},
      {title: 'Lead Type', text: 'Consumer'},
      {title: 'Pin Code', text: '400001'},
    ],
    [
      {title: 'Lead Name', text: 'Anjali Sharma'},
      {title: 'Lead Email-ID', text: 'anjali.s@gmail.com'},
      {title: 'Leads Mobile No.', text: '+91 9876543210'},
      {title: 'Category', text: 'Voltage Stabilisers'},
      {title: 'Lead Type', text: 'Institutional'},
      {title: 'Pin Code', text: '400002'},
    ],
    [
      {title: 'Lead Name', text: 'Rahul Mehta'},
      {title: 'Lead Email-ID', text: 'rahul.m@gmail.com'},
      {title: 'Leads Mobile No.', text: '+91 9123456789'},
      {title: 'Category', text: 'Electric Motors'},
      {title: 'Lead Type', text: 'Consumer'},
      {title: 'Pin Code', text: '400003'},
    ],
  ];

  return (
    <Layout headerTitle={getTranslationLabel('view_added_leads')}>
      <FlatList
        data={leadsData}
        keyExtractor={(_, idx) => idx.toString()}
        style={CommonStyles.flatListMargin}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        ref={flatListRef}
        renderItem={({item}) => (
          <DataCard
            data={item}
            showViewDetailsButton
            buttonText="View Lead Details"
            detailsStyle={{borderColor: COLORS.dgreen}}
            detailTextStyle={{color: COLORS.dgreen}}
            onPressViewLeadDetails={() =>
              navigation.navigate('NewAddLeadScreen')
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
