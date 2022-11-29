import { View, Text, Image } from 'react-native'
import React from 'react'
import HospitalIcon from '../../../../assets/HospitalIcon.png'
import GlobalsContext from "../../../../contexts/globalsContext";

const Header = () => {
    const globalsDataContext = React.useContext(GlobalsContext)

    return (
        <View style={{
            backgroundColor: '#6CA7FF',
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingVertical: 40,
            borderBottomLeftRadius: 40,
        }}>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 10,
                flex: 1,
            }}>
                <Image source={HospitalIcon} style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain',
                    margin: 10,
                }} />
            </View>

            <View style={{
                flex: 3,
                marginLeft: 20,
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>{globalsDataContext?.globalsData?.userInfo?.fullname}</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 14,
                }}>{globalsDataContext?.globalsData?.userInfo?.address}</Text>
            </View>
        </View>
    )
}

export default Header
