import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { appColor } from './AppColor'
import tailwind from 'twrnc'
import { selectAppTheme } from '../slice/AppSlices'

const HeaderWithTwoItems = ({ Icon, name, onPress, title, size }) => {
    const appTheme = useSelector(selectAppTheme)

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    return (
        <View style={[tailwind`flex-row items-center flex-1`,]}>
            <Icon name={name} color={color} onPress={onPress} size={size} />
            <View style={[tailwind`flex-1 justify-center items-center text-lg `]}>
                <Text style={[tailwind`text-[19px] pr-6 text-[${color}] capitalize font-bold`, { fontFamily: 'Lato-Bold' }]}>{title}</Text>
            </View>
        </View>
    )
}

export default HeaderWithTwoItems

const styles = StyleSheet.create({})