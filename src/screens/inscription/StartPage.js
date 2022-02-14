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
                    margin: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "green"
                }}>
                Bienvenue
            </Text>

            <Text
                style={{
                    margin: 20,
                    marginBottom: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "green",
                    textAlign: 'center'
                }}>
                Scandiet vous aide à gérer vos besoins caloriques journalier et vous permet de scanner vos aliments pour en connaitre le nutriscore !
            </Text>

            <Text style={{
                textAlign: 'center',
                margin: 20,
                marginBottom: 10,
                fontSize: 17
            }}>

                Nous avons besoin de quelques informations pour mieux vous aider à atteindre vos objectifs.
            </Text>

            <TouchableHighlight
                style={{
                    backgroundColor: "green",
                    paddingVertical: 10,
                    paddingHorizontal: 40,
                    borderRadius: 20,
                    bottom: 0,
                    margin: 20,
                    marginHorizontal: 50,
                }}
                onPress={() => navigation.navigate('GenrePage')}>
                <Text
                    style={{color: "white",
                        fontSize: 20}}>
                    Commencer <FontAwesomeIcon
                    style={{color: "white",}}
                    icon={ faArrowRight } />
                </Text>
            </TouchableHighlight>
        </View>
    )
}
export default StartPage;
