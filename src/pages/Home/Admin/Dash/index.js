import { View, Text, ScrollView, Image, StatusBar } from 'react-native'
import React from 'react'
import Header from '../Common/Header'
import CornerTransition from '../Common/CornerTransition'
import ActionCard from './ActionCard'

const Dash = ({ navigation }) => {

  const actionButtonHandler = page =>
    navigation.navigate(page)

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#E0ECFF',
    }}>
      <StatusBar translucent barStyle='light-content' />
      <Header />
      <CornerTransition />
      <View style={{
        marginTop: -50, // negative margin to overlap the corner transition
      }}>
        {
          [
            ["Tambahkan Dokter", "Untuk menambahkan dokter baru", "AddDoctor", "Tambahkan", true],
            ["Kelola Data", "Untuk mengubah data dan informasi dari dokter yang tersedia", "DoctorList", "Kelola", true],
            ["Tambahkan Catatan/Informasi", "", "AddNotes", "Tambahkan", false],
          ].map((item, index) =>
            <ActionCard
              key={index}
              title={item[0]}
              description={item[1]}
              callback={() => actionButtonHandler(item[2])}
              actionBtnTitle={item[3]}
              isWhite={item[4]}
            />
          )
        }
      </View>
    </ScrollView>
  )
}

export default Dash
