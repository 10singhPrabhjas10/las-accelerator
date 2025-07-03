import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card} from 'react-native-paper';
import CheckInIcon from '../../../assets/icons/check-in.svg';
import RegularisationIcon from '../../../assets/icons/regularisation.svg';
import LeaveIcon from '../../../assets/icons/applyLeaves.svg';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';

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
          <Card
            style={[
              styles.card,
              selectedCard === 'checkin' && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedCard('checkin');
              navigation.navigate('CheckInCheckOut');
            }}>
            <Card.Content style={styles.cardContent}>
              <CheckInIcon width={24} height={24} />
              <Text style={styles.cardText}>Check-In & Check-Out</Text>
            </Card.Content>
          </Card>
          <Card
            style={[
              styles.card,
              selectedCard === 'regularisation' && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedCard('regularisation');
              navigation.navigate('AttendanceRegularisation');
            }}>
            <Card.Content style={styles.cardContent}>
              <RegularisationIcon width={24} height={24} />
              <Text style={styles.cardText}>Apply Regularisation</Text>
            </Card.Content>
          </Card>
          <Card
            style={[
              styles.card,
              selectedCard === 'leaves' && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedCard('leaves');
              navigation.navigate('AttendanceLeaves');
            }}>
            <Card.Content style={styles.cardContent}>
              <LeaveIcon width={24} height={24} />
              <Text style={styles.cardText}>Apply Leaves</Text>
            </Card.Content>
          </Card>
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
