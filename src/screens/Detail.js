import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, ScrollView, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as translate from './translation.js';
import PureChart from 'react-native-pure-chart';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props;
        this.countryName = route.params.country;
        this.getDataArray = this.getDataArray.bind(this);
        this.state = { 
            isLoading: true,
            dataArray: [],
            chartTitle: '',
            lineStyle: {}
         };
    }
    componentDidMount() {
        fetch('https://pomber.github.io/covid19/timeseries.json')
            .then(response => response.json())
            .then(responseJson => {
                var countryRoute = this.countryName;
                if(countryRoute == 'S. Korea'){
                    countryRoute = 'Korea, South'
                }
                if(countryRoute == 'USA'){
                    countryRoute = 'US'
                }
                if(countryRoute == 'UK'){
                    countryRoute = 'United Kingdom'
                }
                if(countryRoute == 'Taiwan'){
                    countryRoute = 'Taiwan*'
                }
                if(countryRoute == 'UAE'){
                    countryRoute = 'United Arab Emirates'
                }
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson[countryRoute],
                    },
                );
            })
            .catch(error => {
                console.error(error);
            });
    }
    getDataArray(){
        var dateArray = [];
        var firstCase;
        for (let i = 0; i < this.state.dataSource.length; i++) {
            dateArray.push(this.state.dataSource[i].date);
        }
        var casesArray = [];
        for (let i = 0; i < this.state.dataSource.length; i++) {
            casesArray.push(this.state.dataSource[i].confirmed);
        }
        if(casesArray[0] == 0){
            for(let i = 0;i<casesArray.length;i++){
                if (casesArray[i] == 0){
                    firstCase = i+1;
                }
            }
        }
        else{firstCase = 0}
        var chartData = [];
        for (let i = firstCase; i < dateArray.length; i++) {
            chartData.push({ x: dateArray[i], y: casesArray[i] });
        }
        this.setState({
            dataArray: chartData,
            chartTitle: 'Histórico de número de casos',
            lineStyle: {
                margin: 10,
                padding: 10,
                borderWidth: 3,
                borderRadius: 20,
                borderColor: '#ddd',
                backgroundColor: 'white',
            }
        });
    }
    renderPieChart(){
        return(
            <Text>Alo</Text>
        )
    }

    render() {
        const { route, navigation } = this.props;
        const { country,
            cases,
            active_cases,
            recovered,
            deaths,
            new_deaths,
            new_cases,
            serious_critical,
            cases_per_1m } = route.params;

        var recoveredNum = parseFloat(recovered.split(',').join(''));
        var deathsNum = parseFloat(deaths.split(',').join(''));
        var activeNum = parseFloat(active_cases.split(',').join(''));
        var dataList = [
            {
                num: recoveredNum,
                label: 'Recuperações',
                color: '#00C2C1'
            }, 
            {
                num: deathsNum,
                label: 'Óbitos',
                color: '#4f4f4f'
            }, {
                num: activeNum,
                label: 'Casos ativos',
                color: '#f4511e'
            }
        ];
        
        dataList.sort(function(a,b){
            return (a.num > b.num) ? 1 : ((b.num > a.num) ? -1 : 0);
        });
        var pieData = [
            {
                value: dataList[0].num,
                label: dataList[0].label,
                color: dataList[0].color

            }, 
            {
                value: dataList[2].num,
                label: dataList[2].label,
                color: dataList[2].color
            }, 
            {
                value: dataList[1].num,
                label: dataList[1].label,
                color: dataList[1].color
            },
        ]
        
        var lineChart = <Text></Text>;
        console.log(this.state.dataSource)
        if(this.state.dataSource != undefined){
            console.log('entrou')
            lineChart = <View style={styles.imageContainer}>
                <TouchableOpacity onPress={this.getDataArray.bind(this)} >
                    <Image source={require('./line.png')} style={styles.imagestyle} />
                </TouchableOpacity>
                </View>
        }
    
        return (
            <ScrollView style={styles.container}>
                <View style={styles.detailContainer}>
                    <Text style={styles.countryDescription}>Novos casos: <Text style={{fontWeight:'normal'}}>{new_cases}</Text></Text>
                    <Text style={styles.countryDescription}>Novas mortes: <Text style={{ fontWeight: 'normal' }}>{new_deaths}</Text></Text>
                    <Text>                    </Text>
                    <Text style={styles.countryDescription}>Casos: <Text style={{ fontWeight: 'normal' }}>{cases}</Text></Text>
                    <Text style={styles.countryDescription}>Casos ativos: <Text style={{ fontWeight: 'normal' }}>{active_cases}</Text></Text>
                    <Text style={styles.countryDescription}>Recuperações: <Text style={{ fontWeight: 'normal' }}>{recovered}</Text></Text>
                    <Text style={styles.countryDescription}>Óbitos: <Text style={{ fontWeight: 'normal' }}>{deaths}</Text></Text>
                    <Text style={styles.countryDescription}>Pacientes em situação crítica: <Text style={{ fontWeight: 'normal' }}>{serious_critical}</Text></Text>
                    <Text style={styles.countryDescription}>Casos a cada mil habitantes: <Text style={{ fontWeight: 'normal' }}>{cases_per_1m}</Text></Text>
                </View>
                <Text>    </Text>
                <View style={this.state.lineStyle}>
                    <Text style={{ textAlign: 'center', marginBottom: 10 }}>{this.state.chartTitle}</Text>
                    <PureChart type={'line'}
                        data={this.state.dataArray}
                        height={220}
                        style={styles.pieChart}
                    />
                </View>
                <View style={styles.pieContainer}>
                    <Text style={styles.pieTitle}>Situação por número de casos</Text>
                    <PureChart data={pieData} type='pie'/>
                    <View style={styles.pieSubtitle}>
                        <Text>
                        <Text style={{ color: '#f4511e', fontWeight: 'bold', fontSize:40 }}>-</Text>
                        <Text style={{ color: '#f4511e', fontSize:18}}>Ativos</Text>
                        </Text>
                        <Text>
                            <Text style={{ color: '#00C2C1', fontWeight: 'bold', fontSize: 40 }}>-</Text>
                            <Text style={{ color: '#00C2C1', fontSize: 18 }}>Recuperações</Text>
                        </Text>
                        <Text>
                            <Text style={{ color: '#4f4f4f', fontWeight: 'bold', fontSize: 40 }}>-</Text>
                            <Text style={{ color: '#4f4f4f', fontSize: 18 }}>Óbitos</Text>
                        </Text>
                        
                    </View>
                </View>
                {lineChart}      
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        padding: 20
    },
    countryContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    countryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    countryDescription: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
        lineHeight: 24,
        fontWeight: 'bold'
    },

    countryButtonText: {
        fontSize: 16,
        textAlign: 'right',
        color: '#f4511e',
        fontWeight: 'bold'
    },
    pieChart:{
        borderWidth: 5,
    },
    imageContainer:{
        width:50,
        height:50,
        position: 'absolute',
        right:20,
        top: 25
    },
    imagestyle:{
            width: 50,
            height: 50
    },
    pieSubtitle:{
        flex:1,
        position:"absolute",
        right:'5%',
        top: 60
    },
    pieContainer:{
        margin:10,
        padding:10,
        borderWidth:3,
        borderRadius:20,
        borderColor: '#ddd',
        backgroundColor: 'white'
    },
    pieTitle:{
        flex:1,
        textAlign:'center',
        fontSize: 17,
        padding:5,
        marginBottom:10
    },
    detailContainer:{
        margin: 10,
        padding: 10,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: '#ddd',
        backgroundColor: 'white'
    }
});