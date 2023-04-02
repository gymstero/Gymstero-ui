import React, { useState, useEffect } from "react";
import { NativeBaseProvider, VStack, View } from "native-base";
import { getUser, getIdToken } from "../auth/auth";
import UpdatePanel from "./UpdatePanel";
import UserInfoPanel from "./UserInfoPanel";
import { customStyles } from "../../theme/customStyles";
import { REACT_APP_API_URL } from '../../../config';

const Setting = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();

    fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/setting`, {
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
    setUserMessage("");
    fetchUser();
  }, [editMode]);

  return (
    <NativeBaseProvider>
      <View style={customStyles.container}>
        <VStack alignItems="center">
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
              userMessage={userMessage}
              setUserMessage={setUserMessage}
            />
          )}
        </VStack>
      </View>
    </NativeBaseProvider>
  );
};

export default Setting;
