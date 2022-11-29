import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dash from './Patient/Dash'
import AdminDash from './Admin/Dash'
import Booking from './Patient/Booking'
import AdminBooking from './Admin/Booking'
import Profile from './Common/Profile'
import GlobalsContext from '../../contexts/globalsContext'

import HomeIcon from '../../assets/Home.png'
import BookingIcon from '../../assets/Booking.png'
import ProfileIcon from '../../assets/Profile.png'

import { Image } from 'react-native'
const Tab = createBottomTabNavigator()

const iconMapping = {
  "Dash": HomeIcon,
  "Booking": BookingIcon,
  "Profile": ProfileIcon,
}

const TabContainer = ({navigation}) => {
    const globalsDataContext = React.useContext(GlobalsContext)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) =>
                    <Image
                        source={iconMapping[route.name]}
                        style={{
                            height: 20,
                            resizeMode: 'contain',
                            tintColor: focused ? '#6CA7FF' : '#6A6666',
                        }}
                    />,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ECEDEA',
                }
            })}
        >
            {
                globalsDataContext?.globalsData?.userInfo?.role !== 'Clinic' ?
                    <>
                        <Tab.Screen name="Dash" component={Dash} options={{ headerShown: false }} />
                        <Tab.Screen name="Booking" component={Booking} options={{ headerShown: false }} />
                        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    </>
                    :
                    <>
                        <Tab.Screen name="Dash" component={AdminDash} options={{ headerShown: false }} />
                        <Tab.Screen name="Booking" component={AdminBooking} options={{ headerShown: false }} />
                        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    </>
            }
        </Tab.Navigator>
    )
}

export default TabContainer