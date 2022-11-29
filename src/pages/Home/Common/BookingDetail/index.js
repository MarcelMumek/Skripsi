import {View, Text, ScrollView, Image, TouchableOpacity, StatusBar, Alert} from 'react-native'
import React from 'react'
import Header from '../../Common/Header'
import ThreePeopleIcon from '../../../../assets/ThreePeopleIcon.png'
import BlankUserProfileIcon from '../../../../assets/BlankUserProfileIcon.png'
import GlobalsContext from '../../../../contexts/globalsContext'
import moment from "moment";
import {getDatabase, ref, set} from "firebase/database";
import app from "../../../../firebase";

const db = getDatabase(app)
const dbRef = ref(db)

const BookingDetail = ({navigation, route}) => {
    const globalsContext = React.useContext(GlobalsContext)
    const data = route?.params?.data

    // console.log(globalsContext?.globalsData?.userInfo?.role == 'Clinic')

    const tolakBtn = () =>
        set(ref(db, `reservations/${data.bookingData.id}`), null)
            .then(() => navigation.goBack())
            .catch(err => {
                console.log(err)
                alert('Terjadi kesalahan')
            })

    const tolakBtnHandler = () =>
        Alert.alert(
            "Tolak Booking",
            "Apakah anda yakin ingin menolak booking ini?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Ya", onPress: () => tolakBtn() }
            ],
            { cancelable: false }
        )

    const selesaikanBtn = () =>
        set(ref(db, `reservations/${data.bookingData.id}`), {
            ...data.bookingData,
            status: 'done'
        })
            .then(() => navigation.goBack())
            .catch(err => {
                console.log(err)
                alert('Terjadi kesalahan')
            })

    const selesaikanBtnHandler = () =>
        Alert.alert(
            "Selesaikan Booking",
            "Apakah anda yakin ingin menyelesaikan booking ini?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Ya", onPress: () => selesaikanBtn() }
            ],
            { cancelable: false }
        )

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            globalsContext.setGlobalsData({noForceExit: true})
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            globalsContext.setGlobalsData({noForceExit: false})
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <StatusBar translucent barStyle='dark-content'/>
            <Header {...{navigation}} text='Rincian Booking'/>
            {/*<Text>BookingDetail</Text>*/}

            <ScrollView style={{
                paddingHorizontal: 25,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 15,
                }}>
                    Rincian Booking:
                </Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>
                    <Image source={ThreePeopleIcon} style={{
                        height: 60,
                        width: 60,
                        resizeMode: 'contain',
                    }}/>

                    <View style={{
                        flex: 1,
                        marginLeft: 10,
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                        }}>{data.clinicData.fullname}</Text>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                        }}>{moment(data.bookingData.date).format('DD MMMM YYYY')}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 25,
                }}>
                    <Image source={BlankUserProfileIcon} style={{
                        height: 60,
                        width: 60,
                        resizeMode: 'contain',
                        tintColor: '#6A6666',
                    }}/>

                    <View style={{
                        flex: 1,
                        marginLeft: 10,
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                        }}>{data.doctorData.name}</Text>
                        <Text style={{
                            color: 'black',
                        }}>{data.doctorData.specialization}</Text>
                        {/*<Text style={{*/}
                        {/*    color: 'black',*/}
                        {/*}}>Reservation Time</Text>*/}
                    </View>
                </View>

                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 15,
                }}>Keluhan Penyakit</Text>

                <Text style={{
                    color: '#6A6666',
                    fontWeight: '300',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#6A6666',
                    padding: 15,
                }}>
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore*/}
                    {/*et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
                    {/*aliquip ex ea commodo consequat.*/}
                    {data.bookingData.keluhan}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginTop: 30,
                    display: globalsContext?.globalsData?.userInfo?.role === 'Clinic' ? null : 'none',
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FF6C86',
                            borderRadius: 10,
                            marginRight: 30,
                            paddingVertical: 10,
                        }}
                        onPress={tolakBtnHandler}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Tolak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6CA7FF',
                            borderRadius: 10,
                            marginLeft: 10,
                        }}
                        onPress={selesaikanBtnHandler}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Selesaikan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default BookingDetail
