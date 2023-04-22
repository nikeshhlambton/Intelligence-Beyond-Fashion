import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { buttons_color, header_footer_color } from "../../utils/Colors";

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Video
        source={require("../../../assets/Fashion_Film1.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="stretch"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
       <View style={styles.overlay} />
       <View style={styles.logo}>
         <Text style={{color: "#F9F6EE", fontSize: 55, fontFamily: 'ShantellSans_ExtraBoldItalic'}}>WELCOME TO</Text>
         <Text style={{color: "#F9F6EE", fontSize: 55, fontFamily: 'ShantellSans_ExtraBoldItalic'}}> IBF </Text>
       </View>
      <View>
        <View style={styles.exploreText}>
          <Text style={{color: "#F9F6EE", fontSize: 25, fontFamily: 'ShantellSans_Medium'}}>Check The Latest Trends</Text>
        </View>
      <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('Current Trends')}>
        <Text style={{fontFamily: 'ShantellSans_Medium', color: '#6F6C6C', fontWeight: 'bold'}}>EXPLORE</Text>
      </TouchableOpacity>
      </View>
      <View>
        <View style={styles.fitText}>
          <Text style={{color: "white",  fontSize: 25, fontFamily: 'ShantellSans_Medium'}}>Find Your Fit</Text>
        </View>
      <TouchableOpacity style={styles.gettingStarted} onPress={() => navigation.navigate('Match Trends')}>
        <Text style={{fontFamily: 'ShantellSans_Medium', color: '#6F6C6C'}}>GETTING STARTED</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const deviceHeight = Math.round(Dimensions.get("window").height);

const radius = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    height: "100%",
    width: "100%",
    position: "absolute",
    // top: 0,
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'black'
  },
  logo: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: Math.round(deviceHeight / 10),
  },
  fitText: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: Math.round(deviceHeight / 1.72),
  },
  exploreText: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: Math.round(deviceHeight / 2.65),
  },
  exploreButton: {
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 30,
    borderRadius: radius,
    width: 200,
    marginVertical: Math.round(deviceHeight / 2.3),
    shadowColor: "#000",
    backgroundColor: buttons_color,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  gettingStarted: {
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 30,
    borderRadius: radius,
    width: 200,
    marginVertical: Math.round(deviceHeight / 3 + deviceHeight / 3.3),
    shadowColor: "#000",
    backgroundColor: buttons_color,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the opacity value (0.5) to your desired level
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
