import React from 'react'
import TabContainer from './TabContainer'
import {createStackNavigator} from '@react-navigation/stack'
import ClinicDetail from './Patient/ClinicDetail'
import ClinicLocation from './Patient/ClinicLocation'
import CreateReservation from './Patient/CreateReservation'
import BookingSuccess from './Patient/BookingSuccess'
import BookingHistory from './Patient/BookingHistory'
import BookingDetail from './Common/BookingDetail'
import AddDoctor from './Admin/AddDoctor'
import EditDoctor from './Admin/EditDoctor'
import AddNotes from './Admin/AddNotes'
import GlobalsContext from '../../contexts/globalsContext'
import DoctorList from './Admin/DoctorList'
import {useFocusEffect} from '@react-navigation/native'
import {BackHandler} from 'react-native'

const Stack = createStackNavigator()

const Home = ({navigation}) => {
    const globalsDataContext = React.useContext(GlobalsContext)

    React.useEffect(() => {
        if (!globalsDataContext?.globalsData?.userInfo)
            navigation.goBack()

    }, [globalsDataContext?.globalsData?.userInfo])

    useFocusEffect(
        React.useCallback(() => {
            console.log("backhandler triggered", globalsDataContext.globalsData.noForceExit)
            const onBackPress = () => {
                if (globalsDataContext.globalsData.noForceExit) //some page may request that back button is handled normally
                    return false

                console.log("noforceexit was false, returning true")
                globalsDataContext.setGlobalsData({userInfo: undefined}) //clear user info
                return true //prevent default behavior
            }

            BackHandler.addEventListener('hardwareBackPress', onBackPress)

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress) //cleanup
        }, [globalsDataContext?.globalsData?.noForceExit])
    )

    return (
        <Stack.Navigator>
            {
                globalsDataContext?.globalsData?.userInfo?.role !== 'Clinic' ?
                    <>
                        <Stack.Screen name="Main" component={TabContainer} options={{headerShown: false}}/>
                        <Stack.Screen name="ClinicDetail" component={ClinicDetail} options={{headerShown: false}}/>
                        <Stack.Screen name="ClinicLocation" component={ClinicLocation} options={{headerShown: false}}/>
                        <Stack.Screen name="CreateReservation" component={CreateReservation}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name="BookingSuccess" component={BookingSuccess} options={{headerShown: false}}/>
                        <Stack.Screen name="BookingHistory" component={BookingHistory} options={{headerShown: false}}/>
                        <Stack.Screen name="BookingDetail" component={BookingDetail} options={{headerShown: false}}/>
                    </>
                    :
                    <>
                        <Stack.Screen name="Main" component={TabContainer} options={{headerShown: false}}/>
                        <Stack.Screen name="AddDoctor" component={AddDoctor} options={{headerShown: false}}/>
                        <Stack.Screen name="DoctorList" component={DoctorList} options={{headerShown: false}}/>
                        <Stack.Screen name="EditDoctor" component={EditDoctor} options={{headerShown: false}}/>
                        <Stack.Screen name="AddNotes" component={AddNotes} options={{headerShown: false}}/>
                        <Stack.Screen name="BookingDetail" component={BookingDetail} options={{headerShown: false}}/>
                    </>
            }
        </Stack.Navigator>
    )
}

export default Home