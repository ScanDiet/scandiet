import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from "prop-types";

class ErrorScreen extends Component {

    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.header}>Oups...</Text>
                <Text style={styles.infoText}>{this.props.message}</Text>
            </View>
        );
    }
}

export default ErrorScreen;

ErrorScreen.propTypes = {
    message: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    header: {
        fontSize: 50,
    },
    infoText: {
        textAlign: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }
});
