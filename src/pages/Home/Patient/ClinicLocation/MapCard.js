import { View, Text, Image } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import MapNeedleColorIcon from '../../../../assets/MapNeedleColorIcon.png'

const MapCard = ({coordinates}) => {
    return (
        <View style={{
            backgroundColor: '#E0ECFF',
            flex: 1,
            margin: 20,
            marginTop: 0,
            borderRadius: 20,
            overflow: 'hidden',
        }}>
            <MapView
                style={{ flex: 1 }}
                scrollEnabled={false}
                initialRegion={coordinates}
                zoomEnabled={false}
                rotateEnabled={false}
            />

            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} pointerEvents='none'>
                <Image source={MapNeedleColorIcon} style={{
                    resizeMode: 'contain',
                    width: 100,
                    height: 100,
                }} />
            </View>
        </View>
    )
}

export default MapCard