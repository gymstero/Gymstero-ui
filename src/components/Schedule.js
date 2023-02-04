import React from 'react';
import { Box, Center, NativeBaseProvider, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Schedule = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider style={styles.container}>
            <TouchableOpacity>
                <Center>
                    <Text>
                        To Do Schedule
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

export default Schedule;
