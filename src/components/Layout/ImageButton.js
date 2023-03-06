import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Text } from "native-base";

const ImageButton = ({
  imageSource,
  text,
  buttonStyle,
  imageStyle,
  textStyle,
  onPress,
  key,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <ImageBackground
        style={[styles.imageContainer]}
        imageStyle={[styles.image, imageStyle]}
        source={imageSource}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
    height: 120,
  },
  imageContainer: {
    backgroundColor: "black",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.6,
  },
  text: {
    color: "#FFF0EE",
    fontWeight: "bold",
    top: "35%",
    marginTop: 10,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    fontSize: 20,
    fontFamily: "Arial",
  },
};

export default ImageButton;
