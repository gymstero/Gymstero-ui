import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, VStack, Box, Button, Image, Pressable, Text, ScrollView} from 'native-base';
var image1 = require('../../images/schedule.png');
var image2 = require('../../images/workout.png');

const Dashboard = () => {
    const navigation = useNavigation();
    
    return(
        <NativeBaseProvider flex={1}>
            <VStack alignItems='center' mt='50'>
                <Box>
                    <Text>
                        Welcome, UserName
                    </Text>
                </Box>
                <Box w='85%' mt='5'>
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        variant="outline"
                        title="LogOut"
                        onPress={() => navigation.navigate('User Profile')}
                    > Profile</Button>
                </Box>
                <Box width='85%' p="12" bg='gray.300' mt='4'>
                    <ScrollView w={["200", "300"]} h="50">
                        
                    </ScrollView>
                     </Box>
                <Box w='85%' mt='4'>
                    <Pressable 
                        //rounded='full'
                        w='100%'
                        onPress={() => navigation.navigate('Schedule')}>
                             <Image source={image1} alt="Schedule Shortcut" size={70} width='100%' />
                    </Pressable>
                </Box>
                <Box w='85%' mt='4'>
                    <Pressable 
                        //rounded='full'
                        w='100%'
                        onPress={() => navigation.navigate('Workout')}>
                             <Image source={image2} alt="Create Workout short Cut" size={70} width='100%' />
                    </Pressable>
                </Box>
                <Box w='85%' mt='5'>
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        onPress={() => navigation.navigate('Authentication')}>
                        Logout
                    </Button>
                </Box>
            </VStack>
        </NativeBaseProvider>
    )
}

export default Dashboard;