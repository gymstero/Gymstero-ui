import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Image, HStack, Pressable, Text } from "native-base";
import exerciseMedia from "../../exerciseContent/exerciseMedia";
import { theme } from "../../theme/theme";

//place holder images
import PlaceHolderImage from "../../images/Biceps.png";

const SmallWorkoutPlanCard = ({ title, imageSources, onPress }) => {
  return (
    <Pressable style={styles.cardItem} onPress={onPress}>
      <HStack style={styles.cardBody}>
        <Text style={styles.title}>{title ? title : "WorkoutPlan Title"}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            width: 70 * (imageSources ? imageSources.length : 5) + 8,
            borderRadius: 10,
          }}
        >
          {imageSources ? (
            imageSources.map((source, index) => (
              <Image
                key={index}
                source={
                  exerciseMedia[source].picture
                    ? exerciseMedia[source].picture
                    : PlaceHolderImage
                }
                style={styles.image}
                alt="exercise image"
              />
            ))
          ) : (
            <>
              <Image source={PlaceHolderImage} style={styles.image} alt="" />
            </>
          )}
        </ScrollView>
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: theme.colors.secondary,
    //  padding: 5,
    // width: "100%",
    marginTop: 10,
  },
  cardBody: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },

  image: {
    width: 72,
    height: 70,
  },
  title: {
    // fontWeight: "bold",
    fontSize: 15,
    padding: 5,
    width: "42%",
    color: theme.colors.text,
  },
});

export default SmallWorkoutPlanCard;
