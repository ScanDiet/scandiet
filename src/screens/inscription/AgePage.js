import * as React from 'react';
import {Text, View, TouchableHighlight, TextInput, SafeAreaView, StyleSheet, Alert} from 'react-native';
import PageIndicator from "./PageIndicator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Data from '../../database/data';

function AgePage({ route, navigation }){
    const { genre, weight, height, activityLevel } = route.params;
    const [number, onChangeNumber] = React.useState(null);
    function countNbCalories(){
        if(genre === "isMaleSelected") {
            if(activityLevel === "isSedentaireSelected"){
                return Math.round(weight * 10 + height * 6.25 - number * 5 + 5);
            }
            else if(activityLevel === "isFaiblementActifSelected"){
                return Math.round((weight * 10 + height * 6.25 - number * 5 + 5)*1.2);
            }
            else if(activityLevel === "isActifSelected"){
                return Math.round((weight * 10 + height * 6.25 - number * 5 + 5)*1.55);
            }
            else{
                return Math.round((weight * 10 + height * 6.25 - number * 5 + 5)*1.725);
            }
        }
        else{
            if(activityLevel === "isSedentaireSelected"){
                return Math.round(weight * 10 + height * 6.25 - number * 5 - 161);
            }
            else if(activityLevel === "isFaiblementActifSelected"){
                return Math.round((weight * 10 + height * 6.25 - number * 5 - 161)*1.2);
            }
            else if(activityLevel === "isActifSelected"){
                return Math.round((weight * 10 + height * 6.25 - number * 5 - 161)*1.55);
            }
            else{
                return Math.round((weight * 10 + height * 6.25 - number * 5 - 161)*1.725);
            }
        }
    }
    return (
        <View
            style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <PageIndicator numPage="6"/>
            <Text
                style={{
                    textAlign: 'center',
                    margin: 20,
                    fontSize: 25
                }}>Quel age avez-vous ? </Text>
            <SafeAreaView style={{
                flexDirection: 'row',
            }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Votre age"
                    keyboardType="numeric"
                />
                <Text style={{
                    margin: 12,
                    fontSize: 20
                }}> ans</Text>
            </SafeAreaView>
            <TouchableHighlight
                style={{
                    backgroundColor: "green",
                    marginTop: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 40,
                    borderRadius: 20
                }}
                onPress={() => {
                    if (number === null || number === 0) {
                        Alert.alert('Oups !', "Nous avons besoin de connaitre votre age afin de calculer vos besoins caloriques");
                        return;
                    } else if (number < 18) {
                        Alert.alert('Information', "Vous avez moins de 18 ans, nous vous conseillons de consulter un spécialiste avant d'entreprendre tout régime alimentaire");
                    }

                    Data.getInstance().updateUser({ age: number });
                    
                    navigation.navigate('Root');
                }}>
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
export default AgePage;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
