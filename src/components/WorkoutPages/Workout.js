import React, { useState, useEffect } from "react";
import { View,  } from "react-native";
import { useNavigation} from "@react-navigation/native";
import { NativeBaseProvider, Pressable , HStack , Container, VStack, Flex, AddIcon, Text } from "native-base";
import WorkoutPlansList from "../../samples/WorkoutPlansFile";
import { getUser, getIdToken } from '../auth/auth';
const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]); // placeholder
  const navigation = useNavigation();
  const fetchWorkout = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();

    fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workouts`, {
        method: 'Get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
    })
        .then((res) => res.json())
        .then((res) => {
          setWorkouts(res.workouts);
          console.log(workouts)
          console.log('RES', res.workouts);
        })
        .catch((err) => {
            console.warn(err);
        });
  };

   useEffect(() => {
    fetchWorkout();
    }, []);



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
              <Pressable key={index} onPress={() => navigation.navigate('ViewWorkoutPlan', {title: workout.title})} >
              <HStack
                mt={2}
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
            </Pressable>
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
