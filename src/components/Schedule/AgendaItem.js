import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TouchableOpacity,
    Button,
} from 'react-native';

const AgendaItem = (props) => {
    const { item } = props;

    const buttonPressed = useCallback(() => {
        Alert.alert(item.id);
    }, []);

    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Workout Schedule</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.item}>
            <View>
                <Text style={styles.itemDurationText}>{item.duration}</Text>
            </View>
            <Text style={styles.itemTitleText}>{item.title}</Text>
            <View style={styles.itemButtonContainer}>
                <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
            </View>
        </TouchableOpacity>
    );
};

export default AgendaItem;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
    },
    itemHourText: {
        color: 'black',
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14,
    },
});
