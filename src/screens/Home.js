import React, {Component} from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as translate from './translation.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isLoading2:true, search: '', dataWorld: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "ea5c5ad4c5msh0d06c528ab5b877p18caf3jsn7f612e26fac8"
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading2: false,
            dataWorld: responseJson
          },
          function () { }
        );
      })
      .catch(error => {
        console.error(error);
      });
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key": "ea5c5ad4c5msh0d06c528ab5b877p18caf3jsn7f612e26fac8"
          }
      })
          .then(response => response.json())
              .then(responseJson => {
                  this.setState(
                      {
                          isLoading: false,
                          dataSource: responseJson.countries_stat,
                          dateOfData: responseJson.statistic_taken_at
                      },
                      function () {
                        this.arrayholder = responseJson.countries_stat;
                      }
              );
            })
          .catch(err => {
              console.log(err);
          });
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = translate.EnToPt(item.country_name) ? translate.EnToPt(item.country_name).toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
 
      search: text,
    });
  }

  render() {
    const { navigation } = this.props;
    var WorldStats;
    if(this.state.search == ''){
      WorldStats = <View style={styles.worldContainer}>
        <Text style={styles.countryTitle}>Mundo</Text>
        <Text style={styles.countryDescription}>Novos Casos: {this.state.dataWorld.new_cases}</Text>
        <Text style={styles.countryDescription}>Novos Óbitos: {this.state.dataWorld.new_deaths}</Text>
        <Text></Text>
        <Text style={styles.countryDescription}>Total de casos registrados: {this.state.dataWorld.total_cases}</Text>
        <Text style={styles.countryDescription}>Total de óbitos registrados: {this.state.dataWorld.total_deaths}</Text>
        <Text style={styles.countryDescription}>Total de vítimas recuperadas: {this.state.dataWorld.total_recovered}</Text>
      </View>
    }

    if (this.state.isLoading || this.state.isLoading2) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            placeholder="Procure um país..."
            value={this.state.search}
            inputContainerStyle={{backgroundColor:'white'}}
            containerStyle={{backgroundColor:'transparent', border:0}}
              lightTheme='true'
          />
            {WorldStats}
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.countryContainer}>
                  <Text style={styles.countryTitle}>{translate.EnToPt(item.country_name)}</Text>
                  <Text style={styles.countryDescription}>Casos: {item.cases}</Text>
                  <Text style={styles.countryDescription}>Casos ativos: {item.active_cases}</Text>
                  <Text style={styles.countryDescription}>Recuperações: {item.total_recovered}</Text>
                  <Text style={styles.countryDescription}>Óbitos: {item.deaths}</Text>

                  <TouchableOpacity style={styles.countryButton} onPress={() => {
                    navigation.navigate('Detail',{
                      country: item.country_name,
                      cases: item.cases,
                      active_cases: item.active_cases,
                      recovered: item.total_recovered,
                      deaths: item.deaths,
                      new_deaths: item.new_deaths,
                      new_cases: item.new_cases,
                      serious_critical: item.serious_critical,
                      cases_per_1m: item.total_cases_per_1m_population,
                      date: this.state.dateOfData
                    });
                  }}>
                      <Text style={styles.countryButtonText}>Detalhes >></Text>
                  </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ country_name }, index) => country_name}
          />
        </ScrollView>
        <Text style={{ textAlign: 'center', backgroundColor:'#fafafa' }}>
          Última Atualização: {this.state.dateOfData} GMT
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fafafa'
    },
    list:{
        padding:20
    },
    countryContainer:{
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius:5,
        padding:20,
        marginBottom:20
    },
    countryTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    countryDescription:{
        fontSize:16,
        color: '#555',
        marginTop:5,
        lineHeight: 24
    },
    countryButtonText:{
        fontSize:16,
        textAlign: 'right',
        color: '#f4511e',
        fontWeight: 'bold'
    },
    worldContainer:{
      flex:1,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 20,
      marginBottom: 20,
      margin:20,
    }
});