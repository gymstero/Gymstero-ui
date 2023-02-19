import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Button,
    VStack,
    NativeBaseProvider,
    ScrollView,
    Text
} from 'native-base';
const ChooseExerciseType= () => {
    const route = useRoute();
    const navigation = useNavigation();
    const exerciseTypesArray =['Calisthenics','Cardio','Core', 'Weight Lifting', 'skip']

    return (
        <NativeBaseProvider flex={1} bg='red'>
            <ScrollView h='80%'>
                <VStack alignItems='center' justifyContent="center" space={4}>
                    {exerciseTypesArray.length > 0 ? (
                        exerciseTypesArray.map((type, index) => (
                        <Button key = {index} onPress={() => navigation.navigate('ChooseMuscle', {eType: type, workoutId: route.params.workoutId})}>{type}</Button>
                        ))
                        
                    ) : (
                        <Text>Nothing Here Yet</Text>
                    )}
                </VStack>
            </ScrollView >
        </NativeBaseProvider>
        
    );
};

export default ChooseExerciseType;