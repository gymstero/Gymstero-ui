import isEmpty from "lodash/isEmpty";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { NativeBaseProvider, Button, VStack, View } from "native-base";
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

const themeColor = "#00AAAF";
const barColourSet = [
  "#b30000",
  "#7c1158",
  "#4421af",
  "#1a53ff",
  "#0d88e6",
  "#00b7c7",
  "#5ad45a",
  "#8be04e",
  "#ebdc78",
];

const Schedule = () => {
  const [workoutScheduleItems, setWorkoutScheduleItems] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const marked = useRef(getMarkedDates());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
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
        const randomIndex = Math.floor(Math.random() * 10);
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
                color: barColourSet[randomIndex],
              });
            } else {
              tempArray.push({
                title: date,
                data: [
                  {
                    id: workout.id,
                    title: workout.title,
                    duration: `${workout.totalWorkoutTime}m`,
                    color: barColourSet[randomIndex],
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

    fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workout-schedule`, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("Workout fetched", res.workoutSchedule);
        addToCalendar(res.workoutSchedule);
      })
      .catch((err) => {
        console.warn(err);
      });
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
    <NativeBaseProvider>
      <View backgroundColor={"white"}>
        <VStack alignItems="center" justifyContent="center">
          <Button
            w="85%"
            rounded={"full"}
            backgroundColor={theme.colors.secondary}
            onPress={() => navigation.navigate("ScheduleWorkout")}
          >
            Schedule a Workout
          </Button>
        </VStack>
        <CalendarProvider
          date={new Date().toISOString()}
          onDateChanged={onDateChanged}
          onMonthChange={onMonthChange}
          showTodayButton
          disabledOpacity={0.6}
          theme={todayBtnTheme.current}
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
          />
          {workoutScheduleItems && workoutScheduleItems.length > 0 ? (
            <AgendaList
              sections={workoutScheduleItems}
              renderItem={renderItem}
              scrollToNextEvent
            />
          ) : (
            <></>
          )}
        </CalendarProvider>
      </View>
    </NativeBaseProvider>
  );
};

export default Schedule;
