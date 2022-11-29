import {View, Text, TouchableOpacity, ScrollView, Image, StatusBar, Alert} from 'react-native'
import React from 'react'
import GlobalsContext from '../../../../contexts/globalsContext'
import BlankUserProfileIcon from '../../../../assets/BlankUserProfileIcon.png'
import EmailIcon from '../../../../assets/EmailIcon.png'
import WhatsappIcon from '../../../../assets/WhatsappIcon.png'
import LocationIcon from '../../../../assets/LocationIcon.png'
import {getDatabase, ref, set} from "firebase/database";
import app from "../../../../firebase";

const db = getDatabase(app)
const dbRef = ref(db)

const Profile = ({navigation}) => {
    const globalsDataContext = React.useContext(GlobalsContext)

    const signOutBtnHandler = () => {
        globalsDataContext.setGlobalsData({
            userInfo: null
        })
    }

    const deleteAccount = () => {
        set(ref(db, `users/${globalsDataContext.globalsData.userInfo.id}`), {
            ...globalsDataContext.globalsData.userInfo,
            status: 'deleted',
        }).then(() => {
            globalsDataContext.setGlobalsData({
                userInfo: null
            })
        })
    }

    const deleteBtnHandler = () => {
        Alert.alert(
            "Hapus Akun",
            "Apakah anda yakin untuk menghapus akun anda?",
            [
                {
                    text: "Tidak",
                    onPress: () => console.log("Aborted"),
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: () => deleteAccount(),
                    style: "destructive",
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Aborted"),
            },
        )
    }

    const bookHistoryBtnHandler = () => navigation.navigate('BookingHistory')

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#6CA7FF',
        }}>
            <StatusBar translucent barStyle='light-content'/>
            <ScrollView>
                <View style={{height: 60,}}></View>

                <Image source={BlankUserProfileIcon} style={{
                    height: 100,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                }}/>

                <Text style={{
                    color: 'white',
                    fontSize: 42,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginVertical: 25,
                }}>
                    {globalsDataContext?.globalsData?.userInfo?.fullname}
                </Text>

                <View style={{
                    backgroundColor: 'white',
                    marginHorizontal: '10%',
                    padding: 20,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        color: '#6A6666',
                        fontSize: 22,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Profil Anda</Text>

                    <View style={{height: 1, backgroundColor: '#6A6666', marginVertical: 15,}}></View>

                    {/* <Text style={{
                    color: '#6A6666',
                    fontSize: 16,
                    fontWeight: '300',
                }}>{globalsDataContext?.globalsData?.userInfo?.}</Text> */}
                    {
                        [
                            [globalsDataContext?.globalsData?.userInfo?.address, LocationIcon],
                            globalsDataContext?.globalsData?.userInfo?.role === 'Patient' ?
                                [globalsDataContext?.globalsData?.userInfo?.phoneNumber, WhatsappIcon] : null,
                            [globalsDataContext?.globalsData?.userInfo?.email, EmailIcon],
                        ].map((item, index) =>
                            item &&
                            <>
                                <Image source={item[1]} style={{
                                    height: 20,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                    marginTop: 25,
                                }}/>
                                <Text
                                    key={index}
                                    style={{
                                        color: '#6A6666',
                                        fontSize: 16,
                                        fontWeight: '300',
                                        textAlign: 'center',
                                    }}
                                >{item[0]}</Text>
                            </>
                        )
                    }
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        marginHorizontal: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 25,
                        display: globalsDataContext?.globalsData?.userInfo?.role === 'Clinic' ? 'none' : null,
                    }}
                    onPress={bookHistoryBtnHandler}
                >
                    <Text style={{
                        color: '#6CA7FF',
                        fontWeight: 'bold'
                    }}>RIWAYAT RESERVASI</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#FF6C6C',
                        paddingVertical: 10,
                        marginHorizontal: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 10,
                    }}
                    onPress={deleteBtnHandler}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>HAPUS AKUN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        marginHorizontal: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 80,
                    }}
                    onPress={signOutBtnHandler}
                >
                    <Text style={{
                        color: '#FF6C6C',
                        fontWeight: 'bold'
                    }}>KELUAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Profile
