import React, { useEffect, useState, useCallback, useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Button,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";

import { Entypo, Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Colors, { buttons_color, header_footer_color } from "../../utils/Colors";
import { Feather } from "@expo/vector-icons";
import CameraScreen from "../Camera/CameraScreen";
// import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { matchTrends as trendsArray } from "../../Data/data";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import { truncateText } from "../../utils/constants";
const cloneDeep = require('clone-deep');

const MatchTrends = (props) => {
  const [currentTrends, setCurrentTrend] = useState(trendsArray);
  const [openCamera, setOpenCamera] = useState(false);

  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const emptyHeartClicked = (trend) => {
    let TrendsData = cloneDeep(currentTrends);
    const index = TrendsData.findIndex((t) => t.id === trend.id);
    TrendsData[index]["favorite"] = true;
    setCurrentTrend(TrendsData);
    // props.setFavouritesData(TrendsData.filter((t) => t.favorite));
  };

  const fillHeartClicked = (trend) => {
    let TrendsData = cloneDeep(currentTrends);
    const index = TrendsData.findIndex((t) => t.id === trend.id);
    TrendsData[index]["favorite"] = false;
    setCurrentTrend(TrendsData);
    // props.setFavouritesData(TrendsData.filter((t) => !t.favorite));
  };

  useEffect(() => {
    if (!currentTrends.length) {
      setCurrentTrend(currentTrends);
    }
  }, [currentTrends.length]);

  const Card = (item) => (
    <View style={styles.cardOuter}>
      <View style={styles.card}>
        <ImageBackground style={styles.imageStyle} source={{ uri: item.img }} />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{truncateText(item.title, 12)}</Text>
          {/* <Text style={styles.categoryStyle}>{"categories"}</Text> */}
          <View style={styles.iconLabelStyle}>
            {item?.favorite ? (
              <AntDesign
                name="heart"
                color={header_footer_color}
                style={{ paddingHorizontal: 7 }}
                size={20}
                onPress={() => fillHeartClicked(item)}
              />
            ) : (
              <AntDesign
                name="hearto"
                color={header_footer_color}
                style={{ paddingHorizontal: 7 }}
                size={20}
                onPress={() => emptyHeartClicked(item)}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
      base64: true,
    });

    const base64 = "data:image/jpg;base64," + result.base64;

    if (!result.cancelled) {
      setImage({ base64: base64 });
      setModalVisible(false);
    }
  };

  const sendImage = (image) => {
    setImage(image);
    // console.log("IMAGE HERE>>>", image);
    setOpenCamera(false);
    setModalVisible(false);
  };

  const reset = () => {
    setImage(null);
    setCurrentTrend([]);
  };

  if (openCamera) {
    return <CameraScreen setOpenCamera={setOpenCamera} sendImage={sendImage} />;
  } else {
    return (
      <View style={styles.container}>
        {image ? (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 20,
              }}
            >
              <Foundation
                name="refresh"
                color={header_footer_color}
                style={{ paddingHorizontal: 7 }}
                size={26}
                onPress={() => reset()}
              />
              <AntDesign
                name="edit"
                color={header_footer_color}
                style={{ paddingHorizontal: 7 }}
                size={26}
                onPress={() => setModalVisible(true)}
              />
            </View>
            <View style={styles.matchCard}>
              <Image
                style={styles.matchImage}
                source={{
                  uri: image
                    ? image.base64
                    : "https://source.unsplash.com/random/700x700/?dress",
                }}
              />
              <View style={styles.infoStyle}>
                <Text style={styles.titleStyle, {fontFamily: 'ShantellSans_ExtraBoldItalic', fontSize: 20}}>{inputText}</Text>
              </View>
            </View>
            <ScrollView>
              <FlatList
                data={currentTrends}
                renderItem={({ item }) => Card(item)}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
            </ScrollView>
          </View>
        ) : (
          <View>
          <TouchableOpacity
            style={(styles.matchCard, styles.uploadImageCard)}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.matchImage}>
              <View style={styles.uploadText}>
                <Text style={styles.titleStyle}>
                  {"Capture or Upload Image.."}
                </Text>
              </View>
              <View style={styles.iconLabelStyle}></View>
            </View>
          </TouchableOpacity>
          <TextInput style={styles.input} onChangeText={(text) => setInputText(text)}/>
          </View>
        )}
        {isModalVisible ? (
          <Modal
            isVisible={isModalVisible}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationOutTiming={1000}
            animationInTiming={1000}
            style={{ marginTop: "160%" }}
          >
            <View style={styles.modal}>
              <TouchableOpacity
                style={[styles.attachmentOptions, styles.camera]}
                onPress={() => setOpenCamera(true)}
              >
                <Feather
                  name="camera"
                  size={30}
                  color={Colors.light.tint}
                  style={{ paddingRight: 30 }}
                />
                <Text style={{ fontSize: 18, color: Colors.light.tint }}>
                  Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.attachmentOptions, styles.gallery]}
                onPress={pickImage}
              >
                <Entypo
                  name="images"
                  size={30}
                  color={Colors.light.tint}
                  style={{ paddingRight: 30 }}
                />
                <Text style={{ fontSize: 18, color: Colors.light.tint }}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelButton}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 10;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "white",
    // borderRadius: "20%",
    height: 50,
    justifyContent: "center",
  },
  attachmentOptions: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
  },
  documents: {
    borderBottomWidth: 1,
  },
  scaffold: {
    borderBottomWidth: 0,
  },
  gallery: {
    borderBottomWidth: 0,
  },
  camera: {
    borderBottomWidth: 1,
  },
  modal: {
    backgroundColor: "white",
    // borderRadius: "20%",
    marginBottom: 10,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#fafafa",
    paddingBottom: 310,
    borderBottomEndRadius: 50,
  },
  row: {
    flex: 1,
    backgroundColor: "blue",
    marginVertical: 5,
  },
  uploadImageCard: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: radius,
    borderColor: header_footer_color,
    backgroundColor: "ghostwhite",
    marginHorizontal: 15,
  },
  uploadText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 80,
  },
  matchCard: {
    padding: 10,
    elevation: 9,
  },
  cardOuter: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    // height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  card: {
    // flex: 1,
    backgroundColor: "#eee",
    // borderTopLeftRadius: radius,
    // borderTopRightRadius: radius,
    // borderBottomRightRadius: radius,
    borderRadius: radius,
  },
  cardInner: {
    // flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  matchImage: {
    height: 150,
    width: "100%",
    borderRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  imageStyle: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: 'ShantellSans_Medium'
  },
  categoryStyle: {
    fontWeight: "200",
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 150,
    alignSelf: 'center',
    fontFamily: 'ShantellSans_Medium',
    marginTop: 10
  },
});

export default MatchTrends;
