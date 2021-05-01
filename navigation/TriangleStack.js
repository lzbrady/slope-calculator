import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Triangle from 'screens/triangle/Triangle';

import {colors} from 'BaseTheme';

const StackNavigator = createStackNavigator();

export default function TriangleStack() {
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
      <StackNavigator.Screen name="Triangles" component={Triangle} options={{title: 'Triangle Calculator'}} />
    </StackNavigator.Navigator>
  );
}
