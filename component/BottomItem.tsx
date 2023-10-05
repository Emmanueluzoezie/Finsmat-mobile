import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { selectAppTheme, selectCurrentScreen } from '../slice/AppSlices'
import { appColor } from './AppColor'

const BottomItem = ({ onPress, Icon, title, active, name, size }) => {
    const appTheme = useSelector(selectAppTheme)
    const currentScreen = useSelector(selectCurrentScreen)

    const primaryColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const primaryColorSecondary = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const color = (currentScreen === active) ? primaryColor : primaryColorSecondary

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[tailwind`justify-center items-center py-1`,
            ]}>
                <Icon name={name} size={size} color={color} />
                <Text style={[tailwind`font-bold text-[12px] mt-1`,
                    { color: color, fontFamily: 'Lato-Bold' }
                ]}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BottomItem

const styles = StyleSheet.create({})