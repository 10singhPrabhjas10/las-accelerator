import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import {TextInput} from 'react-native-paper';
import SearchIcon from '../../../../../../assets/icons/searchIcon.svg';
import {TAutocompleteDropdownItem} from 'components/auto-complete/AutocompleteDropdown.interface';
import {debounce} from 'utils/commonMethods';
import DataCard from 'components/dataCard/DataCard';
import Spacer from 'components/spacer';
import {
  getRetailersEligibleData,
  getRetailersEligibleDetails,
  getRetailersEligiblePerformanceDetails,
} from '../../SecondaryScheme.business';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {
  ITransformedRetailer,
  NavigationFrom,
} from '../../SecondaryScheme.interface';

const RetailerEligibility = () => {
  const searchIcon = () => <SearchIcon height={20} width={20} />;
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'RetailerEligibility'>>();
  const {schemeId, navigationFrom} = route.params;
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const [channelPartnerId, setChannelPartnerId] = useState('');
  const [retailerData, setRetailerData] = useState<TAutocompleteDropdownItem[]>(
    [],
  );
  const [retailerDetails, setRetailerDetails] =
    useState<ITransformedRetailer>();

  const handleCustomerSearch = debounce((searchText: string) => {
    getRetailersEligibleData(
      searchText,
      schemeId,
      customerCode,
      setRetailerData,
    );
  }, 1000);

  useEffect(() => {
    if (
      navigationFrom === NavigationFrom.SCHEME_INFORMATION &&
      channelPartnerId
    ) {
      getRetailersEligibleDetails(channelPartnerId, setRetailerDetails);
    } else if (
      navigationFrom === NavigationFrom.SCHEME_PERFORMANCE &&
      channelPartnerId
    ) {
      getRetailersEligiblePerformanceDetails(
        channelPartnerId,
        schemeId,
        setRetailerDetails,
      );
    }
  }, [navigationFrom, channelPartnerId]);

  return (
    <Layout headerTitle="Retailer Eligibility" style={CommonStyles.padding}>
      <AutocompleteDropdown
        titleText={'Retailer Name & Mobile No.'}
        placeholder="Enter Name or Code"
        dataSet={retailerData}
        onChangeText={handleCustomerSearch}
        icon={<TextInput.Icon icon={searchIcon} />}
        onSelectItem={(data: any) => {
          setChannelPartnerId(data?.channelPartnerId);
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
      />
      <Spacer size={20} />
      {retailerDetails?.data && (
        <DataCard
          data={retailerDetails?.data}
          isExpandableButtonVisible
          header={retailerDetails?.header}
        />
      )}
    </Layout>
  );
};

export default RetailerEligibility;
