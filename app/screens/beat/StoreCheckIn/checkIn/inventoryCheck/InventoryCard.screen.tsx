import {FlatList, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import DataCard from 'components/dataCard/DataCard';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {
  getInventoryDetailsData,
  submitDiscrepancyData,
} from './InventoryCheck.business';
import {ITransformedInventoryDetails} from './InventoryCheck.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const InventoryCardScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'InventoryCard'>>();
  const {category, subCategory} = route.params;
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const [inventoryData, setInventoryData] = useState<
    ITransformedInventoryDetails[]
  >([]);

  const radioButtonData = [
    {value: 'Yes', label: 'Yes'},
    {value: 'No', label: 'No'},
  ];

  const [itemStates, setItemStates] = useState<{
    [key: string]: {
      discrepancy: string;
      reason: string;
      discrepancyQty: string;
      categoryName: string;
      skuName: string;
      quantity: number;
    };
  }>({});

  useEffect(() => {
    getInventoryDetailsData(category, subCategory, setInventoryData);
  }, []);

  const handleSubmit = () => {
    Object.entries(itemStates).map(async ([skuCode, itemState]) => {
      const requestBody = {
        categoryName: itemState.categoryName,
        skuDescription: itemState.skuName,
        quantity: itemState.quantity?.toString(),
        discrepancyQty: itemState.discrepancyQty,
        reasonForDiscrepancy: itemState.reason,
      };
      submitDiscrepancyData(relationId, requestBody, () => {
        navigation.goBack();
      });
    });
  };

  const handleDiscrepancyChange = (
    skuName: string,
    val: string,
    categoryName: string,
    quantity: number,
  ) => {
    if (val === 'No') {
      setItemStates(prevState => {
        const newState = {...prevState};
        delete newState[skuName];
        return newState;
      });
    } else {
      setItemStates(prevState => ({
        ...prevState,
        [skuName]: {
          ...prevState[skuName],
          discrepancy: val,
          categoryName,
          quantity,
          skuName,
        },
      }));
    }
  };

  const handleQtyChange = (skuName: string, val: string) => {
    setItemStates(prevState => ({
      ...prevState,
      [skuName]: {...prevState[skuName], discrepancyQty: val},
    }));
  };

  const handleReasonChange = (skuName: string, val: string) => {
    setItemStates(prevState => ({
      ...prevState,
      [skuName]: {...prevState[skuName], reason: val},
    }));
  };

  const renderDataCard = ({item}: {item: ITransformedInventoryDetails}) => {
    const {discrepancy, discrepancyQty, reason} = itemStates[item.skuName] || {
      discrepancy: 'No',
      discrepancyQty: '',
      reason: '',
    };

    return (
      <DataCard
        key={item?.skuCode}
        footer={
          <View key={item?.skuCode}>
            <Divider style={CommonStyles.horizontalDivider} />
            <View style={CommonStyles.flexRow}>
              <CustomRadioButton
                title="Discrepancy"
                onChange={val =>
                  handleDiscrepancyChange(
                    item.skuName,
                    val,
                    item?.categoryName,
                    item?.quantity,
                  )
                }
                isRequired={discrepancy === 'Yes'}
                value={discrepancy}
                data={radioButtonData}
                containerStyle={styles.radioGroup}
              />
            </View>
            {discrepancy === 'Yes' && (
              <>
                <PrimaryTextInput
                  keyboardType="number-pad"
                  onChangeText={val => handleQtyChange(item.skuName, val)}
                  value={discrepancyQty}
                  isRequired
                  placeHolder="Discrepancy qty"
                />
                <Divider style={CommonStyles.horizontalDivider} />
                <PrimaryTextInput
                  multiline
                  numberOfLines={3}
                  titleText="Reason for Discrepancy"
                  subtitleText={'100 char max'}
                  isRequired
                  value={reason}
                  onChangeText={val => handleReasonChange(item.skuName, val)}
                  placeHolder="Add your reason"
                  textInputStyle={styles.textInput}
                  subTitleStyle={styles.subTitle}
                  maxLength={100}
                />
              </>
            )}
          </View>
        }
        data={item?.data}
      />
    );
  };

  const isSubmitDisabled = () => {
    return (
      Object.keys(itemStates).length === 0 ||
      Object.values(itemStates).some(
        item =>
          item.discrepancy === 'Yes' && (!item.discrepancyQty || !item.reason),
      )
    );
  };

  return (
    <Layout headerTitle="Inventory Record" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={inventoryData}
          renderItem={renderDataCard}
        />
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Submit"
        onPress={handleSubmit}
        isDisabled={isSubmitDisabled()}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  subTitle: {
    position: 'absolute',
    right: 0,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default InventoryCardScreen;
