import React, {useState, useEffect, useRef, useCallback} from 'react';
import {styles} from './styles';
import Layout from '@/components/Layout';
import {View, Pressable} from 'react-native';
import ScreenHeader from '@/components/headers/ScreenHeader';
import SubHeader from '@/components/subHeader/subHeader';
import {useNavigation} from '@react-navigation/native';
import {getTranslationLabel} from '@/utils/commonMethods';
import CustomTabBar from '@/components/customTabBar/CustomTabBar';
import InsightCard from '@/components/insightCard';
import {Text} from 'react-native-paper';
import Progress from './components/Progress';
import Icon from 'react-native-vector-icons/AntDesign';
import QuickLinkCard from '../dashboard/components/QuickLinkCard';
import {RootNavigationProp} from '@/routes/RootNavigation';
import CustomBarChart from '@/components/custombarCharts';
import CustomLineChart from '@/components/customLineCharts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonStyles from '@/utils/commonStyle';
import DatePicker from '@/components/datePicker/DatePicker';
import moment from 'moment';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {COLORS} from '@/theme/colors';

import RightArrowIcon from '../../../assets/icons/bold-right-arrow.svg';
import LeftArrowIcon from '../../../assets/icons/bold-arrow-left-.svg';
import {MarkedDates} from 'react-native-calendars/src/types';
import DateRange from '@/components/dateRange/DateRange';
import ModalComponent from '@/modals/ModalComponent';
import {en} from 'react-native-paper-dates';
function BeatPlan() {
  const navigation = useNavigation<RootNavigationProp>();
  const Periods = ['Today', 'Week', 'Month', 'Custom'];
  const [TimePeriod, setTimePeriod] = useState<number>(0);
  const [startDate, setStartDate] = useState(moment().format());
  const [endDate, setEndDate] = useState(moment().format());
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  return (
    <Layout isScrollable>
      <ScreenHeader
        header={getTranslationLabel('beatplan')}
        onBackPress={navigation.goBack}
      />
      <SubHeader
        shouldShowCardView={false}
        otherSubHeaderContentStyle={{
          height: null,
        }}
        otherSubHeaderContent={
          <>
            <View style={styles.navigationParent}>
              <CustomTabBar
                periods={Periods}
                selectedIndex={TimePeriod}
                setSelectedIndex={function (
                  value: React.SetStateAction<number>,
                ): void {
                  setTimePeriod(value);
                }}
              />
              <Progress
                progress={10}
                currentVisits={2}
                totalVisits={5}
                tasks={3}
              />

              <View style={styles.insightParent}>
                <InsightCard value={'20k'} title="Total Sales" />
                <InsightCard value={'12'} title="Total Orders" />
                <InsightCard value={'100%'} title="Attendance" />
              </View>
            </View>
          </>
        }
        children
      />
      <View style={styles.quickLinkParent}>
        <QuickLinkCard
          text={'Todays Beat Plan'}
          customStyle={styles.navigationCard}
          onPress={function (): void {
            navigation.navigate('TodayBeatPlan');
          }}
        />
        <QuickLinkCard
          text={'Previous Beat Plan'}
          customStyle={styles.navigationCard}
          onPress={function (): void {
            navigation.navigate('PreviousBeatPlan');
          }}
        />
      </View>
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

      <CustomLineChart />
      <CustomBarChart />
    </Layout>
  );
}
export default BeatPlan;
