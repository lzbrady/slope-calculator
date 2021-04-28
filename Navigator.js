import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigator from 'navigation/TabNavigator';

export default function Navigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
