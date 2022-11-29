import {View, Text, ScrollView, TouchableOpacity, Modal, Pressable, Image} from 'react-native'
import React from 'react'
import Header from '../Common/Header'
import CornerTransition from '../Common/CornerTransition'
import StarIcon from '../../../../assets/StarIcon.png'
import CreResBook from '../../../../assets/CreResBook.png'
import CreResPencil from '../../../../assets/CreResPencil.png'
import CreResTime from '../../../../assets/CreResTime.png'
import CalendarIcon from '../../../../assets/CalendarIcon.png'
import TextField from '../Common/TextField'
import PrimetimeModal from './PrimetimeModal'
import OperationalDayModal from '../Common/OperationalDayModal'
import datesToFormattedString from '../../../../utils/datesToFormattedString'
import OperationalHourModal from '../Common/OperationalHourModal'
import timeRangeString from '../../../../utils/timeRangeString'
import uuid from "react-native-uuid";
import {child, getDatabase, ref, set, get} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";
import LoadingOverlay from "../../../LoadingOverlay/LoadingOverlay";
import BlackArrowLeft from '../../../../assets/BlackArrowLeft.png'

const db = getDatabase(app)
const dbRef = ref(db)

const AddDoctor = ({navigation}) => {
    const [name, setName] = React.useState('')
    const [specialization, setSpecialization] = React.useState('')
    const [operationalDays, setOperationalDays] = React.useState([0, 1, 3])
    const [operationalHours, setOperationalHours] = React.useState([new Date(), new Date()])
    const [description, setDescription] = React.useState('')
    const [patientLimit, setPatientLimit] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalContent, setModalContent] = React.useState(null)
    const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
    const globalsDataContext = React.useContext(GlobalsContext)

    // console.log(globalsDataContext.globalsData)

    const backButtonHandler = () => navigation.goBack()

    const addBtnHandler = async () => {
        try {
            //check if name is empty or contains only spaces or contain number
            if (name.length < 1 || name.match(/^\s*$/) !== null || name.match(/\d/) !== null)
                return Alert.alert('', "Nama tidak boleh kosong atau memiliki karakter selain huruf")

            //check if specialization is empty or contains only spaces
            if (specialization.length < 1 || specialization.match(/^\s*$/) !== null)
                return Alert.alert('', "Spesialisasi tidak boleh kosong atau memiliki karakter selain huruf")

            //check if description is empty or contains only spaces
            if (description.length < 1 || description.match(/^\s*$/) !== null)
                return Alert.alert('', "Deskripsi tidak boleh kosong atau hanya berisi spasi")

            //check if patient limit is empty or contains non-numeric characters
            if (patientLimit.length < 1 || patientLimit.match(/\D/) !== null)
                return Alert.alert('', "Kuota Pasien harus berupa angka")

            //check if operational days is empty
            if (operationalDays.length < 1)
                return Alert.alert('', "Hari operasional tidak boleh kosong")

            //check if operational hours is invalid
            if (operationalHours[0] > operationalHours[1] || operationalHours[0] === operationalHours[1])
                return Alert.alert('', "Jam operasional tidak valid")

            const id = uuid.v4()

            //check if doctor with same name already exists
            const doctors = (await get(child(dbRef, 'doctors')))?.val()

            if (doctors) {
                //check if there's a doctor with the same name on this clinic
                const doctors_ = Object.values(doctors)
                    .find(el =>
                        el.name.toLowerCase() === name.toLowerCase() &&
                        el.clinicId === globalsDataContext.globalsData.userInfo.id &&
                        el.status !== 'deleted')

                if (doctors_ && doctors_.length > 0)
                    Alert.alert('', "Dokter dengan nama yang sama sudah ada di klinik ini")
            }

            //start chain of events
            (new Promise(r => setTimeout(r, 10))).then(async () => {
                setShowLoadingOverlay(true)

                await new Promise(r => setTimeout(r, 100))
            }).then(async () => {
                return set(ref(db, `doctors/${id}`), {
                    id,
                    name,
                    specialization,
                    description,
                    patientLimit: parseInt(patientLimit),
                    operationalDays,
                    operationalHours: operationalHours.map(date => date.getTime()),
                    clinicId: globalsDataContext.globalsData.userInfo.id,
                    status: 'active',
                })
            }).then(async () => {
                setShowLoadingOverlay(false)

                await new Promise(r => setTimeout(r, 200))
            }).then(() => {
                Alert.alert('', "Dokter ditambahkan!")
                navigation.goBack()
            }).catch(err => {
                console.log("Terjadi Kesalahan: ", err)
                Alert.alert('', err)
                setShowLoadingOverlay(false)
            })

        } catch (error) {
            console.log(error.message)
            Alert.alert('', error)
        }
    }

    const openModal = content => {
        setModalContent(content)
        setModalVisible(true)
    }

    const editOperationalDaysHandler = dates => {
        setOperationalDays(dates)
        setModalVisible(false)
    }

    const editOperationalHourHandler = hours => {
        setOperationalHours(hours)
        setModalVisible(false)
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!globalsDataContext?.globalsData?.noForceExit) {
                globalsDataContext?.setGlobalsData({noForceExit: true})
            }
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            globalsDataContext?.setGlobalsData({noForceExit: false})
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{
            flex: 1,
        }}>
            <ScrollView style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <PrimetimeModal
                    isVisible={modalVisible}
                    setIsVisible={setModalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    content={modalContent}
                />
                <Header/>
                <CornerTransition isBgWhite={true}/>

                <View style={{
                    marginTop: -30,
                    marginHorizontal: 25,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#E0ECFF',
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                        }}
                        onPress={backButtonHandler}
                    >
                        <View style={{width: 20}}>
                            <Image source={BlackArrowLeft}
                                   style={{flex: 1, height: null, width: null, resizeMode: 'contain'}}/>
                        </View>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Kembali</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>

                <View style={{
                    backgroundColor: '#E0ECFF',
                    marginTop: 30,
                    marginHorizontal: 25,
                    borderRadius: 20,
                    padding: 30,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 26,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}>Tambahkan Dokter</Text>

                    {
                        [
                            [CreResPencil, "Nama Dokter", text => setName(text), name, "Dr. John Doe", false],
                            [StarIcon, "Spesialisasi", text => setSpecialization(text), specialization, "Penyakit Dalam", false],
                            [CreResBook, "Hari Operasional", () => openModal(<OperationalDayModal
                                callback={editOperationalDaysHandler}
                                value={operationalDays}/>), datesToFormattedString(operationalDays), "Senin - Jumat", true],
                            [CreResTime, "Jam Operasional", () => openModal(<OperationalHourModal
                                callback={editOperationalHourHandler}
                                value={operationalHours}/>), timeRangeString(operationalHours), "08.00 - 16.00", true],
                            [CreResPencil, "Keterangan", text => setDescription(text), description, "Keterangan tambahan", false],
                            [CalendarIcon, "Kuota Pasien", text => setPatientLimit(text), patientLimit, "15", false],
                        ].map((item, index) =>
                            <TextField
                                key={index}
                                icon={item[0]}
                                fieldName={item[1]}
                                callback={item[2]}
                                value={item[3]}
                                dummyText={item[4]}
                                isButton={item[5]}
                            />
                        )
                    }

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#6CA7FF',
                            paddingVertical: 15,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginBottom: 80,
                        }}
                        onPress={addBtnHandler}
                    >
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Tambahkan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: showLoadingOverlay ? null : 'none',
                justifyContent: 'center',
            }}>
                {showLoadingOverlay ? <LoadingOverlay infoText='Adding Doctor...'/> : <></>}
            </View>
        </View>
    )
}

export default AddDoctor
