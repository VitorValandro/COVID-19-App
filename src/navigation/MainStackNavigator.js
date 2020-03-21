import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, Image } from 'react-native';
import * as translate from '../screens/translation.js';

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import Info from '../screens/Info'

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
                    options={({ navigation }) => ({ title: 'Monitoramento COVID-19',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                                <Image source={require('../screens/Information.png')} style={{
                                    marginTop:5,
                                    marginRight:10,
                                    width: 30,
                                    height: 30}} />
                            </TouchableOpacity>
                        )  })}
            
                />
                <Stack.Screen
                    name='Detail'
                    component={Detail}
                    options={({ route }) => ({
                        title: translate.EnToPt(route.params.country)
                    })}
                />
                <Stack.Screen name='Info'
                    component={Info}
                    options={{ title: 'Informações' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator
