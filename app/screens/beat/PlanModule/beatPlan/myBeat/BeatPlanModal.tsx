import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {SetStateAction, useState} from 'react';
import styles from './BeatPlan.style';

import WarningIcon from '../../../../../../assets/icons/warning-triangle.svg';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Accordion from 'components/accordion/Accordion';
import {
  IBeatPreConditionsData,
  IRecurrenceData,
} from 'screens/beat/Beat.interface';
import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';

interface IBeatPlanModalProps {
  setShowModal: SetStateAction<any>;
  setShowSuccessModal: SetStateAction<any>;
  month: string;
  year: number;
  beatPreConditions: IBeatPreConditionsData[];
  beatPlanId: string;
  onSubmitData: (data: IRecurrenceData[]) => void;
}

const BeatPlanModal = ({
  setShowModal,
  month,
  year,
  beatPreConditions,
  beatPlanId,
  onSubmitData,
}: IBeatPlanModalProps) => {
  const [comments, setComments] = useState(
    Array(beatPreConditions.length).fill(''),
  );

  const createReqBody = () => {
    const dataArray = beatPreConditions?.map((item, index) => {
      const commentValue = comments[index];

      const recurrenceObject: IRecurrenceData = {
        beatplanId: beatPlanId,
        comment: commentValue,
      };

      if (item.date !== null) {
        recurrenceObject.deviationType = 'Daily';
        recurrenceObject.date = item.date;
      } else {
        recurrenceObject.deviationType = 'Monthly';
        recurrenceObject.month = item.month;
      }

      return recurrenceObject;
    });
    onSubmitData(dataArray);
  };

  const handleCommentChange = (index: number, val: string) => {
    const newComments = [...comments];
    newComments[index] = val;
    setComments(newComments);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.modalHeight}>
        <View style={styles.container}>
          <Text style={styles.title} variant="titleLarge">
            Beat Plan Deviation
          </Text>
          <WarningIcon style={styles.icon} />
          <Text style={styles.beatPlanText} variant="labelLarge">
            {`Beat Plan for ${month} ${year} contains following errors:`}
          </Text>
          <Text style={styles.label} variant="labelLarge">
            Do you still want to submit?
          </Text>
        </View>
        <Spacer size={15} />
        <ScrollView
          nestedScrollEnabled={true}
          style={CommonStyles.flexOne}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {beatPreConditions?.map((item, index) => {
            return (
              <Accordion
                key={index}
                title={item?.date ? item?.date : item?.month}>
                <Text style={styles.subtitle} variant="labelLarge">
                  {item?.condition}
                </Text>
                <PrimaryTextInput
                  multiline
                  numberOfLines={4}
                  titleText="Comments"
                  value={comments[index]}
                  onChangeText={val => handleCommentChange(index, val)}
                  placeHolder="Type Comments"
                  textInputStyle={styles.textInput}
                />
              </Accordion>
            );
          })}
        </ScrollView>

        <View style={styles.buttonView}>
          <CustomButton
            type={ButtonTypes.outline}
            text="Dismiss"
            onPress={() => {
              setShowModal(false);
            }}
            style={CommonStyles.flexOne}
          />
          <CustomButton
            type={ButtonTypes.contained}
            text="Submit"
            onPress={() => {
              createReqBody();
            }}
            isDisabled={!comments?.some(comment => comment?.trim().length > 0)}
            style={CommonStyles.flexOne}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BeatPlanModal;
