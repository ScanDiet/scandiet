import {View, Text} from "./Themed";
import React, {Component} from "react";
import {FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import Data from "../database/data";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import {FloatingAction} from "react-native-floating-action";

const Item = ({product, onPress}) => (
    <View style={styles.main_container}>
        <Image style={styles.image2} source={product.image_url ? {uri: product.image_url} : require('../../assets/images/no-images-placeholder.png')}/>
        <View style={styles.content_view}>
            <Text style={styles.text}>{product.product_name ? product.product_name : "Nom inconnu"}</Text>
            <Text style={{fontSize:14,
                flex:1,
                color:"#3399ff"}}>  {product.nutriments["energy-kcal"]} kcal</Text>
        </View>
    </View>
)

class MealScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: undefined,
            contents: [],
        }
    }

    componentDidMount() {
        this.setState(
            {
                meal: this.props.route.params.meal,
                contents: Data.getInstance().getMealContents(this.props.route.params.meal)
            }
        )
    }

    _handleScan() {
        this.props.navigation.navigate('Scan');
    }

    _displayMealContent() {
        const renderItem =  ({item}) => {
            return (
                <Item
                    product={item.product}
                    onPress = {() => {}}
                />
            )
        }

        if (this.state.contents.length <= 0) {
            return (
                <Text style={styles.noMeals}> Vous n'avez pas encore renseigné d'aliments</Text>
                )
        } else {
            return (
                <FlatList
                    data={this.state.contents}
                    renderItem={renderItem}
                    keyExtractor={item => item.product._id}
                />
            )
        }
    }

    render() {
        const actions = [
            {
                text: "Recherche",
                icon: require("../../assets/images/outline_search_white_48dp.png"),
                name: "bt_search",
                position: 2,
                color: 'green'
            },
            {
                text: "Scan",
                icon: require("../../assets/images/barcode-scan.png"),
                name: "bt_scan",
                position: 1,
                color: 'green'
            },
        ];
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
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={data[this.state.meal] ? data[this.state.meal] : require('../../assets/images/lunch-box.png')}/>
                    <Text style={styles.title}>
                        {frdata[this.state.meal]}
                    </Text>
                    <Text style={{color: '#3399ff'}}>
                        {Data.getInstance().mealCalories(this.state.meal)} kcal
                    </Text>
                </View>
                <View style={styles.content}>
                    {this._displayMealContent()}
                </View>

                <View style={styles.footer}>
                    <FloatingAction
                        actions={actions}
                        color={'green'}
                        showBackground={false}
                        onPressItem={name => {
                            this._handleScan()
                        }}
                    />
                </View>

            </View>
        )
    }
}

export default MealScreen;

const styles = StyleSheet.create({
    image2: {
        width:60,
        height:60,
        borderRadius:45,
        borderWidth:2,
        borderColor:"#ebf0f7",
        alignSelf: "center"
    },
    image: {
        width:100,
        height:100,
        borderRadius:45,
        borderWidth:2,
        borderColor:"#ebf0f7"
    },
    main_container: {
        shadowColor: '#000000',
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
    content_view: {
        flex: 5,
        marginLeft: 20
    },
    text: {
        marginTop: 5,
        fontSize:17,
        flex:1,
        color:"green",
    },
    icon_view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color:"green",
        marginTop: 10
    },
    content: {
        flex: 2,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noMeals:{
        fontSize: 25,
        textAlign: "center"
    },
    icon_container: {
        flexDirection: "row",
    }
})
