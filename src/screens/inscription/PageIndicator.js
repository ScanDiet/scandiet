import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


class PageIndicator extends React.Component {
        constructor(props) {
                super(props);
        }

        render() {
                return (
                    <View
                        style={{
                                flexDirection: 'row', flexWrap: 'wrap'

                        }}>
                            <Text id="1"
                                style={[this.props.numPage === "1"? styles.selected : styles.unselected]}
                            >
                            </Text>
                            <Text id="2"
                                style={[this.props.numPage === "2"? styles.selected : styles.unselected]}
                            >
                            </Text>
                            <Text id="3"
                                style={[this.props.numPage === "3"? styles.selected : styles.unselected]}
                            >
                            </Text>
                            <Text id="4"
                                style={[this.props.numPage === "4"? styles.selected : styles.unselected]}
                            >
                            </Text>
                            <Text id="5"
                                style={[this.props.numPage === "5"? styles.selected : styles.unselected]}
                            >
                            </Text>
                            <Text
                                style={[this.props.numPage === "6"? styles.selected : styles.unselected]}r
                            >
                            </Text>
                    </View>
                )
        }
}
export default PageIndicator;

const styles = StyleSheet.create({
        selected: {
        margin: 5,
            borderRadius: 50,
            width: 10,
            height: 10,
            borderWidth: 1,
            borderColor: "green"
},
        unselected: {
                margin: 5,
                borderRadius: 50,
                width: 10,
                height: 10,
                backgroundColor: 'green',
        }
});
