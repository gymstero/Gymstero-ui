import React, { useState, useEffect } from 'react';
import {
    NativeBaseProvider,
    VStack,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { getUser, getIdToken } from '../auth/auth';
import UpdatePanel from './UpdatePanel';
import UserInfoPanel from './UserInfoPanel';

const Setting = () => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({});
    const [userMessage, setUserMessage] = useState('');
    const [error, setError] = useState(false);

    const fetchUser = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/setting`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setUserData(res.userData);
                console.info('User data fetched', userData);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    useEffect(() => {
        setUserMessage('');
        fetchUser();
    }, [editMode]);

    return (
        <NativeBaseProvider style={styles.container}>
            <VStack alignItems='center'>
                {editMode ? (
                    <UpdatePanel
                        userData={userData}
                        setUserData={setUserData}
                        setEditMode={setEditMode}
                    />
                ) : (
                    <UserInfoPanel
                        userData={userData}
                        setEditMode={setEditMode}
                        error={error}
                        setError={setError}
                        setUserMessage={setUserMessage}
                    />
                )}
            </VStack>
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

export default Setting;
