import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, TouchableOpacity  } from 'react-native';
import NavBar from './NavBar';
import { NativeBaseProvider } from 'native-base';
const Dashboard = () => {
    const navigation = useNavigation();
    return(
        <NativeBaseProvider style={styles.container}>
             <TouchableOpacity style={{ paddingVertical: 10 }}>
                <Button
                    style={styles.button}
                    title="LogOut"
                    onPress={() => navigation.navigate('Authentication')}
                />
            </TouchableOpacity>
            <NavBar />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
});
export default Dashboard;