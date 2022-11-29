import {View, Text, ScrollView, Image, StatusBar, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import Header from '../Common/Header'
import CornerTransition from '../Common/CornerTransition'
import TextField from '../Common/TextField'
import CreResPencil from '../../../../assets/CreResPencil.png'
import GlobalsContext from "../../../../contexts/globalsContext";
import {getDatabase, ref, child, get, set} from "firebase/database";
import app from "../../../../firebase";
import BlackArrowLeft from '../../../../assets/BlackArrowLeft.png'

const db = getDatabase(app)
const dbRef = ref(db)

const AddNotes = ({navigation}) => {
    const [keterangan, setKeterangan] = React.useState('')
    const globalsDataContext = React.useContext(GlobalsContext)

    const backButtonHandler = () => navigation.goBack()

    const addNote = () =>
        set(ref(db, `users/${globalsDataContext.globalsData.userInfo.id}/notes`), keterangan)
            .then(() => {
                navigation.goBack()
            })
            .catch(err => {
                console.log(err)
                Alert.alert('', err)
            })

    const addButtonHandler = async () => {
        try {
            Alert.alert(
                "Konfirmasi",
                "Apakah anda yakin dengan keterangan klinik tersebut?",
                [
                    {
                        text: "Tidak",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Ya", onPress: addNote
                    }
                ],
                {cancelable: false}
            )
        } catch (err) {
            console.log(err)
            Alert.alert('', err)
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("focus triggered")
            if (!globalsDataContext?.globalsData?.noForceExit) {
                globalsDataContext?.setGlobalsData({noForceExit: true})
            }

            get(child(dbRef, `users/${globalsDataContext?.globalsData?.userInfo?.id}/notes`))
                .then(snapshot => snapshot.val())
                .then(data => {
                    if (!data)
                        return setKeterangan('')

                    setKeterangan(data)
                })
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log("focus triggered")
            globalsDataContext?.setGlobalsData({noForceExit: false})
        })

        return unsubscribe
    }, [navigation])

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#E0ECFF',
        }}>
            <StatusBar translucent barStyle='light-content'/>
            <Header/>
            <CornerTransition/>

            <View style={{
                marginTop: -30,
                marginHorizontal: 40,
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                    }}
                    onPress={backButtonHandler}
                >
                    <View style={{width: 20}}>
                        <Image source={BlackArrowLeft}
                               style={{flex: 1, height: null, width: null, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Kembali</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
            </View>

            <View style={{
                marginTop: 10,
                paddingHorizontal: 40,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                    fontWeight: 'bold',
                    marginBottom: 20,
                }}>Catatan / Informasi</Text>

                <TextField
                    icon={CreResPencil}
                    fieldName='Keterangan'
                    value={keterangan}
                    callback={setKeterangan}
                    dummyText='Masukkan keterangan'
                    isMultiline
                    lineNumbers={8}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: '#6CA7FF',
                        borderRadius: 10,
                        paddingVertical: 15,
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                    onPress={addButtonHandler}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>Tambahkan</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddNotes
