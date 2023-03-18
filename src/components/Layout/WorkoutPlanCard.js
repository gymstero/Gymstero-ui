import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Image, HStack } from "native-base";
import exerciseMedia from "../../exerciseContent/exerciseMedia";
import { theme } from "../../theme/theme";

//place holder images
import PlaceHolderImage from "../../images/Biceps.png";

const WorkoutPlanCard = ({ imageSources }) => {
  console.log("this is image sources \n" + JSON.stringify(imageSources));
  return (
    <View style={styles.cardItem}>
      <View style={styles.cardBody}>
        <View style={styles.imageContainer}>
          <HStack>
            {imageSources ? (
              imageSources.length < 5 ? (
                imageSources.map((source, index) => (
                  <Image
                    key={index}
                    source={
                      exerciseMedia[source].picture
                        ? exerciseMedia[source].picture
                        : PlaceHolderImage
                    }
                    style={styles.image}
                    alt=""
                  />
                ))
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {imageSources.map((source, index) => (
                    <Image
                      key={index}
                      source={
                        exerciseMedia[source].picture
                          ? exerciseMedia[source].picture
                          : PlaceHolderImage
                      }
                      style={styles.image}
                      alt=""
                    />
                  ))}
                </ScrollView>
              )
            ) : (
              <Image source={PlaceHolderImage} style={styles.image} alt="" />
            )}
          </HStack>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.colors.background,
    padding: 5,
    width: "100%",
  },
  cardBody: {
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 2,
    alignItems: "center",
    padding: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
  },
});

export default WorkoutPlanCard;
