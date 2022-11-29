import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import HospitalIcon from '../../../../assets/HospitalIcon.png'
import {getDatabase, ref, get, child} from "firebase/database";
import app from "../../../../firebase";
import moment from "moment";
import GlobalsContext from "../../../../contexts/globalsContext";

const db = getDatabase(app)
const dbRef = ref(db)

const ClinicCard = ({bookingData, navigation}) => {
    const [combinedData, setCombinedData] = React.useState(null)
    const globalsDataContext = React.useContext(GlobalsContext)

    const cardOnPressHandler = () => navigation.navigate('BookingDetail', {data: combinedData})

    const getClinicData = () =>
        get(child(dbRef, `users/${bookingData.clinicId}`))
            .then(snapshot => snapshot.val())

    const getDoctorData = () =>
        get(child(dbRef, `doctors/${bookingData.doctorId}`))
            .then(snapshot => snapshot.val())

    const getCombinedData = async () => {
        try {
            const clinicData = await getClinicData()
            const doctorData = await getDoctorData()

            setCombinedData({
                bookingData,
                patientData: globalsDataContext.globalsData.userInfo,
                doctorData,
                clinicData,
            })
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    React.useEffect(() => {
        getCombinedData()
    }, [bookingData.clinicId])

    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                borderRadius: 20,
                marginVertical: 20,
                marginHorizontal: '8%',
                flexDirection: 'row',
                overflow: 'hidden',
                padding: 20,
                paddingHorizontal: 20,
            }}
            onPress={cardOnPressHandler}
        >
            <Image source={HospitalIcon} style={{
                height: 70,
                width: 70,
                resizeMode: 'contain',
                // backgroundColor: 'red',
            }}/>

            <View style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'space-around',
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                }}>{combinedData?.clinicData?.fullname}</Text>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '300',
                }}>{moment(combinedData?.bookingData?.date).format('DD MMMM YYYY')}</Text>
            </View>

            <Text style={{
                color: '#6CA7FF',
                textDecorationLine: 'underline',
                alignSelf: 'flex-end',
            }}>
                Lihat {'>'}
            </Text>
        </TouchableOpacity>
    )
}

export default ClinicCard
