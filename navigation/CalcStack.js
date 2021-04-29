import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SlopeCalc from 'screens/calc/SlopeCalc';

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
        name="SlopeCalc"
        component={SlopeCalc}
        options={{title: 'Slope Calculator'}}
      />
    </StackNavigator.Navigator>
  );
}
