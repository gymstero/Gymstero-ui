import isEmpty from "lodash/isEmpty";
import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Button } from "native-base";
import { AlertDialog } from "native-base";
import { getIdToken } from "../auth/auth";
import { theme } from "../../theme/theme";

const AgendaItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState({});
  const cancelRef = useRef(null);

  const { item } = props;

  const onClose = () => setIsOpen(!isOpen);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Workout Schedule</Text>
      </View>
    );
  }

  const deleteSchedule = async (workoutId) => {
    const idToken = await getIdToken();

    fetch(`http://10.0.2.2:8080/api/workout/${workoutId}/schedule-delete`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("Workout schedule deleted", res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <View
          style={{
            backgroundColor: item.color,
            padding: 10,
            borderRadius: 5,
            marginLeft: 16,
            flex: 2,
          }}
        >
          <Text style={styles.itemTitleText}>{item.title}</Text>
        </View>
        <View style={styles.itemButtonContainer}>
          <Button
            backgroundColor={theme.colors.secondary}
            onPress={() => {
              setScheduleToDelete({
                id: item.id,
                title: item.title,
              });
              setIsOpen(!isOpen);
            }}
          >
            Delete
          </Button>
        </View>
      </TouchableOpacity>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Workout Schedule</AlertDialog.Header>
          <AlertDialog.Body>
            {`Are you sure to remove ${scheduleToDelete.title} schedule? Workout data will be kept.`}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  deleteSchedule(scheduleToDelete.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 10,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
