
import { AsyncStorage } from 'react-native';
export const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
};
export const _retrieveData = async (key) => {
    try {
      /*const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.warn('We have data!!',value);
      }*/
      return AsyncStorage.getItem(key)
    } catch (error) {
      // Error retrieving data
      return null
    }
};
export const _removeData = async (key) => {
    return AsyncStorage.removeItem(key)
};