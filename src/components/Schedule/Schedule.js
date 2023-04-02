import isEmpty from "lodash/isEmpty";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { NativeBaseProvider, Button, VStack, Text, View } from "native-base";
import AgendaItem from "./AgendaItem";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from "react-native-calendars";
import { ChevronLeftIcon, ChevronRightIcon } from "native-base";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getUser, getIdToken } from "../auth/auth";
import { theme } from "../../theme/theme";
import { customStyles } from "../../theme/customStyles";
import { ActivityIndicator } from "react-native";
import { REACT_APP_API_URL } from '../../../config';

const Schedule = () => {
  const [workoutScheduleItems, setWorkoutScheduleItems] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const marked = useRef(getMarkedDates());
  const [loading, setLoading] = useState(false);

  const calendarTheme = useRef({
    todayButtonTextColor: theme.colors.secondary,

    todayTextColor: theme.colors.secondary,
    // calendarBackground: themeColor,
    indicatorColor: theme.colors.secondary,
    textSectionTitleColor: theme.colors.primary,
    textSectionTitleDisabledColor: theme.colors.secondary,

    selectedDayTextColor: theme.colors.text,
    monthTextColor: theme.colors.primary,
    selectedDayBackgroundColor: theme.colors.secondary,
  });

  function getMarkedDates() {
    const marked = {};
    workoutScheduleItems.forEach((item) => {
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  }

  const addToCalendar = (workouts) => {
    let tempArray = [];

    if (workouts) {
      workouts.forEach((workout) => {
        if (workout.schedule) {
          workout.schedule.forEach((date) => {
            if (
              tempArray.some(
                (item) => item.title.split("T")[0] === date.split("T")[0]
              )
            ) {
              let dateFound = tempArray.find(
                (item) => item.title.split("T")[0] === date.split("T")[0]
              );

              dateFound.data.push({
                id: workout.id,
                title: workout.title,
                duration: `${workout.totalWorkoutTime}m`,
                color: theme.colors.primary,
              });
            } else {
              tempArray.push({
                title: date,
                data: [
                  {
                    id: workout.id,
                    title: workout.title,
                    duration: `${workout.totalWorkoutTime}m`,
                    color: theme.colors.primary,
                  },
                ],
              });
            }
          });
        }
      });
    }

    tempArray.sort((a, b) => a.title > b.title);
    setWorkoutScheduleItems(tempArray);
  };
  const fetchWorkoutSchedule = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();
    setLoading(true);

    fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/workout-schedule`, {
        method: 'Get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            console.info('Workout fetched', res.workoutSchedule);
            addToCalendar(res.workoutSchedule);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isFocused) {
      fetchWorkoutSchedule();
    }
  }, [isFocused]);

  const onDateChanged = useCallback((date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);
  }, []);

  const onMonthChange = useCallback(({ dateString }) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", dateString);
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <NativeBaseProvider backgroundColor={theme.colors.background}>
      <CalendarProvider
        date={new Date().toISOString()}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        theme={calendarTheme.current}
        todayBottomMargin={16}
      >
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
          theme={calendarTheme.current}
        />
        {loading ? (
          <View style={customStyles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.secondary} />
          </View>
        ) : workoutScheduleItems && workoutScheduleItems.length > 0 ? (
          <AgendaList
            sections={workoutScheduleItems}
            renderItem={renderItem}
            scrollToNextEvent
          />
        ) : (
          <View style={customStyles.loadingContainer}>
            <Text>No Workout Scheduled</Text>
          </View>
        )}
      </CalendarProvider>

      <VStack alignItems="center" justifyContent="center" margin={20}>
        <Button
          w="85%"
          rounded={"full"}
          backgroundColor={theme.colors.secondary}
          onPress={() => navigation.navigate("ScheduleWorkout")}
        >
          Schedule a Workout
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
};

export default Schedule;
