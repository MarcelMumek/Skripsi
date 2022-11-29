import { View, Text, Image } from 'react-native'
import React from 'react'

const TextualReadonlyField = ({ title, icon, value }) => {
    return (
        <View style={{
            marginVertical: 10,
        }}>
            <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                <Image source={icon} style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                }} />
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10,
                }}>
                    {title}
                </Text>
            </View>

            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.09)',
                borderRadius: 10,
                padding: 10,
                marginTop: 5,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                }}>
                    {value}
                </Text>
            </View>
        </View>
    )
}

export default TextualReadonlyField