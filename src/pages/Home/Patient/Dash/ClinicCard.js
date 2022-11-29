import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import HospitalIcon from '../../../../assets/HospitalIcon.png'
import app from "../../../../firebase";
import {child, get, getDatabase, ref} from "firebase/database";

const db = getDatabase(app)
const dbRef = ref(db)

const ClinicCard = ({navigation, clinicName, clinicId}) => {
    const [doctorReservation, setDoctorReservation] = React.useState([])

    const clinicCardHandler = () =>
        navigation.navigate('ClinicDetail', {selectedId: clinicId})

    const getDoctorReservations = async () => {
        try {
            //get all doctors
            let doctors = await get(child(dbRef, 'doctors'))

            if (!doctors.val())
                return setDoctorReservation([])

            //filter doctors to only in current clinic
            doctors = Object.values(doctors.val())
                .filter(doctor => doctor.clinicId === clinicId)

            //get all reservations
            let reservations = await get(child(dbRef, 'reservations'))

            if (!reservations.val())
                return setDoctorReservation([])

            //filter reservations to only in current clinic
            reservations = Object.values(reservations.val())
                .filter(reservation => reservation.clinicId === clinicId)

            //check if reservation is empty after filtering
            if (reservations.length < 1)
                return setDoctorReservation([])

            //array to hold final data of which doctor has full queue
            let finalData = []

            Object.values(doctors).forEach(doctor => {
                if (!doctor)
                    return;

                //filter reservations to only in current doctor
                let doctorReservations = reservations.filter(reservation =>
                    reservation.doctorId === doctor.id &&
                    reservation.status === 'ongoing'
                )

                //check if doctor has full queue
                if (doctorReservations.length >= parseInt(doctor.patientLimit))
                    finalData.push(doctor)
            })

            setDoctorReservation(finalData)
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            console.log("Getting doctor reservations..")
            getDoctorReservations()
        })
    }, [navigation])

    React.useEffect(() => {
        console.log("DOCRES", doctorReservation)
    }, [doctorReservation])

    return (
        <TouchableOpacity
            style={{
                borderRadius: 20,
                marginBottom: 25,
            }}
            onPress={clinicCardHandler}
        >
            <View style={{
                backgroundColor: 'white',
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    source={HospitalIcon}
                    style={{
                        height: 80,
                        width: '18%',
                        resizeMode: 'contain',
                        // backgroundColor: 'red',
                        marginLeft: 10,
                    }}
                />
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                    marginLeft: 15,
                }}>{clinicName}</Text>
                <Text style={{
                    color: '#6CA7FF',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    marginRight: 25,
                }}>Lihat {'>'}</Text>
            </View>

            <View style={{
                backgroundColor: '#FFF8E1',
                marginTop: -50,
                zIndex: -1,
                borderRadius: 20,
                paddingHorizontal: 15,
                display: doctorReservation.length > 0 ? null : 'none',
            }}>
                <View style={{
                    //this cancels out the margin top
                    height: 50
                }}></View>

                {
                    doctorReservation &&
                    doctorReservation.map((el, idx) =>
                        <Text
                            key={idx}
                            style={{
                                color: '#6A6666',
                                marginVertical: 10,
                            }}
                        >
                            {el.name} sudah memenuhi kuota pasien
                        </Text>
                    )
                }
            </View>

        </TouchableOpacity>
    )
}

export default ClinicCard
