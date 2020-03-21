import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as translate from '../screens/translation.js';

import Home from '../screens/Home'
import Detail from '../screens/Detail'

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#f4511e'
                    },
                    headerTintColor: '#fff',
                    headerBackTitleVisible: false
                }}
                headerMode='float'>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ title: 'Monitoramento COVID-19' }}
                />
                <Stack.Screen
                    name='Detail'
                    component={Detail}
                    options={({ route }) => ({
                        title: translate.EnToPt(route.params.country)
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator
