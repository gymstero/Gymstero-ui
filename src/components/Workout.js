import React from 'react';
import { Box, NativeBaseProvider, Center, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Workout = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider style={styles.container}>
        <TouchableOpacity>
            <Center>
                <Text>
                    To Do Workout
                </Text>
            </Center>
        </TouchableOpacity>
    </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Workout;
