import React, {Component} from "react";
import {View, Text} from "./Themed";
import Loader from './common/Loader'
import {StatusBar} from "expo-status-bar";
import {Platform, ScrollView, Image, StyleSheet, Button, TouchableHighlight, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker"
import ErrorScreen from "./common/Error";
import Dialog from "react-native-dialog";
import {getProductInfoFromApi, parseProductInfo} from "../api/offApi";
class ProductScreen extends Component {

        constructor(props) {
        super(props);
        this.state = {
            product: undefined,
            isLoading: true,
            isConnected: true,
            visible: false,
            selectedValue: ""
        }
    }

    componentDidMount() {
        const barcode = this.props.route.params.barcode;
        getProductInfoFromApi(barcode)
            .then(rawJson => {
                return parseProductInfo(rawJson, barcode)
            })
            .then(data => {
                this.setState({
                    product: data,
                    isLoading: false
                });
            })
            .catch((error) =>
                this.setState({isConnected: false, isLoading: false})
            );
    }

    _showDialog = () => {
         this.setState({
             visible: true
             }
         )
    };

    _handleCancel = () => {
        this.setState({
                visible: false
            }
        )
    };

    _handleValidate = () => {
        this.props.navigation.goBack();
    };

    static _parseIngredientWithAllergens(ingredientsWithAllergens) {
        if (!ingredientsWithAllergens) {
            return (<Text style={styles.defaultText}>Non renseigné</Text>)
        } else {
            const splitedIngredients = ingredientsWithAllergens.split(/<span class=\"allergen\">|<\/span>/);

            return (
                <Text style={styles.defaultText}>
                    {splitedIngredients.map((value, index) => {
                        if (index % 2 === 1) {
                            return (
                                <Text style={{fontWeight: 'bold'}} key={index}>{value}</Text>
                            )
                        } else {
                            return (
                                <Text key={index}>{value}</Text>
                            )
                        }
                    })}
                </Text>
            )
        }
    }

    static _parseAllergens(allergens) {
        if (!allergens) {
            return (<View></View>);
        } else {
            return (
                <View>
                    <Text style={styles.titleText}>Allergènes</Text>
                    <Text style={styles.defaultText}>{allergens}</Text>
                </View>
            )
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <Loader/>
            )
        }
    }

    _setSelectedValue(itemValue) {
        this.setState({
                selectedValue: itemValue
            }
        )
    }

    _displayProductInfo() {

        const {product, isLoading, isConnected} = this.state;

        if (!isLoading) {
            if (product && Object.keys(product).length > 0) {
                return (
                    <ScrollView style={styles.scrollviewContainer}>
                        <View style={styles.headerContainer}>
                            <Image
                                style={styles.imageProduct}
                                source={product.image_url ? {uri: product.image_url} : require('../../assets/images/no-images-placeholder.png')}
                            />
                            <View style={styles.headerDescription}>
                                <Text
                                    style={styles.productNameText}>{product.product_name ? product.product_name : "Nom inconnu"}</Text>
                                <Text style={styles.defaultText}>Quantité
                                    : {product.quantity ? product.quantity : "Non renseignée"}</Text>
                                <Text style={styles.defaultText}>Marque
                                    : {product.brands ? product.brands.split(",").map(m => m.trim()).join(", ") : "Non renseignée"}</Text>
                                <Text style={styles.descriptionText}>Code barre : {product._id}</Text>
                            </View>
                        </View>
                        <Image
                            style={styles.imageNutri}
                            source={{uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + product.nutrition_grades + '.png'}}
                        />
                        <Text style={styles.titleText}>Catégories</Text>

                        <Text
                            style={styles.defaultText}>{product.categories ? product.categories : "Non renseigné"}
                        </Text>

                        <Text style={styles.titleText}>Ingrédients</Text>

                        {ProductScreen._parseIngredientWithAllergens(product.ingredients)}

                        {ProductScreen._parseAllergens(product.allergens)}

                        <View style={styles.bottomView}>
                            <TouchableHighlight style={[styles.button, {backgroundColor: 'red'}]} onPress={()=> this.props.navigation.goBack()}>
                                <Text style={styles.buttonLabel}>Annuler</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.button} onPress={this._showDialog}>
                                <Text style={styles.buttonLabel}>Enregistrer</Text>
                            </TouchableHighlight>
                        </View>

                        <Dialog.Container visible={this.state.visible}>

                            <Dialog.Title>Ajout de produit</Dialog.Title>
                            <Text style={styles.dialogLabel}> Entrer la quantité </Text>
                            <Dialog.Input placeholder="Quantité (g)"/>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.selectedValue}
                                onValueChange={(itemValue, itemIndex) => this._setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Petit Déjeuner" value="java" />
                                <Picker.Item label="Déjeuner" value="js" />
                                <Picker.Item label="Dîner" value="js" />
                            </Picker>
                            <Dialog.Button label="Annuler" onPress={this._handleCancel}/>
                            <Dialog.Button label="Valider" onPress={this._handleValidate}/>
                        </Dialog.Container>


                    </ScrollView>

                )
            } else if (isConnected) {
                return (
                    <ErrorScreen message="Nous n'avons pas trouvé les informations de ce produit :/"/>
                );
            } else {
                return (
                    <ErrorScreen message="Pas de connexion internet..."/>
                );
            }
        }
    }

   render() {
       return (
           <View style={styles.container}>
               {this._displayLoading()}
               {this._displayProductInfo()}
               {/* Use a light status bar on iOS to account for the black space above the modal */}
               <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
       </View>
   )
   }
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    scrollviewContainer: {
        flex: 1,
        flexDirection: "column"
    },
    headerContainer: {
        flexDirection: "row",
    },
    imageProduct: {
        flex: 1,
        margin: 5,
        resizeMode: 'contain',
    },
    imageNutri: {
        height: 80,
        marginTop: 5,
        marginBottom: 10,
        resizeMode: "contain",
    },
    headerDescription: {
        flex: 1,
    },
    productNameText: {
        fontWeight: 'bold',
        fontSize: 30,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'left'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        color: '#000000',
        textAlign: 'left'
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    defaultText: {
        marginLeft: 5,
        marginRight: 5,
    },
    cartButton: {
        marginLeft: 15,
        marginRight: 15,
    },
    borderTop: {
        borderTopColor: '#d8d8d8',
        borderTopWidth: 1,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "green",
        alignSelf: 'center',
        marginHorizontal: "5%",
        marginTop: 20,
        textAlign: "center",
    },
    buttonLabel: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: "500",
        color: "white",
    },
    bottomView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center'
    },
    dialogLabel: {
        margin: 13,
        marginLeft: 20
    },
    picker: {

    }
});


