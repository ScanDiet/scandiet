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
const data =  {
    "Breakfast": require('../../assets/images/breakfast.png'),
    "Lunch": require('../../assets/images/fried-rice.png'),
    "Dinner": require('../../assets/images/dinner.png'),
}
const frdata = {
    "Breakfast": "Petit Déjeuner",
    "Lunch": "Déjeuner",
    "Dinner": "Dîner",
}


const Item = ({meal, onPress}) => (
    <View style={styles.card}>
        <Image style={styles.image} source={data[meal] ? data[meal] : require('../../assets/images/lunch-box.png')}/>
        <View style={styles.content_view}>
            <Text style={styles.text}>{frdata[meal]}</Text>
            <Text style={styles.count}> {Data.getInstance().mealCalories(meal)} kcal</Text>
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
                backgroundColor:"#ffffff",
                flex: 1,
            }}>
                <View style={styles.header_container}>
                    <View style={{marginTop: 30}}>
                        <ProgressCircle
                            percent={10}
                            radius={90}
                            borderWidth={3}
                            color="green"
                            shadowColor="#FFFFFF"
                            bgColor="#fff"
                            style={{
                            }}
                        >
                            <Text style={{ fontSize: 18, textAlign:'center', color: 'green', fontWeight: 'bold'}}>{this.state.todayCals} / {this.state.baseCals}kcal</Text>
                        </ProgressCircle>
                    </View>

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
    image: {
            width:60,
            height:60,
            borderRadius:45,
            borderWidth:2,
            borderColor:"#ebf0f7"
    },
    header_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        fontSize:14,
        flex:1,
        color:"#3399ff"
    },
    main_container: {
        height: 70,
        borderColor: "#000000",
        borderWidth: 2,
        flexDirection: "row"
    },
    card:{
        shadowColor: 'green',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        backgroundColor:"white",
        padding: 10,
        flexDirection:'row',
        borderRadius:20,
    },
    text: {
        marginTop: 5,
        fontSize:23,
        flex:1,
        color:"green",
        // fontWeight:'bold'
    },
    main_text: {
        marginTop: 15,
        fontSize: 23,

    },
    flat_container: {
        flex: 2,
        marginTop: 15,
    },
    content_view: {
        flex: 4,
        marginLeft: 15
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
            right: 20,
            bottom: 25,
            backgroundColor: 'green',
            borderRadius: 30
    },

})
