import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { appColor } from '../component/AppColor'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import HeaderComponent from '../component/HeaderComponent'
import { MaterialIcons } from '@expo/vector-icons'

const GameScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute().name

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const handleBack = () => {
        dispatch(setCurrentScreen("home"))
        navigation.goBack()
    }

    useEffect(() => {
        dispatch(setCurrentScreen(route))
    }, [])

    return (
        <View style={[
            tailwind`flex-1`,
            { backgroundColor: bgColor }
        ]}>
            <HeaderComponent
                IconOne={MaterialIcons}
                IconTwo={MaterialIcons}
                nameOne="chevron-left"
                nameTwo="add-circle-outline"
                onPressOne={handleBack}
                onPressTwo={() => navigation.navigate("profile")}
                title="Saving Goals"
                sizeOne={30}
                sizeTwo={24}
            />
            <View style={[tailwind`flex-1 justify-center`]}>

                <Text>HomeScreen</Text>
            </View>
            <BottomNavigationContainer />
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({})