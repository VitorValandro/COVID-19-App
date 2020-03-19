import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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
                        title: route.params.country
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator
