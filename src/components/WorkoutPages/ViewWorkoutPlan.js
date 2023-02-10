import {  ScrollView } from "react-native";
import { NativeBaseProvider, Button, Input, Box, Heading, VStack, Center } from "native-base";
import React, { useState } from "react";
import { useNavigation,useRoute  } from "@react-navigation/native";

const ViewWorkoutPlan = () => {
  const route = useRoute();
  return (
    <NativeBaseProvider flex={1}>
      <ScrollView>
        <VStack alignItems='center' mt='50'>
          <Center width='100%' bg={"black"} >
            <Heading color={"white"}>{route.params.title}</Heading>
          </Center>
          <Box w='85%' mt='5'>
              <Button
                  rounded='full'
                  w='100%'
                  p='2'
                  variant='outline'
                  title='Profile'>
                  Add new Exercise
              </Button>
          </Box>
        </VStack>
    </ScrollView>
</NativeBaseProvider>
  );
};

const styles = {
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  createWorkoutButton: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
  },
  createWorkoutImage: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    overlayColor: "black",
  },
  addWorkoutButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
    flex: 1,
  },
  addWorkoutImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    flex: 1,
  },
  buttonText: {
    backgroundColor: "#2E2E2E",
    color: "#FFF0EE",
    fontWeight: "",
    textAlign: "center",
    marginTop: 10,
    position: "absolute",
    top: "30%",
    left: "16%",
    fontSize: 20,
  },
  recentlyOpenedWorkoutsContainer: {
    marginTop: 0,
    padding: 20,
    backgroundColor: "lightgrey",
  },
  recentlyOpenedWorkoutsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  recentlyOpenedWorkoutsList: {
    /* Add styles for the list of recently opened workouts */
  },
};

export default ViewWorkoutPlan;
