import { View, Text } from 'react-native'
import React from 'react'

const CornerTransition = ({isBgWhite}) => {
    return (
        <View style={{
            backgroundColor: '#6CA7FF',
            height: 50,
        }}>
            <View style={{
                backgroundColor: isBgWhite ? 'white' : '#E0ECFF',
                flex: 1,
                borderTopRightRadius: 50,
            }} />
        </View>
    )
}

export default CornerTransition