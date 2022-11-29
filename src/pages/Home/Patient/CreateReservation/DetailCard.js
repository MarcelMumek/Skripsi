import { View, Text, Image } from 'react-native'
import React from 'react'
import BlankUserProfileIcon from '../../../../assets/BlankUserProfileIcon.png'

const DetailCard = ({clinicData, doctorData}) => {
    return (
        <View style={{
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: '#E0ECFF',
            borderRadius: 20,
        }}>
            <Text style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
            }}>
                Lokasi {'&'} Jadwal Praktik
            </Text>

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <View style={{
                    width: 80,
                    height: 80,
                }}>
                    <Image source={BlankUserProfileIcon} style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'contain',
                        tintColor: 'rgb(140, 140, 140)',
                    }} />
                </View>

                <View style={{
                    flex: 1,
                    marginLeft: 10,
                    justifyContent: 'space-around',
                    paddingVertical: '3%',
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>
                        {clinicData?.fullname}
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>
                        {doctorData?.name}
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 14,
                    }}>
                        {doctorData?.specialization}
                    </Text>
                </View>
            </View>
        </View>
    )
}


export default DetailCard