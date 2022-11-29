import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import DoctorCard from '../../Common/DoctorCard/DoctorCard'
import {getDatabase, ref, get, child} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";

const db = getDatabase(app)
const dbRef = ref(db)

const DoctorsListCard = ({navigation, route}) => {
    const [doctorsList, setDoctorsList] = React.useState([])
    const globalsDataContext = React.useContext(GlobalsContext)

    const getDoctorsList = () =>
        get(child(dbRef, 'doctors'))
            .then(snapshot => snapshot.val())
            .then(data => Object.values(data)
                ?.filter(doctor =>
                    doctor.clinicId === route.params.selectedId &&
                    doctor.status === "active"
                ).map(doctor => ({
                    ...doctor,
                    reservations: []
                })))
            .then(async data => {
                if (data.length < 1)
                    return setDoctorsList(data)

                const reservations = await get(child(dbRef, 'reservations'))

                if (!reservations.val())
                    return setDoctorsList(data)

                setDoctorsList(data.map(doctor => {
                    const doctorReservations = Object.values(reservations.val())
                        ?.filter(reservation =>
                            reservation.doctorId === doctor.id &&
                            reservation.status === 'ongoing'
                        )

                    return {
                        ...doctor,
                        reservations: doctorReservations
                    }
                }))
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            console.log("Getting doctor list")
            getDoctorsList()
        })
    }, [navigation])

    return (
        <View style={{
            backgroundColor: '#E0ECFF',
            borderRadius: 20,
            marginTop: 20,
            overflow: 'hidden',
            marginHorizontal: 15,
            flex: 1,
            marginBottom: 20,
        }}>
            <ScrollView>
                {
                    doctorsList.map((el, i) =>
                        <DoctorCard
                            key={i}
                            name={el.name}
                            speciality={el.specialization}
                            operationalDays={el.operationalDays}
                            operationalHours={el.operationalHours}
                            callback={() =>
                                navigation.navigate('CreateReservation', {
                                    doctorData: el,
                                    clinicId: route.params.selectedId
                                })}
                            actionBtnText="Booking Sekarang"
                            isDisabled={el?.reservations?.length >= el.patientLimit}
                        />
                    )
                }
            </ScrollView>
        </View>
    )
}

export default DoctorsListCard
