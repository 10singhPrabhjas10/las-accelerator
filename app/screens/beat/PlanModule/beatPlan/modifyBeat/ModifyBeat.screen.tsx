import {FlatList, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Layout from 'components/Layout';

import AddNew from '../../../../../../assets/icons/addNew.svg';

import styles from './ModifyBeat.style';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import BeatCard from 'screens/beat/components/beatCard/BeatCard';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import DateCard from 'screens/beat/components/dateCard/DateCard';
import CommonStyles from 'utils/commonStyle';
import {IBeatPlanItemData} from 'screens/beat/Beat.interface';

const ModifyBeatScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'ModifyBeat'>>();
  const {data, date, beatPlanId, status, name} = route.params;

  const renderPlanCard = ({item}: {item: IBeatPlanItemData}) => {
    return (
      <BeatCard
        title={item?.title ?? ''}
        subTitle={item?.subTitle ?? ''}
        address={item?.address ?? ''}
        mobileNumber={item.mobileNumber}
        geoLocation={item.geoLocation ?? ''}
      />
    );
  };

  return (
    <Layout style={CommonStyles.padding} headerTitle="Beat Plan">
      <Text variant="titleMedium">Beat Plan for the Day</Text>
      <DateCard date={date} />
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={renderPlanCard}
        showsVerticalScrollIndicator={false}
      />
      <View style={CommonStyles.flexOne} />
      <CustomButton
        type={ButtonTypes.contained}
        text="Add New Store"
        onPress={() =>
          navigation?.navigate('AddNewStore', {
            navigationFrom: 'modifyBeatPlan',
            date,
            beatPlanId,
            status,
            name,
          })
        }
        icon={<AddNew />}
      />
    </Layout>
  );
};

export default ModifyBeatScreen;
