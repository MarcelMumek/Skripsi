import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BlankUserProfileIcon from '../../../../assets/BlankUserProfileIcon.png'
import datesToFormattedString from "../../../../utils/datesToFormattedString";
import timeRangeString from "../../../../utils/timeRangeString";

const DoctorCard = ({ name, speciality, operationalDays, operationalHours, callback, actionBtnText, isDisabled }) => {
    return (
        <View style={{
            margin: 10,
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
        }}>
            {/* upper part of the card */}
            <View style={{
                flexDirection: 'row',
                opacity: isDisabled ? 0.5 : 1,
            }}>
                <Image source={BlankUserProfileIcon} style={{
                    width: 60,
                    height: null,
                    resizeMode: 'contain',
                    tintColor: 'rgb(140, 140, 140)',
                }} />

                <View style={{
                    flex: 1,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                        {name}
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 14,
                        marginBottom: 10,
                    }}>
                        {speciality}
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 14,
                    }}>
                        {/*Senin - Sabtu, 08.00 - 16.00*/}
                        {datesToFormattedString(operationalDays)}, {timeRangeString(operationalHours)}
                    </Text>
                </View>
            </View>

            {/* lower part of the card */}
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                display: isDisabled ? 'none' : null,
            }}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#6CA7FF',
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        minWidth: 80,
                    }}
                    onPress={callback}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        {actionBtnText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default DoctorCard
