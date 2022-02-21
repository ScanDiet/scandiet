import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CaloriesScreen from "./diary/CaloriesScreen";
import MacrosScreen from "./diary/MacrosScreen";
import NutrimentsScreen from "./diary/NutrimentsScreen";
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const Tab = createMaterialTopTabNavigator();
class JournalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '21-02-2022',
            cal1: 1000 + Math.random() * 200,
            cal2: 1000  + Math.random() * 200,
            calP1: Math.round(20 + Math.random() * 20) + "%",
            calP2: Math.round(20 + Math.random() * 20) + "%",
            calP3: Math.round(20 + Math.random() * 20) + "%",
            calPk1: Math.round(200 + Math.random() * 20) + "kcal",
            calPk2: Math.round(200 + Math.random() * 20) + "kcal",
            calPk3: Math.round(200 + Math.random() * 20) + "kcal",
            p1: 70 + Math.random() * 20,
            p2: Math.round(70 + Math.random() * 20)
        }
    }

    render() {
        return (
            <NavigationContainer
            independent={true}
            style={styles.container}>
                    <View style={styles.datePickerContainer}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2020"
                            maxDate="21-02-2022"
                            confirmBtnText="Confirm"
                            cancelBtnText="Annuler"
                            customStyles={{
                                dateIcon: {
                                    //display: 'none',
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    color: 'white',
                                    borderColor: 'white',
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({
                                    date: date,
                                    cal1: 1000 + Math.random() * 200,
                                    cal2: 1000  + Math.random() * 200,
                                    calP1: Math.round(20 + Math.random() * 20) + "%",
                                    calP2: Math.round(30 + Math.random() * 20) + "%",
                                    calP3: Math.round(40 + Math.random() * 20) + "%",
                                    calPk1: Math.round(200 + Math.random() * 20) + "kcal",
                                    calPk2: Math.round(300 + Math.random() * 20) + "kcal",
                                    calPk3: Math.round(400 + Math.random() * 20) + "kcal",
                                    p1: 70 + Math.random() * 20,
                                    p2: Math.round(70 + Math.random() * 20)
                                });
                            }}
                        />
                    </View>
                        <Tab.Navigator style={{flex: 11}}
                            screenOptions={{
                                tabBarActiveTintColor: 'white',
                                tabBarLabelStyle: { fontSize: 12 },
                                tabBarStyle: { backgroundColor: 'green' },
                                tabBarIndicatorStyle: {
                                    backgroundColor: 'white',
                                },
                            }}>
                                <Tab.Screen name="Calories" component={() => 
                                    <View>
                                    <LineChart
                                        data={{
                                        labels: ["Janvier", "Février"],
                                        datasets: [
                                            {
                                            data: [
                                                this.state.cal1,
                                                this.state.cal2,
                                            ]
                                            }
                                        ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        yAxisLabel=""
                                        yAxisSuffix="kcal"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                        backgroundColor: "green",
                                        backgroundGradientFrom: "green",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#ffa726"
                                        }
                                        }}
                                        bezier
                                        style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                        }}
                                    />
                    
                                    <FlatList 
                                        data={[
                                            {key: "Petit Déjeuner", percent: this.state.calP1, cals: this.state.calPk1},
                                            {key: "Déjeuner", percent: this.state.calP2, cals: this.state.calPk2},
                                            {key: "Diner", percent: this.state.calP3, cals: this.state.calPk3},
                                        ]}
                                        renderItem={({item}) => 
                                            <View style={{borderWidth: 1, flexDirection: "row", alignContent:"center", justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 10, margin: 4, borderRadius: 3, borderColor: "green"}}>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.key}</Text>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.percent}</Text>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{item.cals}</Text>
                                            </View>
                                        }/>
                                </View>
                            } />
                            <Tab.Screen name="Poids" component={() => 
                                <View>
                                    <LineChart
                                        data={{
                                        labels: ["Janvier", "Février"],
                                        datasets: [
                                            {
                                            data: [
                                                90 + Math.random() * 20,
                                                90,
                                            ]
                                            }
                                        ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        yAxisLabel=""
                                        yAxisSuffix="kg"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                        backgroundColor: "blue",
                                        backgroundGradientFrom: "blue",
                                        backgroundGradientTo: "green",
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#ffa726"
                                        }
                                        }}
                                        bezier
                                        style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                        }}
                                    />
                                    <FlatList 
                                        data={[
                                            {key: "Poids idéal", kg: this.state.p2 - 10 + "kg"},
                                            {key: "Poids d'objectif", kg: this.state.p2 - 5 + "kg"},
                                            {key: "Poids actuel", kg: this.state.p2 + "kg"},
                                        ]}
                                        renderItem={({item}) => 
                                            <View style={{borderWidth: 1, flexDirection: "row", justifyContent: 'space-between',alignContent:"center", paddingVertical: 20, paddingHorizontal: 10, margin: 4, borderRadius: 3, borderColor: "green"}}>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.key}</Text>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{item.kg}</Text>
                                            </View>
                                        }/>
                                </View>
                            } />
                        </Tab.Navigator>


            </NavigationContainer>
        );
    }
};

export default JournalScreen;

const styles = StyleSheet.create({
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        flex: 1
    }, datePickerContainer: {
        backgroundColor: 'green',
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    container: {
        flex: 1
    }

})
