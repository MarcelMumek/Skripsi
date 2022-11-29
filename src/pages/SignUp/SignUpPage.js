import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    LayoutChangeEvent,
    Alert
} from 'react-native'
import React from 'react'
import {child, getDatabase, ref, set, get} from 'firebase/database'
import app from '../../firebase'
import uuid from 'react-native-uuid'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import TwoDoctors2 from '../../assets/TwoDoctors2.png'
import GlobalsContext from '../../contexts/globalsContext'
import DropdownContext from './dropdownContext'
import ArrowLeft from '../../assets/ArrowLeft.png'

// const bcrypt = require('react-native-bcrypt')
const db = getDatabase(app)
const dbRef = ref(db)

const SignUp = ({navigation}) => {
    const [fullName, setFullName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [coordinates, setCoordinates] = React.useState(null)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
    const [registerAs, setRegisterAs] = React.useState('')
    // const [formsItems, setFormsItems] = React.useState([])

    const globalsDataContext = React.useContext(GlobalsContext)
    const dropdownContext = React.useContext(DropdownContext)

    const backArrowHandler = () => navigation.goBack()

    const signUpBtnHandler = async () => {
        try {
            if (fullName.length < 1)
                return Alert.alert("", 'Mohon memasukkan nama anda')
            if (address.length < 1)
                return Alert.alert("", 'Mohon memasukkan alamat anda')
            if (registerAs === 'Patient' && (phoneNumber.length < 1 || !phoneNumber.match(/^[0-9]+$/)))
                return Alert.alert("", 'Mohon memasukkan nomor telepon anda dengan benar')
            if (email.length < 1)
                return Alert.alert('', 'Mohon memasukkan email anda')
            if (password.length < 1)
                return Alert.alert('', 'Mohon memasukkan kata sandi anda')

            const id = uuid.v4()

            //check if account with same email already exists

            //get all users from database
            const users = (await get(child(dbRef, 'users')))?.val()

            if (users) {
                //check if email already used by another user by filtering users with same email
                const filteredUsers = Object.values(users).filter(user =>
                    user.status === 'active' &&
                    user.email === email
                )

                if (filteredUsers.length > 0)
                    return Alert.alert("", 'Email sudah digunakan')
            }

            //start chain of events
            (new Promise(r => setTimeout(r, 10))).then(async () => {
                setShowLoadingOverlay(true)

                await new Promise(r => setTimeout(r, 100));
            }).then(async () => {
                // //we use the async version because the sync version is expensive and blocks the UI
                // const passwordHash = await new Promise(r => bcrypt.hash(password, 10, r))

                return set(ref(db, `users/${id}`), {
                    id,
                    fullname: fullName?.trim(),
                    address: address?.trim(),
                    coordinates,
                    phoneNumber: registerAs === 'Patient' ? phoneNumber?.trim() : 0,
                    email: email?.trim(),
                    password,
                    role: registerAs,
                    status: 'active',
                    notes: "",
                })
            }).then(async () => {
                setShowLoadingOverlay(false)

                // console.log('waiting 500')
                await new Promise(r => setTimeout(r, 500));
            }).then(() => {
                Alert.alert("", "Pendaftaran berhasil")
                navigation.goBack()
            }).catch(err => {
                console.log("Terjadi kesalahan: ", err)
                alert(err)
                setShowLoadingOverlay(false)
            })
        } catch (error) {
            console.log(error.message)
            alert(error)
        }
    }

    React.useEffect(() => {
        if (globalsDataContext?.globalsData?.signUpSelectedLocation) {
            setAddress(globalsDataContext?.globalsData?.signUpSelectedLocation.street)
            setCoordinates(globalsDataContext?.globalsData?.signUpSelectedLocation.latestRegionCoord)
        }
    }, [globalsDataContext?.globalsData?.signUpSelectedLocation])

    React.useEffect(() => {
        if (dropdownContext?.data?.selectedIndex !== undefined || dropdownContext?.data?.selectedIndex !== null)
            if (dropdownContext?.data?.options) {
                setRegisterAs(dropdownContext?.data?.options[dropdownContext?.data?.selectedIndex])
            }
    }, [dropdownContext?.data?.selectedIndex, dropdownContext?.data?.options])

    React.useEffect(() => {
        const unmountTask = () =>
            globalsDataContext.setGlobalsData({signUpSelectedLocation: null})

        if (!dropdownContext.data?.options)
            dropdownContext.setData({options: ['Patient', 'Clinic']})

        if (!dropdownContext.data?.selectedIndex)
            dropdownContext.setData({selectedIndex: 0})

        if (!dropdownContext.data?.isOpen === undefined || dropdownContext.data?.isOpen === null)
            dropdownContext.setData({isOpen: false})

        if (!dropdownContext.data?.anchorPoint === undefined || dropdownContext.data?.anchorPoint === null)
            dropdownContext.setData({anchorPoint: {x: 0, y: 0}})

        return unmountTask
    }, [])

    // React.useEffect(() => {
    //     console.log("triggered")
    //     //we conditionally add the forms items depending on the selected register as option
    //     let tempFormsItems = [
    //         [registerAs.length > 0 ?
    //             registerAs === 'Patient' ?
    //                 'Full Name' :
    //                 'Clinic Name' :
    //             'WARN: registerAs is NULL', fullName, setFullName],
    //         ['Address', address, setAddress],
    //         ['Phone Number', phoneNumber, setPhoneNumber],
    //         ['Email', email, setEmail],
    //         ['Password', password, setPassword]
    //     ]

    //     //if registering as clinic, remove phone number entry
    //     if (registerAs === 'Clinic')
    //         tempFormsItems.splice(2, 1)

    //     setFormsItems(tempFormsItems)
    // }, [registerAs])

    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView style={{paddingHorizontal: '10%'}}>
                <StatusBar translucent backgroundColor='transparent' barStyle='dark-content'/>
                <View style={{
                    flexDirection: 'row',
                    height: 220,
                }}>
                    <View style={{flexDirection: 'row', flex: 1, marginTop: 50,}}>
                        <Image source={TwoDoctors2} style={{
                            resizeMode: 'contain', flex: 1, height: null,
                        }}/>
                    </View>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: 'red',
                            width: 45,
                            paddingTop: 20,
                            paddingHorizontal: 10,
                            position: 'absolute',
                        }}
                        onPress={backArrowHandler}
                    >
                        <Image source={ArrowLeft} style={{
                            resizeMode: 'contain',
                            width: null,
                        }}/>
                    </TouchableOpacity>
                </View>

                <Text style={{color: '#6A6666', fontWeight: 'bold', fontSize: 42, textAlign: 'center'}}>Daftar</Text>

                <View style={{
                    // backgroundColor: 'red',
                    height: 10,
                }}>
                </View>

                {/* dropdown chooser */}
                <View style={{
                    marginBottom: 15,
                }}>
                    <Text style={{color: '#6A6666'}}>Daftar sebagai</Text>
                    <TouchableOpacity onPress={() => dropdownContext?.setData({isOpen: true})} style={{
                        borderColor: '#6CA7FF',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 16,
                        marginTop: 10,
                        color: 'black',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{color: '#6A6666'}}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >{registerAs.length > 0 ?
                            registerAs
                            :
                            'Tolong pilih salah satu'
                        }
                        </Text>
                    </TouchableOpacity>
                    {/* for anchor point */}
                    {/* this only gets node position relative to parent
                    <View onLayout={({ nativeEvent: { layout: { x, y } } }) =>
                        dropdownContext.setData({ anchorPoint: { x, y } })} /> */}
                    {/*get node position relative to screen*/}
                    <View onLayout={({currentTarget}) =>
                        currentTarget.measure((x, y, width, height, pageX, pageY) =>
                            dropdownContext.setData({anchorPoint: {x: pageX, y: pageY}})
                        )
                    }/>
                </View>

                {
                    [
                        [registerAs.length > 0 ?
                            registerAs === 'Patient' ?
                                'Nama Lengkap' :
                                'Nama Klinik' :
                            'WARN: registerAs is NULL', fullName, setFullName],
                        ['Alamat', address, setAddress],
                        //conditionally add phone number entry if registering as patient
                        registerAs === 'Patient' ? ['Nomor Telepon', phoneNumber, setPhoneNumber] : null,
                        ['Email', email, setEmail],
                        ['Kata Sandi', password, setPassword]
                    ].map((item, index) =>
                        //check if item isn't NULL and render it
                        item &&
                        <View key={index} style={{
                            // backgroundColor: 'red',
                            marginBottom: 15,
                        }}>
                            <Text style={{color: '#6A6666'}}>{item[0]}</Text>
                            {
                                item[0] === 'Alamat' ?
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('RegMapSelector', {from: 'SignUp'})} style={{
                                        borderColor: '#6CA7FF',
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        paddingHorizontal: 10,
                                        paddingVertical: 16,
                                        marginTop: 10,
                                        color: 'black',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            style={{color: '#6A6666'}}
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                        >{address ? address : "Tekan untuk memilih lokasi..."}</Text>
                                    </TouchableOpacity>
                                    :
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
                                    />
                            }

                        </View>
                    )
                }
                <View style={{
                    alignItems: 'center',
                    marginTop: 30,
                    marginBottom: 100,
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
                        onPress={signUpBtnHandler}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>DAFTAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: showLoadingOverlay ? null : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                {showLoadingOverlay ? <LoadingOverlay infoText='Membuat akun...'/> : <></>}
            </View>
        </View>
    )
}

export default SignUp
