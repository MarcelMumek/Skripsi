import {View, Text, ScrollView, StatusBar, Alert} from 'react-native'
import React from 'react'
import BookingCard from './BookingCard'
import {getDatabase, ref, get, child, set, onValue} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";
import moment from "moment";
import booking from "../../Admin/Booking";

const db = getDatabase(app)
const dbRef = ref(db)

const Booking = ({navigation}) => {
    const [bookingData, setBookingData] = React.useState(null)
    const [clinicData, setClinicData] = React.useState({})
    const [doctorData, setDoctorData] = React.useState({})
    const globalsDataContext = React.useContext(GlobalsContext)

    const cancelBooking = () =>
        set(ref(db, `reservations/${bookingData.data.id}`), null).then(() =>
            getBookingData()
                .then(getClinicData)
                .then(getDoctorData)
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        )

    const cancelBookingHandler = () => {
        Alert.alert(
            "Batalkan Booking",
            "Apakah anda yakin ingin membatalkan booking ini?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Aborted"),
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: () => cancelBooking(),
                    style: "destructive",
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Aborted"),
            },
        )
    }

    const getBookingData = async () => {
        try {
            const allBookings = (await get(child(dbRef, 'reservations'))).val()

            if(!allBookings) {
                setBookingData(null)
                return null
            }

            //filter bookings to only by the current user
            const userBookings = Object.values(allBookings)
                .filter(booking =>
                    booking.userId === globalsDataContext.globalsData.userInfo.id &&
                    booking.status === "ongoing"
                )
                .sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1)

            //if no bookings or the first booking is not ongoing
            if (userBookings.length < 1 || userBookings[0].status !== "ongoing") {
                setBookingData(null)
                return null
            }

            //calculate queue number
            const queueNumber = Object.values(allBookings)
                .filter(booking =>
                    booking.clinicId === userBookings[0].clinicId &&
                    booking.doctorId === userBookings[0].doctorId &&
                    booking.status === "ongoing"
                )
                .sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1)
                .findIndex(booking => booking.id === userBookings[0].id) + 1

            console.log(userBookings)

            setBookingData({data: userBookings[0], queueNumber})
            return userBookings[0]
        } catch (error) {
            console.log("getBookingData error: ", error)
            throw error
        }
    }

    const getClinicData = async data => {
        try {
            if (!data)
                return null

            return await get(child(dbRef, `users/${data.clinicId}`))
                .then(snapshot => snapshot.val())
                .then(clinic => {
                    setClinicData(clinic)
                    return {clinic, booking: data}
                })
        } catch (error) {
            console.log("getClinicData error: ", error)
            throw error
        }
    }

    const getDoctorData = async data => {
        try {
            if (!data)
                return null

            return await get(child(dbRef, `doctors/${data.booking.doctorId}`))
                .then(snapshot => snapshot.val())
                .then(doctor => {
                    setDoctorData(doctor)
                })
        } catch (error) {
            console.log("getDoctorData error: ", error)
            throw error
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () =>
            getBookingData()
                .then(getClinicData)
                .then(getDoctorData)
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        )

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log("Running Interval...")

            getBookingData()
                .then(getClinicData)
                .then(getDoctorData)
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        }, 3000)

        const unsubscribe = navigation.addListener('blur', () => {
            clearInterval(interval)
            setBookingData(null)
            setClinicData({})
            setDoctorData({})
        })

        return () => {
            clearInterval(interval)
            unsubscribe()
        }
    }, [navigation])

    //update queueNumber in realtime everytime there's a change in the database
    React.useEffect(() => {
        return onValue(ref(db, 'reservations'), snapshot => {
            if(!bookingData)
                return;

            console.log("onvalue")
            const allBookings = snapshot.val()
            if(!allBookings)
                return;

            //filter bookings to only by the current user
            const userBookings = Object.values(allBookings)
                .filter(booking =>
                    booking.userId === globalsDataContext.globalsData.userInfo.id &&
                    booking.status === "ongoing"
                )
                .sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1)

            if (userBookings.length < 1 || userBookings[0].status !== "ongoing")
                return;

            //calculate queue number
            const queueNumber = userBookings
                .findIndex(booking => booking.id === bookingData.data.id) + 1


            console.log({...bookingData, queueNumber})

            setBookingData({...bookingData, queueNumber})
        })
    }, [])

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <StatusBar translucent barStyle='dark-content'/>

            <Text style={{
                color: '#6A6666',
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 50,
            }}>Reservasi</Text>

            {
                bookingData ?
                    <BookingCard
                        clinic={clinicData}
                        doctor={doctorData}
                        queueNumber={bookingData.queueNumber}
                        cancelBookingHandler={cancelBookingHandler}
                    />
                    :
                    <Text style={{color: 'black', alignSelf: 'center', marginTop: 80}}>Anda tidak mempunyai reservasi aktif saat ini</Text>
            }
        </ScrollView>
    )
}

export default Booking
