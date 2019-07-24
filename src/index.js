import { AsyncStorage } from 'react-native';

export async function setItemWithExpirationAsync(
  key,
  value,
  { milliseconds, seconds, minutes, hours, time }
) {
  // set expire at
  const _value = { value, expireAt: createDate({ milliseconds, seconds, minutes, hours, time }) };
  // stringify object
  const objectToStore = JSON.stringify(_value);
  // store object
  return AsyncStorage.setItem(key, objectToStore);
}

export async function getItemWithExpirationAsync(key) {
  let data;
  await AsyncStorage.getItem(key, async (err, value) => {
    if (err) throw err;
    data = JSON.parse(value);
    // there is data in cache && cache is expired
    if (data !== null && data.expireAt && new Date(data.expireAt) < new Date()) {
      // clear cache
      AsyncStorage.removeItem(key);
      // update res to be null
      data = null;
    }
  });
  if (data) {
    return data.value;
  }
  return null;
}

export async function getExpirationDateAsync(key) {
  let data = null;
  await AsyncStorage.getItem(key, async (err, value) => {
    if (err) throw err;
    data = JSON.parse(value);
    if (data !== null && data.expireAt && new Date(data.expireAt)) {
      data = new Date(data.expireAt);
    }
  });
  return data;
}

export function createDate({ milliseconds, seconds, minutes, hours, time }) {
  const now = new Date();
  const expireTime = new Date(now);

  if (typeof milliseconds !== 'undefined') {
    expireTime.setMilliseconds(now.getMilliseconds() + milliseconds);
  }
  if (typeof seconds !== 'undefined') {
    expireTime.setSeconds(now.getSeconds() + seconds);
  }
  if (typeof minutes !== 'undefined') {
    expireTime.setMinutes(now.getMinutes() + minutes);
  }
  if (typeof hours !== 'undefined') {
    expireTime.setHours(now.getHours() + hours);
  }
  if (typeof time !== 'undefined') {
    expireTime.setTime(time);
  }

  return expireTime;
}

export async function removeItemAsync(key) {
  return await AsyncStorage.removeItem(key);
}
