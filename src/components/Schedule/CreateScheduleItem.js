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
    Box,
    Checkbox
    , CheckIcon,
    HStack
} from 'native-base';
import { getUser, getIdToken } from '../auth/auth';
import RNDateTimePicker from '@react-native-community/datetimepicker';
const CreateScheduleItem= () => {
    const [workoutId, setWorkoutId] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [showStart,setShowStart] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [groupValues, setGroupValues] = React.useState([]);
    const [showEnd,setShowEnd] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
      
      const Reminder = {
        Morning: '9am on the day',
        Noon: '12pm on the day',
        Evening: '6pm of the day',
      };
      
      const Day = {
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday',
      };

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setStartDate(currentDate);
        setShowStart(false);
      };

      const showStartPicker = () => {
        setShowStart(true);
      }

      const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setEndDate(currentDate);
        setShowEnd(false);
      };

      const showEndPicker = () => {
        setShowEnd(true);
      }


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

    const addSchedule = async () => {
      const idToken = await getIdToken();
      console.log('ADDING SCHEDULE');
      fetch(
          `http://10.0.2.2:8080/api/workout/${workoutId}/schedule`,
          {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                daysInWeek: [Day.Monday, Day.Wednesday, Day.Friday],
                reminder: Reminder.Evening,
            }),
          }
      )
          .then((res) => res.json())
          .then((res) => {
              console.info('Workout schedule added', res.body);
          })
          .catch((err) => {
              console.warn(err);
          });
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
                    <Box maxW="300">
                        <Select selectedValue={workoutId} minWidth="200" accessibilityLabel="Choose a Workout" placeholder="Choose a Workout" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" 
                        onPress ={fetchWorkouts}/>
                    }} mt={1} onValueChange={itemValue => setWorkoutId(itemValue)}>
                        {workouts.map((workout,index) => 
                         <Select.Item key={index} label={workout.title} value={workout.id} />
                        )}
                        </Select>  
                    </Box>
                   <Button onPress={()=> showStartPicker()}>Add Start Date</Button>
                   {showStart && (
                        <RNDateTimePicker 
                            TestID = 'dateTimePicker' 
                            value={new Date()}  
                            onChange={onChangeStart} 
                            mode='date'
                            display='default'
                            />
                    )}
                    <Text>{startDate.toString()}</Text>
                    <Button onPress={()=> showEndPicker()}>Add End Date</Button>
                   {showEnd && (
                        <RNDateTimePicker 
                            TestID = 'dateTimePicker' 
                            value={new Date()}  
                            onChange={onChangeEnd} 
                            mode='date'
                            display='default'
                            />
                    )}
                   
                   <Text>{endDate.toString()}</Text>
                   <Text>Choose day(s);</Text>
                    <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
                        <Checkbox accessibilityLabel="choose values" value='Sunday'>
                        Sunday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Monday'>
                        Monday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Tuesday'>
                        Tuesday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Wednesday'>
                        Wednesday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Thursday'>
                        Thursday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Friday'>
                        Friday</Checkbox>
                        <Checkbox accessibilityLabel="choose values" value='Saturday'>
                        Saturday</Checkbox>
                    </Checkbox.Group>

                    <Button onPress={()=> addSchedule()}>Submit</Button> 
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateScheduleItem;