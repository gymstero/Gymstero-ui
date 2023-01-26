import { useNavigation } from '@react-navigation/native';
import { View, Button, StyleSheet, TouchableOpacity  } from 'react-native';

const AuthOptions = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ paddingVertical: 10 }}>
                <Button
                    style={styles.button}
                    title="Sign-up"
                    onPress={() => navigation.navigate('Sign-up')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 10 }}>
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 10 }}>
                <Button
                    style={styles.button}
                    title="Gmail"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
});
export default AuthOptions;