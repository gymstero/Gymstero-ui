import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider, 
    Center,Text, Button, 
    Input, Pressable,
    FlatList,
    HStack, 
    Container
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {getIdToken } from "./auth/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Social = () => {
    const [workouts, setWorkouts] = useState([]);
    const [users, setUsers] = useState([]);
    const [display, setDisplay] = useState('users');
    const [refreshing, setRefreshing] = useState(true);
    const [input,setInput] = useState('');
    const navigation = useNavigation();
  
    const fetchWorkouts = async () => {
      const idToken = await getIdToken();
  
      fetch(`http://10.0.2.2:8080/api/workout/`, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setWorkouts(res.workouts);
          setRefreshing(false);
          console.info("Workout fetched 1", res.workouts, workouts);
        })
        .catch((err) => {
          console.warn(err);
        })
    };
    const changeDisplay = (type) =>{
      if (type != display){
        setDisplay(type);
      }
    }
    const searchWorkout = async () => {
       const idToken = await getIdToken();
  
      fetch(`http://10.0.2.2:8080/api/workout?workoutTitle=${input}`, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setWorkouts(res.workouts);
          setRefreshing(false);
          console.info("Workout fetched 1", res.workouts, workouts);
        })
        .catch((err) => {
          console.warn(err);
        })
    };
    
   
    const fetchUsers = async () => {
      const idToken = await getIdToken();
  
      fetch(`http://10.0.2.2:8080/api/user/`, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.users);
          setRefreshing(false);
          console.info("Users fetched", res.users, users);
        })
        .catch((err) => {
          console.warn(err);
        })
    };
    const searchUser = async () => {
      const idToken = await getIdToken();
      fetch(`http://10.0.2.2:8080/api/user?username=${input}`, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.users);
          setRefreshing(false);
          console.info("Users fetched", res.users, users);
        })
        .catch((err) => {
          console.warn(err);
        })
    }
    const submitInput = () => {
      if(display == 'users' ) {
        searchUser();
      }
      else if( display == 'workouts'){
        searchWorkout();
      }
    }
    const cancelSearch = () => {
      setInput('');
      if(display == 'users' ) {
        fetchUsers();
      }
      else if( display == 'workouts'){
        fetchWorkouts();
      }
    }
    useEffect(() => {
      fetchWorkouts();
      fetchUsers();
    }, [refreshing]);
  
    return (
        <NativeBaseProvider style={styles.container}>
        <TouchableOpacity>
            <Center>
                <Button onPress={() =>changeDisplay('users')}>Users</Button>
                <Button onPress={() =>changeDisplay('workouts')}>Workouts</Button>
                <Input  
                  onChangeText={(text) =>{
                    setInput(text)
                    console.log(text);
                  }
                  }
                  placeholder="Enter User or Workout name..."
                  value={input}
                />
                <Button onPress={() => submitInput()}>Search</Button>
                {input && input.length > 0 ? (
                  <Button  onPress={() => cancelSearch()}>Cancel</Button>
                ): (<></>)}
                {workouts && display == 'workouts' && workouts.length > 0 ? (
                  <FlatList
                    data={workouts}
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    onRefresh={fetchWorkouts}
                    renderItem={({ item }) => (
                      <Pressable>
                        <HStack mt={2}>
                          <MaterialCommunityIcons
                            name="circle"
                            color="gray.100"
                            size={40}
                          />
                          <Container w="80%" ml={2} my="auto">
                            <Text fontSize={18}>{item.title}</Text>
                          </Container>        
                        </HStack>
                      </Pressable>
                    )}
                  />
                ) : (
                  <></>
                )}
                 {users && display == 'users' && users.length > 0 ? (
                  <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    onRefresh={fetchUsers}
                    renderItem={({ item }) => (
                      <Pressable>
                        <HStack mt={2}>
                          <MaterialCommunityIcons
                            name="circle"
                            color="gray.100"
                            size={40}
                          />
                          <Container w="80%" ml={2} my="auto">
                            <Text fontSize={18}>{item.username}</Text>
                          </Container>
                        
                        </HStack>
                      </Pressable>
                    )}
                  />
                ) : (
                  <></>
                )}
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

export default Social;
