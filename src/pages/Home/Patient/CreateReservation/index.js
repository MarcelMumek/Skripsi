import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import Header from '../../Common/Header'
import DetailCard from './DetailCard'
import CreResBook from '../../../../assets/CreResBook.png'
import CreResTime from '../../../../assets/CreResTime.png'
import CreResPencil from '../../../../assets/CreResPencil.png'
import TextualReadonlyField from './TextualReadonlyField'
import KeluhanTextinput from './KeluhanTextinput'
import {CommonActions} from '@react-navigation/native'
import GlobalsContext from "../../../../contexts/globalsContext";
import {child, get, getDatabase, ref, set} from "firebase/database";
import app from "../../../../firebase";
import datesToFormattedString from "../../../../utils/datesToFormattedString";
import timeRangeString from "../../../../utils/timeRangeString";
import uuid from "react-native-uuid";
import LoadingOverlay from "../../../LoadingOverlay/LoadingOverlay";
import moment from "moment";

const db = getDatabase(app)
const dbRef = ref(db)

const CreateReservation = ({navigation, route}) => {
    const [keluhan, setKeluhan] = React.useState('')
    const [clinicData, setClinicData] = React.useState({})
    const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
    const [showFullQueueError, setShowFullQueueError] = React.useState(false)
    const globalsDataContext = React.useContext(GlobalsContext)

    // we don't want to let user go back to previous steps screen after the booking is processed
    // therefore, we need to reset the navigation stack so when user press the native back button
    // it will go back to the main screen
    const handleNavigation = id => navigation.dispatch(state => {
        // remove the last 2 routes from current list of routes
        const routes = state.routes.slice(0, -2)

        // push the new route to the list of routes
        routes.push({name: 'BookingSuccess', params: {id}})

        // reset the state to the new state with updated list of routes
        return CommonActions.reset({
            ...state,
            index: routes.length - 1,
            routes,
        })
    })


    const bookNowBtnHandler = () => {
        if (keluhan.length < 1)
            return alert("Mohon masukkan keluhan anda")

        const id = uuid.v4();

        (new Promise(r => setTimeout(r, 10))).then(async () => {
            setShowLoadingOverlay(true)

            await new Promise(r => setTimeout(r, 100))
        }).then(async () => {
            //get reservations
            let reservations = await get(child(dbRef, 'reservations'))

            //if no reservations, return
            if(!reservations.val())
                return;

            //check if user has an active reservation
            const activeReservation = Object.values(reservations.val())
                .filter(reservation =>
                    reservation.userId === globalsDataContext.globalsData.userInfo.id &&
                    reservation.status === 'ongoing'
                )

            //if user has an active reservation, throw error
            if(activeReservation.length > 0)
                throw new Error('Anda memiliki booking aktif saat ini. Mohon periksa kembali aktivitas booking anda')


            //get all ongoing reservations for the doctor
            reservations = Object.values(reservations.val())
                .filter(reservation =>
                    reservation.doctorId === route.params.doctorData.id &&
                    reservation.status === 'ongoing'
                )

            //if no ongoing reservations, return
            if(reservations.length < 1)
                return;

            //get doctor data
            let doctor = await get(child(dbRef, `doctors/${route.params.doctorData.id}`))

            if(!doctor.val())
                throw new Error('Dokter tidak ditemukan')

            doctor = doctor.val()

            if(reservations.length >= doctor.patientLimit) {
                //if queue is full, throw error
                setShowFullQueueError(true)
                throw new Error('Kuota reservasi sudah penuh')

            } else {
                //if queue is not full, return
                setShowFullQueueError(false)
                return;
            }
        }).then(async () => {
            return set(ref(db, `reservations/${id}`), {
                id,
                clinicId: route.params.clinicId,
                userId: globalsDataContext.globalsData.userInfo.id,
                doctorId: route.params.doctorData.id,
                date: new Date().toISOString(),
                keluhan,
                status: 'ongoing'
            })
        }).then(async () => {
            setShowLoadingOverlay(false)

            await new Promise(r => setTimeout(r, 200))
        }).then(() => {
            handleNavigation(id)
        }).catch(err => {
            console.log("Terjadi Kesalahan: ", err)
            Alert.alert("", err.message)
            setShowLoadingOverlay(false)
        })
    }

    const getClinicInfo = () => {
        if (!route?.params?.clinicId)
            return;

        get(child(dbRef, `users/${route.params.clinicId}`))
            .then(snapshot => snapshot.val())
            .then(data => setClinicData(data))
            .catch(err => alert("Tidak dapat mengambil data dari backend!"))
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getClinicInfo()
            globalsDataContext?.setGlobalsData({noForceExit: true})
        })
    }, [navigation])

    React.useEffect(() => {
        return navigation.addListener('blur', () => {
            globalsDataContext?.setGlobalsData({noForceExit: false})
        })
    }, [navigation])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <Header {...{navigation}} text='Buat Reservasi'/>

            <ScrollView style={{
                paddingHorizontal: 25,
            }}>
                <DetailCard clinicData={clinicData} doctorData={route?.params?.doctorData}/>

                <View style={{height: 25}}/>

                {
                    [
                        ['Jadwal Operasional', CreResBook, datesToFormattedString(route?.params?.doctorData?.operationalDays)],
                        ['Jam Kerja', CreResTime, timeRangeString(route?.params?.doctorData?.operationalHours?.map(el => new Date(el)))],
                        ['Keterangan', CreResPencil, route?.params?.doctorData?.description],
                    ].map((item, index) =>
                        <TextualReadonlyField
                            key={index}
                            title={item[0]}
                            icon={item[1]}
                            value={item[2]}
                        />
                    )
                }

                <KeluhanTextinput value={keluhan} setValue={setKeluhan}/>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#6CA7FF',
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                        marginHorizontal: 70,
                        marginBottom: 20,
                    }}
                    onPress={bookNowBtnHandler}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>
                        Booking Sekarang
                    </Text>
                </TouchableOpacity>

                <Text style={{
                    color: 'red',
                    fontSize: 16,
                    textAlign: 'center',
                    display: showFullQueueError ? null : 'none',
                }}>
                    Mohon maaf, Anda tidak bisa melakukan booking karena kuota pasien sudah penuh / tidak tersedia.
                </Text>

                <View style={{height: 100}}></View>
            </ScrollView>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: showLoadingOverlay ? null : 'none',
                justifyContent: 'center',
            }}>
                {showLoadingOverlay ? <LoadingOverlay infoText='Membuat Reservasi...'/> : <></>}
            </View>
        </View>
    )
}

export default CreateReservation
