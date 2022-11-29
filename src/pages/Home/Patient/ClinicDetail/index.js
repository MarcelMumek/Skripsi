import {View, Text, StatusBar} from 'react-native'
import React from 'react'
import Header from './Header'
import DoctorsListCard from './DoctorsListCard'
import GlobalsContext from "../../../../contexts/globalsContext";

const ClinicDetail = ({navigation, route}) => {
    const globalsDataContext = React.useContext(GlobalsContext)

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
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <StatusBar translucent barStyle='dark-content'/>
            <Header {...{navigation, route}} />
            <DoctorsListCard {...{navigation, route}} />
        </View>
    )
}

export default ClinicDetail