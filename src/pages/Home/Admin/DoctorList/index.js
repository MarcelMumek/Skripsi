import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Header from '../Common/Header'
import CornerTransition from '../Common/CornerTransition'
import DoctorCard from '../../Common/DoctorCard/DoctorCard'
import {getDatabase, ref, get, child} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";
import BlackArrowLeft from '../../../../assets/BlackArrowLeft.png'

const db = getDatabase(app)
const dbRef = ref(db)

const DoctorList = ({navigation}) => {
    const [doctors, setDoctors] = React.useState([])
    const globalsDataContext = React.useContext(GlobalsContext)

    const backButtonHandler = () => navigation.goBack()

    const getDoctorsList = () => {
        get(child(dbRef, 'doctors'))
            .then(snapshot => snapshot.val())
            .then(doctorsList => {
                const doctors_ = Object.values(doctorsList)
                    ?.filter(doctor =>
                        doctor.clinicId === globalsDataContext?.globalsData?.userInfo?.id &&
                        doctor.status === "active"
                    )

                setDoctors(doctors_)
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDoctorsList()
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            globalsDataContext?.setGlobalsData({noForceExit: true})
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
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
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
                // padding: 30,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    marginLeft: 30,
                    marginTop: 30,
                }}>Kelola Data</Text>

                {
                    doctors ? doctors.map((el, i) =>
                            <DoctorCard
                                key={i}
                                name={el.name}
                                speciality={el.specialization}
                                operationalDays={el.operationalDays}
                                operationalHours={el.operationalHours}
                                callback={() => navigation.navigate('EditDoctor', {doctorData: el})}
                                actionBtnText="Edit"
                            />
                        ) :
                        <></>
                }
            </View>
        </ScrollView>
    )
}

export default DoctorList
