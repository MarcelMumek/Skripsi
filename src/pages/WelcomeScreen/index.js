import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native'
import React from 'react'
import WelcomeLogo from '../../assets/WelcomeLogo.png'

const WelcomeScreen = ({navigation}) => {
    const getStartedBtnHandler = () =>
        navigation.navigate('SignIn')

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#6CA7FF'
        }}>
            <StatusBar translucent backgroundColor='transparent' barStyle='light-content'/>
            <View style={{
                flex: 2.5,
                // backgroundColor: 'red',
                width: '100%',
            }}></View>

            <View style={{height: 80, marginBottom: 15,}}>
                <Image source={WelcomeLogo} style={{resizeMode: 'contain', flex: 1,}}/>
            </View>

            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 42}}>HealthWell</Text>
            <Text style={{
                color: 'white',
                fontWeight: '300',
                textAlign: 'center',
                lineHeight: 20,
            }}>APLIKASI E-BOOKING DOKTER</Text>

            <View style={{
                flex: 0.75,
                // backgroundColor: 'red',
                width: '100%',
            }}></View>

            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 80,
                    paddingVertical: 10,
                }}
                onPress={getStartedBtnHandler}
            >
                <Text style={{color: '#6CA7FF', fontWeight: 'bold'}}>MULAI</Text>
            </TouchableOpacity>

            <View style={{
                flex: 1,
                // backgroundColor: 'red',
                width: '100%',
            }}></View>
        </View>
    )
}

export default WelcomeScreen
