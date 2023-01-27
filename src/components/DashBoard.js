import { useNavigation } from '@react-navigation/native';
import { View, Button, StyleSheet, TouchableOpacity  } from 'react-native';

const Dashboard = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
             <TouchableOpacity style={{ paddingVertical: 10 }}>
                <Button
                    style={styles.button}
                    title="LogOut"
                    onPress={() => navigation.navigate('Authentication')}
                />
            </TouchableOpacity>
        </View>
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