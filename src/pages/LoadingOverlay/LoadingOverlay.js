import { View, Text, Image } from 'react-native'
import React from 'react'
import LoadingCircle from '../../assets/LoadingCircle.png'

const LoadingOverlay = ({infoText}) => {
    const [rotation, setRotation] = React.useState(90)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRotation(rotation => rotation + 15)
        }, 35)

        return () => clearInterval(interval)
    } , [])

    return (
        <>
            <Image source={LoadingCircle} style={{
                height: 100,
                width: null,
                resizeMode: 'contain',
                tintColor: 'white',
                transform: [{ rotate: `${rotation}deg` }],
            }}/>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginTop: 50,
            }}>{infoText ? infoText : "Loading..."}</Text>
        </>
    )
}

export default LoadingOverlay