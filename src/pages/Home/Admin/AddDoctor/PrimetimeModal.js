import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

const PrimetimeModal = ({ isVisible, setIsVisible, content }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            statusBarTranslucent
            onRequestClose={() => {
                setIsVisible(false)
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                {content}
            </View>
        </Modal>
    )
}

export default PrimetimeModal