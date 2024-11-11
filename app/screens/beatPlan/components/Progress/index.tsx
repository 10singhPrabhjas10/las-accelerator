import {COLORS} from '@/theme/colors';
import React from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {Text} from 'react-native-paper';
import {fontConfig} from '@/theme/fonts';
interface IProgress {
  progress: number;
  currentVisits: number;
  totalVisits: number;
  tasks: number;
}
const Progress = ({
  progress = 10,
  currentVisits = 2,
  totalVisits = 5,
  tasks = 3,
}: IProgress) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 20,
        borderRadius: 8,
        backgroundColor: COLORS.insightBackground,
        marginVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flex: 0.6,
        }}>
        <CircularProgressBase
          value={progress}
          activeStrokeColor={COLORS.powderBlue}
          inActiveStrokeOpacity={0.2}
          radius={30}
          inActiveStrokeColor={COLORS.white}>
          <Text variant="bodySmall" style={{color: COLORS.white}}>
            {progress}%
          </Text>
        </CircularProgressBase>
        <View style={{justifyContent: 'center'}}>
          <Text variant="headlineSmall" style={styles.text16}>
            {currentVisits}/{totalVisits}
          </Text>
          <Text variant="bodySmall" style={{color: COLORS.white}}>
            Total Visits
          </Text>
        </View>
      </View>
      <View style={styles.verticalLine} />
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text variant="headlineSmall" style={styles.text16}>
            {tasks / 10 < 1 ? '0' + tasks : tasks}
          </Text>
          <Text variant="bodySmall" style={{color: COLORS.white}}>
            Follow-up Tasks
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Progress;
