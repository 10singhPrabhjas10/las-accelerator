import {View} from 'react-native';
import React, {useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {StyleSheet} from 'react-native';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import ArrowLeftIcon from '../../../../../../assets/icons/leftArrow.svg';
import {submitBranchVisit} from '../../influencerMeet/InfluencerMeet.business';
import {createCheckOutTime} from '../../StoreCheckIn.business';

const TrainingScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'Training'>>();
  const {navigationFrom, date, beatPlanItemId} = route.params;

  const [agenda, setAgenda] = useState('');
  const [comments, setComments] = useState('');

  const [purpose, setPurpose] = useState('');
  const [employeeMet, setEmployeeMet] = useState('');
  const [isCheckOutDisabled, setIsCheckoutDisabled] = useState(true);

  const handleSubmit = () => {
    if (navigationFrom === 'Branch visit') {
      const requestBody = {
        data: [
          {
            beatplanItemId: beatPlanItemId,
            activity: 'Branch visit',
            visitPurpose: purpose,
            employeeMeet: employeeMet,
          },
        ],
      };
      submitBranchVisit(requestBody, () => {
        setPurpose('');
        setEmployeeMet('');
        setIsCheckoutDisabled(false);
      });
    } else {
      const requestBody = {
        data: [
          {
            beatplanItemId: beatPlanItemId,
            activity: 'Training',
            visitPurpose: agenda,
            comments: comments,
          },
        ],
      };
      submitBranchVisit(requestBody, () => {
        setAgenda('');
        setComments('');
        setIsCheckoutDisabled(false);
      });
    }
  };

  const checkout = () => {
    const requestBody = {
      checkOutDate: date,
    };
    if (date !== '') {
      createCheckOutTime(beatPlanItemId, requestBody, () => {
        navigation?.goBack();
      });
    }
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={navigationFrom === 'Training' ? 'Training' : 'Branch visit'}>
      <View style={CommonStyles.flexOne}>
        {navigationFrom === 'Training' ? (
          <>
            <PrimaryTextInput
              titleText="Training Agenda"
              value={agenda}
              isRequired
              onChangeText={val => setAgenda(val)}
              placeHolder="Select Agenda"
            />
            <Spacer size={24} />
            <PrimaryTextInput
              multiline
              numberOfLines={4}
              titleText="Comments"
              value={comments}
              isRequired
              onChangeText={val => {
                setComments(val);
              }}
              placeHolder="Enter Comments"
              textInputStyle={styles.textInput}
            />
          </>
        ) : (
          <>
            <PrimaryTextInput
              titleText="Visit Purpose"
              value={purpose}
              isRequired
              onChangeText={val => setPurpose(val)}
              placeHolder="Select Purpose"
            />
            <Spacer size={24} />
            <PrimaryTextInput
              titleText="Employee Met"
              isRequired
              value={employeeMet}
              onChangeText={val => {
                setEmployeeMet(val);
              }}
              placeHolder="Enter Employ Met"
            />
          </>
        )}
      </View>
      <CustomButton
        type={ButtonTypes.outline}
        text={'Check-Out'}
        onPress={checkout}
        isDisabled={isCheckOutDisabled}
        icon={<ArrowLeftIcon />}
        style={CommonStyles.marginTop}
      />
      <Spacer size={20} />
      <CustomButton
        type={ButtonTypes.contained}
        text="Submit"
        onPress={handleSubmit}
        isDisabled={
          navigationFrom === 'Training'
            ? agenda === '' || comments === ''
            : purpose === '' || employeeMet === ''
        }
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
});

export default TrainingScreen;
