import React, {Component} from 'react';
import ProgressCircle from 'react-native-progress-circle'
import {
    FlatList, StyleSheet,
    Text, TouchableOpacity,
    View, Image
} from 'react-native';
import Data from '../database/data';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Dialog from "react-native-dialog";
import Feather from "react-native-vector-icons/Feather";

const Item = ({meal, onPress}) => (
    <View style={styles.main_container}>
        <View style={styles.content_view}>
            <Text style={styles.text}>{meal}</Text>
            <Text> Vous n'avez pas encore renseigné d'aliments</Text>
        </View>
        <View style={styles.icon_view}>
            <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="arrow-right" size={40}/>
            </TouchableOpacity>
        </View>

    </View>
)

class ProfilScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            baseCals: 0,
            todayCals: 0,
            percentage: 0,
            meals: [],
            visible: false,
            newMeal: '',
        }
    }

    componentDidMount() {
        this.setState(
            {
                baseCals: (Data.getInstance()).getBaseCalories(),
                todayCals: (Data.getInstance()).getTodayCalories(),
                percentage: (this.todayCals/this.baseCals) * 100,
                meals: Data.getInstance().getAllMeals()
            }
        )

    }

    _showDialog = () => {
        this.setState({
                visible: true
            }
        )
    };

    _setNewMealValue(q) {
        this.setState({
            newMeal: q
        })
    }

    _handleCancel = () => {
        this.setState({
                visible: false
            }
        )
    };

    _handleValidate = () => {
        (Data.getInstance()).registerMeal(this.state.newMeal);
        this._handleCancel();
    };




    render() {
        const DATA = Data.getInstance().getAllMeals();
        const renderItem =  ({item}) => {
            return (
                <Item
                    meal={item}
                    onPress = {() => {this.props.navigation.navigate('Meal', {meal: item});}}
                     />
            )
        }
        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1,
            }}>
                <View style={styles.header_container}>
                    <ProgressCircle
                        percent={this.state.percentage}
                        radius={90}
                        borderWidth={8}
                        color="green"
                        shadowColor="#999"
                        bgColor="#fff"
                        style={{
                            marginTop: 50,
                        }}
                    >
                        <Text style={{ fontSize: 18, textAlign:'center' }}>{this.state.todayCals} / {this.state.baseCals}kcal</Text>
                    </ProgressCircle>
                    <Text style={styles.main_text}>Mes repas de la journée</Text>
                </View>
                <View style={styles.flat_container}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this._showDialog}
                    style={styles.touchableOpacityStyle}>
                    <Feather name="plus" color="#FFFFFF" size={25}/>
                </TouchableOpacity>

                <View>
                    <Dialog.Container visible={this.state.visible}>

                        <Dialog.Title>Créer un nouveau repas</Dialog.Title>
                        <Dialog.Input value={this.state.newMeal} onChangeText={q => this._setNewMealValue(q)} placeholder="Pause 11h"/>
                        <Dialog.Button label="Annuler" onPress={this._handleCancel}/>
                        <Dialog.Button label="Valider" onPress={this._handleValidate}/>
                    </Dialog.Container>
                </View>
            </View>
        );
    };


}


export default ProfilScreen;

const styles = StyleSheet.create({
    header_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main_container: {
        height: 70,
        borderColor: "#000000",
        borderWidth: 2,
        flexDirection: "row"
    },
    text: {
        fontSize: 30
    },
    main_text: {
        fontSize: 25
    },
    flat_container: {
        flex: 2
    },
    content_view: {
        flex: 4
    },
    icon_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableOpacityStyle: {
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 25,
            bottom: 25,
            backgroundColor: 'green',
            borderRadius: 30
    },

})
