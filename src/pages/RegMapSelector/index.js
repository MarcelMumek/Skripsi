import {View, Text, Button, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import MapNeedleColorIcon from '../../assets/MapNeedleColorIcon.png'
import GlobalsContext from '../../contexts/globalsContext'

const RegMapSelector = ({navigation}) => {
    const [latestRegionCoord, setLatestRegionCoord] = React.useState(null)
    const globalsDataContext = React.useContext(GlobalsContext)

    const geoCoding = async () =>
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latestRegionCoord.latitude}%2C${latestRegionCoord.longitude}&key=AIzaSyCwI6AwhGXxkLiUbf0YxbfkihQyoDd4Xqc`)
            .then(res => res.json())
            .then(res => res?.results[0]?.formatted_address)

    const selectPlaceBtnHandler = async () => {
        (new Promise(r => setTimeout(r, 10))).then(async () => {
            const street = await geoCoding()
            console.log(street)
            globalsDataContext.setGlobalsData({signUpSelectedLocation: {latestRegionCoord, street}})

            return new Promise(r => setTimeout(r, 500))
        }).then(() => {
            setLatestRegionCoord(null)
            navigation.goBack()
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    "latitude": 1.4193515143929325,
                    "latitudeDelta": 0.06406199658136358,
                    "longitude": 124.98556645587087,
                    "longitudeDelta": 0.06851602345705032
                }}
                onRegionChangeComplete={region => {
                    setLatestRegionCoord(region)
                }}
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
                }}/>
            </View>

            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                {/* <Button title='Select Place' onPress={geoCoding} disabled={latestRegionCoord === null}/> */}
                <TouchableOpacity
                    style={{
                        backgroundColor: latestRegionCoord === null ? 'transparent' : '#6CA7FF',
                        marginBottom: 50,
                        width: '50%',
                        height: '8%',
                        justifyContent: 'center',
                        elevation: latestRegionCoord === null ? 0 : 8,
                        borderRadius: 25,
                        borderWidth: latestRegionCoord === null ? 2 : 0,
                    }}
                    disabled={latestRegionCoord === null}
                    onPress={selectPlaceBtnHandler}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: latestRegionCoord === null ? 'black' : 'white',
                        fontSize: 18
                    }}>DISINI</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegMapSelector
