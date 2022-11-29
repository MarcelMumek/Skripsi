import {View, Text} from 'react-native'
import React from 'react'
import ClinicCard from './ClinicCard'
import {child, getDatabase, ref, get} from 'firebase/database'
import app from '../../../../firebase'

const db = getDatabase(app)
const dbRef = ref(db)

const ClinicListCard = ({cardHeight, navigation}) => {
    const [clinics, setClinics] = React.useState([])

    const getClinicsList = () =>
        get(child(dbRef, 'users'))
            .then(snapshot => snapshot.val())
            .then(users => {
                const clinics = Object.values(users)
                    ?.filter(user =>
                        user.role === 'Clinic' &&
                        user.status === 'active'
                    )

                setClinics(clinics)
            })

    //triggers everytime this page is focused
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("Getting clinics list...")
            getClinicsList()
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{
            backgroundColor: '#E2EDFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            marginHorizontal: 15,

            //minHeight from parent <View> height
            minHeight: cardHeight - 200 //200 is the height of the Image + it's margin top in the Header
        }}>
            {
                clinics.length > 0 ?
                    clinics.map((el, idx) =>
                        <ClinicCard
                            key={idx}
                            {...{navigation}}
                            clinicName={el.fullname}
                            clinicId={el.id}
                        />
                    )
                    :
                    null
            }
        </View>
    )
}

export default ClinicListCard
