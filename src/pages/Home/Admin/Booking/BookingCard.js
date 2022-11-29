import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BlankUserProfileIcon from '../../../../assets/BlankUserProfileIcon.png'

const BookingCard = ({ patientName, doctorName, speciality, tolakCallback, infoCallback }) => {
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
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>
                            {patientName}
                        </Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginBottom: 10,
                        }}>
                            {doctorName}
                        </Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                        }}>
                            {speciality}
                        </Text>
                    </View>

                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',

                    }}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#6CA7FF',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 10,
                                marginRight: 15,
                            }}
                            onPress={infoCallback}
                        >
                            <Text style={{
                                color: '#6CA7FF',
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}>
                                INFORMASI
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FF6C86',
                                borderRadius: 10,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={tolakCallback}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}>
                                TOLAK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default BookingCard