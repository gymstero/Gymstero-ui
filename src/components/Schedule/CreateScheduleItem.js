import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute} from '@react-navigation/native';
import {DateTimePicker, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
    Button,
    VStack,
    NativeBaseProvider,
    ScrollView,
    Text,
    Select,
    Box
    , CheckIcon
} from 'native-base';
import { getUser, getIdToken } from '../auth/auth';
import RNDateTimePicker from '@react-native-community/datetimepicker';
const CreateScheduleItem= () => {
    const [service, setService] = useState();
    const [workouts, setWorkouts] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const e = {
        mode: 'date',
        value: new Date()
    }
    const displayDatePicker = () => {
        DateTimePickerAndroid.open(e)
        //return <RNDateTimePicker mode="date" value={new Date()} />
    };

    const fetchWorkouts = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workouts`, {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setWorkouts(res.workouts);
                console.info('Workout fetched', workouts);
            })
            .catch((err) => {
                console.warn(err);
            })
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <NativeBaseProvider flex={1} bg='red'>
            <ScrollView h='80%'> 
                <VStack
                    alignItems='center'
                    justifyContent='center'
                    space={4}
                    mt={5}>
                   <Button onPress={displayDatePicker}>Submit or Die</Button>
                   <Box maxW="300">
                        <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" 
                        onPress ={fetchWorkouts}/>
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        {workouts.map((workout,index) => 
                         <Select.Item label={workout.title} value={workout.id} />
                        )}
                        </Select>  
                    </Box>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateScheduleItem;