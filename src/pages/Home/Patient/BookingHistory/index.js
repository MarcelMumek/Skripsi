import {View, Text, StatusBar, ScrollView} from 'react-native'
import React from 'react'
import Header from '../../Common/Header'
import ClinicCard from './ClinicCard'
import {getDatabase, ref, get, child} from "firebase/database";
import app from "../../../../firebase";
import GlobalsContext from "../../../../contexts/globalsContext";

const db = getDatabase(app)
const dbRef = ref(db)

const BookingHistory = ({navigation}) => {
    const [pastBookings, setPastBookings] = React.useState([])
    const globalsDataContext = React.useContext(GlobalsContext)

    const getPastBookings = () => {
        get(child(dbRef, 'reservations'))
            .then(snapshot => snapshot.val())
            .then(data => {
                if(!data)
                    return

                const bookings = Object.values(data)
                    ?.filter(booking =>
                        booking.userId === globalsDataContext.globalsData.userInfo.id &&
                        booking.status === 'done'
                    )

                setPastBookings(bookings)
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getPastBookings()
            globalsDataContext.setGlobalsData({noForceExit: true})
        })
    }, [navigation])

    React.useEffect(() => {
        return navigation.addListener('blur', () => {
            setPastBookings([])
            globalsDataContext.setGlobalsData({noForceExit: false})
        })
    })

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#6CA7FF',
        }}>
            <StatusBar translucent barStyle='dark-content'/>

            <Header {...{navigation}} text='Riwayat Reservasi'/>

            <ScrollView>
                {
                    pastBookings.map((item, index) =>
                        <ClinicCard key={index} {...{bookingData: item, navigation}}/>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default BookingHistory
