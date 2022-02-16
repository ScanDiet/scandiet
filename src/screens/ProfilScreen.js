import React from 'react';
import ProgressCircle from 'react-native-progress-circle'
import {
  Text,
  View,
} from 'react-native';
import Data from '../database/data';

const ProfilScreen = () => {

  const baseCals = (Data.getInstance()).getBaseCalories();
  const todayCals = (Data.getInstance()).getTodayCalories();
  const percentage = (todayCals/baseCals) * 100;

  return (
    <View style={{
        backgroundColor: 'white', 
        flex: 1,
        alignItems: 'center'
      }}>
      <ProgressCircle
            percent={percentage}
            radius={90}
            borderWidth={12}
            color="green"
            shadowColor="#999"
            bgColor="#fff"
            style={{
              marginTop: 50
            }}
        >
            <Text style={{ fontSize: 18, textAlign:'center' }}>{todayCals} / {baseCals}kcal</Text>
        </ProgressCircle>
    </View> 
  );
};

export default ProfilScreen;
