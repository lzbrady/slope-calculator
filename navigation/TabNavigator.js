import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import CalcStack from 'navigation/CalcStack';
import SettingsStack from 'navigation/SettingsStack';

import {colors} from 'BaseTheme';
import Slope from 'icons/slope.svg';
import SettingsIcon from 'icons/settings.svg';

const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'Slope':
              return <Slope width={size * 1.4} height={size * 1.4} fill={color} />;
            case 'Settings':
              return <SettingsIcon width={size * 1.1} height={size * 1.1} fill={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.black,
        inactiveTintColor: colors.gray,
        style: {
          borderTopWidth: 1,
          borderTopColor: colors.primary,
          paddingBottom: 5,
          height: Math.max(65, insets.bottom + 45),
        },
        tabStyle: {
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom - 20, 0),
        },
      }}>
      <Tab.Screen name="Slope" component={CalcStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}
