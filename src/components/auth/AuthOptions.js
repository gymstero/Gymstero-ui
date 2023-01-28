import { useNavigation } from '@react-navigation/native';
import {
    Button,
    VStack,
    NativeBaseProvider,
    Divider,
    ScrollView
} from 'native-base';
import NavBar from '../NavBar';
const AuthOptions = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider flex={1} bg='red'>
            <ScrollView h='80%'>
                <VStack alignItems='center' justifyContent="center" mt='300' space={4}>
                        <Button 
                            rounded= "full" 
                            w='85%'
                            onPress={() => navigation.navigate('Login')}
                        >Login</Button>
                        <Button 
                            rounded= "full" 
                            w='85%'
                        >Gmail</Button>
                        <Divider w="85%" thickness="2" />
                        <Button
                            rounded= "full"  
                            w='85%'
                            variant="outline"
                            onPress={() => navigation.navigate('Sign-up')}
                        >Sign-up</Button>
                </VStack>
            </ScrollView >
            <NavBar />
        </NativeBaseProvider>
        
    );
};

export default AuthOptions;