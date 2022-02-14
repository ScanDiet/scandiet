import * as React from 'react';
import {Text, View, TouchableHighlight, TextInput, SafeAreaView, StyleSheet, Alert} from 'react-native';
import PageIndicator from "./PageIndicator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function HeightPage({ route, navigation }){
    const { genre, weight } = route.params;
    const [number, onChangeNumber] = React.useState(null);
    return (
        <View
            style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <PageIndicator numPage="4"/>
            <Text
                style={{
                    textAlign: 'center',
                    margin: 20,
                    fontSize: 25
                }}>Quelle est votre taille?</Text>
            <SafeAreaView style={{
                flexDirection: 'row',
            }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Votre taille"
                    keyboardType="numeric"
                />
                <Text style={{
                    margin: 12,
                    fontSize: 20
                }}> cm</Text>
            </SafeAreaView>
            <TouchableHighlight
                style={{backgroundColor: "green",
                    marginTop: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 40,
                    borderRadius: 20
                }}
                onPress={() => {
                    if (number === null || number === 0) {
                        Alert.alert('Oups !', "Veuillez entrer votre taille");
                        return;
                    }

                    navigation.navigate('ActivityLevelPage', { genre:genre, weight:weight, height:number})}
                }>
                <Text
                    style={{color: "white",
                        fontSize: 20}}>
                    Suivant <FontAwesomeIcon
                    style={{color: "white",}}
                    icon={ faArrowRight } />
                </Text>
            </TouchableHighlight>
        </View>
    )
}
export default HeightPage;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
