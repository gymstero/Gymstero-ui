import { useNavigation } from '@react-navigation/native';

import NavBar from './NavBar';
import { NativeBaseProvider, VStack, Box, Button, HStack, Image, Text} from 'native-base';
const Dashboard = () => {
    const navigation = useNavigation();
    return(
        <NativeBaseProvider flex={1}>
            <HStack alignItems="center" marginLeft="5" w= '100%'>
                <Box w='50%' mt='5' >
                <Image source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg"
                            }} alt="Alternate Text" size="xl" />
                </Box>
                <Box w='50%' >
                    <VStack >
                        <Text w='50%' p='4'>
                            100
                        </Text>
                        <Button
                            rounded='full'
                            w='50%'
                            p='2'
                            variant="outline"
                            title="LogOut"
                        > Profile</Button>
                    </VStack>
                </Box>
                
            </HStack>
            <VStack alignItems='center'>
            
            <Box w='85%' mt='5'>
                <Button
                    rounded='full'
                    w='100%'
                    p='4'
                    onPress={() => navigation.navigate('Authentication')}>
                    Logout
                </Button>
            </Box>
            <Box w='85%' mt='5'>
                <Button
                    rounded='full'
                    w='100%'
                    p='4'>
                    Workout
                </Button>
            </Box>
            <Box w='85%' mt='5'>
                <Button
                    rounded='full'
                    w='100%'
                    p='4'
                    >
                    Schedule
                </Button>
            </Box>
            </VStack>
            <NavBar />
        </NativeBaseProvider>
    )
}

export default Dashboard;