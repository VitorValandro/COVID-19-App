import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default class Detail extends Component {
    render() {
        const { route, navigation } = this.props;
        const { country } = route.params;
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>itemId: {country}</Text>
                <Text>Hello, world!</Text>
            </View>
        );
    }
}
