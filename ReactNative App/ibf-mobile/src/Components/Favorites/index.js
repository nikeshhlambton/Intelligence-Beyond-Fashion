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
} from "react-native";

import Colors, { header_footer_color } from "../../utils/Colors";
import * as ImagePicker from "expo-image-picker";
import { Favourites as trendsArray } from "../../Data/data";
import { truncateText } from "../../utils/constants";

const Favorites = (props) => {
  const [currentTrends, setCurrentTrend] = useState(trendsArray);
  const [openCamera, setOpenCamera] = useState(false);

  const [image, setImage] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!currentTrends.length) {
      setCurrentTrend(currentTrends);
    }
  }, [currentTrends.length]);

  const Card = (item) => (
    <View style={styles.cardOuter}>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.imageStyle} source={{ uri: item.img }} />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{truncateText(item.title, 12)}</Text>
          <Text style={styles.categoryStyle}>{item.price}</Text>
          <View style={styles.iconLabelStyle}>
            {/* <IconLabel name="ios-time" label={"deliveryTime"} color={iconColor} />
            <IconLabel name="ios-pin" label={"distance"} color={iconColor} /> */}
          </View>
        </View>
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={currentTrends}
            renderItem={({ item }) => Card(item)}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </ScrollView>
    </View>
  );
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
    borderRadius: "20%",
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
    borderRadius: "20%",
    marginBottom: 10,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#fafafa",
    paddingBottom: 82,
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
    height: 200,
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
    fontFamily: 'ShantellSans_Light'
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Favorites;
