import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, Modal, TextInput } from 'react-native';
import ActionButton from "../components/common/ActionButton";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

function ScanScreen({navigation}) {

    const [hasPermission, setHasPermission] = useState(false);
    const [canScan, setCanScan] = useState(undefined);
    const [hideIcons, setHideIcons] = useState(false);
    const [scanButtonColor, setScanButtonColor] = useState('white');
    const isFocused = useIsFocused();

    const handleBarCodeScanned = ({ type, data }) => {
        if (canScan) {
            setCanScan(false);
            setHideIcons(false);
            setScanButtonColor('white');
            navigation.navigate('Product', {barcode: data, update : true});
        }
    }

    useEffect(() => {(async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const scanButtonPressed = (pressed) => {
        setCanScan(pressed);
        setHideIcons(pressed);

        if (pressed) {
            setScanButtonColor('red');
        } else {
            setScanButtonColor('white');
        }
    };

    const searchProduct = () => {
        navigation.navigate('Search');
    };

    return (isFocused && hasPermission) && (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, {backgroundColor: 'white'}]}
            />

            { hideIcons ? undefined : <TouchableHighlight
                onPress={searchProduct}
                style={{
                    backgroundColor: 'transparent',
                    position:'absolute',
                    justifyContent: 'center', 
                    borderWidth: 3,
                    borderColor: 'white',
                    top: 1,
                    left: 1,
                    width: 60, 
                    height: 60, 
                    marginLeft: 35,
                    marginTop: 10,
                    borderRadius: 100
                }}>
                    <IonIcon name="search-outline" color={'white'} size={30} style={{
                            alignSelf: 'center',
                            fontWeight: 'bold'
                        }}/>
                </TouchableHighlight>
            }

            { !hideIcons ? undefined : 
                <Text style={{
                    textAlign: 'center', 
                    color: 'white', 
                    alignSelf: 'center',
                    position:'absolute', 
                    fontWeight: 'bold',
                    top: 1,
                    marginTop: 30,
                    fontSize: 20
                }}>
                    Scan en cours...
                </Text>
            }

 
            <TouchableWithoutFeedback
                onPressIn={() => scanButtonPressed(true)}
                onPressOut={() => scanButtonPressed(false)}
            >
                <View style={{
                    backgroundColor: 'transparent',  
                    position:'absolute', 
                    alignSelf: 'center', 
                    justifyContent: 'center',
                    bottom: 1, 
                    marginBottom: 30, 
                    padding: 10, 
                    width: 100, 
                    height: 100, 
                    borderColor: scanButtonColor, 
                    borderWidth: 5, 
                    borderRadius: 100
                }} >
                    <Text style={{
                        textAlign: 'center', 
                        color: 'white', 
                        alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>Maintenir</Text>
                </View>
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ScanScreen;
