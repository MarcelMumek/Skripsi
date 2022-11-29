import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HospitalIcon from '../../../../assets/HospitalIcon.png'
import BlueLocationIcon from '../../../../assets/BlueLocationIcon.png'

const Header = ({ navigation }) => {
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
                Lokasi
            </Text>
        </View>
    )
}

export default Header