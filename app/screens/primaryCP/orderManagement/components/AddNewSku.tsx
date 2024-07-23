import {View} from 'react-native';
import React, {useState} from 'react';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import AddIcon from './../../../../../assets/icons/addIcon.svg';
import SearchIcon from './../../../../../assets/icons/searchIcon.svg';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import {debounce} from 'utils/commonMethods';
import {Divider, TextInput} from 'react-native-paper';
import {getProductSkuData} from '../OrderManagement.business';

interface IAutocompleteDropdownItem {
  id: string | number;
  title: string | null;
  subTitle?: string | null;
  materialCode: string;
  uom: string;
}

const AddNewSku = ({
  handleAddNewSku,
  handleAddNewSkuDone,
  isLastIndex,
  componentIndex,
  productCategory,
}: IAddNewSku) => {
  const [quantity, setQuantity] = useState('');
  const [skuSearchData, setSkuSearchData] = useState<
    IAutocompleteDropdownItem[]
  >([]);
  const [selectedSku, setSelectedSku] = useState<IAutocompleteDropdownItem>();
  const [errors, setErrors] = useState({
    sku: '',
    quantity: '',
  });
  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  const searchIcon = () => <SearchIcon height={20} width={20} />;

  const handleSkuSearch = debounce((searchText: string) => {
    getProductSkuData(productCategory, searchText, setSkuSearchData);
  }, 1000);

  const handleSubmit = (isDone: boolean) => {
    if (selectedSku && selectedSku?.id && quantity.length > 0) {
      if (isDone) {
        handleAddNewSkuDone({
          sku: String(selectedSku.id),
          quantity,
          materialCode: selectedSku?.materialCode,
          uom: selectedSku?.uom,
        });
        setDisableButtons(true);
      } else {
        handleAddNewSku({
          sku: String(selectedSku.id),
          quantity,
          materialCode: selectedSku?.materialCode,
          uom: selectedSku?.uom,
        });
      }
    } else {
      if (!selectedSku) {
        setErrors(prev => ({...prev, sku: 'Enter SKU Name'}));
      }
      if (!quantity?.length) {
        setErrors(prev => ({
          ...prev,
          quantity: 'Enter Quantity',
        }));
      }
    }
  };

  return (
    <View>
      <AutocompleteDropdown
        titleText={`SKU ${componentIndex}`}
        placeholder="Enter SKU Name"
        dataSet={skuSearchData}
        onChangeText={(value: string) => {
          if (value.length > 2) {
            handleSkuSearch(value);
          }
        }}
        onSelectItem={data => setSelectedSku(data as IAutocompleteDropdownItem)}
        icon={<TextInput.Icon icon={searchIcon} />}
        clearOnFocus={false}
        isRequired
        closeOnBlur={true}
        closeOnSubmit={false}
        isDisabled={!isLastIndex || disableButtons}
        errorText={errors.sku}
      />
      <Spacer size={10} />
      <PrimaryTextInput
        titleText="Quantity"
        placeHolder="Enter Quantity"
        isRequired
        maxLength={3}
        value={quantity}
        disabled={!isLastIndex || disableButtons}
        onChangeText={setQuantity}
        keyboardType="number-pad"
        errorText={errors.quantity}
      />
      <Spacer size={10} />
      <PrimaryTextInput
        titleText="Material Code"
        value={selectedSku?.materialCode ?? ''}
        onChangeText={() => {}}
        disabled
      />
      <Spacer size={10} />
      <PrimaryTextInput
        titleText="UoM"
        value={selectedSku?.uom ?? ''}
        onChangeText={() => {}}
        disabled
      />
      <Spacer size={20} />
      {isLastIndex ? (
        <>
          <View style={CommonStyles.flexRowGap}>
            <CustomButton
              type={ButtonTypes.outline}
              onPress={() => handleSubmit(false)}
              icon={<AddIcon />}
              isDisabled={disableButtons}
              style={CommonStyles.flexOne}
              text="Add New SKU"
            />
            <CustomButton
              type={ButtonTypes.contained}
              onPress={() => handleSubmit(true)}
              isDisabled={disableButtons}
              style={CommonStyles.flexOne}
              text="Done"
            />
          </View>
        </>
      ) : (
        <Divider />
      )}
    </View>
  );
};

export default AddNewSku;
