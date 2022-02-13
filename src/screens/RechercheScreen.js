import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import ActionButton from "../components/common/ActionButton";

class RechercheScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: "",
        }
    }

    _searchTextInputChanged(text) {
        this.setState({searchedText: text})
    }

    _searchInfo() {
        this.props.navigation.navigate("Product", {barcode: this.state.searchedText, update : true});
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Code barre'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    keyboardType='number-pad'
                    clearButtonMode='always'
                />
                <ActionButton
                    title="Rechercher"
                    color="#FFDC32"
                    onPress={() => this._searchInfo()}
                />
            </View>
        );
    }
}


export default RechercheScreen;


const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        marginBottom: 10,
        height: 50,
        width: 300,
        borderColor: '#8c8c8c',
        borderWidth: 1,
        borderRadius: 100,
        textAlign: 'center',
        color: '#8c8c8c',
    },
});
