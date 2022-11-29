import { View, Text, Image } from 'react-native'
import React from 'react'
import DoctorWithKid from '../../../../assets/DoctorWithKid.png'

const Header = () => {
    return (
        <>
            <Image source={DoctorWithKid} style={{width: '100%', height: 150, resizeMode: 'contain', marginTop: 50, }} />
            <Text style={{
                color: '#6A6666',
                fontWeight: 'bold',
                fontSize: 28,
                marginLeft: 25,
                marginBottom: 5,
            }}>
                Selamat Datang!
            </Text>

            <Text style={{
                color: '#6A6666',
                fontWeight: '300',
                fontSize: 22,
                marginLeft: 25,
                marginBottom: 30,
            }}>
                Silahkan pilih klinik yang tersedia
            </Text>
        </>
    )
}

export default Header