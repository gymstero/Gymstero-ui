import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";

const ItemCard = ({ imageSource, title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    width: "60%",
    height: "80%",
    resizeMode: "cover",
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ItemCard;

/**
 * 
 * import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";

const ItemCard = ({ imageSource, title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",

    width: "80%",
  },
  image: {
    width: "80%",
    height: "100%",
    resizeMode: "cover",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    padding: 100,
    backgroundColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 100,
    left: 0,
  },
});

export default ItemCard;

 * 
 */
