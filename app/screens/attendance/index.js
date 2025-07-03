import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card} from 'react-native-paper';
import CheckInIcon from '../../../assets/icons/check-in.svg';
import RegularisationIcon from '../../../assets/icons/regularisation.svg';
import LeaveIcon from '../../../assets/icons/applyLeaves.svg';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionTouchableButton from '@/components/button/ActionTouchableButton';

const AttendanceManagement = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    if (route?.params?.selectedCard) {
      setSelectedCard(route.params.selectedCard);
    }
  }, [route?.params?.selectedCard]);
  return (
    <Layout
      headerTitle={'Attendance'}
      style={[CommonStyles.padding16, styles.root]}
      isScrollable={true}>
      <View style={styles.container}>
        {/* Cards */}
        <View style={styles.cardsContainer}>
          <ActionTouchableButton
            title="Check-In & Check-Out"
            onPress={() => {
              setSelectedCard('checkin');
              navigation.navigate('CheckInCheckOut');
            }}
            leftIcon={<CheckInIcon />}
          />

          <ActionTouchableButton
            title="Apply Regularisation"
            onPress={() => {
              setSelectedCard('regularisation');
              navigation.navigate('AttendanceRegularisation');
            }}
            leftIcon={<RegularisationIcon />}
          />

          <ActionTouchableButton
            title="Apply Leaves"
            onPress={() => {
              setSelectedCard('leaves');
              navigation.navigate('AttendanceLeaves');
            }}
            leftIcon={<LeaveIcon />}
          />
        </View>
      </View>
    </Layout>
  );
};

export default AttendanceManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6f8', // light blue background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003b3b',
    padding: 16,
  },
  backArrow: {
    color: 'white',
    fontSize: 24,
    marginRight: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginTop: 8,
    //paddingHorizontal: 16,
  },
  card: {
    marginBottom: 24,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: '#e3fbe6',
    borderColor: '#2ecc40',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 16,
    color: '#222',
  },
});
