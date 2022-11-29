import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const OperationalDayModal = ({ callback, value }) => {
    const [selectedDays, setSelectedDays] = React.useState([])

    const onConfirm = () => callback(selectedDays)

    React.useEffect(() => {
        if (value)
            setSelectedDays(value)
    }, [])

    return (
        <View style={{
            backgroundColor: 'rgb(240, 240, 240)',
            borderRadius: 20,
            padding: 20,
            width: '80%',
        }}>
            <ScrollView>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 20,
                    marginBottom: 20,
                }}>Hari Operasional</Text>


                {
                    ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
                        .map((item, index) =>
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    const newSelectedDays = [...selectedDays]
                                    if (newSelectedDays.includes(index))
                                        newSelectedDays.splice(newSelectedDays.indexOf(index), 1)
                                    else
                                        newSelectedDays.push(index)

                                    newSelectedDays.sort()

                                    setSelectedDays(newSelectedDays)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    padding: 10,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                }}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: selectedDays.includes(index) ? '#6CA7FF' : '#6A6666',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {
                                        selectedDays.includes(index) ?
                                            <View style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: '#6CA7FF',
                                            }} /> : null
                                    }
                                </View>
                                <Text style={{
                                    marginLeft: 10,
                                    color: selectedDays.includes(index) ? '#6CA7FF' : '#6A6666',
                                }}>{item}</Text>
                            </TouchableOpacity>
                        )
                }

                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        backgroundColor: '#6CA7FF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        marginTop: 20,
                    }}
                    onPress={onConfirm}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>SIMPAN</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default OperationalDayModal