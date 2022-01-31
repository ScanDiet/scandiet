import * as React from 'react';
import { Text, View, TouchableHighlight, Button } from 'react-native';
import PageIndicator from "./PageIndicator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const StartPage = ({ navigation }) => {
    return (
        <View
            style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <PageIndicator numPage="1"/>
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "green"
                }}>Bienvenue</Text>
            <Text
                style={{
                    textAlign: 'center',
                    margin: 50,
                    paddingTop: 50,
                    fontSize: 20
                }}>Nous avons juste besoin de vous poser quelques questions rapides afin que nous puissions calculer vos calories quotidiennes recommandées et vous aider à atteindre vos objectifs.</Text>
                <TouchableHighlight
                style={{backgroundColor: "green",
                    padding: 20,
                    bottom: 0
                }}
                onPress={() => navigation.navigate('GenrePage')}>
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
export default StartPage;
