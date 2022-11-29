import {View, Text, ScrollView, StatusBar, Alert} from 'react-native'
import React from 'react'
import BookingCard from './BookingCard'
import {getDatabase, ref, child, get, set} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";

const db = getDatabase(app)
const dbRef = ref(db)

const Booking = ({navigation}) => {
    const [bookings, setBookings] = React.useState([])
    const globalsDataContext = React.useContext(GlobalsContext)

    const getBookings = () =>
        get(child(dbRef, 'reservations'))
            .then(snapshot => snapshot.val())
            .then(async data => {
                console.log(data)
                if (!data)
                    return setBookings([])

                const bookingList = await Promise.all(Object.values(data)
                    ?.filter(booking => booking.clinicId === globalsDataContext.globalsData.userInfo.id && booking.status === 'ongoing')
                    .map(async booking => {

                        const patient = await get(child(dbRef, `users/${booking.userId}`))
                            .then(snapshot => snapshot.val())

                        const doctor = await get(child(dbRef, `doctors/${booking.doctorId}`))
                            .then(snapshot => snapshot.val())

                        const clinic = await get(child(dbRef, `users/${booking.clinicId}`))
                            .then(snapshot => snapshot.val())

                        return {
                            bookingData: booking,
                            patientData: patient,
                            doctorData: doctor,
                            clinicData: clinic
                        }
                    }))

                setBookings(bookingList)
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })

    const tolak = async bookingId => {
        try {
            await set(ref(db, `reservations/${bookingId}`), null)

            getBookings()
        } catch (e) {
            console.log(e)
            alert("Terjadi kesalahan")
        }
    }

    const tolakBtnHandler = bookingId =>
        Alert.alert(
            "Tolak",
            "Apakah anda yakin ingin menolak booking ini?",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                { text: "Ya", onPress: () => tolak(bookingId) }
            ],
            { cancelable: false }
        )

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getBookings()
        })
    }, [navigation])

    React.useEffect(() => {
        return navigation.addListener('blur', () => {
            setBookings([])
        })
    }, [navigation])

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#E0ECFF',
        }}>
            <StatusBar translucent barStyle='dark-content'/>
            <Text style={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 40,
                textAlign: 'center',
                marginBottom: 40,
            }}>
                Permintaan Booking
            </Text>
            {
                bookings.length > 0 && bookings.map((el, index) =>
                    <BookingCard
                        key={index}
                        patientName={el.patientData.fullname}
                        doctorName={el.doctorData.name}
                        speciality={el.doctorData.specialization}
                        tolakCallback={() => tolakBtnHandler(el.bookingData.id)}
                        infoCallback={() => navigation.navigate('BookingDetail', {data: el})}
                    />
                )
            }
        </ScrollView>
    )
}

export default Booking
