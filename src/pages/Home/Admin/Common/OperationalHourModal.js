import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import timeToFormattedString from '../../../../utils/timeToFormattedString';

const OperationalHourModal = ({ callback, value }) => {
    // const [selectedDays, setSelectedDays] = React.useState([])
    const [selectedStartHour, setSelectedStartHour] = React.useState(new Date());
    const [selectedEndHour, setSelectedEndHour] = React.useState(new Date());

    const onConfirm = () => callback([selectedStartHour, selectedEndHour])

    const showTimePicker = (dt, setDt) => {
        DateTimePickerAndroid.open({
            value: dt,
            onChange: (evt, selectedDate) => setDt(selectedDate),
            mode: 'time',
            is24Hour: true,
        })
    }

    React.useEffect(() => {
        if (value && value.length > 0) {
            setSelectedStartHour(new Date(value[0]))
            setSelectedEndHour(new Date(value[1]))
        }
    }, [])

    return (
        <View style={{
            backgroundColor: 'rgb(240, 240, 240)',
            borderRadius: 20,
            width: '50%',
        }}>
            <ScrollView>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 20,
                    margin: 20,
                }}>Jam Kerja</Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        elevation: 8,
                        padding: 10,
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        marginBottom: 10,
                    }}
                    onPress={() => showTimePicker(selectedStartHour, setSelectedStartHour)}
                >
                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                    }}>
                        Mulai:
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        {timeToFormattedString(selectedStartHour)}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        elevation: 8,
                        padding: 10,
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        marginBottom: 10,
                    }}
                    onPress={() => showTimePicker(selectedEndHour, setSelectedEndHour)}
                >
                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                    }}>
                        Selesai:
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        {timeToFormattedString(selectedEndHour)}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        backgroundColor: '#6CA7FF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        margin: 20,
                    }}
                    onPress={onConfirm}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>SIMPAN</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default OperationalHourModal