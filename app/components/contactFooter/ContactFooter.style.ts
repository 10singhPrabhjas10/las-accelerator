import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  text: {
    marginLeft: 8,
    textAlignVertical: 'center',
  },
});

export default styles;
