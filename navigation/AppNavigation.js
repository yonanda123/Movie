import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import TopRatedScreen from '../screens/TopRatedScreen';
import AllResultsScreen from '../screens/AllResultsScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={SearchScreen}
        />
        <Stack.Screen
          name="UpcomingScreen"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={UpcomingScreen}
        />
        <Stack.Screen
          name="TopRatedScreen"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={TopRatedScreen}
        />
        <Stack.Screen
          name="AllResultsScreen"
          options={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          component={AllResultsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
