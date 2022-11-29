import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from './Header'
import BookDetailCard from './BookDetailCard'
import {child, getDatabase, ref, get} from "firebase/database";
import app from "../../../../firebase";
import moment from "moment/moment";

const db = getDatabase(app)
const dbRef = ref(db)

const BookingSuccess = ({navigation, route}) => {
    const [bookingData, setBookingData] = React.useState({})
    const [clinicData, setClinicData] = React.useState({})
    const [doctorData, setDoctorData] = React.useState({})
    const bookSelesaiBtnHandler = () => navigation.replace('Main')

    const getBookingData = async () => {
        // console.log("getting booking data")
        return await get(child(dbRef, `reservations/${route.params.id}`))
            .then(snapshot => snapshot.val())
            .then(data => {setBookingData(data); return data})
            .catch(err => alert("Unable to obtain data from backend!"))
    }

    const calculateQueueNumber = async data => {
        // console.log("calculating queue number", data)
        return await get(child(dbRef, `reservations`))
            .then(snapshot => snapshot.val())
            .then(bookData => {
                const bookings = Object.values(bookData)
                    ?.filter(booking => booking.clinicId === data.clinicId)
                    ?.filter(booking => booking.doctorId === data.doctorId)
                    ?.filter(booking => booking.status === "ongoing")
                    ?.sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1)

                console.log(bookings, bookData)

                return bookings?.findIndex(booking => booking.id === data.id) + 1
            })
            .then(queueNumber => {setBookingData({...data, queueNumber}); return {...data, queueNumber}})
            .catch(err => alert("Unable to calculate queue number!"))
    }

    const getClinicData = async data => {
        // console.log("getting clinic data", data)
        return await get(child(dbRef, `users/${data.clinicId}`))
            .then(snapshot => snapshot.val())
            .then(clinic => {setClinicData(clinic); return {bookingData: data, clinicData: clinic}})
            .catch(err => alert("Unable to obtain data from backend!"))
    }

    const getDoctorData = async data => {
        // console.log("getting doctor data", data)
        return await get(child(dbRef, `doctors/${data.bookingData.doctorId}`))
            .then(snapshot => snapshot.val())
            .then(doctor => setDoctorData(doctor))
            .catch(err => alert("Unable to obtain data from backend!"))
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('running navigation focus listener')
            getBookingData()
                .then(calculateQueueNumber)
                .then(getClinicData)
                .then(getDoctorData)
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <Header/>
            <ScrollView style={{
                paddingHorizontal: 25,
            }}>
                <BookDetailCard {...{bookingData, clinicData, doctorData}}/>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#6CA7FF',
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 100,
                    }}
                    onPress={bookSelesaiBtnHandler}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>
                        Selesai
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default BookingSuccess
