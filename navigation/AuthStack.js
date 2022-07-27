/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
 import {createStackNavigator} from '@react-navigation/stack';
 import {StyleSheet} from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/OnboardningScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
 
 
 
 const Stack = createStackNavigator();
 
 const AuthStack = () => {
   const [isFirstLunch, setIsFirstLunch] = useState(null);
   let routeName;
 
   useEffect(() => {
     AsyncStorage.getItem('alreadyLaunched').then(value => {
       if ((value = null)) {
         AsyncStorage.setItem('alreadyLaunched', 'true');
         setIsFirstLunch(true);
       } else {
         setIsFirstLunch(false);
       }
     });
   }, []);
 
   if (isFirstLunch === null) {
     return null;
   } else if (isFirstLunch === false) {
     routeName = 'Onboarding';
   } else {
     routeName = 'Login';
   }
 
   return (
     <Stack.Navigator initialRouteName={routeName}>
       <Stack.Screen name="Onboarding" component={OnboardingScreen} 
         options={{header:()=>null}}
       />
       <Stack.Screen name="Login" component={LoginScreen}
         options={{header:()=>null}}
       />
       <Stack.Screen name="Signup" component={SignupScreen} options={{header:()=>null}} />
     </Stack.Navigator>
   );
 };
 
 const styles = StyleSheet.create({});
 
 export default AuthStack;
 