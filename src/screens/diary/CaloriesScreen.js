import {Component} from "react";
import {Text, View, Dimensions, FlatList } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

class CaloriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <View>
                <LineChart
                    data={{
                    labels: ["Janvier", "Février"],
                    datasets: [
                        {
                        data: [
                            1000 + Math.random() * 200,
                            1000 + Math.random() * 200,
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
                        {key: "Petit Déjeuner", percent: "23%", cals: "230kcal"},
                        {key: "Déjeuner", percent: "64%", cals: "550kcal"},
                        {key: "Diner", percent: "100%", cals: "610kcal"},
                    ]}
                    renderItem={({item}) => 
                        <View style={{borderWidth: 1, flexDirection: "row", alignContent:"center", justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 10, margin: 4, borderRadius: 3, borderColor: "green"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.key}</Text>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.percent}</Text>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{item.cals}</Text>
                        </View>
                    }/>
            </View>
        )
    }
}

export default CaloriesScreen;
