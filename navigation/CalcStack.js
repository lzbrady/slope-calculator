import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Calc from 'screens/calc/Calc';

import {colors} from 'BaseTheme';

const StackNavigator = createStackNavigator();

export default function CalcStack() {
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
        name="Calc"
        component={Calc}
        options={{title: 'Slope Calculator'}}
      />
    </StackNavigator.Navigator>
  );
}
