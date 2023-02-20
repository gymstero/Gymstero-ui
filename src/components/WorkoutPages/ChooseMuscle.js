import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Button,
    VStack,
    NativeBaseProvider,
    ScrollView,
    Text
} from 'native-base';
const ChooseMuscle= () => {
    const navigation = useNavigation();
    const route = useRoute();
    const MuscleGroupArray = ['Chest', 'Deltoids', 'Biceps', 'Triceps', 'Legs', 'Back',' abs', 'skip']

    return (
        <NativeBaseProvider flex={1} bg='red'>
            <ScrollView h='80%'>
                <VStack
                    alignItems='center'
                    justifyContent='center'
                    space={4}
                    mt={5}>
                    <Text fontSize={20} fontWeight={600}>
                        {route.params.eType}
                    </Text>
                    {MuscleGroupArray.length > 0 ? (
                        MuscleGroupArray.map((group, index) => (
                            <Button
                                minW={150}
                                key={index}
                                onPress={() =>
                                    navigation.navigate('ChooseExercise', {
                                        eType: route.params.eType,
                                        mGroup: group,
                                        workoutId: route.params.workoutId,
                                    })
                                }>
                                {group}
                            </Button>
                        ))
                    ) : (
                        <Text>Nothing Here Yet</Text>
                    )}
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default ChooseMuscle;