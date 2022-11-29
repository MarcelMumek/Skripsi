import { View, Text, } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 30,
            paddingHorizontal: 25,
            paddingBottom: 15,
        }}>
            <Text style={{
                color: '#6A6666',
                fontSize: 22,
                fontWeight: 'bold',
            }}>
                Info Reservasi
            </Text>
        </View>
    )
}

export default Header