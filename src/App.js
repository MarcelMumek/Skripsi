import {View, Text, StatusBar} from 'react-native'
import React from 'react'
import Router from './router'
import {NavigationContainer} from '@react-navigation/native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {GlobalsProvider} from './contexts/globalsContext'

const App = () => {
    const [globalsData, SetGlobalsData] = React.useState({})

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GlobalsProvider
                value={{globalsData, setGlobalsData: data => SetGlobalsData(prevState => ({...prevState, ...data}))}}>
                <View style={{
                    width: '100%',
                    height: '100%',
                }}>
                    <StatusBar translucent backgroundColor='transparent'/>
                    <View style={{
                        flex: 1,
                    }}>
                        <NavigationContainer>
                            <Router/>
                        </NavigationContainer>
                    </View>
                </View>
            </GlobalsProvider>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.15
            }}
                  pointerEvents='none'
            >
                <View style={{width: 800, transform: [{rotateZ: '20deg'}]}}>
                    {
                        [...Array(50)].map((el, idx) =>
                            <Text key={idx} numberOfLines={1} style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10, color: 'grey'}}> </Text>
                        )
                    }
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

export default App
