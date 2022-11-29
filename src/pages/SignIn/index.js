import {View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert} from 'react-native'
import React from 'react'
import TwoDoctors from '../../assets/TwoDoctors.png'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import {child, getDatabase, ref, get} from 'firebase/database'
import app from '../../firebase'
import GlobalsContext from '../../contexts/globalsContext'

// const bcrypt = require('react-native-bcrypt')
const db = getDatabase(app)
const dbRef = ref(db)

const SignIn = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoggingIn, setIsLoggingIn] = React.useState(false)
    const globalsDataContext = React.useContext(GlobalsContext)

    const signInBtnHandler = () => {
        if (email.length < 1)
            return Alert.alert('', 'Masukkan email anda')
        if (password.length < 1)
            return Alert.alert('', 'Masukkan password anda');

        //start chain of events
        (new Promise(r => setTimeout(r, 10))).then(async () => {
            setIsLoggingIn(true)

            await new Promise(r => setTimeout(r, 100));
        }).then(async () => {
            const users = (await get(child(dbRef, 'users')))?.val()

            if (users) {
                const filteredUser = Object.values(users).filter(user =>
                    user.email === email &&
                    user.status === 'active'
                )

                if (filteredUser.length > 0) {
                    // get all user info from filteredUser[0] except the password
                    const {password: _, ...userInfo} = filteredUser[0]

                    globalsDataContext.setGlobalsData({
                        userInfo
                    })

                    //returns the first element of the array
                    return filteredUser[0]
                } else {
                    throw new Error('Email tidak terdaftar!')
                }
            } else {
                throw new Error('Tidak dapat memverifikasi login!')
            }
        }).then(async user => {
            // console.log(password, user.password)
            // const passwordHash = await new Promise(
            //     r => bcrypt.compare(password, user.password, r)
            // )

            // console.log(passwordHash)

            return password === user.password
        }).then(async isValid => {
            setIsLoggingIn(false)
            return await new Promise(r => setTimeout(() => r(isValid), 200))
        }).then(async isValid => {
            if (!isValid) {
                globalsDataContext.setGlobalsData({
                    userInfo: null,
                })

                throw new Error('Invalid password!')
            }

            navigation.navigate('Home')
        }).catch(err => {
            globalsDataContext.setGlobalsData({
                userInfo: null,
            })

            setIsLoggingIn(false)
            console.log(err.message)
            Alert.alert('', err.message)
        }).finally(() => {
            setIsLoggingIn(false)
            setEmail('')
            setPassword('')
        })
    }

    const signUpBtnHandler = () => {
        navigation.navigate('SignUp')
    }

    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingHorizontal: '10%'
            }}>
                <StatusBar translucent backgroundColor='transparent' barStyle='dark-content'/>
                <View style={{
                    // backgroundColor: 'red',
                    flex: 0.7,
                }}>
                </View>

                <Text style={{color: '#6A6666', fontWeight: 'bold', fontSize: 42, textAlign: 'center'}}>Masuk</Text>

                <View style={{
                    // backgroundColor: 'red',
                    flex: 0.3,
                }}>
                </View>

                {
                    [
                        ['Email', email, setEmail],
                        ['Kata Sandi', password, setPassword]
                    ].map((item, index) =>
                        <View key={index} style={{
                            // backgroundColor: 'red',
                            marginBottom: 15,
                        }}>
                            <Text style={{color: '#6A6666'}}>{item[0]}</Text>
                            <TextInput
                                style={{
                                    borderColor: '#6CA7FF',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    color: 'black'
                                }}
                                placeholder={`Masukkan ${item[0]} anda`}
                                placeholderTextColor='#6A6666'
                                value={item[1]}
                                onChangeText={text => item[2](text)}
                                secureTextEntry={item[0] === 'Kata Sandi'}
                                autoCapitalize='none'
                            />
                        </View>
                    )
                }
                <View style={{
                    alignItems: 'center',
                    marginTop: 30,
                }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 10,
                            backgroundColor: '#6CA7FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 15,
                            width: '80%',
                        }}
                        onPress={signInBtnHandler}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>MASUK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                        }}
                        onPress={signUpBtnHandler}
                    >
                        <Text style={{color: '#6A6666'}}>Belum punya akun? <Text
                            style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Daftar disini</Text></Text>
                    </TouchableOpacity>
                </View>
                {/* <Image source={TwoDoctors} style={{
                width: null,
                flex: 1,
                resizeMode: 'contain'
            }} /> */}
                <View style={{
                    // backgroundColor: 'red',
                    flex: 1,
                }}>
                    <Image source={TwoDoctors} style={{
                        width: null, height: null, flex: 1, resizeMode: 'contain',
                        marginTop: 30,
                    }}/>
                </View>
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                display: isLoggingIn ? null : 'none'
            }}
            >
                {isLoggingIn ? <LoadingOverlay infoText='Sedang masuk...'/> : <></>}
            </View>
        </>
    )
}

export default SignIn
