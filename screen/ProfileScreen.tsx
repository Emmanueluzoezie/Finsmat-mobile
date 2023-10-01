import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { selectAppTheme, selectWeb3Auth, setCurrentScreen } from '../slice/AppSlices'
import { appColor } from '../component/AppColor'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import ProfileComponent from '../component/ProfileComponent'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'

const ProfileScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()
    const route = useRoute().name
    const navigation = useNavigation()
 
    const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

    return (
        <View style={[
            tailwind`flex-1 pt-10 px-2`,
            { backgroundColor: bgColor }
        ]}>
            <View style={tailwind`flex-row`}>
                <HeaderWithTwoItems
                    Icon={MaterialIcons}
                    name="chevron-left"
                    onPress={() => navigation.goBack()}
                    title="profile"
                    size={30}
                />
            </View>
            <ProfileComponent />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})