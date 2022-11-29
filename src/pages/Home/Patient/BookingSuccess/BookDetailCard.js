import { View, Text } from 'react-native'
import React from 'react'
import moment from "moment";
import "moment/locale/id"

const BookDetailCard = ({bookingData, clinicData, doctorData}) => {
    return (
        <View style={{
            backgroundColor: '#E0ECFF',
            borderRadius: 20,
        }}>
            <Text style={{
                color: '#6A6666',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 25,
            }}>Buat Jadwal Berhasil!</Text>

            <View style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 20,
                margin: 20,
                elevation: 3,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 50,
                }}>{clinicData?.fullname}</Text>

                <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10 }} />

                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 50,
                }}>{doctorData?.name}</Text>

                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 50,
                }}>{doctorData?.specialization}</Text>

                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 50,
                }}>{moment(bookingData?.date).locale('id').format('dddd, DD MMMM YYYY')}</Text>

            </View>

            <Text style={{
                color: '#6A6666',
                fontSize: 22,
                textAlign: 'center',
                fontWeight: '300',
                marginTop: 15,
            }}>No Antrian:</Text>

            <View style={{
                backgroundColor: 'white',
                width: 100,
                height: 100,
                borderRadius: 100,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 80,
            }}>
                <Text style={{
                    color: '#6A6666',
                    fontSize: 48,
                    fontWeight: 'bold',
                }}>{bookingData.queueNumber}</Text>
            </View>
        </View>
    )
}
export default BookDetailCard
