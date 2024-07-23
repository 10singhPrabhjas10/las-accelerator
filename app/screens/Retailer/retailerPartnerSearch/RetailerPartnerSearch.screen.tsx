import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import {debounce} from 'utils/commonMethods';
import {TextInput} from 'react-native-paper';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  fetchChannelSecondarySearch,
  getSecondaryCustomerDetails,
} from '../Retailer.business';
import {TAutocompleteDropdownItem} from 'components/auto-complete/AutocompleteDropdown.interface';
import {useDispatch} from 'react-redux';
import {setRetailerCustomerCode} from 'store/redux/channelPartnerSlice';
import {NavigationFrom} from 'utils/Constants';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';

const RetailerPartnerSearchScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useDispatch();
  const [retailerData, setRetailerData] = useState<TAutocompleteDropdownItem[]>(
    [],
  );

  const route =
    useRoute<RouteProp<RootNavigationTypes, 'RetailerPartnerSearch'>>();
  const {fromOrderTaking} = route.params;

  const [selectedUserCode, setSelectedUserCode] = useState<string | null>();
  const searchIcon = () => <SearchIcon height={20} width={20} />;

  const handleCustomerSearch = debounce((searchText: string) => {
    fetchChannelSecondarySearch(searchText, setRetailerData);
  }, 1000);

  useEffect(() => {
    dispatch(setRetailerCustomerCode(selectedUserCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserCode]);

  useEffect(() => {
    if (fromOrderTaking && selectedUserCode !== '') {
      selectedUserCode &&
        getSecondaryCustomerDetails(selectedUserCode, undefined);
    }
  }, [fromOrderTaking, selectedUserCode]);

  return (
    <Layout headerTitle="Retailer" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <AutocompleteDropdown
          titleText={'Retailer Name & ID'}
          placeholder="Enter Name or ID"
          dataSet={retailerData}
          onChangeText={handleCustomerSearch}
          onSelectItem={(data: any) =>
            setSelectedUserCode(data?.channelPartnerId)
          }
          icon={<TextInput.Icon icon={searchIcon} />}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
        />
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text={'Submit'}
        isDisabled={selectedUserCode === '' || selectedUserCode === undefined}
        onPress={() => {
          fromOrderTaking
            ? navigation.navigate('OrderTask', {
                navigationFrom: NavigationFrom.SECONDARY_CP,
                relation: Relation.SECONDARY_CHANNEL_PARTNER,
              })
            : navigation.navigate('SecondaryChannelPartner');
        }}
      />
    </Layout>
  );
};

export default RetailerPartnerSearchScreen;
