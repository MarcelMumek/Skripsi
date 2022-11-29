import {View, Text} from 'react-native'
import React from 'react'
import Header from '../../Common/Header'
import MapCard from './MapCard'
import GlobalsContext from "../../../../contexts/globalsContext";

const ClinicLocation = ({navigation, route}) => {
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
            <Header {...{navigation}}/>
            <MapCard coordinates={route?.params}/>
        </View>
    )
}

export default ClinicLocation
