import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { DropdownProvider } from './dropdownContext'
import SignUpPage from './SignUpPage'

const SignUp = ({navigation}) => {
    const [data, SetData] = React.useState({})

    // React.useEffect(() => console.log(data), [data])

    return (
        <DropdownProvider value={{ data, setData: newValue => SetData(prevState => ({ ...prevState, ...newValue })) }}>
            <View style={{ flex: 1, }}>
                <SignUpPage navigation={navigation}/>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        display: data?.isOpen ? null : 'none'
                    }}
                    onPress={() => SetData(prevState => ({ ...prevState, isOpen: false }))}
                    activeOpacity={0.9}
                >
                    <View style={{
                        top: data?.anchorPoint?.y,
                        left: data?.anchorPoint?.x,
                        paddingRight: '25%'
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 10,
                            borderRadius: 20,
                            elevation: 8,
                        }}>
                            {
                                data?.options ? data.options.map((item, index) =>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => SetData(prevState => ({ ...prevState, selectedIndex: index, isOpen: false }))}
                                        style={{
                                            backgroundColor: data?.selectedIndex === index ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                                            padding: 10,
                                            borderRadius: 10,
                                        }}

                                    >
                                        <Text style={{ color: 'black' }}>{item}</Text>
                                    </TouchableOpacity>
                                ) : <Text style={{ color: 'black' }}>Empty</Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </DropdownProvider>
    )
}

export default SignUp