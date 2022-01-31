import * as React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import PageIndicator from "./PageIndicator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';


class ActivityLevelPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSedentaireSelected: false,
            isFaiblementActifSelected: false,
            isActifSelected: false,
            isSportifSelected: false,
        }
    }

    activityLevel = null;

    colorSedentaire = "black";
    colorFaiblementActif = "black";
    colorActif = "black";
    colorSportif = "black";

    pressSedentaire = ()=> {
        if (!this.state.isSedentaireSelected) {
            this.activateSedentaire();
            this.desactivateFaiblementActif();
            this.desactivateActif();
            this.desactivateSportif();
        }
    }


    pressFaiblementActif = () => {
        if(!this.state.isFaiblementActifSelected){
            this.activateFaiblementActif();
            this.desactivateSedentaire();
            this.desactivateActif();
            this.desactivateSportif();
        }
    }

    pressActif = ()=> {
        if (!this.state.isActifSelected) {
            this.activateActif();
            this.desactivateSedentaire();
            this.desactivateFaiblementActif();
            this.desactivateSportif();
        }
    }


    pressSportif = () => {
        if(!this.state.isSportifSelected){
            this.activateSportif();
            this.desactivateSedentaire();
            this.desactivateFaiblementActif();
            this.desactivateActif();
        }
    }

    activateSedentaire = () => {
        this.colorSedentaire = "green";
        this.setState({
            isSedentaireSelected:  true
        });
        this.activityLevel = "isSedentaireSelected";
    }

    desactivateSedentaire = () => {
        this.colorSedentaire = "black";
        this.setState({
            isSedentaireSelected:  false
        });
    }

    activateFaiblementActif = () => {
        this.colorFaiblementActif = "green";
        this.setState({
            isFaiblementActifSelected:  true
        });
        this.activityLevel = "isFaiblementActifSelected";
    }

    desactivateFaiblementActif = () => {
        this.colorFaiblementActif = "black";
        this.setState({
            isFaiblementActifSelected:  false
        });
    }

    activateActif = () => {
        this.colorActif = "green";
        this.setState({
            isActifSelected:  true
        });
        this.activityLevel = "isActifSelected";
    }

    desactivateActif = () => {
        this.colorActif = "black";
        this.setState({
            isActifSelected:  false
        });
    }

    activateSportif = () => {
        this.colorSportif = "green";
        this.setState({
            isSportifSelected:  true
        });
        this.activityLevel = "isSportifSelected";
    }

    desactivateSportif = () => {
        this.colorSportif = "black";
        this.setState({
            isSportifSelected:  false
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
                <PageIndicator numPage="5"/>
                <Text
                    style={{
                        textAlign: 'center',
                        margin: 20,
                        fontSize: 25
                    }}>
                    Quel est votre niveau d'activité? </Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    style={!this.state.isSedentaireSelected ? styles.btnNormal : styles.btnSelected}
                    onPress={this.pressSedentaire}>
                    <View>
                    <Text style={[
                        styles.titleBtn, {color: this.colorSedentaire}]
                    }>Sédentaire</Text>
                    <Text
                    style={{
                        color: this.colorSedentaire
                    }}>Les activités quotidiennes nécessitent un effort minimal comme le repos, le travail de bureau ou la conduite.</Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    style={!this.state.isFaiblementActifSelected ? styles.btnNormal : styles.btnSelected}
                    onPress={this.pressFaiblementActif}>
                    <View>
                    <Text style={[
                        styles.titleBtn, {color: this.colorFaiblementActif}]}>Faiblement actif</Text>
                    <Text
                        style={{
                            color: this.colorFaiblementActif
                        }}>Les activités quotidiennes nécessitent des efforts tels que des périodes de station debout, des travaux ménagers ou des exercices légers.</Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    style={!this.state.isActifSelected ? styles.btnNormal : styles.btnSelected}
                    onPress={this.pressActif}>
                    <View>
                    <Text style={[
                        styles.titleBtn, {color: this.colorActif}]}>Actif</Text>
                    <Text
                        style={{
                            color: this.colorActif
                        }}>Les activités quotidiennes nécessitent un effort raisonnable comme la station debout, le travail physique ou l'exercice modéré régulier.</Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    style={!this.state.isSportifSelected ? styles.btnNormal : styles.btnSelected}
                    onPress={this.pressSportif}>
                    <View>
                    <Text style={[
                        styles.titleBtn, {color: this.colorSportif}]}>Sportif</Text>
                    <Text
                        style={{
                            color: this.colorSportif
                        }}>Les activités quotidiennes nécessitent un effort physique tel que des travaux de construction ou un exercice vigoureux régulier.</Text>
                    </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    style={{
                        backgroundColor: "green",
                        padding: 20,
                    }}
                    onPress={() => {if(this.state.isSedentaireSelected || this.state.isFaiblementActifSelected || this.state.isActifSelected || this.state.isSportifSelected){this.props.navigation.navigate('AgePage', {genre:this.props.route.params.genre, weight:this.props.route.params.weight, height:this.props.route.params.height, activityLevel:this.activityLevel})}}}>
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
export default ActivityLevelPage;

var styles = StyleSheet.create({
    titleBtn:{
        fontWeight: "bold",
        fontSize: 20
    },
    btnNormal: {
       flex: 1,
        marginRight: 10,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    btnSelected: {
        flex: 1,
        marginRight: 10,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
        padding: 5,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5
    }
});
