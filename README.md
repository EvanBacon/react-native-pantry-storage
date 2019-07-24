# react-native-pantry-storage

Persist values in `AsyncStorage` with expiration dates.

Just like with a real pantry all items have an expiration date, when they expire you throw them out!

## Installation

```bash
yarn add react-native-pantry-storage

or

npm install --save react-native-pantry-storage
```

### Usage

Import the library into your JavaScript file:

```js
import {
  setItemWithExpirationAsync,
  getItemWithExpirationAsync,
  getExpirationDateAsync,
  createDate,
  removeItemAsync,
} from 'react-native-pantry-storage';
```

#### Example

Here we want to return the user's favorite song. If they're like me, this changes daily. If they use the app more than once in a 24 hour period then we don't want to ask then again.

> In reality I use this API for storing API data so I can throttle how often I call remote end-points (because I'm cheap).

```js
import {
  setItemWithExpirationAsync,
  getItemWithExpirationAsync,
  getExpirationDateAsync,
  createDate,
  removeItemAsync,
} from 'react-native-pantry-storage';

const KEY = '@COOL_APP:MY_FAVORITE_SONG';

async function getFavoriteSongAsync() {
  // Check the cache. This is basically like invoking AsyncStorage but if the data expired then it gets thrown out and `null` is returned.
  const favoriteSong = await getItemWithExpirationAsync(KEY);
  if (favoriteSong != null) {
    return favoriteSong;
  }

  // Mock method for getting data...
  const newFavoriteSong = await promptUserForCurrentFavoriteSongAsync();

  // Save the value for a day (I change up quickly)
  await setItemWithExpirationAsync(KEY, newFavoriteSong, { hours: 24 });

  return newFavoriteSong;
}

console.log('You currently like this song:', await getFavoriteSongAsync());
```
