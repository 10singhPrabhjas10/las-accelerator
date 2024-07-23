import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import React from 'react';
import Layout from 'components/Layout';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';

import ActionButton from 'components/button/ActionButton';

import AccountIcon from '../../../../../assets/icons/accountMultiple.svg';
import ActivityIcon from '../../../../../assets/icons/activity.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';

const AddNewStoreScreen = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'AddNewStore'>>();
  const navigation = useNavigation<RootNavigationProp>();
  const {navigationFrom, date, beatPlanId, status, name, refreshData} =
    route.params;
  const userData = useSelector((state: RootState) => state?.user?.user);

  const lastype = userData?.lasType;

  return (
    <Layout
      onBackPress={() => {
        navigationFrom === 'storeCheckIn' && refreshData && refreshData();
        navigation.goBack();
      }}
      headerTitle="Add Beat Plan">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}>
        <PrimaryTextInput
          titleText="Beat Name"
          placeHolder="Beat Name"
          onChangeText={() => {}}
          value={name}
          disabled={true}
        />

        <View style={styles.actionView}>
          <Text variant="titleMedium">Select Option</Text>
          <Text variant="bodyMedium">Select options to create Beat Plan</Text>
          {lastype === LasType.TE && (
            <ActionButton
              icon={<Icon size={24} source={'account-outline'} />}
              title="Primary Channel Partner"
              onPress={() =>
                navigation?.navigate('OptionScreen', {
                  navigationFrom: 'Primary',
                  date,
                  fromStoreCheckIn: navigationFrom === 'storeCheckIn',
                  beatPlanId,
                  status,
                })
              }
            />
          )}
          <ActionButton
            icon={<AccountIcon height={24} width={24} />}
            title="Secondary Channel Partner"
            onPress={() =>
              navigation?.navigate('OptionScreen', {
                navigationFrom: 'Secondary',
                date,
                fromStoreCheckIn: navigationFrom === 'storeCheckIn',
                beatPlanId,
                status,
              })
            }
          />
          <ActionButton
            icon={
              <Icon source={'account-supervisor-circle-outline'} size={24} />
            }
            title="Leads"
            onPress={() =>
              navigation?.navigate('OptionScreen', {
                navigationFrom: 'Lead',
                date,
                fromStoreCheckIn: navigationFrom === 'storeCheckIn',
                beatPlanId,
                status,
              })
            }
          />

          <ActionButton
            icon={<ActivityIcon width={24} height={24} />}
            title="Add Activity"
            onPress={() =>
              navigation?.navigate('AddActivity', {
                date,
                beatPlanId,
              })
            }
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AddNewStoreScreen;

const styles = StyleSheet.create({
  actionView: {marginTop: 30, paddingHorizontal: 4},
  scrollView: {marginHorizontal: 16, marginTop: 24, marginBottom: 18},
});
