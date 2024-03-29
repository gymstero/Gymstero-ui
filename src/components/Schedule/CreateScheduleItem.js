import { REACT_APP_API_URL } from '../../../config';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Button,
    VStack,
    NativeBaseProvider,
    ScrollView,
    Text,
    Select,
    Box,
    Checkbox,
    CheckIcon,
    HStack,
} from 'native-base';
import { getUser, getIdToken } from '../auth/auth';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../../theme/theme';

const CreateScheduleItem = () => {
    const [workoutId, setWorkoutId] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [groupValues, setGroupValues] = useState([]);
    const [showEnd, setShowEnd] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dayErrorMessage, setDayErrorMessage] = useState('');
    const navigation = useNavigation();

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
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setEndDate(currentDate);
        setShowEnd(false);
    };

    const showEndPicker = () => {
        setShowEnd(true);
    };

    const fetchWorkouts = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/workouts`, {
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
            });
    };

    const addSchedule = async () => {
        let isValid = true;
        setError(false);
        setErrorMessage('');
        setDayErrorMessage('');

        if (!workoutId) {
            isValid = false;
            setError(true);
            setErrorMessage('Must choose workout');
        }

        if (!groupValues.length) {
            isValid = false;
            setError(true);
            setDayErrorMessage('Choose at least one day');
        }
        if (!isValid) {
            return;
        }

        const idToken = await getIdToken();

        fetch(`${REACT_APP_API_URL}/api/workout/${workoutId}/schedule`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                daysInWeek: groupValues,
                reminder: Reminder.Evening,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.info('Workout schedule added', res);
                navigation.navigate('ScheduleMainPage');
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
                    <Box maxW='350' mt={5}>
                        <Text fontSize={20} fontWeight={600}>
                            Choose a Workout to Schedule
                        </Text>
                        <Select
                            selectedValue={workoutId}
                            minWidth='300'
                            accessibilityLabel='Choose a Workout'
                            placeholder='Choose a Workout'
                            _selectedItem={{
                                bg: 'gray.200',

                                endIcon: (
                                    <CheckIcon
                                        size='5'
                                        onPress={fetchWorkouts}
                                        color={theme.colors.primary}
                                    />
                                ),
                            }}
                            mt={1}
                            onValueChange={(itemValue) =>
                                setWorkoutId(itemValue)
                            }>
                            {workouts.map((workout, index) => (
                                <Select.Item
                                    key={index}
                                    label={workout.title}
                                    value={workout.id}
                                />
                            ))}
                        </Select>
                        {error ? (
                            <Text color='red.500'>{errorMessage}</Text>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <HStack width={350} mt={5} justifyContent='space-evenly'>
                        <VStack>
                            <Button
                                backgroundColor={'green.700'}
                                width={120}
                                onPress={() => showStartPicker()}>
                                Add Start Date
                            </Button>
                            {showStart && (
                                <RNDateTimePicker
                                    locale='ca-EN'
                                    TestID='dateTimePicker'
                                    value={new Date()}
                                    onChange={onChangeStart}
                                    mode='date'
                                    display='default'
                                />
                            )}
                            <Text fontSize={16} alignSelf='center'>
                                {startDate.toDateString().substring(4)}
                            </Text>
                        </VStack>
                        <VStack>
                            <Button
                                //  backgroundColor={"amber.700"}
                                backgroundColor={theme.colors.primary}
                                width={120}
                                onPress={() => showEndPicker()}>
                                Add End Date
                            </Button>
                            {showEnd && (
                                <RNDateTimePicker
                                    locale='ca-EN'
                                    TestID='dateTimePicker'
                                    value={new Date()}
                                    onChange={onChangeEnd}
                                    mode='date'
                                    display='default'
                                />
                            )}
                            <Text fontSize={16} alignSelf='center'>
                                {endDate.toDateString().substring(4)}
                            </Text>
                        </VStack>
                    </HStack>
                    <Text mt={5} fontSize={20} fontWeight={600}>
                        Choose day(s):
                    </Text>
                    <Checkbox.Group
                        onChange={setGroupValues}
                        value={groupValues}
                        accessibilityLabel='choose numbers'
                        colorScheme='red'>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Sunday'>
                            Sunday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Monday'>
                            Monday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Tuesday'>
                            Tuesday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Wednesday'>
                            Wednesday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Thursday'>
                            Thursday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Friday'>
                            Friday
                        </Checkbox>
                        <Checkbox
                            accessibilityLabel='choose values'
                            value='Saturday'>
                            Saturday
                        </Checkbox>
                    </Checkbox.Group>
                    {error ? (
                        <Text color='red.500'>{dayErrorMessage}</Text>
                    ) : (
                        <></>
                    )}

                    <Button
                        backgroundColor={theme.colors.secondary}
                        width='75%'
                        onPress={() => addSchedule()}>
                        Submit
                    </Button>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateScheduleItem;
