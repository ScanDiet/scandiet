import React from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Data from "../database/data";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Item = ({ product }) => (
<View style={styles.main_container}>
    <Image
        style={styles.image}
        source={product.image_url ? {uri: product.image_url} : require('../../assets/images/no-images-placeholder.png')}
    />
    <View style={styles.content_container}>
        <View style={styles.header_container}>
            <Text style={styles.title_text}>{product.product_name ? product.product_name : "Nom inconnu"}</Text>
        </View>
        <View style={styles.description_container}>
            <Text style={styles.quantity_text}>Quantité : {product.quantity}</Text>
            <Image
                style={styles.imageNutri}
                source={{uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + product.nutrition_grades + '.png'}}
            />
            <TouchableOpacity style={styles.info_button}>
                <MaterialIcons name="info-outline" color="#F1C40F" size={25}/>
            </TouchableOpacity>
        </View>
    </View>
</View>
);

const FavorisScreen = () => {
    const DATA = Data.getInstance().getAllFavoritesProducts();

    const _displayFavorites = () => {
        const renderItem = ({ item }) => (
            <Item product={item} />
        );
        if (DATA.length <= 0) {
            return (
                <View style={styles.noFav_container}>
                    <Image
                        style={styles.noFavImage}
                        source={require('../../assets/images/nofav.jpg')}
                    />
                    <View style={styles.texts}>
                        <Text style={{fontSize: 20, textAlign: "center", margin: 10, color: 'green'}}> PAS DE PRODUITS FAVORIS POUR L'INSTANT</Text>
                        <Text style={{fontSize: 15, textAlign: "center", padding: 10}}> Ajouter prochainement un produit en favoris avec l'étoile jaune </Text>
                    </View>

                </View>
            )
        } else {
            return (
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            )
        }
    }
  return (
    <View style={styles.container}>
        {_displayFavorites()}
    </View>
  );
};

export default FavorisScreen;

const styles = StyleSheet.create({
    main_container: {
        height: 100,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 100,
        height: 180,
        margin: 5,
        resizeMode: "contain",
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 1,
        marginTop: 4
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    description_container: {
        marginTop: 5,
        flex: 2,
        flexDirection: "row"
    },
    imageNutri: {
        height: 50,
        resizeMode: "contain",
        flex: 3
    },
    quantity_text: {
        fontStyle: 'italic',
        color: '#666666',
        flex: 3,
        marginTop: 10,
        fontSize: 17
    },
    info_button:{
        marginTop: 17,
        flex: 1
    },
    noFavImage: {
        height: 200,
        width: 200,
        resizeMode: "contain"
    },
    noFav_container: {
        justifyContent: "center",
        alignItems: "center"
    }, texts: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    }


});
