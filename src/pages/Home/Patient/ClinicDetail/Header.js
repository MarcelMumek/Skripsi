import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import HospitalIcon from '../../../../assets/HospitalIcon.png'
import BlueLocationIcon from '../../../../assets/BlueLocationIcon.png'
import {child, getDatabase, ref, get} from 'firebase/database'
import app from '../../../../firebase'
import GenericHeader from '../../Common/Header'

const db = getDatabase(app)
const dbRef = ref(db)

const Header = ({navigation, route}) => {
    const [clinicData, setClinicData] = React.useState({})

    const getClinicInfo = () => {
        if (!route?.params?.selectedId)
            return;

        get(child(dbRef, `users/${route.params.selectedId}`))
            .then(snapshot => snapshot.val())
            .then(data => setClinicData(data))
            .catch(err => alert("Unable to obtain data from backend!"))
    }

    const getClinicNote = () => {
        get(child(dbRef, `users/${route.params.selectedId}/notes`))
            .then(snapshot => snapshot.val())
            .then(data => {
                Alert.alert(
                    "Keterangan/Informasi Klinik",
                    data ? data : "Tidak ada informasi",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("OK Pressed")
                        }
                    ]
                )
            })
    }

    const mapIconBtnHandler = () =>
        navigation.navigate('ClinicLocation', clinicData?.coordinates)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getClinicInfo()
        })

        return unsubscribe
    }, [navigation])

    return (
        <>
            <GenericHeader {...{navigation}} text='Keterangan'/>

            <View style={{
                backgroundColor: '#E0ECFF',
                paddingHorizontal: 25,
                flexDirection: 'row',
                elevation: 8,
            }}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={getClinicNote}>
                    <Image source={HospitalIcon} style={{
                        width: 60,
                        resizeMode: 'contain',
                    }}/>

                    <View style={{
                        flex: 1,
                        marginLeft: 20,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 5,
                        }}>
                            {clinicData?.fullname}
                        </Text>
                        <Text style={{
                            color: 'black'
                        }}>
                            {clinicData?.address}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: 40}} onPress={mapIconBtnHandler}>
                    <Image source={BlueLocationIcon} style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'contain',
                    }}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header
