import {View, Text, TouchableOpacity, Image,} from 'react-native'
import React from 'react'
import BlackArrowLeft from '../../../../assets/BlackArrowLeft.png'

const Header = ({navigation, text}) => {
    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 30,
            paddingHorizontal: 25,
            paddingBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#E0ECFF',
                    padding: 5,
                    marginRight: 20,
                }}
                onPress={() => navigation?.goBack()}
            >
                <Image source={BlackArrowLeft} style={{flex: 1, width: null, resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <Text style={{
                color: '#6A6666',
                fontSize: 22,
                fontWeight: 'bold',
            }}>
                {text}
            </Text>
        </View>
    )
}

export default Header
