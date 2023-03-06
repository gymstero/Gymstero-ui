import { useNavigation, useRoute } from "@react-navigation/native";
import {
  VStack,
  NativeBaseProvider,
  Text,
  Box,
  HStack,
  View,
} from "native-base";
import ImageButton from "../Layout/ImageButton";
import CalisthenicsImage from "../../images/Calisthenics.jpg";
import CardioImage from "../../images/Cardio.jpg";
import CoreImage from "../../images/Core.jpg";
import WeightLiftingImage from "../../images/WeightLifting.jpg";
import { theme } from "../../theme/theme";

const ChooseExerciseType = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const exerciseTypesArray = [
    { type: "Calisthenics", image: CalisthenicsImage },
    { type: "Cardio", image: CardioImage },
    { type: "Core", image: CoreImage },
    { type: "Weight Lifting", image: WeightLiftingImage },
  ];

  // Group the exerciseTypesArray into arrays of 2 items
  const exerciseTypeRows = exerciseTypesArray.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 2);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new row
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    },
    []
  );

  return (
    <NativeBaseProvider>
      <Box px={5}>
        <VStack alignItems="center" justifyContent="center" space={0} mt={90}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={theme.typography.h1}>Exercise Types</Text>
          </View>
          {exerciseTypeRows.map((exerciseTypeRow, index) => (
            <HStack space={4} key={index}>
              {exerciseTypeRow.map((exerciseType, index) => (
                <ImageButton
                  key={index}
                  imageSource={exerciseType.image}
                  text={exerciseType.type}
                  onPress={() =>
                    navigation.navigate("ChooseMuscle", {
                      eType: exerciseType.type,
                      workoutId: route.params.workoutId,
                      workoutTitle: route.params.title,
                    })
                  }
                  buttonStyle={{
                    borderRadius: 0,
                    aspectRatio: 1,
                  }}
                  textStyle={{
                    color: theme.colors.text,

                    textAlign: "center",
                    marginTop: 10,
                    position: "absolute",
                    top: "32%",
                    padding: 10,
                    fontSize: 25,
                  }}
                  imageStyle={{
                    opacity: 0.5,
                  }}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default ChooseExerciseType;
