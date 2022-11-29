import { View, Text, TextInput } from 'react-native'
import React from 'react'

const KeluhanTextinput = ({value, setValue}) => {
    return (
        <View>
            <Text style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
            }}>Isi Keluhan Penyakit</Text>

            <View style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#6CA7FF',
                padding: 10,
                paddingVertical: 0,
                marginTop: 5,
            }}>
                <TextInput
                    style={{
                        color: 'black',
                        fontSize: 16,
                        textAlignVertical: 'top',
                    }}
                    placeholder='Masukkan keluhan anda'
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    multiline
                    numberOfLines={8}
                    value={value}
                    onChangeText={setValue}
                />
            </View>
        </View>
    )
}

export default KeluhanTextinput