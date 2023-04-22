import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

const CameraScreen = (props) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  const [photo, setPhoto] = useState();
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <View style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.retakeCrossIcon}>
          <Entypo
            name="cross"
            size={30}
            color="white"
            onPress={() => setPhoto(undefined)}
          />
        </View>
        <View style={styles.cameraButtons}>
          <View style={styles.shareIcon}>
            <Feather
              name="share"
              size={40}
              color="white"
              style={{
                alignSelf: "flex-start",
              }}
              onPress={sharePic}
            />
          </View>
          {hasMediaLibraryPermission ? (
            <View style={styles.saveIcon}>
              <FontAwesome5
                name="save"
                size={40}
                color="white"
                onPress={savePhoto}
              />
            </View>
          ) :
          undefined}
          <View style={styles.sendIcon}>
            <FontAwesome
              name="send-o"
              size={40}
              color="white"
              onPress={() =>
                props.sendImage({
                  base64: "data:image/jpg;base64," + photo.base64,
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.dismissCrossIcon}>
        <Entypo
          name="cross"
          size={30}
          color="white"
          onPress={() => props.setOpenCamera(false)}
        />
      </View>
      <View style={styles.captureIcon}>
        <Ionicons
          name="ios-radio-button-on"
          size={100}
          color="white"
          onPress={takePic}
        />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  retakeCrossIcon: {
    bottom: 680,
    right: 10,
    alignSelf: "flex-end",
    position: "absolute",
    borderRadius: 30,
    opacity: 0.6,
    backgroundColor: "black",
  },
  dismissCrossIcon: {
    top: 10,
    right: 10,
    position: "absolute",
    borderRadius: 30,
    opacity: 0.6,
    backgroundColor: "black",
  },
  captureIcon: {
    top: 610,
    position: "absolute",
  },
  cameraButtons: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 100,
    justifyContent: "space-between",
    marginHorizontal: 50,
    borderRadius: 30,
    opacity: 0.6,
    backgroundColor: "black",
  },
  shareIcon: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 10,
  },
  saveIcon: {
    flex: 1,
    opacity: 1,
    marginVertical: 10,
  },
  sendIcon: {
    marginRight: 15,
    marginVertical: 10,
  },
});
