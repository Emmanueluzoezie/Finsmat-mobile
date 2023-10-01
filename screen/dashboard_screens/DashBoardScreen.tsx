import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { selectAppTheme, selectNewUser, setCurrentScreen,} from '../../slice/AppSlices'
import { appColor } from '../../component/AppColor'
import BottomNavigationContainer from '../../component/BottomNavigationContainer'
import HeaderComponent from '../../component/HeaderComponent'
import { Entypo, Ionicons } from '@expo/vector-icons'
import HomeComponent from '../../component/dashboard/HomeComponent'
import DashBoardHeader from '../../component/DashBoardHeader'
import { selectWeb3Auth } from '../../slice/userSlice'

const DashBoardScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const web3auth = useSelector(selectWeb3Auth)
    const isNewUser = useSelector(selectNewUser)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute().name

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    useEffect(() => {
        dispatch(setCurrentScreen(route))
    }, [route])

    return (
        <View style={[
            tailwind`flex-1`,
            { backgroundColor: bgColor }
        ]}>
            <DashBoardHeader />
            <HomeComponent />
            <BottomNavigationContainer />
        </View>
    )
}

export default DashBoardScreen

const styles = StyleSheet.create({})