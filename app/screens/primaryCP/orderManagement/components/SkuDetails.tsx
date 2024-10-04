import {View} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import AddNewSku from './AddNewSku';
import {updateAddNewSkuData} from '../OrderManagement.business';

const SkuDetails = ({prevData, onSubmit}: ISkuDetails) => {
  const [skuData, setSkuData] = useState<IAddSkuDetails[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [skuIndex, setSkuIndex] = useState(1);

  const handleAddNewSku = (data: IAddSkuDetails) => {
    setSkuData(prev => [...prev, data]);
    setSkuIndex(skuIndex + 1);
  };

  const handleAddNewSkuDone = (data: IAddSkuDetails) => {
    setSkuData(prev => [...prev, data]);
    setIsSubmitDisabled(false);
  };

  const handleOnSubmit = () => {
    const requestBody = {
      ...prevData,
      data: skuData,
    };
    updateAddNewSkuData(requestBody, () => onSubmit());
  };

  return (
    <View style={CommonStyles.flexOne}>
      <View style={CommonStyles.flexOne}>
        {[...Array(skuIndex)].map((_, index) => (
          <AddNewSku
            handleAddNewSku={handleAddNewSku}
            handleAddNewSkuDone={handleAddNewSkuDone}
            isLastIndex={skuIndex === index + 1}
            componentIndex={index + 1}
            productCategory={prevData?.productCategory}
          />
        ))}
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Next"
        isDisabled={isSubmitDisabled}
        onPress={handleOnSubmit}
        style={CommonStyles.marginTop}
      />
    </View>
  );
};

export default SkuDetails;
