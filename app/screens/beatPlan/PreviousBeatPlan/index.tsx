import BackgroundHeader from '@/components/headers/BackgroundHeader';
import ScreenHeader from '@/components/headers/ScreenHeader';
import Layout from '@/components/Layout';
import SearchInput from '@/components/searchInput';
import {getTranslationLabel} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Selector} from '../TodaysBeatPlan';
import CustomTabBar from '@/components/customTabBar/CustomTabBar';
import {COLORS} from '@/theme/colors';
import ModalComponent from '@/modals/ModalComponent';
import DateRange from '@/components/dateRange/DateRange';
import moment from 'moment';
import {Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import BeatList from '../BeatList';
import BeatMap from '../BeatMap';

const PreviousBeatPlan = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>('');
  const [Switch, setSwitch] = useState<boolean>(true);
  const periods = ['Week', 'Month', 'Custom'];
  const [TimePeriod, setTimePeriod] = useState<number>(0);
  const [startDate, setStartDate] = useState(moment().format());
  const [endDate, setEndDate] = useState(moment().format());
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [selectedChip, setSelectedChip] = useState(0);
  return (
    <Layout style={styles.layout} isScrollable>
      <ScreenHeader
        onBackPress={navigation.goBack}
        header="Previous Beat Plan"
      />
      <BackgroundHeader>
        <View style={CommonStyles.flexRow}>
          <SearchInput
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder={getTranslationLabel('Search')}
            customStyles={[CommonStyles.flexOne, styles.marginRightZero]}
          />
          <Selector Switch={Switch} setSwitch={setSwitch} />
        </View>
      </BackgroundHeader>
      <CustomTabBar
        periods={periods}
        selectedIndex={TimePeriod}
        setSelectedIndex={setTimePeriod}
        style={styles.tabBar}
        activeText={{color: COLORS.dgreen}}
      />
      <View style={styles.DateView}>
        <Text variant="bodyLarge">Date Range</Text>
        <TouchableOpacity
          onPress={() => setShowTimeModal(true)}
          style={CommonStyles.flexRow}>
          <Text variant="bodyMedium">
            {moment(startDate).format('DD/MM/yyyy')}-
            {moment(endDate).format('DD/MM/yyyy')}
          </Text>
          <Icon
            name="calendar"
            size={24}
            style={CommonStyles.marginHorizontal10}
          />
        </TouchableOpacity>
      </View>
      <ModalComponent
        showModal={showTimeModal}
        setShowModal={() => setShowTimeModal(false)}>
        <View style={styles.modal}>
          <DateRange
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </View>
      </ModalComponent>
      <FlatList
        data={['All', 'Completed', 'Pending']}
        horizontal
        scrollEnabled={false}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => {
          return (
            <Chip
              mode="outlined"
              elevated
              selected={index == selectedChip}
              style={[styles.chip, index == selectedChip && styles.activeChip]}
              compact
              showSelectedCheck={false}
              onPress={() => setSelectedChip(index)}>
              <Text>{item}</Text>
            </Chip>
          );
        }}
      />
      {Switch ? <BeatList /> : <BeatMap />}
    </Layout>
  );
};
export default PreviousBeatPlan;
