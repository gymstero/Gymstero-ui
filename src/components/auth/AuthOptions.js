import { useNavigation } from '@react-navigation/native';
import { View, Button, StyleSheet } from 'react-native';

const AuthOptions = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                title="Sign-up"
                onPress={() => navigation.navigate('Sign-up')}
            />
            <Button
                style={styles.button}
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
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