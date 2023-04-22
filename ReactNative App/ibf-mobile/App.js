import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Home from "./src/Components/Home/index";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MatchTrends from "./src/Components/MatchTrends";
import CurrentTrends from "./src/Components/CurrentTrends";
import Favorites from "./src/Components/Favorites";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { header_footer_color } from './src/utils/Colors'; 
// const Tab = createMaterialBottomTabNavigator();

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyles = {
  headerStyle: {
    backgroundColor: header_footer_color,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const tabBarStyle = {
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 24,
  borderTopLeftRadius: 35,
  borderTopRightRadius: 35,
  backgroundColor: "#fff",
  position: "absolute",
  bottom: 0,
  padding: 10,
  width: "100%",
  height: 85,
  paddingBottom: 10,
  zIndex: 0,
};

export default function App() {

  const [fontsLoaded] = useFonts({
    ShantellSans_ExtraBoldItalic: require('./assets/Raleway/static/Raleway-BlackItalic.ttf'),
    ShantellSans_ExtraBold: require('./assets/Raleway/static/Raleway-ExtraBold.ttf'),
    ShantellSans_Regular: require('./assets/Raleway/static/Raleway-Regular.ttf'),
    ShantellSans_Medium: require('./assets/Raleway/static/Raleway-Medium.ttf'),
    ShantellSans_Light: require('./assets/Raleway/static/Raleway-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        labeled={false}
        // barStyle={{ backgroundColor: "black" }}
        // activeColor="white"
      >
        <Tab.Screen
          name="Home"
          component={Home} //Home Screen
          options={{
            ...headerStyles,
            tabBarStyle: { ...tabBarStyle },
            tabBarActiveTintColor: header_footer_color,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name="home" color={focused ? header_footer_color : color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Current Trends"
          component={CurrentTrends} // Search Screen
          options={{
            ...headerStyles,
            // headerLeft: ({tintColor}) => (
            //   <View style={{ paddingLeft: 10}}>
            //     <MaterialCommunityIcons name="arrow-left" color={tintColor} size={26} />
            //   </View>
            // ),
            tabBarStyle: { ...tabBarStyle },
            tabBarActiveTintColor: header_footer_color,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name="vector-arrange-below" color={focused ? header_footer_color : color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Match Trends"
          component={MatchTrends}
          // Notification Screen
          options={{
            ...headerStyles,
            tabBarStyle: { ...tabBarStyle },
            tabBarActiveTintColor: header_footer_color,
            tabBarIcon: ({ color, size , focused}) => (
              <FontAwesome name="gg-circle" color={focused ? header_footer_color : color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          // Notification Screen
          options={{
            ...headerStyles,
            tabBarStyle: { ...tabBarStyle },
            tabBarActiveTintColor: header_footer_color,
            tabBarIcon: ({ color, size , focused}) => (
              <MaterialCommunityIcons name="heart" color={focused ? header_footer_color : color} size={26} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Profile"
          component={ProfileScreen} // Profile Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
