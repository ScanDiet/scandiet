import {Component} from "react";
import {Text, View, Dimensions, FlatList } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";class MacrosScreen extends Component {
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
                        {key: "Poids idéal", kg: "70kg"},
                        {key: "Poids d'objectif", kg: "80kg"},
                        {key: "Poids actuel", kg: "90kg"},
                    ]}
                    renderItem={({item}) => 
                        <View style={{borderWidth: 1, flexDirection: "row", justifyContent: 'space-between',alignContent:"center", paddingVertical: 20, paddingHorizontal: 10, margin: 4, borderRadius: 3, borderColor: "green"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item.key}</Text>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{item.kg}</Text>
                        </View>
                    }/>
            </View>
        )
    }
}

export default MacrosScreen;
