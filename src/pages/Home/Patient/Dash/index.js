import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import ClinicListCard from './ClinicListCard'
import Header from './Header'

const Dash = ({navigation}) => {
  const [cardHeight, setCardHeight] = React.useState(0)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}

      //gets the parent height
      onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
    >
      <StatusBar translucent barStyle='dark-content'/>
      <ScrollView>
        <Header/>
        <ClinicListCard {...{cardHeight, navigation}}/>
      </ScrollView>
    </View>
  )
}

export default Dash