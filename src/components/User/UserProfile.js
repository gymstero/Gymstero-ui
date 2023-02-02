import React from 'react';
import { Pressable, Text,Center,HStack, NativeBaseProvider, VStack} from "native-base";
import UserInfo from './UserInfo';
import WorkoutInfo from './WorkoutInfo';
const UserProfile= () => {
    const [selected, setSelected] = React.useState(0);
    return( 
        <NativeBaseProvider flex={1}>
            <HStack bg="primary.600" height='60' width='100%' alignItems="center">
                <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" width='50%' onPress={() => setSelected(0)}>
                    <Center>
                        <Text color="white" fontSize="12">
                            Info
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" width='50%' flex={1} onPress={() => setSelected(1)}>
                    <Center>
                        <Text color="white" fontSize="12">
                            Workout
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
            {selected  == 0 &&(
                <VStack>
                    <UserInfo />
                </VStack>
            )}
            {selected  == 1 &&(
                <VStack>
                    <WorkoutInfo />
                </VStack>
            )}
        </NativeBaseProvider>
    );
  }


  export default UserProfile;