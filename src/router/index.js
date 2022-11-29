import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '../pages/WelcomeScreen'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import RegMapSelector from '../pages/RegMapSelector'
import React from 'react'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="RegMapSelector" component={RegMapSelector} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router