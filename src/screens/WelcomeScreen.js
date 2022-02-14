import {Image, Text, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View, Button, Pressable} from "react-native";
import * as React from "react";

const WelcomeScreen = ({ navigation }) => {
    function navigateToRoot() {
        navigation.navigate('Root', {valCal: 0 })
    }

    function navigateToCreateAccount() {
        navigation.navigate('StartPage', {navigation: navigation })
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
                <TouchableHighlight style={styles.button} onPress={navigateToRoot}>
                    <Text style={styles.btext}>Se connecter</Text>
                </TouchableHighlight>
                <Pressable onPress= {navigateToCreateAccount}>
                    <Text style={styles.sText}>S'inscrire</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        backgroundColor: 'white',
        flexDirection: 'column', 
        flex: 1
    },
    header: {
        alignItems: "center",
        marginBottom: 20
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
        marginVertical: 20,
        marginHorizontal: 50
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    btext: {
        color: "white",
        fontSize: 20
    },
    iText: {
        alignSelf: 'center',
        margin: 12,
        fontSize: 13,
        color: "blue"
    },
    sText: {
        alignSelf: 'center',
        margin: 12,
        fontSize: 15,
        color: "green",
        fontWeight: 'bold'
    },
})
