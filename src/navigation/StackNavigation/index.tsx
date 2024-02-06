import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventBuilderScreen from '../../screens/EventBuilderScreen';
import EventItemScreen from '../../screens/EventItemScreen';
import FinalScreen from '../../screens/FinalScreen';

const Stack = createStackNavigator();

function MainStackNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="EventBuilderScreen"
          component={EventBuilderScreen}
        />
        <Stack.Screen name="EventItemScreen" component={EventItemScreen} />
        <Stack.Screen name="FinalScreen" component={FinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default MainStackNavigator;
