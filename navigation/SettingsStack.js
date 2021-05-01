import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from 'screens/settings/Settings';
import ChangeGraphColor from 'screens/settings/ChangeGraphColor';

import {colors} from 'BaseTheme';

const StackNavigator = createStackNavigator();

export default function SettingsStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <StackNavigator.Screen name="Settings" component={Settings} options={{title: 'Settings'}} />
      <StackNavigator.Screen name="ChangeGraphColor" component={ChangeGraphColor} options={{title: 'Graph Color'}} />
    </StackNavigator.Navigator>
  );
}
