/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import FavorisScreen from '../screens/FavorisScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ScanScreen from '../screens/ScanScreen';
import JournalScreen from '../screens/JournalScreen';
import RechercheScreen from '../screens/RechercheScreen';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import IonIcon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from "../components/Product";
import StartPage from "../screens/inscription/StartPage";
import GenrePage from "../screens/inscription/GenrePage";
import WeightPage from "../screens/inscription/WeightPage";
import ActivityLevelPage from "../screens/inscription/ActivityLevelPage";
import AgePage from "../screens/inscription/AgePage";
import HeightPage from "../screens/inscription/HeightPage";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerTitle: "",
            headerStyle: {
                backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{
            headerShown: false,
        }}/>
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="GenrePage" component={GenrePage} />
        <Stack.Screen name="WeightPage" component={WeightPage} />
        <Stack.Screen name="HeightPage" component={HeightPage} />
        <Stack.Screen name="ActivityLevelPage" component={ActivityLevelPage} />
        <Stack.Screen name="AgePage" component={AgePage} />
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Recherche" component={RechercheScreen} />
        </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Scan"
      backBehavior='initialRoute'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
        <BottomTab.Screen
            name="Favoris"
            component={FavorisScreen}
            options={{
                title: 'Favoris',
                tabBarIcon: ({color, size }) => (
                    <MaterialIcons name="favorite" color={color} size={size}/>
                ),
            }}
        />
        <BottomTab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
                title: 'Profil',
                tabBarIcon: ({color, size }) => (
                    <Feather name="user" color={color} size={size}/>
                ),
            }}
        />
        <BottomTab.Screen
            name="Scan"
            component={ScanScreen}
            options={{
                headerShown: false,
                title: 'Scan',
                tabBarIcon: ({color, size }) => (
                    <MaterialCommunityIcons name="barcode-scan" color={color} size={size}/>
                )
            }}
        />
        <BottomTab.Screen
            name="Journal"
            component={JournalScreen}
            options={{
                title: 'Journal',
                tabBarIcon: ({color, size }) => (
                    <MaterialCommunityIcons name="coffee-outline" color={color} size={size}/>
                ),
            }}
        />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
