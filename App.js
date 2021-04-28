/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {SettingsProvider} from 'context/SettingsContext';

import Navigator from 'Navigator';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({duration: 500});
  }, []);

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
