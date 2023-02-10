import React, { useState } from "react";
import { View,  } from "react-native";
import { useNavigation} from "@react-navigation/native";
import { NativeBaseProvider, Pressable , HStack , Container, VStack, Flex, AddIcon, Text } from "native-base";
import WorkoutPlansList from "../../samples/WorkoutPlansFile";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState(WorkoutPlansList);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
          <Pressable
            activeOpacity={0.7}
            style={styles.addButton}
            onPress={() => navigation.navigate('AddWorkoutPlan')}
            mt='2'
          >
            <Text style={styles.addButtonText}>ADD WORKOUT PLAN</Text>
          </Pressable>
        {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <HStack
                mt={2}
                key={index}
                style={{
                    borderColor: 'gray.100',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                }}>
                <Container w={5} bg='gray.300' />
                <VStack w='90%' ml={2} py={2} px={3} space={2}>
                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        borderBottomWidth={0.5}>
                        <Text fontSize={18} fontWeight={600}>
                            {workout.title}
                        </Text>
                        <AddIcon size='lg' />
                    </Flex>
                    <Text> {workout.date}</Text>
                </VStack>
            </HStack>
            ))
          ) : (
            <Text style={styles.title}>Nothing Here Yet</Text>
          )}
      </View>
      
      
    </NativeBaseProvider>
  );
};

const styles = {
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "",
    marginBottom: 20,
  },
  workout: {
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#050D13",
    width: "100%",
    height: 60,
    borderRadius: 2,
    padding: 20,
  },
  addButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#050D13",
    width: "100%",
    height: 60,
    borderRadius: 2,
    padding: 20,
  },
  addButtonText: {
    alignItems: "center",
    color: "#FFF0EE",
    fontWeight: "",
  },
};

export default WorkoutPage;
