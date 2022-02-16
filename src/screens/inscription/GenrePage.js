import * as React from 'react';
import { View, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faMale, faFemale, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import PageIndicator from "./PageIndicator";
import Data from '../../database/data';

class GenrePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sexe: '',
            maleColor: 'black',
            femaleColor: 'black',
        }
    }

    sexes = ['male', 'female'];

    selectSexe = (sexe) => {
        this.setState({
            sexe,
            maleColor: 'black',
            femaleColor: 'black',
        });

        switch(sexe) {
            case 'male': 
                this.setState({
                    maleColor: 'green',
                });
                break;
            case 'female': 
                this.setState({
                    femaleColor: 'green',
                });
        }
    }

    render()  {
        return (
            <View
                style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <PageIndicator numPage="2"/>
                <Text
                    style={{
                        textAlign: 'center',
                        margin: 20,
                        fontSize: 25
                    }}>
                    Quel est votre sexe ?</Text>
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        underlayColor="grey"
                        style={[styles.button, {borderColor: this.state.maleColor}]}
                        onPress={() => this.selectSexe(this.sexes[0])}>
                        <FontAwesomeIcon
                            icon={faMale}
                            size={50}
                            color={this.state.maleColor}/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="grey"
                        style={[styles.button, {borderColor: this.state.femaleColor}]}
                        onPress={() => this.selectSexe(this.sexes[1])}>
                        <FontAwesomeIcon
                            icon={faFemale}
                            size={50}
                            color={this.state.femaleColor}/>
                    </TouchableHighlight>
                </View>
                
                <TouchableHighlight
                    style={{
                        backgroundColor: "green",
                        paddingVertical: 10,
                        paddingHorizontal: 40,
                        bottom: 0,
                        margin: 20,
                        borderRadius: 20,
                        marginHorizontal: 50
                    }}
                    onPress={() => {
                        if (this.state.sexe === '') {
                            Alert.alert('Oups !', 'Nous avons besoin de connaitre votre sexe biologique afin de déterminer vos besoins caloriques');
                            return;
                        }

                        Data.getInstance().updateUser({ sexe: this.state.sexe });

                        this.props.navigation.navigate('WeightPage')
                    }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20
                        }}>
                        Suivant <FontAwesomeIcon
                        style={{color: "white",}}
                        icon={faArrowRight}/>
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default GenrePage;

var styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5
    },
});
