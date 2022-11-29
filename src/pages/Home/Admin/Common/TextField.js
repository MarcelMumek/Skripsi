import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomTextField = ({ icon, fieldName, callback, value, dummyText, isMultiline, lineNumbers, isButton }) => {
    return (
        <View style={{
            marginBottom: 32,
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Image source={icon} style={{
                    width: 15,
                    height: null,
                    resizeMode: 'contain',
                    marginRight: 10,
                }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                }}>{fieldName}</Text>
            </View>

            {/* <TextInput
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 10,
                    paddingLeft: value ? 10 : 20,
                    color: 'black',
                    textAlignVertical: isMultiline ? 'top' : 'center',
                }}
                placeholder={dummyText}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                value={value}
                onChangeText={text => callback(text)}
                multiline={isMultiline}
                numberOfLines={lineNumbers ? lineNumbers : 1} 
                />*/}
            {
                !isButton ?
                    <TextInput
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            marginTop: 10,
                            paddingLeft: value ? 10 : 20,
                            color: 'black',
                            textAlignVertical: isMultiline ? 'top' : 'center',
                        }}
                        placeholder={dummyText}
                        placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        value={value}
                        onChangeText={text => callback(text)}
                        multiline={isMultiline}
                        numberOfLines={lineNumbers ? lineNumbers : 1}
                    /> :
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            marginTop: 10,
                            paddingLeft: value ? 10 : 20,
                            paddingVertical: 16,
                            // textAlignVertical: isMultiline ? 'top' : 'center',
                        }}
                        onPress={callback}
                    >
                        <Text style={{ color: value ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>{value ? value : dummyText}</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default CustomTextField