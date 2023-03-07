import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  VStack,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from "native-base";
import ItemCard from "../Layout/ItemCard";
import ChestImage from "../../images/Chest.png";
import DeltoidsImage from "../../images/Deltoids.png";
import BicepsImage from "../../images/Biceps.png";
import TricepsImage from "../../images/Triceps.png";
import LegsImage from "../../images/Legs.png";
import BackImage from "../../images/Back.png";
const ChooseMuscle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const MuscleGroupArray = [
    { name: "Chest", image: ChestImage },
    { name: "Deltoids", image: DeltoidsImage },
    { name: "Biceps", image: BicepsImage },
    { name: "Triceps", image: TricepsImage },
    { name: "Legs", image: LegsImage },
    { name: "Back", image: BackImage },
  ];

  return (
      <NativeBaseProvider flex={1} bg='red'>
          <ScrollView h='80%'>
              <VStack
                  alignItems='center'
                  justifyContent='center'
                  space={4}
                  mt={5}>
                  <Text fontSize={20} fontWeight={600}>
                      Exercise Type: {route.params.eType}
                  </Text>
                  {MuscleGroupArray.length > 0 ? (
                      MuscleGroupArray.map((muscle, index) => (
                          <ItemCard
                              key={index}
                              imageSource={muscle.image}
                              title={muscle.name}
                              onPress={() =>
                                  navigation.navigate('ChooseExercise', {
                                      eType: route.params.eType,
                                      mGroup: muscle.name,
                                      workoutId: route.params.workoutId,
                                      workoutTitle: route.params.workoutTitle,
                                  })
                              }
                          />
                      ))
                  ) : (
                      <Text>Nothing Here Yet</Text>
                  )}
                  <Button
                      w='90%'
                      onPress={() =>
                          navigation.navigate('ChooseExercise', {
                              eType: route.params.eType,
                              mGroup: 'Any',
                              workoutId: route.params.workoutId,
                              workoutTitle: route.params.workoutTitle,
                          })
                      }>
                      Skip
                  </Button>
              </VStack>
          </ScrollView>
      </NativeBaseProvider>
  );
};

export default ChooseMuscle;
