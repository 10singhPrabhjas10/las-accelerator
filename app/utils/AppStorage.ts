import AsyncStorage from '@react-native-async-storage/async-storage';

const setStorageData = async (key: string, val: string) => {
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }

  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    console.log('error saving data', val);
  }
};
const getStorageData = async (key: string) => {
  try {
    let val = await AsyncStorage.getItem(key);

    if (val !== undefined && val !== null) {
      if (typeof val !== 'string') {
        val = JSON.parse(val);
        return val;
      }
      return val;
    }
    return val;
  } catch (error) {
    console.log('error getting data', error);

    return null;

    // There was an error on the native side
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    // Congrats! You've just cleared the device storage!
  } catch (error) {
    console.log('error saving data', error);

    // There was an error on the native side
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    // Congrats! You've just removed your first value!
  } catch (error) {
    console.log('error saving data', error);

    // There was an error on the native side
  }
};

export {setStorageData, getStorageData, clearStorage, removeData};
