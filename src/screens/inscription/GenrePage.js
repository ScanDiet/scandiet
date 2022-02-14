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
            isFemaleSelected: false,
            isMaleSelected: false,
        }
    }

    genreSelected = null;
        colorFemaleIcon = "black";
        colorMaleIcon = "black";

        pressFemale = ()=> {
            if (!this.state.isFemaleSelected) {
                this.activateFemale();
                this.desactivateMale();
            }
        }


        pressMale = () => {
            if(!this.state.isMaleSelected){
                this.activateMale();
                this.desactivateFemale();
            }
        }

        activateMale = () => {
            this.colorMaleIcon = "green";
            this.setState({
                isMaleSelected:  true
            });
            this.genreSelected = "isMaleSelected";
        }

        desactivateMale = () => {
            this.colorMaleIcon = "black";
            this.setState({
                isMaleSelected:  false
            });
        }

        activateFemale = () => {
            this.colorFemaleIcon = "green";
            this.setState({
                isFemaleSelected:  true
            });
            this.genreSelected = "isFemaleSelected";
        }

        desactivateFemale = () => {
            this.colorFemaleIcon = "black";
            this.setState({
                isFemaleSelected:  false
            });
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
                    <TouchableHighlight
                        style={!this.state.isMaleSelected ? styles.btnNormal : styles.btnSelected}
                        onPress={this.pressMale}>
                        <FontAwesomeIcon
                            icon={faMale}
                            size={50}
                            color={this.colorMaleIcon}/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={!this.state.isFemaleSelected ? styles.btnNormal : styles.btnSelected}
                        onPress={this.pressFemale}>
                        <FontAwesomeIcon
                            icon={faFemale}
                            size={50}
                            color={this.colorFemaleIcon}/>
                    </TouchableHighlight>
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
                            if (this.state.isMaleSelected) {
                                Data.getInstance().updateUser({ sexe: 'male' });
                            } else if (this.state.isFemaleSelected) {
                                Data.getInstance().updateUser({ sexe: 'female' });
                            } else {
                                Alert.alert('Oups !', 'Nous avons besoin de connaitre votre sexe biologique afin de déterminer vos besoins caloriques');
                                return;
                            }

                            this.props.navigation.navigate('WeightPage', {genre:this.genreSelected})
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
    btnNormal: {
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    btnSelected: {
        margin: 10,
        padding: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5
    }
});
