import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Social = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider style={styles.container}>
            <TouchableOpacity></TouchableOpacity>
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

export default Social;
