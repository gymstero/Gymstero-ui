import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import { Button, Heading, NativeBaseProvider, Text, View, VStack } from 'native-base';
import AgendaItem from './AgendaItem';
import {
    Agenda,
    ExpandableCalendar,
    AgendaList,
    CalendarProvider,
    WeekCalendar,
} from 'react-native-calendars';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUser, getIdToken } from '../auth/auth';

const themeColor = '#00AAAF';
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
    const array = [];
    for (let index = 1; index <= numberOfDays; index++) {
        let d = Date.now();
        if (index > 8) {
            // set dates on the next month
            const newMonth = new Date(d).getMonth() + 1;
            d = new Date(d).setMonth(newMonth);
        }
        const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}
function getPastDate(numberOfDays) {
    return new Date(Date.now() - 864e5 * numberOfDays)
        .toISOString()
        .split('T')[0];
}


function getMarkedDates() {
    const marked = {};
/*
    agendaItems.forEach((item) => {
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = { marked: true };
        } else {
            marked[item.title] = { disabled: true };
        }
    });
    */
    return marked;
}

const Schedule = () => {
    const [agendaItems,setAgendaItems] = useState([{title: "2023-03-05T03:25:07.677Z", data: [{duration: '1h', title: '11' ,id : '111'}]  }]);
    const [workouts, setWorkouts] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const marked = useRef(getMarkedDates());
    const todayBtnTheme = useRef({
        todayButtonTextColor: themeColor,
    });
    
    const addToAgenda = (workouts) => {
        let temp = [{title: "2023-03-05T03:25:07.677Z", data: [{duration: '1h', title: '11' ,id : '111'}]  }];
        workouts.forEach(workout => {   
        if (workout.hasOwnProperty("schedule")) {
            workout.schedule.forEach(element => {
                let found = false;
                for( let i= 0; i < temp.length; i++) {
                    console.log('wk' ,temp[i].title.split('T')[0] , element.split('Tr')[0]);
                    if (temp[i].title.split('T')[0] == element.split('T')[0]){
                        temp[i].data.push({duration: '1h', title: workout.title ,id : workout.id});
                        found = true;
                    }
                }
                if(found == false){
                temp.push({title: element, data: [{duration: '1h', title: workout.title ,id : workout.id}]  })
                }
            });
            console.log('temp' ,temp);
            
        }
    });
    setAgendaItems(temp);
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
                console.info('Workout fetched', res.workouts);
                console.log(workouts);
            })
            .catch((err) => {
                console.warn(err);
            })
        
        
    };

    useEffect(() => {
        fetchWorkouts();
        addToAgenda(workouts);
    }, []);

    const onDateChanged = useCallback((date, updateSource) => {
        console.log(
            'ExpandableCalendarScreen onDateChanged: ',
            date,
            updateSource
        );
    }, []);

    const onMonthChange = useCallback(({ dateString }) => {
        console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
    }, []);

    const renderItem = useCallback(({ item }) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <NativeBaseProvider>
            <VStack  alignItems='center' justifyContent='center'>
                <Button w='85%' rounded={'full'} onPress={() =>
                                    navigation.navigate('ScheduleWorkout', {dummy:'dum'})}>Schedule a Workout</Button>
            </VStack>
            <CalendarProvider
                date={new Date().toISOString()}
                onDateChanged={onDateChanged}
                onMonthChange={onMonthChange}
                showTodayButton
                disabledOpacity={0.6}
                theme={todayBtnTheme.current}
                todayBottomMargin={16}>
                <ExpandableCalendar
                    disablePan
                    initialPosition={ExpandableCalendar.positions.CLOSED}
                    disableAllTouchEventsForDisabledDays
                    firstDay={1}
                    markedDates={marked.current}
                    leftArrowImageSource={ChevronLeftIcon}
                    rightArrowImageSource={ChevronRightIcon}
                    animateScroll
                    closeOnDayPress={false}
                />
                <AgendaList
                    sections={agendaItems}
                    renderItem={renderItem}
                    scrollToNextEvent
                />
            </CalendarProvider>
        </NativeBaseProvider>
    );
};

export default Schedule;
