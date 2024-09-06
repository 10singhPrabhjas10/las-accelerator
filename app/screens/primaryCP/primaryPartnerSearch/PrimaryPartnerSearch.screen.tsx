import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';

import Layout from 'components/Layout';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import CustomButton from 'components/button/CustomButton';
import {fetchChannelPrimarySearch} from '../PrimaryChannelPartner.business';
import {TAutocompleteDropdownItem} from 'components/auto-complete/AutocompleteDropdown.interface';
import {debounce} from 'utils/commonMethods';

import {ButtonTypes} from 'types/buttons';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {useDispatch} from 'react-redux';
import {
  setChannelPartnerId,
  setCustomerCode,
} from 'store/redux/channelPartnerSlice';
import {NavigationFrom} from 'utils/Constants';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
// import {ChannelPartnerData} from '../../../utils/dummyData';
// import {ChannelPartnerData} from 'utils/dummyData';

const PrimaryPartnerSearch = () => {
  const [selectedUserCode, setSelectedUserCode] = useState<string | null>();
  const navigation = useNavigation<RootNavigationProp>();
  const ChannelPartnerData = [
    {
      nameOfFirm: 'A. S. A. ASSOCIATES',
      code: '6546363',
      channelPartnerId: 'gdsfgsgs',
    },
    {
      nameOfFirm: 'ALTIUS BUSINESS CORPORATION.',
      code: '456456456',
      channelPartnerId: 'dgfdfg',
    },
    {
      nameOfFirm: 'PEGASUS ASSOCIATES',
      code: '65464564',
      channelPartnerId: 'gdfgd3453',
    },
    {
      nameOfFirm: 'RAMDEV METAL MART',
      code: '4353453',
      channelPartnerId: 'fsdfs',
    },
    {
      nameOfFirm: 'Deloitte',
      code: '52345245',
      channelPartnerId: 'fdsfs',
    },
    {
      nameOfFirm: 'ANJALI AGENCIES',
      code: '34525234',
      channelPartnerId: 'fsdf',
    },
  ];
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'PrimaryPartnerSearch'>>();
  const {fromOrderTaking} = route.params;

  const dispatch = useDispatch();
  const [primaryPartnerData, setPrimaryPartnerData] = useState<
    TAutocompleteDropdownItem[]
  >([]);

  const searchIcon = () => <SearchIcon height={20} width={20} />;

  // const handleCustomerSearch = debounce((searchText: string) => {
  //   // fetchChannelPrimarySearch(searchText, setPrimaryPartnerData);
  // }, 1000);

  const handleCustomerSearch = debounce((searchText: string) => {
    if (!searchText) {
      // If no search text, show all data
      setPrimaryPartnerData(primaryPartnerData);
      return;
    }

    // Convert search text to lowercase for case-insensitive matching
    const searchLower = searchText.toLowerCase();

    // Filter the data based on search text
    const filteredData = ChannelPartnerData.filter(
      item =>
        item.nameOfFirm.toLowerCase().includes(searchLower) ||
        item.code.includes(searchText),
    );

    const transformedArray = filteredData.map(item => ({
      id: item.channelPartnerId,
      title: item.nameOfFirm,
    }));

    // Update the filtered data
    setPrimaryPartnerData(transformedArray);
  }, 1000);

  useEffect(() => {
    dispatch(setCustomerCode(selectedUserCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserCode]);

  return (
    <Layout
      headerTitle={'Primary Channel Partner'}
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <AutocompleteDropdown
          titleText={'Primary Customer Name & Code'}
          placeholder="Enter Name or Code"
          isRequired
          dataSet={primaryPartnerData}
          onChangeText={handleCustomerSearch}
          onSelectItem={(data: any) => {
            setSelectedUserCode(data?.channelPartnerId);
            dispatch(setChannelPartnerId(data?.code)); //TODO: replace code with id in above function
          }}
          icon={<TextInput.Icon icon={searchIcon} />}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
        />
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text={'Submit'}
        isDisabled={false}
        onPress={async () => {
          false
            ? navigation.navigate('OrderTask', {
                navigationFrom: NavigationFrom.PRIMARY_CP,
                relation: Relation.PRIMARY_CHANNEL_PARTNER,
              })
            : navigation.navigate('PrimaryChannelPartner');
        }}
      />
    </Layout>
  );
};
export default PrimaryPartnerSearch;
