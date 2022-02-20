import React, {Component} from 'react';
import ProgressCircle from 'react-native-progress-circle'
import {
  Text,
  View,
} from 'react-native';
import Data from '../database/data';

class ProfilScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseCals: 0,
            todayCals: 0,
            percentage: 0,
        }
    }

    componentDidMount() {
        this.setState(
            {
                baseCals: (Data.getInstance()).getBaseCalories(),
                todayCals: (Data.getInstance()).getTodayCalories(),
                percentage: (this.todayCals/this.baseCals) * 100
            }
        )
    }

    render() {
        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center'
            }}>
                <ProgressCircle
                    percent={this.state.percentage}
                    radius={90}
                    borderWidth={12}
                    color="green"
                    shadowColor="#999"
                    bgColor="#fff"
                    style={{
                        marginTop: 50
                    }}
                >
                    <Text style={{ fontSize: 18, textAlign:'center' }}>{this.state.todayCals} / {this.state.baseCals}kcal</Text>
                </ProgressCircle>
            </View>
        );
    };
}


export default ProfilScreen;
