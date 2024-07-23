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

const PrimaryPartnerSearch = () => {
  const [selectedUserCode, setSelectedUserCode] = useState<string | null>();
  const navigation = useNavigation<RootNavigationProp>();

  const route =
    useRoute<RouteProp<RootNavigationTypes, 'PrimaryPartnerSearch'>>();
  const {fromOrderTaking} = route.params;

  const dispatch = useDispatch();
  const [primaryPartnerData, setPrimaryPartnerData] = useState<
    TAutocompleteDropdownItem[]
  >([]);

  const searchIcon = () => <SearchIcon height={20} width={20} />;

  const handleCustomerSearch = debounce((searchText: string) => {
    fetchChannelPrimarySearch(searchText, setPrimaryPartnerData);
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
        isDisabled={!selectedUserCode}
        onPress={async () => {
          fromOrderTaking
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
