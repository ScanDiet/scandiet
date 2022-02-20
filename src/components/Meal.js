import {View, Text} from "./Themed";
import React, {Component} from "react";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import Data from "../database/data";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import {FloatingAction} from "react-native-floating-action";

const Item = ({product, onPress}) => (
    <View style={styles.main_container}>
        <View style={styles.content_view}>
            <Text style={styles.text}>{product.product_name ? product.product_name : "Nom inconnu"}</Text>
            <Text style={{fontSize: 16}}>  46 kcal</Text>
        </View>
        <View style={styles.icon_view}>
            <TouchableOpacity onPress={onPress}>
                <Feather name="edit" size={25}/>
            </TouchableOpacity>
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
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {this.state.meal}
                    </Text>
                    <Text>
                        0 kcal
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
    main_container: {
        flex: 1,
        flexDirection: "row",
        height: 70,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10
    },
    content_view: {
        flex: 5,
    },
    text: {
        fontSize : 20
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
        fontSize: 30
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
