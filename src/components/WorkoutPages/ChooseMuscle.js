import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  VStack,
  NativeBaseProvider,
  ScrollView,
  Text,
} from "native-base";
import ItemCard from "../Layout/ItemCard";
import ChestImage from "../../images/Chest.png";
import DeltoidsImage from "../../images/Deltoids.png";
import BicepsImage from "../../images/Biceps.png";
import TricepsImage from "../../images/Triceps.png";
import LegsImage from "../../images/Legs.png";
import BackImage from "../../images/Back.png";
import { theme } from "../../theme/theme";
import { customStyles } from "../../theme/customStyles";
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
    <NativeBaseProvider flex={1}>
      <ScrollView backgroundColor={"white"}>
        <VStack alignItems="center" space={4} mt={5}>
          <Text fontSize={20} fontWeight={600}>
            {route.params.eType} Muscle Groups
          </Text>
          {MuscleGroupArray.length > 0 ? (
            MuscleGroupArray.map((muscle, index) => (
              <ItemCard
                key={index}
                imageSource={muscle.image}
                title={muscle.name}
                onPress={() =>
                  navigation.navigate("ChooseExercise", {
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
            width={"90%"}
            backgroundColor={theme.colors.secondary}
            marginBottom={10}
            onPress={() =>
              navigation.navigate("ChooseExercise", {
                eType: route.params.eType,
                mGroup: "Any",
                workoutId: route.params.workoutId,
                workoutTitle: route.params.workoutTitle,
              })
            }
          >
            <Text color={theme.colors.text}>Skip</Text>
          </Button>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ChooseMuscle;
