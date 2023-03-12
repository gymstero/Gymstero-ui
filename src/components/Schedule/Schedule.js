import React, { useState, useMemo, useRef, useCallback } from "react";
import isEmpty from "lodash/isEmpty";
import times from "lodash/times";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import {
  Button,
  Heading,
  NativeBaseProvider,
  Text,
  View,
  VStack,
} from "native-base";
import AgendaItem from "./AgendaItem";
import {
  Agenda,
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import { ChevronLeftIcon, ChevronRightIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";

const themeColor = "#00AAAF";
const today = new Date().toISOString().split("T")[0];
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
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split("T")[0];
}

const agendaItems = [
  {
    title: dates[0],
    data: [{ duration: "2h", title: "Workout 1" }],
  },
  {
    title: dates[1],
    data: [
      { duration: "1h", title: "Workout 2" },
      { duration: "1h", title: "Workout 3" },
    ],
  },
  {
    title: dates[2],
    data: [
      { duration: "1h", title: "Workout 4", id: "11" },
      { duration: "1h", title: "Workout 5" },
      { duration: "1h", title: "Workout 6" },
    ],
  },
  {
    title: dates[3],
    data: [{ duration: "2h", title: "Workout 7" }],
  },
  {
    title: dates[4],
    data: [{}],
  },
];

function getMarkedDates() {
  const marked = {};

  agendaItems.forEach((item) => {
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}

const Schedule = () => {
  const navigation = useNavigation();
  const marked = useRef(getMarkedDates());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

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
      <VStack
        alignItems="center"
        justifyContent="center"
        backgroundColor={"white"}
      >
        <Button
          w="85%"
          rounded={"full"}
          backgroundColor={theme.colors.secondary}
          onPress={() =>
            navigation.navigate("ScheduleWorkout", { dummy: "dum" })
          }
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
