import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Info extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.sourceContainer}>
                    <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold', color: '#333'}}>Fontes dos dados</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://www.who.int/')}>World Health Organization (WHO)</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('http://3g.dxy.cn/newh5/view/pneumonia')}>DXY.cn. Pneumonia. 2020.</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/')}>BNO News</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml')}>Comissão Nacional de Saúde da República Popular da China (NHC)</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>Centro de Controle e Prevenção de Doenças dos Estados Unidos da América (US CDC)</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm')}>Centro de Controle e Prevenção de Doenças da China (CCDC)</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://www.canada.ca/en/public-health/services/diseases/coronavirus.html')}>Governo do Canadá</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://www.health.gov.au/news/coronavirus-update-at-a-glance')}>Departamento Governamental de Saúde da Austrália</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases')}>Centro Europeu de Controle e Prevenção de Doenças (ECDC)</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('http://www.salute.gov.it/nuovocoronavirus')}>Ministério da Saúde da Itália</Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://systems.jhu.edu/research/public-health/ncov/')}>Universidade Johns Hopkins</Text>
                </View>
                <View style={styles.sourceContainer}>
                    <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold', color: '#333' }}>Sobre</Text>
                    <Text>Este é um software livre, de código aberto.</Text>
                    <Text>Os dados são atualizados várias vezes ao dia, com base em múltiplas fontes.</Text>
                    <Text>O código e demais informações sobre o aplicativo podem ser encontrados no repositório do projeto no GitHub.</Text>
                    <Text></Text>
                    <Text style={styles.sourceLink} onPress={() => Linking.openURL('https://github.com/VitorValandro/COVID-19-App')}>github.com/VitorValandro/COVID-19-App</Text>
                </View>
                <View style={styles.sourceContainer}>
                    <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold', color: '#333' }}>Termos de Uso</Text>
                    <Text style={{color: '#555'}}>Este aplicativo é baseado em dados de múltiplas fontes, que nem sempre são confiáveis.</Text>
                    <Text style={{ color: '#555' }}>É isenta a responsabilidade de toda e qualquer garantia ou confirmação, incluindo precisão, adequação, uso e comercialização.</Text>
                    <Text style={{ color: '#555' }}>O software tem fins únicos e exclusivos de aprendizagem e educação, sendo estritamente inapto para orientação médica ou uso comercial.</Text>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    sourceContainer:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        margin:20
    },
    sourceLink:{
        color: '#f4511e',
        textDecorationLine:'underline',
        marginBottom:5
    }
})
