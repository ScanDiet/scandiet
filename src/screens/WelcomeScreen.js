import {Image, Text, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View, Button} from "react-native";
import * as React from "react";

const WelcomeScreen = ({ navigation }) => {
    function navigateToRoot() {
        navigation.navigate('Root',{valCal: 0 })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={require("../../assets/images/logo.png")}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>Email :</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.text}>Password :</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            <View style={styles.footer}>
                <Text
                    style={styles.iText}
                >Identifiants oubliés ?</Text>
                <TouchableHighlight onPress={navigateToRoot}>
                    <View style={styles.button}>
                        <Text style={styles.btext}>Se connecter</Text>
                    </View>
                </TouchableHighlight>
                <Text
                    style={styles.iText}
                >S'inscrire</Text>

            </View>
        </View>
    )
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
    },
    header: {
        alignItems: "center",
        marginBottom: 50
    },
    body: {
        padding: 20
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        margin: 12,
        fontSize: 20,
        color: "green"
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 9,
        borderColor: "green"

    },
    footer: {
        margin: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 19
    },
    btext: {
        color: "white",
        fontSize: 20
    },
    iText: {
        alignSelf: 'center',
        margin: 12,
        fontSize: 12,
        color: "blue"
    }
})
