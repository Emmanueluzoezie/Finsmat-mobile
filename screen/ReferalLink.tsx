import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { useNavigation, useRoute } from '@react-navigation/native'
import { appColor } from '../component/AppColor'
import tailwind from 'twrnc'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'

const ReferalLink = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()
    const route = useRoute().name
    const navigation = useNavigation()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    return (
        <View style={[
            tailwind`flex-1 pt-10`,
            { backgroundColor: bgColor }
        ]}>
            <View style={tailwind`flex-row pl-1`}>
                <HeaderWithTwoItems
                    Icon={MaterialIcons}
                    name="chevron-left"
                    onPress={() => navigation.goBack()}
                    title="Convert"
                    size={30}
                />
            </View>
            <Text>ReferalLink</Text>
        </View>
    )
}

export default ReferalLink

const styles = StyleSheet.create({})