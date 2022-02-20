import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
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

const JournalScreen = () => {
     const [date, setDate] = useState('21-02-2022');
        return (
            <NavigationContainer
            independent={true}
            style={styles.container}>
                    <View style={styles.datePickerContainer}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={date} //initial date from state
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
                                console.log("test");
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
                            <Tab.Screen name="Poids" component={MacrosScreen} />
                            <Tab.Screen name="Calories" component={CaloriesScreen} />
                        </Tab.Navigator>


            </NavigationContainer>
        );
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
