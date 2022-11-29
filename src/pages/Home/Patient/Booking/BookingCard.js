import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import datesToFormattedString from "../../../../utils/datesToFormattedString";
import timeRangeString from "../../../../utils/timeRangeString";

const BookingCard = ({clinic, doctor, queueNumber, cancelBookingHandler}) => {
    return (
        <View style={{
            backgroundColor: '#E0ECFF',
            padding: 25,
            borderRadius: 20,
            margin: 20,
        }}>
            <Text style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>{clinic && clinic.fullname}</Text>

            <View style={{height: 1, backgroundColor: '#6A6666', marginVertical: 10}}/>

            <View style={{
                flexDirection: 'row',
            }}>
                {/* nomor antrian */}
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 99,
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#6A6666',
                        fontSize: 48,
                        fontWeight: 'bold',
                    }}>
                        {queueNumber}
                    </Text>
                </View>

                <View style={{
                    flex: 1,
                    paddingVertical: 5,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>{doctor.name}</Text>

                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '300',
                        flex: 1,
                    }}>{doctor.specialization}</Text>

                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '300',
                    }}>{datesToFormattedString(doctor.operationalDays)} :
                        {timeRangeString(doctor.operationalHours)}</Text>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                marginTop: 20,
            }}>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#6CA7FF',
                        borderRadius: 15,
                    }}
                    onPress={cancelBookingHandler}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        padding: 10,
                        paddingVertical: 15,
                    }}>
                        BATALKAN BOOKING
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={{
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                // display: queueNumber === 1 ? null : 'none',
                display: 'none',
            }}>
                Sekarang giliran anda. Silahkan datang ke klinik.
            </Text>
        </View>
    )
}

export default BookingCard
