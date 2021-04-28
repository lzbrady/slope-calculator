import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from 'screens/settings/Settings';

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
      <StackNavigator.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Settings'}}
      />
    </StackNavigator.Navigator>
  );
}
