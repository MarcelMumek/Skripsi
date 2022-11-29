import {View, Text, ScrollView, TouchableOpacity, Alert, Image} from 'react-native'
import React from 'react'
import Header from '../Common/Header'
import CornerTransition from '../Common/CornerTransition'
import TextField from '../Common/TextField'
import StarIcon from '../../../../assets/StarIcon.png'
import CreResBook from '../../../../assets/CreResBook.png'
import CreResPencil from '../../../../assets/CreResPencil.png'
import CreResTime from '../../../../assets/CreResTime.png'
import CalendarIcon from '../../../../assets/CalendarIcon.png'
import OperationalDayModal from "../Common/OperationalDayModal";
import datesToFormattedString from "../../../../utils/datesToFormattedString";
import OperationalHourModal from "../Common/OperationalHourModal";
import timeRangeString from "../../../../utils/timeRangeString";
import PrimetimeModal from "../AddDoctor/PrimetimeModal";
import GlobalsContext from "../../../../contexts/globalsContext";
import uuid from "react-native-uuid";
import {getDatabase, ref, set} from "firebase/database";
import app from "../../../../firebase";
import LoadingOverlay from "../../../LoadingOverlay/LoadingOverlay";
import BlackArrowLeft from "../../../../assets/BlackArrowLeft.png";

const db = getDatabase(app)

const EditDoctor = ({navigation, route}) => {
    // console.log(route.params.doctorData)
    const [name, setName] = React.useState(route.params.doctorData.name)
    const [specialization, setSpecialization] = React.useState(route.params.doctorData.specialization)
    const [operationalDays, setOperationalDays] = React.useState(route.params.doctorData.operationalDays)
    const [operationalHours, setOperationalHours] = React.useState(route.params.doctorData.operationalHours?.map(hours => new Date(hours)))
    const [description, setDescription] = React.useState(route.params.doctorData.description)
    const [patientLimit, setPatientLimit] = React.useState("" + route.params.doctorData.patientLimit)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalContent, setModalContent] = React.useState(null)
    const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
    const globalsDataContext = React.useContext(GlobalsContext)

    const backButtonHandler = () => navigation.goBack()

    const updateBtn = () => {
        try {
            //check if name is empty or contains only spaces or contain number
            if (name.length < 1 || name.match(/^\s*$/) !== null || name.match(/\d/) !== null)
                return alert("Name cannot be empty or contain only spaces or numbers")

            //check if specialization is empty or contains only spaces
            if (specialization.length < 1 || specialization.match(/^\s*$/) !== null)
                return alert("Specialization cannot be empty or contain only spaces")

            //check if description is empty or contains only spaces
            if (description.length < 1 || description.match(/^\s*$/) !== null)
                return alert("Description cannot be empty or contain only spaces")

            //check if patient limit is empty or contains non-numeric characters
            if (patientLimit.length < 1 || patientLimit.match(/\D/) !== null)
                return alert("Patient limit must be a number")

            //check if operational days is empty
            if (operationalDays.length < 1)
                return alert("Operational days cannot be empty")

            //check if operational hours is invalid
            if (operationalHours[0] > operationalHours[1] || operationalHours[0] === operationalHours[1])
                return alert("Operational hours is invalid");

            //start chain of events
            (new Promise(r => setTimeout(r, 10))).then(async () => {
                setShowLoadingOverlay(true)

                await new Promise(r => setTimeout(r, 100))
            }).then(async () => {
                return set(ref(db, `doctors/${route.params.doctorData.id}`), {
                    id: route.params.doctorData.id,
                    name,
                    specialization,
                    description,
                    patientLimit: parseInt(patientLimit),
                    operationalDays,
                    operationalHours: operationalHours.map(date => date.getTime()),
                    clinicId: route.params.doctorData.clinicId,
                    status: 'active',
                })
            }).then(async () => {
                setShowLoadingOverlay(false)

                await new Promise(r => setTimeout(r, 100))
            }).then(() => {
                alert("Doctor info updated!")
                navigation.goBack()
            }).catch(err => {
                console.log("INSIDE ASYNC: ", err)
                alert(err)
                setShowLoadingOverlay(false)
            })

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const deleteBtn = () => {
        (new Promise(r => setTimeout(r, 10))).then(async () => {
            setShowLoadingOverlay(true)

            await new Promise(r => setTimeout(r, 100))
        }).then(async () => {
            return set(ref(db, `doctors/${route.params.doctorData.id}`), {
                ...route.params.doctorData,
                status: 'deleted'
            })
        }).then(async () => {
            setShowLoadingOverlay(false)

            await new Promise(r => setTimeout(r, 100))
        }).then(() => {
            alert("Doctor deleted!")
            navigation.goBack()
        }).catch(err => {
            console.log("INSIDE ASYNC: ", err)
            alert(err)
            setShowLoadingOverlay(false)
        })
    }

    const updateBtnHandler = () => {
        Alert.alert(
            "Perbaharui Data Dokter",
            "Apakah anda yakin ingin memperbaharui data dokter ini?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Aborted"),
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: () => updateBtn(),
                    style: "destructive",
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Aborted"),
            },
        )
    }

    const deleteBtnHandler = () => {
        Alert.alert(
            "Hapus Dokter",
            "Apakah anda yakin ingin menghapus dokter ini?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Aborted"),
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: () => deleteBtn(),
                    style: "destructive",
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Aborted"),
            },
        )
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
            console.log("focus triggered", globalsDataContext?.globalsData?.noForceExit)
            globalsDataContext?.setGlobalsData({noForceExit: true})
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log("blur triggered")
            // globalsDataContext?.setGlobalsData({noForceExit: false})
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{
            flex: 1
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
                    }}>Edit Dokter</Text>

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

                    {/* update and delete btn */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#6CA7FF',
                            paddingVertical: 15,
                            borderRadius: 10,
                            marginTop: 20,
                        }}
                        onPress={updateBtnHandler}
                    >
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Perbaharui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FF6C6C',
                            paddingVertical: 15,
                            borderRadius: 10,
                            marginTop: 20,
                            marginBottom: 80,
                        }}
                        onPress={deleteBtnHandler}
                    >
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Hapus</Text>
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
                {showLoadingOverlay ? <LoadingOverlay infoText='Updating Doctor...'/> : <></>}
            </View>
        </View>
    )
}

export default EditDoctor
