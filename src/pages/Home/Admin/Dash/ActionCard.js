import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ActionCard = ({ title, description, callback, actionBtnTitle, isWhite }) => {
    return (
        <View style={{
            backgroundColor: isWhite ? 'white' : '#6CA7FF',
            borderRadius: 20,
            padding: 20,
            margin: 20,
        }}>
            <View style={{
                flex: 1,
                marginRight: '30%'
            }}>
                <Text style={{
                    color: isWhite ? 'black' : 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>{title}</Text>

                <Text style={{
                    color: isWhite ? 'black' : 'white',
                    fontSize: 14,
                    marginTop: 10,
                }}>{description}</Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: isWhite ? '#6CA7FF' : 'white',
                    borderRadius: 20,
                    padding: 10,
                    marginTop: 20,
                    marginLeft: 40,
                    alignSelf: 'flex-end',
                    minWidth: 125,
                }}
                onPress={callback}
            >
                <Text style={{
                    color: isWhite ? 'white' : '#6CA7FF',
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                }}>{actionBtnTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionCard
